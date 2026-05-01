import type { Metadata } from 'next'
import { createNoIndexMetadata } from '@/lib/seo'
import { GiftStartClient } from './GiftStartClient'

export const metadata: Metadata = createNoIndexMetadata(
  'Gift A Streams of Joy Plan',
  'Choose a Streams of Joy gift plan, add recipients or batch seats, and complete secure checkout.',
  '/gifts/start',
)

export default function GiftStartPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  return <GiftStartClient token={searchParams.token} />
}
