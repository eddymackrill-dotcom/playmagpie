import type { Metadata } from 'next'
import Link from 'next/link'
import { COUNTRY_LIST } from '@/lib/programmatic'

export const metadata: Metadata = {
  title: 'Crypto Casinos by Country — PlayMagpie',
  description:
    'Find the best crypto casinos for your country. Compare casinos suited to players in Canada, Australia, Germany and more.',
  alternates: { canonical: '/country' },
  openGraph: {
    url: '/country',
    title: 'Crypto Casinos by Country — PlayMagpie',
    description:
      'Find the best crypto casinos for your country. Compare casinos suited to players in Canada, Australia, Germany and more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casinos by Country' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casinos by Country — PlayMagpie',
    description:
      'Find the best crypto casinos for your country. Compare casinos suited to players in Canada, Australia, Germany and more.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casinos by Country', item: 'https://playmagpie.com/country' },
  ],
}

export default function CountryHubPage() {
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
          <span className="text-[#f5f5f5]">Crypto Casinos by Country</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Crypto Casinos by Country</h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Local regulation, banking restrictions and accepted account regions vary significantly between
            countries — your location changes what platforms you can actually use.
          </p>
        </div>

        <section className="mb-10 prose prose-invert max-w-none">
          <p className="text-[#888888] leading-relaxed">
            Choosing a crypto casino based on your country matters more than most players realise. Some operators
            officially restrict accounts from specific regions, while domestic banking systems frequently block
            transfers to gambling sites — making cryptocurrency the most reliable funding method. Local currency
            conversion overhead, available exchange on-ramps and prevailing player payment preferences all shift
            from one country to another. Browse by your country below to see which casinos accept you, which
            cryptos are most practical for local players, and how the regulatory landscape currently looks. Every
            ranking is independent — no paid placements.
          </p>
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
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-lg">
                    {country.name}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#7BB8D4]/10 text-[#7BB8D4] border border-[#7BB8D4]/20">
                    {country.currency}
                  </span>
                </div>
                <div className="mt-3 text-xs text-[#555555] group-hover:text-[#7BB8D4] transition-colors">
                  View {country.name} casinos →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
