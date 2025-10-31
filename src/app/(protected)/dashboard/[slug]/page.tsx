'use client'
import DoubleGradientCard from '@/components/global/double-gradient-card'
import { DASHBOARD_CARDS } from '@/constants/dashboard'
import { BarDuoToneBlue } from '@/icons'
import React from 'react'
import Chart from './_components/metrics'
import MetricsCard from './_components/metrics/metrics-card'

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
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl group hover:border-light-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-6">
        <span className="flex gap-x-1 z-50 items-center transition-all duration-300 group-hover:scale-[1.01] cursor-default">
          <BarDuoToneBlue className="transition-all duration-300 group-hover:rotate-3 group-hover:scale-110" />
          <div className="z-50">
            <h2 className="text-2xl font-medium text-white transition-all duration-300 group-hover:text-white/90">
              Automated Activity
            </h2>
            <p className="text-text-secondary text-sm transition-colors duration-300 group-hover:text-text-secondary/80">
              Automated 0 out of 1 interactions
            </p>
          </div>
        </span>
        <div className="w-full flex lg:flex-row flex-col gap-5 mt-5">
          <div 
            className="lg:w-6/12 animate-in fade-in slide-in-from-left-4"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            <Chart />
          </div>
          <div 
            className="lg:w-6/12 animate-in fade-in slide-in-from-right-4"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            <MetricsCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
