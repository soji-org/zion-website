import type { Metadata } from 'next'
import { createNoIndexMetadata } from '@/lib/seo'
import { PaymentSuccessClient } from './PaymentSuccessClient'

export const metadata: Metadata = createNoIndexMetadata(
  'Gift Payment Confirmation',
  'Confirm your Streams of Joy gift payment and view the next steps for targeted or batch gift delivery.',
  '/gifts/payment/success',
)

export default function GiftPaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; reference?: string; provider?: string }
}) {
  return (
    <PaymentSuccessClient
      sessionId={searchParams.session_id}
      reference={searchParams.reference}
      provider={searchParams.provider}
    />
  )
}
