'use server'

import { client } from '@/lib/prisma'
import { getOverallStats } from '../analytics/queries'
import { format, startOfDay } from 'date-fns'

// Save daily engagement snapshot
export async function saveEngagementSnapshot(userId: string) {
  try {
    const stats = await getOverallStats(userId)
    const today = startOfDay(new Date())

    // Check if snapshot already exists for today
    const existing = await client.engagementSnapshot.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    })

    if (existing) {
      // Update existing snapshot
      return await client.engagementSnapshot.update({
        where: { id: existing.id },
        data: {
          totalResponses: stats.totalResponses,
          totalDMs: stats.totalDMs,
          totalComments: stats.totalComments,
          totalConversations: stats.totalConversations,
          responseRate: stats.responseRate,
          activeAutomations: stats.activeAutomations,
        },
      })
    }

    // Create new snapshot
    return await client.engagementSnapshot.create({
      data: {
        userId,
        date: today,
        totalResponses: stats.totalResponses,
        totalDMs: stats.totalDMs,
        totalComments: stats.totalComments,
        totalConversations: stats.totalConversations,
        responseRate: stats.responseRate,
        activeAutomations: stats.activeAutomations,
      },
    })
  } catch (error) {
    console.error('Error saving engagement snapshot:', error)
    return null
  }
}

// Get engagement snapshots for comparison
export async function getEngagementSnapshots(
  userId: string,
  days: number = 7
) {
  try {
    const endDate = startOfDay(new Date())
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000)

    return await client.engagementSnapshot.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
  } catch (error) {
    console.error('Error fetching engagement snapshots:', error)
    return []
  }
}

// Compare current engagement with previous period
export async function compareEngagement(userId: string) {
  try {
    const currentStats = await getOverallStats(userId)
    const snapshots = await getEngagementSnapshots(userId, 14) // Get last 14 days

    if (snapshots.length < 2) {
      return null // Not enough data to compare
    }

    // Get average of previous week (excluding today)
    const previousWeek = snapshots.slice(1, 8) // Days 2-8
    const currentWeek = [snapshots[0]] // Today

    if (previousWeek.length === 0) {
      return null
    }

    // Calculate averages
    const previousAvg = {
      totalResponses: previousWeek.reduce((sum, s) => sum + s.totalResponses, 0) / previousWeek.length,
      totalDMs: previousWeek.reduce((sum, s) => sum + s.totalDMs, 0) / previousWeek.length,
      totalComments: previousWeek.reduce((sum, s) => sum + s.totalComments, 0) / previousWeek.length,
      totalConversations: previousWeek.reduce((sum, s) => sum + s.totalConversations, 0) / previousWeek.length,
      responseRate: previousWeek.reduce((sum, s) => sum + s.responseRate, 0) / previousWeek.length,
    }

    const current = {
      totalResponses: currentStats.totalResponses,
      totalDMs: currentStats.totalDMs,
      totalComments: currentStats.totalComments,
      totalConversations: currentStats.totalConversations,
      responseRate: currentStats.responseRate,
    }

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0
      return ((current - previous) / previous) * 100
    }

    return {
      totalResponses: {
        current: current.totalResponses,
        previous: previousAvg.totalResponses,
        change: calculateChange(current.totalResponses, previousAvg.totalResponses),
      },
      totalDMs: {
        current: current.totalDMs,
        previous: previousAvg.totalDMs,
        change: calculateChange(current.totalDMs, previousAvg.totalDMs),
      },
      totalComments: {
        current: current.totalComments,
        previous: previousAvg.totalComments,
        change: calculateChange(current.totalComments, previousAvg.totalComments),
      },
      totalConversations: {
        current: current.totalConversations,
        previous: previousAvg.totalConversations,
        change: calculateChange(current.totalConversations, previousAvg.totalConversations),
      },
      responseRate: {
        current: current.responseRate,
        previous: previousAvg.responseRate,
        change: calculateChange(current.responseRate, previousAvg.responseRate),
      },
    }
  } catch (error) {
    console.error('Error comparing engagement:', error)
    return null
  }
}

