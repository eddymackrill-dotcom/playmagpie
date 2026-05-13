import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: {
    default: 'PlayMagpie — Best Crypto Casinos 2026',
    template: '%s | PlayMagpie',
  },
  description:
    'Independent ratings for crypto casinos. Find the best platforms for fast withdrawals, no-KYC play, VIP rewards and big bonuses in 2026.',
  metadataBase: new URL('https://playmagpie.com'),
  openGraph: {
    type: 'website',
    siteName: 'PlayMagpie',
    title: 'PlayMagpie — Best Crypto Casinos 2026',
    description:
      'Independent ratings for crypto casinos. Find the best platforms for fast withdrawals, no-KYC play, VIP rewards and big bonuses in 2026.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PlayMagpie — Best Crypto Casinos Ranked',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@playmagpie',
    title: 'PlayMagpie — Best Crypto Casinos 2026',
    description:
      'Independent ratings for crypto casinos. Best platforms for fast withdrawals, no-KYC play and VIP rewards.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#e5e5e5] min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-9ZJ8WY3PS8" />
      </body>
    </html>
  )
}
