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
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
