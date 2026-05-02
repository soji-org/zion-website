import type { Metadata } from 'next'
import Image from 'next/image'
import { BookOpen, Clock, Bell, Headphones, Download, BookMarked } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { absoluteUrl, siteConfig } from '@/lib/seo'
import { resolveLocale } from '@/lib/i18n'

const DEVOTIONAL_API = 'https://api.streamsofjoy.app/devotional/today/summary'
const APP_LINK = 'https://onelink.to/sojiapp'

type MemoryVerse = { content: string; passage: string }
type Translation = { language: string; title: string; content: string; memoryVerse: MemoryVerse }
type Devotional = {
  id: string
  title: string
  date: string
  coverImageUrl: string
  memoryVerse: MemoryVerse
  estReadTime: number
  author: string
  content: string
  translations: Translation[]
}

async function fetchDevotional(): Promise<Devotional | null> {
  try {
    const res = await fetch(DEVOTIONAL_API, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const json = await res.json() as { data?: Devotional }
    return json?.data ?? null
  } catch {
    return null
  }
}

function getLocalisedContent(dev: Devotional, locale: string) {
  if (locale === 'en') return null
  return dev.translations.find((t) => t.language.toLowerCase() === locale.toLowerCase()) ?? null
}

export async function generateMetadata(): Promise<Metadata> {
  const [dev, rawLocale] = await Promise.all([fetchDevotional(), getLocale()])
  const locale = resolveLocale(rawLocale)
  const localised = dev ? getLocalisedContent(dev, locale) : null
  const title = localised?.title ?? dev?.title
  const content = localised?.content ?? dev?.content
  const metaTitle = title ? `${title} — Daily Devotional` : 'Daily Devotional'
  const description = content
    ? `${content.slice(0, 155).trim()}…`
    : "Read today's devotional from Pastor Jerry Eze on the Streams of Joy app."
  const image = dev?.coverImageUrl ?? absoluteUrl(siteConfig.ogImage)
  const url = absoluteUrl('/devotional')
  return {
    title: metaTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle, description, url, siteName: siteConfig.name, type: 'article',
      publishedTime: dev?.date,
      authors: dev?.author ? [dev.author] : undefined,
      images: [{ url: image, width: 1200, height: 630, alt: metaTitle }],
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description, images: [image] },
  }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function DevotionalPage() {
  const [dev, rawLocale, t] = await Promise.all([
    fetchDevotional(),
    getLocale(),
    getTranslations('Devotional'),
  ])

  const locale = resolveLocale(rawLocale)
  const localised = dev ? getLocalisedContent(dev, locale) : null

  const title = localised?.title ?? dev?.title ?? "Today's Devotional"
  const date = dev ? formatDate(dev.date, locale) : ''
  const readTime = dev?.estReadTime ?? 5
  const coverImage = dev?.coverImageUrl
  const memoryVerse = localised?.memoryVerse ?? dev?.memoryVerse

  return (
    <main className="relative h-screen overflow-hidden bg-stone-950 text-stone-50 flex flex-col">

      {/* Full-bleed background */}
      {coverImage && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src={coverImage} alt="" fill className="object-cover object-center opacity-15" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950/80 via-stone-950/90 to-stone-950" />
        </div>
      )}

      {/* Header — full width */}
      <header className="relative z-10 shrink-0 flex items-center justify-between px-6 pt-6 pb-4 sm:px-10">
        <div className="flex items-center gap-2">
          <Image src="/streams-of-joy-logo.svg" alt="Streams of Joy" width={30} height={30} className="h-[30px] w-[30px]" />
          <span className="text-sm font-light text-stone-50/60">Streams of Joy</span>
        </div>
        <span className="rounded-full border border-stone-700 px-2.5 py-1 text-[10px] uppercase tracking-widest text-stone-400">
          {t('badge')}
        </span>
      </header>

      {/* Content — constrained, centered */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full max-w-lg mx-auto px-5 sm:px-8 justify-center gap-5">

        {/* Devotional identity */}
        <div className="flex gap-4 items-center">
          {coverImage && (
            <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden">
              <Image src={coverImage} alt={title} fill className="object-cover" sizes="80px" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-50/10" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] uppercase tracking-wider text-stone-400">
              {date && <span>{date}</span>}
              <span className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                {t('readMin', { n: readTime })}
              </span>
            </div>
            <h1 className="mt-1 text-xl font-light leading-snug tracking-tight text-stone-50 text-balance">
              {title}
            </h1>
            <p className="mt-0.5 text-xs text-stone-400">{t('by')}</p>
          </div>
        </div>

        {/* Memory verse */}
        {memoryVerse && (
          <div className="border-l-2 border-[#7D30E0] pl-4">
            <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t('memoryVerseLabel')}</p>
            <p className="text-sm italic leading-relaxed text-stone-300/75 line-clamp-2">
              &ldquo;{memoryVerse.content}&rdquo;
            </p>
            <cite className="mt-1 block text-xs not-italic text-[#7D30E0]">{memoryVerse.passage}</cite>
          </div>
        )}

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-2">
          {([
            [BookOpen,   'featureDevotionals'],
            [Headphones, 'featureAudio'],
            [Bell,       'featurePrayer'],
            [BookMarked, 'featureOffline'],
          ] as const).map(([Icon, key]) => (
            <div key={key} className="flex items-center gap-2 rounded-lg border border-stone-800 bg-stone-900/50 px-3 py-2.5">
              <Icon className="h-3.5 w-3.5 shrink-0 text-[#7D30E0]" aria-hidden="true" />
              <span className="text-xs text-stone-300">{t(key)}</span>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div>
          <p className="text-center text-sm leading-relaxed text-stone-400 text-pretty mb-4">
            {t('ctaPrefix')}{' '}
            <span className="text-stone-200 font-medium">{title}</span>
            {t('ctaSuffix')}
          </p>
          <a
            href={APP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 bg-[#7D30E0] py-4 text-sm font-medium text-white shadow-lg shadow-[#7D30E0]/25 hover:bg-[#6a27c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D30E0] motion-safe:transition motion-reduce:transition-none rounded-sm"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('downloadBtn')}
          </a>
          <p className="mt-2 text-center text-xs text-stone-600">{t('downloadNote')}</p>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 shrink-0 pb-5 text-center text-[10px] text-stone-700">
        © {new Date().getFullYear()} Streams of Joy · Consonant Technologies Ltd.
      </footer>

    </main>
  )
}
