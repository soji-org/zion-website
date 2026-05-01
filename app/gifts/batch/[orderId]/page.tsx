import { ClaimGiftClient } from '../../claim/ClaimGiftClient'

export default function BatchGiftClaimPage({
  params,
}: {
  params: { orderId: string }
}) {
  return <ClaimGiftClient mode="batch" orderId={params.orderId} />
}
