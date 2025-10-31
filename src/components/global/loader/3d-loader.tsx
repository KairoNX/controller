'use client'
import { LogoSmall } from '@/svgs/logo-small'

export const Loader3D = () => {
  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-black">
      {/* Simple Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-black" />
      
      {/* Logo with subtle glow */}
      <div className="relative z-10 mb-8">
        <div className="relative">
          <div className="absolute inset-0 blur-lg bg-purple-500/20 -z-10 animate-pulse" />
          <LogoSmall />
        </div>
      </div>

      {/* Simple Spinner */}
      <div className="relative z-10">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      </div>

      {/* Loading Text */}
      <p className="relative z-10 mt-6 text-purple-400/70 text-sm font-light animate-pulse">
        Loading...
      </p>
    </div>
  )
}

