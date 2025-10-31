import { cn } from '@/lib/utils'
import React from 'react'
import { Spinner } from './spinner'

type Props = {
  state: boolean
  className?: string
  children: React.ReactNode
  color?: string
}

const Loader = ({ children, state, className, color }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} />
    </div>
  ) : (
    children
  )
}

export default Loader
export { Loader3D } from './3d-loader'
export { Spinner3D } from './3d-spinner'
export { Spinner } from './spinner'
