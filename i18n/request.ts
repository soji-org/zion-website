import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, isLocale, localeCookieName, resolveLocale } from '@/lib/i18n'

type Messages = Record<string, unknown>

function resolveAcceptLanguage(value: string | null) {
  if (!value) return defaultLocale

  const languages = value
    .split(',')
    .map((item) => item.trim().split(';')[0])
    .filter(Boolean)

  for (const language of languages) {
    const locale = resolveLocale(language)
    if (isLocale(locale)) return locale
  }

  return defaultLocale
}

export default getRequestConfig(async () => {
  const cookieLocale = cookies().get(localeCookieName)?.value
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : resolveAcceptLanguage(headers().get('accept-language'))
  const defaultMessages = (await import(`../messages/${defaultLocale}.json`)).default
  const localeMessages = locale === defaultLocale
    ? defaultMessages
    : (await import(`../messages/${locale}.json`)).default

  return {
    locale,
    messages: mergeMessages(defaultMessages, localeMessages),
  }
})

function mergeMessages(defaultMessages: unknown, localeMessages: unknown): Messages {
  if (!isRecord(defaultMessages) || !isRecord(localeMessages)) {
    return (localeMessages ?? defaultMessages ?? {}) as Messages
  }

  const merged: Record<string, unknown> = { ...defaultMessages }
  for (const [key, value] of Object.entries(localeMessages)) {
    merged[key] = mergeMessages(defaultMessages[key], value)
  }
  return merged
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}
