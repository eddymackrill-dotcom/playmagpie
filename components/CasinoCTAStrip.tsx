import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import CTAButton from './CTAButton'
import CasinoLogo from './CasinoLogo'

// Reusable above-the-fold strip — one component used across all categories
// (intent, game, crypto, country, bonus pages). The consuming page passes
// the list of casino slugs to surface and the 2-3 facts per card; the
// component handles layout, logo + name + trust anchor, and the
// rel="sponsored nofollow" affiliate CTA via the existing CTAButton path.
//
// Cards with unresolvable slugs are silently dropped. If zero cards
// resolve the component renders nothing (avoids empty strip artifacts on
// country pages where restricted-territory filtering removes operators).

export type CTAStripCard = {
  slug: string
  facts: { label: string; value: string }[]
  ctaLabel?: string
}

export type CasinoCTAStripProps = {
  framing: string
  cards: CTAStripCard[]
}

export default function CasinoCTAStrip({ framing, cards }: CasinoCTAStripProps) {
  const resolved = cards
    .map((card) => {
      const casino = getCasinoBySlug(card.slug)
      if (!casino) return null
      return { ...card, casino }
    })
    .filter((c): c is NonNullable<typeof c> => c !== null)

  if (resolved.length === 0) return null

  // Grid scales with card count — 1 card centred-narrow, 2 side-by-side,
  // 3+ standard 3-up.
  const gridCols =
    resolved.length === 1
      ? 'grid-cols-1 max-w-sm mx-auto'
      : resolved.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="mb-10">
      <p className="text-[#888888] text-xs uppercase tracking-wider mb-3">{framing}</p>
      <div className={`grid ${gridCols} gap-4`}>
        {resolved.map(({ casino, facts, ctaLabel }) => (
          <div
            key={casino.slug}
            className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-5 transition-all"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden flex-shrink-0">
                  <CasinoLogo src={casino.logo} name={casino.name} size={32} />
                </div>
                <Link
                  href={`/reviews/${casino.slug}`}
                  className="font-bold text-[#f5f5f5] hover:text-[#7BB8D4] transition-colors text-sm leading-tight truncate"
                >
                  {casino.name}
                </Link>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-extrabold text-[#7BB8D4] leading-none">{casino.trustScore}</div>
                <div className="text-[#555555] text-[10px] uppercase tracking-wide mt-0.5">Trust</div>
              </div>
            </div>
            <ul className="space-y-1.5 mb-4">
              {facts.map((fact, i) => (
                <li key={`${casino.slug}-fact-${i}`} className="flex items-baseline gap-2 text-xs">
                  <span className="text-[#555555] uppercase tracking-wide flex-shrink-0 w-24">{fact.label}</span>
                  <span className="text-[#bbbbbb] leading-snug">{fact.value}</span>
                </li>
              ))}
            </ul>
            <div className="flex">
              <CTAButton
                href={casino.affiliateUrl}
                label={ctaLabel ?? `Visit ${casino.name}`}
                variant="primary"
                size="sm"
                external
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
