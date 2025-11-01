import { sendAnalyticsReport } from '@/actions/analytics/email'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const result = await sendAnalyticsReport()
    
    if (result.status === 200) {
      return NextResponse.json(
        { message: result.message },
        { status: 200 }
      )
    }
    
    return NextResponse.json(
      { error: result.error || 'Failed to send report' },
      { status: result.status }
    )
  } catch (error: any) {
    console.error('Error in send report API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

