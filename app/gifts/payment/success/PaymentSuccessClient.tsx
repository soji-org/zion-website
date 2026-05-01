'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Check, Copy, Loader2 } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GiftOrder, GiftProvider, verifyGiftPayment } from '@/lib/gifts/api'

function resolveProvider(provider?: string | null, reference?: string | null): GiftProvider {
  if (provider?.toUpperCase() === 'PAYSTACK') return 'PAYSTACK'
  if (provider?.toUpperCase() === 'STRIPE') return 'STRIPE'
  return reference ? 'PAYSTACK' : 'STRIPE'
}

export function PaymentSuccessClient({
  sessionId,
  reference,
  provider,
}: {
  sessionId?: string
  reference?: string
  provider?: string
}) {
  const common = useTranslations('Common')
  const t = useTranslations('Payment')
  const [order, setOrder] = useState<GiftOrder | null>(null)
  const [batchUrl, setBatchUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let mounted = true
    async function verify() {
      if (!sessionId && !reference) {
        setError(t('missingReference'))
        setLoading(false)
        return
      }
      try {
        const resolvedProvider = resolveProvider(provider, reference)
        const paymentReference = resolvedProvider === 'STRIPE' ? sessionId : reference
        if (!paymentReference) throw new Error(t('missingReference'))
        const response = await verifyGiftPayment({
          provider: resolvedProvider,
          reference: paymentReference,
        })
        if (!mounted) return
        setOrder(response.order)
        setBatchUrl(response.batchUrl || response.order.batchUrl || null)
      } catch (err: any) {
        if (!mounted) return
        setError(err?.message || t('verifyFailed'))
      } finally {
        if (mounted) setLoading(false)
      }
    }
    verify()
    return () => { mounted = false }
  }, [provider, reference, sessionId])

  const absoluteBatchUrl = batchUrl
    ? batchUrl.startsWith('http')
      ? batchUrl
      : `${typeof window !== 'undefined' ? window.location.origin : ''}${batchUrl}`
    : null

  function copyUrl() {
    if (!absoluteBatchUrl) return
    navigator.clipboard.writeText(absoluteBatchUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-[100svh] bg-stone-50 text-stone-900">

      {/* Header */}
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

        {loading && (
          <div className="border border-stone-200 bg-white p-8 md:p-10">
            <Loader2 className="h-6 w-6 animate-spin text-stone-900/40" />
            <h1 className="mt-6 text-2xl font-light tracking-tight">{t('confirming')}</h1>
            <p className="mt-2 text-stone-900/50">{t('confirmingBody')}</p>
          </div>
        )}

        {!loading && error && (
          <Alert variant="destructive">
            <AlertTitle>{t('checkFailed')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && order && (
          <div className="border border-stone-200 bg-white p-8 md:p-10">
            <div className="grid h-10 w-10 place-items-center bg-[#7D30E0]">
              <Check className="h-5 w-5 text-stone-50" aria-hidden="true" />
            </div>

            <p className="mt-6 text-xs uppercase tracking-wide text-stone-900/35">{order.status}</p>
            <h1 className="mt-2 text-3xl font-light tracking-tight">
              {order.purchaseType === 'BATCH' ? t('codesReady') : t('emailsSent')}
            </h1>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-stone-900/60 text-pretty">
              {order.purchaseType === 'BATCH'
                ? t('batchBody')
                : t('targetedBody')}
            </p>

            {absoluteBatchUrl && (
              <div className="mt-8 border border-stone-200 bg-stone-50 p-5">
                <p className="text-xs uppercase tracking-wide text-stone-900/35">{t('shareLink')}</p>
                <div className="mt-3 flex items-center gap-3">
                  <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-stone-900/70 tabular-nums">
                    {absoluteBatchUrl}
                  </code>
                  <button
                    type="button"
                    onClick={copyUrl}
                    className="shrink-0 grid h-9 w-9 place-items-center border border-stone-200 hover:border-stone-400 motion-safe:transition motion-reduce:transition-none"
                    aria-label={t('copyBatchLink')}
                  >
                    {copied
                      ? <Check className="h-4 w-4 text-[#7D30E0]" aria-hidden="true" />
                      : <Copy className="h-4 w-4 text-stone-900/50" aria-hidden="true" />
                    }
                  </button>
                </div>
              </div>
            )}

            <Link
              href="/"
              className="mt-8 inline-flex min-h-[44px] items-center justify-center border border-stone-200 px-6 text-sm hover:border-stone-400 motion-safe:transition motion-reduce:transition-none"
            >
              {common('backToStreams')}
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
