import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Deletion',
  description: 'User data deletion request portal'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen body-bg">{children}</body>
    </html>
  )
}
