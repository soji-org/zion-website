import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const config = {
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3']
  },
  output: 'standalone'
}

export default withNextIntl(config)
