import type { Metadata } from 'next'
import { createNoIndexMetadata } from '@/lib/seo'
import { ClaimGiftClient } from '../ClaimGiftClient'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? ''

type ClaimPreviewMetadata = {
  gifterName?: string | null
  purchaserName?: string | null
  planName?: string | null
  plan?: { name?: string | null; cycle?: string | null }
  cycle?: string | null
}

async function fetchClaimPreview(claimToken: string): Promise<ClaimPreviewMetadata | null> {
  if (!API_BASE) return null

  try {
    const response = await fetch(`${API_BASE}/subscription/gifts/claim/${encodeURIComponent(claimToken)}`, {
      next: { revalidate: 60 },
    })
    if (!response.ok) return null
    const payload = (await response.json()) as { data?: ClaimPreviewMetadata }
    return payload.data ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { claimToken: string }
}): Promise<Metadata> {
  const preview = await fetchClaimPreview(params.claimToken)
  const gifterName = preview?.gifterName || preview?.purchaserName
  const planName = preview?.planName || preview?.plan?.name || 'Streams of Joy'
  const title = gifterName ? `${gifterName} sent you a ${planName} gift` : `Claim Your ${planName} Gift`

  return createNoIndexMetadata(
    title,
    'Sign in to claim your Streams of Joy gift, get your redemption code, and activate it in the mobile app.',
    `/gifts/claim/${params.claimToken}`,
  )
}

export default function TargetedGiftClaimPage({
  params,
}: {
  params: { claimToken: string }
}) {
  return <ClaimGiftClient mode="targeted" claimToken={params.claimToken} />
}
