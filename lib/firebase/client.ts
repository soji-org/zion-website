'use client'

import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { Analytics, getAnalytics, isSupported } from 'firebase/analytics'
import {
  Auth,
  GoogleAuthProvider,
  OAuthProvider,
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export function hasFirebaseConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId,
  )
}

let authPromise: Promise<Auth> | null = null
let analyticsPromise: Promise<Analytics | null> | null = null

function getFirebaseApp(): FirebaseApp {
  if (!hasFirebaseConfig()) {
    throw new Error('Firebase web configuration is missing.')
  }

  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

export function getFirebaseAuth() {
  if (!authPromise) {
    const auth = getAuth(getFirebaseApp())
    authPromise = setPersistence(auth, browserLocalPersistence).then(() => auth)
  }

  return authPromise
}

export function getFirebaseAnalytics() {
  if (!hasFirebaseConfig()) return Promise.resolve(null)

  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) => {
      if (!supported || !firebaseConfig.measurementId) return null
      return getAnalytics(getFirebaseApp())
    })
  }

  return analyticsPromise
}

export function getGoogleProvider() {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  return provider
}

export function getAppleProvider() {
  const provider = new OAuthProvider('apple.com')
  provider.addScope('email')
  provider.addScope('name')
  return provider
}
