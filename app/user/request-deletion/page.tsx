'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Schema = z.object({
  email: z.string().email({ message: 'Valid email required' }),
  reason: z.enum(['no_longer_needed', 'privacy_concern', 'duplicate_account', 'other'], { required_error: 'Select a reason' }),
  message: z.string().max(1000).optional().default(''),
  consent: z.boolean().refine(v => v === true, { message: 'Consent is required' })
})

type FormValues = z.infer<typeof Schema>

export default function RequestDeletionPage(){
  const [serverMsg, setServerMsg] = useState<string | null>(null)
  const [serverErr, setServerErr] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { email: '', reason: 'no_longer_needed', message: '', consent: false }
  })

  const onSubmit = async (values: FormValues) => {
    setServerMsg(null); setServerErr(null); setSubmitting(true)
    try{
      const res = await fetch('/api/request-deletion', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(values) })
      const json = await res.json()
      if(!res.ok) throw new Error(json?.error || 'Failed')
      setServerMsg(json.message || 'Request submitted.')
      setValue('message',''); setValue('consent', false)
    }catch(e: any){ setServerErr(e?.message || 'Failed to submit') }
    finally{ setSubmitting(false) }
  }

  return (
    <main className="relative min-h-[100svh]">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div className="mx-auto h-96 w-96 rounded-full blur-3xl mt-24 animate-glow" style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(139,92,246,0.25), transparent)' }} />
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-20">
        <Card className="border backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl">Request data deletion</CardTitle>
            <CardDescription>Submit this form to ask for your personal data to be deleted from our systems.</CardDescription>
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
                <Select defaultValue="no_longer_needed" onValueChange={(v)=> setValue('reason', v as any, { shouldValidate: true })}>
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
                <Checkbox id="consent" checked={watch('consent')} onCheckedChange={(v)=> setValue('consent', Boolean(v), { shouldValidate: true })} />
                <Label htmlFor="consent" className="leading-relaxed">I confirm that I am the account owner and I request deletion of my personal data.</Label>
              </div>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}

              <div className="flex items-center gap-3">
                <Button disabled={submitting} className="h-11 px-6" type="submit">{submitting ? 'Submitting…' : 'Submit request'}</Button>
                <p className="text-sm text-muted-foreground">We'll email you within 30 days per policy.</p>
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
        <p className="mt-6 text-center text-xs text-muted-foreground">By submitting, you acknowledge that certain records may be retained where legally required.</p>
      </div>
    </main>
  )
}
