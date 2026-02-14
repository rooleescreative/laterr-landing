'use client'

import { useTranslation, Locale, SUPPORTED_LOCALES } from '@/i18n'

const LOCALE_LABELS: Record<Locale, string> = {
  it: 'IT',
  en: 'EN',
  es: 'ES',
}

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation()

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>
      {SUPPORTED_LOCALES.map((loc, index) => (
        <span key={loc} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <button
            onClick={() => setLocale(loc)}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 6px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: locale === loc ? 600 : 400,
              color: locale === loc ? '#FF5924' : '#827365',
              textDecoration: locale === loc ? 'underline' : 'none',
              textUnderlineOffset: '3px',
              transition: 'color 0.15s',
            }}
          >
            {LOCALE_LABELS[loc]}
          </button>
          {index < SUPPORTED_LOCALES.length - 1 && (
            <span style={{ color: '#D1CBC4' }}>|</span>
          )}
        </span>
      ))}
    </div>
  )
}
