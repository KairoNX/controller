'use client'
import { useStatsOverview } from '@/hooks/use-analytics'
import { useGoals } from '@/hooks/use-goals'
import { TrendingUp, MessageCircle, Zap, Users } from 'lucide-react'
import React, { useEffect } from 'react'

type Props = {}

const StatsOverview = (props: Props) => {
  const { data, isLoading } = useStatsOverview()
  const { refetch: refetchGoals } = useGoals()

  // Sync goals when stats update
  useEffect(() => {
    if (data?.status === 200) {
      refetchGoals()
    }
  }, [data, refetchGoals])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-xl border-[1px] border-in-active/50 bg-background-80 animate-pulse overflow-hidden"
          >
            <div className="h-4 bg-gray-700/30 rounded w-3/4 mb-3" />
            <div className="h-8 bg-gray-700/30 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  const stats = data?.status === 200 ? data.data : null

  if (!stats) {
    return null
  }

  const statCards = [
    {
      label: 'Total Responses',
      value: stats.totalResponses.toLocaleString(),
      icon: MessageCircle,
    },
    {
      label: 'Active Automations',
      value: `${stats.activeAutomations}/${stats.totalAutomations}`,
      icon: Zap,
    },
    {
      label: 'Response Rate',
      value: `${stats.responseRate}%`,
      icon: TrendingUp,
    },
    {
      label: 'Conversations',
      value: stats.totalConversations.toLocaleString(),
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="group relative p-5 rounded-xl border-[1px] border-in-active/50 bg-background-80 transition-all duration-300 hover:border-light-blue/50 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] overflow-hidden"
          >
            {/* Gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-light-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex items-center justify-between mb-3">
              <p className="text-xs text-text-secondary group-hover:text-text-secondary/80 transition-colors duration-300">
                {stat.label}
              </p>
              <Icon className="h-4 w-4 text-light-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="relative z-10 text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
              {stat.value}
            </p>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        )
      })}
    </div>
  )
}

export default StatsOverview

