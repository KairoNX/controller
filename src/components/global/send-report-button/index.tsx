'use client'
import { Button } from '@/components/ui/button'
import { sendAnalyticsReport } from '@/actions/analytics/email'
import { Mail } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {}

const SendReportButton = (props: Props) => {
  const [isSending, setIsSending] = useState(false)

  const handleSendReport = async () => {
    setIsSending(true)
    try {
      const result = await sendAnalyticsReport()
      
      if (result.status === 200) {
        toast.success('Analytics report sent to your email! 📧')
      } else {
        // Show detailed error message
        const errorMsg = result.error || 'Failed to send report'
        toast.error(errorMsg, {
          description: result.details 
            ? typeof result.details === 'string' 
              ? result.details 
              : 'Please check your email configuration'
            : undefined,
          duration: 5000,
        })
      }
    } catch (error: any) {
      console.error('Send report error:', error)
      toast.error('Error sending report', {
        description: error?.message || 'Please try again later',
        duration: 5000,
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Button
      onClick={handleSendReport}
      disabled={isSending}
      className="bg-light-blue hover:bg-light-blue/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Mail className="h-4 w-4 mr-2" />
      {isSending ? 'Sending...' : 'Send Report'}
    </Button>
  )
}

export default SendReportButton

