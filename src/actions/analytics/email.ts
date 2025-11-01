'use server'

import { onCurrentUser } from '../user'
import { findUser } from '../user/queries'
import { getOverallStats, getAutomationPerformance } from './queries'
import { sendEmail } from '@/lib/email'
import { generateAnalyticsReportEmail } from '@/lib/email-templates'
import { format, subDays } from 'date-fns'

export async function sendAnalyticsReport() {
  try {
    const user = await onCurrentUser()
    const dbUser = await findUser(user.id)

    if (!dbUser) {
      return { status: 404, error: 'User not found' }
    }

    // Get analytics data
    const stats = await getOverallStats(dbUser.id)
    const automations = await getAutomationPerformance(dbUser.id)

    // Sort automations by performance
    const topAutomations = [...automations].sort(
      (a, b) => b.totalResponses - a.totalResponses
    )

    // Generate date range (last 7 days)
    const endDate = new Date()
    const startDate = subDays(endDate, 7)
    const dateRange = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`

    // Generate email HTML
    const emailHtml = generateAnalyticsReportEmail({
      userName: dbUser.firstname || 'there',
      totalResponses: stats.totalResponses,
      totalDMs: stats.totalDMs,
      totalComments: stats.totalComments,
      activeAutomations: stats.activeAutomations,
      totalAutomations: stats.totalAutomations,
      responseRate: stats.responseRate,
      totalConversations: stats.totalConversations,
      topAutomations: topAutomations.slice(0, 5),
      dateRange,
    })

    // Send email
    const emailResult = await sendEmail({
      to: dbUser.email,
      subject: `Your Zenus Weekly Analytics Report - ${dateRange}`,
      html: emailHtml,
    })

    if (!emailResult.success) {
      console.error('Failed to send analytics report:', emailResult.error)
      return { 
        status: 500, 
        error: emailResult.error || 'Failed to send email',
        details: emailResult.details 
      }
    }

    return { status: 200, message: 'Analytics report sent successfully' }
  } catch (error: any) {
    console.error('Error sending analytics report:', error)
    return { status: 500, error: error.message || 'Internal server error' }
  }
}

export async function sendAnalyticsReportToUser(userId: string) {
  try {
    const dbUser = await findUser(userId)
    
    if (!dbUser || !dbUser.email) {
      return { status: 404, error: 'User not found or no email' }
    }

    // Get analytics data
    const stats = await getOverallStats(dbUser.id)
    const automations = await getAutomationPerformance(dbUser.id)

    const topAutomations = [...automations].sort(
      (a, b) => b.totalResponses - a.totalResponses
    )

    const endDate = new Date()
    const startDate = subDays(endDate, 7)
    const dateRange = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`

    const emailHtml = generateAnalyticsReportEmail({
      userName: dbUser.firstname || 'there',
      totalResponses: stats.totalResponses,
      totalDMs: stats.totalDMs,
      totalComments: stats.totalComments,
      activeAutomations: stats.activeAutomations,
      totalAutomations: stats.totalAutomations,
      responseRate: stats.responseRate,
      totalConversations: stats.totalConversations,
      topAutomations: topAutomations.slice(0, 5),
      dateRange,
    })

    const emailResult = await sendEmail({
      to: dbUser.email,
      subject: `Your Zenus Weekly Analytics Report - ${dateRange}`,
      html: emailHtml,
    })

    if (!emailResult.success) {
      return { status: 500, error: 'Failed to send email' }
    }

    return { status: 200, message: 'Report sent' }
  } catch (error: any) {
    return { status: 500, error: error.message }
  }
}

