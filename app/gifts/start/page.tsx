import { GiftStartClient } from './GiftStartClient'

export default function GiftStartPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  return <GiftStartClient token={searchParams.token} />
}
