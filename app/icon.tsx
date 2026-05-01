import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

export default function Icon() {
  const svg = readFileSync(join(process.cwd(), 'public/streams-of-joy-logo.svg'))
  const src = `data:image/svg+xml;base64,${svg.toString('base64')}`

  return new ImageResponse(
    <img src={src} width={256} height={256} style={{ objectFit: 'contain' }} />,
    { ...size },
  )
}
