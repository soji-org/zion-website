import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Streams of Joy',
  legalName: 'Consonant Technologies Ltd.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://streamsofjoy.app',
  title: 'Streams of Joy | Daily Devotionals, NSPPD Prayer & Sermons',
  description:
    'Streams of Joy is a spiritual companion app for daily devotionals, NSPPD live prayer, sermon listening, Bible study, prayer lists, notes, and church events.',
  keywords: [
    'Streams of Joy',
    'NSPPD',
    'Pastor Jerry Eze',
    'daily devotional app',
    'prayer app',
    'Christian devotional',
    'sermon app',
    'Bible study app',
    '7AM fire prayers',
  ],
  ogImage: '/opengraph-image',
}

type PageMetadataOptions = {
  title: string
  description: string
  path?: string
  noIndex?: boolean
  image?: string
  keywords?: string[]
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString()
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
  image = siteConfig.ogImage,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: noIndex ? undefined : { canonical: url },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export function createNoIndexMetadata(title: string, description: string, path = '/') {
  return createPageMetadata({ title, description, path, noIndex: true })
}
