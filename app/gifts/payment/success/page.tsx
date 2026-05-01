import { PaymentSuccessClient } from './PaymentSuccessClient'

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
