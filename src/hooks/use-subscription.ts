import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const onSubscribe = async () => {
    try {
      setIsProcessing(true)
      const response = await axios.get('/api/payment')
      
      if (response.data.status === 200 && response.data.session_url) {
        window.location.href = response.data.session_url
        return
      }

      toast.error('Failed to create payment session. Please try again.')
      setIsProcessing(false)
    } catch (error: any) {
      console.error('Subscription error:', error)
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
      setIsProcessing(false)
    }
  }

  return { onSubscribe, isProcessing }
}
