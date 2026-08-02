import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import CTAButton from '@/components/CTAButton'

// Brand+intent bonus sub-page. BitStarz only, and deliberately a single-slug
// allowlist rather than a cross-product over the catalogue.
//
// WHY THIS PAGE EXISTS (2026-08-02, owner-approved, final August page):
// target query is "bitstarz no deposit bonus". Demand basis is ONE DataForSEO
// reading, 480/mo geo=CA, LOW competition, CPC $12.33, stable 320-720 across
// 12 months. GSC shows ZERO impressions on it across the entire clean window,
// so the site has never surfaced for it: that is non-coverage, not
// tested-and-failed. The caveat is recorded rather than softened: 480/mo is
// GOOGLE keyword data, and Google is not currently serving this site. Whether
// the demand exists on Bing, which is the channel that is serving, is
// UNMEASURED. A future session reading the outcome should know that was the bet.
//
// What actually carries the page is not the volume. It is that the answer is a
// negative finding with clause-level sourcing behind it: there is no standing
// no-deposit offer, T&C §1.1 governs the regional no-deposit spins that do
// appear, and T&C §2.7 documents the welcome-pack schedule. Operators do not
// publish that comparison and affiliate sites routinely get it wrong.
//
// SCALED-CONTENT RISK: MEDIUM, graded at proposal and NOT regraded down. This
// is a fourth sub-page in an existing template family and 8 operators x 4
// intents is the cross-product shape the June 2026 classifier targets. The
// mitigation is that the body is built on clause numbers six of our eight
// operators have no equivalent for, and leads on a negative finding no
// template generates. Do NOT extend this route to a second slug without its
// own argument from measured demand.
//
// STANDING BLOCK, do not rediscover and mistake for an opportunity:
// "bitstarz bonus code" carries 390/mo at CPC $27.17 (DataForSEO 2026-08-02,
// cached in lib/keyword-research.md). NO BONUS-CODE PAGE, EVER. We hold no
// verified code, so verify-or-omit blocks the page's own premise, and a
// bonus-code page is a coupon farm, which is the thin-affiliate pattern that
// got this site suppressed. This is an owner-confirmed standing block.
const BONUS_SLUGS = ['bitstarz'] as const

export function generateStaticParams() {
  return BONUS_SLUGS.map((slug) => ({ slug }))
}

const META: Record<(typeof BONUS_SLUGS)[number], { title: string; description: string }> = {
  bitstarz: {
    title: 'BitStarz No Deposit Bonus: There Is No Standing Offer (2026)',
    description:
      'BitStarz runs no standing no deposit bonus. What exists instead: 5 BTC plus 180 free spins across four deposits, and the T&C §1.1 €100 cap that governs the regional no-deposit spins that do appear.',
  },
}

export async function generateMetadata(props: PageProps<'/reviews/[slug]/bonus'>): Promise<Metadata> {
  const { slug } = await props.params
  if (!(BONUS_SLUGS as readonly string[]).includes(slug)) return {}
  const meta = META[slug as (typeof BONUS_SLUGS)[number]]
  const canonical = `/reviews/${slug}/bonus`
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: meta.title,
      description: meta.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
  }
}

export default async function BonusPage(props: PageProps<'/reviews/[slug]/bonus'>) {
  const { slug } = await props.params
  if (!(BONUS_SLUGS as readonly string[]).includes(slug)) notFound()
  const casino = getCasinoBySlug(slug)
  if (!casino) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: casino.name,
        item: `https://www.playmagpie.com/reviews/${casino.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Bonus',
        item: `https://www.playmagpie.com/reviews/${casino.slug}/bonus`,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BITSTARZ_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/best-crypto-casinos" className="hover:text-white transition-colors">Casinos</Link>
          <span>/</span>
          <Link href={`/reviews/${casino.slug}`} className="hover:text-white transition-colors">{casino.name}</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Bonus</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <div>
              <p className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">
                {casino.name}: Bonus Terms
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                BitStarz No Deposit Bonus: The Honest Answer Is There Isn&apos;t a Standing One
              </h1>
              <p className="text-[#555555] text-xs mt-2">
                Facts last verified against the live BitStarz terms: July 2026
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-extrabold text-[#7BB8D4]">{casino.bonusFairnessScore}</div>
              <div className="text-[#888888] text-sm">Bonus Fairness / 10</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Stat label="Standing no-deposit offer" value="None" />
            <Stat label="Welcome package" value="5 BTC + 180 FS" />
            <Stat label="Wagering" value="40x (T&C §2.3)" />
            <Stat label="Min deposit" value={casino.minDeposit} />
          </div>

          <div className="flex gap-3 flex-wrap">
            <CTAButton href={casino.affiliateUrl} label={`Play at ${casino.name}`} variant="primary" size="lg" external />
            <CTAButton href={`/reviews/${casino.slug}`} label="Full Review" variant="secondary" size="lg" />
          </div>
        </div>

        <BitstarzBonusContent
          minDeposit={casino.minDeposit}
          bonusScore={casino.bonusFairnessScore}
        />

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">BitStarz bonus FAQ</h2>
          <p className="text-[#888888] text-sm mb-8">
            The bonus questions players ask before depositing, answered against the published terms.
          </p>
          <div className="space-y-4">
            {BITSTARZ_FAQS.map((faq) => (
              <div key={faq.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{faq.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-4">Where this page sits, and where it doesn&apos;t</h2>
          <p className="text-[#888888] text-sm mb-4">
            This page owns one question: whether BitStarz has a no-deposit bonus, and what governs
            the no-deposit spins that do turn up regionally. Three neighbouring pages own the rest,
            and none of them repeats the others:
          </p>
          <ul className="space-y-3 text-[#888888] text-sm mb-2">
            <li className="flex gap-3">
              <span className="text-[#7BB8D4] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7BB8D4] flex-shrink-0" />
              <span className="leading-relaxed">
                <Link href="/bonus/free-spins" className="text-[#7BB8D4] hover:underline">
                  Our free-spins comparison
                </Link>{' '}
                owns the spin-by-spin breakdown: BitStarz against Mirax and 7Bit, cell by cell,
                on count, eligible games, wagering and cashout, each cell carrying its own T&amp;C
                citation. If you want the §1.1 cap set against what rival operators publish, read
                that rather than this.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#7BB8D4] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7BB8D4] flex-shrink-0" />
              <span className="leading-relaxed">
                <Link href="/reviews/bitstarz/withdrawal" className="text-[#7BB8D4] hover:underline">
                  The BitStarz withdrawal page
                </Link>{' '}
                owns the cashier: clearing times per coin, what triggers a hold, and the fee
                position in full.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#7BB8D4] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7BB8D4] flex-shrink-0" />
              <span className="leading-relaxed">
                <Link href="/bonus/no-deposit-bonus" className="text-[#7BB8D4] hover:underline">
                  The no-deposit bonus category page
                </Link>{' '}
                covers which casinos in our ratings run no-deposit offers at all, and what the
                structure typically costs a player.
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-12 pt-10 border-t border-[#222222] text-center">
          <p className="text-[#888888] text-sm mb-4">
            Ready to take the four-deposit welcome package instead?
          </p>
          <CTAButton href={casino.affiliateUrl} label={`Visit ${casino.name}`} variant="primary" size="lg" external />
        </section>
      </div>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-3 text-center">
      <div className="text-white font-bold text-sm">{value}</div>
      <div className="text-[#555555] text-xs mt-0.5">{label}</div>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-white mt-12 mb-4">{children}</h2>
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[#bbbbbb] text-base leading-relaxed mb-4">{children}</p>
}

function KeyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[#bbbbbb] text-base mb-6">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="text-[#7BB8D4] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7BB8D4] flex-shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ───────────── BitStarz: lead with the negative finding, then the clause that
   governs the spins that do appear. Answer-statement discipline throughout:
   every H2 is answered in its own first sentence, because this cluster exists
   to be extracted by assistants as much as read. ───────────── */
function BitstarzBonusContent({
  minDeposit,
  bonusScore,
}: {
  minDeposit: string
  bonusScore: number
}) {
  return (
    <>
      <Para>
        BitStarz does not run a standing no deposit bonus. There is no code that hands a new
        account free spins or free credit before it funds, and any affiliate page offering you
        one is either describing a regional promotion that may not exist in your country or
        inventing it outright. What BitStarz actually offers is a four-deposit welcome package
        worth up to 5 BTC plus 180 free spins, and a small rotating set of no-deposit
        promotions that appear in some markets and are governed by a specific clause worth
        understanding before you chase one.
      </Para>
      <Para>
        That clause is the reason this page exists. BitStarz publishes a €100 maximum cashout
        that applies to no-deposit bonuses and to nothing else. It is the only published cap of
        its kind anywhere in the eight operators we review, and it is the single most useful
        fact about no-deposit play at BitStarz, because it sets the ceiling on the entire
        exercise before you start.
      </Para>

      <SectionHeading>What exists instead: the four-deposit welcome package</SectionHeading>
      <Para>
        The BitStarz welcome offer is a deposit-based package spread across your first four
        deposits, worth up to 5 BTC in matched funds plus 180 free spins. The spins are not
        credited in one block. Per T&amp;C §2.7, 20 arrive instantly on the first deposit and
        the remaining 160 land at 20 per day for eight consecutive days, which means the pack
        takes over a week to fully deliver and rewards staying on the platform rather than
        claiming and leaving.
      </Para>
      <Para>
        The minimum deposit is {minDeposit} or the crypto equivalent. Eligible games for the spins are
        country-dependent rather than pinned to a named title in the terms (§2.8), so the slot
        you get depends on where you are playing from. Check the bonus section after login
        rather than trusting a title named on a third-party page.
      </Para>
      <KeyList
        items={[
          'Up to 5 BTC matched across four deposits, the largest BTC-denominated welcome ceiling in our catalogue.',
          '180 free spins total: 20 instantly on deposit one, then 20 per day for eight consecutive days (T&C §2.7).',
          'Eligible games vary by country and are not fixed to a named title in the terms (T&C §2.8).',
        ]}
      />

      <SectionHeading>The €100 cap in T&amp;C §1.1, and what it does not apply to</SectionHeading>
      <Para>
        BitStarz caps cashout from no-deposit bonuses at €100 under T&amp;C §1.1, and the scope
        of that clause is narrower than it first looks. It names registration spins, Weekly Free
        Spins Drops and Second Chance Spins. Those are the no-deposit routes, and whatever you
        win through them, €100 is the most that can leave the account from that bonus.
      </Para>
      <Para>
        The clause explicitly excludes the welcome pack. So the 180 spins that come with a
        funded deposit are not capped at €100, and no separate cap is documented for them
        anywhere in the terms. This is the distinction affiliate pages get wrong most often,
        usually by quoting the €100 figure against the welcome spins and making the package look
        far worse than it is. The practical read: if you are playing no-deposit spins at
        BitStarz, treat €100 as the realistic ceiling on the whole exercise and size your
        expectations accordingly. If you are playing the welcome pack, that ceiling is not
        yours.
      </Para>
      <Para>
        We have not restated the full free-spins comparison here on purpose.{' '}
        <Link href="/bonus/free-spins" className="text-[#7BB8D4] hover:underline">
          Our free-spins page
        </Link>{' '}
        already sets this clause against what Mirax and 7Bit publish, cell by cell and with each
        cell sourced, including the gaps where an operator documents nothing at all.
      </Para>

      <SectionHeading>What the bonus actually costs: 40x wagering, and no cashier fee</SectionHeading>
      <Para>
        The real cost of a BitStarz bonus is the wagering multiplier, not a fee. Winnings from
        free spins carry a 40x wagering requirement per T&amp;C §2.3, and match bonuses run to
        the same 40x. On a bonus balance of any size that is the number that decides whether the
        offer is worth taking: 40x on a $100 bonus is $4,000 of turnover before the balance
        unlocks, and until it unlocks a withdrawal attempt will stall or forfeit the locked
        portion.
      </Para>
      <Para>
        On fees, the live terms are unambiguous and worth stating plainly because we previously
        got this wrong. BitStarz documents no fees on deposits or withdrawals at all. An earlier
        version of our BitStarz coverage reported a 25% administrative fee on bonus-related
        withdrawals; that claim failed re-verification against the live terms in July 2026, no
        such clause exists, and it was removed across the site with a published correction. The
        cost of a BitStarz bonus is the playthrough, and nothing else at the cashier.{' '}
        <Link href="/reviews/bitstarz/withdrawal" className="text-[#7BB8D4] hover:underline">
          The withdrawal page
        </Link>{' '}
        carries the cashier mechanics in full, and{' '}
        <Link href="/research/crypto-casino-bonus-transparency" className="text-[#7BB8D4] hover:underline">
          our bonus transparency research
        </Link>{' '}
        carries the correction record.
      </Para>

      <SectionHeading>Why we do not publish a BitStarz bonus code</SectionHeading>
      <Para>
        We do not publish a BitStarz bonus code, and that is a deliberate editorial position
        rather than an oversight. Codes for this operator change by market and by campaign, we
        hold no code we have verified against the live promotions page, and publishing one we
        cannot verify would be exactly the behaviour that makes affiliate bonus pages useless.
        A code that has quietly expired costs a reader a bonus they thought they were claiming.
      </Para>
      <Para>
        If a no-deposit promotion is live in your country it will appear in the bonus section of
        your account after registration, where the terms attached to it are the ones that
        actually bind. Read the cashout cap on that specific promotion before playing it: §1.1
        sets €100 as the standing figure for the named no-deposit routes, but an individual
        campaign can carry its own terms.
      </Para>

      <SectionHeading>Is the welcome package worth taking?</SectionHeading>
      <Para>
        It depends entirely on whether you were going to deposit anyway. At 40x, the welcome
        package is a reasonable structure for a player who intends to put real volume through
        the platform over a week or more, which is the shape the eight-day spin drip is designed
        for. It is a poor structure for someone depositing once to test the site, because the
        spins arrive too slowly to be used and the wagering will not clear.
      </Para>
      <Para>
        The honest summary: BitStarz scores {bonusScore}/10 on our bonus fairness measure, which is
        strong but not top of the catalogue, and the score reflects a clean fee position and
        clearly published terms rather than a generous multiplier. For the cross-operator view
        of how these structures compare, our{' '}
        <Link href="/guides/how-casino-bonuses-really-work" className="text-[#7BB8D4] hover:underline">
          guide to how casino bonuses really work
        </Link>{' '}
        does the arithmetic on why headline percentages mislead.
      </Para>
    </>
  )
}

const BITSTARZ_FAQS = [
  {
    question: 'Does BitStarz have a no deposit bonus in 2026?',
    answer:
      'No. BitStarz does not run a standing no deposit bonus for new players. The welcome offer is deposit-based: up to 5 BTC plus 180 free spins across your first four deposits. A small set of no-deposit promotions (registration spins, Weekly Free Spins Drops, Second Chance Spins) appears in some markets and is named in the terms, but there is no permanent no-deposit offer to claim on signup, and any site presenting one as standing is describing something we cannot verify.',
  },
  {
    question: 'What is the maximum you can win from a BitStarz no deposit bonus?',
    answer:
      'BitStarz caps cashout from no-deposit bonuses at €100 under T&C §1.1. The clause names registration spins, Weekly Free Spins Drops and Second Chance Spins, so €100 is the ceiling on whatever you win through those routes regardless of how the spins actually land. The same clause explicitly excludes the four-deposit welcome pack, and no separate cashout cap is documented for the welcome spins anywhere in the terms.',
  },
  {
    question: 'How are the 180 BitStarz free spins credited?',
    answer:
      'They arrive over nine days, not at once. Per T&C §2.7, 20 spins credit instantly on the first deposit and the remaining 160 are released at 20 per day for eight consecutive days. That means the pack rewards staying active on the platform for over a week, and a player who deposits once and leaves will collect only a fraction of the advertised 180.',
  },
  {
    question: 'What is the wagering requirement on the BitStarz bonus?',
    answer:
      'Winnings from BitStarz free spins carry a 40x wagering requirement under T&C §2.3, and match bonuses run to the same 40x. That is the real cost of the offer: 40x on a $100 bonus balance means $4,000 of turnover before the balance becomes withdrawable. A withdrawal attempted before the playthrough clears will stall or forfeit the locked portion, which is the single most common reason a BitStarz payout appears stuck.',
  },
  {
    question: 'Does BitStarz charge a fee to withdraw bonus winnings?',
    answer:
      'No. The live BitStarz terms document no fees on deposits or withdrawals at all, verified directly against the operator terms in July 2026. An earlier version of our coverage reported a 25% administrative fee on bonus-related withdrawals; that claim failed re-verification, no such clause exists in the current terms, and it was removed across this site with a published correction. Only standard blockchain network fees apply, and those are taken by the network rather than the casino.',
  },
]
