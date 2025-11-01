'use server'

import { client } from '@/lib/prisma'

export type GoalType = 'TOTAL_RESPONSES' | 'DM_RESPONSES' | 'COMMENT_RESPONSES' | 'CONVERSATIONS' | 'RESPONSE_RATE' | 'ACTIVE_AUTOMATIONS'
export type GoalPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'

export const createGoal = async (
  userId: string,
  name: string,
  type: GoalType,
  target: number,
  period: GoalPeriod = 'MONTHLY',
  description?: string,
  endDate?: Date
) => {
  return await client.goal.create({
    data: {
      userId,
      name,
      description,
      type,
      target,
      period,
      endDate,
    },
  })
}

export const getUserGoals = async (userId: string) => {
  return await client.goal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export const updateGoal = async (
  goalId: string,
  data: {
    name?: string
    description?: string
    target?: number
    period?: GoalPeriod
    endDate?: Date | null
  }
) => {
  return await client.goal.update({
    where: { id: goalId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export const deleteGoal = async (goalId: string) => {
  return await client.goal.delete({
    where: { id: goalId },
  })
}

export const updateGoalProgress = async (goalId: string, current: number) => {
  const goal = await client.goal.findUnique({
    where: { id: goalId },
  })

  if (!goal) return null

  const isCompleted = current >= goal.target

  return await client.goal.update({
    where: { id: goalId },
    data: {
      current,
      completed: isCompleted,
      updatedAt: new Date(),
    },
  })
}

// Calculate current progress for all goals based on analytics
export const syncGoalProgress = async (userId: string) => {
  const goals = await getUserGoals(userId)
  
  // Get user's automations for calculations
  const user = await client.user.findUnique({
    where: { id: userId },
    include: {
      automations: {
        include: {
          listener: true,
        },
      },
    },
  })

  if (!user) return []

  // Calculate totals
  const totalDMs = user.automations.reduce(
    (sum, auto) => sum + (auto.listener?.dmCount || 0),
    0
  )
  const totalComments = user.automations.reduce(
    (sum, auto) => sum + (auto.listener?.commentCount || 0),
    0
  )
  const totalResponses = totalDMs + totalComments
  
  // Get unique conversations
  const uniqueConversations = await client.dms.findMany({
    where: {
      automationId: { in: user.automations.map((a) => a.id) },
    },
    distinct: ['reciever'],
    select: { reciever: true },
  })
  const totalConversations = uniqueConversations.length
  
  // Calculate response rate
  const responseRate = totalConversations > 0 
    ? Math.round((totalResponses / totalConversations) * 100) 
    : 0
  
  const activeAutomations = user.automations.filter((a) => a.active).length

  // Update each goal's progress
  const updatedGoals = []
  for (const goal of goals) {
    let current = 0
    
    switch (goal.type) {
      case 'TOTAL_RESPONSES':
        current = totalResponses
        break
      case 'DM_RESPONSES':
        current = totalDMs
        break
      case 'COMMENT_RESPONSES':
        current = totalComments
        break
      case 'CONVERSATIONS':
        current = totalConversations
        break
      case 'RESPONSE_RATE':
        current = responseRate
        break
      case 'ACTIVE_AUTOMATIONS':
        current = activeAutomations
        break
    }

    await updateGoalProgress(goal.id, current)
    updatedGoals.push({ ...goal, current })
  }

  return updatedGoals
}

