import { useQuery } from '@tanstack/react-query'
import { getUserROI } from '@/actions/analytics/roi'

export const useROI = (hourlyRate: number = 25) => {
  return useQuery({
    queryKey: ['roi-calculator', hourlyRate],
    queryFn: () => getUserROI(hourlyRate),
    staleTime: 60000, // Cache for 1 minute
    enabled: true,
  })
}
