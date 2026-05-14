import type { Metadata } from 'next'
import Link from 'next/link'
import { BONUS_TYPES } from '@/lib/programmatic'

export const metadata: Metadata = {
  title: 'Crypto Casino Bonuses 2026 — Types Explained',
  description:
    'Compare crypto casino bonus types. Welcome bonuses, cashback, free spins, VIP rewards and more — find the bonuses that work.',
  alternates: { canonical: '/bonus' },
  openGraph: {
    url: '/bonus',
    title: 'Crypto Casino Bonuses 2026 — Types Explained',
    description:
      'Compare crypto casino bonus types. Welcome bonuses, cashback, free spins, VIP rewards and more — find the bonuses that work.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casino Bonus Types' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casino Bonuses 2026 — Types Explained',
    description:
      'Compare crypto casino bonus types. Welcome bonuses, cashback, free spins, VIP rewards and more — find the bonuses that work.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Bonuses', item: 'https://playmagpie.com/bonus' },
  ],
}

const bonusSubtitles: Record<string, string> = {
  'welcome-bonus': 'Up to 500% match, 35x-50x wagering — the headline acquisition offer.',
  'no-deposit-bonus': '$10-$50 free credit or 20-50 spins with the strictest terms in the industry.',
  'reload-bonus': '25%-75% match on repeat deposits with friendlier playthrough than welcome offers.',
  cashback: '5%-25% of net losses returned, usually with zero wagering attached.',
  'free-spins': '100-250 spins at $0.10-$0.20 each — cap math matters more than count.',
  'vip-bonus': 'Tier-based rakeback, cash drops and exclusive bonuses for sustained-volume play.',
  'high-roller-bonus': '$500+ qualifying deposits with negotiable terms and expedited withdrawals.',
}

export default function BonusHubPage() {
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
          <span className="text-[#f5f5f5]">Bonuses</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Crypto Casino Bonus Types</h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Headline numbers rarely tell the real story. Wagering multipliers, max cashout caps and game-contribution
            rates determine whether a bonus is genuinely valuable or just marketing.
          </p>
        </div>

        <section className="mb-10 prose prose-invert max-w-none">
          <p className="text-[#888888] leading-relaxed">
            Crypto casino bonuses come in seven distinct structural categories, each with its own economics and
            its own quirks. A 500% welcome match looks bigger than a 10% no-wagering cashback, but for the
            majority of player profiles the cashback returns more actual cash. A 250-free-spin headline looks
            generous until you discover the $50 max cashout cap. A reload bonus with 25x wagering is more useful
            than a welcome bonus with 50x. Below is every bonus type you will encounter at modern crypto
            casinos, with the real-terms summary up front and a full breakdown on each page — including which
            operators run the best version of that bonus, what wagering math actually applies, and the five
            questions that matter most before claiming.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Choose a Bonus Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BONUS_TYPES.map((bonus) => (
              <Link
                key={bonus.slug}
                href={`/bonus/${bonus.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-5 transition-all group"
              >
                <h3 className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-lg mb-2">
                  {bonus.name}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  {bonusSubtitles[bonus.slug] ?? `Compare casinos offering ${bonus.name.toLowerCase()} structures.`}
                </p>
                <div className="mt-3 text-xs text-[#555555] group-hover:text-[#7BB8D4] transition-colors">
                  View {bonus.name} casinos →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
