import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos, casinoAcceptsCountry, type Casino } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'
import FactChecked from '@/components/FactChecked'
import { countryLastReviewed } from '@/lib/last-reviewed'

// Finland is a static segment (like Sweden) rather than the dynamic /country/[slug]
// template, because it carries richer regulatory + FAQ content. Approved earlier in the
// 2026-06-24 country-expansion diagnostic but missed in the bitcoin batch; built here.
// generateStaticParams in app/country/[slug]/page.tsx excludes 'finland' to avoid a build
// conflict. Verified facts (research subagent, 2026-06-24, primary sources):
// - Veikkaus monopoly under the Lotteries Act (arpajaislaki 1047/2001), supervised by the
//   National Police Board (Poliisihallitus) / Ministry of the Interior. Law targets
//   organising and marketing, not players; offshore play is not a player-side offence.
// - Reform: licence applications open 1 March 2026; licensed market live 1 July 2027;
//   Veikkaus monopoly on betting/online slots/online casino runs until 1 July 2027; a new
//   Finnish supervisory agency takes over licensing from 1 July 2027 (intermin.fi; valtioneuvosto.fi).
// - Tax: EU/EEA-licensed gambling winnings are tax-exempt; winnings from operators OUTSIDE
//   the EU/EEA are fully taxable income for Finnish residents (vero.fi / verokampus.fi). Our
//   catalogue is Curaçao/Kahnawake licensed = outside the EEA = winnings taxable in Finland.
// - Crypto disposal taxed as capital income: 30% up to EUR 30,000, 34% above; FIFO (vero.fi).
// - On-ramps: Coinmotion Oy (first Finnish MiCA CASP authorised by FIN-FSA) and Northcrypto Oy
//   (MiCA CASP, late Nov 2025); national VASP transition ended 30 June 2025 (finanssivalvonta.fi).
// Omitted (could not verify to primary source): TVL section number for the winnings exemption,
// any EUR 1,000 crypto-disposal threshold, and any specific offshore-play percentage.

const eligibleCasinos = casinos.filter((c) => casinoAcceptsCountry(c, 'finland'))

function buildFinlandCard(casino: Casino): CTAStripCard {
  const cryptoCount = casino.acceptedCryptos.includes('100+ more')
    ? '100+'
    : `${casino.acceptedCryptos.length}`
  return {
    slug: casino.slug,
    facts: [
      { label: 'Withdrawal', value: casino.withdrawalTime },
      { label: 'KYC', value: casino.kycLevel },
      { label: 'Cryptos', value: `${cryptoCount} accepted` },
    ],
  }
}

const FINLAND_STRIP_CARDS: CTAStripCard[] = [...eligibleCasinos]
  .sort((a, b) => b.trustScore - a.trustScore)
  .slice(0, 3)
  .map(buildFinlandCard)

export const metadata: Metadata = {
  title: 'Best Crypto Casinos in Finland 2026: Veikkaus, the 2027 Reform & Tax',
  description:
    'Crypto casinos for Finnish players in 2026. The Veikkaus monopoly runs until the licensed market opens on 1 July 2027, the EEA winnings-tax carve-out, and Coinmotion / Northcrypto on-ramping.',
  alternates: { canonical: '/country/finland' },
  openGraph: {
    url: '/country/finland',
    title: 'Best Crypto Casinos in Finland 2026',
    description:
      'Crypto casinos for Finnish players: the Veikkaus monopoly and 2027 licensing reform, the EEA winnings-tax carve-out, and FIN-FSA on-ramps Coinmotion and Northcrypto.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Casinos in Finland 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Casinos in Finland 2026',
    description: 'The Veikkaus monopoly and 2027 reform, the EEA winnings-tax carve-out, and Coinmotion / Northcrypto on-ramps.',
    images: ['/og-image.png'],
  },
}

// Sourced from each casino's acceptedCryptos lineup in lib/casinos.ts.
const CRYPTO_MATRIX_COLUMNS = ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'LTC', 'XRP'] as const

function casinoAccepts(slug: string, symbol: string): boolean {
  const casino = casinos.find((c) => c.slug === slug)
  if (!casino) return false
  return casino.acceptedCryptos.some((c) => c.toUpperCase() === symbol.toUpperCase())
}

const faqs = [
  {
    question: 'Is it legal for Finnish residents to play at offshore crypto casinos?',
    answer:
      'Finnish gambling law restricts organising and marketing gambling, not playing it. Veikkaus holds the state monopoly under the Lotteries Act (arpajaislaki 1047/2001), supervised by the National Police Board, and a Finnish resident who plays at an offshore casino is not committing a player-side offence. That is the established legal position. The monopoly on online casino games runs until 1 July 2027, when Finland opens a licensed competitive market.',
  },
  {
    question: 'Are offshore crypto casino winnings taxable in Finland?',
    answer:
      'It depends on where the operator is licensed. The Finnish Tax Administration treats winnings from EU/EEA-licensed gambling as tax-exempt, but winnings from operators outside the EU/EEA as fully taxable income, reported in the year you won. Every casino we review is Curaçao-licensed (Cloudbet adds a Kahnawake licence), all outside the EEA, so winnings from them are taxable for a Finnish resident. Keep your own records, especially at no-KYC casinos that report nothing for you.',
  },
  {
    question: 'When does Finland open its licensed online casino market?',
    answer:
      'Licence applications open on 1 March 2026 and the licensed market goes live on 1 July 2027. Veikkaus keeps its monopoly on online casino games, betting and online slots until that date, which is why Finnish players who want a wider crypto offering currently use offshore operators. A new Finnish supervisory agency takes over licensing from 1 July 2027.',
  },
  {
    question: 'Which Finnish exchange should I use to buy crypto for casino deposits?',
    answer:
      'Coinmotion was the first Finnish firm to receive a MiCA Crypto-Asset Service Provider authorisation from the Finnish Financial Supervisory Authority (FIN-FSA), and Northcrypto received its MiCA CASP authorisation in late November 2025. Both are Finnish-native and the cleanest euro-to-crypto on-ramps after Finland ended its national virtual-currency-provider transition period on 30 June 2025. Coinbase and Kraken also serve Finnish retail through their EU entities.',
  },
  {
    question: 'How is the cryptocurrency itself taxed in Finland?',
    answer:
      'Disposing of crypto (selling it for euro, swapping it, or spending it) is a capital-income event in Finland, taxed at 30% up to EUR 30,000 of capital income and 34% above that, with cost basis calculated on a FIFO basis. That is separate from the question of whether your casino winnings are taxable. This is general information, not tax advice; confirm your own position with Vero.',
  },
  {
    question: 'Do any of the casinos PlayMagpie reviews restrict Finnish players?',
    answer:
      'None of the eight casinos we review lists Finland in its restricted-countries terms, so all eight are shown below. Published restriction lists typically cover the US, UK, Australia, Netherlands and France. A published list is not a cashier guarantee, so verify Finnish account acceptance on the operator\'s own terms before depositing.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casinos by Country', item: 'https://www.playmagpie.com/country' },
    { '@type': 'ListItem', position: 3, name: 'Finland', item: 'https://www.playmagpie.com/country/finland' },
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

export default function FinlandPage() {
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
          <Link href="/country" className="hover:text-white transition-colors">Country</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Finland</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">EUR · Finland</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos in Finland 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Finland is the last of the Nordic gambling monopolies, and it is on the clock. Veikkaus keeps
            its grip on online casino play until 1 July 2027, when a licensed market finally opens. Until
            then, the real choice for Finnish players sits offshore, and that is overwhelmingly funded in crypto.
          </p>
          {countryLastReviewed['finland'] && <FactChecked date={countryLastReviewed['finland']} />}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Licensed market live', value: 'Jul 2027', sub: 'Applications open 1 Mar 2026' },
            { label: 'First Finnish MiCA-CASP', value: 'Coinmotion', sub: 'FIN-FSA authorised' },
            { label: 'Casinos accepting FI accounts', value: `${eligibleCasinos.length} / ${casinos.length}`, sub: 'None restrict Finland in published terms' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <CasinoCTAStrip
          framing="Top 3 by trust score among operators accepting Finnish accounts. All eight casinos we review accept Finland."
          cards={FINLAND_STRIP_CARDS}
        />

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">A monopoly counting down to a licensed market</h2>
          <p className="text-[#888888] leading-relaxed">
            Veikkaus holds the Finnish gambling monopoly under the Lotteries Act (arpajaislaki 1047/2001),
            supervised by the National Police Board. Finnish law targets operators and marketing rather
            than players, so a resident playing at an offshore casino is not committing an offence, which
            is the same operator-focused structure that has pushed a large share of Finnish online play
            offshore for years. That is now changing on a fixed timetable: licence applications open on
            1 March 2026 and the licensed competitive market goes live on 1 July 2027, with a new Finnish
            supervisory agency taking over from that date.
          </p>
          <p className="text-[#888888] leading-relaxed">
            Tax is where Finland rewards reading the fine print. The Finnish Tax Administration treats
            winnings from EU/EEA-licensed gambling as tax-exempt, but winnings from operators outside the
            EU/EEA as fully taxable income. Every casino we review is Curaçao-licensed and outside the EEA,
            so winnings from them are taxable for a Finnish resident, unlike winnings from an EU/EEA-licensed
            site. Separately, disposing of the crypto itself is a capital-income event, taxed at 30% up to
            EUR 30,000 and 34% above, calculated FIFO.
          </p>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">Euro to crypto, then crypto to casino</h2>
          <p className="text-[#888888] leading-relaxed">
            Finland ended its national virtual-currency-provider transition period on 30 June 2025, so the
            exchanges operating legally now are MiCA-authorised. Acquiring crypto on a regulated Finnish
            exchange and depositing on-chain sidesteps the bank-side friction that hits card or transfer
            payments tagged to gambling at offshore operators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Coinmotion: first Finnish MiCA-CASP',
                body: 'Coinmotion was the first firm in Finland to receive a MiCA Crypto-Asset Service Provider authorisation from FIN-FSA, which makes it the most directly Finnish-regulated euro-to-crypto on-ramp. EUR deposits convert to BTC, ETH or stablecoins, then withdraw on-chain to your chosen casino address.',
              },
              {
                title: 'Northcrypto: MiCA-authorised late 2025',
                body: 'Northcrypto received its MiCA CASP authorisation from FIN-FSA in late November 2025, covering custody, order execution and transfer services. It is a Finnish-native alternative to Coinmotion for EUR-to-crypto on-ramping. Coinbase and Kraken also serve Finnish retail through their EU entities.',
              },
              {
                title: 'Stablecoins keep the deposit pegged',
                body: 'Finland uses the euro, so SEK-style FX drift is not the issue it is for Swedish players, but a non-stablecoin deposit still tracks crypto-market movement between deposit and withdrawal. USDT or USDC on a fast network keeps the deposited value pegged to USD across sessions, which suits balances held on platform rather than same-session play.',
              },
              {
                title: 'Network choice once you are on-chain',
                body: 'USDT on TRC-20 (Tron) is the most common deposit and withdrawal network at the casinos we review: sub-second confirmation and fees under $0.01. SOL is comparably fast where supported. BTC works everywhere but carries the ten-minute-block-time and fee-volatility overhead. Match the deposit network to your planned withdrawal coin.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Crypto support at each casino we review</h2>
          <p className="text-[#888888] text-sm mb-6">
            Verified from each casino&apos;s acceptedCryptos lineup. Match the coin to your Coinmotion or
            Northcrypto on-ramp output for the smoothest funding route.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Casino</th>
                  {CRYPTO_MATRIX_COLUMNS.map((col) => (
                    <th key={col} className="text-center px-3 py-3.5 text-[#888888] font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eligibleCasinos.map((casino, i) => (
                  <tr
                    key={casino.slug}
                    className={`border-b border-[#222222] last:border-0 hover:bg-[#1a1a1a]/60 transition-colors ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}
                  >
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/reviews/${casino.slug}`}
                        className="font-semibold text-[#f5f5f5] hover:text-[#7BB8D4] transition-colors text-sm"
                      >
                        {casino.name}
                      </Link>
                    </td>
                    {CRYPTO_MATRIX_COLUMNS.map((col) => (
                      <td key={col} className="text-center px-3 py-3.5 text-sm">
                        {casinoAccepts(casino.slug, col) ? (
                          <span className="text-[#7BB8D4]">✓</span>
                        ) : (
                          <span className="text-[#444444]">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#555555] text-xs mt-3">
            BC.Game also lists 100+ additional cryptocurrencies beyond this table. Full lists are in each
            casino&apos;s individual review.
          </p>
        </section>

        <section className="mb-12 space-y-4 prose prose-invert max-w-none">
          <h2 id="bitcoin" className="text-2xl font-bold text-white scroll-mt-24">Depositing Bitcoin from Finland</h2>
          <p className="text-[#888888] leading-relaxed">
            The tax detail that decides more than any bonus: the Finnish Tax Administration taxes gambling
            winnings by where the operator is licensed. Winnings from gambling held within the EU or EEA are
            tax-exempt for the Finnish recipient; winnings from outside the EU and EEA are fully taxable as
            income, reported in the year you won. Every operator we review is licensed in Curaçao (Cloudbet
            adds Kahnawake), none inside the EEA, so winnings from any casino on this page are taxable income
            for a Finnish resident. We would rather say that up front than sell a &quot;tax-free crypto&quot;
            line that is simply wrong for an offshore Curaçao casino. Keep your own records: the no-KYC
            casinos here report nothing to anyone, which is convenient for privacy and inconvenient at tax
            time, because the burden is entirely yours.
          </p>
          <p className="text-[#888888] text-sm leading-relaxed">
            Separately, disposing of the Bitcoin itself (selling or spending it) is a capital-income event
            taxed at 30% up to €30,000 and 34% above, calculated FIFO. On the cashier side BTC settles in
            roughly ten-minute blocks with demand-driven fees, so a stablecoin is the faster route if you are
            starting from euros; the reason to use Bitcoin anyway is that it is the coin you hold. Coinmotion
            and Northcrypto are the Finnish-native on-ramps, both FIN-FSA authorised under MiCA since the
            national VASP transition completed 30 June 2025. None of this is advice; confirm your position
            with Vero.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">All Crypto Casinos Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Independent rankings. Every casino below accepts Finnish accounts under its published terms.
            Verify acceptance before depositing in case an operator updates its terms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eligibleCasinos.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        <section className="mb-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-[#888888] text-sm mb-8">
            Common questions from Finnish residents researching offshore crypto casinos in 2026.
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
            <Link href="/country/norway" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Norway crypto casinos</div>
              <div className="text-[#888888] text-sm">Nordic peer: Lottstift monopoly + Payment Act blocks</div>
            </Link>
            <Link href="/country/sweden" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Sweden crypto casinos</div>
              <div className="text-[#888888] text-sm">Nordic peer: licensed-restrictive Spellag regime</div>
            </Link>
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC casinos</div>
              <div className="text-[#888888] text-sm">Privacy-first play; remember the Vero reporting burden stays yours</div>
            </Link>
          </div>
        </section>

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link
            href="/country"
            className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all countries
          </Link>
        </div>
      </div>
    </>
  )
}
