'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Check, CheckCircle2, Copy, Gift, Loader2, LockKeyhole, Smartphone } from 'lucide-react'
import type { User } from 'firebase/auth'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getFirebaseAuth, getAppleProvider, getGoogleProvider, hasFirebaseConfig } from '@/lib/firebase/client'
import {
  BatchPreview,
  ClaimPreview,
  claimGift,
  previewBatch,
  previewClaim,
} from '@/lib/gifts/api'

type ClaimMode = 'targeted' | 'batch'

function previewTitle(preview: ClaimPreview | BatchPreview | null, fallback: string, batchFallback: string, giftFallback: string) {
  if (!preview) return fallback
  if ('availableSeats' in preview) return preview.planName || preview.plan?.name || batchFallback
  return preview.planName || preview.plan?.name || giftFallback
}

function previewCycle(preview: ClaimPreview | BatchPreview | null, fallback: string) {
  return preview?.cycle || preview?.plan?.cycle || fallback
}

const CLAIM_STEPS = [
  { n: 1, icon: LockKeyhole, label: 'steps.signIn' },
  { n: 2, icon: Gift,        label: 'steps.claim'   },
  { n: 3, icon: Smartphone,  label: 'steps.openApp' },
]

export function ClaimGiftClient({
  mode,
  claimToken,
  orderId,
}: {
  mode: ClaimMode
  claimToken?: string
  orderId?: string
}) {
  const common = useTranslations('Common')
  const t = useTranslations('GiftClaim')
  const [preview, setPreview] = useState<ClaimPreview | BatchPreview | null>(null)
  const [previewLoading, setPreviewLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadPreview() {
      try {
        const data =
          mode === 'targeted'
            ? await previewClaim(claimToken ?? '')
            : await previewBatch(orderId ?? '')
        if (mounted) setPreview(data)
      } catch (err: any) {
        if (mounted) setPreviewError(err?.message || t('errors.load'))
      } finally {
        if (mounted) setPreviewLoading(false)
      }
    }
    loadPreview()
    return () => { mounted = false }
  }, [claimToken, mode, orderId])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let mounted = true
    async function subscribeToAuth() {
      if (!hasFirebaseConfig()) { setAuthReady(true); return }
      try {
        const auth = await getFirebaseAuth()
        if (!mounted) return
        unsubscribe = onAuthStateChanged(auth, (nextUser) => {
          setUser(nextUser)
          setAuthReady(true)
        })
      } catch (err: any) {
        if (!mounted) return
        setAuthError(err?.message || t('errors.initAuth'))
        setAuthReady(true)
      }
    }
    subscribeToAuth()
    return () => { mounted = false; unsubscribe?.() }
  }, [])

  const exhausted = useMemo(
    () => preview && 'exhausted' in preview && preview.exhausted,
    [preview],
  )

  async function handleAppleSignIn() {
    setAuthError(null)
    setAuthenticating(true)
    try {
      const auth = await getFirebaseAuth()
      await signInWithPopup(auth, getAppleProvider())
    } catch (err: any) {
      setAuthError(formatAuthError(err?.code, err?.message, t))
    } finally {
      setAuthenticating(false)
    }
  }

  async function handleGoogleSignIn() {
    setAuthError(null)
    setAuthenticating(true)
    try {
      const auth = await getFirebaseAuth()
      await signInWithPopup(auth, getGoogleProvider())
    } catch (err: any) {
      setAuthError(formatAuthError(err?.code, err?.message, t))
    } finally {
      setAuthenticating(false)
    }
  }

  async function handleSignOut() {
    const auth = await getFirebaseAuth()
    await signOut(auth)
  }

  async function handleClaim() {
    if (!user) return
    setClaimError(null)
    setClaiming(true)
    try {
      const firebaseToken = await user.getIdToken()
      const response = await claimGift(
        mode === 'targeted' ? { claimToken } : { batchOrderId: orderId },
        firebaseToken,
      )
      const nextCode = response.code || response.giftCode
      if (!nextCode) throw new Error(t('errors.noCode'))
      setCode(nextCode)
    } catch (err: any) {
      setClaimError(err?.message || t('errors.claim'))
    } finally {
      setClaiming(false)
    }
  }

  function copyCode() {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Derive which step is active for the progress indicator
  const activeStep = code ? 3 : user ? 2 : 1

  return (
    <main className="min-h-[100svh] bg-stone-50 text-stone-900">

      {/* Header */}
      <header className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="inline-flex min-h-[44px] items-center" aria-label={common('streamsHome')}>
            <Image
              src="/streams-of-joy-logo.svg"
              alt="Streams of Joy"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </Link>
          {/* Progress steps */}
          <ol className="flex items-center gap-1.5" aria-label={t('progress')}>
            {CLAIM_STEPS.map(({ n, label }, i) => {
              const done = activeStep > n
              const active = activeStep === n
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

      {/* Purchaser credit */}
      {!previewLoading && preview && (preview.purchaserName || (mode === 'targeted' && (preview as ClaimPreview).gifterName)) && (
        <div>
          <div className="mx-auto max-w-4xl px-4 py-4 md:px-8">
            <h2 className="text-center text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 mt-8 sm:mt-12">
              {t('purchaserCredit', { name: preview.purchaserName || (mode === 'targeted' ? (preview as ClaimPreview).gifterName : '') || '' })}
            </h2>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-10 md:px-8 md:py-14 lg:grid-cols-[1fr_1.4fr]">

        {/* ── Gift details panel ─────────────────────────────────── */}
        <aside className="border border-stone-200 bg-white p-6 md:p-8 lg:self-start">
          {previewLoading ? (
            <div className="flex items-center gap-3 text-stone-900/40">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{t('loading')}</span>
            </div>
          ) : previewError ? (
            <p className="text-sm text-stone-900/50">{previewError}</p>
          ) : (
            <>
              <Gift className="h-6 w-6 text-[#7D30E0]/60" aria-hidden="true" />
              <p className="mt-4 text-xs uppercase tracking-wide text-stone-900/35">
                {mode === 'batch' ? t('sharedGift') : t('personalGift')}
              </p>
              <h1 className="mt-2 text-2xl font-light tracking-tight">{previewTitle(preview, t('giftAccess'), t('batchGift'), t('yourGift'))}</h1>
              <p className="mt-1 text-stone-900/55">{previewCycle(preview, t('subscriptionAccess'))}</p>

              {preview && 'availableSeats' in preview && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="border border-stone-100 bg-stone-50 p-4">
                    <p className="text-2xl font-light tabular-nums">{preview.availableSeats}</p>
                    <p className="text-xs text-stone-900/45">{t('available')}</p>
                  </div>
                  <div className="border border-stone-100 bg-stone-50 p-4">
                    <p className="text-2xl font-light tabular-nums">{preview.totalSeats}</p>
                    <p className="text-xs text-stone-900/45">{t('totalSeats')}</p>
                  </div>
                </div>
              )}

              {preview?.note && (
                <blockquote className="mt-6 border-l-2 border-[#7D30E0]/30 pl-4">
                  <p className="text-sm italic leading-relaxed text-stone-900/60">"{preview.note}"</p>
                </blockquote>
              )}

              {exhausted && (
                <p className="mt-6 text-sm text-red-600">
                  {t('exhausted')}
                </p>
              )}
            </>
          )}
        </aside>

        {/* ── Action panel ───────────────────────────────────────── */}
        <div>

          {/* ── Step 1: Sign in ──────────────────────────────────── */}
          {!code && (
            <div className="border border-stone-200 bg-white p-6 md:p-8">
              {!user ? (
                <>
                  <h2 className="text-xl font-normal tracking-tight">{t('signin.title')}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-stone-900/55">
                    {mode === 'targeted'
                      ? t('signin.targetedBody')
                      : t('signin.batchBody')}
                    {' '}{t('signin.afterClaim')}
                  </p>

                  {!hasFirebaseConfig() ? (
                    <Alert variant="destructive" className="mt-5">
                      <AlertTitle>{t('signin.notConfigured')}</AlertTitle>
                      <AlertDescription>
                        {t('signin.firebaseMissing')}
                      </AlertDescription>
                    </Alert>
                  ) : !authReady ? (
                    <div className="mt-5 flex items-center gap-2 text-sm text-stone-900/40">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {t('signin.checking')}
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-4">
                      {/* Google */}
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={authenticating}
                        className="flex min-h-[44px] items-center justify-center gap-2 border border-stone-200 px-4 py-2.5 text-sm hover:border-stone-400 disabled:opacity-50 motion-safe:transition motion-reduce:transition-none"
                      >
                        {authenticating
                          ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          : (
                            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          )
                        }
                        {t('signin.google')}
                      </button>

                      {/* Apple */}
                      <button
                        type="button"
                        onClick={handleAppleSignIn}
                        disabled={authenticating}
                        className="flex min-h-[44px] items-center justify-center gap-2 bg-black px-4 py-2.5 text-sm text-white hover:bg-stone-800 disabled:opacity-50 motion-safe:transition motion-reduce:transition-none"
                      >
                        {authenticating
                          ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          : (
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                            </svg>
                          )
                        }
                        {t('signin.apple')}
                      </button>

                      {/* Disclaimer */}
                      <p className="text-sm font-semibold text-[#7D30E0]">
                        {t('signin.emailDisclaimer')}
                      </p>

                      {authError && (
                        <Alert variant="destructive">
                          <AlertTitle>{t('signin.failed')}</AlertTitle>
                          <AlertDescription>{authError}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* ── Step 2: Claim ──────────────────────────────── */
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-900/35">{t('claim.signedInAs')}</p>
                      <p className="mt-1 font-medium">{user.email || user.displayName || t('claim.defaultUser')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="shrink-0 text-xs text-stone-900/40 underline hover:text-stone-900 motion-safe:transition"
                    >
                      {t('claim.switchAccount')}
                    </button>
                  </div>

                  <div className="mt-6 border-t border-stone-100 pt-6">
                    <h2 className="text-xl font-normal tracking-tight">{t('claim.title')}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-900/55">
                      {t('claim.bodyPrefix')}{' '}
                      <strong className="font-medium text-stone-900">{t('claim.appName')}</strong>{' '}
                      {t('claim.bodySuffix')}
                    </p>
                  </div>

                  {claimError && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertTitle>{t('claim.unavailable')}</AlertTitle>
                      <AlertDescription>{claimError}</AlertDescription>
                    </Alert>
                  )}

                  <button
                    type="button"
                    onClick={handleClaim}
                    disabled={claiming || Boolean(exhausted)}
                    className="mt-6 w-full min-h-[48px] bg-[#7D30E0] text-sm text-stone-50 hover:bg-[#7D30E0]/80 disabled:opacity-40 motion-safe:transition motion-reduce:transition-none"
                  >
                    {claiming
                      ? <Loader2 className="mx-auto h-4 w-4 animate-spin" aria-hidden="true" />
                      : exhausted
                      ? t('claim.noSeats')
                      : t('claim.getCode')
                    }
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── Step 3: Code revealed ─────────────────────────────── */}
          {code && (
            <div className="border border-stone-200 bg-white p-6 md:p-8">
              <CheckCircle2 className="h-8 w-8 text-[#7D30E0]" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-light tracking-tight">{t('success.title')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-900/55">
                {t('success.bodyPrefix')}{' '}
                <strong className="font-medium text-stone-900">{t('success.menuPath')}</strong>.
              </p>

              <div className="mt-6 border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-wide text-stone-900/35">{t('success.codeLabel')}</p>
                <div className="mt-3 flex items-center gap-3">
                  <code className="min-w-0 flex-1 overflow-x-auto font-mono text-lg font-medium tracking-widest tabular-nums text-stone-900">
                    {code}
                  </code>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="shrink-0 grid h-9 w-9 place-items-center border border-stone-200 hover:border-stone-400 motion-safe:transition motion-reduce:transition-none"
                    aria-label={t('success.copyCode')}
                  >
                    {copied
                      ? <Check className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
                      : <Copy className="h-4 w-4 text-stone-900/50" aria-hidden="true" />
                    }
                  </button>
                </div>
              </div>

              <a
                href="https://onelink.to/sojiapp"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] items-center justify-center bg-stone-900 px-6 text-sm text-stone-50 hover:bg-[#7D30E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 motion-safe:transition motion-reduce:transition-none"
              >
                {t('success.openApp')}
              </a>
            </div>
          )}

          <Link
            href="/"
            className="mt-4 inline-block text-xs text-stone-900/35 hover:text-stone-900/60 motion-safe:transition"
          >
            ← {common('backToStreams')}
          </Link>
        </div>
      </div>
    </main>
  )
}

function formatAuthError(code: string | undefined, fallback: string | undefined, t: (key: string) => string) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return t('errors.invalidCredential')
    case 'auth/email-already-in-use':
      return t('errors.emailInUse')
    case 'auth/popup-closed-by-user':
      return t('errors.popupClosed')
    case 'auth/configuration-not-found':
      return t('errors.firebaseDisabled')
    default:
      return fallback || t('errors.signIn')
  }
}
