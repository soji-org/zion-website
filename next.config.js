import createNextIntlPlugin from 'next-intl/plugin'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

initOpenNextCloudflareForDev()

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default withNextIntl(config)
