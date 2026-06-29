import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for Norway. Differentiated from /country/norway (multi-coin hub) by
// a BTC-mechanics spine: Norway's offshore-blocking is a NAMED-OPERATOR payment blocklist
// (Lottstift list + MCC 7995 at the acquirer), and on-chain Bitcoin is the one funding rail
// that mechanism structurally cannot reach (wallet-to-wallet, no Norwegian acquiring bank).
// The hub explains the bank-block bypass generally; this page makes it Bitcoin-specific and
// adds the tax line most lists miss: EEA-licensed-operator winnings are tax-exempt for
// Norwegian individuals, but every Curaçao offshore casino is OUTSIDE the EEA, so those
// winnings are technically income-taxable, and depositing in Bitcoin does not change that.
// All facts reused from the verified countryContext.norway block in app/country/[slug]/page.tsx
// (verified May 2026): Lottstift (rebranded from Lotteritilsynet 2023), Norsk Tipping monopoly,
// Payment Act blocklist + MCC 7995 mechanism, Firi/NBX/Kraken on-ramps, EEA winnings exemption.

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino Norway 2026: The Rail Lottstift Cannot Block',
  description:
    "Norway's blocklist stops fiat payments to offshore casinos, not on-chain Bitcoin. The reviewed casinos that accept Norwegian players for BTC, ranked, with the Firi on-ramp and the EEA tax line most lists miss.",
  alternates: { canonical: '/best-bitcoin-casino-norway' },
  openGraph: {
    url: '/best-bitcoin-casino-norway',
    title: 'Best Bitcoin Casino Norway 2026',
    description:
      "On-chain Bitcoin sidesteps Norway's Lottstift payment blocklist entirely. The reviewed casinos accepting Norwegian BTC players, ranked, with on-ramps and the EEA winnings-tax detail.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Bitcoin Casino Norway 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bitcoin Casino Norway 2026',
    description: "On-chain Bitcoin sidesteps Norway's payment blocklist. Reviewed casinos accepting Norwegian BTC players, ranked, with on-ramps and the EEA tax line.",
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Bitcoin Casino Norway', item: 'https://www.playmagpie.com/best-bitcoin-casino-norway' },
  ],
}

// BTC-cashier notes per casino, Norway-framed. Facts from lib/casinos.ts.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz is the settled Norwegian default: a decade of Best Bitcoin Casino awards and sub-10-minute BTC processing, so the on-chain transfer that bypasses the Lottstift blocklist clears fast on the other side. Watch the 25% admin fee on bonus-related withdrawals before you tie a BTC balance to the welcome package.',
  'bc-game':
    'BC.Game runs no KYC at any withdrawal size and takes a $5 minimum, the lowest on this list. For a Norwegian who wants the cleanest BTC-in, BTC-out path with nothing attached, it is the strongest fit, and it accepts NOK-funded crypto without a Norwegian bank ever touching the transaction.',
  '7bit-casino':
    '7Bit has the longest no-KYC record (since 2014) and clears BTC instant to 10 minutes. A quiet, anonymous option for Norwegian players who would rather keep the casino leg off any documented trail.',
  cloudbet:
    'Cloudbet is the Norwegian high-roller pick: no withdrawal limits and a deposit minimum quoted in Bitcoin (0.001 BTC equivalent), which suits players moving sizeable NOK-funded BTC positions. Dual Curaçao plus Kahnawake licensing.',
  'mirax-casino':
    'Mirax clears BTC instant to 15 minutes with light KYC only above higher thresholds, and the welcome pack is denominated in Bitcoin, so it maps cleanly onto a BTC deposit funded through Firi or NBX.',
  duelbits:
    'Duelbits is the fastest at under 5 minutes, no KYC for standard crypto play, cashback-first rather than a big match bonus. A good fit if your priority is getting a NOK-funded BTC balance on and off the platform quickly.',
  shuffle:
    'Shuffle clears BTC instant to 10 minutes with SHFL rakeback on Bitcoin play. Light KYC can trigger on larger cashouts, worth knowing if you are moving a large position.',
  roobet:
    'Roobet does not restrict Norway in its terms, so it is technically open to Norwegian players, but it sits bottom of the trust ranking here: BTC withdrawals quoted up to 24 hours, no weekend processing, and a documented pattern of multi-day holds on large wins. Treat it as small-stakes-only, and never the place to be holding a five-figure BTC win waiting on a cashier review.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoNorwayPage() {
  // casinoAcceptsCountry(c, 'norway') returns true for all eight: Roobet's restricted list
  // (full country names) does not include Norway, so it renders here ranked last on trust.
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'norway') && casinoAcceptsBTC(c))
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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino Norway</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · Norway · NOK</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Bitcoin Casino Norway 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            Norway runs a state gambling monopoly and a blocklist that stops Norwegian banks from
            paying offshore casinos. What the blocklist cannot stop is an on-chain Bitcoin transfer,
            because there is no Norwegian bank in that path to flag. That single mechanical fact is why
            BTC is the dominant offshore-funding route here. Below is the ranked list of reviewed casinos
            that accept Norwegian players for Bitcoin, the on-ramp, and the EEA tax line most lists skip.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting Norway" value={`${eligible.length}`} sub="of 8 reviewed" />
          <Stat label="Lottstift blocklist hits" value="Fiat rails" sub="MCC 7995, named operators" />
          <Stat label="On-chain BTC blocking" value="None" sub="No Norwegian bank in path" />
          <Stat label="EEA winnings" value="Tax-exempt" sub="Outside-EEA: taxable" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The rail the Lottstift blocklist cannot reach</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Norway blocks offshore gambling at the payment layer, not the player. Under the Lottery Act
              and Payment Act framework, Lottstift (the regulator, rebranded from Lotteritilsynet in 2023)
              maintains a published list of foreign operators whose receiving accounts Norwegian banks and
              payment processors must block. Enforcement runs at two levels: the gambling merchant-category
              code (MCC 7995) is flagged at the acquirer, and named-operator matching against the Lottstift
              list catches transactions routed through non-gambling codes. That is why a Visa or SEPA payment
              from a Norwegian bank to an offshore casino typically fails before it ever reaches the operator.
            </p>
            <p>
              On-chain Bitcoin sidesteps the mechanism completely. A BTC transfer is wallet-to-wallet on a
              public ledger, with no Norwegian acquiring bank anywhere in the path to match against the
              blocklist or flag the MCC. You buy BTC on a regulated exchange, send it on-chain to the casino
              deposit address, and the Norwegian payment-side controls have nothing to act on. This is not a
              loophole so much as a structural mismatch: the blocklist was built for card and bank rails, and
              Bitcoin does not use them. It is the operational reason crypto became the default offshore route
              for Norwegian players even though the legal position has not moved.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The tax line most Norway lists miss: EEA versus outside-EEA</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Here is the catch that the funding mechanics can distract from. Norwegian gambling winnings are
              tax-exempt for individuals when they come from an operator licensed within the EEA. Winnings from
              operators licensed outside the EEA technically fall under income tax. Almost every offshore crypto
              casino on this page is Curaçao-licensed, which is outside the EEA, so the winnings sit in the
              taxable column regardless of how you funded the deposit. Choosing to deposit in Bitcoin rather
              than a stablecoin does nothing to change the operator's licensing domicile, and therefore nothing
              to change the winnings-tax position. Anyone telling you crypto makes offshore winnings tax-free
              in Norway is conflating the payment bypass with the tax treatment. They are separate questions.
            </p>
            <p>
              There is a second, separate leg: disposing of appreciated Bitcoin to fund a deposit can itself be
              a taxable capital event, independent of anything that happens at the casino. So a Norwegian player
              moving a long-held BTC position offshore is potentially looking at two tax considerations, the
              coin disposal and the outside-EEA winnings, not zero. None of this makes offshore play
              impractical, and plenty of players proceed informed; it makes the honest framing worth stating
              plainly. For the full regulatory picture, including the monopoly structure and on-ramp detail,
              see the{' '}
              <Link href="/country/norway" className="text-[#7BB8D4] hover:underline">
                Norway crypto casino guide
              </Link>. This is general information, not tax advice.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The {eligible.length} Bitcoin Casinos for Norwegian Players: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. Each accepts Norwegian accounts and Bitcoin deposits, checked against the
            restriction data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
            Roobet appears last: its terms do not restrict Norway, but its trust profile does the work of
            ranking it bottom.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for Norway"
          subtitle="The three highest-trust operators accepting Norwegian players for BTC"
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
                      {casino.licence} · {casino.kycLevel} KYC · Min {casino.minDeposit}
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
              Editor&apos;s pick: Bitcoin in Norway
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Bitcoin Casino Norway FAQ</h2>
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
            <Link href="/country/norway" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crypto Casinos in Norway</div>
              <div className="text-[#888888] text-sm">The full multi-coin hub: monopoly, blocklist, on-ramps, tax</div>
            </Link>
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Pairs naturally with the Lottstift payment-block sidestep</div>
            </Link>
            <Link href="/crypto/bitcoin" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Bitcoin Coin Reference</div>
              <div className="text-[#888888] text-sm">How BTC deposits, fees and confirmations work</div>
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
    question: 'Can Norwegian banks block a Bitcoin deposit to an offshore casino?',
    answer:
      "Not an on-chain one. Norway's blocking works at the payment layer: Lottstift maintains a list of foreign operators whose accounts banks must block, and the gambling merchant code (MCC 7995) is flagged at the acquirer. Both controls need a Norwegian bank or card processor in the transaction to act on. An on-chain Bitcoin transfer is wallet-to-wallet with no acquiring bank in the path, so there is nothing for the blocklist to match. That is the structural reason crypto became the dominant offshore funding route for Norwegian players.",
  },
  {
    question: 'Are Bitcoin casino winnings taxable in Norway?',
    answer:
      'It depends on where the operator is licensed, not on the coin. Norwegian gambling winnings are tax-exempt for individuals when the operator is licensed within the EEA. Winnings from operators licensed outside the EEA, which covers most Curaçao-licensed offshore crypto casinos, technically fall under income tax. Depositing in Bitcoin rather than a stablecoin does not change the operator\'s licensing domicile, so it does not change this. Separately, disposing of appreciated BTC to fund a deposit can be its own taxable capital event. This is general information, not tax advice.',
  },
  {
    question: 'Where do Norwegian players buy Bitcoin?',
    answer:
      'Firi is a Finanstilsynet-registered VASP and the most directly Norwegian-regulated on-ramp; NBX (Norwegian Block Exchange) and Kraken are also accessible to Norwegian retail. Players typically fund the exchange by NOK transfer, buy BTC, then send it on-chain to the casino deposit address, which keeps the whole funding flow off the bank-side rails the Lottstift blocklist targets.',
  },
  {
    question: 'Is Bitcoin or USDT the better deposit coin from Norway?',
    answer:
      'Bitcoin is the right choice if it is what you already hold, but it is the slower rail: it settles in roughly ten-minute blocks with fees that float with network demand. Many Norwegian players prefer USDT for bankroll management because it stays pegged to USD and removes NOK-to-coin conversion drift between sessions. Neither choice changes the outside-EEA winnings-tax position; that is set by the operator\'s licence.',
  },
  {
    question: 'How many of the reviewed casinos accept Norwegian players for Bitcoin?',
    answer:
      'All eight in our catalogue accept Norwegian players for Bitcoin under their published terms. Roobet does not restrict Norway, so it is technically open, but it ranks last on trust here for separate reasons (BTC withdrawals quoted up to 24 hours, no weekend processing, and documented holds on large wins). The seven above it are the stronger options.',
  },
] as const
