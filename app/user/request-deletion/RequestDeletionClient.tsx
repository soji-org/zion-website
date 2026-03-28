'use client'

import { useState } from 'react'
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

const Schema = z.object({
  email: z.string().email({ message: 'Valid email required' }),
  reason: z.enum(['no_longer_needed', 'privacy_concern', 'duplicate_account', 'other'], { required_error: 'Select a reason' }),
  message: z.string().max(1000).optional().default(''),
  consent: z.boolean().refine((value) => value === true, { message: 'Consent is required' }),
})

type FormValues = z.infer<typeof Schema>

export function RequestDeletionClient() {
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
    resolver: zodResolver(Schema),
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

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error || 'Failed')
      }

      setServerMsg(json.message || 'Request submitted.')
      setValue('message', '')
      setValue('consent', false)
    } catch (error: any) {
      setServerErr(error?.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-[100svh] bg-cream">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div
          className="mx-auto mt-24 h-96 w-96 rounded-full blur-3xl animate-glow"
          style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(139,92,246,0.18), transparent)' }}
        />
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-20">
        <div className="mb-8 rounded-2xl border border-charcoal/10 bg-white/80 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-ember">Official account deletion page</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-charcoal">Delete your NSPPD account</h1>
          <p className="mt-4 text-base leading-7 text-charcoal/70">
            This page is the official account and personal data deletion request form for the <strong className="text-charcoal">NSPPD</strong> mobile app, operated by <strong className="text-charcoal">Consonant Technologies Ltd.</strong>
          </p>
          <p className="mt-3 text-sm leading-6 text-charcoal/60">
            If you installed NSPPD from Google Play, use this form to request deletion of your app account and associated
            personal data.
          </p>
        </div>

        <Card className="rounded-2xl border bg-white/90 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <CardHeader>
            <CardTitle className="text-3xl">Submit deletion request</CardTitle>
            <CardDescription>
              Provide the email address linked to your NSPPD account so our team can verify and process the deletion request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reason">Reason</Label>
                <Select defaultValue="no_longer_needed" onValueChange={(value) => setValue('reason', value as FormValues['reason'], { shouldValidate: true })}>
                  <SelectTrigger id="reason" className="w-full">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_longer_needed">I no longer need the service</SelectItem>
                    <SelectItem value="privacy_concern">Privacy concern</SelectItem>
                    <SelectItem value="duplicate_account">Duplicate account</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reason && <p className="text-sm text-destructive">{errors.reason.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Additional details (optional)</Label>
                <Textarea id="message" rows={5} placeholder="Anything we should know?" {...register('message')} />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="consent" checked={watch('consent')} onCheckedChange={(value) => setValue('consent', Boolean(value), { shouldValidate: true })} />
                <Label htmlFor="consent" className="leading-relaxed">
                  I confirm that I am the owner of the NSPPD account associated with this email address and I request deletion
                  of my account and personal data.
                </Label>
              </div>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}

              <div className="flex items-center gap-3">
                <Button disabled={submitting} className="h-11 px-6" type="submit">
                  {submitting ? 'Submitting…' : 'Submit request'}
                </Button>
                <p className="text-sm text-muted-foreground">We&apos;ll respond within 30 days in line with our policy.</p>
              </div>
            </form>

            {serverMsg && (
              <Alert className="border-primary/40">
                <AlertTitle>Request received</AlertTitle>
                <AlertDescription>{serverMsg}</AlertDescription>
              </Alert>
            )}

            {serverErr && (
              <Alert variant="destructive">
                <AlertTitle>Submission failed</AlertTitle>
                <AlertDescription>{serverErr}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 rounded-2xl border border-charcoal/10 bg-white/70 p-6 text-sm leading-6 text-charcoal/65">
          <p>
            Requested deletions cover your NSPPD account profile and associated personal data, except records we must retain for
            legal, security, fraud-prevention, or compliance reasons.
          </p>
        </div>
      </div>
    </main>
  )
}
