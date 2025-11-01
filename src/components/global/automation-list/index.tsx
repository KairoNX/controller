'use client'
import { usePaths } from '@/hooks/user-nav'
import { cn, formatDateWithOrdinal } from '@/lib/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import CloneAutomation from '../clone-automation'
import DeleteAutomation from '../delete-automation'

type Props = {}

const AutomationList = (props: Props) => {
  const { data } = useQueryAutomations()

  const { latestVariable } = useMutationDataState(['create-automation'])
  console.log(latestVariable)
  const { pathname } = usePaths()
  
  const optimisticUiData = useMemo(() => {
    if ((latestVariable && latestVariable?.variables && data?.data)) {
      const test = [latestVariable.variables, ...(data.data || [])]
      return { data: test }
    }
    return data?.data ? { data: data.data } : { data: [] }
  }, [latestVariable, data])

  if (data?.status !== 200 || !data?.data || data.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations </h3>
        <CreateAutomation />
      </div>
    )
  }

  const automationsList = optimisticUiData.data || []

  return (
    <div className="flex flex-col gap-y-3">
      {automationsList.map((automation) => (
        <div
          key={automation.id}
          className="relative bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations border-[#545454]"
        >
          <Link
            href={`${pathname}/${automation.id}`}
            className="flex"
          >
            <div className="flex flex-col flex-1 items-start">
              <h2 className="text-xl font-semibold">
                {automation.name || 'Untitled'}
              </h2>
              <p className="text-[#9B9CA0] text-sm font-light mb-2">
                {automation.listener?.listener === 'SMARTAI'
                  ? 'AI-powered responses'
                  : automation.listener?.listener === 'MESSAGE'
                  ? 'Direct message automation'
                  : automation.listener?.listener === 'COMMENT'
                  ? 'Comment reply automation'
                  : 'Automation'}
              </p>

              {automation.keywords && Array.isArray(automation.keywords) && automation.keywords.length > 0 ? (
                <div className="flex gap-x-2 flex-wrap mt-3">
                  {automation.keywords.map((keyword: any, index: number) => {
                    const colorIndex = index % 4
                    return (
                      <div
                        key={keyword.id}
                        className={cn(
                          'rounded-full px-4 py-1 capitalize text-sm font-medium',
                          colorIndex === 0 && 'bg-keyword-green/15 border-2 border-keyword-green text-keyword-green',
                          colorIndex === 1 && 'bg-keyword-purple/15 border-2 border-keyword-purple text-keyword-purple',
                          colorIndex === 2 && 'bg-keyword-yellow/15 border-2 border-keyword-yellow text-keyword-yellow',
                          colorIndex === 3 && 'bg-keyword-red/15 border-2 border-keyword-red text-keyword-red'
                        )}
                      >
                        {keyword.word}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                  <p className="text-sm text-[#bfc0c3]">No Keywords</p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between items-end gap-2 pr-12">
              {automation.createdAt && (
                <p className="text-sm font-light text-[#9B9CA0]">
                  {formatDateWithOrdinal(automation.createdAt)}
                </p>
              )}

              {automation.listener?.listener === 'SMARTAI' ? (
                <GradientButton
                  type="BUTTON"
                  className="w-full bg-background-80 text-white hover:bg-background-80"
                >
                  Smart AI
                </GradientButton>
              ) : (
                <Button className="bg-background-80 hover:bg-background-80 text-white">
                  Standard
                </Button>
              )}
            </div>
          </Link>
          <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
            <CloneAutomation automationId={automation.id} />
            <DeleteAutomation automationId={automation.id} automationName={automation.name} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default AutomationList
