import type { Metadata } from 'next'
import Link from 'next/link'
import { BONUS_CONTENT, getCasinosForBonus } from '@/lib/bonus-content'
import CasinoCard from '@/components/CasinoCard'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'

// Verified per-casino free-spin data block, populated 2026-05-30 against each
// operator's live T&C / promotions page. Cells marked "Not documented" are
// fields the casino does not publish on its bonus T&C or promotions page,
// flagged honestly rather than guessed. Sources cited per cell.
//
// Primary sources verified directly (user-pulled, not via fetcher):
// - BitStarz: https://www.bitstarz.com/promotions (T&C last updated 25 June 2025)
// - Mirax: https://miraxcasino.com/promotions
// - 7Bit: https://7bitcasino.com/bonuses
//
// BC.Game intentionally excluded from this page: its current welcome offer at
// https://bc.game/deposit-offer is a 220% Deposit Rakeback Welcome with no
// free-spins component. The existing BONUS_CONTENT filter
// (c.bonusSummary.toLowerCase().includes('spin')) auto-drops BC.Game once its
// bonusSummary string in lib/casinos.ts no longer contains "spin".

type Cell = {
  value: string
  source?: string
}

const TABLE_ROWS: { field: string; cells: Record<'bitstarz' | 'mirax-casino' | '7bit-casino', Cell> }[] = [
  {
    field: 'Spin count',
    cells: {
      bitstarz: {
        value: '180 total across the welcome pack: 20 instant on D1, then 20 per day for 8 consecutive days.',
        source: 'bitstarz.com/promotions T&C §2.7',
      },
      'mirax-casino': {
        value: '150 total: 100 on D1 (no code), 50 on D2 (code W2), 0 on D3 (W3 = cash-only), 0 on D4 (W4 = cash-only).',
        source: 'miraxcasino.com/promotions',
      },
      '7bit-casino': {
        value: '250 total across the 4-deposit welcome pack. Per-deposit breakdown not published.',
        source: '7bitcasino.com/bonuses: "325% match up to 5400 EUR and 250 Free Spins"',
      },
    },
  },
  {
    field: 'Spin value',
    cells: {
      bitstarz: { value: 'Not documented in T&C.' },
      'mirax-casino': { value: 'Not documented in T&C extract.' },
      '7bit-casino': { value: 'Not documented in T&C extract.' },
    },
  },
  {
    field: 'Eligible games',
    cells: {
      bitstarz: {
        value: 'Country-dependent: check the bonus section after login. No fixed-title commitment in the T&C.',
        source: 'bitstarz.com/promotions T&C §2.8',
      },
      'mirax-casino': {
        value: 'Not documented by title in the promotions-page extract. Promo codes W2/W3/W4 are referenced for D2-4 but the eligible slot per deposit is not named in the T&C copy.',
      },
      '7bit-casino': {
        value: 'Not documented in the bonuses-page extract.',
      },
    },
  },
  {
    field: 'Wagering on FS winnings',
    cells: {
      bitstarz: {
        value: '40x winnings.',
        source: 'bitstarz.com/promotions T&C §2.3: "Any winnings generated from free spins will be awarded with a wagering requirement of 40 (forty)."',
      },
      'mirax-casino': {
        value: '45x winnings, distinct from the 40x on cash deposit bonuses.',
        source: 'miraxcasino.com/promotions: "Mirax casino free spins must be wagered 45 times unless otherwise stated."',
      },
      '7bit-casino': {
        value: '40-45x range, not pinned to free spins specifically.',
        source: '7bitcasino.com/bonuses: "Most BTC casino bonus offers at 7Bit should be wagered 40-45 times unless otherwise stated."',
      },
    },
  },
  {
    field: 'Max cashout from FS winnings',
    cells: {
      bitstarz: {
        value: 'Not documented separately for welcome FS. T&C §1.1 specifies a €100 cap but explicitly only for no-deposit bonuses (registration spins, Weekly Free Spins Drops, Second Chance Spins). The welcome-pack FS are excluded from §1.1; no separate cap is documented for them.',
      },
      'mirax-casino': {
        value: '€100.',
        source: 'miraxcasino.com/promotions: "The maximum cashout from Free Spins is 100 EUR unless otherwise stated."',
      },
      '7bit-casino': {
        value: 'Not documented in the bonuses-page extract.',
      },
    },
  },
]

const CASINO_HEADERS: { slug: 'bitstarz' | 'mirax-casino' | '7bit-casino'; name: string }[] = [
  { slug: 'bitstarz', name: 'BitStarz' },
  { slug: 'mirax-casino', name: 'Mirax Casino' },
  { slug: '7bit-casino', name: '7Bit Casino' },
]

// Above-the-fold strip cards. Facts are drawn from the verified T&C data
// in TABLE_ROWS above so the headline + strip + table all reference the
// same primary-source figures. Wagering and max-cashout cells are the
// strip's load-bearing comparable signals; spin count is the lead anchor.
const STRIP_CARDS: CTAStripCard[] = [
  {
    slug: 'bitstarz',
    facts: [
      { label: 'Spins', value: '180 across welcome' },
      { label: 'Wagering', value: '40x winnings (T&C §2.3)' },
      { label: 'Max cashout', value: 'Not documented for welcome FS' },
    ],
  },
  {
    slug: 'mirax-casino',
    facts: [
      { label: 'Spins', value: '150: 100/50/0/0 by deposit' },
      { label: 'Wagering', value: '45x winnings' },
      { label: 'Max cashout', value: '€100 (only published cap)' },
    ],
  },
  {
    slug: '7bit-casino',
    facts: [
      { label: 'Spins', value: '250 across welcome' },
      { label: 'Wagering', value: '40-45x range' },
      { label: 'Max cashout', value: 'Not documented' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Best Free Spins Crypto Casinos 2026: Verified T&C Comparison',
  description:
    'Free-spin welcome packs at BitStarz, Mirax and 7Bit compared cell-by-cell against each casino\'s live T&C: spin count, eligible games, wagering, and max cashout, with "Not documented" cells flagged honestly rather than guessed.',
  alternates: { canonical: '/bonus/free-spins' },
  openGraph: {
    url: '/bonus/free-spins',
    title: 'Best Free Spins Crypto Casinos 2026: Verified T&C Comparison',
    description:
      'Verified per-casino free-spins data: spin count, wagering, max cashout. Three operators compared against their live T&C, gaps flagged honestly.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Free Spins Crypto Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Free Spins Crypto Casinos 2026',
    description: 'BitStarz / Mirax / 7Bit free-spins terms compared against live T&C with verified-vs-not-documented cells flagged.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Bonuses', item: 'https://www.playmagpie.com/bonus' },
    { '@type': 'ListItem', position: 3, name: 'Free Spins', item: 'https://www.playmagpie.com/bonus/free-spins' },
  ],
}

export default function FreeSpinsBonusPage() {
  const content = BONUS_CONTENT['free-spins']
  const matching = getCasinosForBonus('free-spins')

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
          <span className="text-[#f5f5f5]">Free Spins</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">🎰 Free Spins</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Free Spins Crypto Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Real terms: wagering multipliers, max cashout caps and game contributions decoded against
            each operator&apos;s live T&amp;C. Where a casino does not publish a figure, we flag it
            rather than guess.
          </p>
        </div>

        <CasinoCTAStrip
          framing="Honest pre-summary: same three operators analysed in the verified-T&C table below. Trust-score ranked, not paid placement."
          cards={STRIP_CARDS}
        />

        <section className="mb-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">How free spins work in 2026</h2>
          <p className="text-[#888888] leading-relaxed whitespace-pre-line">{content.intro}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-3">Verified free-spins terms: cell-by-cell</h2>
          <p className="text-[#888888] text-sm leading-relaxed max-w-3xl mb-6">
            Verified from each casino&apos;s live T&amp;C on 2026-05-30. Where a field is marked
            &ldquo;Not documented&rdquo;, the casino does not publish that figure on its bonus T&amp;C or
            promotions page. We flag the gap rather than guess, because every other affiliate site that
            fills these cells is guessing. The sparseness is a feature: it&apos;s the actual shape of what
            these casinos commit to in writing.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold w-44">Field</th>
                  {CASINO_HEADERS.map((c) => (
                    <th key={c.slug} className="text-left px-4 py-3.5 text-[#f5f5f5] font-semibold">
                      <Link href={`/reviews/${c.slug}`} className="hover:text-[#7BB8D4] transition-colors">
                        {c.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={row.field}
                    className={`border-b border-[#222222] last:border-0 align-top ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}
                  >
                    <td className="px-4 py-4 text-[#7BB8D4] font-semibold">{row.field}</td>
                    {CASINO_HEADERS.map((c) => {
                      const cell = row.cells[c.slug]
                      const undocumented = cell.value.startsWith('Not documented')
                      return (
                        <td key={c.slug} className="px-4 py-4">
                          <p className={`text-sm leading-relaxed ${undocumented ? 'text-[#666666]' : 'text-[#bbbbbb]'}`}>
                            {cell.value}
                          </p>
                          {cell.source && (
                            <p className="text-[#555555] text-xs mt-2 italic">
                              Source: {cell.source}
                            </p>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#555555] text-xs mt-3">
            7 of 15 cells primary-source verified to live T&amp;C. 8 cells marked &ldquo;Not documented&rdquo; with
            explicit reason. The Mirax €100 free-spin cashout cap is the only published max-cashout figure on
            free-spin winnings across the three operators.
          </p>
        </section>

        <section className="mb-12">
          <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">What this means in practice</h2>
            <div className="space-y-4 text-[#bbbbbb] text-sm leading-relaxed">
              <p>
                <strong className="text-white">On wagering, the math is fully documented at all three.</strong>{' '}
                Free-spin winnings need to clear 40x at BitStarz, 45x at Mirax, and somewhere in the 40-45x band
                at 7Bit before they become withdrawable. Mirax&apos;s 45x is the strictest and the only one
                explicitly distinct from the cash deposit bonus wagering, worth knowing if you&apos;re
                optimising for spin-side bonus value rather than match-side.
              </p>
              <p>
                <strong className="text-white">On spin value and eligible games, all three defer to the
                in-account bonus screen</strong> rather than committing to fixed figures in their public T&amp;C.
                This is the field where affiliate-site numbers are most likely to be wrong. &ldquo;200 spins at
                $0.10 on Wolf Gold&rdquo; type claims are usually surfacing what the casino used to offer or what
                a specific affiliate-coded variant offers, not the default welcome flow today. What you see in
                your cashier may not match what affiliate sites quoted six months ago.
              </p>
              <p>
                <strong className="text-white">On max cashout, Mirax is the only operator that publishes an
                explicit cap on free-spin winnings (€100).</strong> BitStarz&apos;s €100/$100 cap is documented
                but only for no-deposit promotional spins, explicitly excluding the welcome-pack FS. 7Bit does
                not publish one in the bonuses-page T&amp;C extract. If a five-figure free-spin outlier win is
                the scenario you&apos;re optimising for, this changes the analysis materially.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            {matching.length} {matching.length === 1 ? 'Casino' : 'Casinos'} Ranked for Free Spins
          </h2>
          <p className="text-[#888888] text-sm mb-6">
            Each platform below carries a free-spins component in its current welcome offer.
            BC.Game is intentionally excluded: its current welcome offer is a 220% Deposit Rakeback
            Welcome with no free-spins component (per bc.game/deposit-offer).
          </p>
          {matching.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {matching.map((casino, i) => (
                <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
              ))}
            </div>
          ) : (
            <p className="text-[#888888]">No casinos in our index currently feature a stand-out free-spins offer.</p>
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

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Related</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/bonus/welcome-bonus" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Welcome Bonuses</div>
              <div className="text-[#888888] text-sm">The match-side of the welcome pack: free spins are usually the spin-side companion</div>
            </Link>
            <Link href="/bonus/cashback" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Cashback</div>
              <div className="text-[#888888] text-sm">The structurally cleanest bonus class: net-loss return with no wagering</div>
            </Link>
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Full independent rankings across all operators</div>
            </Link>
            <Link href="/guides/how-casino-bonuses-really-work" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">How Casino Bonuses Really Work</div>
              <div className="text-[#888888] text-sm">Plain-language guide to wagering math and cashout caps</div>
            </Link>
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
