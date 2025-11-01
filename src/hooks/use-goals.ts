import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getGoals,
  createUserGoal,
  updateUserGoal,
  deleteUserGoal,
} from '@/actions/goals'
import type { GoalType, GoalPeriod } from '@/actions/goals/queries'
import { toast } from 'sonner'

export const useGoals = () => {
  return useQuery({
    queryKey: ['user-goals'],
    queryFn: getGoals,
  })
}

export const useCreateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      name: string
      type: GoalType
      target: number
      period?: GoalPeriod
      description?: string
      endDate?: Date
    }) => createUserGoal(
      data.name,
      data.type,
      data.target,
      data.period,
      data.description,
      data.endDate
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-goals'] })
      toast.success('Goal created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create goal')
    },
  })
}

export const useUpdateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      goalId: string
      name?: string
      description?: string
      target?: number
      period?: GoalPeriod
      endDate?: Date | null
    }) => {
      const { goalId, ...updateData } = data
      return updateUserGoal(goalId, updateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-goals'] })
      toast.success('Goal updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update goal')
    },
  })
}

export const useDeleteGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goalId: string) => deleteUserGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-goals'] })
      toast.success('Goal deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete goal')
    },
  })
}

