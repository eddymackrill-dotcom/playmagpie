import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, getCasinoBySlug } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'

export const metadata: Metadata = {
  title: 'Best Crypto Casinos for Plinko 2026 — Originals, Row Count & Volatility',
  description:
    'Crypto casinos with the best Plinko selection in 2026. BC.Game, Shuffle, Duelbits and Roobet compared on native provably-fair Originals, row-count maths and multiplier ranges.',
  alternates: { canonical: '/game/plinko' },
  openGraph: {
    url: '/game/plinko',
    title: 'Best Crypto Casinos for Plinko 2026',
    description:
      'Crypto casinos with the best Plinko selection — provably-fair Originals, 8-16 row customisation and full seed verification.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Plinko Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos for Plinko 2026',
    description: 'BC.Game, Shuffle, Duelbits and Roobet compared on Plinko Originals, row-count maths and KYC posture.',
    images: ['/og-image.png'],
  },
}

// Curated to the four operators with a native provably-fair Plinko Original.
// Same rationale as /game/crash and /game/dice — BC.Game, Shuffle and Duelbits
// lead on trust; Roobet is included because Plinko is part of the Roobet
// Originals lineup. The per-casino notes block surfaces Roobet's
// withdrawalCaveat where it matters for the reader.
const PLINKO_CASINO_SLUGS = ['bc-game', 'duelbits', 'shuffle', 'roobet']

const PER_CASINO_PLINKO_NOTES: Record<string, { angle: string }> = {
  'bc-game': {
    angle:
      'BC.Game Plinko has been in the Originals lineup since BC.Game launched in 2017 — 8-16 row customisation, three volatility modes (low, medium, high), full auto-bet with bet-amount strategies, and seed audit on every drop. No-KYC across all 100+ supported cryptocurrencies. The longest-running Plinko product in this list by several years.',
  },
  shuffle: {
    angle:
      'Shuffle Plinko uses the same server-seed model as the rest of Shuffle Originals — standard 8-16 row range and three volatility levels. Every drop earns SHFL token rakeback and counts toward airdrop accrual regardless of multiplier hit, which adds a small steady return on top of Plinko EV for active players. The token layer is the meaningful differentiator from other Plinko products.',
  },
  duelbits: {
    angle:
      'Duelbits Plinko sits in the Duelbits Originals suite alongside Crash, Dice and Slots. Clean drop animation, full auto-bet for high-volume strategy play, no-KYC for crypto play. Sub-5-minute crypto withdrawal headline if you hit a high-volatility multiplier and decide to cash out.',
  },
  roobet: {
    angle:
      'Plinko is one of the Roobet Originals alongside Crash, Mines, Towers and Dice — standard 8-16 row range, three volatility modes, provably-fair seed verification. Trust score 6.8 with documented multi-day cashout holds at $20k+ amounts. Fine for testing high-volatility Plinko strategies at modest stakes; structurally riskier as a destination for a max-volatility outlier win.',
  },
}

const faqs = [
  {
    question: 'What is provably-fair Plinko?',
    answer: 'Provably-fair Plinko uses a server-seed commitment model. The casino publishes a hashed server seed before play; you contribute a client seed; each ball drop combines both with an incrementing nonce to determine the path the ball takes through the pegs. At session end the unhashed server seed is revealed, and you can independently re-hash it to confirm the casino committed to the seed before any drops happened. The path the ball takes is therefore deterministic from the seed combination — not chosen by the casino after seeing your stake.',
  },
  {
    question: 'What is the RTP on Plinko?',
    answer: 'Provably-fair Plinko at BC.Game, Shuffle, Duelbits and Roobet typically runs at 97% to 99% RTP depending on row count and volatility setting. Stake&apos;s original Plinko design — which BC.Game, Shuffle, Duelbits and Roobet all derive their implementations from — published 99% RTP across most configurations, with marginally lower figures on the highest-volatility settings where the maximum multiplier compensates. Third-party Plinko games (BGaming, Spribe) cluster in the same band but specific RTP per title varies; check the individual game info panel before play.',
  },
  {
    question: 'Does row count affect the house edge?',
    answer: 'Row count primarily affects multiplier distribution rather than house edge. More rows (16) means a wider multiplier range — the outermost buckets pay much larger multipliers but are hit far less often, the centre buckets pay below 1x and are hit much more often. Fewer rows (8) flattens the distribution into a narrower range. The expected value per drop stays close to the published RTP regardless of row count; what row count actually changes is variance. Hunting the 1000x outer bucket on a 16-row high-volatility setting is qualitatively different play from grinding the centre buckets on an 8-row low-volatility setting, but both extract the same percentage of your stake over a long enough sample.',
  },
  {
    question: 'What is the highest multiplier on Plinko?',
    answer: 'On a standard 16-row high-volatility Plinko configuration, the outermost buckets pay up to ~1,000x your stake — these are the headline multipliers the format is marketed on. Frequency is low: hitting a 1,000x outer bucket on 16-row high-vol happens on the order of once per several thousand drops in random play. The lower-volatility settings cap at much smaller multipliers (high-vol 16-row tops at ~1,000x; low-vol 8-row tops at around 5x-10x) but hit the larger payouts far more often. Roobet, BC.Game, Shuffle and Duelbits all publish full multiplier tables per row count and volatility setting in their game info panels.',
  },
  {
    question: 'Can I play Plinko without KYC?',
    answer: 'Yes — BC.Game and Duelbits operate no-KYC policies for crypto play and crypto withdrawals at any size, including Plinko winnings. Shuffle runs Light KYC with checks triggered at larger withdrawal thresholds rather than on Plinko play itself. Roobet runs Standard KYC, with full ID verification triggered by withdrawal size or activity flags rather than a fixed dollar threshold — relevant if you hit a high-volatility outlier multiplier and want to cash out the result. For full anonymity around an unexpected Plinko win, BC.Game or Duelbits are the default choices.',
  },
  {
    question: 'Which crypto casinos have the best Plinko?',
    answer: 'Four operators in our rankings run a native provably-fair Plinko Original: BC.Game, Shuffle, Duelbits and Roobet. BC.Game has the longest track record and the widest crypto coverage (100+ coins). Shuffle layers SHFL token rakeback on every drop, which makes it marginally more EV-positive at sustained volume. Duelbits offers the fastest crypto withdrawal headline (sub-5 minutes). Roobet ships Plinko as part of its Originals suite but carries a lower trust score (6.8) due to documented withdrawal-hold cases at $20k+ — see the Roobet review for context before chasing a max-volatility outlier multiplier there.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Plinko Casinos', item: 'https://www.playmagpie.com/game/plinko' },
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

export default function PlinkoCasinosPage() {
  const ranked = PLINKO_CASINO_SLUGS
    .map((slug) => casinos.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

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
          <Link href="/game" className="hover:text-white transition-colors">Games</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Plinko</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">⚪ Plinko Games</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos for Plinko 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Plinko is the format Stake pioneered as a provably-fair adaptation of the classic peg-and-ball drop —
            adjustable row count, three volatility modes, max multipliers up to ~1,000x on the highest settings.
            Four operators in our rankings run native Plinko Originals with full seed verification on every drop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Native Plinko Originals', value: '4 platforms', sub: 'BC.Game · Shuffle · Duelbits · Roobet' },
            { label: 'Typical RTP', value: '97–99%', sub: 'Varies by row count + volatility' },
            { label: 'Max Multiplier', value: '~1,000x', sub: '16 rows, high volatility' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Top Casinos for Plinko</h2>
          <p className="text-[#888888] text-sm mb-6">
            Filtered to platforms running a native provably-fair Plinko Original. Ranked by trust score — see the
            per-casino notes below for the operational angle on each.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ranked.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Per-operator Plinko notes</h2>
          <p className="text-[#888888] text-sm mb-6">
            What each operator brings to Plinko specifically — and what to know before you deposit.
          </p>
          <div className="space-y-4">
            {PLINKO_CASINO_SLUGS.map((slug) => {
              const casino = getCasinoBySlug(slug)
              if (!casino) return null
              const note = PER_CASINO_PLINKO_NOTES[slug]
              if (!note) return null
              return (
                <div key={slug} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <Link
                      href={`/reviews/${slug}`}
                      className="font-bold text-[#f5f5f5] hover:text-[#7BB8D4] transition-colors text-base"
                    >
                      {casino.name}
                    </Link>
                    <span className="text-xs text-[#888888]">
                      Trust <span className="text-[#7BB8D4] font-semibold">{casino.trustScore}</span>/10 ·
                      Withdrawal <span className="text-[#7BB8D4] font-semibold">{casino.withdrawalScore}</span>/10 ·
                      KYC {casino.kycLevel}
                    </span>
                  </div>
                  <p className="text-[#888888] text-sm leading-relaxed mb-3">{note.angle}</p>
                  {casino.withdrawalCaveat && (
                    <div className="mt-3 border-l-2 border-[#7BB8D4]/40 pl-4 py-1 bg-[#7BB8D4]/[0.04] rounded-r">
                      <div className="text-[#7BB8D4] text-xs font-semibold uppercase tracking-wide mb-1">
                        Withdrawal caveat
                      </div>
                      <p className="text-[#bbbbbb] text-sm leading-relaxed">{casino.withdrawalCaveat}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">How Plinko works</h2>
          <p className="text-[#888888] leading-relaxed">
            You pick three settings before each drop: row count (typically 8 to 16), volatility (low, medium, high)
            and stake. The ball drops from the top of the board and bounces through randomised pegs into one of the
            payout buckets at the bottom. Centre buckets pay below 1x (you lose some of your stake). Outer buckets
            pay multipliers that scale with the volatility setting and row count — the outermost buckets at 16
            rows on high volatility pay up to ~1,000x.
          </p>
          <p className="text-[#888888] leading-relaxed">
            The trade-off the row-count and volatility settings encode is variance, not expected value. The RTP is
            broadly consistent across settings (97-99% depending on configuration); what changes is how that RTP is
            distributed across drops. High-volatility 16-row Plinko produces many sub-1x outcomes punctuated by
            rare very-large multipliers. Low-volatility 8-row Plinko produces many drops in a tight cluster around
            1x with much smaller maxes. Both extract the same percentage of your stake over a long enough sample.
          </p>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">Row count and volatility — the trade-off in plain numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '8 rows, low volatility',
                body: 'Tight multiplier distribution clustered around 1x. Centre buckets pay around 0.5x; outermost buckets pay around 5x-6x. Hit rate on the outer buckets is meaningful — you will land them regularly in any session of more than a few dozen drops. Suited to bankroll-conservative play where you want to extract long sessions from a fixed deposit.',
              },
              {
                title: '16 rows, high volatility',
                body: 'Wide distribution. Centre buckets pay around 0.2x; outermost buckets pay up to ~1,000x. Outermost hit rate is low — order of once per several thousand drops in random play. Suited to chasing single large outlier wins from a small bankroll; expect long losing streaks between landings, on the order of 90%+ of drops paying below 1x.',
              },
              {
                title: 'Why the maths is symmetric',
                body: 'The peg layout produces a Gaussian (bell-curve) distribution of ball landing positions. The middle of the curve gets the most landings; the tails get progressively fewer. Volatility settings change the multipliers assigned to each bucket but not the landing-frequency curve. The casino sets multipliers per bucket such that (frequency × multiplier) summed across buckets equals (RTP × stake) — and that ratio holds regardless of which volatility profile you pick.',
              },
              {
                title: 'What it means in practice',
                body: 'Pick volatility based on session length and bankroll, not on expected return. A $10 bankroll on 16-row high-vol Plinko will frequently be wiped out in 50-100 drops before landing a major multiplier. A $10 bankroll on 8-row low-vol Plinko will typically last several hundred drops with frequent small wins and small losses. Both have the same expected loss as a percentage of stake — different lived experience.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">How provably-fair Plinko verifies</h2>
          <p className="text-[#888888] leading-relaxed">
            Plinko at BC.Game, Shuffle, Duelbits and Roobet uses the same server-seed commitment model as the
            other provably-fair Originals. Before play, the casino publishes a SHA-256 hash of a server seed. You
            contribute a client seed. Each drop combines the server seed, your client seed and an incrementing
            nonce to produce a deterministic sequence of left-or-right peg deflections, which dictates the path
            the ball takes through the board.
          </p>
          <p className="text-[#888888] leading-relaxed">
            When you change your client seed, the unhashed server seed for the prior session is revealed and you
            can independently re-hash it to confirm it matches the original commitment. The verification proves
            the casino chose the seed sequence before any of your drops happened. Each operator publishes a
            provably-fair article documenting the exact hash chain and the verification code you can run. For a
            deeper explainer of the same mechanism applied to multiplier-curve games, see our{' '}
            <Link href="/game/crash" className="text-[#7BB8D4] hover:text-[#8fc4d8] transition-colors">
              crash casinos page
            </Link>
            {' '}— identical seed model, different game format.
          </p>
        </section>

        <section className="mb-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-[#888888] text-sm mb-8">
            Common questions from players choosing a crypto casino for Plinko in 2026.
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
            <Link href="/game/crash" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crash Casinos</div>
              <div className="text-[#888888] text-sm">Same provably-fair model on multiplier curves</div>
            </Link>
            <Link href="/game/dice" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Dice Casinos</div>
              <div className="text-[#888888] text-sm">99% RTP — the highest-edge provably-fair format</div>
            </Link>
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Cash out a Plinko outlier multiplier without ID submission</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
