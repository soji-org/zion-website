import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { resolveLocale } from '@/lib/i18n'
import { fetchTodayDevotional } from '@/lib/devotional'
import { buildDevotionalMetadata } from '@/lib/devotional-metadata'
import DevotionalLanding from '@/components/devotional/DevotionalLanding'

export async function generateMetadata(): Promise<Metadata> {
  const [dev, rawLocale] = await Promise.all([
    fetchTodayDevotional(),
    getLocale(),
  ])
  return buildDevotionalMetadata(dev, resolveLocale(rawLocale), '/devotional')
}

export default async function DevotionalPage() {
  const [dev, rawLocale] = await Promise.all([
    fetchTodayDevotional(),
    getLocale(),
  ])

  return <DevotionalLanding devotional={dev} locale={resolveLocale(rawLocale)} />
}
