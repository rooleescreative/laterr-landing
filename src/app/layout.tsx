import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/i18n'

export const metadata: Metadata = {
  title: 'Laterr - Salva articoli. Leggi i riassunti.',
  description: "L'app read-it-later che ti manda ogni sera un digest con i summary AI degli articoli che hai salvato.",
  openGraph: {
    title: 'Laterr - Salva articoli. Leggi i riassunti.',
    description: "L'app read-it-later che ti manda ogni sera un digest con i summary AI degli articoli che hai salvato.",
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
