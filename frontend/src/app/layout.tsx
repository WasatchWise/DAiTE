import type { Metadata, Viewport } from 'next'
import './globals.css'
import { PWAInstaller } from '../components/PWAInstaller'
import './sw-register'

export const metadata: Metadata = {
  title: 'DAiTE - Your Personal CYRAiNO',
  description: 'Where connections have depth, not just data. AI-powered matchmaking through agent-to-agent conversations.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DAiTE',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'DAiTE',
    title: 'DAiTE - Your Personal CYRAiNO',
    description: 'Where connections have depth, not just data.',
  },
  twitter: {
    card: 'summary',
    title: 'DAiTE - Your Personal CYRAiNO',
    description: 'Where connections have depth, not just data.',
  },
}

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
        <PWAInstaller />
      </body>
    </html>
  )
}

