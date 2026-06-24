import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CTAButton from '@/components/CTAButton'

// Bitcoin-axis page for Finland. A /country/finland hub now exists (static segment); this
// page is differentiated from it the same way the Germany pair is: the hub is the multi-coin
// country overview, this page is the BTC-axis ranking (per-casino BTC cashier mechanics + the
// on-chain speed trade-off). It links up to the hub for the full regulatory picture.
// Verified facts (research subagent, 2026-06-24, primary sources):
// - Veikkaus monopoly under Lotteries Act 1047/2001, supervised by National Police
//   Board / Ministry of the Interior (intermin.fi). Law targets organising/marketing,
//   not players; playing offshore is not a player-side offence (established position).
// - Licensing reform: applications open 1 March 2026; licensed market live 1 July 2027;
//   Veikkaus monopoly on betting/online slots/online casino runs until 1 July 2027;
//   new Finnish supervisory agency from 1 July 2027 (intermin.fi; valtioneuvosto.fi).
// - Gambling-winnings tax: EU/EEA-licensed winnings tax-exempt; winnings from operators
//   OUTSIDE the EU/EEA fully taxable as income (vero.fi / verokampus.fi). Our catalogue
//   casinos are Curaçao/Kahnawake licensed = outside the EEA = winnings taxable in Finland.
// - Crypto disposal taxed as capital income: 30% up to €30,000, 34% above (vero.fi), FIFO.
// - On-ramps: Coinmotion Oy and Northcrypto Oy, FIN-FSA-authorised under MiCA; national
//   VASP transition ended 30 June 2025 (finanssivalvonta.fi).
// Deliberately omitted (could not verify to primary source): TVL §85 section number for the
// winnings exemption, and any €1,000 crypto-disposal threshold.

export const metadata: Metadata = {
  title: 'Best Bitcoin Casino Finland 2026: 8 That Accept Finnish Players',
  description:
    'Every casino we review accepts Finnish players for Bitcoin. Ranked, plus the tax detail Finnish lists skip: winnings from these Curaçao-licensed casinos are taxable in Finland because they sit outside the EEA.',
  alternates: { canonical: '/best-bitcoin-casino-finland' },
  openGraph: {
    url: '/best-bitcoin-casino-finland',
    title: 'Best Bitcoin Casino Finland 2026',
    description:
      'All 8 reviewed casinos accept Finnish players for Bitcoin, ranked, with the EEA tax carve-out that decides whether your winnings are taxable.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Bitcoin Casino Finland 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bitcoin Casino Finland 2026',
    description: 'All 8 reviewed casinos accept Finnish players for Bitcoin, ranked, with the EEA winnings-tax carve-out explained.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Bitcoin Casino Finland', item: 'https://www.playmagpie.com/best-bitcoin-casino-finland' },
  ],
}

// BTC-cashier notes per casino, Finland-framed (offshore privacy + record-keeping,
// since winnings are taxable in Finland). Facts from lib/casinos.ts only.
const PER_CASINO_BTC_NOTES: Record<string, string> = {
  bitstarz:
    'BitStarz is the safe default: a decade-plus track record, multiple Bitcoin-casino awards, and BTC withdrawals under 10 minutes on the operator side. Light KYC triggers on larger withdrawals, so it is not a no-documents option, but it is the most established BTC brand a Finnish player can land on.',
  'bc-game':
    'BC.Game runs no KYC at any withdrawal size, which is the cleanest fit for a Finnish player who would rather not attach ID to an offshore account. Bear in mind no-KYC means the casino is not reporting anything on your behalf either, so you keep your own records for the Finnish tax return. Lowest entry at $5.',
  '7bit-casino':
    '7Bit has the longest unbroken no-KYC record of the eight (since 2014) and clears BTC instant to 10 minutes. A solid choice for Finnish BTC holders who want a settled platform with full anonymity on the withdrawal side.',
  cloudbet:
    'Cloudbet is the high-bankroll pick: no withdrawal limits and a minimum quoted in Bitcoin (0.001 BTC equivalent). For a Finnish player cashing out a large BTC win, the absence of a withdrawal cap matters more than a few minutes of processing time.',
  'mirax-casino':
    'Mirax clears BTC instant to 15 minutes with light KYC only above higher thresholds, and its welcome pack is denominated in BTC to a 5 BTC ceiling. A reasonable middle option between the no-KYC brands and the high-roller Cloudbet profile.',
  duelbits:
    'Duelbits has the fastest headline window (under 5 minutes) and no KYC for standard crypto play. Its cashback-first model (up to $30 weekly) suits a Finnish player who deposits BTC to play rather than to chase a deposit match.',
  shuffle:
    'Shuffle clears BTC instant to 10 minutes and adds SHFL-token rakeback on every coin including Bitcoin. Light KYC can trigger on larger cashouts, the trade-off for the rakeback rewards.',
  roobet:
    'Roobet is the lowest-trust option here and carries documented multi-day holds on large withdrawals (its BTC payout window stretches up to 24 hours, the slowest on this list). Usable for small crash-led BTC play; not where you want a five-figure BTC win sitting in a cashier review.',
}

function casinoAcceptsBTC(c: Casino): boolean {
  return c.acceptedCryptos.some((coin) => coin.toUpperCase() === 'BTC')
}

export default function BestBitcoinCasinoFinlandPage() {
  // No catalogue casino restricts Finland, so all eight that accept BTC are eligible.
  const eligible = casinos
    .filter((c) => casinoAcceptsCountry(c, 'finland') && casinoAcceptsBTC(c))
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
          <span className="text-[#f5f5f5]">Best Bitcoin Casino Finland</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Bitcoin · Finland · EUR</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Best Bitcoin Casino Finland 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            Finland is mid-reform: Veikkaus keeps its monopoly on online casino play until 1 July 2027,
            and licence applications for the new competitive market only open on 1 March 2026. Until that
            transition lands, offshore Bitcoin casinos are where Finnish players actually get a choice.
            All eight casinos we review accept Finnish accounts. One tax detail decides more than the
            bonus does, and most Finnish lists skip it.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <Stat label="Casinos accepting Finland" value={`${eligible.length}`} sub="of 8 reviewed" />
          <Stat label="Licensed market live" value="Jul 2027" sub="Applications open 1 Mar 2026" />
          <Stat label="Non-EEA winnings" value="Taxable" sub="EU/EEA winnings are tax-free" />
          <Stat label="Crypto disposal tax" value="30-34%" sub="Capital income, FIFO" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">The EEA tax line that decides everything</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Finland taxes gambling winnings by where the operator is licensed. The Finnish Tax
              Administration is explicit: winnings from gambling held within the EU or EEA are tax-exempt
              for the Finnish recipient, while winnings from a game held outside the EU and EEA are fully
              taxable as income, reported in the year you won. That single distinction matters more than
              any welcome bonus on this page.
            </p>
            <p>
              Here is the uncomfortable part most Finnish "best casino" lists leave out: every operator we
              review is licensed in Curaçao (Cloudbet adds a Kahnawake licence), and none of them sits
              inside the EEA. So winnings from any casino on this page are taxable income for a Finnish
              resident. Winnings from an EU/EEA-licensed operator, a Malta MGA site for example, would be
              tax-free. We would rather tell you that up front than sell you a "tax-free crypto" line that
              is simply wrong for an offshore Curaçao casino.
            </p>
            <p>
              What that means in practice: keep your own records. The no-KYC casinos on this list do not
              report anything to anyone, which is convenient for privacy and inconvenient at tax time,
              because the reporting burden is entirely yours. Separately, disposing of the Bitcoin itself
              (selling it, or spending it) is a capital-income event taxed at 30% up to €30,000 and 34%
              above, calculated FIFO. None of this is advice; confirm your own position with Vero.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Buying Bitcoin in Finland</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Finland finished its national VASP transition on 30 June 2025, so the exchanges operating
              legally now are MiCA-authorised. Coinmotion and Northcrypto are the Finnish-native options,
              both authorised by the Finnish Financial Supervisory Authority (FIN-FSA) under MiCA, which
              makes them the cleanest domestic on-ramps for euro-to-Bitcoin. The Bitcoin caveat is the
              usual one: BTC settles in roughly ten-minute blocks and network fees float with demand, so
              an on-chain BTC withdrawal is slower and can cost more than a stablecoin route. The reason
              to use Bitcoin anyway is that it is the coin you hold, not one you bought specifically to
              gamble with.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-2">The {eligible.length} Bitcoin Casinos for Finnish Players: Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Ranked by trust score. All eight accept Finnish accounts and Bitcoin deposits, verified
            against the data in{' '}
            <code className="text-[#7BB8D4] bg-[#111111] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>.
          </p>
          <CasinoComparisonTable casinos={eligible} />
        </section>

        <TopRatedSection
          title="Top 3 Bitcoin Picks for Finland"
          subtitle="The three highest-trust operators accepting Finnish players"
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
              Editor&apos;s pick: Bitcoin in Finland
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{top.name}</h3>
            <p className="text-[#888888] mb-4">{top.bonusSummary}</p>
            <CTAButton href={top.affiliateUrl} label={`Visit ${top.name}`} variant="primary" size="lg" external />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-2">Bitcoin Casino Finland FAQ</h2>
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
            <Link href="/country/finland" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Crypto Casinos in Finland</div>
              <div className="text-[#888888] text-sm">The full multi-coin hub: Veikkaus, the 2027 reform, tax</div>
            </Link>
            <Link href="/crypto/bitcoin" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Bitcoin Coin Reference</div>
              <div className="text-[#888888] text-sm">How BTC deposits, fees and confirmations work</div>
            </Link>
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Anonymous play, with the record-keeping caveat</div>
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
    question: 'Can Finnish players legally use offshore Bitcoin casinos?',
    answer:
      'Finnish gambling law restricts organising and marketing gambling, not playing it. Veikkaus holds the state monopoly under the Lotteries Act (1047/2001), supervised by the National Police Board, but a Finnish resident playing at an offshore casino is not committing a player-side offence. That is the established legal position. The monopoly on online casino games runs until 1 July 2027, when Finland opens a licensed competitive market.',
  },
  {
    question: 'Are my winnings from a Bitcoin casino taxable in Finland?',
    answer:
      'It depends on where the operator is licensed. The Finnish Tax Administration treats winnings from EU/EEA-licensed gambling as tax-exempt, but winnings from operators outside the EU/EEA as fully taxable income. Every casino on this page is Curaçao-licensed (outside the EEA), so winnings from them are taxable for a Finnish resident, reported in the year won. Keep your own records, especially at no-KYC casinos that report nothing for you. This is general information, not tax advice.',
  },
  {
    question: 'When does Finland open its licensed online casino market?',
    answer:
      'Licence applications open on 1 March 2026 and the licensed market goes live on 1 July 2027. Until then, Veikkaus keeps the monopoly on online casino games, betting and online slots, which is why Finnish players who want a wider Bitcoin offering currently use offshore operators. A new Finnish supervisory agency takes over licensing from 1 July 2027.',
  },
  {
    question: 'Where do Finnish players buy Bitcoin?',
    answer:
      'Coinmotion and Northcrypto are the Finnish-native exchanges, both authorised by the Finnish Financial Supervisory Authority (FIN-FSA) under the MiCA framework after Finland ended its national VASP transition period on 30 June 2025. Buy BTC there and send it on-chain to the casino to avoid bank-side friction on gambling transfers.',
  },
  {
    question: 'Is Bitcoin the best coin to deposit from Finland?',
    answer:
      'Bitcoin makes sense if it is the coin you already hold. On raw cashier mechanics, BTC is slower (roughly ten-minute blocks) and can cost more in network fees than stablecoins on TRC-20 or Smart Chain. There is no Finnish tax advantage to BTC specifically, since the EEA carve-out is about the operator licence, not the coin. So deposit Bitcoin because you hold Bitcoin, not because it is cheaper or faster than the alternatives.',
  },
] as const
