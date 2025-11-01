'use client'
import { useQueryAutomation } from '@/hooks/user-queries'
import { updateAutomationName } from '@/actions/automations'
import { useMutationData } from '@/hooks/use-mutation-data'
import { User, Briefcase } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import Loader from '../loader'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
  automationId: string
}

const AutomationTypeSelector = ({ automationId }: Props) => {
  const { data: automationData } = useQueryAutomation(automationId)
  const queryClient = useQueryClient()

  const currentType = automationData?.data?.type || 'CREATOR'

  const { isPending, mutate } = useMutationData(
    ['update-automation-type'],
    (type: 'CREATOR' | 'BUSINESS') => updateAutomationName(automationId, { type }),
    'automation-info',
    () => {
      queryClient.invalidateQueries({ queryKey: ['automation-info'] })
      toast.success('Automation type updated!')
    }
  )

  const handleTypeChange = (type: 'CREATOR' | 'BUSINESS') => {
    if (type === currentType) return
    mutate(type)
  }

  return (
    <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3 border border-in-active/50">
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="h-5 w-5 text-light-blue" />
        <h3 className="text-lg font-medium text-white">Automation Type</h3>
      </div>
      <p className="text-text-secondary text-sm mb-4">
        Choose whether this is a creator automation (engagement) or business automation (selling products).
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleTypeChange('CREATOR')}
          disabled={isPending}
          className={cn(
            'p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2',
            currentType === 'CREATOR'
              ? 'border-light-blue bg-light-blue/10'
              : 'border-in-active/50 bg-background-80 hover:border-in-active',
            isPending && 'opacity-50 cursor-not-allowed'
          )}
        >
          <User className={cn('h-6 w-6', currentType === 'CREATOR' ? 'text-light-blue' : 'text-text-secondary')} />
          <div className="text-center">
            <p className={cn('font-medium', currentType === 'CREATOR' ? 'text-light-blue' : 'text-white')}>
              Creator
            </p>
            <p className="text-xs text-text-secondary">For engagement & growth</p>
          </div>
          {currentType === 'CREATOR' && (
            <div className="h-2 w-2 rounded-full bg-light-blue mt-1" />
          )}
        </button>

        <button
          onClick={() => {
            toast.info('Business automation type coming soon! This feature will enable product selling through automations.')
          }}
          disabled={true}
          className={cn(
            'p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 relative',
            'border-in-active/50 bg-background-80 opacity-60 cursor-not-allowed'
          )}
        >
          <Briefcase className="h-6 w-6 text-text-secondary" />
          <div className="text-center">
            <p className="font-medium text-white">
              Business
            </p>
            <p className="text-xs text-text-secondary">Coming Soon</p>
          </div>
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 text-[10px] font-medium bg-keyword-green/20 text-keyword-green rounded-full border border-keyword-green/30">
              SOON
            </span>
          </div>
        </button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center pt-2">
          <Loader state={true}>Updating...</Loader>
        </div>
      )}
    </div>
  )
}

export default AutomationTypeSelector

