'use client'
import { BarDuoToneBlue } from '@/icons'
import React from 'react'
import Chart from '../_components/metrics'
import MetricsCard from '../_components/metrics/metrics-card'
import StatsOverview from '../_components/metrics/stats-overview'
import AutomationPerformance from '../_components/metrics/automation-performance'
import GoalTracker from '../_components/metrics/goal-tracker'
import SendReportButton from '@/components/global/send-report-button'
import PerformanceAlerts from '../_components/metrics/performance-alerts'
import ROICalculator from '../_components/metrics/roi-calculator'

type Props = {}

const AnalyticsPage = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-10">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-3 mb-2">
          <BarDuoToneBlue className="h-8 w-8 text-light-blue" />
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
        </div>
        <p className="text-text-secondary">
          Track your automation performance and engagement metrics
        </p>
      </div>

      {/* Stats Overview */}
      <div className="animate-in fade-in slide-in-from-bottom-4">
        <StatsOverview />
      </div>

      {/* Main Analytics Section */}
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl group hover:border-light-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-6">
        <div className="flex justify-between items-start mb-5">
          <span className="flex gap-x-1 z-50 items-center transition-all duration-300 group-hover:scale-[1.01] cursor-default">
            <BarDuoToneBlue className="transition-all duration-300 group-hover:rotate-3 group-hover:scale-110" />
            <div className="z-50">
              <h2 className="text-2xl font-medium text-white transition-all duration-300 group-hover:text-white/90">
                Advanced Analytics
              </h2>
              <p className="text-text-secondary text-sm transition-colors duration-300 group-hover:text-text-secondary/80">
                Detailed performance metrics and trends
              </p>
            </div>
          </span>
          <SendReportButton />
        </div>
        <div className="w-full flex lg:flex-row flex-col gap-5 mt-5">
          <div 
            className="lg:w-6/12 animate-in fade-in slide-in-from-left-4"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            <Chart />
          </div>
          <div 
            className="lg:w-6/12 animate-in slide-in-from-right-4"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            <MetricsCard />
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl group hover:border-light-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-6">
        <ROICalculator />
      </div>

      {/* Performance Alerts */}
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl group hover:border-light-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-6">
        <PerformanceAlerts />
      </div>

      {/* Goal Tracker */}
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl group hover:border-light-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-6">
        <GoalTracker />
      </div>

      {/* Automation Performance */}
      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl group hover:border-light-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-6">
        <div className="mb-5">
          <h2 className="text-2xl font-medium text-white transition-all duration-300 group-hover:text-white/90">
            Automation Performance
          </h2>
          <p className="text-text-secondary text-sm transition-colors duration-300 group-hover:text-text-secondary/80">
            See which automations are driving the most engagement
          </p>
        </div>
        <AutomationPerformance />
      </div>
    </div>
  )
}

export default AnalyticsPage

