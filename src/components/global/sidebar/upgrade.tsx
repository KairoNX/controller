'use client'
import React from 'react'
import PaymentButton from '../payment-button'
import { Zap } from 'lucide-react'

type Props = {}

const UpgradeCard = (props: Props) => {
  return (
    <div className="bg-[#252525] p-3 rounded-2xl flex flex-col gap-y-3 group hover:bg-[#2a2a2a] transition-all duration-300 border border-transparent hover:border-purple-500/20">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium">
          Upgrade to{' '}
          <span className="bg-gradient-to-r from-[#CC3BD4] to-[#D064AC] font-bold bg-clip-text text-transparent">
            Smart AI
          </span>
        </span>
      </div>
      
      <p className="text-[#9B9CA0] text-xs leading-relaxed">
        Unlock all features including AI and more
      </p>
      
      {/* Key benefit - single, clear */}
      <div className="flex items-center gap-1.5 text-xs text-purple-300">
        <Zap className="h-3 w-3" />
        <span>10x faster responses</span>
      </div>

      {/* Price - clear and prominent */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-white leading-none">$99</span>
        <span className="text-xs text-[#9B9CA0] leading-tight">/month</span>
      </div>

      <PaymentButton />
      
      {/* Trust signal - subtle */}
      <p className="text-[10px] text-center text-[#9B9CA0]/70">
        Cancel anytime • 24/7 support
      </p>
    </div>
  )
}

export default UpgradeCard
