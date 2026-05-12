import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { casinos, getCasinoBySlug } from '@/lib/casinos'
import ReviewSection from '@/components/ReviewSection'
import ScoreBadge from '@/components/ScoreBadge'
import CTAButton from '@/components/CTAButton'
import Link from 'next/link'

export async function generateStaticParams() {
  return casinos.map((c) => ({ slug: c.slug }))
}

const casinoMetaDescriptions: Record<string, string> = {
  bitstarz: 'BitStarz review 2026. Award-winning Bitcoin casino — 5 BTC + 200 free spins, 3,000+ games, under 10-min crypto withdrawals. Rated 9.2/10 by PlayMagpie.',
  'bc-game': 'BC.Game review 2026. No-KYC crypto casino — 100+ cryptocurrencies, instant withdrawals, 10,000+ games. Zero identity verification required. Rated 8.9/10.',
  cloudbet: 'Cloudbet review 2026. Trusted since 2013 — 5 BTC welcome bonus, no withdrawal limits, excellent sportsbook for crypto bettors. Rated 8.7/10 by PlayMagpie.',
  'mirax-casino': 'Mirax Casino review 2026. 325% bonus up to $3,250 + 250 free spins, 7,000+ games, fast crypto withdrawals in under 15 minutes. Rated 8.6/10.',
  '7bit-casino': '7Bit Casino review 2026. No-KYC Bitcoin casino since 2014 — instant withdrawals, 7,000+ games, weekly reload bonuses and VIP cashback. Rated 8.8/10.',
}

const casinoRelatedGuides: Record<string, { title: string; slug: string }[]> = {
  bitstarz: [
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Fastest Casino Payout Methods Ranked', slug: 'fastest-casino-payout-methods' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
  ],
  'bc-game': [
    { title: 'How Crypto Casino Withdrawals Work', slug: 'how-crypto-casino-withdrawals-work' },
    { title: 'Best Crypto for Gambling in 2026', slug: 'best-crypto-for-gambling-2026' },
    { title: 'Fastest Casino Payout Methods Ranked', slug: 'fastest-casino-payout-methods' },
  ],
  cloudbet: [
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
    { title: 'Fastest Casino Payout Methods Ranked', slug: 'fastest-casino-payout-methods' },
  ],
  'mirax-casino': [
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Best Crypto for Gambling in 2026', slug: 'best-crypto-for-gambling-2026' },
    { title: 'How Crypto Casino Withdrawals Work', slug: 'how-crypto-casino-withdrawals-work' },
  ],
  '7bit-casino': [
    { title: 'How Crypto Casino Withdrawals Work', slug: 'how-crypto-casino-withdrawals-work' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
    { title: 'Best Crypto for Gambling in 2026', slug: 'best-crypto-for-gambling-2026' },
  ],
}

export async function generateMetadata(props: PageProps<'/reviews/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const casino = getCasinoBySlug(slug)
  if (!casino) return {}
  const title = `${casino.name} Review 2026 — Scores, Bonuses & Withdrawal Times`
  const description = casinoMetaDescriptions[slug] ?? casino.reviewSummary.slice(0, 155)
  return {
    title,
    description,
    alternates: {
      canonical: `/reviews/${casino.slug}`,
    },
    openGraph: {
      url: `/reviews/${casino.slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${casino.name} Review 2026` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export default async function ReviewPage(props: PageProps<'/reviews/[slug]'>) {
  const { slug } = await props.params
  const casino = getCasinoBySlug(slug)
  if (!casino) notFound()

  const relatedGuides = casinoRelatedGuides[slug] ?? []

  const kycDescription =
    casino.kycLevel === 'None'
      ? 'No identity verification required. Sign up with an email and start playing immediately.'
      : casino.kycLevel === 'Light'
      ? 'Minimal verification — usually just email confirmation. Full KYC only triggered above high withdrawal thresholds.'
      : casino.kycLevel === 'Standard'
      ? 'Standard verification required: government ID and proof of address.'
      : 'Full KYC verification required for all players before withdrawals are processed.'

  const relatedLists = [
    { label: 'Best Crypto Casinos', href: '/best-crypto-casinos' },
    ...(casino.withdrawalScore >= 9.0 ? [{ label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos' }] : []),
    ...(casino.kycLevel === 'None' ? [{ label: 'No-KYC Casinos', href: '/no-kyc-casinos' }] : []),
    ...(casino.vipProgram ? [{ label: 'High Roller Casinos', href: '/high-roller-casinos' }] : []),
  ]

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${casino.name} Review`,
    reviewBody: casino.reviewSummary,
    author: {
      '@type': 'Organization',
      name: 'PlayMagpie',
      url: 'https://playmagpie.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PlayMagpie',
      url: 'https://playmagpie.com',
    },
    itemReviewed: {
      '@type': 'Organization',
      name: casino.name,
      description: casino.reviewSummary,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: casino.trustScore,
      bestRating: 10,
      worstRating: 0,
    },
    datePublished: '2026-01-01',
    dateModified: '2026-05-12',
    url: `https://playmagpie.com/reviews/${casino.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: 'Best Crypto Casinos', item: 'https://playmagpie.com/best-crypto-casinos' },
      { '@type': 'ListItem', position: 3, name: casino.name, item: `https://playmagpie.com/reviews/${casino.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${casino.name} safe and legitimate?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${casino.name} is licensed by ${casino.licence} and has a trust score of ${casino.trustScore}/10 on PlayMagpie's independent rating system.`,
        },
      },
      {
        '@type': 'Question',
        name: `How fast are ${casino.name} crypto withdrawals?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${casino.name} processes crypto withdrawals in ${casino.withdrawalTime.toLowerCase()}. Withdrawal score: ${casino.withdrawalScore}/10.`,
        },
      },
      {
        '@type': 'Question',
        name: `Does ${casino.name} require KYC verification?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${casino.name} has ${casino.kycLevel} KYC requirements. ${kycDescription}`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the ${casino.name} welcome bonus?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: casino.bonusSummary,
        },
      },
      {
        '@type': 'Question',
        name: `What cryptocurrencies does ${casino.name} accept?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${casino.name} accepts the following cryptocurrencies: ${casino.acceptedCryptos.join(', ')}.`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/best-crypto-casinos" className="hover:text-white transition-colors">Casinos</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">{casino.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-2xl font-bold text-white border border-[#222222]">
                {casino.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white">{casino.name} Review</h1>
                <p className="text-[#888888] text-sm mt-1">{casino.licence}</p>
                <p className="text-[#555555] text-xs mt-0.5">Last updated: May 12, 2026</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-extrabold text-[#7BB8D4]">{casino.trustScore}</div>
              <div className="text-[#888888] text-sm">Trust Score / 10</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {casino.badges.map((badge) => (
              <ScoreBadge key={badge} label={badge} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Withdrawal Time', value: casino.withdrawalTime },
              { label: 'Min Deposit', value: casino.minDeposit },
              { label: 'KYC', value: casino.kycLevel },
              { label: 'VIP', value: casino.vipProgram ? 'Yes' : 'No' },
            ].map((s) => (
              <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-xl p-3 text-center">
                <div className="text-white font-bold text-sm">{s.value}</div>
                <div className="text-[#555555] text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <CTAButton href={casino.affiliateUrl} label="Play at Casino" variant="primary" size="lg" external />
            <CTAButton href="/best-crypto-casinos" label="Compare Casinos" variant="secondary" size="lg" />
          </div>
        </div>

        <ReviewSection casino={casino} />

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[#222222]">
            <h2 className="text-xl font-bold text-white mb-4">Related Guides</h2>
            <p className="text-[#888888] text-sm mb-5">
              Learn more about {casino.name}&apos;s key features with these in-depth guides:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-4 transition-all group"
                >
                  <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-sm leading-snug">
                    {g.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Appears in lists */}
        <section className="mt-10 pt-8 border-t border-[#222222]">
          <h2 className="text-lg font-bold text-white mb-4">{casino.name} Appears In</h2>
          <div className="flex flex-wrap gap-3">
            {relatedLists.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-lg text-sm text-[#888888] hover:text-[#f5f5f5] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
