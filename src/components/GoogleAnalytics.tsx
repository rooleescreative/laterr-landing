'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const COOKIE_NAME = 'laterr-cookie-consent'
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

function hasConsent(): boolean {
  if (typeof document === 'undefined') return false
  const match = document.cookie.split(';').find(c => c.trim().startsWith(`${COOKIE_NAME}=`))
  return match?.includes('accepted') || false
}

export function GoogleAnalytics() {
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    // Check on mount
    if (hasConsent()) setConsent(true)

    // Listen for consent changes (from CookieBanner accept)
    const handler = () => {
      if (hasConsent()) setConsent(true)
    }
    window.addEventListener('laterr-consent-change', handler)
    return () => window.removeEventListener('laterr-consent-change', handler)
  }, [])

  // GA blocked by default — only loads after explicit consent (Garante 10/06/2021)
  if (!consent || !GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  anonymize_ip: true,
  cookie_flags: 'SameSite=Lax;Secure'
});`}
      </Script>
    </>
  )
}
