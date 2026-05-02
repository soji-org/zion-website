'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight, Check, Gift, Globe2, Info, Loader2, Mail, MapPin, Phone, ShieldCheck, User, Users } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  BatchPricingRules,
  GiftPlan,
  GiftPurchaseType,
  GiftQuote,
  GiftRedemptionScope,
  HandoffExchange,
  AnonymousGiftOtpRequest,
  RedemptionScopeOption,
  createGiftCheckout,
  exchangeHandoff,
  formatMoney,
  loadGiftPlans,
  parseEmailList,
  quoteGift,
  requestAnonymousGiftOtp,
  verifyAnonymousGiftOtp,
} from '@/lib/gifts/api'

type LoadState = 'loading' | 'anonymous' | 'ready' | 'error'
type Step = 1 | 2 | 3
type AnonymousStep = 'details' | 'otp'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_E164_RE = /^\+[1-9]\d{6,14}$/

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, '')
  return PHONE_E164_RE.test(digits)
}

const DEFAULT_BATCH_RULES: BatchPricingRules = {
  minimumSeats: 5,
  discountThreshold: 25,
  discountPercentage: 10,
  eligibilityText: '10% batch discount applies from 25 seats.',
  minimumSeatsText: 'Batch gifts require at least 5 seats.',
}

const STEPS: [Step, string][] = [
  [1, 'steps.plan'],
  [2, 'steps.details'],
  [3, 'steps.review'],
]

function persistHandoffTokenInUrl(token: string, url?: string) {
  const nextUrl = new URL(url || window.location.href, window.location.origin)
  const currentUrl = new URL(window.location.href)

  currentUrl.pathname = nextUrl.pathname || '/gifts/start'
  currentUrl.search = nextUrl.search
  currentUrl.searchParams.set('token', token)
  currentUrl.hash = nextUrl.hash

  window.history.replaceState(null, '', currentUrl.toString())
}

export function GiftStartClient({ token }: { token?: string }) {
  const common = useTranslations('Common')
  const t = useTranslations('GiftStart')
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [step, setStep] = useState<Step>(1)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [stepError, setStepError] = useState<string | null>(null)
  const [anonymousError, setAnonymousError] = useState<string | null>(null)
  const [anonymousStep, setAnonymousStep] = useState<AnonymousStep>('details')
  const [anonymousLoading, setAnonymousLoading] = useState(false)
  const [anonymousDetails, setAnonymousDetails] = useState({ name: '', email: '', phone: '' })
  const [anonymousOtp, setAnonymousOtp] = useState('')
  const [anonymousOtpRequest, setAnonymousOtpRequest] = useState<AnonymousGiftOtpRequest | null>(null)
  const [detailsTouched, setDetailsTouched] = useState(false)
  const [step2Touched, setStep2Touched] = useState(false)
  const [handoff, setHandoff] = useState<HandoffExchange | null>(null)
  const [plans, setPlans] = useState<GiftPlan[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [purchaseType, setPurchaseType] = useState<GiftPurchaseType>('TARGETED')
  const [redemptionScope, setRedemptionScope] = useState<GiftRedemptionScope>('LOCAL')
  const [availableRedemptionScopes, setAvailableRedemptionScopes] = useState<RedemptionScopeOption[]>([])
  const [batchPricingRules, setBatchPricingRules] = useState<BatchPricingRules>(DEFAULT_BATCH_RULES)
  const [recipientEmails, setRecipientEmails] = useState('')
  const [quantity, setQuantity] = useState(DEFAULT_BATCH_RULES.minimumSeats)
  const [codePrefix, setCodePrefix] = useState('')
  const [note, setNote] = useState('')
  const [quote, setQuote] = useState<GiftQuote | null>(null)
  const [quoting, setQuoting] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)
  const [plansLoading, setPlansLoading] = useState(false)
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('giftPendingCheckoutUrl') : null,
  )

  const applyPlanResponse = useCallback((planResponse: Awaited<ReturnType<typeof loadGiftPlans>>, keepPlanId?: string) => {
    setPlans(planResponse.plans)
    const match = keepPlanId ? planResponse.plans.find((p) => p.planId === keepPlanId) : null
    setSelectedPlanId(match?.planId ?? planResponse.plans[0]?.planId ?? '')
    if (planResponse.availableRedemptionScopes?.length) {
      setAvailableRedemptionScopes(planResponse.availableRedemptionScopes)
    }
    if (planResponse.batchPricingRules) {
      setBatchPricingRules(planResponse.batchPricingRules)
    }
  }, [])

  const startFromToken = useCallback(async (handoffToken: string, isMounted: () => boolean = () => true) => {
    setLoadState('loading')
    setLoadError(null)
    try {
      const exchanged = await exchangeHandoff(handoffToken)
      const initialScope: GiftRedemptionScope = 'LOCAL'
      const planResponse = await loadGiftPlans(exchanged.handoffSessionId, initialScope)
      if (!isMounted()) return
      setHandoff(exchanged)
      setRedemptionScope(planResponse.availableRedemptionScopes?.[0]?.scope ?? initialScope)
      applyPlanResponse(planResponse)
      setLoadState('ready')
    } catch (err: any) {
      if (!isMounted()) return
      setLoadError(err?.message || t('errors.start'))
      setLoadState('error')
    }
  }, [applyPlanResponse])

  useEffect(() => {
    let mounted = true
    if (!token) {
      setLoadState('anonymous')
      return () => { mounted = false }
    }
    startFromToken(token, () => mounted)
    return () => { mounted = false }
  }, [startFromToken, token])

  const selectedPlan = useMemo(
    () => plans.find((p) => p.planId === selectedPlanId) ?? plans[0],
    [plans, selectedPlanId],
  )

  const anonymousDetailsValid =
    anonymousDetails.name.trim().length > 1 &&
    isValidEmail(anonymousDetails.email) &&
    isValidPhone(anonymousDetails.phone)

  const nameError = detailsTouched && anonymousDetails.name.trim().length <= 1 ? t('validation.nameRequired') : null
  const emailError = detailsTouched && anonymousDetails.email.trim() && !isValidEmail(anonymousDetails.email) ? t('validation.validEmail') : null
  const phoneError = detailsTouched && anonymousDetails.phone.trim() && !isValidPhone(anonymousDetails.phone) ? t('validation.validPhone') : null

  const parsedRecipients = parseEmailList(recipientEmails)
  const invalidRecipients = parsedRecipients.filter((e) => !isValidEmail(e))
  const recipientCount = parsedRecipients.length
  const recipientsError = step2Touched && purchaseType === 'TARGETED'
    ? recipientCount === 0
      ? t('validation.recipientsRequired')
      : invalidRecipients.length > 0
        ? t('validation.invalidRecipients', { emails: invalidRecipients.join(', ') })
        : null
    : null
  const step2Valid = purchaseType === 'TARGETED'
    ? recipientCount > 0 && invalidRecipients.length === 0
    : quantity >= batchPricingRules.minimumSeats

  async function handleAnonymousOtpRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setDetailsTouched(true)
    if (!anonymousDetailsValid) return
    setAnonymousError(null)
    setAnonymousLoading(true)
    try {
      const response = await requestAnonymousGiftOtp({
        name: anonymousDetails.name.trim(),
        email: anonymousDetails.email.trim(),
        phone: anonymousDetails.phone.trim(),
      })
      setAnonymousOtpRequest(response)
      setAnonymousStep('otp')
    } catch (err: any) {
      setAnonymousError(err?.message || t('errors.sendCode'))
    } finally {
      setAnonymousLoading(false)
    }
  }

  async function handleAnonymousOtpVerification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!anonymousOtpRequest || !anonymousOtp.trim()) return
    setAnonymousError(null)
    setAnonymousLoading(true)
    try {
      const response = await verifyAnonymousGiftOtp({
        handoffSessionId: anonymousOtpRequest.handoffSessionId,
        otp: anonymousOtp.trim(),
      })
      persistHandoffTokenInUrl(response.token, response.url)
      await startFromToken(response.token)
    } catch (err: any) {
      setAnonymousLoading(false)
      setLoadState('anonymous')
      setAnonymousError(err?.message || t('errors.verifyCode'))
    }
  }

  async function advanceToReview() {
    if (!handoff || !selectedPlan) return
    setStep2Touched(true)
    if (!step2Valid) return
    setStepError(null)
    setQuoting(true)
    try {
      const base = {
        handoffSessionId: handoff.handoffSessionId,
        planId: selectedPlan.planId,
        cycleId: selectedPlan.cycleId,
        purchaseType,
        redemptionScope,
      }
      const payload =
        purchaseType === 'TARGETED'
          ? { ...base, recipientEmails: parseEmailList(recipientEmails) }
          : { ...base, quantity }
      const nextQuote = await quoteGift(payload)
      setQuote(nextQuote)
      setStep(3)
    } catch (err: any) {
      setStepError(err?.message || t('errors.calculate'))
    } finally {
      setQuoting(false)
    }
  }

  async function handleCheckout() {
    if (!handoff || !selectedPlan) return
    setStepError(null)
    setCheckingOut(true)
    try {
      const origin = window.location.origin
      const base = {
        handoffSessionId: handoff.handoffSessionId,
        planId: selectedPlan.planId,
        cycleId: selectedPlan.cycleId,
        purchaseType,
        redemptionScope,
        note,
        successUrl: `${origin}/gifts/payment/success`,
        cancelUrl: `${origin}/gifts/payment/cancel`,
      }
      const payload =
        purchaseType === 'TARGETED'
          ? { ...base, recipientEmails: parseEmailList(recipientEmails) }
          : { ...base, quantity, codePrefix }
      const checkout = await createGiftCheckout(payload)
      const redirectUrl = checkout.checkout.data?.redirectUrl || checkout.order.checkoutUrl
      if (!redirectUrl) throw new Error(t('errors.noRedirect'))
      localStorage.setItem('giftPendingCheckoutUrl', redirectUrl)
      setPendingCheckoutUrl(redirectUrl)
      window.location.href = redirectUrl
    } catch (err: any) {
      setStepError(err?.message || t('errors.checkout'))
      setCheckingOut(false)
    }
  }

  // ── Full-page loading / error ─────────────────────────────────────

  if (loadState === 'loading') {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-stone-50">
        <div className="flex flex-col items-center gap-3 text-stone-900/50">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm">{t('loading')}</p>
        </div>
      </main>
    )
  }

  if (loadState === 'anonymous') {
    return (
      <main className="min-h-[100svh] bg-stone-50 text-stone-900">
        <header className="border-b border-stone-200 bg-stone-50">
          <div className="mx-auto max-w-2xl px-4 py-4 md:px-8">
            <Link href="/" className="inline-flex min-h-[44px] items-center" aria-label={common('streamsHome')}>
              <Image
                src="/streams-of-joy-logo.svg"
                alt="Streams of Joy"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-4 py-10 md:px-8 md:py-16">
          <div className="mb-8 border-b border-stone-200 pb-5">
            <p className="text-xs uppercase tracking-wide text-stone-900/35">{t('anonymous.eyebrow')}</p>
            <h1 className="mt-3 text-3xl font-light tracking-tight md:text-4xl">
              {t('anonymous.title')}
            </h1>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-stone-900/55">
              {t('anonymous.body')}
            </p>
          </div>

          {anonymousStep === 'details' ? (
            <form onSubmit={handleAnonymousOtpRequest} className="border border-stone-200 bg-white p-6 md:p-8">
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="gifter-name" className="text-sm text-stone-900/65">
                    {t('anonymous.name')}
                  </Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-900/30" />
                    <Input
                      id="gifter-name"
                      autoComplete="name"
                      value={anonymousDetails.name}
                      onChange={(event) => {
                        setAnonymousDetails((current) => ({ ...current, name: event.target.value }))
                        setAnonymousError(null)
                      }}
                      className="h-11 rounded-none pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gifter-email" className="text-sm text-stone-900/65">
                    {t('anonymous.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-900/30" />
                    <Input
                      id="gifter-email"
                      type="email"
                      autoComplete="email"
                      value={anonymousDetails.email}
                      onChange={(event) => {
                        setAnonymousDetails((current) => ({ ...current, email: event.target.value }))
                        setAnonymousError(null)
                      }}
                      className="h-11 rounded-none pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gifter-phone" className="text-sm text-stone-900/65">
                    {t('anonymous.phone')}
                  </Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-900/30" />
                    <Input
                      id="gifter-phone"
                      type="tel"
                      autoComplete="tel"
                      value={anonymousDetails.phone}
                      onChange={(event) => {
                        setAnonymousDetails((current) => ({ ...current, phone: event.target.value }))
                        setAnonymousError(null)
                      }}
                      className="h-11 rounded-none pl-9"
                      placeholder="+447700900123"
                      required
                    />
                  </div>
                </div>
              </div>

              {anonymousError && (
                <Alert variant="destructive" className="mt-5 rounded-none">
                  <AlertTitle>{t('anonymous.verificationFailed')}</AlertTitle>
                  <AlertDescription>{anonymousError}</AlertDescription>
                </Alert>
              )}

              <div className="mt-7 flex justify-end">
                <button
                  type="submit"
                  disabled={anonymousLoading || !anonymousDetailsValid}
                  className="inline-flex items-center gap-2 bg-stone-900 px-6 py-3 text-sm text-stone-50 hover:bg-[#7D30E0] disabled:opacity-40 motion-safe:transition motion-reduce:transition-none"
                >
                  {anonymousLoading
                    ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t('anonymous.sending')}</>
                    : <><ShieldCheck className="h-4 w-4" aria-hidden="true" />{t('anonymous.send')}</>
                  }
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAnonymousOtpVerification} className="border border-stone-200 bg-white p-6 md:p-8">
              <div className="grid gap-2">
                <Label htmlFor="gift-otp" className="text-sm text-stone-900/65">
                  {t('anonymous.otp')}
                </Label>
                <p className="text-sm leading-relaxed text-stone-900/45">
                  {t('anonymous.sentTo', { email: anonymousOtpRequest?.purchaserEmail || anonymousDetails.email })}
                </p>
                <Input
                  id="gift-otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={anonymousOtp}
                  onChange={(event) => {
                    setAnonymousOtp(event.target.value)
                    setAnonymousError(null)
                  }}
                  className="mt-2 h-12 rounded-none text-lg tracking-[0.3em]"
                  maxLength={8}
                  required
                />
              </div>

              {anonymousError && (
                <Alert variant="destructive" className="mt-5 rounded-none">
                  <AlertTitle>{t('anonymous.codeNotAccepted')}</AlertTitle>
                  <AlertDescription>{anonymousError}</AlertDescription>
                </Alert>
              )}

              <div className="mt-7 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setAnonymousStep('details')
                    setAnonymousError(null)
                    setAnonymousOtp('')
                  }}
                  className="inline-flex items-center gap-2 border border-stone-200 px-5 py-3 text-sm hover:border-stone-400 motion-safe:transition motion-reduce:transition-none"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {common('back')}
                </button>
                <button
                  type="submit"
                  disabled={anonymousLoading || !anonymousOtp.trim()}
                  className="inline-flex items-center gap-2 bg-stone-900 px-6 py-3 text-sm text-stone-50 hover:bg-[#7D30E0] disabled:opacity-40 motion-safe:transition motion-reduce:transition-none"
                >
                  {anonymousLoading
                    ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t('anonymous.verifying')}</>
                    : <><ArrowRight className="h-4 w-4" aria-hidden="true" />{t('continue')}</>
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    )
  }

  if (loadState === 'error') {
    const isSessionUsed = loadError?.toLowerCase().includes('already been used')
    return (
      <main className="grid min-h-[100svh] place-items-center bg-stone-50 px-4">
        <div className="w-full max-w-md border border-stone-200 p-8">
          <Gift className="h-7 w-7 text-[#7D30E0]/60" />
          <h1 className="mt-6 text-2xl font-light text-stone-900">
            {isSessionUsed ? 'Checkout already started' : t('unavailable')}
          </h1>
          <p className="mt-3 leading-relaxed text-stone-900/60">
            {isSessionUsed
              ? 'Your payment session is already in progress. Return to complete it, or start a new gift order.'
              : loadError}
          </p>
          {isSessionUsed ? (
            <div className="mt-8 flex flex-col gap-3">
              {pendingCheckoutUrl && (
                <a
                  href={pendingCheckoutUrl}
                  className="inline-flex min-h-[44px] items-center justify-center bg-[#7D30E0] px-6 text-sm text-stone-50 hover:bg-[#7D30E0]/80 motion-safe:transition"
                >
                  Return to payment
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('giftPendingCheckoutUrl')
                  setPendingCheckoutUrl(null)
                  const url = new URL(window.location.href)
                  url.searchParams.delete('token')
                  window.location.replace(url.toString())
                }}
                className="inline-flex min-h-[44px] items-center justify-center border border-stone-200 px-6 text-sm hover:border-stone-400 motion-safe:transition"
              >
                Start over
              </button>
              <Link href="/" className="text-sm text-stone-900/40 hover:text-stone-900/60 motion-safe:transition">
                ← {common('backToStreams')}
              </Link>
            </div>
          ) : (
            <Link href="/" className="mt-8 inline-block text-sm text-[#7D30E0] hover:underline">
              ← {common('backToStreams')}
            </Link>
          )}
        </div>
      </main>
    )
  }

  // ── Main wizard ───────────────────────────────────────────────────

  return (
    <main className="min-h-[100svh] bg-stone-50 text-stone-900">

      {/* Header */}
      <header className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="inline-flex min-h-[44px] items-center" aria-label={common('streamsHome')}>
            <Image
              src="/streams-of-joy-logo.svg"
              alt="Streams of Joy"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </Link>

          {/* Step indicator */}
          <ol className="flex items-center gap-1.5" aria-label={t('progress')}>
            {STEPS.map(([n, label], i) => {
              const done = step > n
              const active = step === n
              return (
                <li key={n} className="flex items-center gap-1.5">
                  {i > 0 && <span className="h-px w-5 bg-stone-300" aria-hidden="true" />}
                  <span
                    className={`grid h-6 w-6 place-items-center text-xs ${
                      done
                        ? 'bg-[#7D30E0] text-stone-50'
                        : active
                        ? 'bg-stone-900 text-stone-50'
                        : 'border border-stone-300 text-stone-400'
                    }`}
                    aria-current={active ? 'step' : undefined}
                  >
                    {done ? <Check className="h-3 w-3" aria-hidden="true" /> : n}
                  </span>
                  <span className={`hidden text-xs sm:inline ${active ? 'text-stone-900' : 'text-stone-900/35'}`}>
                    {t(label)}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-10 md:px-8 md:py-14">

        {/* Purchaser context strip */}
        {handoff && (
          <div className="mb-8 border-b border-stone-200 pb-5">
            <p className="text-xs uppercase tracking-wide text-stone-900/35">{t('purchasingAs')}</p>
            <p className="mt-1 text-sm text-stone-900/65">
              <span className="font-medium text-stone-900">
                {handoff.purchaserName || t('you')}
              </span>
              {' · '}
              {handoff.purchaserEmail}
              {' · '}
              <span className="uppercase text-xs">{handoff.purchaserCountry}</span>
            </p>
          </div>
        )}

        {/* ── Step 1: Choose plan ────────────────────────────────── */}
        {step === 1 && (
          <section aria-labelledby="step1-heading">
            <h1 id="step1-heading" className="text-3xl font-light tracking-tight md:text-4xl">
              {t('plan.title')}
            </h1>
            <p className="mt-2 text-stone-900/50">{t('plan.body')}</p>

            {/* Redemption scope */}
            {availableRedemptionScopes.length >= 2 && (
              <fieldset className="mt-8" disabled={plansLoading}>
                <legend className="text-xs uppercase tracking-widest text-stone-900/40">Gift scope</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {availableRedemptionScopes.map((option) => {
                    const active = redemptionScope === option.scope
                    const countryCode = option.allowedCountries[0] ?? handoff?.purchaserCountry ?? ''
                    const countryLabel = countryCode
                      ? (() => { try { return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) ?? countryCode } catch { return countryCode } })()
                      : ''
                    const description = option.scope === 'LOCAL'
                      ? `Since you're in ${countryLabel}, gifts in this scope are only redeemable by recipients in ${countryLabel}.`
                      : 'These gifts are redeemable by anyone, in any country around the world.'
                    return (
                      <button
                        key={option.scope}
                        type="button"
                        onClick={async () => {
                          if (option.scope === redemptionScope || !handoff) return
                          setRedemptionScope(option.scope)
                          setQuote(null)
                          setPlansLoading(true)
                          try {
                            const planResponse = await loadGiftPlans(handoff.handoffSessionId, option.scope)
                            applyPlanResponse(planResponse, selectedPlanId)
                          } finally {
                            setPlansLoading(false)
                          }
                        }}
                        aria-pressed={active}
                        className={`flex gap-3 border bg-white p-4 text-left motion-safe:transition disabled:opacity-60 ${
                          active ? 'border-[#7D30E0]/50 bg-[#7D30E0]/[0.03]' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 motion-safe:transition ${
                            active ? 'border-[#7D30E0]' : 'border-stone-300'
                          }`}
                          aria-hidden="true"
                        >
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-[#7D30E0]" />}
                        </span>
                        <div>
                          <p className="flex items-center gap-1.5 text-sm font-medium text-stone-900">
                            {option.scope === 'LOCAL'
                              ? <><MapPin className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />Local</>
                              : <><Globe2 className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />Global</>
                            }
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-900/50">{description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )}

            <div className={`${availableRedemptionScopes.length >= 2 ? 'mt-4' : 'mt-8'} grid gap-3 sm:grid-cols-2`}>
              {plans.map((plan) => {
                const selected = selectedPlan?.planId === plan.planId
                return (
                  <button
                    key={`${plan.planId}-${plan.cycleId}`}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.planId)}
                    disabled={plansLoading}
                    aria-pressed={selected}
                    className={`relative border p-6 text-left motion-safe:transition disabled:opacity-60 ${
                      selected
                        ? 'border-[#7D30E0] bg-[#7D30E0]/5'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-4 top-4 grid h-5 w-5 place-items-center bg-[#7D30E0]">
                        <Check className="h-3 w-3 text-stone-50" aria-hidden="true" />
                      </span>
                    )}
                    {plan.discountPercentage ? (
                      <span className="mb-3 inline-block bg-[#7D30E0]/10 px-2 py-0.5 text-xs text-[#7D30E0]">
                        {t('plan.save', { percent: plan.discountPercentage })}
                      </span>
                    ) : null}
                    <p className="text-xs uppercase tracking-wide text-stone-900/40">{plan.cycle}</p>
                    <p className="mt-1 text-lg font-normal">{plan.name}</p>
                    <p className="mt-3 text-2xl font-light tabular-nums">
                      {formatMoney(plan.unitAmount, plan.currency)}
                      <span className="ml-1 text-sm font-normal text-stone-900/40">{t('plan.perGift')}</span>
                    </p>
                    {(plan.description || plan.cycleDescription) && (
                      <p className="mt-3 text-sm leading-relaxed text-stone-900/50">
                        {plan.description || plan.cycleDescription}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!selectedPlan || plansLoading}
                className="inline-flex items-center gap-2 bg-stone-900 px-6 py-3 text-sm text-stone-50 hover:bg-[#7D30E0] disabled:opacity-40 motion-safe:transition motion-reduce:transition-none"
              >
                {plansLoading
                  ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t('loading')}</>
                  : <>{t('continue')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></>
                }
              </button>
            </div>
          </section>
        )}

        {/* ── Step 2: Gift details ───────────────────────────────── */}
        {step === 2 && (
          <section aria-labelledby="step2-heading">
            <h1 id="step2-heading" className="text-3xl font-light tracking-tight md:text-4xl">
              {t('details.title')}
            </h1>
            <p className="mt-2 text-stone-900/50">{t('details.body')}</p>

            {/* Delivery method choice */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => { setPurchaseType('TARGETED'); setQuote(null) }}
                aria-pressed={purchaseType === 'TARGETED'}
                className={`border p-5 text-left motion-safe:transition ${
                  purchaseType === 'TARGETED'
                    ? 'border-[#7D30E0] bg-[#7D30E0]/5'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <Mail
                  className={`h-5 w-5 ${purchaseType === 'TARGETED' ? 'text-[#7D30E0]' : 'text-stone-400'}`}
                  aria-hidden="true"
                />
                <p className="mt-3 font-normal">{t('details.targetedTitle')}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone-900/50">
                  {t('details.targetedBody')}
                </p>
              </button>
              <button
                type="button"
                onClick={() => { setPurchaseType('BATCH'); setQuote(null) }}
                aria-pressed={purchaseType === 'BATCH'}
                className={`border p-5 text-left motion-safe:transition ${
                  purchaseType === 'BATCH'
                    ? 'border-[#7D30E0] bg-[#7D30E0]/5'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <Users
                  className={`h-5 w-5 ${purchaseType === 'BATCH' ? 'text-[#7D30E0]' : 'text-stone-400'}`}
                  aria-hidden="true"
                />
                <p className="mt-3 font-normal">{t('details.batchTitle')}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone-900/50">
                  {t('details.batchBody')}
                </p>
              </button>
            </div>

            {/* Details */}
            <div className="mt-4 border border-stone-200 bg-white p-6">
              {purchaseType === 'TARGETED' ? (
                <div className="grid gap-2">
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor="recipients" className="text-sm text-stone-900/65">
                      {t('details.recipients')}
                    </Label>
                    <span title="One email per line, or comma-separated. Each recipient gets their own code emailed directly to them." className="cursor-default">
                      <Info className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                    </span>
                  </div>
                  <Textarea
                    id="recipients"
                    value={recipientEmails}
                    onChange={(e) => { setRecipientEmails(e.target.value); setQuote(null) }}
                    rows={4}
                    placeholder="jane@example.com, john@example.com"
                  />
                </div>
              ) : (
                <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor="quantity" className="text-sm text-stone-900/65">
                      {t('details.quantity')}
                    </Label>
                    <span title={`How many codes to generate. Minimum ${batchPricingRules.minimumSeats}. Each code unlocks one gift subscription and can be shared however you like.`} className="cursor-default">
                      <Info className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor="prefix" className="text-sm text-stone-900/65">
                      {t('details.prefix')}{' '}
                      <span className="text-stone-900/30">{t('optional')}</span>
                    </Label>
                    <span title="A word prepended to every code in this batch — e.g. CHURCH-ABC123. Useful for tracking which campaign a code came from." className="cursor-default">
                      <Info className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                    </span>
                  </div>
                  <Input
                    id="quantity"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={quantity}
                    onChange={(e) => { const n = parseInt(e.target.value.replace(/\D/g, ''), 10); setQuantity(n > 0 ? n : 1); setQuote(null) }}
                    placeholder={String(batchPricingRules.minimumSeats)}
                  />
                  <Input
                    id="prefix"
                    value={codePrefix}
                    onChange={(e) => setCodePrefix(e.target.value.toUpperCase())}
                    placeholder="Customize gift codes..."
                  />
                  {quantity < batchPricingRules.minimumSeats && (
                    <p className="col-span-2 text-xs text-red-600">{batchPricingRules.minimumSeatsText}</p>
                  )}
                </div>
              )}

              <div className="mt-5 border-t border-stone-100 pt-5">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="note" className="text-sm text-stone-900/65">
                    {t('details.note')}{' '}
                    <span className="text-stone-900/30">{t('optional')}</span>
                  </Label>
                  <span title="Shown in the gift email and on the claim page. Keep it short — a sentence or two." className="cursor-default">
                    <Info className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                  </span>
                </div>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="A short message for your recipients…"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Live estimate */}
            {selectedPlan && (purchaseType === 'TARGETED' ? recipientCount > 0 : quantity >= batchPricingRules.minimumSeats) && (
              <div className="mt-4 flex items-baseline justify-between border border-stone-200 bg-white px-5 py-4">
                <p className="text-sm text-stone-900/50">
                  {purchaseType === 'TARGETED'
                    ? t('details.recipientCount', { count: recipientCount })
                    : `${quantity} codes`}
                  {' × '}
                  {formatMoney(selectedPlan.unitAmount, selectedPlan.currency)}
                  {purchaseType === 'BATCH' && quantity >= batchPricingRules.discountThreshold && (
                    <span className="ml-2 text-[#7D30E0]">· {batchPricingRules.discountPercentage}% off</span>
                  )}
                </p>
                <p className="text-xl font-light tabular-nums">
                  {purchaseType === 'BATCH' && quantity >= batchPricingRules.discountThreshold
                    ? formatMoney(
                        selectedPlan.unitAmount * quantity * (1 - batchPricingRules.discountPercentage / 100),
                        selectedPlan.currency,
                      )
                    : formatMoney(
                        selectedPlan.unitAmount * (purchaseType === 'TARGETED' ? recipientCount : quantity),
                        selectedPlan.currency,
                      )
                  }
                </p>
              </div>
            )}

            {stepError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>{t('details.calculateFailed')}</AlertTitle>
                <AlertDescription>{stepError}</AlertDescription>
              </Alert>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => { setStep(1); setStepError(null) }}
                className="inline-flex items-center gap-2 border border-stone-200 px-5 py-3 text-sm hover:border-stone-400 motion-safe:transition motion-reduce:transition-none"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {common('back')}
              </button>
              <button
                type="button"
                onClick={advanceToReview}
                disabled={quoting || !step2Valid}
                className="inline-flex items-center gap-2 bg-stone-900 px-6 py-3 text-sm text-stone-50 hover:bg-[#7D30E0] disabled:opacity-40 motion-safe:transition motion-reduce:transition-none"
              >
                {quoting
                  ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t('details.calculating')}</>
                  : <><ArrowRight className="h-4 w-4" aria-hidden="true" />{t('details.reviewOrder')}</>
                }
              </button>
            </div>
          </section>
        )}

        {/* ── Step 3: Review & pay ───────────────────────────────── */}
        {step === 3 && selectedPlan && quote && (
          <section aria-labelledby="step3-heading">
            <h1 id="step3-heading" className="text-3xl font-light tracking-tight md:text-4xl">
              {t('review.title')}
            </h1>
            <p className="mt-2 text-stone-900/50">
              {t('review.body')}
            </p>

            <div className="mt-8 divide-y divide-stone-100 border border-stone-200 bg-white">
              <Row label={t('review.plan')}>
                <p className="font-normal">{selectedPlan.name}</p>
                <p className="text-sm text-stone-900/50">
                  {selectedPlan.cycle} · {t('review.perGiftAmount', { amount: formatMoney(selectedPlan.unitAmount, selectedPlan.currency) })}
                </p>
              </Row>
              <Row label={t('review.delivery')}>
                <p className="font-normal">
                  {purchaseType === 'TARGETED' ? t('review.targetedDelivery') : t('review.batchDelivery')}
                </p>
                <p className="text-sm text-stone-900/50">
                  {purchaseType === 'TARGETED'
                    ? t('details.recipientCount', { count: recipientCount })
                    : t('review.codeCount', { count: quantity, prefix: codePrefix ? ` · ${t('review.prefix', { prefix: codePrefix })}` : '' })}
                </p>
              </Row>
              <Row label="Region">
                <p className="font-normal">
                  {quote.scopeDescription ?? (redemptionScope === 'GLOBAL' ? 'Global gift, redeemable anywhere' : 'Local gift')}
                </p>
                {quote.allowedCountries && quote.allowedCountries.length > 0 && (
                  <p className="text-sm text-stone-900/50">Redeemable in {quote.allowedCountries.join(', ')}</p>
                )}
              </Row>
              {note && (
                <Row label={t('review.note')}>
                  <p className="text-sm italic text-stone-900/65">"{note}"</p>
                </Row>
              )}
              {quote.discountPercentage > 0 && quote.subtotalAmount != null && (
                <>
                  <Row label="Subtotal">
                    <p className="tabular-nums">{formatMoney(quote.subtotalAmount, quote.currency)}</p>
                    <p className="text-sm text-stone-900/40 tabular-nums">
                      {quote.quantity} × {formatMoney(quote.unitAmount, quote.currency)}
                    </p>
                  </Row>
                  <Row label="Discount">
                    <p className="tabular-nums text-emerald-700">
                      −{formatMoney(quote.discountAmount, quote.currency)}{' '}
                      <span className="text-sm">({quote.discountPercentage}% batch discount)</span>
                    </p>
                  </Row>
                </>
              )}
              <Row label={t('review.total')}>
                <p className="text-3xl font-light tabular-nums">
                  {formatMoney(quote.totalAmount, quote.currency)}
                </p>
                {!quote.discountPercentage && (
                  <p className="text-sm text-stone-900/40 tabular-nums">
                    {quote.quantity} × {formatMoney(quote.unitAmount, quote.currency)}
                  </p>
                )}
              </Row>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-stone-900/45">
              {t('review.security')}
            </p>

            {stepError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>{t('review.checkoutFailed')}</AlertTitle>
                <AlertDescription>{stepError}</AlertDescription>
              </Alert>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => { setStep(2); setStepError(null) }}
                className="inline-flex items-center gap-2 border border-stone-200 px-5 py-3 text-sm hover:border-stone-400 motion-safe:transition motion-reduce:transition-none"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {common('back')}
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkingOut}
                className="inline-flex items-center gap-2 bg-[#7D30E0] px-8 py-3 text-sm text-stone-50 hover:bg-[#7D30E0]/80 disabled:opacity-50 motion-safe:transition motion-reduce:transition-none"
              >
                {checkingOut
                  ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t('review.redirecting')}</>
                  : t('review.pay')
                }
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-5">
      <p className="pt-0.5 text-xs uppercase tracking-wide text-stone-900/35">{label}</p>
      <div>{children}</div>
    </div>
  )
}
