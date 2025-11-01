import { format } from 'date-fns'
import type { AutomationPerformance } from '@/actions/analytics/queries'

type AnalyticsReportData = {
  userName: string
  totalResponses: number
  totalDMs: number
  totalComments: number
  activeAutomations: number
  totalAutomations: number
  responseRate: number
  totalConversations: number
  topAutomations: AutomationPerformance[]
  dateRange: string
}

export function generateAnalyticsReportEmail(data: AnalyticsReportData): string {
  const { userName, topAutomations } = data
  
  const topAutomationsHtml = topAutomations.length > 0
    ? topAutomations
        .slice(0, 5)
        .map(
          (auto, index) => `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px; color: #6b7280;">${index + 1}.</td>
              <td style="padding: 12px; color: #111827; font-weight: 500;">${auto.automationName}</td>
              <td style="padding: 12px; text-align: center; color: #111827;">${auto.totalResponses}</td>
              <td style="padding: 12px; text-align: center;">
                <span style="background: ${auto.isActive ? '#10b981' : '#6b7280'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                  ${auto.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          `
        )
        .join('')
    : '<tr><td colspan="4" style="padding: 20px; text-align: center; color: #6b7280;">No automations yet</td></tr>'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Zenus Analytics Report</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111827; background-color: #f9fafb; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3352CC 0%, #7C3AED 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Zenus Analytics Report</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">${data.dateRange}</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; color: #111827; margin: 0 0 30px 0;">
            Hi ${userName || 'there'},
          </p>
          <p style="font-size: 16px; color: #374151; margin: 0 0 30px 0;">
            Here's your weekly performance summary from Zenus:
          </p>

          <!-- Stats Grid -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px;">
            <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 32px; font-weight: 700; color: #3352CC; margin-bottom: 4px;">${data.totalResponses.toLocaleString()}</div>
              <div style="font-size: 14px; color: #6b7280;">Total Responses</div>
            </div>
            <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 32px; font-weight: 700; color: #10b981; margin-bottom: 4px;">${data.activeAutomations}/${data.totalAutomations}</div>
              <div style="font-size: 14px; color: #6b7280;">Active Automations</div>
            </div>
            <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 32px; font-weight: 700; color: #7C3AED; margin-bottom: 4px;">${data.responseRate}%</div>
              <div style="font-size: 14px; color: #6b7280;">Response Rate</div>
            </div>
            <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 32px; font-weight: 700; color: #f59e0b; margin-bottom: 4px;">${data.totalConversations.toLocaleString()}</div>
              <div style="font-size: 14px; color: #6b7280;">Conversations</div>
            </div>
          </div>

          <!-- Breakdown -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 20px 0;">Activity Breakdown</h2>
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="color: #6b7280;">Direct Messages</span>
                <span style="font-weight: 600; color: #111827;">${data.totalDMs.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Comments</span>
                <span style="font-weight: 600; color: #111827;">${data.totalComments.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <!-- Top Automations -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 20px 0;">Top Performing Automations</h2>
            <table style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #f9fafb;">
                  <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">#</th>
                  <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Automation</th>
                  <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Responses</th>
                  <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${topAutomationsHtml}
              </tbody>
            </table>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://zenus.space'}/dashboard" 
               style="display: inline-block; background: #3352CC; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
              View Full Dashboard
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">
            This is an automated report from Zenus
          </p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            You're receiving this because you have automations enabled.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

type AlertEmailData = {
  alertName: string
  metricType: string
  currentValue: number
  previousValue?: number
  threshold: number
  percentageDrop?: number
  userName: string
}

export function generateAlertEmail(data: AlertEmailData): string {
  const { alertName, metricType, currentValue, previousValue, threshold, percentageDrop, userName } = data

  const metricLabels: Record<string, string> = {
    TOTAL_RESPONSES: 'Total Responses',
    DM_RESPONSES: 'DM Responses',
    COMMENT_RESPONSES: 'Comment Responses',
    CONVERSATIONS: 'Conversations',
    RESPONSE_RATE: 'Response Rate',
    ACTIVE_AUTOMATIONS: 'Active Automations',
  }

  const metricLabel = metricLabels[metricType] || metricType
  const hasComparison = previousValue !== undefined && percentageDrop !== undefined && percentageDrop < 0

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Performance Alert - Zenus</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111827; background-color: #f9fafb; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">⚠️ Performance Alert</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">${alertName}</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; color: #111827; margin: 0 0 30px 0;">
            Hi ${userName || 'there'},
          </p>
          <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
            We detected a performance issue that needs your attention:
          </p>

          <!-- Alert Details -->
          <div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
            <div style="margin-bottom: 16px;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Metric</div>
              <div style="font-size: 18px; font-weight: 600; color: #111827;">${metricLabel}</div>
            </div>
            ${hasComparison ? `
            <div style="margin-bottom: 16px;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Previous Period Average</div>
              <div style="font-size: 18px; font-weight: 600; color: #111827;">${Math.round(previousValue!)}</div>
            </div>
            ` : ''}
            <div style="margin-bottom: 16px;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Current Value</div>
              <div style="font-size: 24px; font-weight: 700; color: #ef4444;">${currentValue}</div>
            </div>
            ${hasComparison ? `
            <div style="margin-bottom: 16px;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Drop Percentage</div>
              <div style="font-size: 20px; font-weight: 700; color: #ef4444;">${Math.round(Math.abs(percentageDrop!))}% decrease</div>
            </div>
            ` : ''}
            <div>
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Alert Threshold</div>
              <div style="font-size: 18px; font-weight: 600; color: #111827;">${threshold}${hasComparison ? '% drop' : ''}</div>
            </div>
          </div>

          <p style="font-size: 16px; color: #374151; margin: 0 0 30px 0;">
            ${hasComparison 
              ? `Your ${metricLabel.toLowerCase()} has dropped by ${Math.round(Math.abs(percentageDrop!))}% compared to the previous period. This indicates reduced engagement that needs attention.`
              : `This alert was triggered because your ${metricLabel.toLowerCase()} ${currentValue < threshold ? 'dropped below' : 'exceeded'} the configured threshold of ${threshold}.`
            }
            Consider reviewing your automations, keywords, or response strategies.
          </p>

          <!-- CTA -->
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://zenus.space'}/dashboard/analytics" 
               style="display: inline-block; background: #3352CC; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
              View Analytics Dashboard
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">
            You can manage your alerts in the Analytics dashboard
          </p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            This is an automated alert from Zenus
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

