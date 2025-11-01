import { openai } from './openai'

export type AISettings = {
  tone?: 'professional' | 'friendly' | 'casual' | 'enthusiastic'
  maxLength?: number // in sentences
  useEmojis?: boolean
  responseStyle?: 'concise' | 'detailed' | 'balanced'
}

export type ProductContext = {
  id: string
  name: string
  description?: string
  price: number // in cents
  imageUrl?: string
}

export type MessageContext = {
  userMessage: string
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
  postContext?: {
    caption?: string
    mediaType?: string
  }
  automationPrompt: string
  isComment?: boolean
  productContext?: ProductContext // For BUSINESS automations
  isSellerMode?: boolean // Indicates this is a selling automation
}

/**
 * Enhanced AI response generator with better context and customization
 */
export async function generateAIResponse(
  context: MessageContext,
  settings: AISettings = {}
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const {
      tone = 'friendly',
      maxLength = 2,
      useEmojis = true,
      responseStyle = 'balanced',
    } = settings

    const finalTone = tone || 'friendly'
    const finalMaxLength = maxLength || 2
    const finalUseEmojis = useEmojis ?? true
    const finalResponseStyle = responseStyle || 'balanced'

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(context, {
      tone: finalTone,
      maxLength: finalMaxLength,
      useEmojis: finalUseEmojis,
      responseStyle: finalResponseStyle,
    })

    // Prepare messages array
    const messages: Array<{
      role: 'system' | 'user' | 'assistant'
      content: string
    }> = [
      {
        role: 'system',
        content: systemPrompt,
      },
    ]

    // Add conversation history (limit to last 10 messages to avoid token limits)
    if (context.conversationHistory && context.conversationHistory.length > 0) {
      const recentHistory = context.conversationHistory.slice(-10)
      messages.push(...recentHistory)
    }

    // Add post context if available (for comments)
    if (context.isComment && context.postContext) {
      messages.push({
        role: 'user',
        content: `Context: This is a comment on a post${context.postContext.caption ? ` with caption: "${context.postContext.caption.substring(0, 200)}"` : ''}`,
      })
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: context.userMessage,
    })

    // Generate response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: finalTone === 'professional' ? 0.3 : finalTone === 'enthusiastic' ? 0.8 : 0.6,
      max_tokens: finalMaxLength <= 1 ? 100 : finalMaxLength <= 2 ? 150 : 250,
    })

    const response = completion.choices[0]?.message?.content?.trim()

    if (!response) {
      return {
        success: false,
        error: 'No response generated from AI',
      }
    }

    // Post-process response
    const processedResponse = postProcessResponse(
      response,
      finalUseEmojis,
      finalMaxLength
    )

    return {
      success: true,
      message: processedResponse,
    }
  } catch (error: any) {
    console.error('AI generation error:', error)
    return {
      success: false,
      error: error.message || 'Failed to generate AI response',
    }
  }
}

function buildSystemPrompt(
  context: MessageContext,
  settings: AISettings
): string {
  const { tone, maxLength = 2, useEmojis = true, responseStyle = 'balanced', automationPrompt } = {
    ...settings,
    automationPrompt: context.automationPrompt,
  }

  const toneInstructions = {
    professional:
      'Use a professional, courteous tone. Be helpful but maintain a business-like demeanor.',
    friendly:
      'Use a warm, friendly tone. Be approachable and conversational.',
    casual:
      'Use a casual, relaxed tone. Keep it informal and natural.',
    enthusiastic:
      'Use an energetic, enthusiastic tone. Show excitement and positivity.',
  }

  const styleInstructions = {
    concise: 'Keep responses very brief and to the point.',
    detailed: 'Provide thorough, detailed responses when appropriate.',
    balanced: 'Provide balanced responses with adequate detail.',
  }

  // Import centsToDollars for price formatting
  const centsToDollars = (cents: number) => (cents / 100).toFixed(2)

  let prompt = `You are an AI assistant helping ${context.isComment ? 'respond to comments on Instagram posts' : 'handle Instagram direct messages'} for a business.

Your instructions:
${automationPrompt}

Tone: ${toneInstructions[tone || 'friendly']}
Style: ${styleInstructions[responseStyle || 'balanced']}
Length: Keep responses to ${maxLength} sentence${maxLength > 1 ? 's' : ''} maximum.
${useEmojis ? 'You may use emojis sparingly (1-2 max) to add personality.' : 'Do not use emojis.'}
${context.isComment ? 'Since this is a comment reply, keep it shorter and more engaging.' : 'This is a direct message, maintain conversation flow.'}`

  // Add seller mode instructions if product context exists
  if (context.isSellerMode && context.productContext) {
    const product = context.productContext
    const priceDollars = centsToDollars(product.price)

    prompt += `

🛍️ SELLER MODE - You are helping sell a product:

Product Details:
- Name: ${product.name}
${product.description ? `- Description: ${product.description}` : ''}
- Price: $${priceDollars}

Your selling approach:
1. Build rapport first - Be friendly and helpful, not pushy
2. Answer questions - Provide clear information about the product
3. Highlight value - Focus on benefits and what makes it special
4. Handle objections naturally - Address concerns without being defensive
5. Create urgency subtly - Mention limited availability or special offers if appropriate (but only if true)
6. Guide to purchase - When customer shows interest, naturally mention they can click the "Buy Now" button that appears in the message
7. Be authentic - Don't oversell or make false claims
8. Stay in character - Match the brand voice from the automation prompt

Common customer questions to handle:
- "How much does it cost?" → Mention price ($${priceDollars}) and value
- "What is it?" → Explain based on product description
- "Is it worth it?" → Highlight key benefits
- "Can I see it?" → Mention product details and that purchase unlocks full access
- "Do you have reviews?" → If asked, be honest - you can mention customer satisfaction without specific reviews
- Objections (too expensive, not sure, etc.) → Acknowledge concern, provide value perspective, offer to answer more questions

IMPORTANT: 
- Never hard-sell or be pushy
- Never make up features or benefits not in the product description
- Never pressure the customer
- If they're not interested, be respectful and offer to help with other questions
- The checkout button will appear automatically - just guide them naturally when appropriate
- Always be honest and transparent`
  } else {
    prompt += `

Important guidelines:
- Be natural and conversational
- Address the user's question or concern directly
- If you don't know something, politely say so
- Never make promises you can't keep
- Be helpful and solution-oriented
- Match the brand voice from the prompt`
  }

  return prompt
}

function postProcessResponse(
  response: string,
  useEmojis: boolean,
  maxLength: number
): string {
  let processed = response.trim()

  // Ensure it doesn't exceed sentence limit (rough estimate)
  const sentences = processed.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  if (sentences.length > maxLength) {
    processed = sentences.slice(0, maxLength).join('. ').trim()
    if (!processed.endsWith('.') && !processed.endsWith('!') && !processed.endsWith('?')) {
      processed += '.'
    }
  }

  // Remove excessive emojis if not allowed
  if (!useEmojis) {
    // Remove emojis using character ranges
    processed = processed.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g, '')
    processed = processed.replace(/[\u2600-\u26FF]/g, '')
    processed = processed.replace(/[\u2700-\u27BF]/g, '')
    processed = processed.trim()
  } else {
    // Limit emojis to 2 max - simplified approach
    const emojiPattern = /[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2600-\u26FF]|[\u2700-\u27BF]/g
    const emojis = processed.match(emojiPattern) || []
    if (emojis.length > 2) {
      // Keep only first 2 emojis
      let emojiCount = 0
      processed = processed.replace(emojiPattern, (match) => {
        emojiCount++
        return emojiCount <= 2 ? match : ''
      })
    }
  }

  // Clean up multiple spaces
  processed = processed.replace(/\s+/g, ' ').trim()

  return processed
}
