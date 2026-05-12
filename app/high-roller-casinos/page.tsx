import type { Metadata } from 'next'
import { casinos } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import BonusBanner from '@/components/BonusBanner'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best High Roller Crypto Casinos 2026 — VIP Platforms',
  description:
    'The best VIP and high-roller crypto casinos for 2026. Massive welcome bonuses, dedicated account managers, elite cashback and the highest withdrawal limits.',
  alternates: {
    canonical: '/high-roller-casinos',
  },
  openGraph: {
    url: '/high-roller-casinos',
    title: 'Best High Roller Crypto Casinos 2026 — VIP Platforms',
    description:
      'The best VIP and high-roller crypto casinos for 2026. Dedicated hosts, elite cashback and the highest withdrawal limits.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best High Roller Crypto Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best High Roller Crypto Casinos 2026 — VIP Platforms',
    description: 'Top VIP and high-roller crypto casinos ranked — massive bonuses, dedicated hosts and no withdrawal limits.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'High Roller Casinos', item: 'https://playmagpie.com/high-roller-casinos' },
  ],
}

export default function HighRollerPage() {
  const vipCasinos = casinos.filter((c) => c.vipProgram)
  const topVip = casinos.find((c) => c.badges.includes('High Roller'))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">High Roller Casinos</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">👑 VIP & High Roller</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best High Roller Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Platforms built for serious players. Massive welcome bonuses, dedicated VIP hosts, elite cashback
            and the highest withdrawal limits in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Max Welcome Bonus', value: '5 BTC', sub: 'Cloudbet' },
            { label: 'No Withdrawal Limits', value: '✓', sub: 'Cloudbet VIP' },
            { label: 'VIP Casinos Listed', value: `${vipCasinos.length}`, sub: 'With active programmes' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {topVip && (
          <BonusBanner
            casinoName={topVip.name}
            bonusText={topVip.bonusSummary}
            affiliateUrl={topVip.affiliateUrl}
            subtext="Exclusive high-roller offer — limited availability"
          />
        )}

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-6">VIP Casino Comparison</h2>
          <CasinoComparisonTable casinos={vipCasinos} />
        </section>

        <TopRatedSection
          title="Top VIP Casino Platforms"
          subtitle="Rated on cashback value, limit sizes, support quality and exclusivity"
          casinos={vipCasinos.slice(0, 3)}
        />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">What to Look for in a VIP Casino</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '💰',
                title: 'Cashback Rates',
                body: 'Top VIP programmes offer 10–25% weekly cashback with no wagering requirements. Anything below 5% is barely worth the tier grind.',
              },
              {
                icon: '🏆',
                title: 'Dedicated Account Management',
                body: 'The best platforms assign a personal host from Level 3 or Platinum tier upward — direct phone or Telegram access, faster withdrawals, bespoke offers.',
              },
              {
                icon: '📈',
                title: 'High Limits',
                body: 'Standard limits won\'t cut it for high rollers. Look for platforms offering $100k+ single-bet limits and no daily withdrawal caps for VIP members.',
              },
              {
                icon: '🎪',
                title: 'Exclusive Events',
                body: 'The top tier of high-roller programmes includes luxury event invitations, sports hospitality and leaderboard tournaments with six-figure prize pools.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">High Roller Casino Reviews</h2>
          <p className="text-[#888888] text-sm mb-5">
            Read our full reviews for each VIP casino — bonus terms, cashback rates, withdrawal limits and VIP tier details.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vipCasinos.map((casino) => (
              <Link
                key={casino.slug}
                href={`/reviews/${casino.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors">
                    {casino.name}
                  </span>
                  <span className="text-[#7BB8D4] font-bold text-sm">{casino.trustScore}/10</span>
                </div>
                <p className="text-[#888888] text-xs">{casino.bonusSummary.slice(0, 60)}…</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Critical for high-stakes play</div>
            </Link>
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Full rankings across all categories</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
