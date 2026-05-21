import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'

export const metadata: Metadata = {
  title: 'Best Crypto Casinos for Crash Games 2026 — Aviator, JetX, Originals',
  description:
    'Crypto casinos with the best crash game selection in 2026. BC.Game, Shuffle and Duelbits compared on Originals, Aviator coverage, RTP and no-KYC play.',
  alternates: { canonical: '/game/crash' },
  openGraph: {
    url: '/game/crash',
    title: 'Best Crypto Casinos for Crash Games 2026',
    description:
      'Crypto casinos with the best crash game selection — Originals, Aviator and provably-fair seed verification.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Crash Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos for Crash Games 2026',
    description: 'BC.Game, Shuffle and Duelbits compared on crash Originals, Aviator and provably-fair verification.',
    images: ['/og-image.png'],
  },
}

const CRASH_CASINO_SLUGS = ['bc-game', 'duelbits', 'shuffle']

const faqs = [
  {
    question: 'What is a crash game at a crypto casino?',
    answer: 'A crash game is a continuous-multiplier round where the payout multiplier rises from 1.00x in real time and crashes at a random point. You manually cash out before the crash to lock in your current multiplier, or set an auto-cashout at a preset value. If the round crashes before you cash out, you lose the stake. The format started in crypto and remains overwhelmingly crypto-native — Aviator from Spribe is the genre-defining title.',
  },
  {
    question: 'Are crash games rigged?',
    answer: 'The major crash titles run on provably-fair mechanics — the crash point is determined by a cryptographic seed the operator commits to before play, which you can verify after the session by re-running the hash. This is different from third-party RNG slots, where you trust a lab certification but can\'t verify any individual round. BC.Game Originals, Shuffle Originals and Duelbits Originals all use the same verification model.',
  },
  {
    question: 'Which crypto casinos have the best crash selection?',
    answer: 'BC.Game, Shuffle and Duelbits are the three platforms with native crash Originals alongside third-party titles like Aviator (Spribe), JetX (SmartSoft) and Spaceman (Pragmatic Play). Duelbits is the most explicit on its in-house crash product. BC.Game runs the widest title selection at 10,000+ games total. Shuffle pairs Originals with its SHFL token rewards system.',
  },
  {
    question: 'What is the RTP on Aviator and other crash games?',
    answer: 'Top crash titles run at 97–99% RTP, among the highest in the industry. Aviator is officially listed at 97% RTP by Spribe. In-house Originals at BC.Game, Shuffle and Duelbits typically sit in the same band. The high RTP is one reason crash has become the dominant crypto-native format — it returns more to players over the long run than most slots.',
  },
  {
    question: 'Can I play crash games without KYC?',
    answer: 'Yes — BC.Game and Duelbits both operate no-KYC policies for crypto play, including crash. You can sign up with email, deposit, play and withdraw without submitting identity documents. Shuffle has Light KYC, with checks only triggered at larger withdrawal thresholds. For full anonymity, BC.Game or Duelbits are the default choices.',
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
            simple, the math is verifiable on-chain, and three platforms — BC.Game, Shuffle and Duelbits — run polished
            in-house Originals alongside the genre benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Native Crash Originals', value: '3 platforms', sub: 'BC.Game · Shuffle · Duelbits' },
            { label: 'Typical Originals RTP', value: '97–99%', sub: 'Higher than most third-party slots' },
            { label: 'Fastest Crash Payouts', value: 'Under 5 min', sub: 'Duelbits — 9.2/10 withdrawal score' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Top Casinos for Crash Games</h2>
          <p className="text-[#888888] text-sm mb-6">
            Filtered to platforms with native provably-fair crash Originals — the three operators whose product matches the format properly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ranked.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">How crash games work</h2>
          <p className="text-[#888888] leading-relaxed">
            The premise is a multiplier that rises from 1.00x in real time and crashes at a random point. You either
            cash out manually before the crash to lock in your current multiplier, or set an auto-cashout at a preset
            value (1.5x, 2x, 10x — whatever your strategy calls for). If the round crashes before you cash out, the
            stake is lost.
          </p>
          <p className="text-[#888888] leading-relaxed">
            What makes crash distinct from other casino games is the visibility. You see the multiplier rising live, you
            watch other players cash out — or not — and your decision is continuous rather than per-spin. The strategic
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
                body: 'The genre original. Aviator is the most widely distributed crash title and the de facto benchmark — if a casino markets itself on crash, Aviator support is the table-stakes check. Officially listed at 97% RTP. Available at all three platforms below alongside most major crypto operators.',
              },
              {
                title: 'JetX (SmartSoft)',
                body: 'Similar mechanic with a different visual presentation and deeper bet-history tooling — the round log shows past crash multipliers further back than most competitors, which suits players who track patterns. Distribution narrower than Aviator but available at BC.Game.',
              },
              {
                title: 'Spaceman (Pragmatic Play)',
                body: 'Pragmatic Play\'s entry into the crash format. Available at any operator carrying the Pragmatic library, which means BitStarz, Mirax, BC.Game and most other major crypto casinos. Distinct visual but mechanically very close to Aviator.',
              },
              {
                title: 'In-house Originals',
                body: 'BC.Game, Shuffle and Duelbits each run native crash games with provably-fair seeds — auditable by the player after every round. RTP typically sits in the same 97–99% band as Aviator, with the advantage of full seed verification on every spin.',
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
            Crash games at BC.Game, Shuffle and Duelbits use a server-seed commitment model you can audit yourself. The
            operator publishes a hashed server seed before play. You contribute a client seed. Each round combines both
            with a nonce to produce the crash multiplier. Once a session ends, the unhashed server seed is published —
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
            page — same model, applied to slot Originals.
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
