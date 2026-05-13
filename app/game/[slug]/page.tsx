import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GAME_TYPES } from '@/lib/programmatic'
import { casinos } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'

export async function generateStaticParams() {
  return GAME_TYPES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata(
  props: PageProps<'/game/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const game = GAME_TYPES.find((g) => g.slug === slug)
  if (!game) return {}
  const title = `Best Crypto Casinos for ${game.name} 2026`
  const description = `Top crypto casinos for playing ${game.name}. Compare bonuses, game selection and withdrawal speeds.`
  return {
    title,
    description,
    alternates: { canonical: `/game/${game.slug}` },
    openGraph: {
      url: `/game/${game.slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  }
}

const gameContent: Record<string, string> = {
  slots: 'Slots are the largest game category at every major crypto casino, and the segment where crypto-first platforms genuinely outperform legacy operators. The top crypto casinos host 7,000 to 10,000+ slot titles from leading providers including Pragmatic Play, NetEnt, Play’n GO, Hacksaw Gaming, Nolimit City and Push Gaming. When evaluating a casino for slots, the most important factors are provider breadth (more providers means more diverse mechanics and themes), RTP transparency (look for casinos that publish RTP figures per game), and how slots interact with bonus terms — slots typically contribute 100% to wagering requirements, making them the most efficient game category for clearing welcome bonuses. Provably fair in-house slots are an emerging category at platforms like BC.Game and Shuffle, offering independently verifiable outcomes through cryptographic seeds. For high-volatility hunters, casinos with curated megaways and bonus-buy sections are worth seeking out. For tournament players, BC.Game and Shuffle run continuous slot tournaments with leaderboard prize pools. Crypto-specific advantages include instant deposits to begin playing, fast withdrawals when you hit a big win, and no banking-side flags on gambling transactions. The casinos ranked below are all proven for slots-heavy play with thousands of titles each, fair welcome bonuses, and reliable payouts when your session goes well.',
  blackjack: 'Blackjack at crypto casinos splits into two distinct experiences: RNG (computer-dealt) blackjack with instant rounds and customisable side bets, and live dealer blackjack streamed from professional studios by Evolution, Playtech and Pragmatic Play Live. Both have a place — RNG is faster and better for grinding strategy, live brings real-table atmosphere and human dealers. When evaluating a casino for blackjack, look for table variety (single-deck, double-deck, multi-hand, Speed Blackjack, Infinite Blackjack), bet limits that match your bankroll (top platforms accept stakes from $1 to $10,000+ per hand), and crucially the bonus terms — blackjack typically contributes only 5–10% to wagering requirements, so welcome bonuses are much harder to clear on tables than on slots. Some casinos exclude blackjack from bonus play entirely. Always check the bonus contribution table before accepting any offer if you primarily play tables. RTP on standard blackjack with optimal strategy is around 99.5%, the highest of any common casino game, making it strong long-term value. For card counters and AP players, RNG blackjack is unbeatable in the traditional sense (decks reshuffle every hand), but live dealer with continuous shoe shuffling offers the closest to a real-table experience available online.',
  roulette: 'Roulette is one of the cleanest games to play at crypto casinos: simple rules, transparent odds, and a single decision per spin. The most important rule when choosing a roulette table is to avoid American Roulette wherever possible. American has both a 0 and a 00 pocket, pushing the house edge to 5.26%. European Roulette has only a single 0 (2.7% house edge), and French Roulette adds the La Partage rule which halves the edge to 1.35% on even-money bets — the best house edge in any casino. Every reputable crypto casino offers European and French variants. Live dealer roulette via Evolution, Playtech and Pragmatic Play Live is the gold standard, with Lightning Roulette and Immersive Roulette adding multiplier mechanics and high-definition single-camera presentation. RNG roulette is faster for high-volume play. As with blackjack, roulette typically contributes 5–10% to bonus wagering requirements, sometimes lower — check terms carefully. For provably fair roulette, BC.Game and Shuffle offer in-house variants with cryptographically verifiable outcomes. The casinos ranked below all run extensive live and RNG roulette libraries, with bet limits suitable for both casual players and high rollers.',
  'live-dealer': 'Live dealer casinos stream real tables — blackjack, roulette, baccarat, poker, game shows — from professional studios staffed by trained dealers in real time. Evolution Gaming dominates this segment globally with the highest production quality, fastest table turnover, and the widest selection. Playtech Live and Pragmatic Play Live are credible alternatives with strong libraries. When evaluating a crypto casino for live play, look first for Evolution licensing (it is the marker of a serious operator), then table variety (look for VIP, Salon Privé and high-roller tables if relevant), and crucially bet limits — VIP tables at Evolution accept up to €100,000 per hand. Live dealer typically contributes only 0–10% to bonus wagering requirements at most casinos, so welcome bonuses are very difficult to clear on live tables. Some bonuses exclude live play entirely. Crypto casinos with strong live dealer offerings include BitStarz, BC.Game, Cloudbet and Mirax, all of which carry full Evolution suites alongside Pragmatic Live. Game shows like Crazy Time, Lightning Roulette, Monopoly Live and Funky Time are increasingly popular at crypto platforms — these are technically live dealer products but play more like high-volatility hybrid slots with multiplier mechanics.',
  crash: 'Crash is one of the defining crypto-native game categories. The premise is simple: a multiplier curve rises from 1.00x and continues climbing until it crashes at a random point — you cash out before the crash to lock in your multiplier, or lose your stake if you wait too long. Crash games are almost exclusively provably fair, with cryptographic seeds that let players verify each round was not manipulated. The best-known crash games include Aviator (Spribe), JetX (SmartSoft), Spaceman (Pragmatic Play) and in-house variants from BC.Game and Shuffle. When choosing a crypto casino for crash, look first for the original Aviator title (the genre benchmark), then auto-cashout functionality (essential for strategy-based play), and the ability to run multiple parallel bets. Many crash games support social features — seeing other players\' cashout multipliers in real time — which creates additional pressure but is part of the format. Crash typically contributes 100% to bonus wagering requirements at most platforms, but always verify before relying on it. RTP on top crash titles is generally 97-99%, among the best in the industry. The casinos ranked below all run full crash libraries with the major titles and several in-house variants.',
  dice: 'Dice is the original provably fair crypto casino game, dating back to early Bitcoin gambling sites. The mechanic is straightforward — predict whether the next roll will be above or below a threshold you set, with payouts scaling based on the probability. The lower the probability you accept, the higher the multiplier. Most dice games offer extreme customisation: bet sizes from $0.01 to $10,000+, auto-betting with martingale, anti-martingale, Fibonacci and custom strategies, and adjustable house edge thresholds. Provably fair verification is universal across crypto dice games — every roll uses cryptographic seeds that players can audit. RTP on standard dice configurations is typically 99%, making it one of the highest-RTP games available anywhere online. When choosing a crypto casino for dice, look for in-house dice products (provably fair and high RTP), automated betting features, comprehensive bet history with full seed verification, and crucially adequate bet limits for your bankroll. Dice typically contributes 100% to wagering requirements at most crypto-native casinos, though some exclude it. BC.Game and Shuffle both run polished native dice products. The casinos ranked below all support dice play either through native games or via providers like Spribe and BGaming.',
  plinko: 'Plinko has become one of the most popular crypto casino games since 2020, particularly the in-house provably fair versions pioneered by Stake, BC.Game and Shuffle. The mechanic adapts the classic peg-and-ball drop format into a customisable risk profile — you choose the row count (typically 8 to 16) and the volatility level (low, medium, high), and the ball drops through randomised pegs into payout buckets at the bottom. Higher volatility settings push the edge multipliers toward the outside slots, where multipliers can reach 1000x+ on the highest configurations. Provably fair verification is standard, and most Plinko games run at 97–99% RTP. When choosing a crypto casino for Plinko, look first for in-house provably fair versions (these are the originals and offer the best RTP and customisation), then for auto-betting with customisable strategies, and adequate bet ranges — Plinko bets typically run from $0.01 to $1,000+. Plinko usually contributes 100% to wagering requirements at crypto-native casinos, making it efficient for bonus clearing on high-volatility sessions. BC.Game and Shuffle run polished Plinko offerings; BGaming and Spribe also publish well-regarded versions used across other platforms.',
  poker: 'Poker at crypto casinos splits into three distinct categories: live dealer poker (Evolution Casino Hold’em, Three Card Poker, Caribbean Stud), video poker (Jacks or Better, Deuces Wild, Joker Poker), and player-vs-player ring games and tournaments. The first two are casino-banked games where you play against the house — these are available at every major crypto casino and behave like any other table game for bonus and wagering purposes (typically 5–10% contribution). PvP poker is structurally different: you play against other players, the casino takes a small rake, and bonuses generally do not apply at all. For PvP, dedicated crypto poker rooms like CoinPoker and SwC Poker offer the deepest player pools, though most general crypto casinos partner with networks like GG Poker or run smaller in-house tables. When choosing a crypto casino for poker, identify which category you want — for casino poker variants, look for Evolution’s full live poker suite and a broad video poker library with paytable transparency. For PvP, evaluate average traffic, blind levels, rake percentage and tournament schedule. The casinos ranked below all carry Evolution live poker and Pragmatic Play video poker variants. For dedicated PvP play, look beyond general casinos to poker-specialist platforms.',
}

export default async function GamePage(props: PageProps<'/game/[slug]'>) {
  const { slug } = await props.params
  const game = GAME_TYPES.find((g) => g.slug === slug)
  if (!game) notFound()

  const content = gameContent[slug] ?? ''

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: `${game.name} Casinos`, item: `https://playmagpie.com/game/${game.slug}` },
    ],
  }

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
          <span className="text-[#f5f5f5]">{game.name}</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">{game.name}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos for {game.name} 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Top crypto casinos for playing {game.name}. Compare bonuses, game selection and withdrawal speeds.
          </p>
        </div>

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">Playing {game.name} at Crypto Casinos</h2>
          <p className="text-[#888888] leading-relaxed">{content}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Top Casinos for {game.name}</h2>
          <p className="text-[#888888] text-sm mb-6">
            Independently scored — every casino below offers a strong {game.name.toLowerCase()} library.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {casinos.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link
            href="/game"
            className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all games
          </Link>
        </div>
      </div>
    </>
  )
}
