import { LogoSmall } from '@/svgs/logo-small'
import React from 'react'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo = ({ size = 'md', className }: Props) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-24 h-12',
    lg: 'w-32 h-16',
  }

  return (
    <div className={`flex items-center ${sizeClasses[size]} ${className || ''}`}>
      <LogoSmall />
    </div>
  )
}

export default Logo

