import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPLIANCE_ENTRIES } from '@/lib/compliance-feed'

// Compliance news feed hub (built 2026-09-05, owner decision same date).
// ONE URL, dated additive entries, jurisdictions mixed; deep analysis
// lives on the trackers and legal pages this hub indexes, and entries
// link there rather than duplicating it (scope split, binding). The
// machine-readable mirror is /compliance/feed.xml. Expectation stated in
// the 2026-09-05 decisions entry: this asset is built for citations,
// authority and the trade-press PR lane, not for traffic.

const TITLE = 'Gambling Compliance News: Dated, Sourced, Jurisdiction by Jurisdiction'
const DESCRIPTION =
  'A dated feed of gambling regulatory developments: US state actions, Australia, Canada, Italy and wherever enforcement moves next. Every entry sourced.'

export const metadata: Metadata = {
  title: 'Gambling Compliance News Feed: US, Australia, Canada, Italy',
  description: DESCRIPTION,
  alternates: {
    canonical: '/compliance',
    types: { 'application/rss+xml': '/compliance/feed.xml' },
  },
  openGraph: {
    url: '/compliance',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og-image.png'] },
}

const SURFACES = [
  { label: 'Prediction markets legality tracker', href: '/tracker/prediction-markets-legality', teaser: 'The state-vs-CFTC litigation scorecard, updated as rulings land' },
  { label: 'US sweepstakes casinos by state', href: '/tracker/us-sweepstakes-casinos-by-state', teaser: 'The ban-wave matrix, every row dated and sourced' },
  { label: 'Australia: is crypto gambling legal?', href: '/country/australia/legal', teaser: 'The IGA analysis and the Gambling Reform Bill, entry by entry' },
  { label: 'Canada: is crypto gambling legal?', href: '/country/canada/legal', teaser: 'The Criminal Code position plus the Alberta open-market launch' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Compliance News', item: 'https://www.playmagpie.com/compliance' },
  ],
}

export default function CompliancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Compliance News</span>
        </nav>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Dated entries · every claim sourced</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">{TITLE}</h1>
          <p className="text-[#888888] text-lg leading-relaxed">
            Regulatory developments in online gambling, logged as they are verified: state enforcement waves,
            licensing overhauls, court deadlines and the laws behind them. Short entries here; the deep analysis
            lives on the trackers and legality pages each entry links to. Corrections arrive as new dated
            entries, never silent rewrites.{' '}
            <a href="/compliance/feed.xml" className="text-[#7BB8D4] hover:underline">Subscribe via RSS</a>
            {' '}if you follow this space professionally.
          </p>
        </div>

        {/* The feed */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">The feed</h2>
          <div className="space-y-6">
            {COMPLIANCE_ENTRIES.map((e) => (
              <article key={e.date + e.title} className="border-l-2 border-[#7BB8D4]/40 pl-4">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <span className="text-[#7BB8D4] text-xs font-semibold">{e.date}</span>
                  <span className="text-[#555555] text-xs uppercase tracking-wider">{e.jurisdiction}</span>
                </div>
                <h3 className="text-[#f5f5f5] font-semibold text-base mb-2">{e.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed mb-2">{e.summary}</p>
                <div className="flex items-center gap-4 flex-wrap text-xs">
                  {e.home && (
                    <Link href={e.home.href} className="text-[#7BB8D4] hover:underline font-medium">
                      Full analysis: {e.home.label}
                    </Link>
                  )}
                  {e.sources.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[#555555] hover:text-[#7BB8D4] hover:underline">
                      {s.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* The deep surfaces */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">The living surfaces behind this feed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SURFACES.map((s) => (
              <Link key={s.href} href={s.href} className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group block">
                <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors mb-1 text-sm">{s.label}</div>
                <div className="text-[#888888] text-xs leading-relaxed">{s.teaser}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pt-8 border-t border-[#222222]">
          <p className="text-[#555555] text-xs leading-relaxed">
            Watched jurisdictions currently include the United States, Australia, Canada and Italy, and the
            feed follows enforcement wherever it moves. We have no commercial relationship with any platform
            or regulator named in feed entries; legal-status tracking is not a recommendation. Method and
            sourcing standards are on our <Link href="/methodology" className="text-[#7BB8D4] hover:underline">methodology page</Link>.
          </p>
        </section>
      </div>
    </>
  )
}
