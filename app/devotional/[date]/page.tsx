import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { resolveLocale } from '@/lib/i18n'
import {
  fetchDevotionalByDate,
  isFutureDateParam,
  isValidDateParam,
} from '@/lib/devotional'
import { buildDevotionalMetadata } from '@/lib/devotional-metadata'
import DevotionalLanding from '@/components/devotional/DevotionalLanding'

interface PageProps {
  params: Promise<{ date: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { date } = await params
  if (!isValidDateParam(date) || isFutureDateParam(date)) return {}

  const [dev, rawLocale] = await Promise.all([
    fetchDevotionalByDate(date),
    getLocale(),
  ])

  return buildDevotionalMetadata(
    dev,
    resolveLocale(rawLocale),
    `/devotional/${date}`,
  )
}

export default async function DatedDevotionalPage({ params }: PageProps) {
  const { date } = await params
  if (!isValidDateParam(date) || isFutureDateParam(date)) {
    notFound()
  }

  const [dev, rawLocale] = await Promise.all([
    fetchDevotionalByDate(date),
    getLocale(),
  ])

  return (
    <DevotionalLanding
      devotional={dev}
      locale={resolveLocale(rawLocale)}
      requestedDate={date}
    />
  )
}
