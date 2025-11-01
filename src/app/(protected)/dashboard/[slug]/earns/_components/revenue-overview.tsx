'use client'
import { useRevenueStats } from '@/hooks/use-earns'
import { DollarSign, TrendingUp, Wallet, Percent } from 'lucide-react'
import React from 'react'
import { centsToDollars } from '@/lib/stripe-utils'

const RevenueOverview = () => {
  const { data: stats, isLoading, error } = useRevenueStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse h-32 bg-background-80 rounded-xl border border-in-active/50" />
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary">Failed to load revenue data</p>
      </div>
    )
  }

  const cards = [
    {
      title: 'Total Earnings',
      value: `$${centsToDollars(stats.allTime.earnings).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: `From ${stats.allTime.sales} sales`,
      icon: Wallet,
      color: 'text-keyword-green',
      bgGradient: 'from-green-500/20 to-green-600/10',
    },
    {
      title: 'This Month',
      value: `$${centsToDollars(stats.thisMonth.earnings).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: `${stats.thisMonth.sales} sales`,
      icon: TrendingUp,
      color: 'text-light-blue',
      bgGradient: 'from-blue-500/20 to-blue-600/10',
    },
    {
      title: 'Last 30 Days',
      value: `$${centsToDollars(stats.last30Days.earnings).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: `${stats.last30Days.sales} sales`,
      icon: DollarSign,
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/20 to-yellow-600/10',
    },
    {
      title: 'Platform Fee',
      value: `${((stats.allTime.fees / stats.allTime.revenue) * 100).toFixed(1)}%`,
      subtitle: `$${centsToDollars(stats.allTime.fees).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total`,
      icon: Percent,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-purple-600/10',
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-medium text-white mb-2">Revenue Overview</h2>
        <p className="text-text-secondary text-sm">Track your earnings and sales performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="bg-background-90 p-6 rounded-xl border border-in-active/50 hover:border-in-active transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${card.bgGradient}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-xs text-text-secondary">{card.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RevenueOverview

