import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMonth = (month: number) => {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (month < 1 || month > 12) {
    return 'Invalid month number. Please enter a number between 1 and 12.'
  }

  return months[month - 1]
}

export const duplicateValidation = (arr: string[], el: string) => {
  if (!arr.find((t) => t === el)) {
    arr.push(el)
    return arr
  } else {
    arr = arr.filter((t) => t !== el)
    return arr
  }
}

/**
 * Returns the ordinal suffix for a number (st, nd, rd, th)
 */
export const getOrdinalSuffix = (day: number): string => {
  const j = day % 10
  const k = day % 100
  if (j === 1 && k !== 11) return 'st'
  if (j === 2 && k !== 12) return 'nd'
  if (j === 3 && k !== 13) return 'rd'
  return 'th'
}

/**
 * Formats a date with proper ordinal suffix
 */
export const formatDateWithOrdinal = (date: Date): string => {
  const month = getMonth(date.getUTCMonth() + 1)
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  const suffix = getOrdinalSuffix(day)
  return `${month} ${day}${suffix} ${year}`
}