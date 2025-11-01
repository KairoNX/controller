'use client'
import { useAlerts, useCreateAlert, useDeleteAlert, useUpdateAlert } from '@/hooks/use-alerts'
import { Bell, Plus, Trash2, AlertTriangle, ToggleLeft, ToggleRight } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const alertSchema = z.object({
  name: z.string().min(1, 'Alert name is required'),
  type: z.enum(['METRIC_DROP', 'LOW_ENGAGEMENT', 'AUTOMATION_FAILURE', 'GOAL_ACHIEVED', 'THRESHOLD_EXCEEDED']),
  metricType: z.enum(['TOTAL_RESPONSES', 'DM_RESPONSES', 'COMMENT_RESPONSES', 'CONVERSATIONS', 'RESPONSE_RATE', 'ACTIVE_AUTOMATIONS']),
  threshold: z.number().min(0, 'Threshold must be at least 0'),
  description: z.string().optional(),
  emailNotify: z.boolean().optional(),
})

type AlertFormData = z.infer<typeof alertSchema>

type Props = {}

const PerformanceAlerts = (props: Props) => {
  const { data, isLoading } = useAlerts()
  const createAlert = useCreateAlert()
  const deleteAlert = useDeleteAlert()
  const updateAlert = useUpdateAlert()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const alerts = data?.status === 200 ? data.data : []

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AlertFormData>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      emailNotify: true,
    },
  })

  const onSubmit = async (data: AlertFormData) => {
    try {
      await createAlert.mutateAsync(data)
      reset()
      setIsDialogOpen(false)
    } catch (error) {
      // Error handled by mutation
    }
  }

  const toggleAlert = async (alertId: string, enabled: boolean) => {
    await updateAlert.mutateAsync({ alertId, enabled: !enabled })
  }

  const alertTypeLabels = {
    METRIC_DROP: 'Metric Drop',
    LOW_ENGAGEMENT: 'Low Engagement',
    AUTOMATION_FAILURE: 'Automation Failure',
    GOAL_ACHIEVED: 'Goal Achieved',
    THRESHOLD_EXCEEDED: 'Threshold Exceeded',
  }

  const metricTypeLabels = {
    TOTAL_RESPONSES: 'Total Responses',
    DM_RESPONSES: 'DM Responses',
    COMMENT_RESPONSES: 'Comment Responses',
    CONVERSATIONS: 'Conversations',
    RESPONSE_RATE: 'Response Rate %',
    ACTIVE_AUTOMATIONS: 'Active Automations',
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
          <Bell className="h-5 w-5 text-light-blue" />
          <h3 className="text-lg font-semibold text-white">Performance Alerts</h3>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-light-blue hover:bg-light-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background-80 border-in-active/50">
            <DialogHeader>
              <DialogTitle className="text-white">Create Performance Alert</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Get notified when your metrics drop below thresholds
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-text-secondary">
                  Alert Name
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="bg-background-90 border-in-active/50 text-white mt-1"
                  placeholder="e.g., Low Response Rate Alert"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="type" className="text-text-secondary">
                  Alert Type
                </Label>
                <Select
                  onValueChange={(value) => setValue('type', value as any)}
                >
                  <SelectTrigger className="bg-background-90 border-in-active/50 text-white mt-1">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background-80 border-in-active/50">
                    {Object.entries(alertTypeLabels).map(([value, label]) => (
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
                <Label htmlFor="metricType" className="text-text-secondary">
                  Metric to Monitor
                </Label>
                <Select
                  onValueChange={(value) => setValue('metricType', value as any)}
                >
                  <SelectTrigger className="bg-background-90 border-in-active/50 text-white mt-1">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent className="bg-background-80 border-in-active/50">
                    {Object.entries(metricTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value} className="text-text-secondary">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.metricType && (
                  <p className="text-red-400 text-xs mt-1">{errors.metricType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="threshold" className="text-text-secondary">
                  Threshold Value
                </Label>
                <Input
                  id="threshold"
                  type="number"
                  {...register('threshold', { valueAsNumber: true })}
                  className="bg-background-90 border-in-active/50 text-white mt-1"
                  placeholder="0"
                />
                {errors.threshold && (
                  <p className="text-red-400 text-xs mt-1">{errors.threshold.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-text-secondary">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  className="bg-background-90 border-in-active/50 text-white mt-1"
                  placeholder="Add a note about this alert..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotify" className="text-text-secondary">
                  Email Notifications
                </Label>
                <Switch
                  id="emailNotify"
                  checked={watch('emailNotify')}
                  onCheckedChange={(checked) => setValue('emailNotify', checked)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-light-blue hover:bg-light-blue/90 text-white"
                  disabled={createAlert.isPending}
                >
                  {createAlert.isPending ? 'Creating...' : 'Create Alert'}
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

      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <Bell className="h-12 w-12 mx-auto mb-3 text-text-secondary opacity-50" />
          <p className="text-text-secondary mb-4">No alerts configured yet</p>
          <p className="text-xs text-text-secondary/70">
            Create an alert to get notified when your metrics drop!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-[1px] ${
                alert.enabled
                  ? 'border-in-active/50 bg-background-90'
                  : 'border-in-active/30 bg-background-90/50 opacity-60'
              } transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`h-4 w-4 ${alert.enabled ? 'text-orange-400' : 'text-text-secondary'}`} />
                    <h4 className="text-sm font-medium text-white">
                      {alert.name}
                    </h4>
                    {alert.emailNotify && (
                      <span className="text-xs bg-light-blue/20 text-light-blue px-2 py-0.5 rounded">
                        Email
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary">
                    {alertTypeLabels[alert.type]} • {metricTypeLabels[alert.metricType]} • Threshold: {alert.threshold}
                  </p>
                  {alert.description && (
                    <p className="text-xs text-text-secondary/70 mt-1">{alert.description}</p>
                  )}
                  {alert.lastTriggered && (
                    <p className="text-xs text-text-secondary/50 mt-1">
                      Last triggered: {new Date(alert.lastTriggered).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAlert(alert.id, alert.enabled)}
                    className="h-8 w-8 p-0"
                  >
                    {alert.enabled ? (
                      <ToggleRight className="h-4 w-4 text-green-400" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-text-secondary" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlert.mutate(alert.id)}
                    className="h-8 w-8 p-0 text-text-secondary hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PerformanceAlerts

