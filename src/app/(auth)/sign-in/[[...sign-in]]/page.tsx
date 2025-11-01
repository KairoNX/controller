import { SignIn } from '@clerk/nextjs'

import React from 'react'

const neobrutalismAppearance = {
  elements: {
    rootBox: {
      width: '100%',
      maxWidth: '480px',
    },
    card: {
      backgroundColor: '#FFFFFF',
      border: '5px solid #000000',
      borderRadius: '0px',
      boxShadow: '12px 12px 0px 0px #000000',
      padding: '2.5rem',
    },
    headerTitle: {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    headerSubtitle: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#333333',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    socialButtonsBlockButton: {
      border: '4px solid #000000',
      borderRadius: '0px',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '900',
      fontSize: '1rem',
      padding: '1rem 1.5rem',
      boxShadow: '6px 6px 0px 0px #000000',
      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      '&:hover': {
        backgroundColor: '#000000',
        color: '#FFFFFF',
        boxShadow: '8px 8px 0px 0px #FF00FF',
        transform: 'translate(-2px, -2px)',
      },
      '&:active': {
        transform: 'translate(2px, 2px)',
        boxShadow: '2px 2px 0px 0px #000000',
      },
    },
    socialButtonsBlockButtonText: {
      color: 'inherit',
      fontWeight: '900',
    },
    formButtonPrimary: {
      backgroundColor: '#000000',
      color: '#FFFFFF',
      border: '5px solid #000000',
      borderRadius: '0px',
      fontWeight: '900',
      fontSize: '1.25rem',
      padding: '1.125rem 2.5rem',
      boxShadow: '8px 8px 0px 0px #FF00FF',
      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      '&:hover': {
        backgroundColor: '#FF00FF',
        color: '#FFFFFF',
        boxShadow: '10px 10px 0px 0px #000000',
        transform: 'translate(-2px, -2px)',
      },
      '&:active': {
        transform: 'translate(4px, 4px)',
        boxShadow: '4px 4px 0px 0px #000000',
      },
    },
    formFieldInput: {
      border: '4px solid #000000',
      borderRadius: '0px',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '700',
      fontSize: '1.125rem',
      padding: '1rem 1.25rem',
      boxShadow: 'inset 3px 3px 0px 0px rgba(0,0,0,0.1)',
      transition: 'all 0.1s ease',
      '&:focus': {
        border: '4px solid #FF00FF',
        boxShadow: 'inset 3px 3px 0px 0px rgba(0,0,0,0.1), 0 0 0 4px rgba(255,0,255,0.2)',
        outline: 'none',
      },
    },
    formFieldLabel: {
      color: '#000000',
      fontWeight: '900',
      fontSize: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '0.5rem',
    },
    dividerLine: {
      borderColor: '#000000',
      borderWidth: '3px',
    },
    dividerText: {
      color: '#000000',
      fontWeight: '900',
      fontSize: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
    },
    identityPreviewEditButton: {
      border: '3px solid #000000',
      borderRadius: '0px',
      color: '#000000',
      fontWeight: '900',
      backgroundColor: '#FFFF00',
      boxShadow: '4px 4px 0px 0px #000000',
      '&:hover': {
        backgroundColor: '#000000',
        color: '#FFFF00',
      },
    },
    footerActionLink: {
      color: '#000000',
      fontWeight: '900',
      textDecoration: 'underline',
      textDecorationThickness: '3px',
      textUnderlineOffset: '4px',
      fontSize: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      '&:hover': {
        color: '#FF00FF',
        textDecorationColor: '#FF00FF',
      },
    },
    formResendCodeLink: {
      color: '#000000',
      fontWeight: '900',
      textDecoration: 'underline',
      textDecorationThickness: '3px',
      textUnderlineOffset: '4px',
      fontSize: '1rem',
      textTransform: 'uppercase',
      '&:hover': {
        color: '#FF00FF',
        textDecorationColor: '#FF00FF',
      },
    },
    alertText: {
      color: '#000000',
      fontWeight: '900',
      fontSize: '1rem',
      backgroundColor: '#FFFF00',
      border: '3px solid #000000',
      padding: '0.75rem',
      boxShadow: '4px 4px 0px 0px #000000',
      textTransform: 'uppercase',
    },
    formFieldErrorText: {
      color: '#FF0000',
      fontWeight: '900',
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    otpCodeFieldInput: {
      border: '4px solid #000000',
      borderRadius: '0px',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '900',
      fontSize: '1.75rem',
      padding: '1rem',
      boxShadow: 'inset 3px 3px 0px 0px rgba(0,0,0,0.1)',
      textAlign: 'center',
      '&:focus': {
        border: '4px solid #FF00FF',
        boxShadow: 'inset 3px 3px 0px 0px rgba(0,0,0,0.1), 0 0 0 4px rgba(255,0,255,0.2)',
      },
    },
    formButtonReset: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      border: '4px solid #000000',
      borderRadius: '0px',
      fontWeight: '900',
      boxShadow: '6px 6px 0px 0px #000000',
      textTransform: 'uppercase',
      '&:hover': {
        backgroundColor: '#000000',
        color: '#FFFFFF',
      },
    },
    footerAction: {
      color: '#000000',
      fontWeight: '700',
      fontSize: '1rem',
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
    <div className="w-full max-w-[480px]">
      <SignIn 
        appearance={neobrutalismAppearance}
        routing="path"
        path="/sign-in"
      />
    </div>
  )
}

export default Page
