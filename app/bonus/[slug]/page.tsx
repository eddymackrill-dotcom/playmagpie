import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BONUS_TYPES } from '@/lib/programmatic'
import { BONUS_CONTENT, getCasinosForBonus, type BonusSlug } from '@/lib/bonus-content'
import CasinoCard from '@/components/CasinoCard'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'

// Per-bonus-type strip configuration. Cards tailored to each bonus's
// player intent. Welcome/reload/no-deposit cards lead with the
// headline offer; cashback/vip cards lead with the recurring-value
// mechanism; high-roller cards lead with VIP posture + withdrawal
// limits.
const STRIP_BY_BONUS: Record<string, CTAStripCard[]> = {
  'welcome-bonus': [
    { slug: 'bitstarz', facts: [{ label: 'Welcome', value: '5 BTC + 180 spins (4 deposits)' }, { label: 'Wagering', value: '40x bonus; no cashier fees per live terms' }, { label: 'Withdrawal', value: 'Under 10 minutes' }] },
    { slug: 'bc-game', facts: [{ label: 'Welcome', value: '220% Deposit Rakeback, 4 monthly stages' }, { label: 'Wagering', value: 'Locked balance unlocks as you wager' }, { label: 'Withdrawal', value: 'Instant to 10 minutes' }] },
    { slug: '7bit-casino', facts: [{ label: 'Welcome', value: '325% up to €5,400 + 250 spins (4 deposits)' }, { label: 'Wagering', value: '40-45x range' }, { label: 'Withdrawal', value: 'Instant to 10 minutes' }] },
  ],
  'no-deposit-bonus': [
    { slug: 'bitstarz', facts: [{ label: 'No-deposit', value: 'Available regionally: check live promos' }, { label: 'Max cashout', value: '€100 cap (T&C §1.1)' }, { label: 'Wagering', value: '40x bonus sum' }] },
    { slug: 'bc-game', facts: [{ label: 'No-deposit', value: 'Affiliate-code promos at signup' }, { label: 'Max cashout', value: 'Per-promo cap' }, { label: 'Wagering', value: 'Per-promo terms' }] },
    { slug: '7bit-casino', facts: [{ label: 'No-deposit', value: 'Email promo codes for verified players' }, { label: 'Max cashout', value: 'Per-promo cap' }, { label: 'Wagering', value: '40-45x range' }] },
  ],
  'reload-bonus': [
    { slug: 'bitstarz', facts: [{ label: 'Reload', value: 'Monday Reload: weekly cadence' }, { label: 'Wagering', value: '40x bonus' }, { label: 'Withdrawal', value: 'Under 10 minutes' }] },
    { slug: 'bc-game', facts: [{ label: 'Reload', value: 'Daily reload tied to VIP tier' }, { label: 'Wagering', value: 'Tier-dependent' }, { label: 'Withdrawal', value: 'Instant to 10 minutes' }] },
    { slug: '7bit-casino', facts: [{ label: 'Reload', value: '25% Monday Reload + 50 free spins' }, { label: 'Wagering', value: '40-45x range' }, { label: 'Withdrawal', value: 'Instant to 10 minutes' }] },
  ],
  cashback: [
    { slug: 'bitstarz', facts: [{ label: 'Cashback', value: '15-25% at top VIP tiers' }, { label: 'Cadence', value: 'Monthly' }, { label: 'Wagering', value: 'No wagering at top tiers' }] },
    { slug: 'bc-game', facts: [{ label: 'Cashback', value: 'Built into Deposit Rakeback Welcome + ongoing rakeback' }, { label: 'Cadence', value: 'Real-time accrual' }, { label: 'Wagering', value: 'None on rakeback' }] },
    { slug: '7bit-casino', facts: [{ label: 'Cashback', value: 'Up to 20% weekly net-loss cashback' }, { label: 'Cadence', value: 'Weekly' }, { label: 'Wagering', value: 'Per-tier terms' }] },
  ],
  'vip-bonus': [
    { slug: 'bitstarz', facts: [{ label: 'VIP', value: 'Invite-only: dedicated host' }, { label: 'Cashback', value: '15-25% at top tiers' }, { label: 'Withdrawal', value: 'Under 10 minutes' }] },
    { slug: 'bc-game', facts: [{ label: 'VIP', value: 'XP-tier progression-based' }, { label: 'Rakeback', value: 'Real-time accrual on every wager' }, { label: 'Withdrawal', value: 'Instant to 10 minutes' }] },
    { slug: '7bit-casino', facts: [{ label: 'VIP', value: 'Tiered cashback + personal manager' }, { label: 'Cashback', value: 'Up to 20% weekly' }, { label: 'Withdrawal', value: 'Instant to 10 minutes' }] },
  ],
  'high-roller-bonus': [
    { slug: 'bitstarz', facts: [{ label: 'High-roller', value: 'Invite-only VIP: dedicated host' }, { label: 'Welcome', value: '5 BTC headline + 180 spins' }, { label: 'Withdrawal', value: 'Under 10 minutes' }] },
    { slug: 'bc-game', facts: [{ label: 'High-roller', value: 'Top XP tiers + per-account negotiation' }, { label: 'Welcome', value: '220% Deposit Rakeback, scales with deposit' }, { label: 'Withdrawal', value: 'Instant to 10 minutes' }] },
    { slug: 'cloudbet', facts: [{ label: 'High-roller', value: 'No withdrawal limits once verified: the load-bearing differentiator' }, { label: 'Welcome', value: '$2,500 package: cash rewards, no wagering' }, { label: 'Withdrawal', value: 'Instant for most; no cap when verified' }] },
  ],
}

// Titles, H1s, metas and per-slug boilerplate live in lib/bonus-content.ts
// (`editorial`, Batch 2a data layer). The route reads them with NO fallback:
// a missing entry is a compile error (Record over the slug union) and a
// missing field throws below rather than re-templating.

// Contextual cross-links rendered after the intro. The high-roller entry
// hands the operator-ranking query to /high-roller-casinos and carries the
// only contextual prose inbound link to /game/live-dealer (crawl-discovery
// rule: the link ships from a page modified in the same batch). The
// welcome-bonus entry is the Batch 2a carrier link for /bonus/free-spins,
// which was "URL is unknown to Google" (never crawled) at the 2026-08-08
// pre-ship snapshot: same crawl-discovery rule, host page modified in the
// same commit.
const CROSS_LINKS_BY_BONUS: Record<string, ReactNode> = {
  'welcome-bonus': (
    <p className="text-[#888888] leading-relaxed mt-4">
      The spin side of those same packages runs on different math: headline counts convert to cash
      through spin value, eligible games and win caps, and the clause-level figures the three
      spin-carrying operators actually publish are compared in our{' '}
      <Link href="/bonus/free-spins" className="text-[#7BB8D4] hover:underline">
        verified free spins terms table
      </Link>
      .
    </p>
  ),
  'high-roller-bonus': (
    <p className="text-[#888888] leading-relaxed mt-4">
      This page covers the bonus structures only. For the operator ranking itself (withdrawal caps,
      bet ceilings and VIP treatment compared side by side) see our guide to the{' '}
      <Link href="/high-roller-casinos" className="text-[#7BB8D4] hover:underline">
        best high roller crypto casinos
      </Link>
      . And if your volume goes through tables rather than slots, the Evolution VIP rooms taking
      $10,000-$100,000 a hand are compared on the{' '}
      <Link href="/game#live-dealer" className="text-[#7BB8D4] hover:underline">
        live dealer casinos
      </Link>{' '}
      page.
    </p>
  ),
}

// 'free-spins' is served by app/bonus/free-spins/page.tsx (static segment takes
// precedence over dynamic [slug]); excluded here to avoid build conflict.
const STATIC_SEGMENT_SLUGS = new Set(['free-spins'])

export async function generateStaticParams() {
  return BONUS_TYPES.filter((b) => !STATIC_SEGMENT_SLUGS.has(b.slug)).map((b) => ({ slug: b.slug }))
}

export async function generateMetadata(
  props: PageProps<'/bonus/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const bonus = BONUS_TYPES.find((b) => b.slug === slug)
  if (!bonus) return {}
  const editorial = BONUS_CONTENT[bonus.slug].editorial
  if (!editorial) throw new Error(`bonus/[slug]: no editorial entry for "${slug}" in lib/bonus-content.ts`)
  const title = editorial.title
  const description = editorial.metaDescription
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

  const content = BONUS_CONTENT[slug as BonusSlug]
  if (!content) notFound()
  const editorial = content.editorial
  if (!editorial) throw new Error(`bonus/[slug]: no editorial entry for "${slug}" in lib/bonus-content.ts`)
  const matching = getCasinosForBonus(slug as BonusSlug)

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
            {editorial.h1}
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            {editorial.subHead}
          </p>
        </div>

        {STRIP_BY_BONUS[slug] && (
          <CasinoCTAStrip
            framing={editorial.stripFraming}
            cards={STRIP_BY_BONUS[slug]}
          />
        )}

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">{editorial.howItWorksHeading}</h2>
          <p className="text-[#888888] leading-relaxed whitespace-pre-line">{content.intro}</p>
          {CROSS_LINKS_BY_BONUS[slug]}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            {matching.length} {matching.length === 1 ? 'Casino' : 'Casinos'} {editorial.rankedHeading}
          </h2>
          <p className="text-[#888888] text-sm mb-6">
            {editorial.termsNote}
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
