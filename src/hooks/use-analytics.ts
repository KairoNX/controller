import { useQuery } from '@tanstack/react-query'
import {
  getAnalyticsMetrics,
  getAutomationAnalytics,
  getKeywordAnalytics,
  getStatsOverview,
} from '@/actions/analytics'
import type { AnalyticsTimeRange } from '@/actions/analytics/queries'

export const useAnalyticsMetrics = (range: AnalyticsTimeRange = '30d') => {
  return useQuery({
    queryKey: ['analytics-metrics', range],
    queryFn: () => getAnalyticsMetrics(range),
  })
}

export const useAutomationAnalytics = () => {
  return useQuery({
    queryKey: ['automation-analytics'],
    queryFn: getAutomationAnalytics,
  })
}

export const useKeywordAnalytics = () => {
  return useQuery({
    queryKey: ['keyword-analytics'],
    queryFn: getKeywordAnalytics,
  })
}

export const useStatsOverview = () => {
  return useQuery({
    queryKey: ['stats-overview'],
    queryFn: getStatsOverview,
  })
}

