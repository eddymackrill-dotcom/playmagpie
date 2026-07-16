import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'

// Top 3 of BNB-accepting operators by trust score. BitStarz and Mirax don't
// accept BNB and are filtered out. Roobet added BNB in 2026 (help-centre
// verified 2026-07-16) so it flows into the ranked list (last, trust 6.8),
// but stays off the strip per the standing Roobet-exclusion precedent.
const STRIP_CARDS: CTAStripCard[] = [
  {
    slug: 'bc-game',
    facts: [
      { label: 'Accepts BNB', value: '✓ on BNB Smart Chain' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'KYC', value: 'None: at any size' },
    ],
  },
  {
    slug: '7bit-casino',
    facts: [
      { label: 'Accepts BNB', value: '✓ added to 8-coin lineup' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'KYC', value: 'None: since 2014' },
    ],
  },
  {
    slug: 'cloudbet',
    facts: [
      { label: 'Accepts BNB', value: '✓ first-class option in 29-coin lineup' },
      { label: 'Withdrawal', value: 'Instant for most; up to 24 hours' },
      { label: 'KYC', value: 'Light' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Best BNB Crypto Casinos 2026: Fast, Cheap, Smart Chain',
  description:
    'Six of the eight casinos in our catalogue accept BNB. Settlement in ~3 seconds at sub-cent fees on BNB Smart Chain. Ranked: BC.Game, Cloudbet, 7Bit, Shuffle, Duelbits, Roobet.',
  alternates: {
    canonical: '/bnb-crypto-casinos',
  },
  openGraph: {
    url: '/bnb-crypto-casinos',
    title: 'Best BNB Crypto Casinos 2026: Fast, Cheap, Smart Chain',
    description:
      'Six of the eight casinos in our catalogue accept BNB. Settlement in ~3 seconds at sub-cent fees on BNB Smart Chain. Full per-casino BNB breakdown.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best BNB Crypto Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best BNB Crypto Casinos 2026: Fast, Cheap, Smart Chain',
    description: 'Six of our eight reviewed casinos accept BNB directly. Ranked breakdown and what each one means for BNB depositors.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'BNB Crypto Casinos', item: 'https://www.playmagpie.com/bnb-crypto-casinos' },
  ],
}

function casinoAcceptsBNB(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BNB')
}

const PER_CASINO_BNB_NOTES: Record<string, string> = {
  'bc-game':
    'BC.Game accepts BNB alongside 100+ other cryptocurrencies, by far the widest coin support of any casino in our rankings. BNB Smart Chain settlement is near-instant and BC.Game has zero KYC at any withdrawal size, which makes it the cleanest BNB-deposit-to-BNB-withdrawal path on the list.',
  cloudbet:
    'Cloudbet treats BNB as a first-class option in its 29-coin lineup. The differentiators are a no-limit withdrawal policy for fully verified accounts ($2,200/day until Level 2 verification) and dual licensing from Curaçao plus the Kahnawake Gaming Commission. Entry is now a ~$1 equivalent minimum deposit, the lowest on this list; the serious-bankroll calibration lives on the cash-out side.',
  '7bit-casino':
    '7Bit Casino added BNB to its eight-coin lineup as a direct replacement for slower legacy chains on its deposit side. No KYC at any withdrawal size has held since 2014, which is the longest unbroken no-KYC track record across the operators here.',
  shuffle:
    'Shuffle accepts BNB across its 12-coin lineup alongside the native SHFL token. The rakeback-based VIP programme returns a percentage of house edge regardless of which coin you deposited, so BNB-side play earns the same SHFL rewards as USDT or BTC play.',
  duelbits:
    'Duelbits supports BNB across its 12-coin lineup and runs a cashback-first welcome model: up to $30 weekly cashback plus Duelbits Originals rewards, no traditional deposit match. Withdrawals process in under 5 minutes, the fastest headline window here.',
  roobet:
    'Roobet added BNB to its deposit lineup in 2026 (now 11 coins per its help centre). It ranks last here for the same reasons it carries our lowest trust score: documented multi-day withdrawal holds on large wins in the AskGamblers record and Standard KYC with re-verification on sizeable cashouts. Workable for small-stakes BNB play; not where we would route a serious BNB bankroll.',
}

export default function BnbCryptoCasinosPage() {
  const bnbCasinos = casinos.filter(casinoAcceptsBNB)
  const ranked = [...bnbCasinos].sort((a, b) => b.trustScore - a.trustScore)
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
          <span className="text-[#f5f5f5]">BNB Crypto Casinos</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">BNB · BNB Smart Chain</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best BNB Crypto Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            BNB on BNB Smart Chain settles in roughly three seconds with fees measured in
            fractions of a cent, among the cheapest end-to-end deposit and withdrawal
            paths at any crypto casino. The catch: six operators in our rankings
            accept BNB directly, and BitStarz and Mirax do not. This page covers
            all six, ranked by trust.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting BNB" value={`${bnbCasinos.length}`} sub="of 8 reviewed" />
          <Stat label="BSC settlement" value="~3 sec" sub="On-chain finality" />
          <Stat label="Typical fee" value="<$0.01" sub="Per transaction" />
          <Stat label="Cheapest entry" value="$5" sub="BC.Game minimum" />
        </div>

        <CasinoCTAStrip
          framing="Top 3 BNB-accepting operators by trust score. BitStarz and Mirax don't accept BNB; Roobet does but sits below our trust bar for a headline recommendation."
          cards={STRIP_CARDS}
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why BNB at all: versus BTC, USDT, or SOL</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              The honest case for depositing BNB at a crypto casino is narrow. BNB
              Smart Chain settlement is fast (around three seconds) and cheap
              (sub-cent fees), but Solana and TRC-20 USDT match that profile. BNB&apos;s
              practical advantage is for one specific player: someone who already
              holds BNB (typically from Binance exchange usage or BNB Chain DeFi
              positions) and wants to avoid the conversion overhead and slippage of
              swapping to a more universally accepted coin first.
            </p>
            <p>
              For that player BNB deposits are essentially friction-free. For
              everyone else, the narrower casino acceptance list (six of eight
              reviewed casinos here, versus eight of eight for BTC and USDT) makes
              BNB a worse default. There is no scenario where you would
              specifically buy BNB to gamble with it. You would buy USDT or SOL.
              The use case is depositing what you already hold.
            </p>
            <p>
              BNB&apos;s other consideration is price volatility. Unlike USDT or
              USDC, BNB is a non-stablecoin native asset: its dollar value moves
              with market sentiment between deposit and withdrawal. For
              session-by-session play this rarely matters; for balances held on
              platform across weeks, USD-pegged stablecoins are the more
              bankroll-stable option. See{' '}
              <Link href="/crypto/bnb" className="text-[#7BB8D4] hover:underline">
                our BNB coin page
              </Link>{' '}
              for the chain-level detail, or{' '}
              <Link href="/guides/best-crypto-for-gambling" className="text-[#7BB8D4] hover:underline">
                the best crypto for gambling guide
              </Link>{' '}
              for the broader trade-off framing.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The 5 BNB-Accepting Casinos: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. Each casino below natively accepts BNB for deposits and withdrawals,
            verified against the data in <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
          </p>
          <CasinoComparisonTable casinos={ranked} />
        </section>

        <TopRatedSection
          title="Top 3 BNB Casino Picks"
          subtitle="The three highest-trust-score BNB-accepting operators"
          casinos={ranked.slice(0, 3)}
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">What Each BNB Casino Actually Means at the Cashier</h2>
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
                  {PER_CASINO_BNB_NOTES[casino.slug] ?? casino.reviewSummary.slice(0, 280)}
                </p>
                <div className="flex gap-3 flex-wrap text-xs">
                  <Link
                    href={`/reviews/${casino.slug}`}
                    className="text-[#7BB8D4] hover:underline"
                  >
                    Full {casino.name} review →
                  </Link>
                  <a
                    href={casino.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-[#7BB8D4] hover:underline"
                  >
                    Visit {casino.name} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Which BNB Casino Suits Which Player</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">For pure no-KYC anonymity</h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-3">
                BC.Game, 7Bit Casino, and Duelbits run no-KYC posture as policy: no
                document verification at any withdrawal size. Cloudbet and Shuffle
                run Light KYC that can trigger at larger withdrawals.
              </p>
              <Link href="/no-kyc-casinos" className="text-[#7BB8D4] text-sm hover:underline">
                See the full no-KYC list →
              </Link>
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">For high-volume BNB withdrawals</h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-3">
                Cloudbet is the only one here with an explicit no-withdrawal-limit
                policy, applying to fully verified accounts. The standard cashier
                accommodates outsized BNB payouts without an exceptions path.
              </p>
              <Link href="/high-roller-casinos#withdrawal-limits" className="text-[#7BB8D4] text-sm hover:underline">
                See the no-limit-withdrawal casinos →
              </Link>
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">For the largest welcome bonus</h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-3">
                Shuffle&apos;s 100% up to $1,000 is now the largest traditional cash-match welcome on this
                list: Cloudbet retired its former 5 BTC match in favour of a $2,500 package paid as cash
                rewards (10% rakeback plus daily cash drops, no wagering) over the first 30 days.
                BC.Game&apos;s structure is a Deposit Rakeback Welcome (220% across 4 monthly stages,
                locked balance unlocking as you wager). Players seeking a traditional cash-match welcome
                should look at Shuffle; players who prefer cash rewards without wagering should look at
                Cloudbet.
              </p>
              <Link href="/best-crypto-casinos" className="text-[#7BB8D4] text-sm hover:underline">
                Compare all crypto casinos →
              </Link>
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">For fastest BNB withdrawal</h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-3">
                Duelbits leads on headline window (under 5 minutes) followed by BC.Game,
                7Bit and Shuffle (instant to 10 minutes). On-chain BNB Smart Chain
                settlement adds roughly three seconds regardless of which casino you choose.
              </p>
              <Link href="/fast-withdrawal-casinos" className="text-[#7BB8D4] text-sm hover:underline">
                See the fast-withdrawal hub →
              </Link>
            </div>
          </div>
        </section>

        {top && (
          <section className="mt-12 bg-[#111111] border border-[#7BB8D4]/20 rounded-2xl p-6 sm:p-8">
            <div className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">
              Editor&apos;s pick: BNB
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">
              {top.bonusSummary}
            </p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">BNB Casino FAQ</h2>
          <div className="space-y-4 mt-6">
            {BNB_FAQS.map((f) => (
              <div key={f.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{f.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/crypto/bnb" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">BNB Coin Reference</div>
              <div className="text-[#888888] text-sm">Chain mechanics, fees, network details</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">BNB speed plus operator-side processing</div>
            </Link>
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Full rankings across every coin</div>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: BNB_FAQS.map((f) => ({
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

const BNB_FAQS = [
  {
    question: 'Why do only some crypto casinos accept BNB?',
    answer:
      "BNB is supported by six of the eight casinos in our rankings: BC.Game, Cloudbet, 7Bit Casino, Shuffle, Duelbits and, since 2026, Roobet. BitStarz and Mirax Casino don't currently accept BNB. The split largely reflects when each operator added newer chain support: BitStarz and Mirax run leaner six-to-seven-coin lineups focused on the more established chains, while the BNB-supporting six run broader lineups (8 to 100+ coins) including BNB Smart Chain.",
  },
  {
    question: 'Is BNB faster than USDT for casino deposits?',
    answer:
      "BNB on BNB Smart Chain and USDT on TRC-20 are essentially identical in cashier behaviour: both settle on-chain in single-digit seconds with sub-cent fees. The choice between them comes down to what you already hold and bankroll-stability preference. USDT keeps the deposited value pegged to USD; BNB tracks BNB price between deposit and withdrawal, which is fine for session play but adds drift to balances held on platform across weeks.",
  },
  {
    question: 'Are there any BNB-only welcome bonuses?',
    answer:
      "None of the BNB-accepting casinos run a BNB-specific welcome bonus. All offer their standard welcome packages denominated in BTC-equivalent or USD-equivalent terms, applied proportionally to BNB deposits. Shuffle's 100% up to $1,000 is the largest traditional cash-match welcome on the list now that Cloudbet has replaced its former 5 BTC match with a $2,500 package paid as cash rewards (rakeback and cash drops, no wagering). BC.Game's structure is a Deposit Rakeback Welcome (220% across 4 monthly stages, locked balance unlocking as you wager) which may fit specific high-volume profiles but is not a like-for-like cash-match substitute.",
  },
  {
    question: "What's the cheapest BNB casino to deposit at?",
    answer:
      "Cloudbet now has the lowest entry point at roughly $1 equivalent, after cutting its long-standing 0.001 BTC floor in 2026. BC.Game follows at $5, then 7Bit at $10, with Shuffle and Duelbits around $10-$20. Every casino on this list now accommodates the deposit-small-to-test profile; what differentiates Cloudbet is the cash-out side, where fully verified accounts face no withdrawal limits.",
  },
  {
    question: 'Can I withdraw BNB back to my Binance account?',
    answer:
      "Yes. Every casino on this list pays withdrawals to whichever BNB address you specify at the cashier, which can be a Binance deposit address, a self-custody wallet (Trust Wallet, MetaMask on BSC, hardware wallet), or any other BSC-compatible address. BNB moves on BNB Smart Chain (BEP-20) only; the legacy Beacon Chain was retired in November 2024, so any current Binance deposit address or BSC wallet address is BEP-20 by default. Double-check the address itself rather than the network.",
  },
] as const
