import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_CLIENT_SECRET

if (!stripeKey) {
  console.error('⚠️ STRIPE_SECRET_KEY or STRIPE_CLIENT_SECRET is not set!')
}

export const stripe = new Stripe(stripeKey as string, {
  apiVersion: '2025-02-24.acacia',
})
