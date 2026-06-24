import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for Ireland. Differentiated from /country/ireland (multi-coin hub
// leading on the GRAI regulator + S.613(2) tax position) by its BTC-specific editorial
// conclusion: because Irish gambling winnings are tax-neutral, Bitcoin carries NO tax
// edge (unlike Germany's § 23 EStG), so the honest BTC story is cashier mechanics + a
// de-hyped "deposit BTC only if you hold it" verdict, not a regulatory re-run. The hub
// gets the legal/on-ramp depth; this page links up to it.
// Verified facts reused from the countryContext block in app/country/[slug]/page.tsx
// (primary sources cited there, verified May 2026): S.613(2) Taxes Consolidation Act 1997
// (winnings not chargeable gains); GRAI operational 5 March 2025 under the Gambling
// Regulation Act 2024; Kraken via Payward Ireland Ltd (Central Bank of Ireland CASP).

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino Ireland 2026: All 8 Reviewed, Ranked',
  description:
    'Every casino we review accepts Irish players for Bitcoin. Ranked by trust, with the honest verdict: Irish winnings are tax-neutral under S.613(2), so Bitcoin has no tax edge here. Deposit BTC if you hold it.',
  alternates: { canonical: '/best-bitcoin-casino-ireland' },
  openGraph: {
    url: '/best-bitcoin-casino-ireland',
    title: 'Best Bitcoin Casino Ireland 2026',
    description:
      'All 8 reviewed casinos accept Irish players for Bitcoin, ranked, with an honest BTC-versus-stablecoin verdict for a tax-neutral market.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Bitcoin Casino Ireland 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bitcoin Casino Ireland 2026',
    description: 'All 8 reviewed casinos accept Irish players for Bitcoin, ranked, with the honest BTC verdict for a tax-neutral market.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Bitcoin Casino Ireland', item: 'https://www.playmagpie.com/best-bitcoin-casino-ireland' },
  ],
}

// BTC-cashier notes per casino, Ireland-framed (tax-neutral, so the focus is cashier
// behaviour and EUR-pegging rather than any tax-optimisation story). Facts from lib/casinos.ts.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz is the benchmark Bitcoin brand: multiple Best Bitcoin Casino awards since 2014 and sub-10-minute BTC processing. The one number an Irish player should note is the 25% admin fee on bonus-related withdrawals, so if you take the 5 BTC welcome package, the BTC you cash out against it is not the BTC you might expect.',
  'bc-game':
    'BC.Game accepts BTC with no KYC at any withdrawal size and the lowest entry on the list ($5). For an Irish player who deposits Bitcoin to play rather than to chase a match, it is the most frictionless BTC-in, BTC-out path here.',
  '7bit-casino':
    '7Bit has run since 2014 with no KYC on crypto withdrawals and clears BTC instant to 10 minutes. A settled, anonymous BTC option without a brand-new platform.',
  cloudbet:
    'Cloudbet is the Irish high-roller pick: no withdrawal limits and a minimum priced in Bitcoin (0.001 BTC equivalent). Because Irish winnings are not chargeable gains, a large BTC cashout is not a tax event on the winnings side, so the cap-free cashier is the real advantage.',
  'mirax-casino':
    'Mirax clears BTC instant to 15 minutes with light KYC above higher thresholds, welcome pack denominated in BTC to a 5 BTC ceiling. A middle option between the no-KYC brands and Cloudbet.',
  duelbits:
    'Duelbits is the fastest at under 5 minutes on the operator side, no KYC for standard crypto play, cashback-first rather than a big BTC match. Good for a deposit-BTC-to-play Irish profile.',
  shuffle:
    'Shuffle clears BTC instant to 10 minutes and layers SHFL rakeback on Bitcoin play. Light KYC can trigger on larger cashouts.',
  roobet:
    'Roobet is the lowest-trust option and the slowest on BTC: its own terms quote BTC withdrawals up to 24 hours, against minutes elsewhere, plus documented multi-day holds on large wins. Fine for small crash-led BTC play; not for a sizeable BTC balance.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoIrelandPage() {
  // No catalogue casino restricts Ireland; all eight BTC-accepting operators are eligible.
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'ireland') && casinoAcceptsBTC(c))
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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino Ireland</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · Ireland · EUR</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Bitcoin Casino Ireland 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            Ireland is one of the friendlier places to play offshore, because gambling winnings are not
            a chargeable gain for individuals under S.613(2) of the Taxes Consolidation Act 1997. That
            removes the tax angle entirely, which leads to an honest conclusion most lists will not give
            you: for an Irish player, Bitcoin has no special edge. The choice is cashier mechanics, not
            tax. All eight casinos we review accept Irish accounts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting Ireland" value={`${eligible.length}`} sub="of 8 reviewed" />
          <Stat label="Winnings tax" value="Neutral" sub="S.613(2) TCA 1997, not chargeable" />
          <Stat label="Regulator (GRAI) since" value="2025" sub="5 March, still bedding in" />
          <Stat label="BTC settlement" value="~10 min" sub="Per block, fees float" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The honest Bitcoin verdict for Ireland</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              In Germany there is a real tax reason to deposit Bitcoin specifically: long-held BTC is
              tax-free on disposal under their holding-period rule. Ireland has no equivalent lever,
              because the winnings themselves are not chargeable gains in the first place. So there is no
              tax case for choosing Bitcoin over a stablecoin or any other coin. That simplifies things:
              pick the coin on cashier merits alone.
            </p>
            <p>
              On cashier merits, Bitcoin is honestly the heritage option rather than the optimal one. BTC
              settles in roughly ten-minute blocks and its network fees float with demand, so an on-chain
              BTC withdrawal is slower and can cost more than USDT on TRC-20 or a Smart Chain coin. EUR
              bank transfers to offshore casinos are slow by Irish bank standards and frequently flagged
              on gambling descriptors, which is the real reason to go on-chain at all. If your goal is the
              fastest, cheapest EUR-pegged route, a stablecoin wins. If you already hold Bitcoin, depositing
              it is perfectly fine and the tax-neutral position means you lose nothing by doing so.
            </p>
            <p>
              In short: deposit Bitcoin because it is what you hold, not because it is faster or cheaper.
              For the full regulatory and on-ramp picture, including the GRAI regime under the Gambling
              Regulation Act 2024 and how EUR on-ramping works, see the{' '}
              <Link href="/country/ireland" className="text-[#7BB8D4] hover:underline">
                Ireland crypto casino guide
              </Link>.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Buying Bitcoin in Ireland</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Kraken operates through Payward Ireland Ltd with Central Bank of Ireland authorisation,
              which makes it the most directly Irish-regulated of the major exchanges for buying BTC;
              Coinbase and Bitstamp also serve EUR pairs to Irish retail. Acquire Bitcoin there and send
              it on-chain to the casino, which sidesteps the SEPA-descriptor flagging that hits direct
              bank transfers to gambling sites. Just budget for BTC&apos;s slower confirmation versus a
              stablecoin if speed matters to you that session.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The {eligible.length} Bitcoin Casinos for Irish Players: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. All eight accept Irish accounts and Bitcoin deposits, verified against
            the data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for Ireland"
          subtitle="The three highest-trust operators accepting Irish players"
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
              Editor&apos;s pick: Bitcoin in Ireland
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Bitcoin Casino Ireland FAQ</h2>
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
            <Link href="/country/ireland" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crypto Casinos in Ireland</div>
              <div className="text-[#888888] text-sm">The full multi-coin hub: GRAI, on-ramps, tax</div>
            </Link>
            <Link href="/crypto/bitcoin" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Bitcoin Coin Reference</div>
              <div className="text-[#888888] text-sm">How BTC deposits, fees and confirmations work</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Where BTC speed lags, payout speed matters</div>
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
    question: 'Do Irish players pay tax on Bitcoin casino winnings?',
    answer:
      'Gambling winnings are not a chargeable gain for individuals under Section 613(2) of the Taxes Consolidation Act 1997, so casino winnings are tax-neutral for Irish residents regardless of where the operator is based. That is why Bitcoin carries no tax advantage in Ireland, unlike in Germany. This is general information, not tax advice; confirm your own position.',
  },
  {
    question: 'Is Bitcoin the best coin to deposit from Ireland?',
    answer:
      'Not necessarily. Because winnings are tax-neutral, the decision is purely cashier mechanics, and on those Bitcoin is the slower, sometimes pricier option: it settles in roughly ten-minute blocks with network fees that float with demand, against single-digit-second settlement for USDT on TRC-20. Deposit Bitcoin if it is the coin you already hold; if you are starting from EUR and want speed, a stablecoin is the better route.',
  },
  {
    question: 'How many casinos accept Irish players for Bitcoin?',
    answer:
      'All eight casinos in our catalogue accept Irish accounts and Bitcoin deposits, from BitStarz and BC.Game at the top of the trust ranking down to Roobet. None of them restricts Ireland in its terms, which is not the case for every market we cover.',
  },
  {
    question: 'Where do Irish players buy Bitcoin?',
    answer:
      'Kraken operates through Payward Ireland Ltd with Central Bank of Ireland authorisation, the most directly Irish-regulated of the major exchanges, and Coinbase and Bitstamp also serve EUR pairs to Irish retail. Buying BTC there and sending it on-chain avoids the SEPA-descriptor flagging that hits direct bank transfers to gambling sites.',
  },
  {
    question: 'Is offshore Bitcoin gambling legal in Ireland?',
    answer:
      'The Gambling Regulatory Authority of Ireland (GRAI) was established under the Gambling Regulation Act 2024 and has been operational since 5 March 2025, but the licensing regime under it is still bedding in, and Irish players routinely access offshore crypto casinos in the meantime. See our Ireland crypto casino guide for the full legal picture.',
  },
] as const
