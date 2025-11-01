'use client'
import { useGoals, useCreateGoal, useDeleteGoal } from '@/hooks/use-goals'
import { Target, Plus, Trash2, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const goalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  type: z.enum(['TOTAL_RESPONSES', 'DM_RESPONSES', 'COMMENT_RESPONSES', 'CONVERSATIONS', 'RESPONSE_RATE', 'ACTIVE_AUTOMATIONS']),
  target: z.number().min(1, 'Target must be at least 1'),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']).optional(),
  description: z.string().optional(),
})

type GoalFormData = z.infer<typeof goalSchema>

type Props = {}

const GoalTracker = (props: Props) => {
  const { data, isLoading } = useGoals()
  const createGoal = useCreateGoal()
  const deleteGoal = useDeleteGoal()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const goals = data?.status === 200 ? data.data : []

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      period: 'MONTHLY',
    },
  })

  const onSubmit = async (data: GoalFormData) => {
    try {
      await createGoal.mutateAsync(data)
      reset()
      setIsDialogOpen(false)
    } catch (error) {
      // Error handled by mutation
    }
  }

  const goalTypeLabels = {
    TOTAL_RESPONSES: 'Total Responses',
    DM_RESPONSES: 'DM Responses',
    COMMENT_RESPONSES: 'Comment Responses',
    CONVERSATIONS: 'Conversations',
    RESPONSE_RATE: 'Response Rate %',
    ACTIVE_AUTOMATIONS: 'Active Automations',
  }

  const getProgressPercentage = (current: number, target: number) => {
    if (target === 0) return 0
    return Math.min((current / target) * 100, 100)
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border-[1px] border-in-active/50 bg-background-80 p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700/30 rounded w-1/3" />
          <div className="h-20 bg-gray-700/30 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border-[1px] border-in-active/50 bg-background-80 p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-light-blue" />
          <h3 className="text-lg font-semibold text-white">Goals</h3>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-light-blue hover:bg-light-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background-80 border-in-active/50">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Goal</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Set a target to track your automation progress
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-text-secondary">
                  Goal Name
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="bg-background-90 border-in-active/50 text-white mt-1"
                  placeholder="e.g., Reach 1000 responses this month"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="type" className="text-text-secondary">
                  Metric Type
                </Label>
                <Select
                  onValueChange={(value) => setValue('type', value as any)}
                >
                  <SelectTrigger className="bg-background-90 border-in-active/50 text-white mt-1">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent className="bg-background-80 border-in-active/50">
                    {Object.entries(goalTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value} className="text-text-secondary">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="target" className="text-text-secondary">
                  Target
                </Label>
                <Input
                  id="target"
                  type="number"
                  {...register('target', { valueAsNumber: true })}
                  className="bg-background-90 border-in-active/50 text-white mt-1"
                  placeholder="100"
                />
                {errors.target && (
                  <p className="text-red-400 text-xs mt-1">{errors.target.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="period" className="text-text-secondary">
                  Period
                </Label>
                <Select
                  onValueChange={(value) => setValue('period', value as any)}
                  defaultValue="MONTHLY"
                >
                  <SelectTrigger className="bg-background-90 border-in-active/50 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background-80 border-in-active/50">
                    <SelectItem value="DAILY" className="text-text-secondary">Daily</SelectItem>
                    <SelectItem value="WEEKLY" className="text-text-secondary">Weekly</SelectItem>
                    <SelectItem value="MONTHLY" className="text-text-secondary">Monthly</SelectItem>
                    <SelectItem value="YEARLY" className="text-text-secondary">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-text-secondary">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  className="bg-background-90 border-in-active/50 text-white mt-1"
                  placeholder="Add a note about this goal..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-light-blue hover:bg-light-blue/90 text-white"
                  disabled={createGoal.isPending}
                >
                  {createGoal.isPending ? 'Creating...' : 'Create Goal'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-in-active/50 text-text-secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-8">
          <Target className="h-12 w-12 mx-auto mb-3 text-text-secondary opacity-50" />
          <p className="text-text-secondary mb-4">No goals set yet</p>
          <p className="text-xs text-text-secondary/70">
            Create a goal to track your progress and stay motivated!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.current, goal.target)
            const isCompleted = goal.completed || progress >= 100

            return (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border-[1px] ${
                  isCompleted
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-in-active/50 bg-background-90'
                } transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white mb-1">
                      {goal.name}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {goalTypeLabels[goal.type]} • {goal.period}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteGoal.mutate(goal.id)}
                    className="h-6 w-6 p-0 text-text-secondary hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="mb-2">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-lg font-bold text-light-blue">
                      {goal.current}
                    </span>
                    <span className="text-xs text-text-secondary">
                      of {goal.target}
                    </span>
                  </div>
                  <div className="h-2 bg-in-active/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-light-blue'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    {Math.round(progress)}% complete
                  </span>
                  {isCompleted && (
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Goal achieved!
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GoalTracker

