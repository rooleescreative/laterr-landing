'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n'

const COOKIE_NAME = 'laterr-cookie-consent'
const COOKIE_MAX_AGE = 15552000 // 180 days (6 months, Garante recommendation)

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split(';').find(c => c.trim().startsWith(`${name}=`))
  return match ? match.split('=')[1]?.trim() || null : null
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
}

export function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME)
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_MAX_AGE)
    setVisible(false)
    window.dispatchEvent(new Event('laterr-consent-change'))
  }

  const reject = () => {
    setCookie(COOKIE_NAME, 'rejected', COOKIE_MAX_AGE)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #EAE4DD',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      padding: '16px 24px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap' as const,
      }}>
        <p style={{
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#000000',
          margin: 0,
          flex: '1 1 300px',
        }}>
          {t('cookieBanner.text')}{' '}
          <a
            href="https://app.laterr.news/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FF5924', textDecoration: 'underline' }}
          >
            {t('cookieBanner.privacyLink')}
          </a>
        </p>
        <div style={{
          display: 'flex',
          gap: '8px',
          flexShrink: 0,
        }}>
          <button
            onClick={reject}
            style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '8px',
              border: '1px solid #EAE4DD',
              backgroundColor: 'transparent',
              color: '#827365',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {t('cookieBanner.reject')}
          </button>
          <button
            onClick={accept}
            style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#FF5924',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {t('cookieBanner.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}

// Call this from a "Cookie settings" link in the footer to re-show the banner
export function resetCookieConsent() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`
  window.location.reload()
}
