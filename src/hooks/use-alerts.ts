import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAlerts,
  createUserAlert,
  updateUserAlert,
  deleteUserAlert,
} from '@/actions/alerts'
import type { AlertType, MetricType } from '@/actions/alerts/queries'
import { toast } from 'sonner'

export const useAlerts = () => {
  return useQuery({
    queryKey: ['user-alerts'],
    queryFn: getAlerts,
  })
}

export const useCreateAlert = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      name: string
      type: AlertType
      metricType: MetricType
      threshold: number
      description?: string
      emailNotify?: boolean
    }) => createUserAlert(
      data.name,
      data.type,
      data.metricType,
      data.threshold,
      data.description,
      data.emailNotify
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-alerts'] })
      toast.success('Alert created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create alert')
    },
  })
}

export const useUpdateAlert = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      alertId: string
      name?: string
      description?: string
      threshold?: number
      enabled?: boolean
      emailNotify?: boolean
    }) => {
      const { alertId, ...updateData } = data
      return updateUserAlert(alertId, updateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-alerts'] })
      toast.success('Alert updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update alert')
    },
  })
}

export const useDeleteAlert = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (alertId: string) => deleteUserAlert(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-alerts'] })
      toast.success('Alert deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete alert')
    },
  })
}

