export const locales = ['en', 'it', 'es', 'de', 'ar', 'ru', 'fr'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeCookieName = 'NEXT_LOCALE'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  es: 'Español',
  de: 'Deutsch',
  ar: 'العربية',
  ru: 'Русский',
  fr: 'Français',
}

export const rtlLocales: Locale[] = ['ar']

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale)
}

export function resolveLocale(value: string | undefined | null): Locale {
  const short = value?.toLowerCase().split('-')[0]
  return isLocale(short) ? short : defaultLocale
}
