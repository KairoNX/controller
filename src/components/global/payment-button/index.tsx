'use client'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentButton = (props: Props) => {
  const { onSubscribe, isProcessing } = useSubscription()
  
  return (
    <Button
      disabled={isProcessing}
      onClick={onSubscribe}
      className="w-full bg-gradient-to-br from-[#6d60a3] via-[#9434E6] to-[#CC3BD4] text-white rounded-full font-bold text-sm py-2.5 transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 active:scale-[0.98]"
    >
      {isProcessing ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CreditCardIcon className="h-4 w-4" />
      )}
      <span className="ml-2">Upgrade</span>
    </Button>
  )
}

export default PaymentButton
