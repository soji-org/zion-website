'use client'

export type GiftProvider = 'STRIPE' | 'PAYSTACK'
export type GiftPurchaseType = 'TARGETED' | 'BATCH'

export type HandoffExchange = {
  handoffSessionId: string
  purchaserEmail: string
  purchaserName?: string | null
  purchaserCountry: string
  expiresAt: string
}

export type AnonymousGiftOtpRequest = {
  handoffSessionId: string
  purchaserEmail: string
  purchaserCountry: string
  expiresAt: string
}

export type AnonymousGiftOtpVerification = {
  handoffSessionId: string
  expiresAt: string
  url: string
  token: string
}

export type GiftPlan = {
  planId: string
  cycleId: string
  providerPlanId: string
  name: string
  description?: string | null
  features?: string[]
  cycle: string
  cycleDescription?: string | null
  discountPercentage?: number
  provider: GiftProvider
  currency: string
  unitAmount: number
}

export type GiftPlansResponse = {
  purchaserCountry: string
  provider: GiftProvider
  subscriptionTypeId: string
  subscriptionTypeName: string
  plans: GiftPlan[]
}

export type GiftQuote = {
  purchaserCountry: string
  provider: GiftProvider
  currency: string
  quantity: number
  unitAmount: number
  totalAmount: number
}

export type GiftOrder = {
  id: string
  status: string
  purchaseType: GiftPurchaseType
  checkoutUrl?: string | null
  paymentReference?: string | null
  batchUrl?: string | null
}

export type CheckoutResponse = {
  order: GiftOrder
  checkout: {
    success: boolean
    data?: {
      reference?: string
      redirectUrl?: string
    }
  }
}

export type ClaimPreview = {
  gifterName?: string | null
  purchaserName?: string | null
  planName?: string | null
  plan?: { name?: string | null; cycle?: string | null }
  cycle?: string | null
  note?: string | null
  expiresAt?: string | null
  status?: string | null
}

export type BatchPreview = {
  orderId?: string
  purchaserName?: string | null
  planName?: string | null
  plan?: { name?: string | null; cycle?: string | null }
  cycle?: string | null
  totalSeats: number
  availableSeats: number
  exhausted: boolean
  note?: string | null
}

export type ClaimResult = {
  code?: string
  giftCode?: string
  giftItem?: unknown
  item?: unknown
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? ''

type ApiEnvelope<T> = { data: T; error?: string; message?: string }

async function giftRequest<T>(path: string, init?: RequestInit & { token?: string }) {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')

  if (init?.token) {
    headers.set('Authorization', `Bearer ${init.token}`)
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  })

  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T> | { error?: string; message?: string }

  if (!response.ok) {
    throw new Error(payload.error || payload.message || 'Request failed')
  }

  if ('data' in payload) {
    return payload.data
  }

  return payload as T
}

export function exchangeHandoff(token: string) {
  return giftRequest<HandoffExchange>('/subscription/gifts/handoff/exchange', {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
}

export function requestAnonymousGiftOtp(payload: { name: string; email: string; phone: string }) {
  return giftRequest<AnonymousGiftOtpRequest>('/subscription/gifts/anonymous/request-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function verifyAnonymousGiftOtp(payload: { handoffSessionId: string; otp: string }) {
  return giftRequest<AnonymousGiftOtpVerification>('/subscription/gifts/anonymous/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loadGiftPlans(handoffSessionId: string) {
  return giftRequest<GiftPlansResponse>(`/subscription/gifts/plans?handoffSessionId=${encodeURIComponent(handoffSessionId)}`)
}

export function quoteGift(payload: {
  handoffSessionId: string
  planId: string
  cycleId: string
  purchaseType: GiftPurchaseType
  recipientEmails?: string[]
  quantity?: number
}) {
  return giftRequest<GiftQuote>('/subscription/gifts/quote', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createGiftCheckout(payload: {
  handoffSessionId: string
  planId: string
  cycleId: string
  purchaseType: GiftPurchaseType
  recipientEmails?: string[]
  quantity?: number
  codePrefix?: string
  note?: string
  successUrl: string
  cancelUrl: string
}) {
  return giftRequest<CheckoutResponse>('/subscription/gifts/checkout', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function verifyGiftPayment(payload: { provider: GiftProvider; reference: string }) {
  return giftRequest<{ order: GiftOrder; batchUrl?: string | null }>('/subscription/gifts/payment/status', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function previewClaim(claimToken: string) {
  return giftRequest<ClaimPreview>(`/subscription/gifts/claim/${encodeURIComponent(claimToken)}`)
}

export function previewBatch(orderId: string) {
  return giftRequest<BatchPreview>(`/subscription/gifts/batch/${encodeURIComponent(orderId)}`)
}

export function claimGift(payload: { claimToken?: string; batchOrderId?: string }, firebaseIdToken: string) {
  return giftRequest<ClaimResult>('/subscription/gifts/claim', {
    method: 'POST',
    token: firebaseIdToken,
    body: JSON.stringify(payload),
  })
}

export function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)
}

export function parseEmailList(value: string) {
  return value
    .split(/[\n,;]/)
    .map((email) => email.trim())
    .filter(Boolean)
}
