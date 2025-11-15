import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Cinzel } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700']
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700']
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
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${cinzel.variable} font-sans antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  )
}