import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, getCasinoBySlug } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'

// Top 3 by trust from the curated 4: BC.Game, Duelbits, Shuffle.
// Roobet (4th curated, 6.8 trust) deliberately excluded from the strip
// even though it appears in the per-operator notes below. The strip
// is editorial recommendation, not catalogue completeness.
const STRIP_CARDS: CTAStripCard[] = [
  {
    slug: 'bc-game',
    facts: [
      { label: 'Native Crash', value: 'Provably-fair Original + Aviator + JetX' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'KYC', value: 'None: at any size' },
    ],
  },
  {
    slug: 'duelbits',
    facts: [
      { label: 'Native Crash', value: 'Duelbits Originals Crash' },
      { label: 'Withdrawal', value: 'Instant to 5 minutes (fastest)' },
      { label: 'KYC', value: 'None for crypto play' },
    ],
  },
  {
    slug: 'shuffle',
    facts: [
      { label: 'Native Crash', value: 'Shuffle Originals + SHFL rakeback per round' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'KYC', value: 'Light: triggered at scale' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Best Crypto Casinos for Crash Games 2026: Aviator, JetX, Originals',
  description:
    'Crypto casinos with the best crash game selection in 2026. BC.Game, Shuffle, Duelbits and Roobet compared on native Originals, Aviator coverage, RTP and KYC posture.',
  alternates: { canonical: '/game/crash' },
  openGraph: {
    url: '/game/crash',
    title: 'Best Crypto Casinos for Crash Games 2026',
    description:
      'Crypto casinos with the best crash game selection: Originals, Aviator and provably-fair seed verification.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Crash Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos for Crash Games 2026',
    description: 'BC.Game, Shuffle, Duelbits and Roobet compared on crash Originals, Aviator coverage and provably-fair verification.',
    images: ['/og-image.png'],
  },
}

// BC.Game / Shuffle / Duelbits lead: three operators with native provably-fair
// crash Originals plus the strongest trust profiles in the crash category.
// Roobet is included because Crash is the genre anchor for the Roobet brand
// (alongside Snoop's HotBox, a Snoop-themed Crash variant), and excluding a
// legitimate crash-led operator would make the page less useful. The
// per-casino notes block below surfaces Roobet's withdrawal caveat where it
// matters for the reader before they decide to play.
const CRASH_CASINO_SLUGS = ['bc-game', 'duelbits', 'shuffle', 'roobet']

// Per-casino crash-page notes. Each operator gets its own context paragraph
// that frames its crash credentials honestly. For Roobet specifically the
// note carries the withdrawalCaveat so the strength-with-caveat is visible
// on the listing page itself, not just inside the full review.
const PER_CASINO_CRASH_NOTES: Record<string, { angle: string; caveat?: string }> = {
  'bc-game': {
    angle:
      'BC.Game runs the widest crash catalogue of the four: native Originals (Crash, Plinko, Dice and more) alongside Aviator, JetX and Spaceman from third parties. No-KYC at any withdrawal size and 100+ supported cryptocurrencies make it the cleanest crash-to-cashout path on this list.',
  },
  shuffle: {
    angle:
      'Shuffle pairs its native Crash Original with the SHFL token rewards economy: every crash round earns rakeback and counts toward SHFL airdrops regardless of multiplier outcome. The Light KYC model means most players never see a document check; larger withdrawals may trigger review.',
  },
  duelbits: {
    angle:
      'Duelbits is the most explicit on its in-house Crash product: provably-fair, sub-5-minute withdrawal headline, no-KYC for crypto play. Cashback-first welcome model rather than a deposit match, which suits volume crash play better than match-bonus operators where wagering caps cut early winnings.',
  },
  roobet: {
    angle:
      'Crash is the genre anchor for the Roobet brand: the native Crash Original is the flagship, with Snoop\'s HotBox running as a Snoop-themed variant alongside Mines, Towers, Dice, Plinko and the other Roobet Originals. ~6,000 third-party titles round out the catalogue. Trust score 6.8 reflects documented withdrawal-hold cases at $20k+ that the other three operators on this page do not have on record.',
  },
}

const faqs = [
  {
    question: 'What is a crash game at a crypto casino?',
    answer: 'A crash game is a continuous-multiplier round where the payout multiplier rises from 1.00x in real time and crashes at a random point. You manually cash out before the crash to lock in your current multiplier, or set an auto-cashout at a preset value. If the round crashes before you cash out, you lose the stake. The format started in crypto and remains overwhelmingly crypto-native. Aviator from Spribe is the genre-defining title.',
  },
  {
    question: 'Are crash games rigged?',
    answer: 'The major crash titles run on provably-fair mechanics: the crash point is determined by a cryptographic seed the operator commits to before play, which you can verify after the session by re-running the hash. This is different from third-party RNG slots, where you trust a lab certification but can\'t verify any individual round. BC.Game Originals, Shuffle Originals and Duelbits Originals all use the same verification model.',
  },
  {
    question: 'Which crypto casinos have the best crash selection?',
    answer: 'Four platforms in our rankings run native provably-fair crash Originals: BC.Game, Shuffle, Duelbits and Roobet. BC.Game runs the widest third-party title list (Aviator, JetX, Spaceman) plus its own Originals at 10,000+ games total. Duelbits is the most explicit on its in-house crash product with sub-5-minute crypto withdrawals. Shuffle pairs Originals with the SHFL token rewards economy. Roobet is included because Crash is the genre anchor for its brand: its native Crash Original plus the Snoop\'s HotBox Crash variant are the flagship products. But its trust score (6.8) sits well below the other three because of documented withdrawal-hold cases at $20k+ amounts; see the Roobet review for the full picture.',
  },
  {
    question: 'What is the RTP on Aviator and other crash games?',
    answer: 'Top crash titles run at 97–99% RTP, among the highest in the industry. Aviator is officially listed at 97% RTP by Spribe. In-house Originals at BC.Game, Shuffle and Duelbits typically sit in the same band. The high RTP is one reason crash has become the dominant crypto-native format: it returns more to players over the long run than most slots.',
  },
  {
    question: 'Can I play crash games without KYC?',
    answer: 'Yes, BC.Game and Duelbits both operate no-KYC policies for crypto play, including crash. You can sign up with email, deposit, play and withdraw without submitting identity documents. Shuffle has Light KYC, with checks only triggered at larger withdrawal thresholds. Roobet runs Standard KYC: basic personal data at deposit, with full ID checks triggered by withdrawal size or activity flags rather than a fixed dollar threshold. For full anonymity, BC.Game or Duelbits are the default choices.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crash Casinos', item: 'https://www.playmagpie.com/game/crash' },
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

export default function CrashCasinosPage() {
  const ranked = CRASH_CASINO_SLUGS
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
          <span className="text-[#f5f5f5]">Crash</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">📈 Crash Games</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos for Crash Games 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Crash is one of the few casino formats that became popular through crypto and stayed there. The mechanic is
            simple, the math is verifiable on-chain, and four operators in our rankings run native provably-fair Crash
            Originals: BC.Game, Shuffle and Duelbits lead on trust, with Roobet as the fourth on the strength of its
            Crash flagship and Snoop&apos;s HotBox variant.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Native Crash Originals', value: '4 platforms', sub: 'BC.Game · Shuffle · Duelbits · Roobet' },
            { label: 'Typical Originals RTP', value: '97–99%', sub: 'Higher than most third-party slots' },
            { label: 'Fastest Crash Payouts', value: 'Under 5 min', sub: 'Duelbits: 9.2/10 withdrawal score' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <CasinoCTAStrip
          framing="Top 3 native-Crash operators by trust score. Roobet covered below despite ~6.8 trust given its Crash flagship."
          cards={STRIP_CARDS}
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Top Casinos for Crash Games</h2>
          <p className="text-[#888888] text-sm mb-6">
            Filtered to platforms with native provably-fair crash Originals. Ranked by trust score. See the per-casino notes below for the operational angle on each.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ranked.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Per-operator crash notes</h2>
          <p className="text-[#888888] text-sm mb-6">
            What each operator brings to crash play specifically, and what to know before you deposit.
          </p>
          <div className="space-y-4">
            {CRASH_CASINO_SLUGS.map((slug) => {
              const casino = getCasinoBySlug(slug)
              if (!casino) return null
              const note = PER_CASINO_CRASH_NOTES[slug]
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
          <h2 className="text-2xl font-bold text-white">How crash games work</h2>
          <p className="text-[#888888] leading-relaxed">
            The premise is a multiplier that rises from 1.00x in real time and crashes at a random point. You either
            cash out manually before the crash to lock in your current multiplier, or set an auto-cashout at a preset
            value (1.5x, 2x, 10x, whatever your strategy calls for). If the round crashes before you cash out, the
            stake is lost.
          </p>
          <p className="text-[#888888] leading-relaxed">
            What makes crash distinct from other casino games is the visibility. You see the multiplier rising live, you
            watch other players cash out (or not) and your decision is continuous rather than per-spin. The strategic
            split is between low-multiplier safety (1.5–2x for frequent small wins, higher hit rate) and high-multiplier
            ambition (wait for 10x+ before cashing out, lower hit rate, bigger payouts when you land). Auto-cashout is
            essential for any consistent strategy; manual cashout is for players who want to read the room round by round.
          </p>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">The titles to look for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Aviator (Spribe)',
                body: 'The genre original. Aviator is the most widely distributed crash title and the de facto benchmark. If a casino markets itself on crash, Aviator support is the table-stakes check. Officially listed at 97% RTP. Available at all three platforms below alongside most major crypto operators.',
              },
              {
                title: 'JetX (SmartSoft)',
                body: 'Similar mechanic with a different visual presentation and deeper bet-history tooling: the round log shows past crash multipliers further back than most competitors, which suits players who track patterns. Distribution narrower than Aviator but available at BC.Game.',
              },
              {
                title: 'Spaceman (Pragmatic Play)',
                body: 'Pragmatic Play\'s entry into the crash format. Available at any operator carrying the Pragmatic library, which means BitStarz, Mirax, BC.Game and most other major crypto casinos. Distinct visual but mechanically very close to Aviator.',
              },
              {
                title: 'In-house Originals',
                body: 'BC.Game, Shuffle, Duelbits and Roobet each run native crash games with provably-fair seeds: auditable by the player after every round. RTP typically sits in the same 97–99% band as Aviator, with the advantage of full seed verification on every spin. Roobet additionally runs the Snoop\'s HotBox Crash variant, a Snoop Dogg–themed reskin of the same provably-fair Crash mechanic.',
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
          <h2 className="text-2xl font-bold text-white">How provably-fair crash actually verifies</h2>
          <p className="text-[#888888] leading-relaxed">
            Crash games at BC.Game, Shuffle, Duelbits and Roobet use a server-seed commitment model you can audit
            yourself. The operator publishes a hashed server seed before play. You contribute a client seed. Each round combines both
            with a nonce to produce the crash multiplier. Once a session ends, the unhashed server seed is published,
            and you can independently re-run the hash to confirm it matches what was committed before any round was played.
          </p>
          <p className="text-[#888888] leading-relaxed">
            This is genuinely different from third-party RNG slots audited by GLI or iTech Labs. With lab-tested RNG you
            trust the certification; with provably-fair, you verify each individual round. For a format where outcomes
            are public and visible in real time, the verifiability matches the medium. For a deeper explainer of the same
            mechanism in the broader provably-fair context, see our{' '}
            <Link href="/best-crypto-pokies-nz" className="text-[#7BB8D4] hover:text-[#8fc4d8] transition-colors">
              best crypto pokies for NZ
            </Link>{' '}
            page: same model, applied to slot Originals.
          </p>
        </section>

        <section className="mb-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-[#888888] text-sm mb-8">
            Common questions from players choosing a crypto casino for crash games in 2026.
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
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Crash play without identity verification</div>
            </Link>
            <Link href="/best-crypto-pokies-nz" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Best Crypto Pokies (NZ)</div>
              <div className="text-[#888888] text-sm">Same provably-fair model, applied to slots</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Cash out a crash win in under 5 minutes</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
