/**
 * Email service for sending analytics reports
 * Uses Resend API
 */

import { Resend } from 'resend'

type EmailOptions = {
  to: string
  subject: string
  html: string
}

// Initialize Resend with error handling
let resend: Resend | null = null

try {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY not found in environment variables')
  } else {
    resend = new Resend(apiKey)
  }
} catch (error) {
  console.error('Failed to initialize Resend:', error)
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // Check if Resend is initialized
  if (!resend) {
    const errorMsg = 'Resend API key not configured'
    console.error('❌', errorMsg)
    return { 
      success: false, 
      error: errorMsg,
      details: 'Please add RESEND_API_KEY to your .env file'
    }
  }

  // Validate email address
  if (!to || !to.includes('@')) {
    const errorMsg = 'Invalid email address'
    console.error('❌', errorMsg, to)
    return { 
      success: false, 
      error: errorMsg 
    }
  }

  // Validate required fields
  if (!subject || !html) {
    const errorMsg = 'Missing required email fields'
    console.error('❌', errorMsg)
    return { 
      success: false, 
      error: errorMsg 
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Zenus <onboarding@resend.dev>', // Change to your verified domain
      to: [to],
      subject,
      html,
    })
    
    if (error) {
      console.error('❌ Resend API error:', error)
      
      // Handle specific error types
      let errorMessage = 'Failed to send email'
      
      if (error.message) {
        errorMessage = error.message
      } else if (typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message)
      }

      // Common Resend errors
      if (errorMessage.includes('API key')) {
        errorMessage = 'Invalid Resend API key. Please check your RESEND_API_KEY in .env'
      } else if (errorMessage.includes('domain') || errorMessage.includes('From')) {
        errorMessage = 'Email domain not verified. Please verify your domain in Resend dashboard.'
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
        errorMessage = 'Rate limit exceeded. Please try again later.'
      }

      return { 
        success: false, 
        error: errorMessage,
        details: error 
      }
    }

    // Success
    console.log('✅ Email sent successfully:', {
      to,
      subject,
      emailId: data?.id
    })
    
    return { 
      success: true, 
      data,
      message: 'Email sent successfully'
    }
  } catch (error: any) {
    console.error('❌ Unexpected email error:', error)
    
    // Handle network errors
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return { 
        success: false, 
        error: 'Network error. Please check your internet connection and try again.',
        details: error.message 
      }
    }

    // Handle timeout errors
    if (error.message?.includes('timeout')) {
      return { 
        success: false, 
        error: 'Request timed out. Please try again.',
        details: error.message 
      }
    }

    return { 
      success: false, 
      error: error?.message || 'Failed to send email. Please try again.',
      details: error 
    }
  }
}

