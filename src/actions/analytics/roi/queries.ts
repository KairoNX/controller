'use server'

import { getAutomationPerformance } from '../queries'

export type ROICalculation = {
  automationId: string
  automationName: string
  totalResponses: number
  estimatedTimeSaved: number // in minutes
  estimatedMoneyEarned: number // in dollars
  hourlyRate: number
}

// Average time to respond to a DM or comment manually (in minutes)
const AVERAGE_RESPONSE_TIME = 2 // 2 minutes per response

export async function calculateROI(
  userId: string,
  hourlyRate: number = 25 // Default $25/hour
): Promise<ROICalculation[]> {
  try {
    const automations = await getAutomationPerformance(userId)

    return automations.map((auto) => {
      const totalResponses = auto.totalResponses
      const timeSaved = totalResponses * AVERAGE_RESPONSE_TIME // in minutes
      const hoursSaved = timeSaved / 60
      const moneyEarned = hoursSaved * hourlyRate

      return {
        automationId: auto.automationId,
        automationName: auto.automationName,
        totalResponses,
        estimatedTimeSaved: Math.round(timeSaved),
        estimatedMoneyEarned: Math.round(moneyEarned * 100) / 100, // Round to 2 decimals
        hourlyRate,
      }
    })
  } catch (error) {
    console.error('Error calculating ROI:', error)
    return []
  }
}

export async function getTotalROI(userId: string, hourlyRate: number = 25) {
  const roi = await calculateROI(userId, hourlyRate)
  
  const totals = roi.reduce(
    (acc, item) => ({
      totalResponses: acc.totalResponses + item.totalResponses,
      totalTimeSaved: acc.totalTimeSaved + item.estimatedTimeSaved,
      totalMoneyEarned: acc.totalMoneyEarned + item.estimatedMoneyEarned,
    }),
    {
      totalResponses: 0,
      totalTimeSaved: 0,
      totalMoneyEarned: 0,
    }
  )

  return {
    ...totals,
    totalHoursSaved: Math.round((totals.totalTimeSaved / 60) * 100) / 100,
    breakdown: roi,
  }
}

