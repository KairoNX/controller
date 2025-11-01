'use client'
import DoubleGradientCard from '@/components/global/double-gradient-card'
import { DASHBOARD_CARDS } from '@/constants/dashboard'
import React from 'react'
import StatsOverview from './_components/metrics/stats-overview'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card, index) => (
          <div
            key={card.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both',
            }}
          >
            <DoubleGradientCard {...card} />
          </div>
        ))}
      </div>

      {/* Quick Stats Overview */}
      <div className="animate-in fade-in slide-in-from-bottom-4">
        <StatsOverview />
      </div>
    </div>
  )
}

export default Page
