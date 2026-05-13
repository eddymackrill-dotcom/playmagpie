import type { Metadata } from 'next'
import { casinos, getTopCasinos } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import BonusBanner from '@/components/BonusBanner'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Crypto Casinos 2026 — Top Bitcoin & USDT Sites Ranked',
  description:
    'The best Bitcoin and crypto casinos ranked for 2026. Compare withdrawal speeds, bonus value and KYC requirements. Play with BTC, ETH, USDT, SOL and more.',
  alternates: {
    canonical: '/best-crypto-casinos',
  },
  openGraph: {
    url: '/best-crypto-casinos',
    title: 'Best Crypto Casinos 2026 — Top Bitcoin & USDT Sites Ranked',
    description:
      'The best Bitcoin and crypto casinos ranked for 2026. Compare withdrawal speeds, bonus value and KYC requirements.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos 2026 — Top Bitcoin & USDT Sites Ranked',
    description:
      'The best Bitcoin and crypto casinos ranked for 2026 — fast withdrawals, fair bonuses, minimal KYC.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Crypto Casinos', item: 'https://playmagpie.com/best-crypto-casinos' },
  ],
}

export default function BestCryptoCasinosPage() {
  const top = getTopCasinos(5)
  const cryptoFocused = casinos.filter((c) => c.acceptedCryptos.length >= 4)

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
          <span className="text-[#f5f5f5]">Best Crypto Casinos</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos in 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            We&apos;ve ranked the top Bitcoin and crypto casinos by withdrawal speed, bonus value, KYC friction and
            platform trust. Every score is independent — no paid rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Casinos Reviewed', value: `${casinos.length}` },
            { label: 'Fastest Withdrawal', value: 'Instant' },
            { label: 'Max Welcome Bonus', value: '$10,000' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#888888] text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Crypto Casino Comparison Table</h2>
          <CasinoComparisonTable casinos={top} />
        </section>

        <BonusBanner
          casinoName="BitStarz"
          bonusText="Up to 5 BTC + 180 Free Spins Welcome Package"
          affiliateUrl="https://bzstarz2.com/bcdvryve8"
          subtext="T&Cs apply · 18+ · Gamble responsibly"
        />

        <TopRatedSection
          title="Top Crypto Casino Cards"
          subtitle="Detailed at-a-glance stats for each platform"
          casinos={cryptoFocused}
        />

        <section className="mt-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">
            What Makes a Great Crypto Casino?
          </h2>
          <div className="text-[#888888] space-y-4 text-sm leading-relaxed">
            <p>
              The best crypto casinos combine fast on-chain withdrawals with competitive bonuses and low account
              friction. A casino that requires full KYC verification will always lose ground to one that lets you
              sign up, deposit and play in five minutes flat.
            </p>
            <p>
              Our ranking methodology weighs four key factors: withdrawal speed (how quickly crypto actually hits
              your wallet), bonus fairness (wagering requirements, game contributions and caps), KYC friction
              (how much verification is required and when), and platform trust (licence quality, reputation and
              provable fairness).
            </p>
            <p>
              For crypto players specifically, we also look at how many coins are supported, whether the casino
              uses low-fee chains like TRX or SOL, and whether deposits and withdrawals are processed natively or
              converted to fiat in the background.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Full Bitcoin Casino Reviews</h2>
          <p className="text-[#888888] text-sm mb-5">
            Read our in-depth review for each crypto casino — withdrawal times, bonus terms, KYC requirements and full scores.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {casinos.map((casino) => (
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
                <p className="text-[#888888] text-xs">{casino.withdrawalTime} · {casino.kycLevel} KYC</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Explore by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Sub-15-minute crypto payouts verified</div>
            </Link>
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Play without identity documents</div>
            </Link>
            <Link href="/high-roller-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">High Roller Casinos</div>
              <div className="text-[#888888] text-sm">VIP programmes and big limits</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
