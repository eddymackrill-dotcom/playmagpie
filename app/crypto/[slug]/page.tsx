import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CRYPTO_LIST } from '@/lib/programmatic'
import { casinos, type Casino } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'

export async function generateStaticParams() {
  return CRYPTO_LIST.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  props: PageProps<'/crypto/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const crypto = CRYPTO_LIST.find((c) => c.slug === slug)
  if (!crypto) return {}
  const title = `Best ${crypto.name} Casinos 2026 — PlayMagpie`
  const description = `Top crypto casinos accepting ${crypto.name}. Compare bonuses, withdrawal times and fees.`
  return {
    title,
    description,
    alternates: { canonical: `/crypto/${crypto.slug}` },
    openGraph: {
      url: `/crypto/${crypto.slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  }
}

const intros: Record<string, string> = {
  BTC: 'Bitcoin remains the most universally accepted cryptocurrency at online casinos, supported by every serious crypto platform on the market. Depositing in BTC gives you access to the widest possible range of operators, the most generous welcome bonuses, and the deepest game libraries. The trade-offs are familiar: block confirmation times average 10 minutes and can stretch significantly during periods of mempool congestion, and BTC price volatility means the dollar value of your bankroll changes constantly between sessions. For players who already hold Bitcoin as a long-term position, gambling with BTC avoids conversion overhead. For players acquiring crypto specifically to gamble, faster stablecoin alternatives may be more practical, but BTC remains the default choice when maximum casino availability matters.',
  ETH: 'Ethereum is the second most widely accepted cryptocurrency at major crypto casinos and a reliable backup when faster networks are unavailable. ETH confirmations typically complete in 15 to 30 seconds, making it dramatically faster than Bitcoin for both deposits and withdrawals. The main consideration with Ethereum is gas fees, which fluctuate with network demand and can climb to $5 to $30 per transaction during peak congestion. For larger, infrequent transactions this is manageable; for routine smaller withdrawals, the fee structure becomes meaningful. Most top-tier crypto casinos including BitStarz, BC.Game, Cloudbet, Mirax and 7Bit Casino accept ETH alongside their broader stablecoin and altcoin support, and welcome bonuses are typically denominated equivalently across coins.',
  USDT: 'USDT (Tether) is the most practical gambling cryptocurrency available in 2026, particularly on the TRC-20 (Tron) network. As a stablecoin pegged 1:1 to the US dollar, USDT eliminates the bankroll volatility that comes with BTC or ETH — a $500 USDT deposit is worth $500 when you withdraw, regardless of what crypto markets do between sessions. On TRC-20, confirmations complete in under three seconds with fees consistently below $0.01. Every major crypto casino accepts USDT, often across multiple networks (TRC-20, ERC-20, and increasingly Solana). For players who want fast, cheap, predictable transactions and a fixed-dollar bankroll, USDT on TRC-20 is the recommended default.',
  USDC: 'USD Coin (USDC) is the second-largest stablecoin and offers the same dollar-pegged stability as USDT with stronger regulatory positioning. Issued by Circle and audited monthly, USDC is favoured by players who want stablecoin stability with greater counterparty transparency. USDC is supported across Ethereum, Solana, Polygon and several other networks; on Solana it confirms in under a second with negligible fees. Casino acceptance has expanded rapidly — BC.Game, Cloudbet and Shuffle all support USDC deposits and withdrawals. For US-friendlier platforms or players with concerns about USDT reserves, USDC is the natural alternative and delivers comparable speed and cost characteristics.',
  LTC: 'Litecoin (LTC) is one of the longest-established cryptocurrencies and remains widely accepted at crypto casinos. Block times average 2.5 minutes — four times faster than Bitcoin — making it a reliable middle-ground option for players who want non-stablecoin exposure without BTC-level confirmation delays. Network fees are consistently low, typically under $0.05 per transaction. LTC is supported by BitStarz, BC.Game, Cloudbet, Mirax, 7Bit and most other major crypto casinos. Welcome bonuses are usually offered in BTC-equivalent terms, so LTC depositors receive proportionally matched amounts. For players who prefer a proof-of-work coin with a long track record and faster settlement than Bitcoin, Litecoin remains a solid choice.',
  DOGE: 'Dogecoin (DOGE) is accepted at the majority of major crypto casinos and offers fast, cheap transactions with confirmation times around one minute. DOGE has built a large, active community and has become a legitimate payment option at platforms including BitStarz, BC.Game, Mirax Casino and 7Bit. Network fees are negligible and confirmation speeds are competitive with Litecoin. The main caveat with DOGE is price volatility — it tends to move on sentiment and social media trends, making it less stable than purpose-built stablecoins for bankroll management. For players who hold DOGE and want to use it directly at casinos, the option is well supported; for players choosing a coin specifically for gambling, stablecoins or faster networks are usually the better pick.',
  SOL: 'Solana (SOL) has become the premier high-performance blockchain for crypto gambling since 2024. Sub-second confirmation finality and fees consistently under $0.001 make it theoretically the fastest on-chain option available. Casino adoption has accelerated rapidly — BC.Game, Cloudbet and Shuffle all support native SOL deposits and withdrawals, and many platforms now offer USDC and USDT on the Solana network as well. The main consideration is that not every crypto casino has added SOL support yet, though the gap is closing each quarter. For players prioritising speed and minimal fees, SOL is now competitive with TRC-20 USDT and often faster.',
  BNB: 'BNB (Binance Coin) is supported at a growing number of crypto casinos and offers fast confirmation times on the BNB Smart Chain with consistently low fees, typically under $0.20 per transaction. BC.Game, Cloudbet, Shuffle and 7Bit Casino all accept BNB deposits and withdrawals. BNB is most useful for players already holding it from Binance exchange usage or DeFi positions, as it avoids conversion overhead. Casino acceptance is narrower than BTC, ETH or USDT, so always verify your chosen platform supports BNB before depositing. For players within the Binance ecosystem, BNB deposits are a convenient option with minimal friction.',
}

function casinoAcceptsCrypto(casino: Casino, symbol: string): boolean {
  return casino.acceptedCryptos.some((c) => c.toUpperCase() === symbol.toUpperCase())
}

export default async function CryptoPage(props: PageProps<'/crypto/[slug]'>) {
  const { slug } = await props.params
  const crypto = CRYPTO_LIST.find((c) => c.slug === slug)
  if (!crypto) notFound()

  const matching = casinos.filter((c) => casinoAcceptsCrypto(c, crypto.symbol))
  const intro = intros[crypto.symbol] ?? ''

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: `${crypto.name} Casinos`, item: `https://playmagpie.com/crypto/${crypto.slug}` },
    ],
  }

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
          <span className="text-[#f5f5f5]">{crypto.name} Casinos</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">{crypto.symbol}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best {crypto.name} Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Top crypto casinos accepting {crypto.name}. Compare bonuses, withdrawal times and fees.
          </p>
        </div>

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">Gambling with {crypto.name}</h2>
          <p className="text-[#888888] leading-relaxed">{intro}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            {matching.length} {crypto.name} {matching.length === 1 ? 'Casino' : 'Casinos'} Ranked
          </h2>
          <p className="text-[#888888] text-sm mb-6">
            Every platform below accepts {crypto.symbol} for deposits and withdrawals.
          </p>
          {matching.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {matching.map((casino, i) => (
                <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
              ))}
            </div>
          ) : (
            <p className="text-[#888888]">No casinos in our index currently support {crypto.name} natively.</p>
          )}
        </section>

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link
            href="/best-crypto-casinos"
            className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to crypto list
          </Link>
        </div>
      </div>
    </>
  )
}
