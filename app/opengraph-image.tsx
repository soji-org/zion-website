import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Streams of Joy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const svg = readFileSync(join(process.cwd(), 'public/streams-of-joy-logo.svg'))
  const logoSrc = `data:image/svg+xml;base64,${svg.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAF9',
        padding: '80px',
        gap: '64px',
        borderBottom: '6px solid #7D30E0',
      }}
    >
      {/* Logo */}
      <img
        src={logoSrc}
        width={200}
        height={200}
        style={{ objectFit: 'contain', flexShrink: 0 }}
      />

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: '300',
            color: '#1C1917',
            letterSpacing: '-2px',
            lineHeight: 1.05,
          }}
        >
          Streams of Joy
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#78716C',
            letterSpacing: '-0.5px',
          }}
        >
          Daily Devotionals · NSPPD Prayer · Sermons
        </div>
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#7D30E0',
            }}
          />
          <div style={{ fontSize: '20px', color: '#7D30E0' }}>streamsofjoy.app</div>
        </div>
      </div>
    </div>,
    { ...size },
  )
}
