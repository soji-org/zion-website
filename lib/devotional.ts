const API_BASE = 'https://api.streamsofjoy.app'

/** Fallback keeps working if the store links are not configured per-environment. */
export const appLinks = {
  ios: process.env.NEXT_PUBLIC_IOS_APP_URL || 'https://onelink.to/sojiapp',
  android: process.env.NEXT_PUBLIC_ANDROID_APP_URL || 'https://onelink.to/sojiapp',
  generic: process.env.NEXT_PUBLIC_APP_LINK || 'https://onelink.to/sojiapp',
}

export type MemoryVerse = { content: string; passage: string }

export type Translation = {
  language: string
  title: string
  content: string
  memoryVerse: MemoryVerse
}

export type Devotional = {
  id: string
  title: string
  date: string
  coverImageUrl: string
  memoryVerse: MemoryVerse
  estReadTime: number
  author: string
  /** Truncated to 150 chars by the API; this is a teaser, not the full text. */
  content: string
  translations: Translation[]
}

async function fetchSummary(path: string): Promise<Devotional | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const json = (await res.json()) as { data?: Devotional }
    return json?.data ?? null
  } catch {
    return null
  }
}

export function fetchTodayDevotional() {
  return fetchSummary('/devotional/today/summary')
}

export function fetchDevotionalByDate(date: string) {
  return fetchSummary(`/devotional/date/${date}/summary`)
}

export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export function isValidDateParam(value: string) {
  if (!DATE_PATTERN.test(value)) return false
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.getTime())
}

/**
 * A devotional that has not happened yet has no page. Timezones run to UTC+14,
 * so a reader's "today" can be one day ahead of UTC — allow that much slack
 * before treating a date as future, or those readers would 404 on their own day.
 */
export function isFutureDateParam(value: string) {
  const requested = new Date(`${value}T00:00:00.000Z`)
  const cutoff = new Date()
  cutoff.setUTCHours(0, 0, 0, 0)
  cutoff.setUTCDate(cutoff.getUTCDate() + 1)
  return requested > cutoff
}

/** YYYY-MM-DD in UTC, matching how the API buckets devotional days. */
export function toDateParam(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value
  return date.toISOString().slice(0, 10)
}

export function isToday(date: string) {
  return toDateParam(date) === toDateParam(new Date())
}

/**
 * Backend languages are Prisma enum values (EN, PT_BR); site locales are BCP-47
 * (en, pt-BR). Normalise both, then fall back to a base-language match so a
 * `pt` locale still finds a `PT_BR` translation.
 */
function normaliseLanguage(value: string) {
  return value.trim().toLowerCase().replace(/_/g, '-')
}

export function getLocalisedContent(dev: Devotional, locale: string) {
  const target = normaliseLanguage(locale)
  if (target === 'en') return null

  const translations = dev.translations ?? []

  const exact = translations.find(
    (t) => normaliseLanguage(t.language) === target,
  )
  if (exact) return exact

  const base = target.split('-')[0]
  return (
    translations.find(
      (t) => normaliseLanguage(t.language).split('-')[0] === base,
    ) ?? null
  )
}

export function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
