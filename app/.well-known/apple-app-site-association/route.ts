import { NextResponse } from 'next/server'

const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID || 'Z46FT5TYTT'
const IOS_BUNDLE_ID = process.env.IOS_BUNDLE_ID || 'com.consonant.soji'

/**
 * Lets the iOS app open shared devotional links directly instead of bouncing
 * readers who already have it into the browser.
 *
 * Scoped to /devotional so the rest of the site (gift checkout, legal pages,
 * deletion requests) keeps working in the browser as it does today.
 *
 * Apple fetches this over HTTPS from the production domain, so it only takes
 * effect once deployed — and only for app builds that declare the matching
 * associated domain.
 */
export async function GET() {
  return NextResponse.json(
    {
      applinks: {
        details: [
          {
            appIDs: [`${APPLE_TEAM_ID}.${IOS_BUNDLE_ID}`],
            components: [
              { '/': '/devotional', comment: "Today's devotional" },
              { '/': '/devotional/*', comment: 'Dated devotional permalinks' },
            ],
          },
        ],
      },
    },
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600',
      },
    },
  )
}
