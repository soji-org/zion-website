import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  Bell,
  BookMarked,
  BookOpen,
  CalendarCheck,
  Clock,
  Download,
  Flame,
  Gift,
  Globe2,
  Headphones,
  HeartHandshake,
  Highlighter,
  Lock,
  Mail,
  Moon,
  Music,
  NotebookPen,
  Pause,
  Play,
  Podcast,
  Radio,
  Search,
  Shield,
  Sparkles,
  Timer,
  Users,
  Volume2,
} from 'lucide-react'

const coreFeatures = [
  {
    icon: BookOpen,
    title: 'core.daily.title',
    desc: 'core.daily.desc',
  },
  {
    icon: Flame,
    title: 'core.streaks.title',
    desc: 'core.streaks.desc',
  },
  {
    icon: Podcast,
    title: 'core.sermons.title',
    desc: 'core.sermons.desc',
  },
  {
    icon: BookOpen,
    title: 'core.bible.title',
    desc: 'core.bible.desc',
  },
  {
    icon: HeartHandshake,
    title: 'core.prayer.title',
    desc: 'core.prayer.desc',
  },
  {
    icon: NotebookPen,
    title: 'core.study.title',
    desc: 'core.study.desc',
  },
  {
    icon: Bell,
    title: 'core.notifications.title',
    desc: 'core.notifications.desc',
  },
  {
    icon: CalendarCheck,
    title: 'core.events.title',
    desc: 'core.events.desc',
  },
  {
    icon: Globe2,
    title: 'core.language.title',
    desc: 'core.language.desc',
  },
]

const devotionalTools = [
  ['devotionals.tools.audio', Headphones],
  ['devotionals.tools.languages', Globe2],
  ['devotionals.tools.calendar', CalendarCheck],
  ['devotionals.tools.highlight', Highlighter],
  ['devotionals.tools.quoteCards', Sparkles],
  ['devotionals.tools.bookmark', BookMarked],
]

const prayerTools = [
  ['prayer.tools.private', Lock],
  ['prayer.tools.timer', Timer],
  ['prayer.tools.focus', Moon],
  ['prayer.tools.sounds', Music],
  ['prayer.tools.community', HeartHandshake],
  ['prayer.tools.reorder', Shield],
]

const sermonTools = [
  ['sermons.tools.player', Play],
  ['sermons.tools.speed', Timer],
  ['sermons.tools.waveform', Volume2],
  ['sermons.tools.download', Download],
  ['sermons.tools.share', Sparkles],
  ['sermons.tools.notes', NotebookPen],
]

const moreFeatures = [
  ['more.events.title', 'more.events.desc', CalendarCheck],
  ['more.giving.title', 'more.giving.desc', HeartHandshake],
  ['more.declarations.title', 'more.declarations.desc', Sparkles],
  ['more.notifications.title', 'more.notifications.desc', Bell],
  ['more.darkMode.title', 'more.darkMode.desc', Moon],
  ['more.text.title', 'more.text.desc', Search],
  ['more.timezones.title', 'more.timezones.desc', Globe2],
  ['more.privacy.title', 'more.privacy.desc', Shield],
]

const stats = [
  ['2M+', 'stats.users'],
  ['150+', 'stats.countries'],
  ['500K', 'stats.prayers'],
  ['4.9', 'stats.rating'],
]

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? ''
const FALLBACK_STORE_URL = 'https://onelink.to/sojiapp'

type AppLinks = { ios?: string | null; android?: string | null }

async function fetchAppLinks(): Promise<AppLinks> {
  try {
    const res = await fetch(`${API_BASE}/config/app-links`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return {}
    const json = await res.json()
    return (json?.data ?? json) as AppLinks
  } catch {
    return {}
  }
}

export default async function HomePage() {
  const [common, home, appLinks] = await Promise.all([
    getTranslations('Common'),
    getTranslations('Home'),
    fetchAppLinks(),
  ])
  const iosUrl = appLinks?.ios || FALLBACK_STORE_URL
  const androidUrl = appLinks?.android || FALLBACK_STORE_URL

  return (
    <main className="min-h-screen overflow-x-hidden bg-stone-50 text-stone-900">

      {/* ── Navigation ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            aria-label={common('streamsHome')}
          >
            <Image
              src="/streams-of-joy-logo.svg"
              alt="Streams of Joy"
              width={48}
              height={48}
              priority
              className="h-12 w-12"
            />
          </Link>

          <nav aria-label={common('mainNavigation')} className="hidden items-center gap-8 lg:flex">
            {[
              [home('nav.features'),    '#features'],
              [home('nav.devotionals'), '#devotionals'],
              [home('nav.prayer'),      '#prayer'],
              [home('nav.sermons'),     '#sermons'],
              [home('nav.study'),       '#study'],
              [home('nav.gift'),        '#gift'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="min-h-[44px] content-center text-sm text-stone-900/55 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://streamsofjoy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] content-center text-sm text-stone-900/55 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
            >
              {home('nav.churchWebsite')}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="max-w-[7.5rem] sm:max-w-none" />
            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center bg-stone-900 px-5 text-sm text-stone-50 hover:bg-[#7D30E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 motion-safe:transition motion-reduce:transition-none"
            >
              {common('downloadFree')}
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="border-b border-stone-200 py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-4 px-4 md:gap-8 md:px-8">

          <div className="col-span-12 lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">
              {home('hero.eyebrow')}
            </p>
            <h1 className="mt-8 text-[clamp(3rem,9vw,7.5rem)] font-light tracking-tight leading-none text-balance">
              {home('hero.titlePrefix')}{' '}
              <span className="text-[#7D30E0]">{home('hero.titleAccent')}</span>{' '}
              {home('hero.titleSuffix')}
            </h1>
          </div>

          <div className="col-span-12 flex flex-col justify-end lg:col-span-4">
            <p className="max-w-[60ch] text-lg leading-relaxed text-stone-900/60 text-pretty">
              {home('hero.body')}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7D30E0] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7D30E0]" />
              </span>
              <span className="text-xs uppercase tracking-wide text-stone-900/50">
                {home('hero.live')}
              </span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <a
                href={iosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-900 px-6 py-4 text-center text-sm text-stone-50 hover:bg-[#7D30E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
              >
                iOS
              </a>
              <a
                href={androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-stone-900 px-6 py-4 text-center text-sm hover:border-[#7D30E0] hover:text-[#7D30E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
              >
                Android
              </a>
            </div>
          </div>

          {/* Quick-feature tiles */}
          <div className="col-span-12 mt-12 grid grid-cols-2 gap-px border border-stone-200 bg-stone-200 lg:grid-cols-4">
            {[
              ['quick.daily.title', 'quick.daily.desc', BookOpen],
              ['quick.streaks.title', 'quick.streaks.desc', Flame],
              ['quick.sermons.title', 'quick.sermons.desc', Podcast],
              ['quick.bible.title', 'quick.bible.desc', BookOpen],
            ].map(([title, sub, Icon]) => {
              const FeatureIcon = Icon as typeof BookOpen
              return (
                <article
                  key={title as string}
                  className="aspect-square bg-stone-50 p-5 hover:bg-[#7D30E0]/5 motion-safe:transition motion-reduce:transition-none lg:p-7"
                >
                  <FeatureIcon className="h-5 w-5 text-[#7D30E0]" aria-hidden="true" />
                  <div className="flex h-[calc(100%-28px)] flex-col justify-end">
                    <h2 className="text-base font-normal tracking-tight">{home(title as string)}</h2>
                    <p className="mt-1 text-sm text-stone-900/50">{home(sub as string)}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ticker ───────────────────────────────────────────── */}
      <section aria-hidden="true" className="overflow-hidden bg-stone-950 py-5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center gap-12 px-6">
              {['ticker.users', 'ticker.countries', 'ticker.prayers', 'ticker.rating', 'ticker.languages', 'ticker.sermons'].map((key) => (
                <span
                  key={`${group}-${key}`}
                  className="text-2xl font-light tracking-tight text-stone-50/70 lg:text-3xl"
                >
                  {home(key)}
                  <span className="mx-6 text-[#7D30E0]">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Core features ──────────────────────────────────────────── */}
      <section id="features" className="border-b border-stone-200 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">{home('features.eyebrow')}</p>
              <h2 className="mt-5 text-4xl font-light tracking-tight leading-tight lg:text-6xl text-balance">
                {home('features.titlePrefix')}{' '}
                <span className="text-[#7D30E0]">{home('features.titleAccent')}</span>
              </h2>
            </div>
            <p className="max-w-[60ch] text-lg leading-relaxed text-stone-900/60 lg:col-span-5 lg:col-start-8 lg:self-end text-pretty">
              {home('features.body')}
            </p>
          </div>

          <div className="mt-16 grid gap-px border border-stone-200 bg-stone-200 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <article
                  key={feature.title}
                  className="bg-stone-50 p-7 hover:bg-stone-100 motion-safe:transition motion-reduce:transition-none"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-stone-100">
                    <Icon className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-xl font-normal tracking-tight">{home(feature.title)}</h3>
                  <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-stone-900/55 text-pretty">
                    {home(feature.desc)}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Devotionals ────────────────────────────────────────────── */}
      <section id="devotionals" className="bg-stone-950 py-24 text-stone-50 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-4 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-50/40">{home('devotionals.eyebrow')}</p>
            <h2 className="mt-5 text-4xl font-light tracking-tight leading-tight lg:text-6xl text-balance">
              {home('devotionals.titlePrefix')}{' '}
              <span className="text-[#7D30E0]/80">{home('devotionals.titleAccent')}</span>
            </h2>
            <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-stone-50/60 text-pretty">
              {home('devotionals.body')}
            </p>
            <div className="mt-10 grid max-w-md gap-4">
              {devotionalTools.map(([text, Icon]) => (
                <div key={text as string} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-stone-800">
                    <Icon className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-stone-50/70">{home(text as string)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="mx-auto max-w-sm rounded-[3rem] border-[9px] border-[#30302f] bg-[#181817] p-7 shadow-2xl shadow-black/40">
              <div className="mx-auto mb-10 h-6 w-28 rounded-full bg-black" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#7D30E0]">
                    February 6, 2025
                  </p>
                <h3 className="mt-4 font-serif text-4xl tracking-tight text-stone-50">{home('mock.devotionalTitle')}</h3>
                <div className="mt-8 grid aspect-[16/9] place-items-center rounded-2xl bg-gradient-to-br from-[#352852] to-[#3f413b]">
                  <Play className="h-10 w-10 fill-stone-50 text-stone-50" aria-hidden="true" />
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-stone-50/60">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 fill-stone-50/60 text-stone-50/60" aria-hidden="true" />
                    {home('mock.readTime')}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Headphones className="h-4 w-4 fill-stone-50/60 text-stone-50/60" aria-hidden="true" />
                    {home('mock.audio')}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-stone-50/60" aria-hidden="true" />
                    EN
                  </span>
                </div>
                <div className="mt-8 rounded-2xl border border-stone-50/15 bg-stone-50/[0.03] p-6">
                  <p className="text-sm uppercase tracking-wide text-stone-50/50">{home('mock.memoryVerse')}</p>
                  <p className="mt-4 text-lg italic leading-relaxed text-stone-50">
                    "For we walk by faith, not by sight."
                  </p>
                  <p className="mt-4 text-base text-[#7D30E0]">2 Corinthians 5:7</p>
                </div>
              </div>
              <div className="h-20" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Prayer ─────────────────────────────────────────────────── */}
      <section id="prayer" className="border-b border-stone-200 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">{home('prayer.eyebrow')}</p>
            <h2 className="mt-5 text-4xl font-light tracking-tight leading-tight lg:text-6xl text-balance">
              {home('prayer.titlePrefix')}{' '}
              <span className="text-[#7D30E0]">{home('prayer.titleAccent')}</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-px border border-stone-200 bg-stone-200 lg:grid-cols-2">
            <article className="bg-stone-100 p-8 lg:p-12">
              <div className="grid h-11 w-11 place-items-center bg-stone-900 text-stone-50">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-3xl font-light tracking-tight">{home('prayer.managementTitle')}</h3>
              <p className="mt-4 max-w-[60ch] text-stone-900/60 text-pretty">
                {home('prayer.managementBody')}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {prayerTools.map(([text, Icon]) => (
                  <div key={text as string} className="flex items-center gap-3 text-sm text-stone-900/65">
                    <Icon className="h-4 w-4 shrink-0 text-[#7D30E0]" aria-hidden="true" />
                    {home(text as string)}
                  </div>
                ))}
              </div>
            </article>

            <article className="bg-[#7D30E0]/8 p-8 lg:p-12">
              <div className="grid h-11 w-11 place-items-center bg-[#7D30E0] text-stone-50">
                <Flame className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-3xl font-light tracking-tight">{home('prayer.streaksTitle')}</h3>
              <p className="mt-4 max-w-[60ch] text-stone-900/60 text-pretty">
                {home('prayer.streaksBody')}
              </p>
              <div className="mt-8 flex items-center gap-6">
                <div className="relative h-24 w-24 shrink-0">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(28,25,23,.10)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="43"
                      fill="none"
                      stroke="#7D30E0"
                      strokeWidth="8"
                      strokeDasharray="270"
                      strokeDashoffset="70"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-lg font-light text-[#7D30E0]">
                    75%
                  </div>
                </div>
                <div>
                  <p className="text-sm text-stone-900/50">{home('prayer.progress')}</p>
                  <p className="mt-1 text-2xl font-light tabular-nums">15&nbsp;/&nbsp;20&nbsp;min</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── NSPPD Live ─────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-24 text-stone-50 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-4 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3 border border-stone-700 px-4 py-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7D30E0] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7D30E0]" />
              </span>
              <span className="text-xs uppercase tracking-wide text-stone-50/50">
                {home('live.eyebrow')}
              </span>
            </div>
            <h2 className="mt-8 text-4xl font-light tracking-tight leading-tight lg:text-6xl text-balance">
              {home('live.titlePrefix')}{' '}
              <span className="text-[#7D30E0]/80">{home('live.titleAccent')}</span>
            </h2>
            <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-stone-50/60 text-pretty">
              {home('live.body')}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                ['7:00 AM', 'live.stats.wat'],
                [home('live.stats.liveValue'), 'live.stats.status'],
                [home('live.stats.replayValue'), 'live.stats.replay'],
                [home('live.stats.timezoneValue'), 'live.stats.timezone'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-3xl font-light tabular-nums text-[#7D30E0]/80">{value}</p>
                  <p className="mt-1 text-sm text-stone-50/40">{home(label)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center lg:col-span-6">
            <a
              href="https://www.youtube.com/@PastorJerryEze/streams"
              target="_blank"
              rel="noopener noreferrer"
              className="group grid w-full aspect-video place-items-center border border-stone-800 bg-stone-900 hover:border-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-50 motion-safe:transition motion-reduce:transition-none"
            >
              <span className="grid h-20 w-20 place-items-center bg-[#7D30E0] group-hover:bg-[#7D30E0]/80 motion-safe:transition motion-reduce:transition-none">
                <Radio className="h-8 w-8 text-stone-50" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Sermons ────────────────────────────────────────────────── */}
      <section id="sermons" className="border-b border-stone-200 py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-4 md:px-8 lg:grid-cols-12">

          {/* Player mockup */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="rounded-[2.5rem] bg-[#181817] p-8 lg:p-10">
              <div className="rounded-[2rem] bg-[#242423] p-6">
                <div className="flex items-center gap-5">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-[#7D30E0]/15">
                    <Headphones className="h-8 w-8 text-[#7D30E0]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-2xl tracking-tight text-stone-50">{home('mock.sermonTitle')}</p>
                    <p className="mt-2 text-lg text-stone-50/40">Pastor Jerry Eze</p>
                  </div>
                  <button
                    className="grid h-16 w-16 place-items-center rounded-full bg-[#7D30E0] text-stone-50"
                    aria-label={home('sermons.pausePreview')}
                  >
                    <Pause className="h-6 w-6 fill-stone-50" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-7 flex h-12 items-center gap-2">
                  {[38,52,68,74,46,82,55,70,28,50,62,30,44,34,66,32,46,64,72,76,68,34,58,32,36,42,78,36,40,48,82,36,34,62,64,61,62,24,58,70,72,64,60].map((h, i) => (
                    <span
                      key={`${h}-${i}`}
                      className="w-2 rounded-full bg-stone-50/20"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-base tabular-nums text-stone-50/35">
                  <span>12:34</span>
                  <span>45:21</span>
                </div>
              </div>
              <div className="mt-8 flex justify-center gap-3 text-sm text-stone-50/55">
                {['0.5x', '1x', '1.5x', '2x'].map((speed) => (
                  <span
                    key={speed}
                    className={`rounded-full px-5 py-2 ${speed === '1x' ? 'bg-[#7D30E0] text-stone-50' : 'bg-stone-50/[0.06]'}`}
                  >
                    {speed}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">{home('sermons.eyebrow')}</p>
            <h2 className="mt-5 text-4xl font-light tracking-tight leading-tight lg:text-6xl text-balance">
              {home('sermons.titlePrefix')}{' '}
              <span className="text-[#7D30E0]">{home('sermons.titleAccent')}</span>
            </h2>
            <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-stone-900/60 text-pretty">
              {home('sermons.body')}
            </p>
            <div className="mt-10 grid gap-4">
              {sermonTools.map(([text, Icon]) => (
                <div key={text as string} className="flex items-center gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center bg-stone-100">
                    <Icon className="h-3.5 w-3.5 text-[#7D30E0]" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-stone-900/65">{home(text as string)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Self-study hub ─────────────────────────────────────────── */}
      <section id="study" className="border-b border-stone-200 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">{home('study.eyebrow')}</p>
            <h2 className="mt-5 text-4xl font-light tracking-tight leading-tight lg:text-6xl text-balance">
              {home('study.titlePrefix')}{' '}
              <span className="text-[#7D30E0]">{home('study.titleAccent')}</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-px border border-stone-200 bg-stone-200 lg:grid-cols-3">
            {[
              [NotebookPen, 'study.notes.title', 'study.notes.desc'],
              [BookMarked, 'study.bookmarks.title', 'study.bookmarks.desc'],
              [Highlighter, 'study.highlights.title', 'study.highlights.desc'],
            ].map(([Icon, title, desc]) => {
              const CardIcon = Icon as typeof NotebookPen
              return (
                <article key={title as string} className="bg-stone-50 p-8 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center bg-stone-100">
                    <CardIcon className="h-5 w-5 text-[#7D30E0]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-7 text-2xl font-normal tracking-tight">{home(title as string)}</h3>
                  <p className="mx-auto mt-4 max-w-[60ch] text-stone-900/55 text-pretty">
                    {home(desc as string)}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── More features ──────────────────────────────────────────── */}
      <section className="bg-stone-100 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">{home('more.eyebrow')}</p>
            <h2 className="mt-5 text-4xl font-light tracking-tight lg:text-5xl text-balance">
              {home('more.title')}
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-px border border-stone-200 bg-stone-200 lg:grid-cols-4">
            {moreFeatures.map(([title, desc, Icon]) => {
              const MoreIcon = Icon as typeof CalendarCheck
              return (
                <article
                  key={title as string}
                  className="bg-stone-100 p-6 text-center hover:bg-[#7D30E0]/5 motion-safe:transition motion-reduce:transition-none"
                >
                  <MoreIcon className="mx-auto h-5 w-5 text-[#7D30E0]" aria-hidden="true" />
                  <h3 className="mt-4 text-sm font-normal">{home(title as string)}</h3>
                  <p className="mt-1 text-xs text-stone-900/50">{home(desc as string)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-20 text-stone-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:px-8 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-5xl font-light tabular-nums text-[#7D30E0]/80 lg:text-6xl">
                {value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-stone-50/40">{home(label)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gift a Plan ────────────────────────────────────────────── */}
      <section id="gift" className="border-b border-stone-200 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">
                {home('gift.eyebrow')}
              </p>
              <h2 className="mt-5 text-4xl font-light tracking-tight leading-tight lg:text-6xl text-balance">
                {home('gift.titlePrefix')}{' '}
                <span className="text-[#7D30E0]">{home('gift.titleAccent')}</span>
              </h2>
              <p className="mt-8 max-w-[55ch] text-lg leading-relaxed text-stone-900/60 text-pretty">
                {home('gift.body')}
              </p>
              <Link
                href="/gifts/start"
                className="mt-10 inline-flex min-h-[48px] items-center gap-3 bg-stone-900 px-8 py-3.5 text-sm text-stone-50 hover:bg-[#7D30E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
              >
                <Gift className="h-4 w-4" aria-hidden="true" />
                {home('gift.cta')}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              <article className="border border-stone-200 bg-white p-7">
                <div className="grid h-10 w-10 place-items-center bg-stone-100">
                  <Mail className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-normal tracking-tight">
                  {home('gift.targeted.title')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-900/55 text-pretty">
                  {home('gift.targeted.desc')}
                </p>
              </article>

              <article className="border border-stone-200 bg-white p-7">
                <div className="grid h-10 w-10 place-items-center bg-stone-100">
                  <Users className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-normal tracking-tight">
                  {home('gift.batch.title')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-900/55 text-pretty">
                  {home('gift.batch.desc')}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ── Download CTA ───────────────────────────────────────────── */}
      <section id="download" className="border-b border-stone-200 bg-white py-24 lg:py-36">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-900/40">{home('download.eyebrow')}</p>
          <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-light leading-none tracking-tight lg:text-7xl text-balance">
            {home('download.titlePrefix')}{' '}
            <span className="text-[#7D30E0]">{home('download.titleAccent')}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-[60ch] text-xl leading-relaxed text-stone-900/55 text-pretty">
            {home('download.body')}
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 px-10 py-4 text-sm text-stone-50 hover:bg-[#7D30E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
            >
              {home('download.appStore')}
            </a>
            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-900 px-10 py-4 text-sm hover:border-[#7D30E0] hover:text-[#7D30E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
            >
              {home('download.googlePlay')}
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-stone-950 py-16 text-stone-50 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center">
                <Image
                  src="/streams-of-joy-logo.svg"
                  alt="Streams of Joy"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-50/40 text-pretty">
                {home('footer.body')}
              </p>
            </div>
            <div className="lg:col-span-2 lg:col-start-7">
              <p className="text-xs uppercase tracking-wide text-stone-50/40">{home('footer.features')}</p>
              <ul className="mt-4 space-y-3 text-sm text-stone-50/50">
                {[['nav.devotionals','#devotionals'],['nav.prayer','#prayer'],['nav.sermons','#sermons'],['footer.allFeatures','#features']].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="hover:text-stone-50 focus-visible:outline-none motion-safe:transition motion-reduce:transition-none"
                    >
                      {home(label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-wide text-stone-50/40">{home('footer.company')}</p>
              <ul className="mt-4 space-y-3 text-sm text-stone-50/50">
                <li>
                  <Link href="/privacy" className="hover:text-stone-50 focus-visible:outline-none motion-safe:transition motion-reduce:transition-none">
                    {home('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-stone-50 focus-visible:outline-none motion-safe:transition motion-reduce:transition-none">
                    {home('footer.terms')}
                  </Link>
                </li>
                <li>
                  <Link href="/user/request-deletion" className="hover:text-stone-50 focus-visible:outline-none motion-safe:transition motion-reduce:transition-none">
                    {home('footer.accountDeletion')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-wide text-stone-50/40">{home('footer.support')}</p>
              <ul className="mt-4 space-y-3 text-sm text-stone-50/50">
                <li>
                  <a
                    href="mailto:support@streamsofjoy.com"
                    className="hover:text-stone-50 focus-visible:outline-none motion-safe:transition motion-reduce:transition-none"
                  >
                    {home('footer.contact')}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@streamsofjoy.com"
                    className="hover:text-stone-50 focus-visible:outline-none motion-safe:transition motion-reduce:transition-none"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-stone-800 pt-8 text-xs text-stone-50/30">
            <p>© {new Date().getFullYear()} Consonant Technologies Ltd.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
