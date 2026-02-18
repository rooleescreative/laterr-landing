import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/i18n'

export const metadata: Metadata = {
  title: 'Laterr — Save articles. Read summaries.',
  description: 'The read-it-later app that sends you a daily digest with AI summaries of the articles you saved.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Laterr — Save articles. Read summaries.',
    description: 'The read-it-later app that sends you a daily digest with AI summaries of the articles you saved.',
    url: 'https://laterr.news',
    siteName: 'Laterr',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
