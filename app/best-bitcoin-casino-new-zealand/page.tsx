import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for New Zealand. Differentiated from /country/new-zealand (multi-coin hub) by
// two NZ-specific BTC angles: (1) the DIA licensing-transition clock, offshore casinos stay
// accessible until the 1 December 2026 licensed-only enforcement milestone, a time-sensitive hook;
// and (2) the tax asymmetry against the Nordic pages, NZ casual gambling winnings are NOT taxable
// for individuals, so unlike Norway/Sweden the only tax leg a Kiwi faces is the Bitcoin disposal
// itself (IRD treats cryptoassets as property). The hub covers the transition + on-ramps broadly;
// this page makes the tax question collapse to the coin, which is a genuinely BTC-specific frame.
// Facts reused from verified countryContext['new-zealand'] in app/country/[slug]/page.tsx
// (verified May 2026): DIA scheme 1 May 2026 / enforcement 1 Dec 2026, IRD winnings + cryptoasset
// treatment, Easy Crypto / Independent Reserve / Binance NZ FSP on-ramps.

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino New Zealand 2026: The 1 December Deadline',
  description:
    'Offshore Bitcoin casinos stay open to NZ players until the 1 December 2026 licensed-only enforcement date. Casual winnings are tax-free, so only the BTC disposal is taxable. Reviewed casinos accepting NZ BTC players, ranked, with on-ramps.',
  alternates: { canonical: '/best-bitcoin-casino-new-zealand' },
  openGraph: {
    url: '/best-bitcoin-casino-new-zealand',
    title: 'Best Bitcoin Casino New Zealand 2026',
    description:
      'NZ players can use offshore Bitcoin casinos until the 1 December 2026 enforcement milestone. Winnings are tax-free; the BTC disposal is the only taxable leg. Reviewed casinos ranked.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Bitcoin Casino New Zealand 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bitcoin Casino New Zealand 2026',
    description: 'The 1 December 2026 deadline, tax-free winnings, and the reviewed casinos accepting NZ players for Bitcoin, ranked.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Bitcoin Casino New Zealand', item: 'https://www.playmagpie.com/best-bitcoin-casino-new-zealand' },
  ],
}

// BTC-cashier notes per casino, NZ-framed. Facts from lib/casinos.ts.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz is the settled NZ default: a decade of Best Bitcoin Casino awards and sub-10-minute BTC payouts, which matters when NZD bank rails to offshore sites are slow or blocked and the on-chain leg is doing the work. Read the 25% admin fee on bonus-related withdrawals before committing a BTC balance to the welcome pack.',
  'bc-game':
    'BC.Game runs no KYC at any withdrawal size and a $5 minimum, the lowest here. For a Kiwi who wants the cleanest BTC-in, BTC-out path and the widest coin support after on-ramping through Easy Crypto, it is the strongest fit.',
  '7bit-casino':
    '7Bit has the longest no-KYC record (since 2014) and clears BTC instant to 10 minutes. A settled, anonymous option for NZ players who want minimal friction on the casino side.',
  cloudbet:
    'Cloudbet is the NZ high-roller pick: no withdrawal limits and a deposit minimum quoted in Bitcoin (0.001 BTC equivalent), plus a strong crypto sportsbook. Dual Curaçao and Kahnawake licensing.',
  'mirax-casino':
    'Mirax clears BTC instant to 15 minutes with light KYC above higher thresholds, and the welcome pack is denominated in Bitcoin, so it maps cleanly onto a BTC deposit funded through a NZ exchange.',
  duelbits:
    'Duelbits is the fastest at under 5 minutes, no KYC for standard crypto play, cashback-first rather than a big match. A good fit if your priority is getting a NZD-funded BTC balance on and off quickly.',
  shuffle:
    'Shuffle clears BTC instant to 10 minutes with SHFL rakeback on Bitcoin play. Light KYC can trigger on larger cashouts, worth knowing if you are moving a large position.',
  roobet:
    'Roobet does not restrict New Zealand in its terms, so it is technically open to NZ players, but it ranks last on trust here: BTC withdrawals quoted up to 24 hours, no weekend processing, and a documented pattern of multi-day holds on large wins. Treat it as small-stakes-only, not the place to park a sizeable BTC win awaiting cashier review.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoNewZealandPage() {
  // casinoAcceptsCountry(c, 'new-zealand') returns true for all eight: Roobet's restricted list
  // (full country names) does not include New Zealand, so it renders here ranked last on trust.
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'new-zealand') && casinoAcceptsBTC(c))
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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino New Zealand</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · New Zealand · NZD</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Bitcoin Casino New Zealand 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            New Zealand is mid-transition. The Department of Internal Affairs is standing up a licensing regime:
            the scheme commences on 1 May 2026, and licensed-only enforcement follows on 1 December 2026. Until
            that second date, offshore Bitcoin casinos remain accessible to Kiwi players. And unlike most markets
            we cover, casual winnings here are not taxable, so the only tax question that follows you is the
            Bitcoin itself. Below are the reviewed casinos accepting NZ players for BTC, ranked, with the on-ramp.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting NZ" value={`${eligible.length}`} sub="of 8 reviewed" />
          <Stat label="Licensed-only enforcement" value="1 Dec 2026" sub="Scheme starts 1 May 2026" />
          <Stat label="Casual winnings tax" value="None" sub="IRD, for individuals" />
          <Stat label="IRD treats BTC as" value="Property" sub="Disposal is the taxable leg" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The 1 December 2026 line, and what it means for BTC play</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              New Zealand's online-gambling rules are changing on a known timetable, which is unusual enough to
              plan around. The Department of Internal Affairs is rolling out a new licensing framework in two
              steps: the licensing scheme commences on 1 May 2026, and licensed-only enforcement follows on
              1 December 2026. Until that December milestone, offshore crypto casinos remain accessible to NZ
              players, who currently account for the bulk of online casino activity. What the post-enforcement
              landscape looks like for offshore operators is not fully settled, so the honest read for 2026 is
              that the window is open now with a dated edge to it.
            </p>
            <p>
              For a Bitcoin player specifically, the practical implication is about funding rails rather than the
              coin. NZD bank transfers to offshore gambling sites are slow and frequently blocked, so the on-chain
              BTC transfer is what actually moves the money: you buy on a NZ exchange and send it to the casino
              deposit address. None of the operators on this page draws a New Zealand line in its terms today, but
              with a regulatory transition underway it is worth confirming acceptance at signup rather than
              assuming it holds through the year.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Tax-free winnings, taxable coin: the only leg that matters</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              This is where New Zealand diverges sharply from the Nordic markets. Casual gambling winnings are not
              taxable for individuals under IRD rules, so the winnings side of offshore play, the part that is
              technically taxable income in Norway or Sweden when the operator sits outside the EEA, simply does
              not arise for a Kiwi. The tax question does not disappear though; it relocates entirely to the coin.
              IRD treats cryptoassets as property rather than currency, which means disposing of Bitcoin, including
              spending or converting it to fund a deposit, can be a taxable event depending on your acquisition
              intent and circumstances. So the single thing a New Zealand Bitcoin player needs to think about is
              the BTC disposal, not the casino winnings.
            </p>
            <p>
              On the cashier mechanics: Bitcoin settles in roughly ten-minute blocks with fees that float with
              network demand, so if you are starting from NZD and want the fastest route, a stablecoin like USDT
              removes both the conversion drift and the block-time wait. Deposit Bitcoin when it is the asset you
              already hold and intend to play with. Easy Crypto is the NZ-native broker most retail players use to
              on-ramp, with Independent Reserve also active for Kiwi accounts; Binance operates an NZ entity under
              FSP registration but is not supervised by an NZ regulator in the same way, worth knowing if recourse
              matters to you. The full regulatory and on-ramp picture is in the{' '}
              <Link href="/country/new-zealand" className="text-[#7BB8D4] hover:underline">
                New Zealand crypto casino guide
              </Link>. This is general information, not tax advice.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The {eligible.length} Bitcoin Casinos for New Zealand Players: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. Each accepts NZ accounts and Bitcoin deposits, checked against the restriction
            data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
            Roobet appears last: its terms do not restrict New Zealand, but its trust profile ranks it bottom.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for New Zealand"
          subtitle="The three highest-trust operators accepting NZ players for BTC"
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
              Editor&apos;s pick: Bitcoin in New Zealand
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Bitcoin Casino New Zealand FAQ</h2>
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
            <Link href="/country/new-zealand" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crypto Casinos in New Zealand</div>
              <div className="text-[#888888] text-sm">The full multi-coin hub: DIA transition, IRD tax, on-ramps</div>
            </Link>
            <Link href="/best-crypto-pokies-nz" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Best Crypto Pokies for NZ</div>
              <div className="text-[#888888] text-sm">Provider RTP ranges and the pokies-specific NZ angle</div>
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
    question: 'Can New Zealand players still use offshore Bitcoin casinos in 2026?',
    answer:
      'Yes, for now. The Department of Internal Affairs licensing scheme commences on 1 May 2026, with licensed-only enforcement following on 1 December 2026. Until that December date, offshore crypto casinos remain accessible to NZ players, who currently make up the bulk of online casino activity. The picture after enforcement is less settled, so treat 2026 as an open window with a dated edge.',
  },
  {
    question: 'Do New Zealanders pay tax on Bitcoin casino winnings?',
    answer:
      'Casual gambling winnings are not taxable for individuals under IRD rules, so the winnings side does not create a tax liability. The Bitcoin itself can, though: IRD treats cryptoassets as property, so disposing of BTC, including spending or converting it to fund a deposit, can be a taxable event depending on your acquisition intent and circumstances. For a Kiwi, the coin disposal is the leg to think about, not the winnings. This is general information, not tax advice.',
  },
  {
    question: 'Where do New Zealand players buy Bitcoin?',
    answer:
      'Easy Crypto is the NZ-native broker most retail players use to on-ramp, with Independent Reserve also active for Kiwi accounts. Binance operates an NZ entity under FSP registration, but it is not supervised by an NZ regulator in the same way an Australian or European exchange would be, which is worth knowing if regulatory recourse matters to you. Players typically buy BTC there and send it on-chain to the casino, sidestepping the slow NZD bank transfers.',
  },
  {
    question: 'Is Bitcoin or USDT the better deposit coin from New Zealand?',
    answer:
      'Deposit Bitcoin if it is the asset you already hold and want to play with. If you are starting from NZD and want the fastest route, a stablecoin like USDT removes the NZD-to-coin conversion drift and avoids Bitcoin\'s ten-minute block time and floating fees. Because casual winnings are tax-free in NZ, the coin choice is about cashier efficiency rather than tax, with the one caveat that the BTC disposal itself can be a property event.',
  },
  {
    question: 'How many of the reviewed casinos accept New Zealand players for Bitcoin?',
    answer:
      'All eight in our catalogue accept NZ players for Bitcoin under their published terms. Roobet does not restrict New Zealand, so it is technically open, but it ranks last on trust (BTC withdrawals quoted up to 24 hours, no weekend processing, documented holds on large wins). With the licensing transition underway, confirm acceptance at signup rather than assuming it holds all year.',
  },
] as const
