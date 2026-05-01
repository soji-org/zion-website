import createNextIntlPlugin from 'next-intl/plugin'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

initOpenNextCloudflareForDev()

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const config = {}

export default withNextIntl(config)
