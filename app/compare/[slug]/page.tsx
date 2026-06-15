import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import { compareContent } from '@/lib/compare-content'
import CTAButton from '@/components/CTAButton'
import CasinoLogo from '@/components/CasinoLogo'

// Comparison allowlist — only these pairs are pre-rendered and indexed.
// Non-allowlisted pairs 404 via dynamicParams = false (Helpful Content fix:
// template-cannibalisation across 42 generated pairs caused indexation failure).
const COMPARE_ALLOWLIST = [
  'bitstarz-vs-bc-game',
  'cloudbet-vs-bitstarz',
  '7bit-casino-vs-bitstarz',
  'bc-game-vs-shuffle',
  'mirax-casino-vs-bitstarz',
]

export const dynamicParams = false

export async function generateStaticParams() {
  return COMPARE_ALLOWLIST.map((slug) => ({ slug }))
}

export async function generateMetadata(props: PageProps<'/compare/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const vsIdx = slug.indexOf('-vs-')
  if (vsIdx === -1) return {}
  const c1 = getCasinoBySlug(slug.slice(0, vsIdx))
  const c2 = getCasinoBySlug(slug.slice(vsIdx + 4))
  if (!c1 || !c2) return {}
  const title = `${c1.name} vs ${c2.name} (2026): Which Is Better? | PlayMagpie`
  const description = `${c1.name} vs ${c2.name}: independent head-to-head comparison of withdrawal speed, bonus fairness, KYC policy, supported cryptos and trust scores. Find out which wins in 2026.`
  return {
    title,
    description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      url: `/compare/${slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${c1.name} vs ${c2.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

function cmp(a: number, b: number): 'a' | 'b' | 'tie' {
  if (a > b) return 'a'
  if (b > a) return 'b'
  return 'tie'
}

export default async function ComparePage(props: PageProps<'/compare/[slug]'>) {
  const { slug } = await props.params
  const vsIdx = slug.indexOf('-vs-')
  if (vsIdx === -1) notFound()

  const c1 = getCasinoBySlug(slug.slice(0, vsIdx))
  const c2 = getCasinoBySlug(slug.slice(vsIdx + 4))
  if (!c1 || !c2) notFound()

  const content = compareContent[slug]
  if (!content) notFound()

  const overallWin = cmp(c1.trustScore, c2.trustScore)
  const withdrawalWin = cmp(c1.withdrawalScore, c2.withdrawalScore)
  const bonusWin = cmp(c1.bonusFairnessScore, c2.bonusFairnessScore)
  const kycWin = cmp(c1.kycScore, c2.kycScore)

  const cryptoWin = cmp(
    c1.acceptedCryptos.filter((s) => s !== '100+ more').length + (c1.acceptedCryptos.includes('100+ more') ? 100 : 0),
    c2.acceptedCryptos.filter((s) => s !== '100+ more').length + (c2.acceptedCryptos.includes('100+ more') ? 100 : 0),
  )

  const c1Cryptos = c1.acceptedCryptos.filter((s) => s !== '100+ more')
  const c2Cryptos = c2.acceptedCryptos.filter((s) => s !== '100+ more')
  const c1HasMore = c1.acceptedCryptos.includes('100+ more')
  const c2HasMore = c2.acceptedCryptos.includes('100+ more')

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${c1.name} vs ${c2.name}: Head-to-Head Comparison 2026`,
    description: `Independent comparison of ${c1.name} and ${c2.name} covering withdrawal speed, bonus fairness, KYC policy and trust score.`,
    url: `https://www.playmagpie.com/compare/${slug}`,
    publisher: { '@type': 'Organization', name: 'PlayMagpie', url: 'https://www.playmagpie.com' },
    dateModified: '2026-05-21',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare Casinos', item: 'https://www.playmagpie.com/compare' },
      { '@type': 'ListItem', position: 3, name: `${c1.name} vs ${c2.name}`, item: `https://www.playmagpie.com/compare/${slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const tableRows = [
    { label: 'Trust Score', a: `${c1.trustScore}/10`, b: `${c2.trustScore}/10`, win: overallWin },
    { label: 'Withdrawal Score', a: `${c1.withdrawalScore}/10`, b: `${c2.withdrawalScore}/10`, win: withdrawalWin },
    { label: 'Withdrawal Time', a: c1.withdrawalTime, b: c2.withdrawalTime, win: withdrawalWin },
    { label: 'Bonus Fairness Score', a: `${c1.bonusFairnessScore}/10`, b: `${c2.bonusFairnessScore}/10`, win: bonusWin },
    { label: 'KYC Level', a: c1.kycLevel, b: c2.kycLevel, win: kycWin },
    { label: 'KYC Score', a: `${c1.kycScore}/10`, b: `${c2.kycScore}/10`, win: kycWin },
    { label: 'Min Deposit', a: c1.minDeposit, b: c2.minDeposit, win: 'tie' as const },
    { label: 'Cryptos Accepted', a: `${c1Cryptos.length}${c1HasMore ? '+' : ''}`, b: `${c2Cryptos.length}${c2HasMore ? '+' : ''}`, win: cryptoWin },
    { label: 'VIP Program', a: c1.vipProgram ? 'Yes' : 'No', b: c2.vipProgram ? 'Yes' : 'No', win: cmp(c1.vipProgram ? 1 : 0, c2.vipProgram ? 1 : 0) },
    { label: 'Licence', a: c1.licence, b: c2.licence, win: 'tie' as const },
  ]

  const casinoBySlug = (s: string) => (s === c1.slug ? c1 : s === c2.slug ? c2 : null)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">{c1.name} vs {c2.name}</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <p className="text-[#7BB8D4] text-sm font-semibold uppercase tracking-wider mb-4">Head-to-Head Comparison · 2026</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f5f5f5] mb-3">
            {c1.name} <span className="text-[#333333] px-2">vs</span> {c2.name}
          </h1>
        </div>

        {/* Hero score cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {([{ c: c1, win: overallWin === 'a' }, { c: c2, win: overallWin === 'b' }] as const).map(({ c, win }) => (
            <div
              key={c.slug}
              className={`bg-[#111111] border rounded-2xl p-5 sm:p-6 text-center ${win ? 'border-[#7BB8D4]/40 shadow-[0_0_30px_rgba(123,184,212,0.07)]' : 'border-[#222222]'}`}
            >
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden">
                  <CasinoLogo src={c.logo} name={c.name} size={44} />
                </div>
              </div>
              <h2 className="font-bold text-[#f5f5f5] text-base sm:text-lg mb-1">{c.name}</h2>
              <div className={`text-4xl font-extrabold my-2 ${win ? 'text-[#7BB8D4]' : 'text-[#888888]'}`}>{c.trustScore}</div>
              <div className="text-[#555555] text-xs mb-4">Trust Score / 10</div>
              <CTAButton href={c.affiliateUrl} label="Play Now" variant="primary" size="sm" external />
            </div>
          ))}
        </div>

        {/* Hand-written intro */}
        <section className="mb-10">
          <p className="text-[#888888] leading-relaxed text-base">{content.intro}</p>
        </section>

        {/* Hand-written positioning paragraphs */}
        <section className="mb-12 space-y-4">
          {content.positioning.map((para, i) => (
            <p key={i} className="text-[#888888] leading-relaxed">{para}</p>
          ))}
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-5">Full Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3 text-[#888888] font-semibold">Metric</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#f5f5f5]">{c1.name}</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#f5f5f5]">{c2.name}</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={row.label} className={`border-b border-[#222222] last:border-0 ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}>
                    <td className="px-4 py-3.5 text-[#888888]">{row.label}</td>
                    <td className={`px-4 py-3.5 text-center text-xs sm:text-sm ${row.win === 'a' ? 'text-[#7BB8D4] font-semibold' : 'text-[#f5f5f5]'}`}>
                      {row.a}{row.win === 'a' && <span className="ml-1 opacity-70">✓</span>}
                    </td>
                    <td className={`px-4 py-3.5 text-center text-xs sm:text-sm ${row.win === 'b' ? 'text-[#7BB8D4] font-semibold' : 'text-[#f5f5f5]'}`}>
                      {row.b}{row.win === 'b' && <span className="ml-1 opacity-70">✓</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hand-written scenarios — when to pick each */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-5">Which one is right for you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.scenarios.map((scenario) => {
              const casino = casinoBySlug(scenario.casinoSlug)
              if (!casino) return null
              return (
                <div key={scenario.casinoSlug} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden flex-shrink-0">
                      <CasinoLogo src={casino.logo} name={casino.name} size={32} />
                    </div>
                    <h3 className="font-bold text-[#f5f5f5] text-lg">{scenario.label}</h3>
                  </div>
                  <ul className="space-y-2">
                    {scenario.conditions.map((cond, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#888888]">
                        <span className="text-[#7BB8D4] mt-0.5 flex-shrink-0">→</span>
                        <span className="leading-relaxed">{cond}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-[#222222]">
                    <CTAButton href={casino.affiliateUrl} label={`Visit ${casino.name}`} variant="primary" size="sm" external />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-5">Pros &amp; Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[c1, c2].map((c) => (
              <div key={c.slug} className="bg-[#111111] border border-[#222222] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden flex-shrink-0">
                    <CasinoLogo src={c.logo} name={c.name} size={24} />
                  </div>
                  <h3 className="font-bold text-[#f5f5f5]">{c.name}</h3>
                  <span className="ml-auto text-[#7BB8D4] text-sm font-bold">{c.trustScore}/10</span>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-semibold text-[#7BB8D4] uppercase tracking-wider mb-2">Pros</div>
                  <ul className="space-y-2">
                    {c.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-[#888888]">
                        <span className="text-[#7BB8D4] mt-0.5 flex-shrink-0">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#222222]">
                  <div className="text-xs font-semibold text-[#555555] uppercase tracking-wider mb-2">Cons</div>
                  <ul className="space-y-2">
                    {c.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-[#888888]">
                        <span className="text-[#444444] mt-0.5 flex-shrink-0">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hand-written verdict */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-5">Verdict</h2>
          <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6">
            <p className="text-[#888888] leading-relaxed">{content.verdict}</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-[#f5f5f5] mb-2">Frequently Asked Questions</h2>
          <p className="text-[#888888] text-sm mb-8">
            Common questions on choosing between {c1.name} and {c2.name} in 2026.
          </p>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <div key={faq.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{faq.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTAs */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {[c1, c2].map((c) => (
            <div key={c.slug} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden">
                  <CasinoLogo src={c.logo} name={c.name} size={32} />
                </div>
              </div>
              <div className="text-sm font-semibold text-[#f5f5f5] mb-1">{c.name}</div>
              <div className="text-[#7BB8D4] text-2xl font-extrabold mb-3">{c.trustScore}/10</div>
              <div className="flex flex-col gap-2">
                <CTAButton href={c.affiliateUrl} label={`Play at ${c.name}`} variant="primary" size="sm" external />
                <Link
                  href={`/reviews/${c.slug}`}
                  className="text-center text-sm text-[#888888] hover:text-[#f5f5f5] border border-[#222222] hover:border-[#333333] rounded-lg py-2 transition-all"
                >
                  Full Review
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
