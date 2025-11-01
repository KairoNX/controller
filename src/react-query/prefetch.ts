import { getAllAutomations, getAutomationInfo } from '@/actions/automations'
import {
  getAnalyticsMetrics,
  getAutomationAnalytics,
  getStatsOverview,
} from '@/actions/analytics'
import { getGoals } from '@/actions/goals'
import { getAlerts } from '@/actions/alerts'
import { onUserInfo } from '@/actions/user'
import { QueryClient, QueryFunction } from '@tanstack/react-query'

const prefetch = async (
  client: QueryClient,
  action: QueryFunction,
  key: string | string[]
) => {
  return await client.prefetchQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: action,
    staleTime: 60000,
  })
}

export const PrefetchUserProfile = async (client: QueryClient) => {
  return await prefetch(client, onUserInfo, 'user-profile')
}

export const PrefetchUserAutnomations = async (client: QueryClient) => {
  return await prefetch(client, getAllAutomations, 'user-automations')
}

export const PrefetchUserAutomation = async (
  client: QueryClient,
  automationId: string
) => {
  return await prefetch(
    client,
    () => getAutomationInfo(automationId),
    'automation-info'
  )
}

export const PrefetchAnalytics = async (client: QueryClient) => {
  await Promise.all([
    prefetch(client, () => getStatsOverview(), 'stats-overview'),
    prefetch(client, () => getAnalyticsMetrics('30d'), ['analytics-metrics', '30d']),
    prefetch(client, getAutomationAnalytics, 'automation-analytics'),
    prefetch(client, getGoals, 'user-goals'),
    prefetch(client, getAlerts, 'user-alerts'),
  ])
}
