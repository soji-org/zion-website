import Link from 'next/link'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { createNoIndexMetadata } from '@/lib/seo'

export const metadata: Metadata = createNoIndexMetadata(
  'Gift Payment Cancelled',
  'Your Streams of Joy gift payment was cancelled. Return to the app or start a new gift checkout session.',
  '/gifts/payment/cancelled',
)

export default function GiftPaymentCancelledPage() {
  const common = useTranslations('Common')
  const t = useTranslations('Payment')

  return (
    <main className="grid min-h-[100svh] place-items-center bg-cream px-5 py-12 text-charcoal">
      <section className="w-full max-w-xl rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-sm md:p-10">
        <XCircle className="h-10 w-10 text-destructive" />
        <h1 className="mt-6 font-display text-4xl">{t('cancelledTitle')}</h1>
        <p className="mt-4 leading-7 text-charcoal/65">
          {t('cancelledBody')}
        </p>
        <Button asChild className="mt-8 rounded-full px-6">
          <Link href="/">{common('backToStreams')}</Link>
        </Button>
      </section>
    </main>
  )
}
