'use client'
import { duplicateAutomation } from '@/actions/automations'
import { Button } from '@/components/ui/button'
import { useMutationData } from '@/hooks/use-mutation-data'
import { Copy } from 'lucide-react'

type Props = {
  automationId: string
}

const CloneAutomation = ({ automationId }: Props) => {
  const { mutate, isPending } = useMutationData(
    ['clone-automation'],
    (data: { automationId: string }) => duplicateAutomation(data.automationId),
    'user-automations'
  )

  const handleClone = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if inside Link
    e.stopPropagation() // Stop event bubbling
    
    mutate({ automationId })
  }

  return (
    <Button
      onClick={handleClone}
      disabled={isPending}
      variant="outline"
      size="icon"
      className="bg-transparent border-[#545454] hover:bg-[#252525] transition-all"
      title="Duplicate automation"
    >
      <Copy className="h-4 w-4" />
    </Button>
  )
}

export default CloneAutomation

