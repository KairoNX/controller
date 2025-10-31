'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  label: string
  subLabel: string
  description: string
}

const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div 
      className="relative border-[1px] border-in-active/50 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden cursor-pointer transition-all duration-300 hover:border-light-blue/50 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div className="flex flex-col z-40 transition-all duration-300 group-hover:translate-x-1">
        <h2 className="text-2xl font-medium transition-all duration-300 group-hover:text-white/90">
          {label}
        </h2>
        <p className="text-text-secondary text-sm transition-all duration-300 group-hover:text-text-secondary/80">
          {subLabel}
        </p>
      </div>
      <div className="flex justify-between items-center z-40 gap-x-10">
        <p className="text-text-secondary text-sm transition-all duration-300 group-hover:text-text-secondary/80">
          {description}
        </p>
        <Button 
          className={`rounded-full bg-light-blue w-10 h-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50 ${
            isPressed ? 'scale-95' : ''
          }`}
        >
          <ArrowRight 
            color="white" 
            className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
          />
        </Button>
      </div>
      <div 
        className={`w-6/12 h-full absolute radial--double--gradient--cards--top top-0 left-0 z-10 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      />
      <div 
        className={`w-6/12 h-full absolute radial--double--gradient--cards--bottom top-0 left-1/2 right-0 z-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      />
      {/* Shine effect on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full transition-transform duration-1000 ${
          isHovered ? 'translate-x-full' : ''
        }`}
      />
    </div>
  )
}

export default DoubleGradientCard
