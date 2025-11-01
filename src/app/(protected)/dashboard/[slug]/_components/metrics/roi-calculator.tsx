'use client'
import { useROI } from '@/hooks/use-roi'
import { DollarSign, Clock, TrendingUp, Calculator } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type Props = {}

const ROICalculator = (props: Props) => {
  const [hourlyRate, setHourlyRate] = useState(25)
  const [customRate, setCustomRate] = useState('')
  const { data, isLoading } = useROI(hourlyRate)

  const roi = data?.status === 200 ? data.data : null

  const handleCalculate = () => {
    if (customRate && !isNaN(parseFloat(customRate))) {
      const rate = parseFloat(customRate)
      if (rate > 0 && rate !== hourlyRate) {
        setHourlyRate(rate)
        setCustomRate('') // Clear input after applying
      }
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border-[1px] border-in-active/50 bg-background-80 p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700/30 rounded w-1/3" />
          <div className="h-32 bg-gray-700/30 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border-[1px] border-in-active/50 bg-background-80 p-5">
      <div className="flex items-center gap-2 mb-5">
        <Calculator className="h-5 w-5 text-light-blue" />
        <h3 className="text-lg font-semibold text-white">ROI Calculator</h3>
      </div>

      {/* Hourly Rate Input */}
      <div className="mb-6 p-4 bg-background-90 rounded-lg border border-in-active/30">
        <Label htmlFor="hourlyRate" className="text-text-secondary mb-2 block">
          Your Hourly Rate ($/hour)
        </Label>
        <div className="flex gap-2">
          <div className="flex gap-2 flex-wrap">
            {[15, 25, 50, 100].map((rate) => (
              <Button
                key={rate}
                variant={hourlyRate === rate ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHourlyRate(rate)}
                className={
                  hourlyRate === rate
                    ? 'bg-light-blue text-white'
                    : 'border-in-active/50 text-text-secondary'
                }
              >
                ${rate}/hr
              </Button>
            ))}
          </div>
          <div className="flex gap-2 flex-1">
            <Input
              id="hourlyRate"
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              placeholder="Custom rate"
              className="bg-background-80 border-in-active/50 text-white flex-1"
              min="1"
              step="1"
            />
            <Button
              onClick={handleCalculate}
              className="bg-light-blue hover:bg-light-blue/90 text-white"
              size="sm"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {roi ? (
        <>
          {/* Total ROI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg border border-in-active/50 bg-background-90">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-light-blue" />
                <span className="text-xs text-text-secondary">Time Saved</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {roi.totalHoursSaved}h
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {roi.totalTimeSaved} minutes
              </div>
            </div>

            <div className="p-4 rounded-lg border border-in-active/50 bg-background-90">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-xs text-text-secondary">Money Earned</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                ${roi.totalMoneyEarned.toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                @ ${hourlyRate}/hour
              </div>
            </div>

            <div className="p-4 rounded-lg border border-in-active/50 bg-background-90">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-400" />
                <span className="text-xs text-text-secondary">Total Responses</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {roi.totalResponses.toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                Automated responses
              </div>
            </div>
          </div>

          {/* Per Automation Breakdown */}
          {roi.breakdown && roi.breakdown.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white mb-3">
                Per Automation Breakdown
              </h4>
              <div className="space-y-2">
                {roi.breakdown.map((item) => (
                  <div
                    key={item.automationId}
                    className="p-3 rounded-lg border border-in-active/30 bg-background-90"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">
                        {item.automationName}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {item.totalResponses} responses
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1 text-text-secondary">
                        <Clock className="h-3 w-3" />
                        {item.estimatedTimeSaved}m saved
                      </div>
                      <div className="flex items-center gap-1 text-green-400">
                        <DollarSign className="h-3 w-3" />
                        ${item.estimatedMoneyEarned.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!roi.breakdown || roi.breakdown.length === 0) && (
            <div className="text-center py-8 text-text-secondary text-sm">
              No automation data available yet
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-text-secondary text-sm">
          Unable to calculate ROI. Please check your automations.
        </div>
      )}
    </div>
  )
}

export default ROICalculator

