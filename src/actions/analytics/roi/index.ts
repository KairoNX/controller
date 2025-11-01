'use server'

import { onCurrentUser } from '../../user'
import { findUser } from '../../user/queries'
import { calculateROI, getTotalROI } from './queries'

export const getUserROI = async (hourlyRate: number = 25) => {
  const user = await onCurrentUser()
  try {
    const dbUser = await findUser(user.id)
    if (!dbUser) {
      return { status: 404, data: null }
    }

    const roi = await getTotalROI(dbUser.id, hourlyRate)
    return { status: 200, data: roi }
  } catch (error: any) {
    console.error('Error fetching ROI:', error)
    return { status: 500, data: null }
  }
}

