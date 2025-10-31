import Loader from '@/components/global/loader'
import { LogoSmall } from '@/svgs/logo-small'

const Loading = () => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <div className="animate-pulse">
        <LogoSmall />
      </div>
      <Loader state>Processing payment...</Loader>
    </div>
  )
}

export default Loading
