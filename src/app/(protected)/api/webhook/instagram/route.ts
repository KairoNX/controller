import { findAutomation } from '@/actions/automations/queries'
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponses,
} from '@/actions/webhook/queries'
import { sendDM, sendPrivateMessage } from '@/lib/fetch'
import { generateAIResponse } from '@/lib/ai-service'
import { client } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    console.log('[Instagram Webhook] GET request received')
    const hub = req.nextUrl.searchParams.get('hub.challenge')
    console.log('[Instagram Webhook] Challenge value:', hub ? 'present' : 'missing')
    if (!hub) {
      console.error('[Instagram Webhook] Missing hub.challenge parameter')
      return NextResponse.json({ error: 'Missing challenge' }, { status: 400 })
    }
    return new NextResponse(hub)
  } catch (error: any) {
    console.error('[Instagram Webhook] GET error:', error?.message || error)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  console.log('[Instagram Webhook] POST request received')
  let webhook_payload: any
  let matcher

  try {
    webhook_payload = await req.json()
    console.log('[Instagram Webhook] Payload received:', JSON.stringify(webhook_payload, null, 2))

    // CRITICAL: Check for echo messages and message_edit events FIRST, before any processing
    const messaging = webhook_payload.entry?.[0]?.messaging?.[0]
    
    // Skip echo messages (messages sent by the page itself)
    if (messaging?.message?.is_echo === true || messaging?.message?.is_echo === 'true' || messaging?.message?.is_echo === 1) {
      console.log('[Instagram Webhook] ❌ ECHO MESSAGE DETECTED - Ignoring immediately. is_echo:', messaging.message.is_echo, 'type:', typeof messaging.message.is_echo)
      return NextResponse.json({ message: 'Echo message ignored' }, { status: 200 })
    }

    // Skip message_edit events (they're not actual messages, just edit metadata)
    if (messaging?.message_edit) {
      console.log('[Instagram Webhook] Skipping message_edit event (not a message)')
      return NextResponse.json({ message: 'Message edit event ignored' }, { status: 200 })
    }

    // Validate webhook payload structure
    if (!webhook_payload || !webhook_payload.entry || !Array.isArray(webhook_payload.entry) || webhook_payload.entry.length === 0) {
      console.error('[Instagram Webhook] Invalid payload structure - missing or empty entry array')
      return NextResponse.json(
        { error: 'Invalid webhook payload structure' },
        { status: 400 }
      )
    }

    console.log('[Instagram Webhook] Processing entry 0, type:', 
      webhook_payload.entry[0].messaging ? 'messaging' : 
      webhook_payload.entry[0].changes ? 'changes' : 'unknown'
    )

    // Handle messaging (DMs)
    if (webhook_payload.entry[0].messaging) {
      // Skip echo messages (messages sent by the page itself)
      const isEcho = webhook_payload.entry[0].messaging[0]?.message?.is_echo
      if (isEcho === true || isEcho === 'true') {
        console.log('[Instagram Webhook] Skipping echo message (sent by page itself)')
        return NextResponse.json({ message: 'Echo message ignored' }, { status: 200 })
      }

      try {
        const message = webhook_payload.entry[0].messaging[0]?.message
        
        // Skip echo messages (messages sent by the page itself)
        if (message?.is_echo) {
          console.log('[Instagram Webhook] Skipping echo message')
          return NextResponse.json({ message: 'Echo message ignored' }, { status: 200 })
        }
        
        const messageText = message?.text
        if (!messageText) {
          console.warn('[Instagram Webhook] No message text found in messaging payload')
        } else {
          console.log('[Instagram Webhook] Matching keyword for DM text:', messageText.substring(0, 50))
          matcher = await matchKeyword(messageText)
          console.log('[Instagram Webhook] Keyword match result:', matcher ? `Found automation: ${matcher.automationId}` : 'No match')
        }
      } catch (error: any) {
        console.error('[Instagram Webhook] Error matching keyword for messaging:', error?.message || error)
        console.error('[Instagram Webhook] Error stack:', error?.stack)
      }
    }

    // Handle changes (comments)
    if (webhook_payload.entry[0].changes) {
      try {
        const changeText = webhook_payload.entry[0].changes[0]?.value?.text
        if (!changeText) {
          console.warn('[Instagram Webhook] No text found in changes payload')
        } else {
          console.log('[Instagram Webhook] Matching keyword for comment text:', changeText.substring(0, 50))
          matcher = await matchKeyword(changeText)
          console.log('[Instagram Webhook] Keyword match result:', matcher ? `Found automation: ${matcher.automationId}` : 'No match')
        }
      } catch (error: any) {
        console.error('[Instagram Webhook] Error matching keyword for changes:', error?.message || error)
        console.error('[Instagram Webhook] Error stack:', error?.stack)
      }
    }

    if (matcher && matcher.automationId) {
      console.log('[Instagram Webhook] ✅ Keyword matched! Automation ID:', matcher.automationId)
      
      // We have a keyword matcher
      if (webhook_payload.entry[0].messaging) {
        // Double-check for echo messages before processing
        const isEchoMessage = webhook_payload.entry[0].messaging[0]?.message?.is_echo
        if (isEchoMessage === true || isEchoMessage === 'true') {
          console.log('[Instagram Webhook] Skipping echo message - already processed by page')
          return NextResponse.json({ message: 'Echo message ignored' }, { status: 200 })
        }

        console.log('[Instagram Webhook] Processing DM/webhook messaging')
        
        let automation
        try {
          automation = await getKeywordAutomation(matcher.automationId, true)
          console.log('[Instagram Webhook] Automation fetched:', {
            id: automation?.id,
            name: automation?.name,
            hasTrigger: !!automation?.trigger,
            listenerType: automation?.listener?.listener,
            hasUser: !!automation?.User,
            hasIntegration: !!automation?.User?.integrations?.[0],
            subscriptionPlan: automation?.User?.subscription?.plan
          })
        } catch (error: any) {
          console.error('[Instagram Webhook] Error fetching automation:', error?.message || error)
          console.error('[Instagram Webhook] Error stack:', error?.stack)
          throw error
        }

        if (!automation) {
          console.error('[Instagram Webhook] Automation not found for ID:', matcher.automationId)
          return NextResponse.json({ error: 'Automation not found' }, { status: 404 })
        }

        if (!automation.trigger) {
          console.warn('[Instagram Webhook] Automation has no trigger configured:', automation.id)
          return NextResponse.json({ error: 'Automation trigger not configured' }, { status: 400 })
        }

        if (!automation.User?.integrations?.[0]?.token) {
          console.error('[Instagram Webhook] Missing Instagram token for automation:', automation.id)
          return NextResponse.json({ error: 'Instagram integration token missing' }, { status: 400 })
        }

        // Handle MESSAGE listener (standard responses)
        if (automation.listener && automation.listener.listener === 'MESSAGE') {
          console.log('[Instagram Webhook] Processing MESSAGE listener for DM')
          console.log('[Instagram Webhook] Sender ID:', webhook_payload.entry[0].messaging[0].sender.id)
          console.log('[Instagram Webhook] Response prompt:', automation.listener.prompt?.substring(0, 100))

          try {
            // Get buttons from listener (stored as Json)
            let buttons = automation.listener.buttons 
              ? (automation.listener.buttons as { title: string; url: string }[])
              : []

            // Product checkout feature disabled (Business automation type coming soon)

            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener.prompt,
              automation.User.integrations[0].token,
              buttons.length > 0 ? buttons : undefined
            )

            console.log('[Instagram Webhook] DM send response status:', direct_message.status)
            console.log('[Instagram Webhook] DM send response data:', JSON.stringify(direct_message, null, 2))

            if (direct_message.status === 200) {
              try {
                const tracked = await trackResponses(automation.id, 'DM')
                console.log('[Instagram Webhook] Response tracking result:', tracked)
                if (tracked) {
                  console.log('[Instagram Webhook] ✅ Successfully sent MESSAGE response and tracked')
                  return NextResponse.json(
                    { message: 'Message sent' },
                    { status: 200 }
                  )
                } else {
                  console.warn('[Instagram Webhook] Message sent but tracking failed')
                }
              } catch (error: any) {
                console.error('[Instagram Webhook] Error tracking MESSAGE response:', error?.message || error)
                console.error('[Instagram Webhook] Error stack:', error?.stack)
              }
            } else {
              console.error('[Instagram Webhook] Failed to send DM. Status:', direct_message.status)
              console.error('[Instagram Webhook] Response:', JSON.stringify(direct_message, null, 2))
            }
          } catch (error: any) {
            console.error('[Instagram Webhook] Error sending DM for MESSAGE listener:', error?.message || error)
            console.error('[Instagram Webhook] Error stack:', error?.stack)
            throw error
          }
        }

        // Handle SMARTAI listener (AI-powered responses)
        if (automation.listener && automation.listener.listener === 'SMARTAI') {
          console.log('[Instagram Webhook] Processing SMARTAI listener for DM')
          console.log('[Instagram Webhook] User subscription plan:', automation.User?.subscription?.plan)

          if (automation.User?.subscription?.plan !== 'PRO') {
            console.warn('[Instagram Webhook] SMARTAI requires PRO plan. Current plan:', automation.User?.subscription?.plan)
            return NextResponse.json(
              { error: 'SMARTAI requires PRO subscription' },
              { status: 403 }
            )
          }

          const userMessage = webhook_payload.entry[0].messaging[0].message.text
          console.log('[Instagram Webhook] User message:', userMessage.substring(0, 100))
          console.log('[Instagram Webhook] AI Settings:', {
            tone: automation.listener.aiTone,
            maxLength: automation.listener.aiMaxLength,
            useEmojis: automation.listener.aiUseEmojis,
            responseStyle: automation.listener.aiResponseStyle
          })

          let aiResponse
          try {
            // Business automation type and product features disabled (coming soon)
            aiResponse = await generateAIResponse(
              {
                userMessage,
                automationPrompt: automation.listener.prompt,
                isComment: false,
              },
              {
                tone: (automation.listener.aiTone?.toLowerCase() as 'professional' | 'friendly' | 'casual' | 'enthusiastic') || 'friendly',
                maxLength: automation.listener.aiMaxLength || 2,
                useEmojis: automation.listener.aiUseEmojis ?? true,
                responseStyle: (automation.listener.aiResponseStyle?.toLowerCase() as 'concise' | 'detailed' | 'balanced') || 'balanced',
              }
            )

            console.log('[Instagram Webhook] AI Response generated:', {
              success: aiResponse.success,
              messageLength: aiResponse.message?.length,
              error: aiResponse.error
            })

            if (!aiResponse.success) {
              console.error('[Instagram Webhook] AI response generation failed:', aiResponse.error)
              return NextResponse.json(
                { error: 'Failed to generate AI response', details: aiResponse.error },
                { status: 500 }
              )
            }
          } catch (error: any) {
            console.error('[Instagram Webhook] Error generating AI response:', error?.message || error)
            console.error('[Instagram Webhook] Error stack:', error?.stack)
            return NextResponse.json(
              { error: 'AI service error', details: error?.message },
              { status: 500 }
            )
          }

          if (aiResponse.success && aiResponse.message) {
            console.log('[Instagram Webhook] AI Response:', aiResponse.message.substring(0, 100))

            try {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                userMessage
              )

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                aiResponse.message
              )

              await client.$transaction([reciever, sender])
              console.log('[Instagram Webhook] Chat history saved to database')

              // Get buttons from listener (stored as Json)
              let buttons = automation.listener.buttons 
                ? (automation.listener.buttons as { title: string; url: string }[])
                : []

              // Product checkout feature disabled (Business automation type coming soon)

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                aiResponse.message,
                automation.User.integrations[0].token,
                buttons
              )

              console.log('[Instagram Webhook] DM send response status:', direct_message.status)
              console.log('[Instagram Webhook] DM send response data:', JSON.stringify(direct_message, null, 2))

              if (direct_message.status === 200) {
                try {
                  const tracked = await trackResponses(automation.id, 'DM')
                  console.log('[Instagram Webhook] Response tracking result:', tracked)
                  if (tracked) {
                    console.log('[Instagram Webhook] ✅ Successfully sent SMARTAI response and tracked')
                    return NextResponse.json(
                      { message: 'Message sent' },
                      { status: 200 }
                    )
                  } else {
                    console.warn('[Instagram Webhook] Message sent but tracking failed')
                  }
                } catch (error: any) {
                  console.error('[Instagram Webhook] Error tracking SMARTAI response:', error?.message || error)
                  console.error('[Instagram Webhook] Error stack:', error?.stack)
                }
              } else {
                console.error('[Instagram Webhook] Failed to send SMARTAI DM. Status:', direct_message.status)
              }
            } catch (error: any) {
              console.error('[Instagram Webhook] Error saving chat history or sending DM:', error?.message || error)
              console.error('[Instagram Webhook] Error stack:', error?.stack)
              throw error
            }
          }
        }
      }

      // Handle comment webhooks
      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === 'comments'
      ) {
        console.log('[Instagram Webhook] Processing comment webhook')
        console.log('[Instagram Webhook] Comment data:', {
          mediaId: webhook_payload.entry[0].changes[0].value?.media?.id,
          commentId: webhook_payload.entry[0].changes[0].value?.id,
          commentText: webhook_payload.entry[0].changes[0].value?.text?.substring(0, 50),
          fromId: webhook_payload.entry[0].changes[0].value?.from?.id
        })

        let automation
        try {
          automation = await getKeywordAutomation(matcher.automationId, false)
          console.log('[Instagram Webhook] Automation fetched for comment:', {
            id: automation?.id,
            name: automation?.name,
            hasTrigger: !!automation?.trigger,
            listenerType: automation?.listener?.listener
          })
        } catch (error: any) {
          console.error('[Instagram Webhook] Error fetching automation for comment:', error?.message || error)
          throw error
        }

        if (!automation) {
          console.error('[Instagram Webhook] Automation not found for comment, ID:', matcher.automationId)
          return NextResponse.json({ error: 'Automation not found' }, { status: 404 })
        }

        if (!automation.User?.integrations?.[0]?.token) {
          console.error('[Instagram Webhook] Missing Instagram token for comment handler')
          return NextResponse.json({ error: 'Instagram integration token missing' }, { status: 400 })
        }

        const mediaId = webhook_payload.entry[0].changes[0].value?.media?.id
        if (!mediaId) {
          console.error('[Instagram Webhook] Missing media ID in comment webhook')
          return NextResponse.json({ error: 'Missing media ID' }, { status: 400 })
        }

        let automations_post
        try {
          automations_post = await getKeywordPost(mediaId, automation.id)
          console.log('[Instagram Webhook] Post lookup result:', {
            found: !!automations_post
          })
        } catch (error: any) {
          console.error('[Instagram Webhook] Error fetching post:', error?.message || error)
          throw error
        }

        if (automation && automations_post && automation.trigger) {
          if (!automation.listener) {
            console.warn('[Instagram Webhook] Automation has no listener configured:', automation.id)
            return NextResponse.json({ error: 'Listener not configured' }, { status: 400 })
          }

          // Handle MESSAGE listener for comments
          if (automation.listener.listener === 'MESSAGE') {
            console.log('[Instagram Webhook] Processing MESSAGE listener for comment')
            console.log('[Instagram Webhook] Comment details:', {
              pageId: webhook_payload.entry[0].id,
              commentId: webhook_payload.entry[0].changes[0].value.id,
              fromId: webhook_payload.entry[0].changes[0].value.from?.id,
              commentText: webhook_payload.entry[0].changes[0].value.text?.substring(0, 50)
            })

            try {
              const direct_message = await sendPrivateMessage(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.id,
                automation.listener.prompt,
                automation.User.integrations[0].token
              )

              console.log('[Instagram Webhook] Comment DM send response:', {
                status: direct_message.status,
                data: direct_message.data
              })

              if (direct_message.status === 200) {
                try {
                  const tracked = await trackResponses(automation.id, 'COMMENT')
                  console.log('[Instagram Webhook] Comment response tracking result:', tracked)
                  if (tracked) {
                    console.log('[Instagram Webhook] ✅ Successfully sent MESSAGE comment response and tracked')
                    return NextResponse.json(
                      { message: 'Message sent' },
                      { status: 200 }
                    )
                  } else {
                    console.warn('[Instagram Webhook] Comment message sent but tracking failed')
                  }
                } catch (error: any) {
                  console.error('[Instagram Webhook] Error tracking MESSAGE comment response:', error?.message || error)
                }
              } else {
                console.error('[Instagram Webhook] Failed to send comment DM. Status:', direct_message.status)
              }
            } catch (error: any) {
              console.error('[Instagram Webhook] Error sending MESSAGE comment response:', error?.message || error)
              console.error('[Instagram Webhook] Error stack:', error?.stack)
              throw error
            }
          }
          // Handle SMARTAI listener for comments
          if (automation.listener.listener === 'SMARTAI') {
            console.log('[Instagram Webhook] Processing SMARTAI listener for comment')
            console.log('[Instagram Webhook] User subscription plan:', automation.User?.subscription?.plan)

            if (automation.User?.subscription?.plan !== 'PRO') {
              console.warn('[Instagram Webhook] SMARTAI requires PRO plan. Current plan:', automation.User?.subscription?.plan)
              return NextResponse.json(
                { error: 'SMARTAI requires PRO subscription' },
                { status: 403 }
              )
            }

            // Get post context for better responses
            let postContext = null
            try {
              if (automations_post) {
                postContext = await client.post.findFirst({
                  where: {
                    postid: webhook_payload.entry[0].changes[0].value.media.id,
                    automationId: automation.id,
                  },
                  select: {
                    caption: true,
                    mediaType: true,
                  },
                })
                console.log('[Instagram Webhook] Post context retrieved:', {
                  hasCaption: !!postContext?.caption,
                  mediaType: postContext?.mediaType
                })
              }
            } catch (error: any) {
              console.error('[Instagram Webhook] Error fetching post context:', error?.message || error)
            }

            const commentText = webhook_payload.entry[0].changes[0].value.text
            console.log('[Instagram Webhook] Comment text:', commentText?.substring(0, 100))
            console.log('[Instagram Webhook] AI Settings:', {
              tone: automation.listener.aiTone,
              maxLength: automation.listener.aiMaxLength,
              useEmojis: automation.listener.aiUseEmojis,
              responseStyle: automation.listener.aiResponseStyle
            })

            let aiResponse
            try {
              // Business automation type and product features disabled (coming soon)
              aiResponse = await generateAIResponse(
                {
                  userMessage: commentText,
                  automationPrompt: automation.listener.prompt,
                  isComment: true,
                  postContext: postContext
                    ? {
                        caption: postContext.caption || undefined,
                        mediaType: postContext.mediaType || undefined,
                      }
                    : undefined,
                },
                {
                  tone: (automation.listener.aiTone?.toLowerCase() as 'professional' | 'friendly' | 'casual' | 'enthusiastic') || 'friendly',
                  maxLength: automation.listener.aiMaxLength || 2,
                  useEmojis: automation.listener.aiUseEmojis ?? true,
                  responseStyle: (automation.listener.aiResponseStyle?.toLowerCase() as 'concise' | 'detailed' | 'balanced') || 'concise',
                }
              )

              console.log('[Instagram Webhook] AI Response generated for comment:', {
                success: aiResponse.success,
                messageLength: aiResponse.message?.length,
                error: aiResponse.error
              })

              if (!aiResponse.success) {
                console.error('[Instagram Webhook] AI response generation failed for comment:', aiResponse.error)
                return NextResponse.json(
                  { error: 'Failed to generate AI response', details: aiResponse.error },
                  { status: 500 }
                )
              }
            } catch (error: any) {
              console.error('[Instagram Webhook] Error generating AI response for comment:', error?.message || error)
              console.error('[Instagram Webhook] Error stack:', error?.stack)
              return NextResponse.json(
                { error: 'AI service error', details: error?.message },
                { status: 500 }
              )
            }

            if (aiResponse.success && aiResponse.message) {
              console.log('[Instagram Webhook] AI Response for comment:', aiResponse.message.substring(0, 100))

              try {
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  commentText
                )

                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  aiResponse.message
                )

                await client.$transaction([reciever, sender])
                console.log('[Instagram Webhook] Comment chat history saved to database')

                const direct_message = await sendPrivateMessage(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.id,
                  aiResponse.message,
                  automation.User.integrations[0].token
                )

                console.log('[Instagram Webhook] Comment DM send response:', {
                  status: direct_message.status,
                  data: direct_message.data
                })

                if (direct_message.status === 200) {
                  try {
                    const tracked = await trackResponses(automation.id, 'COMMENT')
                    console.log('[Instagram Webhook] Comment response tracking result:', tracked)
                    if (tracked) {
                      console.log('[Instagram Webhook] ✅ Successfully sent SMARTAI comment response and tracked')
                      return NextResponse.json(
                        { message: 'Message sent' },
                        { status: 200 }
                      )
                    } else {
                      console.warn('[Instagram Webhook] Comment message sent but tracking failed')
                    }
                  } catch (error: any) {
                    console.error('[Instagram Webhook] Error tracking SMARTAI comment response:', error?.message || error)
                  }
                } else {
                  console.error('[Instagram Webhook] Failed to send SMARTAI comment DM. Status:', direct_message.status)
                }
              } catch (error: any) {
                console.error('[Instagram Webhook] Error saving comment history or sending DM:', error?.message || error)
                console.error('[Instagram Webhook] Error stack:', error?.stack)
                throw error
              }
            }
          }
        }
      }
    }

    // Handle conversation continuation (no keyword match but has chat history)
    if (!matcher) {
      console.log('[Instagram Webhook] No keyword match, checking for conversation history')

      if (!webhook_payload.entry[0]?.messaging) {
        console.log('[Instagram Webhook] No messaging data, returning no automation')
        return NextResponse.json({ message: 'No automation set' }, { status: 200 })
      }
      
      // Skip echo messages in conversation continuation too
      if (webhook_payload.entry[0].messaging[0]?.message?.is_echo) {
        console.log('[Instagram Webhook] Skipping echo message in conversation continuation')
        return NextResponse.json({ message: 'Echo message ignored' }, { status: 200 })
      }

      try {
        // Only check history if there's an actual message (not message_edit or other event types)
        const messageText = webhook_payload.entry[0].messaging[0]?.message?.text
        if (!messageText) {
          console.log('[Instagram Webhook] No message text available, skipping conversation history check')
          return NextResponse.json({ message: 'No automation set' }, { status: 200 })
        }

        const customer_history = await getChatHistory(
          webhook_payload.entry[0].messaging[0].recipient.id,
          webhook_payload.entry[0].messaging[0].sender.id
        ).catch((error: any) => {
          console.error('[Instagram Webhook] Error fetching chat history:', error?.message || error)
          return null
        })

        if (!customer_history) {
          console.log('[Instagram Webhook] No chat history found')
          return NextResponse.json({ message: 'No automation set' }, { status: 200 })
        }

        console.log('[Instagram Webhook] Chat history found:', {
          hasHistory: customer_history?.history?.length > 0,
          historyLength: customer_history?.history?.length || 0,
          automationId: customer_history?.automationId
        })

        if (customer_history && customer_history.history && customer_history.history.length > 0 && customer_history.automationId) {
          try {
            const automation = await findAutomation(customer_history.automationId)

            console.log('[Instagram Webhook] Automation for conversation:', {
              id: automation?.id,
              subscriptionPlan: automation?.User?.subscription?.plan,
              listenerType: automation?.listener?.listener
            })

            if (
              automation?.User?.subscription?.plan === 'PRO' &&
              automation.listener?.listener === 'SMARTAI'
            ) {
              const userMessage = webhook_payload.entry[0].messaging[0].message.text
              console.log('[Instagram Webhook] Generating AI response for conversation continuation')
              console.log('[Instagram Webhook] User message:', userMessage.substring(0, 100))
              console.log('[Instagram Webhook] Conversation history entries:', customer_history.history.length)

              let aiResponse
              try {
                aiResponse = await generateAIResponse(
                  {
                    userMessage,
                    automationPrompt: automation.listener.prompt,
                    conversationHistory: customer_history.history,
                    isComment: false,
                  },
                  {
                    tone: (automation.listener.aiTone?.toLowerCase() as 'professional' | 'friendly' | 'casual' | 'enthusiastic') || 'friendly',
                    maxLength: automation.listener.aiMaxLength || 2,
                    useEmojis: automation.listener.aiUseEmojis ?? true,
                    responseStyle: (automation.listener.aiResponseStyle?.toLowerCase() as 'concise' | 'detailed' | 'balanced') || 'balanced',
                  }
                )

                console.log('[Instagram Webhook] AI Response for conversation:', {
                  success: aiResponse.success,
                  messageLength: aiResponse.message?.length,
                  error: aiResponse.error
                })

                if (aiResponse.success && aiResponse.message) {
                  try {
                    const reciever = createChatHistory(
                      automation.id,
                      webhook_payload.entry[0].id,
                      webhook_payload.entry[0].messaging[0].sender.id,
                      userMessage
                    )

                    const sender = createChatHistory(
                      automation.id,
                      webhook_payload.entry[0].id,
                      webhook_payload.entry[0].messaging[0].sender.id,
                      aiResponse.message
                    )

                    await client.$transaction([reciever, sender])
                    console.log('[Instagram Webhook] Conversation history updated')

                    if (!automation.User?.integrations?.[0]?.token) {
                      console.error('[Instagram Webhook] Missing Instagram token for conversation continuation')
                      return NextResponse.json({ error: 'Instagram integration token missing' }, { status: 400 })
                    }

                    // Get buttons from listener (stored as Json)
                    const buttons = automation.listener.buttons 
                      ? (automation.listener.buttons as { title: string; url: string }[])
                      : undefined

                    const direct_message = await sendDM(
                      webhook_payload.entry[0].id,
                      webhook_payload.entry[0].messaging[0].sender.id,
                      aiResponse.message,
                      automation.User.integrations[0].token,
                      buttons
                    )

                    console.log('[Instagram Webhook] Conversation DM send response:', {
                      status: direct_message.status
                    })

                    if (direct_message.status === 200) {
                      console.log('[Instagram Webhook] ✅ Successfully sent conversation continuation response')
                      return NextResponse.json({ message: 'Message sent' }, { status: 200 })
                    } else {
                      console.error('[Instagram Webhook] Failed to send conversation DM. Status:', direct_message.status)
                    }
                  } catch (error: any) {
                    console.error('[Instagram Webhook] Error handling conversation continuation:', error?.message || error)
                    console.error('[Instagram Webhook] Error stack:', error?.stack)
                  }
                } else {
                  console.error('[Instagram Webhook] AI response generation failed for conversation:', aiResponse.error)
                }
              } catch (error: any) {
                console.error('[Instagram Webhook] Error generating AI response for conversation:', error?.message || error)
                console.error('[Instagram Webhook] Error stack:', error?.stack)
              }
            } else {
              console.log('[Instagram Webhook] Automation does not support conversation continuation:', {
                isPro: automation?.User?.subscription?.plan === 'PRO',
                isSmartAI: automation?.listener?.listener === 'SMARTAI'
              })
            }
          } catch (error: any) {
            console.error('[Instagram Webhook] Error fetching automation for conversation:', error?.message || error)
          }
        } else {
          console.log('[Instagram Webhook] No conversation history found')
        }
      } catch (error: any) {
        console.error('[Instagram Webhook] Error fetching chat history:', error?.message || error)
        console.error('[Instagram Webhook] Error stack:', error?.stack)
      }

      console.log('[Instagram Webhook] No automation matched for this message')
      return NextResponse.json({ message: 'No automation set' }, { status: 200 })
    }

    // No matcher found
    console.log('[Instagram Webhook] No keyword matcher found')
    return NextResponse.json({ message: 'No automation set' }, { status: 200 })
  } catch (error: any) {
    console.error('[Instagram Webhook] ❌ UNHANDLED ERROR:', error?.message || error)
    console.error('[Instagram Webhook] Error stack:', error?.stack)
    console.error('[Instagram Webhook] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
