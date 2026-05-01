import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Service',
  description:
    'Read the Streams of Joy terms of service for app accounts, prayer content, sermons, giving, subscriptions, and website use.',
  path: '/terms',
  keywords: ['Streams of Joy terms', 'NSPPD app terms', 'Consonant Technologies terms'],
})

export default function TermsPage() {
  const common = useTranslations('Common')
  const legal = useTranslations('Legal')
  const t = useTranslations('Legal.terms')

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-xl border-b border-charcoal/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="inline-flex min-h-[48px] items-center" aria-label={common('streamsHome')}>
              <Image
                src="/streams-of-joy-logo.svg"
                alt="Streams of Joy"
                width={48}
                height={48}
                className="h-12 w-12"
              />
            </Link>
            <Link href="/" className="text-sm text-charcoal/60 hover:text-ember transition-colors flex items-center gap-2">
              <i className="fa-solid fa-arrow-left" /> {common('back')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-ember mb-4">{legal('eyebrow')}</p>
          <h1 className="font-display text-5xl lg:text-6xl tracking-tight mb-4">{t('title')}</h1>
          <p className="text-charcoal/60">{legal('lastUpdated')}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-8 text-charcoal/80 leading-relaxed">

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('agreementTitle')}</h2>
              <p>{t('agreementBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('servicesTitle')}</h2>
              <p>{t('servicesBody')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Live streaming of prayer sessions and spiritual content</li>
                <li>Prayer tracking and streak features</li>
                <li>In-app Bible reading and note-taking</li>
                <li>Community features for testimonies and prayer requests</li>
                <li>Audio content for offline listening</li>
                <li>Donation and partnership opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('accountTitle')}</h2>
              <p>{t('accountBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('useTitle')}</h2>
              <p>{t('useBody')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Post defamatory, obscene, or offensive content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Distribute spam, malware, or viruses</li>
                <li>Attempt unauthorized access to the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('contentTitle')}</h2>
              <p>{t('contentBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('donationsTitle')}</h2>
              <p>{t('donationsBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('ipTitle')}</h2>
              <p>{t('ipBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('disclaimersTitle')}</h2>
              <p>{t('disclaimersBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('liabilityTitle')}</h2>
              <p>{t('liabilityBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('terminationTitle')}</h2>
              <p>{t('terminationBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('contactTitle')}</h2>
              <div className="p-6 bg-charcoal/5 rounded-2xl mt-4">
                <p className="font-semibold text-charcoal">Consonant Technologies Ltd.</p>
                <p className="mt-2">Email: <a href="mailto:legal@streamsofjoy.com" className="text-ember">legal@streamsofjoy.com</a></p>
                <p>Support: <a href="mailto:support@streamsofjoy.com" className="text-ember">support@streamsofjoy.com</a></p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-charcoal/10 flex justify-between text-sm text-charcoal/60">
          <Link href="/privacy" className="hover:text-ember transition-colors">{t('readPrivacy')}</Link>
          <Link href="/" className="hover:text-ember transition-colors">{common('returnHome')}</Link>
        </div>
      </main>

      <footer className="border-t border-charcoal/10 py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center text-sm text-charcoal/40">
          &copy; {new Date().getFullYear()} Consonant Technologies Ltd.
        </div>
      </footer>
    </div>
  )
}
