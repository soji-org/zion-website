import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const svg = readFileSync(join(process.cwd(), 'public/streams-of-joy-logo.svg'))
  const src = `data:image/svg+xml;base64,${svg.toString('base64')}`

  return new ImageResponse(
    <img src={src} width={180} height={180} style={{ objectFit: 'contain' }} />,
    { ...size },
  )
}
