'use server'

import { onCurrentUser } from '../user'
import { findUser } from '../user/queries'
import {
  createGoal,
  getUserGoals,
  updateGoal,
  deleteGoal,
  syncGoalProgress,
  type GoalType,
  type GoalPeriod,
} from './queries'

export const createUserGoal = async (
  name: string,
  type: GoalType,
  target: number,
  period: GoalPeriod = 'MONTHLY',
  description?: string,
  endDate?: Date
) => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, error: 'User not found' }
    }

    const goal = await createGoal(
      dbUser.id,
      name,
      type,
      target,
      period,
      description,
      endDate
    )

    return { status: 200, data: goal }
  } catch (error: any) {
    console.error('Error creating goal:', error)
    return { status: 500, error: error.message || 'Failed to create goal' }
  }
}

export const getGoals = async () => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: [] }
    }

    const goals = await getUserGoals(dbUser.id)
    // Sync progress before returning
    await syncGoalProgress(dbUser.id)
    const updatedGoals = await getUserGoals(dbUser.id)

    return { status: 200, data: updatedGoals }
  } catch (error: any) {
    console.error('Error fetching goals:', error)
    return { status: 500, data: [] }
  }
}

export const updateUserGoal = async (
  goalId: string,
  data: {
    name?: string
    description?: string
    target?: number
    period?: GoalPeriod
    endDate?: Date | null
  }
) => {
  await onCurrentUser()
  try {
    const goal = await updateGoal(goalId, data)
    return { status: 200, data: goal }
  } catch (error: any) {
    console.error('Error updating goal:', error)
    return { status: 500, error: error.message || 'Failed to update goal' }
  }
}

export const deleteUserGoal = async (goalId: string) => {
  await onCurrentUser()
  try {
    await deleteGoal(goalId)
    return { status: 200, message: 'Goal deleted successfully' }
  } catch (error: any) {
    console.error('Error deleting goal:', error)
    return { status: 500, error: error.message || 'Failed to delete goal' }
  }
}

