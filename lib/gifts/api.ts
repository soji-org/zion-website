'use client'

export type GiftProvider = 'STRIPE' | 'PAYSTACK'
export type GiftPurchaseType = 'TARGETED' | 'BATCH'
export type GiftRedemptionScope = 'LOCAL' | 'GLOBAL'

export type RedemptionScopeOption = {
  scope: GiftRedemptionScope
  label: string
  allowedCountries: string[]
}

export type BatchPricingRules = {
  minimumSeats: number
  discountThreshold: number
  discountPercentage: number
  eligibilityText: string
  minimumSeatsText: string
}

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
  availableRedemptionScopes?: RedemptionScopeOption[]
  batchPricingRules?: BatchPricingRules
}

export type GiftQuote = {
  purchaserCountry: string
  provider: GiftProvider
  currency: string
  quantity: number
  unitAmount: number
  subtotalAmount: number
  discountPercentage: number
  discountAmount: number
  totalAmount: number
  discountEligible: boolean
  nextDiscountSeatCount?: number | null
  redemptionScope?: GiftRedemptionScope
  allowedCountries?: string[]
  scopeDescription?: string | null
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
  redemptionScope?: GiftRedemptionScope | null
  allowedCountries?: string[]
  scopeDescription?: string | null
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
  redemptionScope?: GiftRedemptionScope | null
  allowedCountries?: string[]
  scopeDescription?: string | null
}

export type ClaimResult = {
  itemId?: string
  orderId?: string
  status: 'CLAIMED' | 'REDEEMED'
  purchaserName?: string | null
  planName?: string | null
  cycle?: string | null
  note?: string | null
  claimedEmail?: string | null
  code: string | null
  codeExpiresAt?: string | null
  redeemedAt?: string | null
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
    throw new Error(payload.message || payload.error || 'Request failed')
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

export function loadGiftPlans(handoffSessionId: string, redemptionScope?: GiftRedemptionScope) {
  const params = new URLSearchParams({ handoffSessionId })
  if (redemptionScope) params.set('redemptionScope', redemptionScope)
  return giftRequest<GiftPlansResponse>(`/subscription/gifts/plans?${params}`)
}

export function quoteGift(payload: {
  handoffSessionId: string
  planId: string
  cycleId: string
  purchaseType: GiftPurchaseType
  redemptionScope: GiftRedemptionScope
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
  redemptionScope: GiftRedemptionScope
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
