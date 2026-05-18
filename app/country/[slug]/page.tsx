import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COUNTRY_LIST } from '@/lib/programmatic'
import { casinos } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'

export async function generateStaticParams() {
  return COUNTRY_LIST.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  props: PageProps<'/country/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const country = COUNTRY_LIST.find((c) => c.slug === slug)
  if (!country) return {}
  const title = `Best Crypto Casinos in ${country.name} 2026`
  const description = `Top crypto casinos for ${country.name} players. Compare bonuses, payment methods and withdrawal speeds for ${country.currency} users.`
  return {
    title,
    description,
    alternates: { canonical: `/country/${country.slug}` },
    openGraph: {
      url: `/country/${country.slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  }
}

// Country-specific intros. Time-sensitive facts (regulator names/dates, tax rates,
// exchange licensing status) verified against primary sources May 2026:
// - NZ DIA new licensing framework dates: dia.govt.nz/Online-Gambling-Regulatory-Implementation
// - NZ IRD treatment of cryptoassets: ird.govt.nz/cryptoassets
// - Ireland GRAI operational 5 March 2025: grai.ie + Gambling Regulation Act 2024
// - Ireland gambling-winnings tax position: Section 613(2) Taxes Consolidation Act 1997
// - Germany GGL operational 1 Jan 2023: gluecksspiel-behoerde.de
// - Germany § 23 EStG one-year crypto rule: BMF / winheller.com
// - Netherlands kansspelbelasting 37.8% from 1 Jan 2026: business.gov.nl
// - Norway Lottstift rebrand from Lotteritilsynet (2023): lottstift.no
// - Japan online casino legal status / JCRC scope: jcrc.go.jp
// - Australia June 2024 credit-card ban for online wagering: acma.gov.au
const countryContext: Record<string, string[]> = {
  canada: [
    'Canadian players have one of the most crypto-friendly regulatory environments in the developed world. Cryptocurrency is legal to buy, hold and use, and the Canada Revenue Agency treats it as a commodity for tax purposes. Crypto casinos offer Canadian players a significant advantage over domestic licensed operators: faster withdrawals, larger welcome bonuses, and access to a much wider game library. Most Canadian players acquire crypto through regulated exchanges like Newton, Bitbuy or Wealthsimple, then deposit directly to their chosen casino in BTC, ETH or USDT — bypassing the slow CAD bank-transfer rails entirely. CAD-denominated deposits are rare at crypto casinos, but stablecoins like USDT remove that friction completely. As always, players should check current provincial regulations before playing — Ontario operates its own licensed framework, while other provinces are less prescriptive.',
  ],
  australia: [
    "Australia's regulatory position is the classic offshore-friendly grey: the Interactive Gambling Act 2001 restricts operators rather than players, leaving Australian residents free to use offshore crypto casinos. ACMA, the communications regulator, blocks domestic access to many offshore sites at the DNS level — a VPN sidesteps that, but funding via crypto rather than card is the more durable workaround. A June 2024 IGA amendment banned credit cards for licensed online wagering, which accelerated the shift to crypto among AU players who had previously preferred card deposits.",
    "CoinSpot, Independent Reserve and Swyftx are the major AUSTRAC-registered exchanges most Australians use to on-ramp, all active for retail. AUD bank transfers to offshore gambling sites are commonly blocked, so most AU players acquire BTC or USDT and deposit on-chain. The ATO treats crypto as a CGT asset, so disposal-to-fund-deposit can itself be a CGT event — though casual gambling winnings are generally not assessable income for individuals. Several top crypto casinos restrict AU accounts in their terms; verify your platform accepts Australian players before depositing.",
  ],
  'new-zealand': [
    "New Zealand's online gambling rules are mid-transition in 2026. The Department of Internal Affairs is rolling out a new licensing framework — the licensing scheme commences on 1 May 2026, with licensed-only enforcement following on 1 December 2026. Until that second milestone, offshore crypto casinos remain accessible to NZ players, who currently make up the bulk of online casino activity. Casual gambling winnings are not taxable for individuals under IRD rules, and IRD treats cryptoassets themselves as property rather than currency — so the tax position usually concerns crypto disposal events, not casino activity itself.",
    "Easy Crypto is the NZ-native broker most retail players use for on-ramping, with Independent Reserve also active for Kiwi accounts. Binance operates an NZ entity under FSP registration, but it is not supervised by an NZ regulator in the same way an Australian or European exchange would be — worth knowing if regulatory recourse matters to you. NZD bank transfers to offshore gambling sites are slow and frequently blocked; most NZ crypto-casino players acquire BTC, ETH or USDT through one of those exchanges and deposit directly, with stablecoins removing NZD-to-coin conversion drift.",
  ],
  ireland: [
    "Ireland sits in an unusual position for offshore crypto play: gambling winnings for individuals are not chargeable gains under Section 613(2) of the Taxes Consolidation Act 1997, which makes Irish-resident play tax-neutral on the casino-winnings side regardless of where the operator is based. The Gambling Regulatory Authority of Ireland (GRAI) was established under the Gambling Regulation Act 2024 and has been operational since 5 March 2025 — the regulator is new, the licensing regime under it is still bedding in, and offshore crypto casinos remain routinely accessed by Irish players in the meantime.",
    "For on-ramping, Kraken operates through Payward Ireland Ltd with Central Bank of Ireland e-money and CASP authorisation, making it the most directly Irish-regulated of the major exchanges; Coinbase and Bitstamp also serve EUR pairs to Irish retail. EUR-denominated SEPA transfers to offshore casinos are slow by Irish bank standards and frequently flagged on gambling-related descriptors, so most players acquire BTC, ETH or USDT and deposit on-chain. Stablecoins in USDT or USDC are particularly common for keeping the deposited balance pegged to a known EUR-equivalent value.",
  ],
  germany: [
    "Germany operates one of Europe's more restrictive licensed-gambling regimes. The Gemeinsame Glücksspielbehörde der Länder (GGL) has held federal regulatory authority since 1 January 2023, building on the 2021 Interstate Treaty on Gambling. Licensed German operators carry strict deposit caps and stake limits, which is why most German players seeking larger bonuses turn to offshore crypto casinos. Bitpanda, Coinbase and Kraken are all BaFin-licensed for German retail on-ramping, but SCHUFA-linked bank transfers to gambling sites are routinely flagged — USDT on TRC-20 is the most common German deposit route as a result.",
    "Where Germany differs distinctly from its neighbours is tax treatment. Under § 23 EStG, private cryptocurrency held by an individual for more than one year is fully tax-free on disposal, with a €1,000 Freigrenze covering short-term gains. Long-held BTC or ETH can therefore fund offshore play without triggering a tax event on the crypto leg, where short-term-acquired coin sold to fund a deposit would be taxable above the threshold. Gambling winnings themselves are generally outside individual income tax for casual players.",
  ],
  netherlands: [
    "The Dutch gambling tax is the single most important number for Netherlands-resident players to know in 2026: kansspelbelasting now sits at 37.8% on winnings above the personal threshold, up from 34.2% in 2025 and 30.5% before that. The rate applies to Dutch residents on winnings from any operator, licensed or offshore — the tax math is identical whether you play a Kansspelautoriteit-licensed Dutch site or an offshore crypto casino. Operator choice therefore comes down to bonus size, withdrawal speed and game library, not tax efficiency, and offshore crypto operators tend to win on all three.",
    "Bitvavo is the dominant Dutch crypto exchange — roughly 49% domestic market share, MiCA-authorised by the AFM since June 2025 — making it the default on-ramp for Dutch players. Coinbase and Kraken are also active. Dutch banks routinely block transfers to offshore gambling sites, so crypto is often the only practical funding route. Note that several top crypto casinos officially restrict NL accounts in response to the KSA regime introduced in 2021 — verify eligibility before signing up. USDT or USDC removes EUR conversion drift between deposit and play.",
  ],
  norway: [
    "Norway runs one of Europe's strictest gambling monopolies. Norsk Tipping holds the casino and sports-betting state monopoly alongside Norsk Rikstoto for horse racing, and Lottstift (Lotteri- og stiftelsestilsynet, rebranded from Lotteritilsynet in 2023) is the regulator enforcing it. Norwegian banks routinely block NOK transfers to offshore gambling sites under the Payment Act, leaving cryptocurrency as the most practical funding method for players who want broader game selection or competitive bonuses than the monopoly provides.",
    "Norwegian crypto on-ramping centres on Firi, a Finanstilsynet-registered VASP, alongside NBX (Norwegian Block Exchange) and Kraken — all accessible to Norwegian retail. NOK-to-crypto deposits are typically funded by exchange transfer and routed on-chain to the casino. Most Norwegian players prefer USDT for stablecoin-style bankroll management, which sidesteps NOK conversion overhead and keeps deposited value pegged to USD. Norwegian gambling winnings from EEA-licensed operators are tax-exempt for individuals; winnings from outside-EEA operators technically fall under income tax — a distinction worth being aware of before depositing large sums offshore.",
  ],
  japan: [
    "Japan's online casino position is more constrained than the legal grey-zone framing usually given. Online casino gambling — including offshore — is not legal under current Japanese law. Domestic regulation through the Japan Casino Regulatory Commission (established January 2020) covers physical integrated resorts, not online play. The crypto-casino market still has Japanese users, but anyone considering it should understand the legal status accurately before treating it as a casual decision.",
    "For players who do hold crypto, Japan's tax treatment is steep and worth understanding before depositing. Cryptocurrency gains for individuals are classified as miscellaneous income and taxed at progressive national rates of 5 to 45% plus a 10% local inhabitant tax — a top combined rate around 55%. A flat 20% reform is under discussion for 2026 but has not been enacted as of writing. bitFlyer, Coincheck and Bitbank are the major FSA-registered domestic exchanges, all active for Japanese retail. JPY-to-crypto conversion through any of those is straightforward; the regulatory friction is on the casino side, not the exchange side.",
  ],
}

export default async function CountryPage(props: PageProps<'/country/[slug]'>) {
  const { slug } = await props.params
  const country = COUNTRY_LIST.find((c) => c.slug === slug)
  if (!country) notFound()

  const contentParagraphs = countryContext[slug] ?? []

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: `${country.name} Casinos`, item: `https://www.playmagpie.com/country/${country.slug}` },
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
          <span className="text-[#f5f5f5]">{country.name}</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">{country.currency}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Casinos in {country.name} 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Top crypto casinos for {country.name} players. Compare bonuses, payment methods and withdrawal speeds for {country.currency} users.
          </p>
        </div>

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">
            Crypto Casinos for {country.name} Players
          </h2>
          {contentParagraphs.map((paragraph, i) => (
            <p key={i} className="text-[#888888] leading-relaxed mb-4 last:mb-0">{paragraph}</p>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">All Crypto Casinos Ranked</h2>
          <p className="text-[#888888] text-sm mb-6">
            Independent rankings — verify each platform accepts {country.name} accounts before depositing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {casinos.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
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
