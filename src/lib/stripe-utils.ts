// Client-safe utility functions for Stripe (currency conversion, fee calculations)
// These don't require the Stripe SDK and can be used in client components

// Convert cents to dollars
export const centsToDollars = (cents: number): number => {
  try {
    if (typeof cents !== 'number' || cents < 0 || isNaN(cents)) {
      console.warn('🔴 [Cents to Dollars] Invalid cents:', cents)
      return 0
    }
    return cents / 100
  } catch (error: any) {
    console.error('🔴 [Cents to Dollars] Error converting:', error.message)
    return 0
  }
}

// Convert dollars to cents
export const dollarsToCents = (dollars: number): number => {
  try {
    if (typeof dollars !== 'number' || dollars < 0 || isNaN(dollars)) {
      console.warn('🔴 [Dollars to Cents] Invalid dollars:', dollars)
      throw new Error('Invalid dollar amount')
    }
    return Math.round(dollars * 100)
  } catch (error: any) {
    console.error('🔴 [Dollars to Cents] Error converting:', error.message)
    throw error
  }
}


