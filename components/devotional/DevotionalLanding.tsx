import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen,
  Clock,
  Bell,
  Headphones,
  Download,
  BookMarked,
  Radio,
  Mic,
  HandHeart,
  NotebookPen,
  CalendarDays,
  ArrowRight,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  appLinks,
  formatDate,
  getLocalisedContent,
  isToday,
  type Devotional,
} from '@/lib/devotional'

const FEATURES = [
  [Radio, 'featureNsppd'],
  [BookOpen, 'featureDevotionals'],
  [Mic, 'featureSermons'],
  [BookMarked, 'featureBible'],
  [HandHeart, 'featurePrayerHub'],
  [Headphones, 'featureAudio'],
  [NotebookPen, 'featureNotes'],
  [Bell, 'featurePrayer'],
  [CalendarDays, 'featureEvents'],
] as const

export default async function DevotionalLanding({
  devotional,
  locale,
  requestedDate,
}: {
  devotional: Devotional | null
  locale: string
  /** Set on dated permalinks, so a miss can name the day that was asked for. */
  requestedDate?: string
}) {
  const t = await getTranslations('Devotional')

  const localised = devotional ? getLocalisedContent(devotional, locale) : null
  const title = localised?.title ?? devotional?.title
  const teaser = localised?.content ?? devotional?.content
  const memoryVerse = localised?.memoryVerse ?? devotional?.memoryVerse
  const coverImage = devotional?.coverImageUrl
  const readTime = devotional?.estReadTime
  const date = devotional ? formatDate(devotional.date, locale) : ''
  const showsPastDevotional = devotional ? !isToday(devotional.date) : false

  const missingTitle = requestedDate
    ? t('unavailableForDate', {
        date: formatDate(`${requestedDate}T00:00:00.000Z`, locale),
      })
    : t('unavailableTitle')

  return (
    <main className="relative min-h-screen bg-stone-950 text-stone-50">
      {/* Full-bleed background */}
      {coverImage && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <Image
            src={coverImage}
            alt=""
            fill
            className="object-cover object-center opacity-15"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950/80 via-stone-950/90 to-stone-950" />
        </div>
      )}

      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 pt-6 pb-4 sm:px-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/streams-of-joy-logo.svg"
              alt="Streams of Joy"
              width={30}
              height={30}
              className="h-[30px] w-[30px]"
            />
            <span className="text-sm font-light text-stone-50/60">
              Streams of Joy
            </span>
          </Link>
          <span className="rounded-full border border-stone-700 px-2.5 py-1 text-[10px] uppercase tracking-widest text-stone-400">
            {t('badge')}
          </span>
        </header>

        <div className="mx-auto w-full max-w-lg px-5 pb-16 sm:px-8">
          {/* A dated permalink can outlive the day it was shared. */}
          {(showsPastDevotional || (!devotional && requestedDate)) && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-stone-800 bg-stone-900/60 px-3 py-2.5 text-xs">
              <span className="text-stone-400">
                {devotional ? t('notToday') : t('missingDateNote')}
              </span>
              <Link
                href="/devotional"
                className="flex items-center gap-1 font-medium text-[#7D30E0] hover:underline"
              >
                {t('todayLink')}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          )}

          {/* Devotional identity */}
          <div className="flex items-center gap-4">
            {coverImage && title && (
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-50/10" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              {/* Metadata only makes sense when there is a devotional to describe. */}
              {devotional && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] uppercase tracking-wider text-stone-400">
                  {date && <span>{date}</span>}
                  {readTime != null && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                      {t('readMin', { n: readTime })}
                    </span>
                  )}
                </div>
              )}
              <h1 className="mt-1 text-balance text-xl font-light leading-snug tracking-tight text-stone-50">
                {title ?? missingTitle}
              </h1>
              {devotional && (
                <p className="mt-0.5 text-xs text-stone-400">{t('by')}</p>
              )}
            </div>
          </div>

          {/* Memory verse — no longer clamped */}
          {memoryVerse?.content && (
            <div className="mt-6 border-l-2 border-[#7D30E0] pl-4">
              <p className="mb-1 text-[10px] uppercase tracking-widest text-stone-500">
                {t('memoryVerseLabel')}
              </p>
              <p className="text-sm italic leading-relaxed text-stone-300/75">
                &ldquo;{memoryVerse.content}&rdquo;
              </p>
              <cite className="mt-1 block text-xs not-italic text-[#7D30E0]">
                {memoryVerse.passage}
              </cite>
            </div>
          )}

          {/* Teaser — the API only returns the opening 150 characters */}
          {teaser && (
            <div className="mt-6">
              <p className="text-sm leading-relaxed text-stone-300/85">
                {teaser}
              </p>
              <p className="mt-2 text-xs text-stone-500">
                {t('continueInApp')}
              </p>
            </div>
          )}

          {/* Primary CTA, kept high on the page */}
          <div className="mt-7">
            <a
              href={appLinks.generic}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-[#7D30E0] py-4 text-sm font-medium text-white shadow-lg shadow-[#7D30E0]/25 transition hover:bg-[#6a27c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D30E0] motion-reduce:transition-none"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t('downloadBtn')}
            </a>
            <p className="mt-2 text-center text-xs text-stone-600">
              {t('downloadNote')}
            </p>
          </div>

          {/* NSPPD — the ministry's biggest draw, previously unmentioned */}
          <section className="mt-10 rounded-xl border border-[#7D30E0]/30 bg-[#7D30E0]/10 p-5">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
              <h2 className="text-sm font-medium text-stone-100">
                {t('nsppdTitle')}
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-stone-300/80">
              {t('nsppdBody')}
            </p>
          </section>

          {/* What else the app does */}
          <section className="mt-10">
            <h2 className="text-[10px] uppercase tracking-widest text-stone-500">
              {t('featuresHeading')}
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {FEATURES.map(([Icon, key]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 rounded-lg border border-stone-800 bg-stone-900/50 px-3 py-2.5"
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-[#7D30E0]"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-stone-300">{t(key)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section className="mt-10 text-center">
            <p className="text-sm leading-relaxed text-stone-400">
              {t('socialProof')}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={appLinks.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-stone-700 py-3 text-xs font-medium text-stone-200 transition hover:border-stone-500 hover:bg-stone-900 motion-reduce:transition-none"
              >
                {t('getOnIos')}
              </a>
              <a
                href={appLinks.android}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-stone-700 py-3 text-xs font-medium text-stone-200 transition hover:border-stone-500 hover:bg-stone-900 motion-reduce:transition-none"
              >
                {t('getOnAndroid')}
              </a>
            </div>
          </section>
        </div>

        <footer className="pb-6 text-center text-[10px] text-stone-700">
          © {new Date().getFullYear()} Streams of Joy · Consonant Technologies
          Ltd.
        </footer>
      </div>
    </main>
  )
}
