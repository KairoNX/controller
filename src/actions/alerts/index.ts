'use server'

import { onCurrentUser } from '../user'
import { findUser } from '../user/queries'
import {
  createAlert,
  getUserAlerts,
  updateAlert,
  deleteAlert,
  getActiveAlerts,
  type AlertType,
  type MetricType,
} from './queries'

export const createUserAlert = async (
  name: string,
  type: AlertType,
  metricType: MetricType,
  threshold: number,
  description?: string,
  emailNotify: boolean = true
) => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, error: 'User not found' }
    }

    const alert = await createAlert(
      dbUser.id,
      name,
      type,
      metricType,
      threshold,
      description,
      emailNotify
    )

    return { status: 200, data: alert }
  } catch (error: any) {
    console.error('Error creating alert:', error)
    return { status: 500, error: error.message || 'Failed to create alert' }
  }
}

export const getAlerts = async () => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: [] }
    }

    const alerts = await getUserAlerts(dbUser.id)
    return { status: 200, data: alerts }
  } catch (error: any) {
    console.error('Error fetching alerts:', error)
    return { status: 500, data: [] }
  }
}

export const updateUserAlert = async (
  alertId: string,
  data: {
    name?: string
    description?: string
    threshold?: number
    enabled?: boolean
    emailNotify?: boolean
  }
) => {
  await onCurrentUser()
  try {
    const alert = await updateAlert(alertId, data)
    return { status: 200, data: alert }
  } catch (error: any) {
    console.error('Error updating alert:', error)
    return { status: 500, error: error.message || 'Failed to update alert' }
  }
}

export const deleteUserAlert = async (alertId: string) => {
  await onCurrentUser()
  try {
    await deleteAlert(alertId)
    return { status: 200, message: 'Alert deleted successfully' }
  } catch (error: any) {
    console.error('Error deleting alert:', error)
    return { status: 500, error: error.message || 'Failed to delete alert' }
  }
}

