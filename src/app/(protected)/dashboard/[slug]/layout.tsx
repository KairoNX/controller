import {
  dehydrate,
  QueryClient,
} from '@tanstack/react-query'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/global/sidebar'
import { HydrationWrapper } from '@/components/global/hydration-wrapper'
import React from 'react'
import {
  PrefetchAnalytics,
  PrefetchUserAutnomations,
  PrefetchUserProfile,
} from '@/react-query/prefetch'

type Props = {
  children: React.ReactNode
  params: { slug: string }
}

const Layout = async ({ children, params }: Props) => {
  const query = new QueryClient()

  await PrefetchUserProfile(query)
  await PrefetchUserAutnomations(query)
  await PrefetchAnalytics(query)

  return (
    <HydrationWrapper state={dehydrate(query)}>
      <div className="p-3">
        <Sidebar slug={params.slug} />
        <div
          className="
      lg:ml-[250px] 
      lg:pl-10 
      lg:py-5 
      flex 
      flex-col 
      overflow-auto
      "
        >
          <InfoBar slug={params.slug} />
          {children}
        </div>
      </div>
    </HydrationWrapper>
  )
}

export default Layout
