'use client'
import { useAutomationAnalytics } from '@/hooks/use-analytics'
import { usePaths } from '@/hooks/user-nav'
import { Activity, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const AutomationPerformance = (props: Props) => {
  const { data, isLoading } = useAutomationAnalytics()
  const { pathname } = usePaths()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-5 rounded-xl border-[1px] border-in-active/50 bg-background-80 animate-pulse overflow-hidden"
          >
            <div className="h-4 bg-gray-700/30 rounded w-1/2 mb-2" />
            <div className="h-6 bg-gray-700/30 rounded w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  const automations = data?.status === 200 ? data.data : []

  if (automations.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl border-[1px] border-in-active/50 bg-background-80">
        <p className="text-text-secondary">No automation data yet</p>
      </div>
    )
  }

  // Sort by total responses
  const sortedAutomations = [...automations].sort(
    (a, b) => b.totalResponses - a.totalResponses
  )

  return (
    <div className="space-y-3">
      {sortedAutomations.slice(0, 5).map((auto) => (
        <Link
          key={auto.automationId}
          href={`${pathname}/automations/${auto.automationId}`}
          className="group block p-5 rounded-xl border-[1px] border-in-active/50 bg-background-80 hover:border-light-blue/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden relative"
        >
          {/* Gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-light-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-2 group-hover:text-white/90 transition-colors duration-300">
                {auto.automationName}
              </h4>
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{auto.dmCount} DMs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span>{auto.commentCount} Comments</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-light-blue group-hover:scale-110 transition-transform duration-300">
                {auto.totalResponses}
              </p>
              <p className="text-xs text-text-secondary">responses</p>
            </div>
          </div>
          <div className="relative z-10 mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full overflow-hidden bg-in-active/20">
              <div
                className="h-full rounded-full bg-light-blue transition-all duration-300"
                style={{
                  width: `${Math.min((auto.totalResponses / Math.max(sortedAutomations[0]?.totalResponses || 1, 1)) * 100, 100)}%`,
                }}
              />
            </div>
            <span
              className={`text-xs ${
                auto.isActive ? 'text-green-400' : 'text-text-secondary'
              }`}
            >
              {auto.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </Link>
      ))}
    </div>
  )
}

export default AutomationPerformance

