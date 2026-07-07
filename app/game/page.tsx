import type { Metadata } from 'next'
import Link from 'next/link'
import { GAME_TYPES } from '@/lib/programmatic'

// Rebuilt 2026-07-07 (spam-update consolidation): the former /game/slots,
// /game/blackjack, /game/roulette and /game/live-dealer pages were one
// unique paragraph over an identical unfiltered all-casino grid, the exact
// name-swap template pattern CLAUDE.md bans. Their editorial content now
// lives here as anchored sections (#slots, #blackjack, #roulette,
// #live-dealer) and the old URLs 301 to this page. Crash, dice and plinko
// keep dedicated pages: they are crypto-native formats with genuinely
// distinct treatments and earned search demand.

export const metadata: Metadata = {
  title: 'Crypto Casino Games: Formats, Odds and Where to Play',
  description:
    'How each casino game format actually plays with crypto: slots RTP and bonus contribution, blackjack and roulette house edges, live dealer bet limits, plus the crypto-native trio of crash, dice and plinko.',
  alternates: { canonical: '/game' },
  openGraph: {
    url: '/game',
    title: 'Crypto Casino Games: Formats, Odds and Where to Play',
    description:
      'How each casino game format actually plays with crypto: house edges, bonus contribution rates, bet limits and the crypto-native formats.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casino Games' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casino Games: Formats, Odds and Where to Play',
    description:
      'How each casino game format actually plays with crypto: house edges, bonus contribution rates, bet limits and the crypto-native formats.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casino Games', item: 'https://www.playmagpie.com/game' },
  ],
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-white mb-4 scroll-mt-24">
      {children}
    </h2>
  )
}

export default function GameHubPage() {
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
          <span className="text-[#f5f5f5]">Crypto Casino Games</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Crypto Casino Games: Formats, Odds and Where to Play</h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Game contribution to wagering requirements alone can swing the value of a welcome bonus by
            10x between formats, and house edge ranges from 0.5% to over 5% depending on what you sit
            down at. This page covers how each format actually behaves with crypto.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Crypto-Native Games: Dedicated Guides</h2>
          <p className="text-[#888888] leading-relaxed mb-6">
            Crash, dice and plinko are the three formats born on crypto platforms rather than ported
            from legacy casinos. All three are provably fair as standard, run RTPs of 97-99%, and
            typically contribute 100% to bonus wagering. Each gets a full guide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAME_TYPES.map((game) => (
              <Link
                key={game.slug}
                href={`/game/${game.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-5 transition-all group"
              >
                <h3 className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-lg">
                  {game.name}
                </h3>
                <div className="mt-3 text-xs text-[#555555] group-hover:text-[#7BB8D4] transition-colors">
                  View {game.name} guide →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 prose prose-invert max-w-none">
          <SectionHeading id="slots">Slots</SectionHeading>
          <p className="text-[#888888] leading-relaxed">
            Slots are the largest game category at every major crypto casino, and the segment where
            crypto-first platforms genuinely outperform legacy operators. The top crypto casinos host
            7,000 to 10,000+ slot titles from leading providers including Pragmatic Play, NetEnt,
            Play&rsquo;n GO, Hacksaw Gaming, Nolimit City and Push Gaming. When evaluating a casino for
            slots, the most important factors are provider breadth (more providers means more diverse
            mechanics and themes), RTP transparency (look for casinos that publish RTP figures per
            game), and how slots interact with bonus terms: slots typically contribute 100% to wagering
            requirements, making them the most efficient game category for clearing welcome bonuses.
            Provably fair in-house slots are an emerging category at platforms like BC.Game and Shuffle,
            offering independently verifiable outcomes through cryptographic seeds. For tournament
            players, BC.Game and Shuffle run continuous slot tournaments with leaderboard prize pools.
            For library depth compared side by side, see{' '}
            <Link href="/best-crypto-casinos" className="text-[#7BB8D4] hover:underline">our ranked casino list</Link>{' '}
            (BitStarz 3,000+ titles, BC.Game 10,000+, 7Bit 7,000+).
          </p>
        </section>

        <section className="mb-12 prose prose-invert max-w-none">
          <SectionHeading id="blackjack">Blackjack</SectionHeading>
          <p className="text-[#888888] leading-relaxed">
            Blackjack at crypto casinos splits into two distinct experiences: RNG (computer-dealt)
            blackjack with instant rounds and customisable side bets, and live dealer blackjack streamed
            from professional studios by Evolution, Playtech and Pragmatic Play Live. When evaluating a
            casino for blackjack, look for table variety (single-deck, multi-hand, Speed Blackjack,
            Infinite Blackjack), bet limits that match your bankroll (top platforms accept stakes from
            $1 to $10,000+ per hand), and crucially the bonus terms: blackjack typically contributes
            only 5-10% to wagering requirements, so welcome bonuses are much harder to clear on tables
            than on slots. Some casinos exclude blackjack from bonus play entirely; always check the
            contribution table before accepting any offer. RTP on standard blackjack with optimal
            strategy is around 99.5%, the highest of any common casino game. RNG decks reshuffle every
            hand, so counting is dead there; live dealer with a continuous shoe is the closest online
            gets to a real table.
          </p>
        </section>

        <section className="mb-12 prose prose-invert max-w-none">
          <SectionHeading id="roulette">Roulette</SectionHeading>
          <p className="text-[#888888] leading-relaxed">
            The most important rule when choosing a roulette table is to avoid American Roulette
            wherever possible. American has both a 0 and a 00 pocket, pushing the house edge to 5.26%.
            European Roulette has only a single 0 (2.7% house edge), and French Roulette adds the La
            Partage rule which halves the edge to 1.35% on even-money bets, the best house edge in any
            casino. Every reputable crypto casino offers European and French variants. Live dealer
            roulette via Evolution is the gold standard, with Lightning Roulette and Immersive Roulette
            adding multiplier mechanics and high-definition presentation. As with blackjack, roulette
            typically contributes 5-10% to bonus wagering, sometimes lower. For provably fair roulette,
            BC.Game and Shuffle offer in-house variants with cryptographically verifiable outcomes.
          </p>
        </section>

        <section className="mb-12 prose prose-invert max-w-none">
          <SectionHeading id="live-dealer">Live Dealer</SectionHeading>
          <p className="text-[#888888] leading-relaxed">
            Live dealer casinos stream real tables (blackjack, roulette, baccarat, poker, game shows)
            from professional studios in real time. Evolution Gaming dominates this segment globally
            with the highest production quality and widest selection; Playtech Live and Pragmatic Play
            Live are credible alternatives. When evaluating a crypto casino for live play, look first
            for Evolution licensing (the marker of a serious operator), then table variety, and
            crucially bet limits: VIP tables at Evolution accept up to €100,000 per hand, and{' '}
            <Link href="/reviews/cloudbet" className="text-[#7BB8D4] hover:underline">Cloudbet&rsquo;s</Link>{' '}
            Salon Privé access is the strongest in our catalogue, which is why it features on our{' '}
            <Link href="/high-roller-casinos" className="text-[#7BB8D4] hover:underline">high roller casinos</Link>{' '}
            ranking. Live dealer typically contributes only 0-10% to bonus wagering requirements, and
            some bonuses exclude live play entirely. Game shows like Crazy Time, Lightning Roulette and
            Monopoly Live are technically live dealer products but play more like high-volatility hybrid
            slots with multiplier mechanics.{' '}
            <Link href="/reviews/bitstarz" className="text-[#7BB8D4] hover:underline">BitStarz</Link>,{' '}
            <Link href="/reviews/bc-game" className="text-[#7BB8D4] hover:underline">BC.Game</Link> and{' '}
            <Link href="/reviews/mirax-casino" className="text-[#7BB8D4] hover:underline">Mirax</Link>{' '}
            all carry full Evolution suites alongside Pragmatic Live.
          </p>
        </section>
      </div>
    </>
  )
}
