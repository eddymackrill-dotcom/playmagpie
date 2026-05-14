import type { Metadata } from 'next'
import Link from 'next/link'
import { CRYPTO_LIST } from '@/lib/programmatic'

export const metadata: Metadata = {
  title: 'Crypto Casinos by Currency — PlayMagpie',
  description:
    'Browse the best crypto casinos by cryptocurrency. Bitcoin, Ethereum, USDT, Solana and more.',
  alternates: { canonical: '/crypto' },
  openGraph: {
    url: '/crypto',
    title: 'Crypto Casinos by Currency — PlayMagpie',
    description:
      'Browse the best crypto casinos by cryptocurrency. Bitcoin, Ethereum, USDT, Solana and more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casinos by Currency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casinos by Currency — PlayMagpie',
    description:
      'Browse the best crypto casinos by cryptocurrency. Bitcoin, Ethereum, USDT, Solana and more.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casinos by Currency', item: 'https://www.playmagpie.com/crypto' },
  ],
}

const cryptoDescriptions: Record<string, string> = {
  BTC: 'The original cryptocurrency and most widely accepted. Universal casino support, with 10-minute average confirmations.',
  ETH: 'Fast 15–30 second confirmations and broad casino acceptance. Gas fees vary with network demand.',
  USDT: 'Dollar-pegged stablecoin. On TRC-20 it is the fastest, cheapest and most predictable gambling currency available.',
  USDC: 'Regulated dollar-pegged stablecoin. Same speed and cost benefits as USDT with stronger reserve transparency.',
  LTC: 'Faster than Bitcoin with 2.5-minute blocks and consistently low fees. Long track record, widely accepted.',
  DOGE: 'Fast one-minute confirmations and negligible fees. Accepted at most major crypto casinos.',
  SOL: 'Sub-second finality and sub-cent fees. The fastest on-chain option available where supported.',
  BNB: 'BNB Smart Chain offers fast, low-fee transactions. Strong fit for players already in the Binance ecosystem.',
}

export default function CryptoHubPage() {
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
          <span className="text-[#f5f5f5]">Crypto Casinos by Currency</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Crypto Casinos by Currency</h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            The cryptocurrency you deposit shapes everything that follows — withdrawal speed, network fees,
            bankroll stability and how many casinos you can choose from.
          </p>
        </div>

        <section className="mb-12 prose prose-invert max-w-none">
          <p className="text-[#888888] leading-relaxed">
            Not every crypto casino supports every coin, and the trade-offs between currencies matter more than
            most players realise. Bitcoin gives you the widest possible choice of platforms but ties your bankroll
            to BTC price movements between sessions. Stablecoins like USDT and USDC eliminate that volatility,
            letting you gamble in fixed dollar terms. Networks like Solana and Tron (for TRC-20 USDT) offer
            near-instant confirmations and fees under a cent — dramatically faster than Bitcoin or Ethereum for
            both deposits and withdrawals. Litecoin and Dogecoin sit in the middle: faster than BTC, more
            volatile than stablecoins, and accepted at most major platforms. Browse by your preferred currency
            below to see which casinos accept it, how the welcome bonuses compare, and what to expect from
            withdrawal times. Every casino listed is independently scored — no paid placements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Choose a Cryptocurrency</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CRYPTO_LIST.map((crypto) => (
              <Link
                key={crypto.slug}
                href={`/crypto/${crypto.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-lg">
                    {crypto.name}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#7BB8D4]/10 text-[#7BB8D4] border border-[#7BB8D4]/20">
                    {crypto.symbol}
                  </span>
                </div>
                <p className="text-[#888888] text-sm leading-relaxed">
                  {cryptoDescriptions[crypto.symbol] ?? `Browse the best casinos accepting ${crypto.name}.`}
                </p>
                <div className="mt-4 text-xs text-[#555555] group-hover:text-[#7BB8D4] transition-colors">
                  View {crypto.symbol} casinos →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Full rankings across every category</div>
            </Link>
            <Link href="/guides/best-crypto-for-gambling-2026" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Best Crypto for Gambling 2026</div>
              <div className="text-[#888888] text-sm">Which cryptocurrency to actually use, and why</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
