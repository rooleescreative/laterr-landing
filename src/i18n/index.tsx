'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import it from './locales/it.json'
import en from './locales/en.json'
import es from './locales/es.json'

export type Locale = 'it' | 'en' | 'es'

const translations: Record<Locale, any> = { it, en, es }

const SUPPORTED_LOCALES: Locale[] = ['it', 'en', 'es']
const DEFAULT_LOCALE: Locale = 'it'
const COOKIE_NAME = 'laterr-locale'

function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  const browserLang = navigator.language.split('-')[0].toLowerCase()
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale
  }
  return DEFAULT_LOCALE
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  tArray: (key: string) => any[]
}

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
  tArray: () => [],
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLocale = getCookie(COOKIE_NAME) as Locale | null
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      setLocaleState(savedLocale)
    } else {
      const detected = detectBrowserLocale()
      setLocaleState(detected)
      setCookie(COOKIE_NAME, detected)
    }
    setMounted(true)
  }, [])

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale)
    setCookie(COOKIE_NAME, newLocale)
  }

  function t(key: string, params?: Record<string, string | number>): string {
    let value = getNestedValue(translations[locale], key)
    if (typeof value !== 'string') return key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v))
      })
    }
    return value
  }

  function tArray(key: string): any[] {
    const value = getNestedValue(translations[locale], key)
    return Array.isArray(value) ? value : []
  }

  if (!mounted) {
    const defaultT = (key: string): string => {
      const value = getNestedValue(translations[DEFAULT_LOCALE], key)
      return typeof value === 'string' ? value : key
    }
    const defaultTArray = (key: string): any[] => {
      const value = getNestedValue(translations[DEFAULT_LOCALE], key)
      return Array.isArray(value) ? value : []
    }
    return (
      <I18nContext.Provider value={{ locale: DEFAULT_LOCALE, setLocale, t: defaultT, tArray: defaultTArray }}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  return useContext(I18nContext)
}

export { SUPPORTED_LOCALES }
