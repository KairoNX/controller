import { SignUp } from '@clerk/nextjs'
import React from 'react'

const neobrutalismAppearance = {
  elements: {
    rootBox: {
      width: '100%',
      maxWidth: '420px',
    },
    card: {
      backgroundColor: '#FFFFFF',
      border: '4px solid #000000',
      borderRadius: '0',
      boxShadow: '8px 8px 0px 0px #000000',
      padding: '2rem',
    },
    headerTitle: {
      fontSize: '2rem',
      fontWeight: '900',
      color: '#000000',
      fontFamily: 'system-ui, sans-serif',
    },
    headerSubtitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#000000',
    },
    socialButtonsBlockButton: {
      border: '3px solid #000000',
      borderRadius: '0',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '700',
      fontSize: '1rem',
      boxShadow: '4px 4px 0px 0px #000000',
      transition: 'all 0.1s ease',
    },
    socialButtonsBlockButtonText: {
      color: '#000000',
      fontWeight: '700',
    },
    formButtonPrimary: {
      backgroundColor: '#000000',
      color: '#FFFFFF',
      border: '4px solid #000000',
      borderRadius: '0',
      fontWeight: '900',
      fontSize: '1.1rem',
      padding: '0.875rem 2rem',
      boxShadow: '4px 4px 0px 0px #000000',
      transition: 'all 0.1s ease',
      '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        boxShadow: '6px 6px 0px 0px #000000',
        transform: 'translate(-2px, -2px)',
      },
    },
    formFieldInput: {
      border: '3px solid #000000',
      borderRadius: '0',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '600',
      fontSize: '1rem',
      padding: '0.875rem',
      boxShadow: 'inset 2px 2px 0px 0px #000000',
      '&:focus': {
        border: '3px solid #000000',
        boxShadow: 'inset 2px 2px 0px 0px #000000, 0 0 0 3px rgba(0,0,0,0.2)',
      },
    },
    formFieldLabel: {
      color: '#000000',
      fontWeight: '700',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    dividerLine: {
      borderColor: '#000000',
      borderWidth: '2px',
    },
    dividerText: {
      color: '#000000',
      fontWeight: '700',
      fontSize: '0.875rem',
    },
    identityPreviewEditButton: {
      border: '2px solid #000000',
      borderRadius: '0',
      color: '#000000',
      fontWeight: '700',
    },
    footerActionLink: {
      color: '#000000',
      fontWeight: '700',
      textDecoration: 'underline',
      textDecorationThickness: '2px',
    },
    formResendCodeLink: {
      color: '#000000',
      fontWeight: '700',
      textDecoration: 'underline',
      textDecorationThickness: '2px',
    },
    alertText: {
      color: '#000000',
      fontWeight: '600',
      fontSize: '0.875rem',
    },
    formFieldErrorText: {
      color: '#FF0000',
      fontWeight: '700',
      fontSize: '0.875rem',
    },
    otpCodeFieldInput: {
      border: '3px solid #000000',
      borderRadius: '0',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '900',
      fontSize: '1.5rem',
      boxShadow: 'inset 2px 2px 0px 0px #000000',
    },
  },
  layout: {
    socialButtonsPlacement: 'top' as const,
    showOptionalFields: false,
  },
}

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="w-full max-w-[420px]">
      <SignUp 
        appearance={neobrutalismAppearance}
        routing="path"
        path="/sign-up"
      />
    </div>
  )
}

export default Page
