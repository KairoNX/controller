import Loader from '@/components/global/loader'
import { LogoSmall } from '@/svgs/logo-small'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <div className="animate-pulse">
        <LogoSmall />
      </div>
      <Loader state>Loading your dashboard...</Loader>
    </div>
  )
}

export default Loading
