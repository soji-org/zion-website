import { NextResponse } from 'next/server'

const ANDROID_PACKAGE_NAME =
  process.env.ANDROID_PACKAGE_NAME || 'com.consonant.soji'

/**
 * Android App Links verification for shared devotional links.
 *
 * The signing certificate fingerprint is deployment-specific and is not
 * checked in. Without it a served file would claim the app and then fail
 * verification, so respond 404 until it is configured — an absent file is a
 * clearly unconfigured state, a wrong one fails silently.
 */
export async function GET() {
  const fingerprints = (process.env.ANDROID_CERT_SHA256 || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  if (fingerprints.length === 0) {
    return new NextResponse('Not found', { status: 404 })
  }

  return NextResponse.json(
    [
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: ANDROID_PACKAGE_NAME,
          sha256_cert_fingerprints: fingerprints,
        },
      },
    ],
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600',
      },
    },
  )
}
