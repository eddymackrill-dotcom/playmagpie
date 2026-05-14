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

const countryContext: Record<string, string> = {
  canada: 'Canadian players have one of the most crypto-friendly regulatory environments in the developed world. Cryptocurrency is legal to buy, hold and use, and the Canada Revenue Agency treats it as a commodity for tax purposes. Crypto casinos offer Canadian players a significant advantage over domestic licensed operators: faster withdrawals, larger welcome bonuses, and access to a much wider game library. Most Canadian players acquire crypto through regulated exchanges like Newton, Bitbuy or Wealthsimple, then deposit directly to their chosen casino in BTC, ETH or USDT — bypassing the slow CAD bank-transfer rails entirely. CAD-denominated deposits are rare at crypto casinos, but stablecoins like USDT remove that friction completely. As always, players should check current provincial regulations before playing — Ontario operates its own licensed framework, while other provinces are less prescriptive.',
  australia: 'Australian players sit in a uniquely complicated regulatory position: online casinos are restricted under the Interactive Gambling Act 2001, but the legislation targets operators rather than players, leaving Australians free to use offshore crypto casinos. Crypto deposits avoid the AUD banking restrictions that frequently block deposits to gambling sites, making cryptocurrency the most practical funding method available. Most Australian players acquire crypto through CoinSpot, Independent Reserve or Swyftx, then deposit in BTC or USDT. Withdrawals in crypto also bypass slow AUD wire processing and bank-side gambling holds. Several of the top crypto casinos officially restrict AU players in their terms — always verify your chosen platform accepts Australian accounts before depositing, and check current local regulations.',
  'new-zealand': 'New Zealand players benefit from a relatively permissive environment for offshore online gambling. Crypto casinos sidestep the slow NZD international wire process entirely — depositing in BTC, ETH or USDT typically clears within minutes rather than days. Most Kiwi players acquire crypto through Easy Crypto, Independent Reserve or Binance, then transfer directly to their casino wallet. NZD-denominated deposits are uncommon at crypto-first casinos, but stablecoin deposits eliminate currency conversion concerns and lock in your bankroll value at deposit time. The Department of Internal Affairs regulates domestic gambling but does not prohibit individual players from using offshore sites. Check current local regulations before playing and confirm your chosen platform accepts NZ accounts.',
  ireland: 'Irish players enjoy one of the more relaxed regulatory frameworks in Europe for offshore online gambling. Crypto casinos are accessible without restriction, and EUR is the local currency — making deposits and withdrawals straightforward when converted to crypto. Most Irish players acquire BTC, ETH or USDT through Coinbase, Kraken or Bitstamp, then deposit directly. Crypto bypasses the slower SEPA wire process for EUR-denominated transactions and avoids the rising number of Irish bank holds on gambling-related transfers. Stablecoin deposits in USDT or USDC are particularly popular for predictable bankroll management. Check current Irish gambling regulations before playing and verify your chosen platform accepts Irish accounts — the upcoming Gambling Regulation Bill may change the landscape further.',
  germany: 'German players face one of Europe’s more restrictive online gambling regulatory regimes following the 2021 Interstate Treaty on Gambling. Licensed domestic operators carry strict deposit caps and stake limits, which is why many German players turn to offshore crypto casinos for fewer restrictions and larger welcome bonuses. EUR is the local currency, and most players acquire crypto through Bitpanda, Coinbase or Kraken before depositing in BTC, ETH or USDT. Crypto sidesteps the SCHUFA-flagged bank transfers that German banks increasingly block for gambling. USDT on TRC-20 is the most popular deposit method for German players seeking stable EUR-equivalent value with fast withdrawals. Always check current German gambling regulations before playing — the legal status of using offshore operators continues to evolve.',
  netherlands: 'Dutch players operate under the Kansspelautoriteit (KSA) regime introduced in 2021, which licenses domestic operators tightly. Many Dutch players use offshore crypto casinos for larger bonuses, no deposit caps, and faster withdrawals. EUR is the local currency, and most players acquire crypto through Bitvavo, Coinbase or Kraken. Note that several top crypto casinos officially restrict NL accounts in their terms — always check eligibility before signing up. Stablecoin deposits in USDT or USDC eliminate currency conversion friction and provide predictable EUR-equivalent bankrolls. Bank transfers to offshore gambling sites are frequently blocked by Dutch banks, so crypto is often the only practical funding route. Check current Dutch gambling regulations before playing.',
  norway: 'Norwegian players face one of Europe’s strictest gambling monopolies — Norsk Tipping holds the domestic licence, leaving offshore crypto casinos as the main alternative for players who want broader game selection and competitive bonuses. NOK bank transfers to gambling sites are routinely blocked by Norwegian banks under the Payment Act, making cryptocurrency the most practical funding method. Most Norwegian players acquire BTC, ETH or USDT through Firi, NBX or Kraken, then deposit directly. Stablecoin deposits remove NOK conversion overhead and keep your bankroll value predictable in dollar terms. Always check current Norwegian gambling regulations before playing and verify your chosen platform accepts Norwegian accounts.',
  japan: 'Japanese players operate in one of Asia’s more complex gambling regulatory environments — most forms of online casino play exist in a legal grey zone. Crypto casinos have nonetheless seen growing adoption among Japanese players who value the privacy and speed of blockchain transactions. JPY is the local currency, and most players acquire crypto through bitFlyer, Coincheck or Bitbank, then deposit in BTC, ETH or USDT. Crypto sidesteps the JPY banking restrictions that block gambling-related card payments and wires. Stablecoin deposits in USDT are particularly common for predictable bankroll value during volatile JPY periods. Always check current Japanese regulations before playing and confirm your chosen platform accepts Japanese accounts.',
}

export default async function CountryPage(props: PageProps<'/country/[slug]'>) {
  const { slug } = await props.params
  const country = COUNTRY_LIST.find((c) => c.slug === slug)
  if (!country) notFound()

  const content = countryContext[slug] ?? ''

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
          <p className="text-[#888888] leading-relaxed">{content}</p>
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
