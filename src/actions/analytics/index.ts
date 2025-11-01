'use server'

import { onCurrentUser } from '../user'
import { findUser } from '../user/queries'
import {
  getDailyMetrics,
  getAutomationPerformance,
  getKeywordPerformance,
  getOverallStats,
  type AnalyticsTimeRange,
} from './queries'

export const getAnalyticsMetrics = async (range: AnalyticsTimeRange = '30d') => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: null }
    }

    const metrics = await getDailyMetrics(dbUser.id, range)
    return { status: 200, data: metrics }
  } catch (error) {
    console.error('Error fetching analytics metrics:', error)
    return { status: 500, data: [] }
  }
}

export const getAutomationAnalytics = async () => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: [] }
    }

    const performance = await getAutomationPerformance(dbUser.id)
    return { status: 200, data: performance }
  } catch (error) {
    console.error('Error fetching automation analytics:', error)
    return { status: 500, data: [] }
  }
}

export const getKeywordAnalytics = async () => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: [] }
    }

    const performance = await getKeywordPerformance(dbUser.id)
    return { status: 200, data: performance }
  } catch (error) {
    console.error('Error fetching keyword analytics:', error)
    return { status: 500, data: [] }
  }
}

export const getStatsOverview = async () => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: null }
    }

    const stats = await getOverallStats(dbUser.id)
    return { status: 200, data: stats }
  } catch (error) {
    console.error('Error fetching stats overview:', error)
    return { status: 500, data: null }
  }
}

