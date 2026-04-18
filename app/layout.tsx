import type { Metadata } from 'next'
import './globals.css'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Taylor Maison — Creative, Brand, Website, and AI Consulting',
  description:
    'Creative direction, brand consulting, websites, and AI workflow support.',
  openGraph: {
    title: 'Taylor Maison',
    description:
      'Creative direction, brand consulting, websites, and AI workflow support.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&f[]=satoshi@300,400,500,700,900&display=swap"
        />
      </head>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
