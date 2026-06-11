import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'

// The 5 catalogue operators that run a genuine sportsbook, verified against
// lib/casinos.ts prose (there is no typed `sportsbook` field — the fact lives
// in each operator's reviewSummary/pros, cited per-operator below):
//   - cloudbet:  reviewSummary "the sportsbook is among the best-in-class for crypto betting";
//                pros "Excellent sportsbook with crypto betting across hundreds of markets"
//   - roobet:    pros "Full crypto sportsbook covering ~40 sports including esports, plus
//                regional partnerships with Chelsea FC (LatAm + Canada outside Ontario) and 100 Thieves"
//   - bc-game:   reviewSummary "a full sportsbook"; pros "...live dealer and sports"
//   - shuffle:   reviewSummary "Shuffle is a fast-growing crypto casino and sportsbook that launched in 2022"
//   - duelbits:  reviewSummary "Duelbits is a modern crypto-native casino and sportsbook launched in 2020"
const SPORTSBOOK_SLUGS = ['cloudbet', 'roobet', 'bc-game', 'shuffle', 'duelbits'] as const

// Top 3 sportsbook operators by trust score: BC.Game 8.9, Cloudbet 8.7,
// Duelbits 8.5 (Shuffle 8.2, Roobet 6.8 fall outside the top 3). All three
// genuinely run a sportsbook, so no strip-curation override is needed.
const STRIP_CARDS: CTAStripCard[] = [
  {
    slug: 'bc-game',
    facts: [
      { label: 'Sportsbook', value: '✓ full book + 100+ coins' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'KYC', value: 'None — at any size' },
    ],
  },
  {
    slug: 'cloudbet',
    facts: [
      { label: 'Sportsbook', value: 'Best-in-class, hundreds of markets' },
      { label: 'Withdrawal', value: 'Instant to 30 minutes, no limit' },
      { label: 'KYC', value: 'Light' },
    ],
  },
  {
    slug: 'duelbits',
    facts: [
      { label: 'Sportsbook', value: '✓ casino + sportsbook since 2020' },
      { label: 'Withdrawal', value: 'Instant to 5 minutes (fastest)' },
      { label: 'KYC', value: 'None for crypto play' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Best Crypto Casinos With a Sportsbook 2026 — Ranked | PlayMagpie',
  description:
    'Five casinos in our catalogue run a real sportsbook alongside the casino: Cloudbet, Roobet, BC.Game, Shuffle and Duelbits. Ranked by trust, with the honest per-operator breakdown.',
  alternates: {
    canonical: '/crypto-casinos-with-sportsbook',
  },
  openGraph: {
    url: '/crypto-casinos-with-sportsbook',
    title: 'Best Crypto Casinos With a Sportsbook 2026 — Ranked',
    description:
      'Five catalogue operators pair a crypto casino with a sportsbook. Cloudbet leads on market depth; Duelbits on payout speed. Full per-operator breakdown.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Casinos With a Sportsbook 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos With a Sportsbook 2026',
    description: 'The five crypto casinos that also run a sportsbook, ranked by trust with honest per-operator notes.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casinos With a Sportsbook', item: 'https://www.playmagpie.com/crypto-casinos-with-sportsbook' },
  ],
}

// Per-operator sportsbook notes. Every claim traces to the cited lib/casinos.ts
// field — no sport counts or market figures are invented where the catalogue
// doesn't document them (BC.Game/Shuffle/Duelbits get "full sportsbook" / "casino
// and sportsbook" framing rather than fabricated numbers).
const PER_CASINO_SPORTSBOOK_NOTES: Record<string, string> = {
  cloudbet:
    'Cloudbet has the strongest sportsbook on this list — our review rates it among the best-in-class for crypto betting, with crypto wagering across hundreds of markets. Paired with no withdrawal limits at the standard cashier and dual licensing from Curaçao plus the Kahnawake Gaming Commission, it is the default for high-stakes crypto sports betting. The 0.001 BTC equivalent minimum deposit is the highest entry point here — Cloudbet is built around larger bankrolls.',
  'bc-game':
    'BC.Game pairs a full sportsbook with the widest coin support of any casino we review (100+ cryptocurrencies) and a strict no-KYC policy — email signup, no documents at any withdrawal size. The $5 minimum deposit makes it the most accessible entry point on the list, and withdrawals process instant to 10 minutes.',
  duelbits:
    'Duelbits is a crypto-native casino and sportsbook launched in 2020, with the fastest headline withdrawal window here — instant to 5 minutes — and a no-KYC policy for crypto play. Its rewards model is cashback-first (up to $30 weekly cashback plus Duelbits Originals rewards) rather than a deposit match, which suits high-frequency bettors over bonus-hunters.',
  shuffle:
    'Shuffle is a crypto casino and sportsbook launched in 2022, built around its native SHFL token and a rakeback rewards model — sports wagering earns the same SHFL airdrops and rakeback as casino play. It runs on a Curaçao licence with Light KYC that can trigger on larger withdrawals.',
  roobet:
    'Roobet runs a full crypto sportsbook covering ~40 sports including esports, and carries regional partnership deals with Chelsea FC (Latin America plus Canada outside Ontario) and 100 Thieves. The honest caveat that keeps its trust score lowest here: a documented pattern of multi-day withdrawal holds on large wins — AskGamblers complaints at $20k, $84k, $97k, $111k and $115k, with the $84,000 case publicly listed as Unsolved. Usable for modest-stakes sports play; not where you want a five-figure win waiting on a cashier review.',
}

function hasSportsbook(c: Casino): boolean {
  return (SPORTSBOOK_SLUGS as readonly string[]).includes(c.slug)
}

export default function CryptoSportsbookPage() {
  const sportsbookCasinos = casinos.filter(hasSportsbook)
  const ranked = [...sportsbookCasinos].sort((a, b) => b.trustScore - a.trustScore)
  const top = ranked[0]

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
          <span className="text-[#f5f5f5]">Crypto Casinos With a Sportsbook</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Casino + Sportsbook</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Crypto Casinos With a Sportsbook 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            Five of the eight casinos in our ratings run a genuine sportsbook alongside the
            casino — so you can bet sports and play slots from one crypto balance. They are
            not interchangeable: Cloudbet leads on market depth, Duelbits on payout speed,
            BC.Game on no-KYC accessibility. This page ranks all five and says plainly which
            one fits which bettor.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos with a sportsbook" value={`${sportsbookCasinos.length}`} sub="of 8 reviewed" />
          <Stat label="Widest markets" value="Hundreds" sub="Cloudbet" />
          <Stat label="Fastest payout" value="<5 min" sub="Duelbits" />
          <Stat label="Cheapest entry" value="$5" sub="BC.Game minimum" />
        </div>

        <CasinoCTAStrip
          framing="Top 3 sportsbook operators by trust score. Not paid placement."
          cards={STRIP_CARDS}
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why a casino-plus-sportsbook at all</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              The practical case for a combined crypto casino and sportsbook is a single
              balance and a single cashier. Instead of funding a dedicated betting site and
              a separate casino, you deposit once in crypto and move between sports markets,
              slots, live dealer and provably-fair originals without a second KYC pass or a
              second withdrawal queue. For crypto-native bettors that consolidation is the
              whole appeal — one wallet, one set of withdrawal mechanics, one trust decision.
            </p>
            <p>
              The trade-off is that a sportsbook is only as good as its market depth and its
              payout reliability, and those vary sharply across the five operators here. A
              wide casino library does not imply a deep sportsbook, and the fastest casino
              cashier does not guarantee a sportsbook will pay a large sports win without a
              hold. The per-operator breakdown below separates the genuinely strong books
              from the ones where the sportsbook is a secondary add-on — and flags the one
              operator whose withdrawal record warrants caution at stake.
            </p>
            <p>
              For the broader withdrawal and KYC trade-offs that apply to sports play as much
              as casino play, see{' '}
              <Link href="/fast-withdrawal-casinos" className="text-[#7BB8D4] hover:underline">
                the fast-withdrawal casinos
              </Link>{' '}
              and{' '}
              <Link href="/no-kyc-casinos" className="text-[#7BB8D4] hover:underline">
                the no-KYC casinos
              </Link>{' '}
              hubs.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The 5 Sportsbook Casinos — Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. Each operator below runs a sportsbook alongside the casino,
            verified against the data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
          </p>
          <CasinoComparisonTable casinos={ranked} />
        </section>

        <TopRatedSection
          title="Top 3 Sportsbook Casino Picks"
          subtitle="The three highest-trust-score operators that run a sportsbook"
          casinos={ranked.slice(0, 3)}
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">What Each Sportsbook Actually Offers</h2>
          <div className="space-y-5">
            {ranked.map((casino) => (
              <article
                key={casino.slug}
                className="bg-[#111111] border border-[#222222] rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <Link
                      href={`/reviews/${casino.slug}`}
                      className="text-xl font-bold text-white hover:text-[#7BB8D4] transition-colors"
                    >
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
                  {PER_CASINO_SPORTSBOOK_NOTES[casino.slug]}
                </p>
                <div className="flex gap-3 flex-wrap text-xs">
                  <Link href={`/reviews/${casino.slug}`} className="text-[#7BB8D4] hover:underline">
                    Full {casino.name} review →
                  </Link>
                  <CTAButton
                    href={casino.affiliateUrl}
                    label={`Visit ${casino.name} ↗`}
                    variant="inline"
                    external
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {top && (
          <section className="mt-12 bg-[#111111] border border-[#7BB8D4]/20 rounded-2xl p-6 sm:p-8">
            <div className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">
              Editor&apos;s pick — sportsbook
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Crypto Sportsbook — FAQ</h2>
          <div className="space-y-4 mt-6">
            {SPORTSBOOK_FAQS.map((f) => (
              <div key={f.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{f.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Full rankings across every category</div>
            </Link>
            <Link href="/reviews/cloudbet" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Cloudbet Review</div>
              <div className="text-[#888888] text-sm">The best-in-class sportsbook in detail</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Payout speed for sports wins</div>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: SPORTSBOOK_FAQS.map((f) => ({
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

const SPORTSBOOK_FAQS = [
  {
    question: 'Which crypto casinos have a sportsbook?',
    answer:
      'Five of the eight casinos in our ratings run a genuine sportsbook alongside the casino: Cloudbet, Roobet, BC.Game, Shuffle and Duelbits. BitStarz, Mirax Casino and 7Bit Casino are casino-only in our catalogue. Cloudbet has the deepest book (crypto betting across hundreds of markets); Roobet covers ~40 sports including esports.',
  },
  {
    question: 'Which crypto sportsbook is best?',
    answer:
      "Cloudbet, on the evidence in our catalogue — our review rates its sportsbook among the best-in-class for crypto betting, with wagering across hundreds of markets, no withdrawal limits at the standard cashier, and dual Curaçao + Kahnawake licensing. It carries the highest entry point (0.001 BTC equivalent minimum), so it is calibrated for larger bankrolls rather than small-stakes testing.",
  },
  {
    question: 'Can I bet sports with crypto without KYC?',
    answer:
      'Yes — BC.Game and Duelbits both run a no-KYC policy for crypto play and withdrawals, covering their sportsbooks as well as the casino. Cloudbet and Shuffle run Light KYC that can trigger on larger withdrawals. Roobet runs Standard KYC. If no-document sports betting is the priority, BC.Game (widest coin support) and Duelbits (fastest payouts) are the two no-KYC options.',
  },
  {
    question: 'Is Roobet’s sportsbook safe to use?',
    answer:
      'Roobet runs a full sportsbook (~40 sports including esports, with Chelsea FC and 100 Thieves partnerships), but it carries the lowest trust score of the five for a documented reason: a pattern of multi-day withdrawal holds on large wins, with AskGamblers complaints at $20k–$115k and one $84,000 case publicly listed as Unsolved. It is usable for modest-stakes sports play; it is not where you want a five-figure sports win waiting on a cashier review.',
  },
  {
    question: 'Which crypto sportsbook pays out fastest?',
    answer:
      'Duelbits has the fastest headline withdrawal window of the five — instant to 5 minutes — followed by BC.Game (instant to 10 minutes). Cloudbet processes instant to 30 minutes but is the only one with no withdrawal limit, which matters more than raw speed for large sports wins. On-chain confirmation time then depends on the coin you withdraw in, not the sportsbook.',
  },
] as const
