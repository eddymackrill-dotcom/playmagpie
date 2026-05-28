import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COUNTRY_LIST } from '@/lib/programmatic'
import { casinos, casinoAcceptsCountry } from '@/lib/casinos'
import CasinoCard from '@/components/CasinoCard'

export async function generateStaticParams() {
  // 'sweden' is served by app/country/sweden/page.tsx (static segment takes
  // precedence over dynamic [slug]); excluded here to avoid build conflict.
  return COUNTRY_LIST.filter((c) => c.slug !== 'sweden').map((c) => ({ slug: c.slug }))
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
// - Sweden Spellag (2018:1138) 14 kap. § 9 (one-bonus rule), verbatim from riksdagen.se
// - Sweden Inkomstskattelagen (1999:1229) 8 kap. § 3 (gambling winnings — Swedish-licensed + EEA carve-out), verbatim from riksdagen.se
// - Sweden 2024 channelisation: 85% overall, 72–82% online casino, 90% policy target (Spelinspektionen kanaliseringsgrad 2024 report)
// - Sweden Safello MiCA CASP authorisation Oct 2025 (first Swedish issuance): news.cision.com/safello/r/safello-ab-granted-mica-authorization
// - Sweden BTCX (Goobit AB) & Trijo (Ijort Invest AB, now under GreenMerc) under MiCA transitional VASP regime: fi.se
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
    "The payment-blocking mechanism is more specific than \"Norwegian banks won't process it.\" Under the Lottery Act and the Payment Act framework, Lottstift maintains a published list of foreign gambling operators whose receiving accounts Norwegian banks and payment processors are required to block. Enforcement runs at two levels — the gambling merchant-category-code (MCC 7995) is flagged at the acquirer, and named-operator matching against Lottstift's list catches transactions routed through non-gambling MCCs. This is why a Visa or SEPA payment from a Norwegian bank to an offshore casino typically fails before it ever reaches the operator. On-chain crypto bypasses the mechanism entirely: the transfer is wallet-to-wallet on a public ledger with no Norwegian acquiring bank in the path. That's the operational reason crypto has become the dominant funding route for Norwegian players on offshore platforms despite the legal position remaining unchanged.",
  ],
  sweden: [
    "Sweden's gambling regime is licensed-but-restrictive in a way distinct from a monopoly. The Spelinspektionen-administered Spellag (2018:1138) opened a multi-licence market on 1 January 2019, but the rules applied to licensees are unusually tight: licensed operators can offer only one bonus per player across their entire relationship under 14 kap. § 9 (the one-bonus rule), every Swedish-resident player is screened against the Spelpaus.se national self-exclusion register at each login, and various deposit and loss limits have applied at different points since the framework came into force. This pushes a meaningful share of Swedish online activity offshore — Spelinspektionen's 2024 kanaliseringsgrad report put the overall channelisation at 85% against the 90% policy target, with the online casino segment specifically estimated between 72% and 82%. For Swedish residents, gambling winnings are tax-exempt under Inkomstskattelagen 8 kap. § 3 when the operator either holds a Swedish licence under Spellag or is established within the EEA without needing a Swedish licence; winnings from operators licensed outside the EEA — which covers most Curaçao-licensed offshore crypto casinos — fall outside that carve-out and are technically taxable.",
    "On the on-ramping side, Safello is the most directly Swedish-regulated exchange — Finansinspektionen granted it full MiCA Crypto-Asset Service Provider authorisation in October 2025, the first Swedish issuance under the new regime. BTCX (operated by Goobit AB) and Trijo (Ijort Invest AB, now under GreenMerc) continue under the transitional VASP registration regime while their MiCA applications are processed. Coinbase and Kraken serve Swedish retail through their EU entities. SEK bank-transfer-to-offshore-gambling is not blocked as systematically as in Norway, but the major Swedish banks — Swedbank, SEB, Nordea and Handelsbanken — routinely flag and sometimes reject card or SEPA payments tagged to gambling MCCs at known offshore operators. Acquiring crypto on a regulated exchange and depositing on-chain sidesteps the bank-side flagging entirely. USDT or USDC removes SEK-to-coin conversion drift between deposit and play, which matters given the SEK's higher volatility versus EUR. Crypto disposals themselves are taxed as capital income under Swedish rules, so long-held appreciation funding a deposit is a separate taxable event from the casino activity.",
  ],
  japan: [
    "Japan's online casino position is more constrained than the legal grey-zone framing usually given. Online casino gambling — including offshore — is not legal under current Japanese law. Domestic regulation through the Japan Casino Regulatory Commission (established January 2020) covers physical integrated resorts, not online play. The crypto-casino market still has Japanese users, but anyone considering it should understand the legal status accurately before treating it as a casual decision.",
    "For players who do hold crypto, Japan's tax treatment is steep and worth understanding before depositing. Cryptocurrency gains for individuals are classified as miscellaneous income and taxed at progressive national rates of 5 to 45% plus a 10% local inhabitant tax — a top combined rate around 55%. A flat 20% reform is under discussion for 2026 but has not been enacted as of writing. bitFlyer, Coincheck and Bitbank are the major FSA-registered domestic exchanges, all active for Japanese retail. JPY-to-crypto conversion through any of those is straightforward; the regulatory friction is on the casino side, not the exchange side.",
  ],
}

// Per-country related-pages tiles. Surfacing the deeper intent pages where
// the country's player base actually overlaps with the topic (e.g. NZ + AU
// share "pokies" terminology, so both link to /best-crypto-pokies-nz).
const countryRelatedPages: Record<string, { label: string; href: string; teaser: string }[]> = {
  'new-zealand': [
    { label: 'Best Crypto Pokies for NZ', href: '/best-crypto-pokies-nz', teaser: 'Provider RTP ranges + IRD tax treatment of pokies winnings' },
    { label: 'No-KYC Casinos', href: '/no-kyc-casinos', teaser: 'Privacy + bank-block-sidestep combined for offshore play' },
    { label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos', teaser: 'When NZD bank-blocking pushes you to on-chain, payout speed matters' },
  ],
  australia: [
    { label: 'Best Crypto Pokies for NZ', href: '/best-crypto-pokies-nz', teaser: 'Shared "pokies" terminology — same provider lineup applies in AU' },
    { label: 'No-KYC Casinos', href: '/no-kyc-casinos', teaser: 'Sidestep ACMA DNS-blocks and AUD card restrictions' },
    { label: 'No-Limit Withdrawal Casinos', href: '/no-limit-withdrawal-casinos', teaser: 'Cap-free cash-out matters more when on-ramp friction is high' },
  ],
  norway: [
    { label: 'Crypto Casinos in Sweden', href: '/country/sweden', teaser: 'Nordic peer — different regime (licensed-restrictive vs monopoly), same crypto-funding logic' },
    { label: 'No-KYC Casinos', href: '/no-kyc-casinos', teaser: 'Pairs with the Lottstift payment-block sidestep' },
    { label: 'No-Limit Withdrawal Casinos', href: '/no-limit-withdrawal-casinos', teaser: 'When you sidestep NOK rails for a win that matters' },
  ],
  germany: [
    { label: 'Crypto Casinos in Sweden', href: '/country/sweden', teaser: 'Adjacent EU regime — same offshore-driver dynamic at different scale' },
    { label: 'Best Crypto for Gambling', href: '/guides/best-crypto-for-gambling', teaser: '§ 23 EStG holding-period mechanics affect coin choice for DE players' },
  ],
  netherlands: [
    { label: 'Crypto Casinos in Sweden', href: '/country/sweden', teaser: 'EU peer — Sweden\'s one-bonus rule mirrors NL\'s tight licensee restrictions' },
    { label: 'No-Limit Withdrawal Casinos', href: '/no-limit-withdrawal-casinos', teaser: 'Cap-free cash-out where the 37.8% kansspelbelasting hits hard' },
  ],
  canada: [
    { label: 'Best Crypto for Gambling', href: '/guides/best-crypto-for-gambling', teaser: 'Decision matrix for picking the right chain at your casino' },
    { label: 'High Roller Casinos', href: '/high-roller-casinos', teaser: 'Canadian crypto-friendly framing pairs well with VIP-tier play' },
  ],
  ireland: [
    { label: 'Crypto Casinos in Sweden', href: '/country/sweden', teaser: 'EU peer — Sweden\'s licensed-restrictive regime contrasts with Ireland\'s tax-neutral position' },
    { label: 'Best Crypto for Gambling', href: '/guides/best-crypto-for-gambling', teaser: 'SEPA + EUR on-ramp choice affects coin selection for IE players' },
  ],
  japan: [
    { label: 'No-KYC Casinos', href: '/no-kyc-casinos', teaser: 'Operative regime sits outside Japanese law — privacy on the casino side matters' },
  ],
}

export default async function CountryPage(props: PageProps<'/country/[slug]'>) {
  const { slug } = await props.params
  const country = COUNTRY_LIST.find((c) => c.slug === slug)
  if (!country) notFound()

  const contentParagraphs = countryContext[slug] ?? []
  const relatedPages = countryRelatedPages[slug] ?? []
  // Casinos whose published terms exclude this country are filtered out — see
  // casinoAcceptsCountry in lib/casinos.ts for matching mechanics.
  const eligibleCasinos = casinos.filter((c) => casinoAcceptsCountry(c, slug))

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
            {eligibleCasinos.map((casino, i) => (
              <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
            ))}
          </div>
        </section>

        {relatedPages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Related for {country.name} players</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
                >
                  <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors mb-1 text-sm">
                    {p.label}
                  </div>
                  <div className="text-[#888888] text-xs leading-relaxed">{p.teaser}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
