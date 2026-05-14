import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BONUS_TYPES } from '@/lib/programmatic'
import { BONUS_CONTENT, getCasinosForBonus } from '@/lib/bonus-content'
import CasinoCard from '@/components/CasinoCard'

export async function generateStaticParams() {
  return BONUS_TYPES.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata(
  props: PageProps<'/bonus/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const bonus = BONUS_TYPES.find((b) => b.slug === slug)
  if (!bonus) return {}
  const title = `Best ${bonus.name} Crypto Casinos 2026`
  const description = `Compare crypto casinos offering the best ${bonus.name.toLowerCase()} structures. Real terms, wagering requirements and cashout caps.`
  return {
    title,
    description,
    alternates: { canonical: `/bonus/${bonus.slug}` },
    openGraph: {
      url: `/bonus/${bonus.slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  }
}

export default async function BonusPage(props: PageProps<'/bonus/[slug]'>) {
  const { slug } = await props.params
  const bonus = BONUS_TYPES.find((b) => b.slug === slug)
  if (!bonus) notFound()

  const content = BONUS_CONTENT[slug]
  if (!content) notFound()
  const matching = getCasinosForBonus(slug)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: 'Bonuses', item: 'https://www.playmagpie.com/bonus' },
      { '@type': 'ListItem', position: 3, name: bonus.name, item: `https://www.playmagpie.com/bonus/${bonus.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

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
          <Link href="/bonus" className="hover:text-white transition-colors">Bonuses</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">{bonus.name}</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">{bonus.name}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best {bonus.name} Crypto Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Real terms — wagering multipliers, max cashout caps and game contributions decoded for every offer.
          </p>
        </div>

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">How the {bonus.name} works in 2026</h2>
          <p className="text-[#888888] leading-relaxed whitespace-pre-line">{content.intro}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            {matching.length} {matching.length === 1 ? 'Casino' : 'Casinos'} Ranked for {bonus.name}
          </h2>
          <p className="text-[#888888] text-sm mb-6">
            Each platform below carries a {bonus.name.toLowerCase()} structure worth examining — terms verified independently.
          </p>
          {matching.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {matching.map((casino, i) => (
                <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
              ))}
            </div>
          ) : (
            <p className="text-[#888888]">No casinos in our index currently feature a stand-out {bonus.name.toLowerCase()}.</p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/20 rounded-2xl p-5 transition-all group"
              >
                <summary className="font-semibold text-[#f5f5f5] cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-[#888888] group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-[#888888] text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link
            href="/bonus"
            className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all bonuses
          </Link>
        </div>
      </div>
    </>
  )
}
