import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import PageTransition from '@/components/PageTransition'

const cabinetGrotesk = localFont({
  src: '../public/fonts/CabinetGrotesk-Variable.woff2',
  variable: '--font-cabinet',
  display: 'swap',
  weight: '100 900',
})

const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  weight: '300 900',
})

export const metadata: Metadata = {
  title: 'Taylor Maison — Creative Systems for Founder-Led Businesses',
  description:
    'Brand direction, custom websites, and practical AI workflows for founder-led businesses.',
  openGraph: {
    title: 'Taylor Maison',
    description:
      'Brand direction, custom websites, and practical AI workflows for founder-led businesses.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cabinetGrotesk.variable} ${satoshi.variable}`}>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
