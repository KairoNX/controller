import React from 'react'
import { LogoSmall } from '@/svgs/logo-small'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10 bg-white p-8 relative overflow-hidden">
      {/* Neobrutalist background accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-12 -translate-x-16 -translate-y-16 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-500 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-12 translate-x-12 translate-y-12 opacity-20"></div>
      
      <Link 
        href="/" 
        className="relative z-10 hover:scale-105 transition-transform border-5 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1"
        style={{ borderWidth: '5px' }}
      >
        <LogoSmall />
      </Link>
      <div className="w-full flex justify-center relative z-10">
        {children}
      </div>
    </div>
  )
}

export default Layout
