import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for Germany. Differentiated from the /country/germany hub
// (which is multi-coin and leads on the GGL regime) by leading on the BTC-specific
// § 23 EStG one-year holding-period angle: long-held BTC is the tax-smart deposit
// coin for a German player, a claim that only applies to a non-stablecoin held asset.
// Facts (GGL operational 1 Jan 2023; § 23 EStG one-year rule + €1,000 Freigrenze;
// BaFin-licensed on-ramps) are reused verbatim from the verified countryContext
// block in app/country/[slug]/page.tsx (primary sources cited there, verified May 2026).

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino Germany 2026: The 7 That Accept German Players',
  description:
    'Seven of our eight reviewed casinos accept German players for Bitcoin play. Ranked by trust, with the § 23 EStG one-year holding angle that makes BTC the tax-smart deposit coin for German players.',
  alternates: { canonical: '/best-bitcoin-casino-germany' },
  openGraph: {
    url: '/best-bitcoin-casino-germany',
    title: 'Best Bitcoin Casino Germany 2026',
    description:
      'The 7 reviewed casinos that accept German players for Bitcoin, ranked, plus why long-held BTC is the tax-smart deposit coin under § 23 EStG.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Bitcoin Casino Germany 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bitcoin Casino Germany 2026',
    description: 'The 7 reviewed casinos that accept German players for Bitcoin, ranked, with the § 23 EStG holding-period angle.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Bitcoin Casino Germany', item: 'https://www.playmagpie.com/best-bitcoin-casino-germany' },
  ],
}

// BTC-cashier notes per Germany-accepting casino. Facts drawn from lib/casinos.ts
// (min deposit, withdrawal window, KYC posture, documented caveats). No invented fees.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz built its name on Bitcoin: it has collected multiple "Best Bitcoin Casino" awards since 2014 and processes BTC withdrawals in under 10 minutes on the operator side. The one BTC-relevant catch is the 25% admin fee deducted from bonus-related withdrawals, so if you claim the 5 BTC welcome package, read the bonus terms before you cash out a BTC balance tied to it.',
  'bc-game':
    'BC.Game pairs BTC with the widest coin lineup on this list (100+ assets) and a strict no-KYC posture at any withdrawal size, which matters for a German player who would rather not attach documents to an offshore account. The $5 minimum is the lowest BTC-equivalent entry point of the seven.',
  '7bit-casino':
    '7Bit has run since 2014 with no KYC on crypto withdrawals, the longest unbroken no-KYC record of the seven. BTC withdrawals process instant to 10 minutes on the operator side. A sensible default for German BTC holders who want anonymity without a brand-new platform.',
  cloudbet:
    'Cloudbet is the high-bankroll option: no withdrawal limits at the standard cashier and a minimum deposit quoted directly in BTC (0.001 BTC equivalent), the only operator here that prices entry in Bitcoin rather than dollars. Built for larger BTC balances rather than the deposit-small-to-test profile.',
  'mirax-casino':
    'Mirax sits in the 7Bit Partners network and clears BTC withdrawals instant to 15 minutes with only light KYC above higher thresholds. Its welcome pack runs to a 5 BTC ceiling across four deposits, denominated in BTC, so a Bitcoin depositor gets the headline figure in the coin they hold.',
  duelbits:
    'Duelbits has the fastest headline window of the seven: under 5 minutes on the operator side, no KYC for standard crypto play. The welcome model is cashback-first (up to $30 weekly) rather than a large BTC deposit match, which suits a player who deposits BTC to play rather than to chase a bonus.',
  shuffle:
    'Shuffle clears BTC instant to 10 minutes and layers SHFL-token rakeback on top regardless of which coin you deposited, so BTC play earns the same rewards as stablecoin play. Light KYC can trigger on larger withdrawals, the trade-off for the rakeback model.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoGermanyPage() {
  // Germany-accepting (Roobet excludes Germany per its ToS; the other seven do not
  // restrict DE) and BTC-accepting. casinoAcceptsCountry handles the Roobet exclusion.
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'germany') && casinoAcceptsBTC(c))
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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino Germany</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · Germany · EUR</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Bitcoin Casino Germany 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            The licensed German market caps deposits and stakes hard, which is why German players who
            want a real Bitcoin bankroll look offshore. Seven of the eight casinos we review accept
            German accounts. The deciding detail most lists miss is a tax one: under § 23 EStG, the
            Bitcoin you have held for more than a year is the smartest coin to deposit with.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting Germany" value={`${eligible.length}`} sub="of 8 reviewed" />
          <Stat label="§ 23 EStG holding rule" value="1 year" sub="Long-held BTC tax-free on disposal" />
          <Stat label="Short-term Freigrenze" value="€1,000" sub="Below this, short-term gains exempt" />
          <Stat label="GGL regulator since" value="2023" sub="1 Jan, federal authority" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The § 23 EStG angle: why long-held BTC beats a fresh stablecoin</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Germany taxes private crypto differently from almost anywhere else, and the difference
              lands squarely on coin choice. Under § 23 EStG, cryptocurrency an individual has held for
              more than one year is fully tax-free on disposal. Short-term gains are covered by a €1,000
              Freigrenze, above which they become taxable. Gambling winnings themselves are generally
              outside individual income tax for casual players, so the taxable event to manage is the
              crypto leg, not the casino leg.
            </p>
            <p>
              Read that against how you fund a deposit. If you sell appreciated coin you bought last
              month to top up a casino balance, that disposal can be taxable once you clear €1,000 of
              short-term gains. If you deposit Bitcoin you have held for over a year, the disposal is
              tax-free. So for a German player sitting on long-held BTC, Bitcoin is not just one option
              among many: it is the deposit coin that does not trigger a tax event. That is the exact
              opposite of buying USDT today to deposit tomorrow.
            </p>
            <p>
              The practical funding friction pushes the other way slightly: SCHUFA-linked bank transfers
              to gambling sites are routinely flagged, and USDT on TRC-20 is the common German workaround
              for that reason. But TRC-20 USDT solves a speed-and-flagging problem, not a tax one. If you
              already hold long-held BTC, the holding-period exemption is the bigger lever. See the{' '}
              <Link href="/country/germany" className="text-[#7BB8D4] hover:underline">
                full Germany crypto casino guide
              </Link>{' '}
              for the regulatory picture, or the{' '}
              <Link href="/guides/best-crypto-for-gambling" className="text-[#7BB8D4] hover:underline">
                best crypto for gambling guide
              </Link>{' '}
              for the coin-by-coin trade-offs.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Getting Bitcoin in Germany</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Bitpanda, Coinbase and Kraken are all BaFin-licensed for German retail, so on-ramping BTC
              is the straightforward part. The honest Bitcoin caveat is on the chain itself: BTC settles
              in roughly ten-minute blocks and network fees float with mempool demand, so an on-chain BTC
              withdrawal is slower and can cost more than the TRC-20 or Smart Chain routes. For a German
              player the trade is deliberate: you accept BTC&apos;s slower rail to keep the § 23 EStG
              holding-period exemption on the coin you are actually moving.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The {eligible.length} Bitcoin Casinos That Accept Germany: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. Each accepts German accounts and Bitcoin deposits, filtered against
            the restriction data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
            Roobet is excluded: its terms restrict Germany.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for Germany"
          subtitle="The three highest-trust operators accepting German players"
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
                      {casino.licence} · {casino.kycLevel} KYC · Min {casino.minDeposit} · BTC withdrawals {casino.withdrawalTime.toLowerCase()}
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
              Editor&apos;s pick: Bitcoin in Germany
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Bitcoin Casino Germany FAQ</h2>
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
            <Link href="/country/germany" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crypto Casinos in Germany</div>
              <div className="text-[#888888] text-sm">The full multi-coin hub: GGL regime, on-ramps, tax</div>
            </Link>
            <Link href="/crypto/bitcoin" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Bitcoin Coin Reference</div>
              <div className="text-[#888888] text-sm">How BTC deposits, fees and confirmations work</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">Operator-side payout speed across coins</div>
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
    question: 'Is it legal for German players to use an offshore Bitcoin casino?',
    answer:
      'Germany regulates operators through the Gemeinsame Glücksspielbehörde der Länder (GGL), the federal gambling authority operational since 1 January 2023, and licensed German sites carry strict deposit and stake caps. Those caps are why many German players use offshore crypto casinos instead. Verify a given platform accepts German accounts before depositing; in our catalogue, seven of eight do, with Roobet the exception.',
  },
  {
    question: 'Do I pay tax on Bitcoin I deposit at a casino from Germany?',
    answer:
      'Under § 23 EStG, private cryptocurrency held for more than one year is tax-free on disposal, and short-term gains are covered by a €1,000 Freigrenze. So depositing long-held Bitcoin does not trigger a tax event, while selling recently-acquired coin to fund a deposit can be taxable above the threshold. Gambling winnings themselves are generally outside individual income tax for casual players. This is general information, not tax advice; confirm your own position.',
  },
  {
    question: 'Why deposit Bitcoin rather than USDT from Germany?',
    answer:
      'Two reasons pull in different directions. USDT on TRC-20 is faster and sidesteps SCHUFA-flagged bank transfers, which is why it is common in Germany. But long-held Bitcoin carries the § 23 EStG one-year tax-free exemption that a freshly-bought stablecoin does not. If you already hold BTC over a year old, the tax exemption usually outweighs the speed gap.',
  },
  {
    question: 'How fast are Bitcoin withdrawals at these casinos?',
    answer:
      'Operator-side processing ranges from under 5 minutes (Duelbits) to around 30 minutes (Cloudbet) across the seven Germany-accepting casinos. On-chain Bitcoin settlement then adds its own confirmation time, typically tens of minutes depending on network fees, because BTC settles in roughly ten-minute blocks. The headline windows in the table are operator processing times, not on-chain finality.',
  },
  {
    question: 'Where do German players buy Bitcoin to deposit?',
    answer:
      'Bitpanda, Coinbase and Kraken are all BaFin-licensed for German retail and are the common on-ramps. Acquiring BTC on a regulated exchange and sending it on-chain to the casino avoids the bank-side flagging that hits direct card or SEPA transfers to gambling sites.',
  },
] as const
