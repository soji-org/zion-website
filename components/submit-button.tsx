'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }){
  return (
    <Button disabled={pending} className="h-11 px-6">
      {pending ? 'Submitting…' : children}
    </Button>
  )
}
