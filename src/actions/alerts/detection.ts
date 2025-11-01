'use server'

import { getOverallStats } from '../analytics/queries'
import { getActiveAlerts, markAlertTriggered, type MetricType } from './queries'
import { findUser } from '../user/queries'
import { sendEmail } from '@/lib/email'
import { generateAlertEmail } from '@/lib/email-templates'
import { compareEngagement, saveEngagementSnapshot } from '../engagement/snapshot'

export async function checkPerformanceAlerts(userId: string) {
  try {
    const user = await findUser(userId)
    if (!user || !user.email) return

    // Save today's engagement snapshot
    await saveEngagementSnapshot(userId)

    const currentStats = await getOverallStats(userId)
    const alerts = await getActiveAlerts(userId)
    const engagementComparison = await compareEngagement(userId)

    if (alerts.length === 0) return

    for (const alert of alerts) {
      if (!alert.enabled) continue

      let currentValue = 0
      let previousValue = 0
      let percentageDrop = 0
      let shouldTrigger = false

      // Get current metric value
      switch (alert.metricType) {
        case 'TOTAL_RESPONSES':
          currentValue = currentStats.totalResponses
          previousValue = engagementComparison?.totalResponses.previous || 0
          percentageDrop = engagementComparison?.totalResponses.change || 0
          break
        case 'DM_RESPONSES':
          currentValue = currentStats.totalDMs
          previousValue = engagementComparison?.totalDMs.previous || 0
          percentageDrop = engagementComparison?.totalDMs.change || 0
          break
        case 'COMMENT_RESPONSES':
          currentValue = currentStats.totalComments
          previousValue = engagementComparison?.totalComments.previous || 0
          percentageDrop = engagementComparison?.totalComments.change || 0
          break
        case 'CONVERSATIONS':
          currentValue = currentStats.totalConversations
          previousValue = engagementComparison?.totalConversations.previous || 0
          percentageDrop = engagementComparison?.totalConversations.change || 0
          break
        case 'RESPONSE_RATE':
          currentValue = currentStats.responseRate
          previousValue = engagementComparison?.responseRate.previous || 0
          percentageDrop = engagementComparison?.responseRate.change || 0
          break
        case 'ACTIVE_AUTOMATIONS':
          currentValue = currentStats.activeAutomations
          previousValue = currentValue // No historical data for active count
          percentageDrop = 0
          break
      }

      // Check if alert should trigger
      if (alert.type === 'METRIC_DROP' || alert.type === 'LOW_ENGAGEMENT') {
        // For LOW_ENGAGEMENT, check if engagement dropped by threshold percentage
        if (alert.type === 'LOW_ENGAGEMENT' && engagementComparison) {
          // Engagement dropped by more than threshold percentage
          if (percentageDrop < -alert.threshold) {
            shouldTrigger = true
          }
        } else if (alert.type === 'METRIC_DROP') {
          // Absolute value drop below threshold
          if (currentValue < alert.threshold) {
            shouldTrigger = true
          }
        }
      } else if (alert.type === 'THRESHOLD_EXCEEDED') {
        // Value exceeded threshold
        if (currentValue > alert.threshold) {
          shouldTrigger = true
        }
      }

      // Check if alert should be triggered (avoid duplicate alerts within 24 hours)
      const lastTriggered = alert.lastTriggered
      const shouldNotify = !lastTriggered || 
        (Date.now() - lastTriggered.getTime()) > 24 * 60 * 60 * 1000 // 24 hours

      if (shouldTrigger && shouldNotify && alert.emailNotify) {
        // Prepare alert details
        const alertDetails = {
          alertName: alert.name,
          metricType: alert.metricType,
          currentValue,
          previousValue: previousValue > 0 ? previousValue : alert.threshold,
          threshold: alert.threshold,
          percentageDrop: alert.type === 'LOW_ENGAGEMENT' ? Math.abs(percentageDrop) : 0,
          userName: user.firstname || 'there',
        }

        // Send email notification
        const emailHtml = generateAlertEmail(alertDetails)

        await sendEmail({
          to: user.email,
          subject: `⚠️ Performance Alert: ${alert.name}`,
          html: emailHtml,
        })

        // Mark as triggered
        await markAlertTriggered(alert.id)
      }
    }
  } catch (error) {
    console.error('Error checking performance alerts:', error)
  }
}

