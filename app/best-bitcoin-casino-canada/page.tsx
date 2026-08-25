import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino, kycDisplayLabel } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for Canada. Differentiated from /country/canada (multi-coin hub) by
// the BTC-cashier angle: per-operator Bitcoin mechanics for a Canadian player, plus the
// Ontario licensing context (a fact about Ontario's regime, not about any operator's
// terms). CORRECTION 2026-08-25: this page previously claimed Roobet's terms restrict
// Ontario by name. The owner-supplied full ToS read of 2026-08-25 shows s3.5 lists
// restricted territories by COUNTRY only; Canada is not listed and Ontario is not
// mentioned. The claim is retracted with a dated on-page correction note (it was the
// page's spine, so the corrections-are-published policy applies).
// Verified facts reused from the countryContext block in app/country/[slug]/page.tsx
// (verified May 2026): crypto legal in Canada; CRA treats crypto as a commodity for tax;
// Ontario operates its own licensed framework, other provinces less prescriptive; on-ramps
// Newton, Bitbuy, Wealthsimple.

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino Canada: All Eight Ranked by Trust',
  description:
    'All 8 reviewed casinos take Canadian Bitcoin players; none draws a provincial line in its terms. Ranked by trust, with the Ontario context and CRA tax note.',
  alternates: { canonical: '/best-bitcoin-casino-canada' },
  openGraph: {
    url: '/best-bitcoin-casino-canada',
    title: 'Bitcoin Casinos for Canada: Eight Operators, One Provincial Question',
    description:
      'All 8 reviewed casinos take Canadian Bitcoin players, and none draws a provincial line in its terms. Ranked by trust.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bitcoin Casinos for Canada: Eight Operators, One Provincial Question' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Casinos for Canada: Eight Operators, One Provincial Question',
    description: 'All 8 reviewed casinos take Canadian Bitcoin players, and none draws a provincial line in its terms. Ranked by trust.',
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

// BTC-cashier notes per casino, Canada-framed. Facts from lib/casinos.ts.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz is the safe Canadian default: a decade of Best Bitcoin Casino awards and sub-10-minute BTC processing. Available across every province. No cashier fees on deposits or withdrawals per the live terms; the welcome package\'s real cost is its wagering requirement, up to 40x.',
  'bc-game':
    'BC.Game keeps routine crypto play document-free with a KYC check standard at EUR 2,000 equivalent, the lowest entry at $5, and accepts Canadian players nationwide including Ontario. The cleanest BTC-in, BTC-out path for a Canadian who would rather not attach documents.',
  '7bit-casino':
    '7Bit has operated since 2014 and clears BTC instant to 10 minutes. A KYC check is standard at EUR 2,000 equivalent, applied at the operator’s discretion. Available across Canada. A settled, anonymous option.',
  cloudbet:
    'Cloudbet is the Canadian high-roller pick: no withdrawal limits once your account is fully verified ($2,200/day before that), with a ~$1 equivalent minimum deposit. Dual Curaçao plus Kahnawake licensing, the latter a Canada-based gaming commission, which some Canadian players find reassuring. Available nationwide.',
  'mirax-casino':
    'Mirax clears BTC instant to 15 minutes with light KYC above higher thresholds, welcome pack denominated in BTC. Available across Canada.',
  duelbits:
    'Duelbits is the fastest at under 5 minutes, no KYC for standard crypto play, cashback-first model. Available nationwide.',
  shuffle:
    'Shuffle clears BTC instant to 10 minutes with SHFL rakeback on Bitcoin play. Light KYC can trigger on larger cashouts. Available across Canada.',
  roobet:
    'Roobet accepts Canadian players: its restricted-territories list (terms s3.5, read 2026-08-25) works by country and does not include Canada. It is the lowest-trust option here, with BTC withdrawals quoted up to 24 hours and documented multi-day holds on large wins, so treat it as small-stakes-only wherever in Canada you play from.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoCanadaPage() {
  // casinoAcceptsCountry(c, 'canada') returns true for all eight: no operator's
  // restricted-territories list includes Canada (Roobet's s3.5 re-read 2026-08-25
  // is country-level and lists neither Canada nor any province).
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'canada') && casinoAcceptsBTC(c))
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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino Canada</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · Canada · CAD</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Bitcoin Casinos for Canada: Eight Operators, One Provincial Question
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            Canada is one of the most crypto-friendly markets we cover, and all eight casinos we review
            accept Canadian players for Bitcoin. None of them draws a provincial line in its terms. The
            provincial question is about Ontario&apos;s own licensed market, not about operator
            restrictions: here is the ranked list, the Ontario context, and the CRA detail that affects
            how you fund a deposit.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting Canada" value={`${eligible.length}`} sub="of 8 reviewed" />
          <Stat label="Provincial lines in operator terms" value="0" sub="Country-level lists only" />
          <Stat label="CRA treats crypto as" value="Commodity" sub="Disposal can be taxable" />
          <Stat label="BTC settlement" value="~10 min" sub="Per block, fees float" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The Ontario question</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Canada does not regulate online gambling federally. Ontario runs its own licensed
              online-gambling framework, while other provinces are less prescriptive, and some offshore
              operators choose to draw a line at provinces that license their own markets. What the terms
              of the eight operators on this page actually say is simpler: every restricted-territories
              list we have verified works at country level, and none of them lists Canada or any Canadian
              province. Wherever you are in Canada, all eight are open to you on their own terms.
            </p>
            <p>
              <strong className="text-[#f5f5f5]">Correction, 25 August 2026:</strong> an earlier version
              of this page, including its title, said Roobet&apos;s terms restrict Ontario by name and
              built the ranking around that carve-out. On a full read of Roobet&apos;s current Terms of
              Service (25 August 2026), the restricted-territories clause (s3.5) lists countries only:
              Canada is not on the list and Ontario is not mentioned anywhere in the document. We have
              retracted the claim rather than softening it. Whether any operator blocks Ontario players
              in practice is a separate question its terms do not answer; we state only what the terms
              say.
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
            Ranked by trust score. All eight accept Canadian Bitcoin deposits. Verified against the data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for Canada"
          subtitle="The three highest-trust operators accepting Canadian players"
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
                      {casino.licence} · {kycDisplayLabel(casino)} KYC · Min {casino.minDeposit}
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
      'By their own terms, all eight casinos we review accept Canadian players and none restricts Ontario or any other province: every restricted-territories list we have verified works at country level, and Canada is not on any of them. Ontario runs its own licensed online-gambling framework, so Ontario players also have the regulated iGaming Ontario market as an alternative to offshore play. (An earlier version of this answer said Roobet restricts Ontario by name; a full read of its current terms on 25 August 2026 found no mention of Ontario, and we corrected the page.)',
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
      'All eight casinos in our catalogue accept Canadian Bitcoin deposits, the widest acceptance of any market we cover, and none of their terms draws a line at any Canadian province. That reflects how crypto-friendly the Canadian environment is relative to more restrictive markets.',
  },
] as const
