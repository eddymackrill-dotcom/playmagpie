import type { Metadata } from 'next'
import { casinos, getFeaturedCasinos, getTopCasinos } from '@/lib/casinos'
import HeroSection from '@/components/HeroSection'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import BonusBanner from '@/components/BonusBanner'
import CTAButton from '@/components/CTAButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Crypto Casinos 2026 — Fast Withdrawals Ranked',
  description:
    'PlayMagpie ranks the best crypto casinos for 2026 — fast withdrawals, fair bonuses, no-KYC options and VIP rewards. Independent scores, no paid placements.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: 'Best Crypto Casinos 2026 — Fast Withdrawals Ranked',
    description:
      'PlayMagpie ranks the best crypto casinos for 2026 — fast withdrawals, fair bonuses, no-KYC options and VIP rewards.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Casinos 2026 — PlayMagpie' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos 2026 — Fast Withdrawals Ranked',
    description: 'Independent rankings of the best crypto casinos for fast withdrawals, bonuses and no-KYC play.',
    images: ['/og-image.png'],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PlayMagpie',
  url: 'https://playmagpie.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://playmagpie.com/best-crypto-casinos?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlayMagpie',
  url: 'https://playmagpie.com',
  logo: 'https://playmagpie.com/magpie-logo.png',
  description:
    'Independent affiliate review site rating crypto casinos on withdrawal speed, bonus fairness, KYC friction and platform trust.',
  sameAs: [],
}

const features = [
  {
    icon: '⚡',
    title: 'Fast Withdrawals',
    desc: 'We track real payout times. Only casinos that clear crypto in under 2 hours make our top lists.',
    href: '/fast-withdrawal-casinos',
  },
  {
    icon: '₿',
    title: 'Crypto Support',
    desc: 'BTC, ETH, USDT, SOL and more. We score how many chains each casino supports and how fast they process.',
    href: '/best-crypto-casinos',
  },
  {
    icon: '👑',
    title: 'VIP Rewards',
    desc: 'From cashback to personal hosts — we break down which VIP programmes actually deliver for high-volume players.',
    href: '/high-roller-casinos',
  },
  {
    icon: '🎁',
    title: 'Big Bonuses',
    desc: 'We cut through the marketing spin and score every bonus on wagering requirements, caps and real value.',
    href: '/best-crypto-casinos',
  },
  {
    icon: '🔓',
    title: 'No-KYC Options',
    desc: 'Play with privacy. We rank platforms by how little personal information they actually require.',
    href: '/no-kyc-casinos',
  },
  {
    icon: '📱',
    title: 'Mobile Ready',
    desc: 'Every casino on our list is tested on mobile. No app required — browser-based play that works.',
    href: '/best-crypto-casinos',
  },
]

export default function HomePage() {
  const featured = getFeaturedCasinos()
  const top = getTopCasinos(6)
  const topCasino = top[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />

        {/* Comparison Table */}
        <section className="py-10">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#f5f5f5]">Top Crypto Casinos 2026</h2>
              <p className="text-[#888888] text-sm mt-1.5">Ranked by trust score — updated regularly</p>
            </div>
            <CTAButton href="/best-crypto-casinos" label="See All" variant="outline" size="sm" />
          </div>
          <CasinoComparisonTable casinos={top} />
        </section>

        {/* Featured Bonus Banner */}
        {topCasino && (
          <BonusBanner
            casinoName={topCasino.name}
            bonusText={topCasino.bonusSummary}
            affiliateUrl={topCasino.affiliateUrl}
            subtext="Limited time — check site for full T&Cs"
          />
        )}

        {/* Featured Cards */}
        <TopRatedSection
          title="Featured Crypto Casinos"
          subtitle="Our top picks for 2026 — fast payouts, strong bonuses, minimal friction"
          casinos={featured}
          viewAllHref="/best-crypto-casinos"
          viewAllLabel="All Crypto Casinos"
        />

        {/* Feature Grid */}
        <section className="py-14">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-2">What We Rate Casinos On</h2>
            <p className="text-[#888888] text-sm max-w-xl mx-auto">
              Every casino on PlayMagpie is scored across six key categories. No paid placements, no sponsored results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-6 transition-all group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-[#f5f5f5] font-semibold mb-2 group-hover:text-[#7BB8D4] transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Category CTAs */}
        <section className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-7">
              <h3 className="text-[#f5f5f5] font-bold text-lg mb-2">Instant Withdrawal Casinos</h3>
              <p className="text-[#888888] text-sm mb-5">
                Only casinos with sub-15-minute crypto payouts. Real times, verified by our team.
              </p>
              <CTAButton href="/fast-withdrawal-casinos" label="View Fastest Casinos" variant="outline" size="sm" />
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-7">
              <h3 className="text-[#f5f5f5] font-bold text-lg mb-2">VIP & High Roller Casinos</h3>
              <p className="text-[#888888] text-sm mb-5">
                Dedicated hosts, massive limits, luxury cashback. Platforms built for serious players.
              </p>
              <CTAButton href="/high-roller-casinos" label="View VIP Casinos" variant="outline" size="sm" />
            </div>
          </div>
        </section>

        {/* Top No-KYC Section */}
        <TopRatedSection
          title="Top No-KYC Casinos"
          subtitle="Play instantly — no identity verification, no friction"
          casinos={casinos.filter((c) => c.kycLevel === 'None').slice(0, 3)}
          viewAllHref="/no-kyc-casinos"
          viewAllLabel="All No-KYC Casinos"
        />

        {/* Individual Casino Reviews */}
        <section className="py-10">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-[#f5f5f5]">Bitcoin Casino Reviews</h2>
            <p className="text-[#888888] text-sm mt-1.5">
              In-depth reviews covering bonuses, withdrawal times, KYC requirements and trust scores
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {casinos.map((casino) => (
              <Link
                key={casino.slug}
                href={`/reviews/${casino.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors">
                    {casino.name} Review
                  </span>
                  <span className="text-[#7BB8D4] font-bold text-sm">{casino.trustScore}/10</span>
                </div>
                <p className="text-[#888888] text-xs leading-relaxed">
                  {casino.withdrawalTime} · {casino.kycLevel} KYC · {casino.bonusSummary.slice(0, 45)}…
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
