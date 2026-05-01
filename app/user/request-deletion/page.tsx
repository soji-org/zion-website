import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'

import { RequestDeletionClient } from './RequestDeletionClient'

export const metadata: Metadata = createPageMetadata({
  title: 'NSPPD Account Deletion Request',
  description:
    'Official account and personal data deletion request page for the NSPPD mobile app, operated by Consonant Technologies Ltd.',
  path: '/user/request-deletion',
  keywords: ['NSPPD account deletion', 'Streams of Joy account deletion', 'delete NSPPD account'],
})

export default function RequestDeletionPage() {
  return <RequestDeletionClient />
}
