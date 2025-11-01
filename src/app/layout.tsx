import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from 'sonner'
import ReactQueryProvider from '@/providers/react-query-provider'
import ReduxProvider from '@/providers/redux-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import CustomChatWidget from '@/components/global/chat-widget/custom-chat-widget'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Zenus - Instagram Automation Platform | AI-Powered Engagement',
    template: '%s | Zenus'
  },
  description: 'Transform your Instagram engagement with AI-powered automation. Automate DMs, reply to comments, and boost follower growth with Zenus. Smart Instagram automation for creators, businesses, and influencers.',
  keywords: [
    'instagram automation',
    'instagram dm automation',
    'instagram comment automation',
    'instagram engagement',
    'ai instagram automation',
    'instagram bot',
    'instagram growth tool',
    'automate instagram responses',
    'instagram marketing',
    'social media automation'
  ],
  authors: [{ name: 'Zenus Team' }],
  creator: 'Zenus',
  publisher: 'Zenus',
  applicationName: 'Zenus',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#6366F1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zenus.space',
    siteName: 'Zenus',
    title: 'Zenus - Instagram Automation Platform | AI-Powered Engagement',
    description: 'Transform your Instagram engagement with AI-powered automation. Automate DMs, reply to comments, and boost follower growth effortlessly.',
    images: [
      {
        url: '/zenus-logo-full.png',
        width: 1200,
        height: 630,
        alt: 'Zenus - Instagram Automation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ZenusSpace',
    creator: '@ZenusSpace',
    title: 'Zenus - Instagram Automation Platform',
    description: 'Transform your Instagram engagement with AI-powered automation.',
    images: ['/zenus-logo-full.png'],
  },
  alternates: {
    canonical: 'https://zenus.space',
  },
  metadataBase: new URL('https://zenus.space'),
  category: 'Technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={jakarta.className}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>

            <Toaster />
            <CustomChatWidget />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
