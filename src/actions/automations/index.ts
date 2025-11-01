'use server'

import { onCurrentUser } from '../user'
import { findUser } from '../user/queries'
import {
  addKeyWord,
  addListener,
  addPost,
  addTrigger,
  cloneAutomation as cloneAutomationQuery,
  createAutomation,
  deleteAutomation as deleteAutomationQuery,
  deleteKeywordQuery,
  findAutomation,
  getAutomations,
  updateAutomation,
  updateListenerAISettings,
} from './queries'

export const createAutomations = async (id?: string) => {
  const user = await onCurrentUser()
  try {
    const create = await createAutomation(user.id, id)
    if (create) return { status: 200, data: 'Automation created', res: create }

    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}

export const getAllAutomations = async () => {
  const user = await onCurrentUser()
  try {
    const automations = await getAutomations(user.id)
    if (automations) return { status: 200, data: automations.automations }
    return { status: 404, data: [] }
  } catch (error) {
    return { status: 500, data: [] }
  }
}

export const getAutomationInfo = async (id: string) => {
  await onCurrentUser()
  try {
    const automation = await findAutomation(id)
    if (automation) return { status: 200, data: automation }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

export const updateAutomationName = async (
  automationId: string,
  data: {
    name?: string
    active?: boolean
    automation?: string
    type?: 'CREATOR' | 'BUSINESS'
  }
) => {
  await onCurrentUser()
  try {
    const update = await updateAutomation(automationId, data)
    if (update) {
      return { status: 200, data: 'Automation successfully updated' }
    }
    return { status: 404, data: 'Oops! could not find automation' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const saveListener = async (
  autmationId: string,
  listener: 'SMARTAI' | 'MESSAGE',
  prompt: string,
  reply?: string,
  buttons?: { title: string; url: string }[],
  aiSettings?: {
    tone?: 'PROFESSIONAL' | 'FRIENDLY' | 'CASUAL' | 'ENTHUSIASTIC'
    maxLength?: number
    useEmojis?: boolean
    responseStyle?: 'CONCISE' | 'DETAILED' | 'BALANCED'
  }
) => {
  await onCurrentUser()
  try {
    const create = await addListener(autmationId, listener, prompt, reply, buttons, aiSettings)
    if (create) return { status: 200, data: 'Listener created' }
    return { status: 404, data: 'Cant save listener' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const updateAISettings = async (
  automationId: string,
  aiSettings: {
    tone?: 'PROFESSIONAL' | 'FRIENDLY' | 'CASUAL' | 'ENTHUSIASTIC'
    maxLength?: number
    useEmojis?: boolean
    responseStyle?: 'CONCISE' | 'DETAILED' | 'BALANCED'
  }
) => {
  await onCurrentUser()
  try {
    const update = await updateListenerAISettings(automationId, aiSettings)
    if (update) return { status: 200, data: 'AI settings updated' }
    return { status: 404, data: 'Listener not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser()
  try {
    const create = await addTrigger(automationId, trigger)
    if (create) return { status: 200, data: 'Trigger saved' }
    return { status: 404, data: 'Cannot save trigger' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser()
  try {
    const create = await addKeyWord(automationId, keyword)

    if (create) return { status: 200, data: 'Keyword added successfully' }

    return { status: 404, data: 'Cannot add this keyword' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const deleteKeyword = async (id: string) => {
  await onCurrentUser()
  try {
    const deleted = await deleteKeywordQuery(id)
    if (deleted)
      return {
        status: 200,
        data: 'Keyword deleted',
      }
    return { status: 404, data: 'Keyword not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const getProfilePosts = async () => {
  const user = await onCurrentUser()
  try {
    const profile = await findUser(user.id)
    
    // Check if user exists
    if (!profile) {
      console.log('🔴 Error: User profile not found')
      return { status: 404, data: null }
    }
    
    // Check if user has Instagram integration
    if (!profile.integrations || profile.integrations.length === 0) {
      console.log('🔴 Error: No Instagram integration found')
      return { status: 404, data: { data: [] } }
    }
    
    // Check if token exists
    if (!profile.integrations[0].token) {
      console.log('🔴 Error: Instagram token not found')
      return { status: 401, data: { data: [] } }
    }
    
    // Check if Instagram ID exists
    if (!profile.integrations[0].instagramId) {
      console.log('🔴 Error: Instagram ID not found')
      return { status: 401, data: { data: [] } }
    }
    
    const instagramBaseUrl = process.env.INSTAGRAM_BASE_URL
    if (!instagramBaseUrl) {
      console.log('🔴 Error: INSTAGRAM_BASE_URL not configured')
      return { status: 500, data: { data: [] } }
    }
    
    // Fetch posts from Instagram API using the correct endpoint
    const postsResponse = await fetch(
      `${instagramBaseUrl}/${profile.integrations[0].instagramId}/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile.integrations[0].token}`
    )
    
    // Check HTTP response status
    if (!postsResponse.ok) {
      const errorData = await postsResponse.json().catch(() => ({}))
      console.log('🔴 Error fetching Instagram posts:', postsResponse.status, errorData)
      return { status: postsResponse.status, data: { data: [] } }
    }
    
    const parsed = await postsResponse.json()
    
    // Check if Instagram API returned an error
    if (parsed.error) {
      console.log('🔴 Instagram API error:', parsed.error)
      return { status: 400, data: { data: [] } }
    }
    
    // Instagram API returns { data: [...] }, ensure we return it correctly
    if (parsed && parsed.data && Array.isArray(parsed.data)) {
      return { status: 200, data: parsed }
    }
    
    // If no data array, return empty array
    console.log('🔴 Warning: Instagram API returned unexpected format:', parsed)
    return { status: 200, data: { data: [] } }
  } catch (error: any) {
    console.log('🔴 server side Error in getting posts:', error?.message || error)
    return { status: 500, data: { data: [] } }
  }
}

export const savePosts = async (
  autmationId: string,
  posts: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }[]
) => {
  await onCurrentUser()
  try {
    const create = await addPost(autmationId, posts)

    if (create) return { status: 200, data: 'Posts attached' }

    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const activateAutomation = async (id: string, state: boolean) => {
  await onCurrentUser()
  try {
    const update = await updateAutomation(id, { active: state })
    if (update)
      return {
        status: 200,
        data: `Automation ${state ? 'activated' : 'disabled'}`,
      }
    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const duplicateAutomation = async (automationId: string) => {
  const user = await onCurrentUser()
  try {
    // Get the database user to get the UUID
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: 'User not found' }
    }
    
    const cloned = await cloneAutomationQuery(automationId, dbUser.id)
    
    if (cloned) {
      return {
        status: 200,
        data: 'Automation duplicated successfully',
        automation: cloned,
      }
    }
    
    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    console.error('Error duplicating automation:', error)
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const deleteAutomation = async (automationId: string) => {
  await onCurrentUser()
  try {
    const deleted = await deleteAutomationQuery(automationId)
    if (deleted) {
      return { status: 200, data: 'Automation deleted successfully' }
    }
    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    console.error('Error deleting automation:', error)
    return { status: 500, data: 'Oops! something went wrong' }
  }
}
