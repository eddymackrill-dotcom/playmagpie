import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'

const eligibleCasinos = casinos.filter((c) => casinoAcceptsCountry(c, 'sweden'))

// Build a strip card from a Casino, same helper pattern as the dynamic
// /country/[slug] route. Sweden is a static segment because of the rich
// Spellag + tax-context content but its strip logic mirrors the dynamic
// route exactly.
function buildSwedenCard(casino: Casino): CTAStripCard {
  const cryptoCount = casino.acceptedCryptos.includes('100+ more')
    ? '100+'
    : `${casino.acceptedCryptos.length}`
  return {
    slug: casino.slug,
    facts: [
      { label: 'Withdrawal', value: casino.withdrawalTime },
      { label: 'KYC', value: casino.kycLevel },
      { label: 'Cryptos', value: `${cryptoCount} accepted` },
    ],
  }
}

const SWEDEN_STRIP_CARDS: CTAStripCard[] = [...eligibleCasinos]
  .sort((a, b) => b.trustScore - a.trustScore)
  .slice(0, 3)
  .map(buildSwedenCard)

export const metadata: Metadata = {
  title: 'Best Crypto Casinos in Sweden 2026: Spelinspektionen, On-Ramps & Tax',
  description:
    'Crypto casinos for Swedish players in 2026. Spellag one-bonus rule, Spelinspektionen channelisation 72–82% online casino, Safello MiCA-CASP, BTCX, Trijo on-ramping.',
  alternates: { canonical: '/country/sweden' },
  openGraph: {
    url: '/country/sweden',
    title: 'Best Crypto Casinos in Sweden 2026',
    description:
      'Crypto casinos for Swedish players: Spellag licensing, Spelinspektionen channelisation, on-ramps via Safello / BTCX / Trijo, and the Inkomstskattelagen tax position.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Casinos in Sweden 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos in Sweden 2026',
    description: 'Spellag licensing, Spelinspektionen channelisation, Safello/BTCX/Trijo on-ramps, and the tax position.',
    images: ['/og-image.png'],
  },
}

// Sourced from verified facts in lib/casinos.ts acceptedCryptos lists.
// "-" = not listed. ✓ = listed in acceptedCryptos.
const CRYPTO_MATRIX_COLUMNS = ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'LTC', 'XRP'] as const

function casinoAccepts(slug: string, symbol: string): boolean {
  const casino = casinos.find((c) => c.slug === slug)
  if (!casino) return false
  return casino.acceptedCryptos.some((c) => c.toUpperCase() === symbol.toUpperCase())
}

const faqs = [
  {
    question: 'Is it legal for Swedish residents to play at offshore crypto casinos?',
    answer: 'Swedish residents are not prohibited from playing at offshore casinos under current law: the Gambling Act (Spellag 2018:1138) regulates operators offering to the Swedish market, not players. Offshore operators marketing to Swedish residents without a Spelinspektionen licence are outside the Spellag framework but remain commercially accessible. The practical friction is on the payment side (bank-flagging of gambling MCC transactions), which is exactly why crypto has become the dominant funding route.',
  },
  {
    question: 'Are offshore crypto casino winnings taxable in Sweden?',
    answer: 'Under Inkomstskattelagen 8 kap. § 3, gambling winnings are tax-exempt when the operator either holds a Swedish licence or is established within the EEA without needing one. Most Curaçao-licensed offshore crypto casinos sit outside the EEA, meaning winnings from them technically fall outside the carve-out and are taxable as income. The crypto disposal itself is a separate capital-income event under Swedish rules.',
  },
  {
    question: 'How does Spelpaus.se affect offshore play?',
    answer: 'Spelpaus.se is Sweden\'s national self-exclusion register operated by Spelinspektionen. Every Spelinspektionen-licensed operator must screen players against Spelpaus at every login. Offshore Curaçao-licensed operators are outside that obligation. They don\'t consult Spelpaus by default. Per Spelinspektionen\'s 2024 channelisation report, 23% of players who turned to unlicensed sites cited Spelpaus blocking as a reason.',
  },
  {
    question: 'Why are Swedish licensed operators limited to one bonus per player?',
    answer: 'Spellag 14 kap. § 9 restricts each licensee to offering only one bonus per player across their entire relationship. The bonus must be offered on the first occasion the player plays. The policy was introduced in 2019 as a player-protection measure to prevent ongoing bonus-driven engagement. It applies only to Spelinspektionen-licensed operators; offshore casinos are not bound by it, which is one structural reason their welcome offers (Mirax up to 5 BTC + 150 spins across 4 deposits, BitStarz 5 BTC + 180 spins, BC.Game 220% Deposit Rakeback Welcome across 4 monthly stages) significantly exceed what licensed Swedish operators can offer.',
  },
  {
    question: 'Which Swedish exchange should I use to buy crypto for casino deposits?',
    answer: 'Safello is the most directly Swedish-regulated option: Finansinspektionen granted it MiCA Crypto-Asset Service Provider authorisation in October 2025, the first Swedish CASP issuance. BTCX (operated by Goobit AB) and Trijo (Ijort Invest AB) continue under the transitional VASP regime while their MiCA applications are processed. Coinbase and Kraken also serve Swedish retail through their EU entities. For SEK-to-crypto on-ramping with the strongest current regulatory standing, Safello is the cleanest default.',
  },
  {
    question: 'Do any of the casinos PlayMagpie reviews restrict Swedish players?',
    answer: 'None of the seven reviewed casinos list Sweden in their restricted-countries terms. Restrictions seen are typically US, UK, AU, NL and FR. That doesn\'t guarantee active Swedish account acceptance at every cashier (operator policy can be more granular than published lists suggest); verify on the operator\'s own terms before depositing.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casinos by Country', item: 'https://www.playmagpie.com/country' },
    { '@type': 'ListItem', position: 3, name: 'Sweden', item: 'https://www.playmagpie.com/country/sweden' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function SwedenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/country" className="hover:text-white transition-colors">Country</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Sweden</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">SEK · Sweden</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos in Sweden 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Swedish online gambling sits in a licensed-but-restrictive regime. Spelinspektionen&apos;s tight rules push
            a meaningful share of activity offshore. The 2024 channelisation data tells the story: 85% overall, just
            72–82% in the online casino segment. Most of that offshore activity routes through crypto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Online casino channelisation 2024', value: '72–82%', sub: 'Spelinspektionen, vs 90% target' },
            { label: 'First Swedish MiCA-CASP', value: 'Safello', sub: 'Finansinspektionen, Oct 2025' },
            { label: 'Casinos accepting SE accounts', value: '7 / 7', sub: 'None restrict Sweden in published terms' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <CasinoCTAStrip
          framing="Top 3 by trust score among operators accepting Swedish accounts (Roobet excluded: Sweden on its restricted list)."
          cards={SWEDEN_STRIP_CARDS}
        />

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">Sweden&apos;s licensed-but-restrictive regime</h2>
          <p className="text-[#888888] leading-relaxed">
            The Spelinspektionen-administered Spellag (2018:1138) opened a multi-licence market on 1 January 2019.
            Licensed operators face unusually tight rules: each licensee can offer only one bonus per player across
            their entire relationship under 14 kap. § 9 (the one-bonus rule), every Swedish-resident player is
            screened against the Spelpaus.se national self-exclusion register at each login, and various deposit and
            loss limits have applied at different points since the framework came into force.
          </p>
          <p className="text-[#888888] leading-relaxed">
            The result is a meaningful share of Swedish online activity routing offshore. Spelinspektionen&apos;s 2024
            channelisation report put the overall rate at 85% against the 90% policy target, with the online casino
            segment specifically estimated between 72% and 82%. For tax: gambling winnings are exempt under
            Inkomstskattelagen 8 kap. § 3 when the operator holds a Swedish licence or is established within the EEA
            without needing one. Winnings from operators licensed outside the EEA, which covers most Curaçao-licensed
            offshore crypto casinos, fall outside that carve-out and are technically subject to income tax. The crypto
            disposal itself is a separate capital-income event.
          </p>
          <p className="text-[#888888] leading-relaxed">
            Depositing specifically in Bitcoin? Our guide to the{' '}
            <Link href="/best-bitcoin-casino-sweden" className="text-[#7BB8D4] hover:underline font-medium">
              best Bitcoin casino in Sweden
            </Link>{' '}
            ranks the operators that accept Swedish players for BTC and digs into why the one-bonus rule makes
            offshore Bitcoin welcome packs so much larger than anything a licensed operator can offer.
          </p>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">SEK to crypto, then crypto to casino</h2>
          <p className="text-[#888888] leading-relaxed">
            Major Swedish banks (Swedbank, SEB, Nordea and Handelsbanken) routinely flag and sometimes reject card
            or SEPA payments tagged to gambling MCCs at known offshore operators. SEK-bank-transfer to offshore
            gambling isn&apos;t blocked as systematically as it is in Norway, but unreliable enough that crypto becomes
            the practical funding route for any sustained play.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Safello: first Swedish MiCA-CASP',
                body: 'Finansinspektionen granted Safello full Crypto-Asset Service Provider authorisation under MiCA in October 2025: the first Swedish issuance under the new framework. That makes Safello the most directly Swedish-regulated on-ramp in the market. SEK deposits via Swish, Trustly or bank transfer, crypto withdrawal on-chain to your chosen casino address.',
              },
              {
                title: 'BTCX (Goobit AB) and Trijo (Ijort Invest AB)',
                body: 'Both remain under the transitional VASP registration regime while their MiCA applications are processed. Both are FI-registered and operationally accessible. BTCX is one of Sweden\'s oldest crypto businesses (operating since 2012); Trijo trades under GreenMerc and offers Swish-funded SEK-to-crypto conversion. Either works as an on-ramp; Safello holds the stronger current regulatory standing.',
              },
              {
                title: 'Stablecoins matter more for SEK players',
                body: 'SEK has higher volatility against USD than EUR-pegged currencies, which compounds the FX drift on the deposit. USDT or USDC removes the SEK-to-coin-to-casino conversion variability entirely. Your deposit value stays pegged to USD between sessions. For BTC or ETH deposits, expect to absorb both crypto-market and SEK-exchange-rate movement over your play window.',
              },
              {
                title: 'Network choice once you\'re on-chain',
                body: 'USDT on TRC-20 (Tron) is the most common deposit and withdrawal network at the casinos we review: sub-second confirmation and fees under $0.01. SOL is comparably fast where supported (BC.Game, Cloudbet, Shuffle, Duelbits). BTC works everywhere but carries the 10-minute-block-time and fee-volatility overhead. Match the network at deposit to your planned withdrawal coin.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Crypto support at each casino we review</h2>
          <p className="text-[#888888] text-sm mb-6">
            Verified from each casino&apos;s acceptedCryptos lineup. Pick the coin that matches your Safello / BTCX / Trijo on-ramp output.
            On-chain transfers from regulated Swedish exchanges to casino deposit addresses are the smoothest funding route.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Casino</th>
                  {CRYPTO_MATRIX_COLUMNS.map((col) => (
                    <th key={col} className="text-center px-3 py-3.5 text-[#888888] font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eligibleCasinos.map((casino, i) => (
                  <tr
                    key={casino.slug}
                    className={`border-b border-[#222222] last:border-0 hover:bg-[#1a1a1a]/60 transition-colors ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}
                  >
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/reviews/${casino.slug}`}
                        className="font-semibold text-[#f5f5f5] hover:text-[#7BB8D4] transition-colors text-sm"
                      >
                        {casino.name}
                      </Link>
                    </td>
                    {CRYPTO_MATRIX_COLUMNS.map((col) => (
                      <td key={col} className="text-center px-3 py-3.5 text-sm">
                        {casinoAccepts(casino.slug, col) ? (
                          <span className="text-[#7BB8D4]">✓</span>
                        ) : (
                          <span className="text-[#444444]">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#555555] text-xs mt-3">
            BC.Game also lists 100+ additional cryptocurrencies beyond this table. Other casinos may add coins not shown
            here. Full lists are in each casino&apos;s individual review.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">All Crypto Casinos Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Independent rankings. Every casino shown below accepts Swedish accounts under its published terms.
            Roobet is excluded here because Sweden sits on its restricted-territories list (roobet.com/terms §3.5);
            see the Roobet review for context. Verify acceptance before depositing in case any operator updates its
            terms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eligibleCasinos.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        <section className="mb-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-[#888888] text-sm mb-8">
            Common questions from Swedish residents researching offshore crypto casinos in 2026.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{faq.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/country/norway" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Norway crypto casinos</div>
              <div className="text-[#888888] text-sm">Nordic peer: Lottstift monopoly + Payment Act blocks</div>
            </Link>
            <Link href="/country/germany" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Germany crypto casinos</div>
              <div className="text-[#888888] text-sm">EU peer: GGL licensed regime with strict deposit caps</div>
            </Link>
            <Link href="/country/netherlands" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Netherlands crypto casinos</div>
              <div className="text-[#888888] text-sm">EU peer: 37.8% kansspelbelasting on all winnings</div>
            </Link>
          </div>
        </section>

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link
            href="/country"
            className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all countries
          </Link>
        </div>
      </div>
    </>
  )
}
