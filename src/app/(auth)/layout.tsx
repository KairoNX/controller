import React from 'react'
import { LogoSmall } from '@/svgs/logo-small'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <LogoSmall />
      </Link>
      {children}
    </div>
  )
}

export default Layout
