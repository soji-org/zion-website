'use client'

import { useEffect } from 'react'

import { getFirebaseAnalytics } from '@/lib/firebase/client'

export function FirebaseAnalytics() {
  useEffect(() => {
    void getFirebaseAnalytics().catch(() => undefined)
  }, [])

  return null
}
