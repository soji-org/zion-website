import type { MetadataRoute } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/gifts/', '/_next/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: new URL(siteConfig.url).host,
  }
}
