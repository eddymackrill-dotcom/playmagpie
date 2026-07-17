import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for Canada. Differentiated from /country/canada (multi-coin hub) by
// the province-specific BTC casino-availability angle: Roobet's terms restrict ONTARIO
// specifically (not all Canada), so an Ontario player's eligible BTC list differs from
// the rest of Canada's. That provincial carve-out is the page's spine and is page-specific
// in a way the hub only gestures at.
// Verified facts reused from the countryContext block in app/country/[slug]/page.tsx
// (verified May 2026): crypto legal in Canada; CRA treats crypto as a commodity for tax;
// Ontario operates its own licensed framework, other provinces less prescriptive; on-ramps
// Newton, Bitbuy, Wealthsimple. Roobet's Ontario restriction: lib/casinos.ts restrictedCountries.

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino Canada 2026: Ranked, With the Ontario Catch',
  description:
    'All 8 reviewed casinos accept Canadian players for Bitcoin, but one (Roobet) restricts Ontario specifically. Ranked by trust, with the province-by-province detail and CRA tax note Canadian players need.',
  alternates: { canonical: '/best-bitcoin-casino-canada' },
  openGraph: {
    url: '/best-bitcoin-casino-canada',
    title: 'Best Bitcoin Casino Canada 2026',
    description:
      'All 8 reviewed casinos accept Canadian players for Bitcoin (Roobet excludes Ontario), ranked, with the provincial and CRA tax detail.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Bitcoin Casino Canada 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bitcoin Casino Canada 2026',
    description: 'All 8 reviewed casinos accept Canadian players for Bitcoin (Roobet excludes Ontario), ranked, with provincial and CRA tax detail.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Bitcoin Casino Canada', item: 'https://www.playmagpie.com/best-bitcoin-casino-canada' },
  ],
}

// BTC-cashier notes per casino, Canada-framed. Roobet's note carries the Ontario carve-out.
// Facts from lib/casinos.ts.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz is the safe Canadian default: a decade of Best Bitcoin Casino awards and sub-10-minute BTC processing. Available across every province. No cashier fees on deposits or withdrawals per the live terms; the welcome package\'s real cost is its wagering requirement, up to 40x.',
  'bc-game':
    'BC.Game runs no KYC at any withdrawal size, the lowest entry at $5, and accepts Canadian players nationwide including Ontario. The cleanest BTC-in, BTC-out path for a Canadian who would rather not attach documents.',
  '7bit-casino':
    '7Bit has the longest no-KYC record (since 2014) and clears BTC instant to 10 minutes. Available across Canada. A settled, anonymous option.',
  cloudbet:
    'Cloudbet is the Canadian high-roller pick: no withdrawal limits once your account is fully verified ($2,200/day before that), with a ~$1 equivalent minimum deposit. Dual Curaçao plus Kahnawake licensing, the latter a Canada-based gaming commission, which some Canadian players find reassuring. Available nationwide.',
  'mirax-casino':
    'Mirax clears BTC instant to 15 minutes with light KYC above higher thresholds, welcome pack denominated in BTC. Available across Canada.',
  duelbits:
    'Duelbits is the fastest at under 5 minutes, no KYC for standard crypto play, cashback-first model. Available nationwide.',
  shuffle:
    'Shuffle clears BTC instant to 10 minutes with SHFL rakeback on Bitcoin play. Light KYC can trigger on larger cashouts. Available across Canada.',
  roobet:
    'Roobet is the one province-specific case on this list: its terms restrict Ontario specifically, so it is open to Canadians outside Ontario only. It is also the lowest-trust option, with BTC withdrawals quoted up to 24 hours and documented multi-day holds on large wins. If you are in Ontario, the seven above are your list; if you are elsewhere in Canada, treat Roobet as small-stakes-only.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoCanadaPage() {
  // casinoAcceptsCountry(c, 'canada') returns true for all eight: Roobet restricts the token
  // 'Ontario', not 'Canada', so it renders here with the Ontario carve-out called out in copy.
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'canada') && casinoAcceptsBTC(c))
    .sort((a, b) => b.trustScore - a.trustScore)
  // Ontario-eligible subset excludes Roobet (its terms restrict Ontario).
  const ontarioEligible = eligible.filter((c) => !c.restrictedCountries.includes('Ontario'))
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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino Canada</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · Canada · CAD</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Bitcoin Casino Canada 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            Canada is one of the most crypto-friendly markets we cover, and all eight casinos we review
            accept Canadian players for Bitcoin. The catch is provincial, not national: one operator
            restricts Ontario specifically, so where you live changes your shortlist. Here is the ranked
            list, the Ontario exception, and the CRA detail that affects how you fund a deposit.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting Canada" value={`${eligible.length}`} sub="of 8 reviewed" />
          <Stat label="Open to Ontario" value={`${ontarioEligible.length}`} sub="Roobet restricts Ontario" />
          <Stat label="CRA treats crypto as" value="Commodity" sub="Disposal can be taxable" />
          <Stat label="BTC settlement" value="~10 min" sub="Per block, fees float" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The Ontario exception</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Canada does not regulate online gambling federally. Ontario runs its own licensed framework,
              while other provinces are less prescriptive, and that provincial split shows up directly in
              which offshore casinos accept you. Of the eight on this page, seven accept players in every
              province. Roobet is the exception: its terms restrict Ontario specifically, so it is open to
              Canadians outside Ontario only.
            </p>
            <p>
              The practical takeaway is simple. If you are in Ontario, your Bitcoin shortlist is the seven
              operators that serve the whole country (BitStarz, BC.Game, 7Bit, Cloudbet, Mirax, Duelbits
              and Shuffle). If you are elsewhere in Canada, all eight are open to you, though Roobet sits
              at the bottom of the trust ranking for separate reasons covered below. No other operator on
              this list draws a provincial line.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Funding a deposit: CRA and the BTC rail</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              The Canada Revenue Agency treats cryptocurrency as a commodity, not currency, which means
              disposing of Bitcoin, including spending it or converting it to fund a casino deposit, can
              itself be a taxable event separate from anything that happens at the casino. That is worth
              knowing before you move a large, appreciated BTC position. Newton, Bitbuy and Wealthsimple
              are the regulated Canadian exchanges most players use to on-ramp; CAD bank transfers
              straight to offshore gambling sites are slow and often blocked, which is the practical
              reason to route through crypto at all.
            </p>
            <p>
              On the coin itself: Bitcoin settles in roughly ten-minute blocks and its fees move with
              network demand, so an on-chain BTC withdrawal is slower and can cost more than a stablecoin
              on TRC-20. Deposit Bitcoin because it is what you hold; if you want the fastest CAD-to-play
              route and are starting from cash, a stablecoin removes the conversion drift. The full
              picture, including provincial nuance and on-ramp detail, is in the{' '}
              <Link href="/country/canada" className="text-[#7BB8D4] hover:underline">
                Canada crypto casino guide
              </Link>.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The {eligible.length} Bitcoin Casinos for Canadian Players: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. All accept Canadian Bitcoin deposits; Roobet is the one that restricts
            Ontario. Verified against the data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for Canada"
          subtitle="The three highest-trust operators accepting Canadian players (all open to Ontario)"
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
              Editor&apos;s pick: Bitcoin in Canada
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Bitcoin Casino Canada FAQ</h2>
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
            <Link href="/country/canada" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crypto Casinos in Canada</div>
              <div className="text-[#888888] text-sm">The full multi-coin hub: provinces, on-ramps, tax</div>
            </Link>
            <Link href="/crypto/bitcoin" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Bitcoin Coin Reference</div>
              <div className="text-[#888888] text-sm">How BTC deposits, fees and confirmations work</div>
            </Link>
            <Link href="/high-roller-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">High Roller Casinos</div>
              <div className="text-[#888888] text-sm">Cap-free BTC cashouts for larger Canadian bankrolls</div>
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
    question: 'Which Bitcoin casinos accept Ontario players?',
    answer:
      'Seven of the eight we review accept Ontario players: BitStarz, BC.Game, 7Bit, Cloudbet, Mirax, Duelbits and Shuffle. Roobet is the exception, as its terms restrict Ontario specifically. Ontario runs its own licensed online-gambling framework, which is why some offshore operators draw a line at the province. Players in other Canadian provinces can use all eight.',
  },
  {
    question: 'Do Canadian players pay tax on Bitcoin used at a casino?',
    answer:
      'The Canada Revenue Agency treats cryptocurrency as a commodity rather than currency, so disposing of Bitcoin, including converting or spending it to fund a deposit, can be a taxable event independent of the casino activity itself. The size of any liability depends on your cost basis and gain. This is general information, not tax advice; confirm your own position with a professional.',
  },
  {
    question: 'Is Bitcoin the best coin to deposit from Canada?',
    answer:
      'Bitcoin is the right choice if it is what you already hold. On pure cashier mechanics it is the slower option, settling in roughly ten-minute blocks with fees that float with demand, against single-digit-second settlement for USDT on TRC-20. If you are starting from CAD and want the fastest route while avoiding the slow, often-blocked bank rails, a stablecoin is more efficient.',
  },
  {
    question: 'Where do Canadian players buy Bitcoin?',
    answer:
      'Newton, Bitbuy and Wealthsimple are the regulated Canadian exchanges most players use to on-ramp BTC. Acquiring Bitcoin there and sending it on-chain to the casino sidesteps the slow CAD bank transfers to offshore gambling sites, which are frequently blocked.',
  },
  {
    question: 'How many casinos accept Canadian players for Bitcoin?',
    answer:
      'All eight casinos in our catalogue accept Canadian Bitcoin deposits, the widest acceptance of any market we cover, with the single caveat that Roobet restricts Ontario. That reflects how crypto-friendly the Canadian environment is relative to more restrictive markets.',
  },
] as const
