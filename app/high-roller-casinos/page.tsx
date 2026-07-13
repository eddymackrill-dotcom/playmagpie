import type { Metadata } from 'next'
import { casinos } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import BonusBanner from '@/components/BonusBanner'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'
import Link from 'next/link'

// Top 3 of vipProgram && trustScore >= 8.0 by trust, the same filter the
// page uses to exclude operators with documented withdrawal-hold patterns
// on large wins. Cloudbet leads the page editorially on no-withdrawal-
// limits but BitStarz / BC.Game / 7Bit lead on raw trust score.
const STRIP_CARDS: CTAStripCard[] = [
  {
    slug: 'bitstarz',
    facts: [
      { label: 'VIP', value: 'Invite-only: dedicated host' },
      { label: 'Withdrawal', value: 'Under 10 minutes' },
      { label: 'Bonus', value: '5 BTC + 180 spins (4 deposits)' },
    ],
  },
  {
    slug: 'bc-game',
    facts: [
      { label: 'VIP', value: 'XP-tier progression-based' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'Bonus', value: '220% deposit rakeback, 4 stages' },
    ],
  },
  {
    slug: 'cloudbet',
    facts: [
      { label: 'VIP', value: 'No withdrawal limits at scale' },
      { label: 'Withdrawal', value: 'Instant to 30 minutes' },
      { label: 'Bonus', value: '5 BTC welcome match' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Best High Roller Crypto Casinos 2026: VIP Platforms',
  description:
    'The best VIP and high-roller crypto casinos for 2026. Massive welcome bonuses, dedicated account managers, elite cashback and the highest withdrawal limits.',
  alternates: {
    canonical: '/high-roller-casinos',
  },
  openGraph: {
    url: '/high-roller-casinos',
    title: 'Best High Roller Crypto Casinos 2026: VIP Platforms',
    description:
      'The best VIP and high-roller crypto casinos for 2026. Dedicated hosts, elite cashback and the highest withdrawal limits.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best High Roller Crypto Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best High Roller Crypto Casinos 2026: VIP Platforms',
    description: 'Top VIP and high-roller crypto casinos ranked: massive bonuses, dedicated hosts and no withdrawal limits.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'High Roller Casinos', item: 'https://www.playmagpie.com/high-roller-casinos' },
  ],
}

export default function HighRollerPage() {
  // High-roller filter: VIP programme AND trustScore >= 8.0. The trust floor
  // keeps the page consistent with its premise: "platforms built for serious
  // players" cannot include operators with documented withdrawal-hold patterns
  // on large wins. Excludes Roobet (6.8) at present; reapplies cleanly to any
  // future low-trust VIP entry.
  const vipCasinos = casinos.filter((c) => c.vipProgram && c.trustScore >= 8.0)
  const topVip = casinos.find((c) => c.badges.includes('High Roller'))

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
          <span className="text-[#f5f5f5]">High Roller Casinos</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">👑 VIP & High Roller</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best High Roller Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Platforms built for serious players. Massive welcome bonuses, dedicated VIP hosts, elite cashback
            and the highest withdrawal limits in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Max Welcome Bonus', value: '5 BTC', sub: 'Cloudbet' },
            { label: 'No Withdrawal Limits', value: '✓', sub: 'Cloudbet VIP' },
            { label: 'VIP Casinos Listed', value: `${vipCasinos.length}`, sub: 'With active programmes' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <CasinoCTAStrip
          framing="Three high-roller picks. BitStarz and BC.Game lead on trust score; Cloudbet's no-withdrawal-limits policy is the load-bearing differentiator at this stake band."
          cards={STRIP_CARDS}
        />

        {topVip && (
          <BonusBanner
            casinoName={topVip.name}
            bonusText={topVip.bonusSummary}
            affiliateUrl={topVip.affiliateUrl}
            subtext="Exclusive high-roller offer: limited availability"
          />
        )}

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-3">VIP Casino Comparison</h2>
          <p className="text-[#bbbbbb] text-base leading-relaxed mb-6 max-w-3xl">
            Cloudbet is the only casino in our catalogue with no published withdrawal limits: a six-figure
            crypto cash-out uses the same standard cashier flow as a $200 one. That policy, not raw speed, is
            why it anchors this page; its instant-to-30-minute window is wider than BitStarz&apos;s
            under-10-minutes.
          </p>
          <CasinoComparisonTable casinos={vipCasinos} />
        </section>

        <TopRatedSection
          title="Top VIP Casino Platforms"
          subtitle="Rated on cashback value, limit sizes, support quality and exclusivity"
          casinos={vipCasinos.slice(0, 3)}
        />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">What to Look for in a VIP Casino</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '💰',
                title: 'Cashback Rates',
                body: 'Top VIP programmes offer 10–25% weekly cashback with no wagering requirements. Anything below 5% is barely worth the tier grind.',
              },
              {
                icon: '🏆',
                title: 'Dedicated Account Management',
                body: 'The best platforms assign a personal host from Level 3 or Platinum tier upward: direct phone or Telegram access, faster withdrawals, bespoke offers.',
              },
              {
                icon: '📈',
                title: 'High Limits',
                body: 'Standard limits won\'t cut it for high rollers. Look for platforms offering $100k+ single-bet limits and no daily withdrawal caps for VIP members.',
              },
              {
                icon: '🎪',
                title: 'Exclusive Events',
                body: 'The top tier of high-roller programmes includes luxury event invitations, sports hospitality and leaderboard tournaments with six-figure prize pools.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" id="withdrawal-limits">
          <h2 className="text-2xl font-bold text-white mb-2 scroll-mt-24">Withdrawal Limits: The Other Half of High-Roller Play</h2>
          <p className="text-[#888888] text-sm mb-6 max-w-3xl">
            A big bet ceiling means nothing if the cashier caps what you can take out. Honest framing:
            only one of the casinos in our reviews makes an explicit &quot;no withdrawal limit&quot;
            statement (Cloudbet, whose published policy is the load-bearing reason it features on this
            page). For the rest, the cashier T&amp;Cs don&apos;t publish a specific per-transaction or
            daily cap; what&apos;s documented is what triggers manual review at higher amounts: light
            KYC for larger withdrawals at BitStarz and Mirax, &quot;additional processing time&quot; on
            large cashouts at 7Bit, temporary holds pending review at Shuffle, and no-KYC-with-
            exceptions posture at BC.Game and Duelbits. &quot;Not documented&quot; does not mean limits
            don&apos;t exist operationally: VIP-tier arrangements typically raise or eliminate caps for
            verified high-stakes players, and that conversation happens during VIP onboarding rather
            than on a public page.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Per-Transaction vs Daily Caps',
                body: 'Almost every casino has a per-request maximum: split a 10 BTC withdrawal across requests and it usually clears. The real binding constraint is the daily or weekly cap, which is what Cloudbet explicitly doesn\'t apply. Read the cashier T&Cs before depositing if your stake plan implies a big win.',
              },
              {
                title: 'VIP Tier Exemptions',
                body: 'Most platforms (BitStarz, Mirax, 7Bit, BC.Game) raise or remove withdrawal caps at higher VIP tiers rather than running an across-the-board policy. If you\'re depositing five or six figures, the VIP onboarding conversation should cover where your cap lands; it\'s not always written down on the public page.',
              },
              {
                title: 'KYC Trigger Thresholds',
                body: 'A no-limit policy doesn\'t stop a casino running a KYC check at withdrawal time if your behaviour triggers a flag. At Light-KYC platforms that means government ID and proof of address before funds release; at No-KYC platforms (BC.Game, 7Bit, Duelbits) the check is usually waived but reserved for exceptional cases.',
              },
              {
                title: 'Network Settlement Speed',
                body: 'For a 5 BTC equivalent withdrawal, the casino\'s internal review is usually the bottleneck, not the chain. But on-chain finality still matters: USDT on TRC-20, SOL or MATIC clear in seconds; BTC depends on fee market and block timing. Pick the network that pairs with your cash-out plan, not just your deposit habits.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">High Roller Casino Reviews</h2>
          <p className="text-[#888888] text-sm mb-5">
            Read our full reviews for each VIP casino: bonus terms, cashback rates, withdrawal limits and VIP tier details.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vipCasinos.map((casino) => (
              <Link
                key={casino.slug}
                href={`/reviews/${casino.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors">
                    {casino.name}
                  </span>
                  <span className="text-[#7BB8D4] font-bold text-sm">{casino.trustScore}/10</span>
                </div>
                <p className="text-[#888888] text-xs">{casino.bonusSummary.slice(0, 60)}…</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Where large cashouts clear without a document check</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Critical for high-stakes play</div>
            </Link>
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Full rankings across all categories</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
