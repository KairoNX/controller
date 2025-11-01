import { NextRequest, NextResponse } from 'next/server'
import { checkPerformanceAlerts } from '@/actions/alerts/detection'
import { saveEngagementSnapshot } from '@/actions/engagement/snapshot'
import { client } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Verify cron secret for security
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all users with alerts enabled
    const users = await client.user.findMany({
      where: {
        alerts: {
          some: {
            enabled: true,
          },
        },
      },
    })

    // Save engagement snapshots for all users first
    await Promise.allSettled(
      users.map((user) => saveEngagementSnapshot(user.id))
    )

    // Check alerts for each user
    const results = await Promise.allSettled(
      users.map((user) => checkPerformanceAlerts(user.id))
    )

    const successCount = results.filter((r) => r.status === 'fulfilled').length
    const errorCount = results.filter((r) => r.status === 'rejected').length

    return NextResponse.json({
      success: true,
      message: `Checked alerts for ${users.length} users`,
      successCount,
      errorCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error checking alerts:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check alerts' },
      { status: 500 }
    )
  }
}

