import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { FirebaseAnalytics } from '@/components/firebase-analytics'
import { rtlLocales, resolveLocale } from '@/lib/i18n'
import { siteConfig } from '@/lib/seo'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
    type: 'website',
    locale: 'en',
  },
  twitter: {
    card: 'summary',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: '/streams-of-joy-logo.svg',
  },
  category: 'Lifestyle',
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
