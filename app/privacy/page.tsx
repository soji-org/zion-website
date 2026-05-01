import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'Read the Streams of Joy privacy policy for the mobile app and website, including how account, contact, payment, prayer, and usage data are handled.',
  path: '/privacy',
  keywords: ['Streams of Joy privacy policy', 'NSPPD app privacy', 'Consonant Technologies privacy'],
})

export default function PrivacyPage() {
  const common = useTranslations('Common')
  const legal = useTranslations('Legal')
  const t = useTranslations('Legal.privacy')

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
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('introTitle')}</h2>
              <p>{t('introBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('collectTitle')}</h2>
              <h3 className="font-semibold text-charcoal text-lg mt-6 mb-3">{t('personalTitle')}</h3>
              <p>{t('personalBody')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name and contact data (email, phone number)</li>
                <li>Account credentials</li>
                <li>Payment data (processed securely through payment processors)</li>
                <li>Prayer requests and testimonies you choose to share</li>
              </ul>

              <h3 className="font-semibold text-charcoal text-lg mt-6 mb-3">{t('autoTitle')}</h3>
              <p>{t('autoBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('useTitle')}</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate account creation and authentication</li>
                <li>Send prayer reminders and notifications (with consent)</li>
                <li>Process donations and contributions</li>
                <li>Provide customer support</li>
                <li>Analyze usage to improve our Services</li>
                <li>Protect our Services and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('sharingTitle')}</h2>
              <p>{t('sharingBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('rightsTitle')}</h2>
              <p>{t('rightsBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('securityTitle')}</h2>
              <p>{t('securityBody')}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-4">{t('contactTitle')}</h2>
              <div className="p-6 bg-charcoal/5 rounded-2xl mt-4">
                <p className="font-semibold text-charcoal">Consonant Technologies Ltd.</p>
                <p className="mt-2">Email: <a href="mailto:privacy@streamsofjoy.com" className="text-ember">privacy@streamsofjoy.com</a></p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-charcoal/10 flex justify-between text-sm text-charcoal/60">
          <Link href="/terms" className="hover:text-ember transition-colors">{t('readTerms')}</Link>
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
