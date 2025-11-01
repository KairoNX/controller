/**
 * Cron endpoint for weekly analytics reports
 * Set up in Vercel Cron or any cron service to call this weekly
 * Example Vercel cron config in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/weekly-report",
 *     "schedule": "0 9 * * 1" // Every Monday at 9 AM
 *   }]
 * }
 */

import { client } from '@/lib/prisma'
import { sendAnalyticsReportToUser } from '@/actions/analytics/email'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Secure with API key (add to env: CRON_SECRET)
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(request: Request) {
  try {
    // Verify cron secret (optional but recommended)
    const authHeader = request.headers.get('authorization')
    if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all users who have automations
    const users = await client.user.findMany({
      where: {
        automations: {
          some: {},
        },
      },
      select: {
        id: true,
        email: true,
      },
    })

    const results = []
    
    // Send reports to all users
    for (const user of users) {
      try {
        const result = await sendAnalyticsReportToUser(user.id)
        results.push({
          userId: user.id,
          email: user.email,
          success: result.status === 200,
        })
      } catch (error: any) {
        console.error(`Failed to send report to ${user.email}:`, error)
        results.push({
          userId: user.id,
          email: user.email,
          success: false,
          error: error.message,
        })
      }
    }

    return NextResponse.json({
      message: `Processed ${results.length} users`,
      results,
    })
  } catch (error: any) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

