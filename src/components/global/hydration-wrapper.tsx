'use client'

import { HydrationBoundary, DehydratedState } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
  state: DehydratedState
}

export const HydrationWrapper = ({ children, state }: Props) => {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>
}

