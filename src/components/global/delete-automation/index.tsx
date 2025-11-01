'use client'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { useDeleteAutomation } from '@/hooks/use-automations'
import { useRouter, usePathname } from 'next/navigation'

type Props = {
  automationId: string
  automationName?: string
}

const DeleteAutomation = ({ automationId, automationName }: Props) => {
  const { isPending, mutate } = useDeleteAutomation()
  const router = useRouter()
  const pathname = usePathname()

  const handleDelete = () => {
    mutate(automationId, {
      onSuccess: () => {
        // Redirect if on automation detail page
        if (pathname?.includes(automationId)) {
          const listPath = pathname.split('/').slice(0, -1).join('/')
          if (listPath) {
            router.push(listPath)
          } else {
            router.push('/dashboard')
          }
        }
      },
    })
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Automation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {automationName || 'this automation'}
            </span>
            ? This action cannot be undone. All associated data (keywords, posts, triggers, and responses) will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAutomation

