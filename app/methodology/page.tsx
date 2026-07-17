import type { Metadata } from 'next'
import Link from 'next/link'

// Trust layer (2026-07-07). This page describes the ACTUAL review process:
// T&C forensics, public complaint-record cross-checks, primary-source
// verification for legal/tax claims. No fabricated testing claims, no
// invented credentials. If the process changes, this page changes with it.

export const metadata: Metadata = {
  title: 'How We Review Crypto Casinos: Methodology',
  description:
    'How PlayMagpie scores crypto casinos: T&C forensics, public complaint records, primary-source verification for every legal and tax claim, and a verify-or-omit rule for facts. Full affiliate disclosure.',
  alternates: { canonical: '/methodology' },
  openGraph: {
    url: '/methodology',
    title: 'How We Review Crypto Casinos: Methodology',
    description:
      'How PlayMagpie scores crypto casinos, where the facts come from, and how the site makes money.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PlayMagpie Methodology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Review Crypto Casinos: Methodology',
    description:
      'How PlayMagpie scores crypto casinos, where the facts come from, and how the site makes money.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Methodology', item: 'https://www.playmagpie.com/methodology' },
  ],
}

export default function MethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Methodology</span>
        </nav>

        <h1 className="text-4xl font-extrabold text-white mb-4">How We Review Crypto Casinos</h1>
        <p className="text-[#888888] text-lg mb-12 leading-relaxed">
          Every score on this site traces back to something you can check yourself. This page
          explains exactly what we do, what we deliberately do not claim to do, and how the site
          makes money.
        </p>

        <div className="space-y-10 text-[#f5f5f5] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">What we actually do</h2>
            <p className="text-[#bbbbbb] mb-4">
              Our reviews are built on document work, not marketing copy. For every casino in the
              catalogue we read the full terms and conditions, the bonus terms, and the cashier and
              withdrawal policies, and we extract the specific numbers: wagering multipliers, maximum
              cashout caps, per-tier withdrawal behaviour, KYC trigger language, restricted-territory
              lists. Where a casino publishes a claim we cannot reconcile with its own terms, we say
              so in the review.
            </p>
            <p className="text-[#bbbbbb] mb-4">
              We cross-check operator behaviour against public complaint records, primarily
              AskGamblers and Casinomeister case threads. When a casino has documented unresolved
              complaints, they go in the review with the amounts: our Roobet review cites specific
              AskGamblers cases at $20k, $84k, $97k, $111k and $115k where verified accounts saw
              cashouts held in review, one of them publicly listed as unsolved. That casino carries
              our lowest trust score, and the affiliate commission we forgo by saying so is the cost
              of the score meaning anything.
            </p>
            <p className="text-[#bbbbbb]">
              For legal and tax claims (regulator names, statute citations, tax rates and thresholds)
              we verify against primary sources: the statute text, the regulator&apos;s own site, or
              the tax authority&apos;s published guidance. Ireland&apos;s tax-neutral position cites
              Section 613(2) of the Taxes Consolidation Act 1997; Sweden&apos;s one-bonus rule cites
              Spellag 14 kap. § 9 from riksdagen.se; Germany&apos;s holding-period rule cites § 23
              EStG. If a fact cannot be verified to a primary source, we omit it rather than guess:
              you will occasionally see &quot;we don&apos;t have a verified figure to share&quot; in
              our copy, and that phrasing is deliberate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">What we do not claim</h2>
            <p className="text-[#bbbbbb]">
              We are not a lab. We do not claim to run timed deposit-and-withdrawal experiments at
              every casino on every network, and we treat published withdrawal windows as the
              operator&apos;s claim, corroborated or challenged by the public record, rather than as
              our own measurement. Where our withdrawal-time figures come from the operator&apos;s
              stated processing windows, the review says so. No reviewer here has a gambling-industry
              credential to wave around, and we would rather show you sourced numbers you can check
              than invented authority you cannot.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">The four scores</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Trust Score',
                  desc: 'Licence quality and history, operator track record, documented complaint patterns and resolution behaviour, and consistency between what the T&Cs say and what the marketing claims. This is the score that moves most on negative evidence: documented withdrawal holds and confiscation clauses cost Roobet 2+ points against the field.',
                },
                {
                  title: 'Withdrawal Score',
                  desc: 'Stated processing windows, whether processing is automated or batch-manual, published or documented limits and holds, and the quality of the coin/network lineup for fast settlement. Sourced from cashier T&Cs and the public record.',
                },
                {
                  title: 'Bonus Fairness Score',
                  desc: 'The real expected value of the headline offer once wagering multipliers, bonus-vs-bonus-plus-deposit calculation, game contribution tables and max cashout caps are applied. A 500% match can score below a 100% match; the gap between BC.Game’s 220% rakeback headline and cash actually credited up front is exactly the kind of structure this score exists to surface.',
                },
                {
                  title: 'KYC Score',
                  desc: 'How much identity friction a player actually faces and when: none, at signup, at deposit, or triggered at withdrawal thresholds. Scored from the operator’s published policy and its documented behaviour at scale, which are not always the same thing.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-[#888888] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Fact-check dates</h2>
            <p className="text-[#bbbbbb]">
              Reviews and country guides carry a &quot;Facts last verified&quot; date. That date
              changes only when we have actually re-verified the page&apos;s claims against the
              operator&apos;s live terms or the primary legal sources, on a monthly audit cycle. We
              do not bump dates to look fresh: a page that says May 2026 was genuinely last verified
              in May 2026, and you should weigh time-sensitive claims accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How the site makes money</h2>
            <p className="text-[#bbbbbb]">
              PlayMagpie earns affiliate commission when a reader signs up at a casino through one of
              our links. Two structural facts keep that honest. First, no paid placements: operators
              cannot buy a position, a score, or a softer review, and the rankings order is
              trust-score order. Second, the reviews that cost us money exist: we publish documented
              criticism of commission-paying operators and have refused to build recommendation pages
              where the evidence did not support them. If we would not stand behind a
              recommendation, the commission is not worth it to us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">What we refuse to publish</h2>
            <p className="text-[#bbbbbb]">
              Some pages this site deliberately does not have: poker rankings (no operator in our
              catalogue is a genuine top pick for poker, so recommending one would be padding), a
              Japan recommendation page (promoting offshore gambling to Japanese users carries
              publisher-side criminal liability under the 2025 Basic Act amendment), and a deposit
              guide for the one operator whose documented withdrawal behaviour we cannot square with
              a deposit-funnel page. The refusals are part of the method: a list that never says no
              is an advert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Corrections</h2>
            <p className="text-[#bbbbbb] mb-4">
              If a number on this site is wrong or has gone stale (a regulator changed, a bonus
              restructured, a statute moved), tell us and we will check it against the source and
              fix it. Corrections are applied to the page itself, and material ones are noted.
            </p>
            <Link href="/contact" className="text-[#7BB8D4] hover:underline font-medium">
              Report a correction →
            </Link>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Who we are</h2>
            <p className="text-[#bbbbbb]">
              PlayMagpie is an independent publisher covering crypto casinos for players in Canada,
              Australia, New Zealand, Ireland and the Nordics, and is not owned by or affiliated with
              any casino operator. More on the site&apos;s editorial position is on the{' '}
              <Link href="/about" className="text-[#7BB8D4] hover:underline">about page</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
