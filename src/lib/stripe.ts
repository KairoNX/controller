// Server-only Stripe SDK initialization
// DO NOT import this in client components - use stripe-utils.ts for client-side utilities
import Stripe from 'stripe'

// Initialize Stripe with error handling (server-side only)
let stripeInstance: Stripe | null = null

// Only initialize if we're on the server (where env vars are available)
if (typeof window === 'undefined') {
  try {
    if (!process.env.STRIPE_CLIENT_SECRET) {
      console.error('🔴 [Stripe Init] STRIPE_CLIENT_SECRET is not defined in environment variables')
      throw new Error('STRIPE_CLIENT_SECRET is not defined in environment variables')
    }

    stripeInstance = new Stripe(process.env.STRIPE_CLIENT_SECRET, {
      apiVersion: '2025-02-24.acacia' as any,
      typescript: true,
    })

    console.log('✅ [Stripe Init] Stripe SDK initialized successfully')
  } catch (error: any) {
    console.error('🔴 [Stripe Init] Failed to initialize Stripe:', error.message)
    throw error
  }
} else {
  // On client side, don't initialize - this module should not be imported by client components
  console.warn('⚠️ [Stripe Init] stripe.ts imported on client side - this should only be used server-side')
}

if (!stripeInstance && typeof window === 'undefined') {
  throw new Error('Stripe client not initialized')
}

// Export Stripe instance (will be null on client, but this should never be imported client-side)
export const stripe = stripeInstance

// Re-export utility functions from stripe-utils for backwards compatibility (server-side only)
export {
  calculatePlatformFee,
  calculateUserEarnings,
  dollarsToCents,
  centsToDollars,
} from './stripe-utils'
