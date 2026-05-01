import type { Metadata } from 'next'
import { createNoIndexMetadata } from '@/lib/seo'
import { ClaimGiftClient } from '../../claim/ClaimGiftClient'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? ''

type BatchPreviewMetadata = {
  purchaserName?: string | null
  planName?: string | null
  plan?: { name?: string | null; cycle?: string | null }
  availableSeats?: number
  totalSeats?: number
  exhausted?: boolean
}

async function fetchBatchPreview(orderId: string): Promise<BatchPreviewMetadata | null> {
  if (!API_BASE) return null

  try {
    const response = await fetch(`${API_BASE}/subscription/gifts/batch/${encodeURIComponent(orderId)}`, {
      next: { revalidate: 60 },
    })
    if (!response.ok) return null
    const payload = (await response.json()) as { data?: BatchPreviewMetadata }
    return payload.data ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { orderId: string }
}): Promise<Metadata> {
  const preview = await fetchBatchPreview(params.orderId)
  const planName = preview?.planName || preview?.plan?.name || 'Streams of Joy'
  const title = preview?.purchaserName
    ? `${preview.purchaserName} shared a ${planName} gift`
    : `Claim A ${planName} Batch Gift`
  const seatSummary =
    typeof preview?.availableSeats === 'number' && typeof preview?.totalSeats === 'number'
      ? `${preview.availableSeats} of ${preview.totalSeats} gift seats are available.`
      : 'Claim a shared Streams of Joy gift seat.'

  return createNoIndexMetadata(
    title,
    `${seatSummary} Sign in to claim your redemption code and activate it in the mobile app.`,
    `/gifts/batch/${params.orderId}`,
  )
}

export default function BatchGiftClaimPage({
  params,
}: {
  params: { orderId: string }
}) {
  return <ClaimGiftClient mode="batch" orderId={params.orderId} />
}
