import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { FirebaseAnalytics } from '@/components/firebase-analytics'
import { rtlLocales, resolveLocale } from '@/lib/i18n'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Streams of Joy - The Altar of Fire',
  description: 'Your digital altar for the miraculous. Join millions in the 7AM Fire Prayers, track your spiritual streaks, and carry the atmosphere of miracles in your pocket.',
  keywords: 'Streams of Joy, Pastor Jerry Eze, NSPPD, Fire Prayers, Prayer App, Devotional',
  openGraph: {
    title: 'Streams of Joy - The Altar of Fire',
    description: 'Your digital altar for the miraculous. Join millions in the 7AM Fire Prayers.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Streams of Joy - The Altar of Fire',
    description: 'Your digital altar for the miraculous. Join millions in the 7AM Fire Prayers.',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: '/streams-of-joy-logo.svg',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = resolveLocale(await getLocale())
  const messages = await getMessages()

  return (
    <html lang={locale} dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'} className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#FAFAF9" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${ibmPlexSans.variable} font-sans antialiased min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <FirebaseAnalytics />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
