'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

function createSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email({ message: t('validEmail') }),
    reason: z.enum(['no_longer_needed', 'privacy_concern', 'duplicate_account', 'other'], { required_error: t('reasonRequired') }),
    message: z.string().max(1000).optional().default(''),
    consent: z.boolean().refine((value) => value === true, { message: t('consentRequired') }),
  })
}

type FormValues = z.infer<ReturnType<typeof createSchema>>
type RequestDeletionResponse = {
  error?: string
  message?: string
}

export function RequestDeletionClient() {
  const t = useTranslations('Deletion')
  const schema = createSchema(t)
  const [serverMsg, setServerMsg] = useState<string | null>(null)
  const [serverErr, setServerErr] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', reason: 'no_longer_needed', message: '', consent: false },
  })

  const onSubmit = async (values: FormValues) => {
    setServerMsg(null)
    setServerErr(null)
    setSubmitting(true)

    try {
      const res = await fetch('/api/request-deletion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const json = (await res.json()) as RequestDeletionResponse
      if (!res.ok) {
        throw new Error(json?.error || t('failedShort'))
      }

      setServerMsg(json.message || t('submitted'))
      setValue('message', '')
      setValue('consent', false)
    } catch (error: any) {
      setServerErr(error?.message || t('failedSubmit'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-[100svh] bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div
          className="mx-auto mt-24 h-96 w-96 rounded-full blur-3xl animate-glow"
          style={{ background: 'radial-gradient(60% 60% at 50% 50%, hsl(var(--primary) / 0.18), transparent)' }}
        />
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-20">
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/85">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">{t('eyebrow')}</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground">{t('title')}</h1>
          <p className="mt-4 text-base leading-7 text-foreground/80">
            {t('intro')}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {t('googlePlay')}
          </p>
        </div>

        <Card className="rounded-2xl border-border bg-card shadow-xl backdrop-blur supports-[backdrop-filter]:bg-card/90">
          <CardHeader>
            <CardTitle className="text-3xl">{t('formTitle')}</CardTitle>
            <CardDescription>
              {t('formDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reason">{t('reason')}</Label>
                <Select defaultValue="no_longer_needed" onValueChange={(value) => setValue('reason', value as FormValues['reason'], { shouldValidate: true })}>
                  <SelectTrigger id="reason" className="w-full">
                    <SelectValue placeholder={t('selectReason')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_longer_needed">{t('reasons.noLongerNeeded')}</SelectItem>
                    <SelectItem value="privacy_concern">{t('reasons.privacyConcern')}</SelectItem>
                    <SelectItem value="duplicate_account">{t('reasons.duplicateAccount')}</SelectItem>
                    <SelectItem value="other">{t('reasons.other')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea id="message" rows={5} placeholder={t('messagePlaceholder')} {...register('message')} />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="consent" checked={watch('consent')} onCheckedChange={(value) => setValue('consent', Boolean(value), { shouldValidate: true })} />
                <Label htmlFor="consent" className="leading-relaxed">
                  {t('consent')}
                </Label>
              </div>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}

              <div className="flex items-center gap-3">
                <Button disabled={submitting} className="h-11 px-6" type="submit">
                  {submitting ? t('submitting') : t('submit')}
                </Button>
                <p className="text-sm text-muted-foreground">{t('responseTime')}</p>
              </div>
            </form>

            {serverMsg && (
              <Alert className="border-primary/40">
                <AlertTitle>{t('received')}</AlertTitle>
                <AlertDescription>{serverMsg}</AlertDescription>
              </Alert>
            )}

            {serverErr && (
              <Alert variant="destructive">
                <AlertTitle>{t('failed')}</AlertTitle>
                <AlertDescription>{serverErr}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6 text-sm leading-6 text-foreground/80">
          <p>
            {t('retention')}
          </p>
        </div>
      </div>
    </main>
  )
}
