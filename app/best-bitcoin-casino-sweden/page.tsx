import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for Sweden. Differentiated from /country/sweden (multi-coin hub, which
// leads on channelisation + on-ramp matrix) by a commercial BTC spine: a Spelinspektionen-licensed
// operator can legally offer a Swedish player only ONE bonus across the entire relationship
// (Spellag 14 kap. § 9), whereas the offshore BTC welcome packs run across four deposits. That
// bonus asymmetry, denominated in Bitcoin, is the page's load-bearing argument, paired with the
// honest outside-EEA winnings-tax caveat. Roobet is filtered out (Sweden on its restricted list).
// Facts reused from verified countryContext.sweden in app/country/[slug]/page.tsx and the
// app/country/sweden static page (verified May 2026): Spellag 2018:1138, 14 kap. § 9 one-bonus
// rule, channelisation 72-82% online, Inkomstskattelagen 8 kap. § 3, Safello MiCA-CASP Oct 2025.
// Welcome-pack figures from lib/casinos.ts bonusSummary fields.

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino Sweden 2026: Why Offshore BTC Bonuses Win',
  description:
    'Swedish licensees can offer one bonus per player for life (Spellag 14 kap. § 9). Offshore Bitcoin casinos run four-deposit welcome packs. The reviewed casinos accepting Swedish BTC players, ranked, with the Safello on-ramp and the EEA tax line.',
  alternates: { canonical: '/best-bitcoin-casino-sweden' },
  openGraph: {
    url: '/best-bitcoin-casino-sweden',
    title: 'Best Bitcoin Casino Sweden 2026',
    description:
      "Sweden's one-bonus rule is why offshore Bitcoin welcome packs dwarf licensed offers. Reviewed casinos accepting Swedish BTC players, ranked, with on-ramps and the tax position.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Bitcoin Casino Sweden 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bitcoin Casino Sweden 2026',
    description: "Why offshore BTC bonuses beat Swedish-licensed ones (the one-bonus rule). Reviewed casinos accepting Swedish BTC players, ranked.",
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Bitcoin Casino Sweden', item: 'https://www.playmagpie.com/best-bitcoin-casino-sweden' },
  ],
}

// BTC-cashier notes per casino, Sweden-framed, with the welcome-pack angle foregrounded
// because that is this page's spine. Facts from lib/casinos.ts.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz carries the headline four-deposit pack: up to 5 BTC plus 180 free spins, the kind of multi-deposit structure a Swedish-licensed operator cannot legally offer. Sub-10-minute BTC payouts and a decade of awards behind it. The catch to read first is the 25% admin fee on bonus-related withdrawals.',
  'bc-game':
    'BC.Game runs a 220% Deposit Rakeback Welcome across four monthly stages, no KYC at any size, and a $5 minimum. For a Swedish player who values an unlimited bonus relationship (the opposite of the licensed one-bonus cap) plus the widest coin support, it is the strongest structural fit.',
  '7bit-casino':
    '7Bit pairs a 325% match up to €5,400 plus 250 free spins with continuous weekly reloads, no KYC on crypto withdrawals, and instant-to-10-minute BTC clearing. The reload cadence is itself something a Swedish licensee cannot replicate under the one-bonus rule.',
  cloudbet:
    'Cloudbet is the Swedish high-roller pick: a 5 BTC welcome bonus, no withdrawal limits, and a deposit minimum quoted in Bitcoin (0.001 BTC equivalent). Dual Curaçao plus Kahnawake licensing and a best-in-class crypto sportsbook.',
  'mirax-casino':
    'Mirax spreads up to 5 BTC plus 150 free spins across four deposits (100 spins on D1, 50 on D2, cash-only D3 and D4), with instant-to-15-minute BTC payouts and light KYC only above higher thresholds. The free-spin winnings carry a €100 max cashout, worth knowing before you lean on them.',
  duelbits:
    'Duelbits is the fastest at under 5 minutes and runs a cashback-first model (up to $30 weekly) rather than a headline match, which for an active Swedish player can beat a high-wagering welcome bonus on real expected value. No KYC for standard crypto play.',
  shuffle:
    'Shuffle adds a 100% match up to $1,000 plus SHFL token rakeback on Bitcoin play, instant-to-10-minute clearing across most networks. Note the 35x wagering on the welcome offer (above average) and that it must be activated via live chat.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoSwedenPage() {
  // casinoAcceptsCountry(c, 'sweden') filters out Roobet (Sweden is on its restricted list,
  // matched by full country name), leaving seven eligible operators.
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'sweden') && casinoAcceptsBTC(c))
    .sort((a, b) => b.trustScore - a.trustScore)
  const top = eligible[0]

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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino Sweden</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · Sweden · SEK</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Bitcoin Casino Sweden 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            A Swedish-licensed casino is allowed to give you exactly one bonus, ever. That is not a marketing
            choice, it is the law: Spellag 14 kap. § 9 caps each licensee at a single bonus per player for the
            whole relationship. Offshore Bitcoin casinos are not bound by it, which is why their four-deposit
            welcome packs look so much larger. Here are the seven reviewed casinos that accept Swedish players
            for BTC, ranked, with the SEK on-ramp and the tax line that comes with playing outside the EEA.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting Sweden" value={`${eligible.length}`} sub="of 8 (Roobet restricts SE)" />
          <Stat label="Licensed bonus cap" value="1 / player" sub="Spellag 14 kap. § 9" />
          <Stat label="Online channelisation 2024" value="72–82%" sub="vs 90% target" />
          <Stat label="EEA winnings" value="Tax-exempt" sub="Outside-EEA: taxable" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">One bonus for life, or a four-deposit Bitcoin pack</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              The Spellag (2018:1138) opened a licensed Swedish market on 1 January 2019, but the rules on
              licensees are unusually tight. The one that shapes bonus value is 14 kap. § 9: a licensed operator
              may offer a given player only one bonus across their entire relationship, and it has to be offered
              on the first occasion they play. It was introduced as a player-protection measure, and it works as
              intended, but it also means a Swedish-licensed welcome offer is a single shot by design.
            </p>
            <p>
              Offshore operators sit outside that obligation, and the gap shows up directly in the Bitcoin
              welcome packs. BitStarz runs up to 5 BTC plus 180 free spins across the first four deposits. Mirax
              spreads up to 5 BTC plus 150 free spins across four. BC.Game layers a 220% Deposit Rakeback Welcome
              over four monthly stages, and 7Bit adds continuous weekly reloads on top of its 325% pack. None of
              those structures, multi-deposit packs or recurring reloads, is something a Spelinspektionen-licensed
              site can legally put in front of you. That is the structural reason a meaningful share of Swedish
              online play has gone offshore: Spelinspektionen's own 2024 channelisation report put online casino
              between 72% and 82% against a 90% target.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Funding in Bitcoin from SEK, and the tax leg</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Sweden does not block offshore-gambling payments as systematically as Norway, but the major banks
              (Swedbank, SEB, Nordea and Handelsbanken) routinely flag or reject card and SEPA payments tagged to
              gambling codes at known offshore operators, so crypto becomes the reliable funding route for any
              sustained play. Safello is the cleanest on-ramp: Finansinspektionen granted it full MiCA
              Crypto-Asset Service Provider authorisation in October 2025, the first Swedish issuance. BTCX
              (Goobit AB) and Trijo (Ijort Invest AB, now under GreenMerc) continue under the transitional VASP
              regime. Buy on the exchange, send on-chain to the casino, and the bank-side flagging never enters
              the picture.
            </p>
            <p>
              The tax position is the part the bonus comparison can obscure. Under Inkomstskattelagen 8 kap. § 3,
              gambling winnings are tax-exempt for Swedish residents only when the operator holds a Swedish
              licence or is established within the EEA. Most Curaçao-licensed offshore crypto casinos are outside
              the EEA, so their winnings fall outside that carve-out and are technically taxable as income.
              Separately, the crypto disposal itself is taxed as capital income, which matters more for SEK
              players because the krona carries more volatility against USD than the euro does, so a stablecoin
              like USDT or USDC removes conversion drift that BTC or ETH would expose you to. The bigger offshore
              bonus is real; so is the tax asymmetry that comes with it. For the full regulatory and on-ramp
              detail, see the{' '}
              <Link href="/country/sweden" className="text-[#7BB8D4] hover:underline">
                Sweden crypto casino guide
              </Link>. This is general information, not tax advice.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The {eligible.length} Bitcoin Casinos That Accept Sweden: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. Each accepts Swedish accounts and Bitcoin deposits, checked against the
            restriction data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
            Roobet is excluded: Sweden sits on its restricted-territories list.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for Sweden"
          subtitle="The three highest-trust operators accepting Swedish players for BTC"
          casinos={eligible.slice(0, 3)}
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">What Each One Means at the Bitcoin Cashier</h2>
          <div className="space-y-5">
            {eligible.map((casino) => (
              <article key={casino.slug} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <Link href={`/reviews/${casino.slug}`} className="text-xl font-bold text-white hover:text-[#7BB8D4] transition-colors">
                      {casino.name}
                    </Link>
                    <div className="text-[#555555] text-xs mt-1">
                      {casino.licence} · {casino.kycLevel} KYC · Min {casino.minDeposit}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-[#7BB8D4]">{casino.trustScore}</div>
                    <div className="text-[#555555] text-xs">Trust / 10</div>
                  </div>
                </div>
                <p className="text-[#bbbbbb] text-sm leading-relaxed mb-3">
                  {PER_CASINO_BTC_NOTES[casino.slug] ?? casino.reviewSummary.slice(0, 280)}
                </p>
                <div className="flex gap-3 flex-wrap text-xs">
                  <Link href={`/reviews/${casino.slug}`} className="text-[#7BB8D4] hover:underline">
                    Full {casino.name} review →
                  </Link>
                  <a href={casino.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-[#7BB8D4] hover:underline">
                    Visit {casino.name} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {top && (
          <section className="mt-12 bg-[#111111] border border-[#7BB8D4]/20 rounded-2xl p-6 sm:p-8">
            <div className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">
              Editor&apos;s pick: Bitcoin in Sweden
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Bitcoin Casino Sweden FAQ</h2>
          <div className="space-y-4 mt-6">
            {FAQS.map((f) => (
              <div key={f.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{f.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/country/sweden" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crypto Casinos in Sweden</div>
              <div className="text-[#888888] text-sm">The full multi-coin hub: Spellag, channelisation, on-ramps</div>
            </Link>
            <Link href="/bonus/free-spins" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Free Spins Bonuses</div>
              <div className="text-[#888888] text-sm">The spin components inside these multi-deposit packs</div>
            </Link>
            <Link href="/crypto/bitcoin" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Bitcoin Coin Reference</div>
              <div className="text-[#888888] text-sm">How BTC deposits, fees and confirmations work</div>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            }),
          }}
        />
      </div>
    </>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
      <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{value}</div>
      <div className="text-[#f5f5f5] text-sm font-medium">{label}</div>
      {sub && <div className="text-[#555555] text-xs mt-0.5">{sub}</div>}
    </div>
  )
}

const FAQS = [
  {
    question: 'Why are offshore Bitcoin casino bonuses so much bigger than Swedish-licensed ones?',
    answer:
      'Because Swedish licensees are legally capped at one bonus per player. Spellag 14 kap. § 9 lets a Spelinspektionen-licensed operator offer a given player a single bonus across the whole relationship, and it must be on the first occasion they play. Offshore operators are not bound by the rule, so they run multi-deposit welcome packs (BitStarz up to 5 BTC + 180 spins across four deposits, BC.Game a 220% rakeback welcome over four stages) plus recurring reloads. The size gap is structural, not just marketing.',
  },
  {
    question: 'Are offshore Bitcoin casino winnings taxable for Swedish residents?',
    answer:
      'Often, yes. Under Inkomstskattelagen 8 kap. § 3, gambling winnings are tax-exempt for Swedish residents only when the operator holds a Swedish licence or is established within the EEA. Most Curaçao-licensed offshore crypto casinos sit outside the EEA, so their winnings fall outside the carve-out and are technically taxable as income. The crypto disposal itself is also taxed as capital income, separate from the casino activity. This is general information, not tax advice.',
  },
  {
    question: 'Does Roobet accept Swedish players?',
    answer:
      'No. Sweden is on Roobet\'s restricted-territories list (roobet.com/terms §3.5), so it is excluded from this page, leaving seven eligible operators. None of those seven list Sweden in their restricted terms, though operator policy can be more granular than a published list, so confirm acceptance at signup.',
  },
  {
    question: 'Which Swedish exchange should I use to buy Bitcoin for a casino deposit?',
    answer:
      'Safello holds the strongest current regulatory standing: Finansinspektionen granted it full MiCA Crypto-Asset Service Provider authorisation in October 2025, the first Swedish issuance under the new regime. BTCX (Goobit AB) and Trijo (Ijort Invest AB) continue under the transitional VASP registration while their MiCA applications are processed, and Coinbase and Kraken serve Swedish retail through their EU entities. Any of them works as a SEK-to-BTC on-ramp; Safello is the cleanest default.',
  },
  {
    question: 'Bitcoin or a stablecoin when depositing from SEK?',
    answer:
      'Deposit Bitcoin if it is what you already hold. If you are starting from SEK and want to minimise variability, a stablecoin like USDT or USDC removes the SEK-to-coin conversion drift, which matters more for krona players because the SEK is more volatile against USD than the euro is. Bitcoin also carries the slower on-chain rail (roughly ten-minute blocks, floating fees). Neither choice changes the outside-EEA winnings-tax position.',
  },
] as const
