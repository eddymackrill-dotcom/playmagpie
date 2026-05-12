import type { Metadata } from 'next'
import { guides } from '@/lib/guides'
import Link from 'next/link'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://playmagpie.com/guides' },
  ],
}

export const metadata: Metadata = {
  title: 'Crypto Casino Guides 2026 — Withdrawals, Bonuses & Strategy',
  description:
    'In-depth guides on crypto casino withdrawals, bonuses, Bitcoin vs USDT, payout methods and strategy. No fluff — everything you need to play smarter in 2026.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    url: '/guides',
    title: 'Crypto Casino Guides 2026 — Withdrawals, Bonuses & Strategy',
    description:
      'In-depth guides on crypto casino withdrawals, bonuses, Bitcoin vs USDT, payout methods and strategy for 2026.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casino Guides 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casino Guides 2026 — Withdrawals, Bonuses & Strategy',
    description: 'Practical guides on crypto casino withdrawals, bonuses, Bitcoin vs USDT and payout speed.',
    images: ['/og-image.png'],
  },
}

export default function GuidesPage() {
  const categories = [...new Set(guides.map((g) => g.category))]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Guides</span>
        </nav>
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Crypto Casino Guides</h1>
          <p className="text-[#888888] text-lg max-w-xl leading-relaxed">
            No fluff, no filler. Practical guides on how crypto casinos work — withdrawals, bonuses,
            the best cryptos for gambling, and how to read the fine print.
          </p>
        </div>

        {categories.map((cat) => (
          <section key={cat} className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-white rounded-full" />
              {cat}
            </h2>
            <div className="space-y-3">
              {guides
                .filter((g) => g.category === cat)
                .map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/20 rounded-2xl p-5 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-[#7BB8D4] transition-colors mb-1">
                          {guide.title}
                        </h3>
                        <p className="text-[#888888] text-sm leading-relaxed">{guide.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="text-xs text-[#555555]">{guide.readTime}</span>
                        <div className="mt-2">
                          <svg
                            className="w-5 h-5 text-[#555555] group-hover:text-white transition-colors ml-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
