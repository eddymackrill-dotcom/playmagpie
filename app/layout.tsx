import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import AffiliateClickTracker from '@/components/AffiliateClickTracker'
import { casinos } from '@/lib/casinos'

// hostname -> operator slug for the outbound-click tracker. Computed here
// (server side) from lib/casinos.ts so the catalogue stays the single
// source of truth and its 30KB+ module never enters the client bundle.
const AFFILIATE_OPERATORS_BY_HOST: Record<string, string> = Object.fromEntries(
  casinos.map((c) => [new URL(c.affiliateUrl).hostname.replace(/^www\./, ''), c.slug])
)

export const metadata: Metadata = {
  title: {
    default: 'PlayMagpie: Best Crypto Casinos 2026',
    template: '%s | PlayMagpie',
  },
  description:
    'Independent ratings for crypto casinos. Find the best platforms for fast withdrawals, no-KYC play, VIP rewards and big bonuses in 2026.',
  metadataBase: new URL('https://www.playmagpie.com'),
  openGraph: {
    type: 'website',
    siteName: 'PlayMagpie',
    title: 'PlayMagpie: Best Crypto Casinos 2026',
    description:
      'Independent ratings for crypto casinos. Find the best platforms for fast withdrawals, no-KYC play, VIP rewards and big bonuses in 2026.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PlayMagpie: Best Crypto Casinos Ranked',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@playmagpie',
    title: 'PlayMagpie: Best Crypto Casinos 2026',
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
        <AffiliateClickTracker operatorsByHost={AFFILIATE_OPERATORS_BY_HOST} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
