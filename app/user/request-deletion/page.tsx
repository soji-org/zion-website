import type { Metadata } from 'next'

import { RequestDeletionClient } from './RequestDeletionClient'

export const metadata: Metadata = {
  title: 'NSPPD Deletion | Consonant Technologies Ltd.',
  description: 'Official account and data deletion request page for the NSPPD mobile app by Consonant Technologies Ltd.',
}

export default function RequestDeletionPage() {
  return <RequestDeletionClient />
}
