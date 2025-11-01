'use server'

import { client } from '@/lib/prisma'

export type AnalyticsTimeRange = '7d' | '30d' | '90d' | 'all'

export type DailyMetrics = {
  date: string
  dms: number
  comments: number
  total: number
}

export type AutomationPerformance = {
  automationId: string
  automationName: string
  dmCount: number
  commentCount: number
  totalResponses: number
  isActive: boolean
  createdAt: Date
}

export type KeywordPerformance = {
  keyword: string
  automationId: string
  automationName: string
  triggerCount: number
}

// Get daily metrics for time series chart
export const getDailyMetrics = async (
  userId: string,
  range: AnalyticsTimeRange = '30d'
) => {
  const now = new Date()
  let startDate: Date

  switch (range) {
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    case '90d':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      break
    default:
      startDate = new Date(0) // All time
  }

  // Get all automations for this user
  const user = await client.user.findUnique({
    where: { id: userId },
    select: {
      automations: {
        select: { id: true },
      },
    },
  })

  if (!user || user.automations.length === 0) {
    return []
  }

  const automationIds = user.automations.map((a) => a.id)

  // Get all DMs grouped by date
  const dmsByDate = await client.dms.findMany({
    where: {
      automationId: { in: automationIds },
      createdAt: { gte: startDate },
    },
    select: {
      createdAt: true,
      automationId: true,
    },
  })

  // Group by date and count
  const dailyMap = new Map<string, { dms: number; comments: number }>()

  dmsByDate.forEach((dm) => {
    const dateKey = dm.createdAt.toISOString().split('T')[0]
    const current = dailyMap.get(dateKey) || { dms: 0, comments: 0 }
    dailyMap.set(dateKey, {
      ...current,
      dms: current.dms + 1,
    })
  })

  // Get comment counts from listener (these are tracked separately)
  const listeners = await client.listener.findMany({
    where: {
      Automation: {
        userId: userId,
        id: { in: automationIds },
      },
    },
    select: {
      automationId: true,
      commentCount: true,
      dmCount: true,
    },
  })

  // Generate date range and fill in missing days
  const days = range === 'all' ? 365 : parseInt(range.replace('d', ''))
  const result: DailyMetrics[] = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dateKey = date.toISOString().split('T')[0]
    const dayData = dailyMap.get(dateKey) || { dms: 0, comments: 0 }

    result.push({
      date: dateKey,
      dms: dayData.dms,
      comments: dayData.comments,
      total: dayData.dms + dayData.comments,
    })
  }

  return result
}

// Get automation performance breakdown
export const getAutomationPerformance = async (userId: string) => {
  const automations = await client.automation.findMany({
    where: { userId },
    include: {
      listener: true,
      trigger: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return automations.map(
    (auto): AutomationPerformance => ({
      automationId: auto.id,
      automationName: auto.name,
      dmCount: auto.listener?.dmCount || 0,
      commentCount: auto.listener?.commentCount || 0,
      totalResponses: (auto.listener?.dmCount || 0) + (auto.listener?.commentCount || 0),
      isActive: auto.active,
      createdAt: auto.createdAt,
    })
  )
}

// Get keyword performance
export const getKeywordPerformance = async (userId: string) => {
  const automations = await client.automation.findMany({
    where: { userId },
    include: {
      keywords: true,
      listener: true,
    },
  })

  // Count keyword triggers by analyzing DMs
  const keywordMap = new Map<string, { automationId: string; automationName: string; count: number }>()

  automations.forEach((auto) => {
    auto.keywords.forEach((keyword) => {
      const key = `${auto.id}-${keyword.word}`
      keywordMap.set(key, {
        automationId: auto.id,
        automationName: auto.name,
        count: 0, // Will be calculated from DMs
      })
    })
  })

  // Get all DMs to count keyword triggers
  const allDms = await client.dms.findMany({
    where: {
      automationId: { in: automations.map((a) => a.id) },
    },
    select: {
      automationId: true,
      message: true,
      createdAt: true,
    },
  })

  // Match keywords in messages
  automations.forEach((auto) => {
    auto.keywords.forEach((keyword) => {
      const matchingDms = allDms.filter(
        (dm) =>
          dm.automationId === auto.id &&
          dm.message?.toLowerCase().includes(keyword.word.toLowerCase())
      )

      const key = `${auto.id}-${keyword.word}`
      const existing = keywordMap.get(key)
      if (existing) {
        existing.count = matchingDms.length
        keywordMap.set(key, existing)
      }
    })
  })

  // Build keyword performance list
  const keywordPerformance: KeywordPerformance[] = []
  
  automations.forEach((auto) => {
    auto.keywords.forEach((keyword) => {
      const matchingDms = allDms.filter(
        (dm) =>
          dm.automationId === auto.id &&
          dm.message?.toLowerCase().includes(keyword.word.toLowerCase())
      )

      keywordPerformance.push({
        keyword: keyword.word,
        automationId: auto.id,
        automationName: auto.name,
        triggerCount: matchingDms.length,
      })
    })
  })

  return keywordPerformance.sort((a, b) => b.triggerCount - a.triggerCount)
}

// Get overall stats
export const getOverallStats = async (userId: string) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    include: {
      automations: {
        include: {
          listener: true,
          trigger: true,
        },
      },
    },
  })

  if (!user) {
    return {
      totalAutomations: 0,
      activeAutomations: 0,
      totalResponses: 0,
      totalDMs: 0,
      totalComments: 0,
      responseRate: 0,
      totalConversations: 0,
      avgResponseTime: 0,
    }
  }

  const totalAutomations = user.automations.length
  const activeAutomations = user.automations.filter((a) => a.active).length

  const totalDMs = user.automations.reduce(
    (sum, a) => sum + (a.listener?.dmCount || 0),
    0
  )
  const totalComments = user.automations.reduce(
    (sum, a) => sum + (a.listener?.commentCount || 0),
    0
  )
  const totalResponses = totalDMs + totalComments

  // Get total conversation count (unique users)
  const uniqueUsers = await client.dms.findMany({
    where: {
      automationId: { in: user.automations.map((a) => a.id) },
    },
    distinct: ['reciever'],
    select: { reciever: true },
  })

  const totalConversations = uniqueUsers.length
  const responseRate =
    totalConversations > 0 ? (totalResponses / totalConversations) * 100 : 0

  return {
    totalAutomations,
    activeAutomations,
    totalResponses,
    totalDMs,
    totalComments,
    responseRate: Math.round(responseRate * 100) / 100,
    totalConversations,
    avgResponseTime: 0, // Would need to track this separately
  }
}

