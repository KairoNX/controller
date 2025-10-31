'use client'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Spinner3D = ({ size = 'md', className }: Props) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const borderWidth = {
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4',
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className || ''}`}>
      <div className={`absolute inset-0 ${borderWidth[size]} border-purple-500/30 border-t-purple-500 rounded-full animate-spin`} />
    </div>
  )
}

