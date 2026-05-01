import { ClaimGiftClient } from '../ClaimGiftClient'

export default function TargetedGiftClaimPage({
  params,
}: {
  params: { claimToken: string }
}) {
  return <ClaimGiftClient mode="targeted" claimToken={params.claimToken} />
}
