import { stripe } from '@/lib/stripe'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 })
    }

    const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID
    if (!priceId) {
      console.error('STRIPE_SUBSCRIPTION_PRICE_ID is not set')
      return NextResponse.json(
        { status: 500, message: 'Payment configuration error' },
        { status: 500 }
      )
    }

    // Use NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_HOST_URL, fallback to localhost for dev
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_HOST_URL ||
      'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.emailAddresses[0]?.emailAddress,
      success_url: `${baseUrl}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment?cancel=true`,
      metadata: {
        clerkUserId: user.id,
      },
    })

    if (session && session.url) {
      return NextResponse.json({
        status: 200,
        session_url: session.url,
      })
    }

    return NextResponse.json(
      { status: 400, message: 'Failed to create checkout session' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Payment API error:', error)
    return NextResponse.json(
      { status: 500, message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
