import type { Metadata } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/seo'
import { getLocalisedContent, type Devotional } from '@/lib/devotional'

export function buildDevotionalMetadata(
  dev: Devotional | null,
  locale: string,
  path: string,
): Metadata {
  const localised = dev ? getLocalisedContent(dev, locale) : null
  const title = localised?.title ?? dev?.title
  const content = localised?.content ?? dev?.content

  const metaTitle = title ? `${title} — Daily Devotional` : 'Daily Devotional'
  const description = content
    ? `${content.slice(0, 155).trim()}…`
    : "Read today's devotional from Pastor Jerry Eze on the Streams of Joy app."
  const image = dev?.coverImageUrl ?? absoluteUrl(siteConfig.ogImage)
  const url = absoluteUrl(path)

  return {
    title: metaTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime: dev?.date,
      authors: dev?.author ? [dev.author] : undefined,
      images: [{ url: image, width: 1200, height: 630, alt: metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description,
      images: [image],
    },
  }
}
