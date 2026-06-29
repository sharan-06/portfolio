import type { Metadata } from 'next'
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'SHARAVANAN R — Automation Architect',
  description: 'Robotics & Automation Engineer portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="preload"
          href="/sharavanan.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body style={{ background: '#050505', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
