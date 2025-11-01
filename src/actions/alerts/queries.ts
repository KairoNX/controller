'use server'

import { client } from '@/lib/prisma'

export type AlertType = 'METRIC_DROP' | 'LOW_ENGAGEMENT' | 'AUTOMATION_FAILURE' | 'GOAL_ACHIEVED' | 'THRESHOLD_EXCEEDED'
export type MetricType = 'TOTAL_RESPONSES' | 'DM_RESPONSES' | 'COMMENT_RESPONSES' | 'CONVERSATIONS' | 'RESPONSE_RATE' | 'ACTIVE_AUTOMATIONS'

export const createAlert = async (
  userId: string,
  name: string,
  type: AlertType,
  metricType: MetricType,
  threshold: number,
  description?: string,
  emailNotify: boolean = true
) => {
  return await client.performanceAlert.create({
    data: {
      userId,
      name,
      description,
      type,
      metricType,
      threshold,
      emailNotify,
    },
  })
}

export const getUserAlerts = async (userId: string) => {
  return await client.performanceAlert.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export const updateAlert = async (
  alertId: string,
  data: {
    name?: string
    description?: string
    threshold?: number
    enabled?: boolean
    emailNotify?: boolean
  }
) => {
  return await client.performanceAlert.update({
    where: { id: alertId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export const deleteAlert = async (alertId: string) => {
  return await client.performanceAlert.delete({
    where: { id: alertId },
  })
}

export const markAlertTriggered = async (alertId: string) => {
  return await client.performanceAlert.update({
    where: { id: alertId },
    data: {
      lastTriggered: new Date(),
      updatedAt: new Date(),
    },
  })
}

export const getActiveAlerts = async (userId: string) => {
  return await client.performanceAlert.findMany({
    where: {
      userId,
      enabled: true,
    },
  })
}

