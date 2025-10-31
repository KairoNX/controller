'use client'
import { useEffect } from 'react'

type Props = {
  websiteId?: string // Your Crisp website ID
}

const ChatWidget = ({ websiteId = 'YOUR_CRISP_WEBSITE_ID' }: Props) => {
  useEffect(() => {
    // Load Crisp Chat Widget
    if (typeof window !== 'undefined') {
      ;(window as any).$crisp = []
      ;(window as any).CRISP_WEBSITE_ID = websiteId

      const script = document.createElement('script')
      script.src = 'https://client.crisp.chat/l.js'
      script.async = true
      document.getElementsByTagName('head')[0].appendChild(script)

      // Optional: Customize the chat widget
      script.onload = () => {
        if ((window as any).$crisp) {
          // Set user data (if logged in)
          // $crisp.push(['set', 'user:email', ['user@email.com']])
          // $crisp.push(['set', 'user:nickname', ['User Name']])
          
          // Customize colors
          // $crisp.push(['set', 'session:data', [[['plan', 'free']]]])
        }
      }

      return () => {
        // Cleanup on unmount
        const crispScript = document.querySelector('script[src*="crisp.chat"]')
        if (crispScript) {
          crispScript.remove()
        }
      }
    }
  }, [websiteId])

  return null // This component doesn't render anything visible
}

export default ChatWidget

