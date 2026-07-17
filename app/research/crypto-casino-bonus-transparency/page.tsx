import type { Metadata } from 'next'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'

// The Crypto Casino Bonus & Withdrawal Transparency Report: an original-research
// linkable asset. Every figure here is either pulled live from lib/casinos.ts
// (headline offer, KYC level, min deposit) or is a curated "catch" sourced from
// that file's verified cons/reviewSummary/comment block, or, for Roobet, from
// the documented research URLs in lib/casinos.ts. Anything we could not verify is
// marked "not documented". Bonus terms first verified against operators' live
// T&Cs on 2026-05-30; BitStarz, Mirax and Cloudbet re-verified 2026-07-16
// (owner, live terms). Second edition 2026-07-17: the first edition's 25%
// BitStarz fee and €100 Mirax cap failed re-verification and are corrected
// with a visible correction record on the page (standing editorial policy:
// corrections are published, never silently rewritten).

export const metadata: Metadata = {
  title: 'The Crypto Casino Bonus & Withdrawal Transparency Report (2026)',
  description:
    'We checked the bonus and withdrawal terms of 8 crypto casinos against their live T&Cs, and publish corrections when re-verification changes the picture. Two hard published withdrawal costs survive: Roobet\'s 2% fiat fee and Cloudbet\'s pre-verification daily cap. Every figure sourced; gaps marked "not documented".',
  alternates: { canonical: '/research/crypto-casino-bonus-transparency' },
  openGraph: {
    url: '/research/crypto-casino-bonus-transparency',
    title: 'The Crypto Casino Bonus & Withdrawal Transparency Report (2026)',
    description:
      'Original research: 8 crypto casinos’ bonus terms checked against their live T&Cs. The gap between the headline offer and the real cashout terms, every figure sourced.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casino Bonus & Withdrawal Transparency Report' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Crypto Casino Bonus & Withdrawal Transparency Report (2026)',
    description: '8 crypto casinos’ bonus terms vs their live T&Cs. Every figure sourced; gaps marked "not documented".',
    images: ['/og-image.png'],
  },
}

// Display order: trust score desc (Roobet last). Headline = bonusSummary (live
// from lib/casinos.ts). "Catch" = curated, each traceable to the cited source.
const ROW_ORDER = ['bitstarz', 'bc-game', '7bit-casino', 'cloudbet', 'mirax-casino', 'duelbits', 'shuffle', 'roobet'] as const

const CATCH: Record<string, { text: string; source: string }> = {
  bitstarz: {
    text: 'No cashier fees at all per the live terms (re-verified July 2026); the real cost of the 5 BTC headline is match-bonus wagering up to 40x. An earlier edition of this report cited a 25% bonus-withdrawal admin fee that is not in the current terms; see the correction record above.',
    source: 'Live T&C, owner-verified 2026-07-16',
  },
  'bc-game': {
    text: 'The "220%" is rakeback that unlocks as you wager, not cash credited up front: a materially different value profile from a deposit match.',
    source: 'bc.game/deposit-offer, verified 2026-05-30',
  },
  '7bit-casino': {
    text: 'Free-spin winnings carry a max-cashout cap per the published T&C; the specific figure is not documented in our verified dataset. Curaçao-only licence, no Tier-1 regulator.',
    source: 'Published T&C, 2026-05-30; cap figure not documented',
  },
  cloudbet: {
    text: 'The headline no-limit withdrawal policy applies to fully verified (Level 2) accounts only; until verification completes, withdrawals are capped at $2,200 a day.',
    source: 'Cloudbet help centre, verified 2026-07-16',
  },
  'mirax-casino': {
    text: 'No free-spin max-cashout cap is published in the live terms (an earlier edition cited €100; removed on July 2026 re-verification). The term that matters is the 45x free-spin wagering, stricter than its own 40x cash-bonus wagering.',
    source: 'Live terms, owner-verified 2026-07-16',
  },
  duelbits: {
    text: 'Cashback-first, not a match: the smallest headline here, but with no large bonus balance to wager through it is arguably the cleanest of the eight to cash out.',
    source: 'Catalogue verification, May 2026',
  },
  shuffle: {
    text: '35x wagering (above the industry average), and the bonus must be activated via live chat rather than automatically.',
    source: 'Published bonus terms, May 2026',
  },
  roobet: {
    text: 'See the withdrawal-reliability section: the catch here is documented withdrawal-hold complaints and published-terms fees, stated with its disclaimer inline.',
    source: 'Roobet terms §10.8 + AskGamblers complaint records',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://www.playmagpie.com/research' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Crypto Casino Bonus & Withdrawal Transparency Report',
      item: 'https://www.playmagpie.com/research/crypto-casino-bonus-transparency',
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Crypto Casino Bonus & Withdrawal Transparency Report (2026)',
  description:
    'Eight crypto casinos’ bonus and withdrawal terms checked against their live T&Cs. The gap between the headline offer and the real cashout terms.',
  author: { '@type': 'Organization', name: 'PlayMagpie', url: 'https://www.playmagpie.com' },
  publisher: { '@type': 'Organization', name: 'PlayMagpie', url: 'https://www.playmagpie.com' },
  datePublished: '2026-06-09',
  dateModified: '2026-07-17',
  url: 'https://www.playmagpie.com/research/crypto-casino-bonus-transparency',
  mainEntityOfPage: 'https://www.playmagpie.com/research/crypto-casino-bonus-transparency',
}

export default function TransparencyReportPage() {
  const rows = ROW_ORDER.map((slug) => ({ casino: getCasinoBySlug(slug), catch: CATCH[slug] })).filter(
    (r): r is { casino: NonNullable<ReturnType<typeof getCasinoBySlug>>; catch: { text: string; source: string } } =>
      Boolean(r.casino)
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Research</span>
        </nav>

        <div className="mb-10">
          <p className="text-[#7BB8D4] text-sm font-semibold uppercase tracking-wider mb-3">Original research</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            The Crypto Casino Bonus &amp; Withdrawal Transparency Report
          </h1>
          <p className="text-[#888888] text-base leading-relaxed max-w-2xl">
            We read the live terms &amp; conditions of all eight crypto casinos we cover and checked every
            bonus and withdrawal claim against them. This is the gap between the headline offer and the
            real cashout terms: every figure sourced, and anything we could not verify marked
            &quot;not documented.&quot;
          </p>
          <p className="text-[#555555] text-xs mt-4">
            Bonus terms first verified against operators&apos; live T&amp;Cs on 2026-05-30; Cloudbet,
            BitStarz and Mirax re-verified against live terms on 2026-07-16. Offers and claims may
            change. Check the operator&apos;s current terms before depositing.
          </p>
        </div>

        {/* Headline finding */}
        <section className="mb-12 bg-[#111111] border border-[#7BB8D4]/20 rounded-2xl p-6 sm:p-8">
          <div className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">The finding</div>
          <p className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
            Every one of the eight crypto casinos we audited carries a catch its headline never mentions,
            but only two are hard, published withdrawal costs: Roobet&apos;s 2% fiat-withdrawal fee (from the
            10th fiat cashout in any rolling 30 days) and Cloudbet&apos;s $2,200-a-day cap until full
            verification.
          </p>
          <p className="text-[#888888] text-sm leading-relaxed">
            The more common catch is structural: rakeback headlines that aren&apos;t cash up front
            (BC.Game), wagering multipliers to 45x, a live-chat-activated bonus at 35x (Shuffle), and
            free-spin caps that are published for some bonus types and absent from the public terms for
            others. Wagering requirements, disclosed in every case, materially change a bonus&apos;s real
            value but are a disclosed term, not a hidden cost.
          </p>
        </section>

        {/* Correction record: second edition */}
        <section className="mb-12 bg-[#0d0d0d] border border-[#d98a8a]/30 rounded-2xl p-6 sm:p-8">
          <div className="text-[#d98a8a] text-sm font-medium uppercase tracking-wider mb-2">Correction record</div>
          <p className="text-[#bbbbbb] text-sm leading-relaxed">
            This is the second edition of this report, and the corrections are part of it. The first
            edition led with a 25% BitStarz admin fee on bonus-derived withdrawals and a €100 Mirax
            free-spin cap. On re-verification against the live operator terms in July 2026, neither exists
            in the current T&amp;Cs: BitStarz&apos;s terms document no fees on any deposits or withdrawals,
            and Mirax publishes no free-spin cashout cap. Both claims were removed site-wide the same day.
            We&apos;re leaving this note here because a transparency report that quietly rewrote its own
            headline wouldn&apos;t be one.
          </p>
        </section>

        {/* The table: the linkable artifact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Headline offer vs the verified catch</h2>
          <p className="text-[#888888] text-sm mb-6">
            Headline figures are pulled live from our catalogue (verified against the operator&apos;s live
            T&amp;C: 2026-07-16 for Cloudbet, 2026-05-30 for the rest). The &quot;catch&quot; column is the
            term the headline omits.
          </p>
          <div className="space-y-3">
            {rows.map(({ casino, catch: c }) => (
              <div key={casino.slug} className="bg-[#111111] border border-[#222222] rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <Link href={`/reviews/${casino.slug}`} className="text-lg font-bold text-white hover:text-[#7BB8D4] transition-colors">
                    {casino.name}
                  </Link>
                  <span className="text-[#555555] text-xs">{casino.kycLevel} KYC · Min {casino.minDeposit} · Withdrawal {casino.withdrawalTime}</span>
                </div>
                <p className="text-[#bbbbbb] text-sm leading-relaxed mb-2">
                  <span className="text-[#7BB8D4] text-xs uppercase tracking-wide font-semibold">Headline </span>
                  {casino.bonusSummary}
                </p>
                {casino.slug === 'roobet' ? (
                  <div className="text-[#bbbbbb] text-sm leading-relaxed bg-[#0d0d0d] border border-[#222222] rounded-xl p-4 mt-2">
                    <span className="text-[#d98a8a] text-xs uppercase tracking-wide font-semibold">The catch </span>
                    Per Roobet&apos;s published terms (§10.8): a 2% fee applies from the 10th fiat withdrawal onwards in a
                    rolling 30-day window, alongside a stated $200,000/day cap and no weekend cashier processing. Separately,
                    AskGamblers hosts documented player complaints of multi-day withdrawal holds on large wins ($20k–$115k),
                    one of which, an $84,000 case, is publicly listed as <strong className="text-white">Unsolved as of June 2026</strong>.{' '}
                    <span className="text-[#888888]">
                      These are documented complaints and published terms, not findings of wrongdoing; we link each to its
                      primary source so readers can assess them directly (see Sources below).
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-[#bbbbbb] text-sm leading-relaxed mt-1">
                      <span className="text-[#d98a8a] text-xs uppercase tracking-wide font-semibold">The catch </span>
                      {c.text}
                    </p>
                    <p className="text-[#555555] text-xs mt-2">Verification: {c.source}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Cashout costs & caps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Cashout costs and caps: what survived re-verification</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              The July 2026 re-verification pass changed this section&apos;s headline claims. The first edition
              led with a <strong className="text-white">25% BitStarz admin fee on bonus-derived
              withdrawals</strong>; the live terms carry no such fee, and in fact document{' '}
              <strong className="text-white">no fees on any deposits or withdrawals</strong>. What remains true
              at BitStarz, and at every match-bonus operator here, is that the wagering multiplier is the real
              cost: clearing 40x on a $1,000-equivalent bonus means $40,000 in bets, an expected loss of around
              $1,600 on a typical 96% RTP slot library, before any winnings become withdrawable.
            </p>
            <p>
              On free-spin <strong className="text-white">max-cashout caps</strong>, the picture after
              re-verification: no operator in the set publishes a cap on welcome-pack free-spin winnings. The
              only published cap anywhere is BitStarz&apos;s €100 limit on no-deposit promotional spins (T&amp;C
              §1.1), which explicitly excludes the welcome pack. Mirax&apos;s live terms carry no cap (the €100
              figure in our first edition is corrected above), and 7Bit&apos;s offer references a cap whose
              figure is <strong className="text-white">not documented</strong> in the public terms, so we
              don&apos;t state one. Absence of a published cap is not a guarantee an outlier win pays in full;
              it means the ceiling, if any, is not in the public terms. We line these up on{' '}
              <Link href="/bonus/free-spins" className="text-[#7BB8D4] hover:underline">the free-spins comparison</Link>.
            </p>
          </div>
        </section>

        {/* Withdrawal reliability */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Withdrawal reliability</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Headline withdrawal speeds across the eight range from instant-to-5-minutes (Duelbits) to
              instant-to-30-minutes (Cloudbet) for routine crypto cash-outs, all fast by the broader standard. Speed,
              though, is not the same as reliability on a large win, and one operator on our list has a documented record
              worth stating plainly and even-handedly.
            </p>
            <div className="bg-[#0d0d0d] border border-[#222222] rounded-2xl p-5">
              <div className="text-[#d98a8a] text-xs uppercase tracking-wide font-semibold mb-2">Roobet: documented record</div>
              <p className="text-[#bbbbbb] text-sm leading-relaxed">
                Per Roobet&apos;s published terms (§10.8), a 2% fee applies from the 10th fiat withdrawal onwards in a rolling
                30-day window, alongside a stated $200,000/day cap and no weekend cashier processing. Separately, AskGamblers
                hosts documented player complaints of multi-day withdrawal holds on large wins ($20k–$115k), one of which,
                an $84,000 case, is publicly listed as <strong className="text-white">Unsolved as of June 2026</strong>.{' '}
                <span className="text-[#888888]">
                  These are documented complaints and published terms, not findings of wrongdoing; we link each to its
                  primary source so readers can assess them directly (see Sources below).
                </span>
              </p>
            </div>
            <p>
              We apply the same test to every operator: the table above flags a verified catch for each of the eight, not
              only Roobet. The point of this section is consumer information, not a verdict on any single operator&apos;s conduct.
              Our full take on each is in the individual reviews.
            </p>
          </div>
        </section>

        {/* KYC reality */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">KYC reality</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Identity-verification posture splits three ways across the eight, and it is an operator-level choice rather
              than an industry default: <strong className="text-white">three run no-KYC</strong> for crypto play and
              withdrawals (BC.Game, 7Bit, Duelbits), <strong className="text-white">four run Light KYC</strong> that can
              trigger on larger or fiat-side activity (BitStarz, Cloudbet, Mirax, Shuffle), and{' '}
              <strong className="text-white">one runs Standard KYC</strong> (Roobet). The full cross-operator breakdown,
              including what triggers a check and which documents are requested, is in{' '}
              <Link href="/guides/do-crypto-casinos-require-kyc" className="text-[#7BB8D4] hover:underline">our KYC guide</Link>.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-12 border-t border-[#222222] pt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Methodology &amp; sourcing</h2>
          <div className="prose prose-invert max-w-none text-[#bbbbbb] leading-relaxed space-y-4">
            <p>
              Every headline figure in this report is pulled live from our casino catalogue, and each was verified
              against the operator&apos;s own live terms &amp; conditions / promotions page on 2026-05-30. The
              &quot;catch&quot; for each operator is sourced from that same verified record. Where we could not verify a
              commonly-cited figure to a primary source, we mark it <strong className="text-white">&quot;not
              documented&quot;</strong> rather than print it. 7Bit&apos;s free-spin cap figure is the example here.
            </p>
            <p>
              <strong className="text-white">Honest scope note:</strong> this is eight operators, not fifty. The
              credibility of the report is its verification depth (every figure checked against the operator&apos;s own
              live T&amp;C) rather than its breadth. A shallow scrape of fifty casinos&apos; marketing copy would be less
              reliable than this, not more. We expect to expand the verified dataset over time.
            </p>
            <p>
              The Roobet claims are documented complaints and published-terms references, each linked below to its
              primary source. They are stated as of June 2026; AskGamblers case statuses can change, which is why the
              $84,000 case is pinned to a date rather than asserted as a permanent state.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-3">Sources</h2>
          <ul className="space-y-2 text-sm text-[#888888]">
            <li>
              Roobet $84,000 account-lock case (listed Unsolved as of June 2026).{' '}
              <a href="https://www.askgamblers.com/casino-complaints/roobet-casino-account-wrongfully-locked-after-requesting-usd84-000-withdrawal-1" target="_blank" rel="noopener noreferrer nofollow" className="text-[#7BB8D4] hover:underline break-all">
                AskGamblers complaint
              </a>
            </li>
            <li>
              Roobet withdrawal-hold complaint pattern ($20k–$115k).{' '}
              <a href="https://www.askgamblers.com/online-casinos/reviews/roobet-casino-casino/complaints" target="_blank" rel="noopener noreferrer nofollow" className="text-[#7BB8D4] hover:underline break-all">
                AskGamblers complaints index
              </a>
            </li>
            <li>Roobet 2% fiat-withdrawal fee / $200k-per-day cap / restricted territories: roobet.com/terms §10.8 and §3.5 (verified against live ToS, May 2026).</li>
            <li>All operator bonus, KYC, withdrawal-time and minimum-deposit figures: PlayMagpie catalogue (<code className="text-[#7BB8D4] bg-[#0d0d0d] px-1.5 py-0.5 rounded text-xs">lib/casinos.ts</code>), verified against live T&amp;Cs on 2026-05-30.</li>
          </ul>
        </section>

        {/* Related */}
        <section className="border-t border-[#222222] pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/bonus/free-spins" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Free-Spins Terms Compared</div>
              <div className="text-[#888888] text-sm">The cashout caps, cell by cell</div>
            </Link>
            <Link href="/guides/do-crypto-casinos-require-kyc" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Do Crypto Casinos Require KYC?</div>
              <div className="text-[#888888] text-sm">The 3 / 4 / 1 verification split</div>
            </Link>
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casino Reviews</div>
              <div className="text-[#888888] text-sm">Our full honest rankings</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
