import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, getCasinoBySlug } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'

export const metadata: Metadata = {
  title: 'Best Crypto Casinos for Dice 2026 — Provably-Fair Originals & 99% RTP',
  description:
    'Crypto casinos with the best dice game selection in 2026. BC.Game, Shuffle, Duelbits and Roobet compared on native provably-fair Originals, adjustable win-chance and house edge.',
  alternates: { canonical: '/game/dice' },
  openGraph: {
    url: '/game/dice',
    title: 'Best Crypto Casinos for Dice 2026',
    description:
      'Crypto casinos with the best dice selection — provably-fair Originals, 99% standard RTP and full seed verification.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Dice Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos for Dice 2026',
    description: 'BC.Game, Shuffle, Duelbits and Roobet compared on provably-fair dice Originals, win-chance maths and KYC posture.',
    images: ['/og-image.png'],
  },
}

// Curated to the four operators that ship a native provably-fair Dice Original.
// BC.Game, Shuffle and Duelbits lead on trust profile and dispute record.
// Roobet is included because Dice is part of the Roobet Originals suite; the
// per-casino notes block surfaces Roobet's withdrawalCaveat so the
// strength-with-caveat is visible on the listing page itself, not just inside
// the review. Mirrors the /game/crash curation rationale.
const DICE_CASINO_SLUGS = ['bc-game', 'duelbits', 'shuffle', 'roobet']

const PER_CASINO_DICE_NOTES: Record<string, { angle: string }> = {
  'bc-game': {
    angle:
      'BC.Game Dice is one of the longest-running provably-fair Dice products in the market — adjustable win-chance slider with the corresponding multiplier scaling from 1.02x at 98% win chance up to ~99x at 1% win chance, full auto-bet presets (martingale, anti-martingale, Fibonacci, custom), and seed audit on every roll. No-KYC at any withdrawal size across 100+ supported cryptocurrencies makes it the cleanest dice-to-cashout path on this list.',
  },
  shuffle: {
    angle:
      'Shuffle Dice uses the same server-seed commitment model as the rest of Shuffle Originals — adjustable win-chance, auto-bet with the standard strategy presets, full audit log. Every roll counts toward SHFL token rakeback and airdrop accrual regardless of outcome, which adds a small steady return on top of the dice EV for active players grinding a strategy.',
  },
  duelbits: {
    angle:
      'Duelbits Dice ships in the Duelbits Originals lineup with a clean modern interface and fast auto-bet cycle suited to high-volume strategy play. No-KYC for crypto play means you can grind a dice strategy from email-only signup; sub-5-minute crypto withdrawals if you decide to cash out after a session.',
  },
  roobet: {
    angle:
      'Roobet Dice is one of the founding Roobet Originals — adjustable win-chance, the standard auto-bet presets, full provably-fair seed verification. It sits alongside Crash, Mines, Towers, Plinko and the other Roobet house games. Trust score 6.8 with documented multi-day cashout holds at $20k+ — fine for testing a dice strategy at modest stakes, structurally riskier as a five-figure cashout destination.',
  },
}

const faqs = [
  {
    question: 'What is provably-fair dice?',
    answer: 'Provably-fair dice uses a server-seed commitment model: the casino publishes a hashed server seed before play begins, you contribute a client seed, and each roll combines both with an incrementing nonce to produce the result. At the end of a session the operator reveals the unhashed server seed — and you can independently re-run the hash to confirm it matches what was committed before any roll happened. This is genuinely different from a third-party RNG audit: with provably-fair dice, every individual roll is verifiable by the player, not just the long-run statistical distribution.',
  },
  {
    question: 'What is the house edge on crypto dice?',
    answer: 'Standard crypto dice runs at 1% house edge — equivalent to 99% RTP, among the highest of any common casino game. The house edge is built into the multiplier maths: at a 50% win chance the multiplier is 1.98x rather than the 2x that a zero-edge game would pay. The same 1% extraction applies across the entire win-chance slider, from ~1% win chance (~99x multiplier) up to ~98% win chance (~1.02x multiplier). A handful of operators offer reduced-edge dice for top VIP tiers (0.5% house edge has been seen at some operators); the default at BC.Game, Shuffle, Duelbits and Roobet is 1%.',
  },
  {
    question: 'Does the win-chance slider change the house edge?',
    answer: 'No. The 1% house edge is structural and applies uniformly across the full slider range. Picking 90% win chance for frequent small wins (1.1x multiplier) has the same long-run expected value per dollar wagered as picking 1% win chance for occasional huge wins (~99x multiplier). What the slider changes is variance, not edge — high-win-chance settings produce many small wins and small losses; low-win-chance settings produce rare large wins and frequent small losses. Total expected loss per dollar wagered is identical.',
  },
  {
    question: 'Can I beat dice with martingale or Fibonacci auto-betting?',
    answer: 'No. Martingale (double after a loss), anti-martingale (double after a win) and Fibonacci (increase stake by Fibonacci sequence after losses) all manipulate the size and timing of bets but do not change the underlying 1% house edge per roll. Over a sufficiently large sample, every strategy converges to the same negative expected value — the maths is the same regardless of bet-sizing logic. What auto-bet strategies actually do is reshape variance: martingale produces frequent small wins punctuated by occasional catastrophic losses when a long losing streak meets the table maximum. None of them are a way to extract positive EV from a 1% edge game. They are useful for executing a chosen variance profile, not for beating the maths.',
  },
  {
    question: 'Which crypto casinos have the best dice game?',
    answer: 'Four platforms in our rankings run native provably-fair Dice Originals: BC.Game, Shuffle, Duelbits and Roobet. BC.Game has the longest track record and the widest crypto support (100+ coins). Shuffle layers SHFL token rakeback on top of every roll. Duelbits offers the fastest crypto withdrawal headline (sub-5 minutes). Roobet ships Dice as part of its Originals suite but carries a lower trust score (6.8) due to documented withdrawal-hold cases at $20k+ amounts — see the Roobet review for the full picture before deciding to play.',
  },
  {
    question: 'Can I play crypto dice without KYC?',
    answer: 'Yes — BC.Game and Duelbits both operate no-KYC policies for crypto play, including dice play and dice-winning withdrawals at any size. Shuffle has Light KYC, with checks only triggered at larger withdrawal thresholds rather than on dice play itself. Roobet runs Standard KYC — Level 1 data at deposit, with full ID verification triggered by withdrawal size or activity flags rather than a fixed dollar threshold. For full anonymity, BC.Game or Duelbits are the default choices.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Dice Casinos', item: 'https://www.playmagpie.com/game/dice' },
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

export default function DiceCasinosPage() {
  const ranked = DICE_CASINO_SLUGS
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
          <span className="text-[#f5f5f5]">Dice</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">🎲 Dice Games</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos for Dice 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Dice is the original provably-fair crypto game — dating to the earliest Bitcoin casinos and still the
            highest-RTP format in common circulation at 99%. Four operators in our rankings run native Dice Originals
            with full seed verification on every roll.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Native Dice Originals', value: '4 platforms', sub: 'BC.Game · Shuffle · Duelbits · Roobet' },
            { label: 'Standard House Edge', value: '1%', sub: '99% RTP across all win-chance settings' },
            { label: 'Fastest Dice Payouts', value: 'Under 5 min', sub: 'Duelbits — 9.2/10 withdrawal score' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Top Casinos for Dice</h2>
          <p className="text-[#888888] text-sm mb-6">
            Filtered to platforms running a native provably-fair Dice Original. Ranked by trust score — see the
            per-casino notes below for the operational angle on each.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ranked.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Per-operator dice notes</h2>
          <p className="text-[#888888] text-sm mb-6">
            What each operator brings to dice play specifically — and what to know before you deposit.
          </p>
          <div className="space-y-4">
            {DICE_CASINO_SLUGS.map((slug) => {
              const casino = getCasinoBySlug(slug)
              if (!casino) return null
              const note = PER_CASINO_DICE_NOTES[slug]
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
          <h2 className="text-2xl font-bold text-white">How dice works</h2>
          <p className="text-[#888888] leading-relaxed">
            Crypto dice is a single-decision game: you pick a win chance from a slider (typically anywhere between
            ~1% and ~98%), the casino converts that into a target threshold, and a single random number between
            0 and 100 (or 0 and 9,999 depending on the implementation) determines whether you win. Predict
            &ldquo;above&rdquo; or &ldquo;below&rdquo; the threshold, set your stake, click roll. There is no
            sequential decision-making the way blackjack or poker has — every roll is a fresh, independent event.
          </p>
          <p className="text-[#888888] leading-relaxed">
            The multiplier moves inversely to the win chance you picked. 50% win chance pays 1.98x. 25% win chance
            pays 3.96x. 10% pays 9.9x. 2% pays 49.5x. 1% pays 99x. The maths is built so that the casino keeps 1%
            in expected value at every position on the slider — what you are actually picking when you move the
            slider is a variance profile, not a return profile.
          </p>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">The house-edge maths, in plain numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '99% RTP, fixed across the slider',
                body: 'At every win-chance setting from 1% to 98%, the operator extracts a 1% edge. A $100 stake at 50% win chance returns $99 in expected value (50% × $198 win + 50% × $0). A $100 stake at 10% win chance returns $99 in expected value (10% × $990 win + 90% × $0). Same EV per dollar wagered, dramatically different variance.',
              },
              {
                title: 'Variance scales with the inverse of win chance',
                body: 'At 50% win chance you expect a roughly even split of wins and losses around 0 over many rolls. At 10% you expect ~9 losses for every 1 win, but the win is 10x larger. At 1% you expect ~99 losses for every 1 win, and the win is 99x larger. Bankroll-management strategies need to match the variance you choose — a 1% win-chance grinder needs ~100x the bankroll a 50% grinder needs to weather a normal losing streak.',
              },
              {
                title: 'Why dice has the highest RTP of common casino games',
                body: 'A 1% edge beats virtually every alternative. Standard blackjack with optimal strategy runs around 0.5% house edge, but with table game contribution rates of 5%-10% to bonus wagering the practical edge for bonus play is far worse. European roulette is 2.7%. Slots typically run 2%-15% depending on title. Provably-fair dice at 1% is structurally the highest expected-return common format in crypto casino play.',
              },
              {
                title: 'No strategy reduces the edge',
                body: 'The 1% extraction is per-roll and bet-size-independent. Martingale, Fibonacci, custom auto-bet logic — all of them produce the same long-run EV because the per-roll edge does not move. What strategies actually do is concentrate or dilute variance into specific patterns. Picking a strategy is picking when you want your losing streaks to feel worst, not whether you have them.',
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
          <h2 className="text-2xl font-bold text-white">How provably-fair dice verifies</h2>
          <p className="text-[#888888] leading-relaxed">
            Provably-fair dice at BC.Game, Shuffle, Duelbits and Roobet uses a server-seed commitment model.
            Before play begins, the casino publishes a SHA-256 hash of a server seed it has generated. You
            contribute a client seed (you can use the default the casino generates or pick your own). Each roll
            combines the server seed, your client seed, and an incrementing nonce to produce the result via a
            deterministic hash chain — the exact derivation is documented in each casino&apos;s provably-fair
            article.
          </p>
          <p className="text-[#888888] leading-relaxed">
            When you change your client seed, the casino reveals the unhashed server seed for the session that
            just ended. You can independently re-hash that server seed and confirm it matches the original
            commitment — which proves the casino chose the server seed before any of your rolls happened, not
            after. The verification is a few lines of JavaScript or Python that you can run locally. This is
            qualitatively different from third-party RNG slots audited by GLI or iTech Labs: with lab-tested RNG
            you trust the certification at the population level; with provably-fair dice, you can verify each
            individual roll.
          </p>
        </section>

        <section className="mb-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-[#888888] text-sm mb-8">
            Common questions from players choosing a crypto casino for dice in 2026.
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
              <div className="text-[#888888] text-sm">Same provably-fair model applied to multiplier curves</div>
            </Link>
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Dice strategy grinding without identity verification</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Cash out a dice session in under 5 minutes</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
