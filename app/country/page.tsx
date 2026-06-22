import type { Metadata } from 'next'
import Link from 'next/link'
import { COUNTRY_LIST } from '@/lib/programmatic'

export const metadata: Metadata = {
  title: 'Crypto Casinos by Country 2026: Regulators, On-Ramps & Banking Reality',
  description:
    'Country-by-country breakdown of crypto casino access in 2026. Regulators, on-ramp exchanges, banking attitude and tax position across Tier 1 markets and the EU.',
  alternates: { canonical: '/country' },
  openGraph: {
    url: '/country',
    title: 'Crypto Casinos by Country 2026: Regulators, On-Ramps & Banking Reality',
    description:
      'Country-by-country breakdown of crypto casino access in 2026. Regulators, on-ramp exchanges, banking attitude and tax position.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casinos by Country' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casinos by Country 2026: Regulators, On-Ramps & Banking Reality',
    description:
      'Country-by-country breakdown of crypto casino access in 2026: regulators, on-ramps and banking reality.',
    images: ['/og-image.png'],
  },
}

// Teasers anchored to verified facts in app/country/[slug]/page.tsx countryContext.
// If you change a country page intro, update the matching teaser here.
const countryTeasers: Record<string, string> = {
  canada: 'Tier 1 crypto-friendly; Ontario operates its own licensed framework, other provinces are lighter',
  australia: 'ACMA DNS-blocks offshore sites; crypto sidesteps the June 2024 credit-card ban for online wagering',
  'new-zealand': 'DIA licensing scheme commences 1 May 2026; licensed-only enforcement from 1 December 2026',
  ireland: 'GRAI operational since 5 March 2025; winnings tax-neutral under TCA 1997 § 613(2)',
  germany: 'GGL operational since 1 January 2023; § 23 EStG makes long-held crypto tax-free on disposal',
  netherlands: 'Kansspelbelasting 37.8% on winnings from 1 Jan 2026: applies to licensed AND offshore play',
  norway: 'Norsk Tipping state monopoly; Lottstift bank-blocks offshore payments by MCC 7995 + named list',
  sweden: 'One-bonus rule under Spellag 14 kap. § 9; online casino channelisation just 72–82% in 2024',
  japan: 'Online casino is not legal under current law; crypto gains taxed up to ~55% combined',
}

// Regulator + on-ramp summary table data. Same anchoring rule as teasers.
const countryRows: Record<string, { regulator: string; onramp: string }> = {
  canada: {
    regulator: 'Provincial (Ontario AGCO; lighter elsewhere)',
    onramp: 'Newton / Bitbuy / Wealthsimple → on-chain',
  },
  australia: {
    regulator: 'ACMA (DNS-blocks offshore sites)',
    onramp: 'CoinSpot / Independent Reserve / Swyftx → on-chain',
  },
  'new-zealand': {
    regulator: 'Department of Internal Affairs',
    onramp: 'Easy Crypto / Independent Reserve → on-chain (NZD bank transfers frequently blocked)',
  },
  ireland: {
    regulator: 'GRAI (Gambling Regulation Act 2024)',
    onramp: 'Kraken via Payward Ireland (CBI/CASP) / Coinbase / Bitstamp',
  },
  germany: {
    regulator: 'GGL (federal authority since 2023)',
    onramp: 'Bitpanda / Coinbase / Kraken (BaFin), USDT TRC-20 dominant route',
  },
  netherlands: {
    regulator: 'Kansspelautoriteit (KSA)',
    onramp: 'Bitvavo (MiCA-AFM Jun 2025) / Coinbase / Kraken, Dutch banks routinely block offshore',
  },
  norway: {
    regulator: 'Lottstift (Norsk Tipping monopoly)',
    onramp: 'Firi (Finanstilsynet-VASP) / NBX / Kraken → on-chain (Payment Act blocks NOK rails)',
  },
  sweden: {
    regulator: 'Spelinspektionen (Spellag 2018:1138)',
    onramp: 'Safello (first Swedish MiCA-CASP, Oct 2025) / BTCX / Trijo / Coinbase / Kraken',
  },
  japan: {
    regulator: 'JCRC (physical resorts only, online not legal)',
    onramp: 'bitFlyer / Coincheck / Bitbank (FSA-registered)',
  },
}

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Crypto Casinos by Country',
  description:
    'Country-by-country breakdown of crypto casino access: regulators, on-ramp exchanges, banking attitude and tax treatment.',
  url: 'https://www.playmagpie.com/country',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: COUNTRY_LIST.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.playmagpie.com/country/${c.slug}`,
      name: `Crypto Casinos in ${c.name}`,
    })),
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casinos by Country', item: 'https://www.playmagpie.com/country' },
  ],
}

export default function CountryHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Crypto Casinos by Country</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Crypto Casinos by Country 2026</h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Country choice changes which casinos accept you, how you fund them, and whether your local banking system
            will even let the transfer through. Here&apos;s the breakdown across the 9 markets we cover.
          </p>
        </div>

        <section className="mb-12 prose prose-invert max-w-none space-y-4">
          <p className="text-[#888888] leading-relaxed">
            Tier 1 English markets (Canada, Australia, New Zealand, Ireland) sit in a permissive-but-shifting
            regulatory framing where offshore play remains accessible while domestic banking attitudes vary. The EU
            markets we cover (Germany, Netherlands, Sweden, Norway) operate stricter licensed regimes where licensee
            restrictions (deposit caps, single-bonus rules, kansspelbelasting at source) push significant volume offshore
            even with full local licences available. Japan is the outlier: offshore online casino play is not legal under
            current law, and Japan&apos;s tax treatment of crypto gains adds material friction beyond the casino side.
          </p>
          <p className="text-[#888888] leading-relaxed">
            The funding pattern that recurs across markets is consistent: acquire crypto through a locally-regulated
            exchange (Bitvavo in NL, Bitpanda in DE, Safello or BTCX in SE, Firi in NO, Easy Crypto in NZ, CoinSpot in AU,
            Kraken via Payward Ireland in IE, Newton or Bitbuy in CA), then send on-chain to the casino. USDT on TRC-20
            is the most common deposit choice across all markets. It removes local-currency conversion drift and clears
            in under a minute. Stablecoins matter more in markets where the local currency carries higher volatility
            against USD.
          </p>
          <p className="text-[#888888] leading-relaxed">
            Where crypto delivers most operational value is in markets with active payment-side enforcement. Norway is
            the sharpest example: under the Lottery Act and Payment Act framework, Lottstift maintains a published list
            of offshore gambling operators whose accounts Norwegian banks are required to block. A Visa or SEPA payment
            typically fails before it reaches the operator. Australian banks routinely block AUD transfers to offshore
            gambling under post-2024 rules. Dutch banks similarly. On-chain crypto is wallet-to-wallet on a public ledger
            with no acquiring bank in the path. The legal framing of offshore play hasn&apos;t changed in most markets;
            the operational route to fund it has.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Country Snapshot</h2>
          <p className="text-[#888888] text-sm mb-6">
            Regulator and on-ramp summary across all 9 markets. Tap any country for the full intro covering tax position,
            banking behaviour and casino restrictions.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Country</th>
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Regulator</th>
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold hidden md:table-cell">On-ramp + funding route</th>
                </tr>
              </thead>
              <tbody>
                {COUNTRY_LIST.map((country, i) => {
                  const row = countryRows[country.slug]
                  return (
                    <tr
                      key={country.slug}
                      className={`border-b border-[#222222] last:border-0 hover:bg-[#1a1a1a]/60 transition-colors ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}
                    >
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/country/${country.slug}`}
                          className="font-semibold text-[#f5f5f5] hover:text-[#7BB8D4] transition-colors"
                        >
                          {country.name}
                        </Link>
                        <span className="ml-2 text-xs text-[#555555]">{country.currency}</span>
                      </td>
                      <td className="px-4 py-3.5 text-[#888888] text-xs leading-relaxed">{row?.regulator ?? 'Not listed'}</td>
                      <td className="px-4 py-3.5 text-[#888888] text-xs leading-relaxed hidden md:table-cell">{row?.onramp ?? 'Not listed'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Choose Your Country</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COUNTRY_LIST.map((country) => (
              <Link
                key={country.slug}
                href={`/country/${country.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-lg">
                    {country.name}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#7BB8D4]/10 text-[#7BB8D4] border border-[#7BB8D4]/20">
                    {country.currency}
                  </span>
                </div>
                <p className="text-[#888888] text-sm leading-relaxed">
                  {countryTeasers[country.slug] ?? `View crypto casinos for ${country.name} players`}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
