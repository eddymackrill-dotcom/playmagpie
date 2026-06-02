import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import CTAButton from '@/components/CTAButton'

const KYC_SLUGS = ['bitstarz'] as const

export function generateStaticParams() {
  return KYC_SLUGS.map((slug) => ({ slug }))
}

const META: Record<(typeof KYC_SLUGS)[number], { title: string; description: string }> = {
  bitstarz: {
    title: 'BitStarz KYC Requirements 2026: When Verification Triggers | PlayMagpie',
    description:
      'BitStarz runs Light KYC — most crypto players never upload a document. What actually triggers verification, which documents get asked for, and how the 25% bonus admin fee interacts with a held withdrawal.',
  },
}

export async function generateMetadata(props: PageProps<'/reviews/[slug]/kyc'>): Promise<Metadata> {
  const { slug } = await props.params
  if (!(KYC_SLUGS as readonly string[]).includes(slug)) return {}
  const meta = META[slug as (typeof KYC_SLUGS)[number]]
  const canonical = `/reviews/${slug}/kyc`
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

export default async function KycPage(props: PageProps<'/reviews/[slug]/kyc'>) {
  const { slug } = await props.params
  if (!(KYC_SLUGS as readonly string[]).includes(slug)) notFound()
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
        name: 'KYC',
        item: `https://www.playmagpie.com/reviews/${casino.slug}/kyc`,
      },
    ],
  }

  const faqs = BITSTARZ_FAQS

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
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
          <span className="text-[#f5f5f5]">KYC</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <div>
              <p className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">
                {casino.name} — KYC & Verification
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {slug === 'bitstarz' && 'BitStarz KYC: What Triggers Verification in 2026'}
              </h1>
              <p className="text-[#555555] text-xs mt-2">Last updated: June 2, 2026</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-extrabold text-[#7BB8D4]">{casino.kycScore}</div>
              <div className="text-[#888888] text-sm">KYC Score / 10</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Stat label="KYC Level" value={casino.kycLevel} />
            <Stat label="Min Deposit" value={casino.minDeposit} />
            <Stat label="Coins Supported" value={`${casino.acceptedCryptos.length}`} />
            <Stat label="Withdrawal Window" value={casino.withdrawalTime} />
          </div>

          <div className="flex gap-3 flex-wrap">
            <CTAButton href={casino.affiliateUrl} label={`Play at ${casino.name}`} variant="primary" size="lg" external />
            <CTAButton href={`/reviews/${casino.slug}`} label="Full Review" variant="secondary" size="lg" />
          </div>
        </div>

        {slug === 'bitstarz' && <BitstarzContent />}

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">{casino.name} KYC — FAQ</h2>
          <p className="text-[#888888] text-sm mb-8">
            The verification questions players actually ask before depositing at {casino.name}.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{faq.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-4">Compare KYC across the casinos we review</h2>
          <p className="text-[#888888] text-sm mb-6">
            KYC posture is an operator-level decision, not a coin-level one. Cross-shop the verification
            policy at the other casinos in our ratings:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KycCrossLink slug="bitstarz" name="BitStarz" level="Light" current={slug} />
            <KycCrossLink slug="bc-game" name="BC.Game" level="None" current={slug} />
            <KycCrossLink slug="cloudbet" name="Cloudbet" level="Light (at scale)" current={slug} />
          </div>
          <p className="text-[#888888] text-sm mt-6">
            For the category view of casinos that never ask for documents, see{' '}
            <Link href="/no-kyc-casinos" className="text-[#7BB8D4] hover:underline">
              our no-KYC crypto casinos hub
            </Link>
            , and{' '}
            <Link href="/guides/do-crypto-casinos-require-kyc" className="text-[#7BB8D4] hover:underline">
              the guide on whether crypto casinos require KYC
            </Link>{' '}
            for the cross-operator breakdown.
          </p>
        </section>

        <section className="mt-12 pt-10 border-t border-[#222222] text-center">
          <p className="text-[#888888] text-sm mb-4">
            Ready to deposit and start playing at {casino.name}?
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

function KycCrossLink({
  slug,
  name,
  level,
  current,
}: {
  slug: string
  name: string
  level: string
  current: string
}) {
  const isCurrent = slug === current
  if (isCurrent) {
    return (
      <div className="bg-[#0d0d0d] border border-[#7BB8D4]/30 rounded-2xl p-4">
        <div className="font-semibold text-[#7BB8D4] mb-1 text-sm">{name} — you are here</div>
        <div className="text-[#888888] text-xs">KYC level: {level}</div>
      </div>
    )
  }
  return (
    <Link
      href={`/reviews/${slug}/kyc`}
      className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-4 transition-all group block"
    >
      <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors mb-1 text-sm">
        {name} KYC
      </div>
      <div className="text-[#888888] text-xs">KYC level: {level}</div>
    </Link>
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

/* ───────────── BitStarz: Light KYC — lead with the two triggers ───────────── */
function BitstarzContent() {
  return (
    <>
      <Para>
        The honest answer to &quot;does BitStarz require KYC&quot; is: usually not, but it
        depends on what you do. BitStarz runs a Light KYC policy — crypto-only players
        running ordinary stakes generally deposit, play and withdraw without ever
        uploading a document. Verification is the exception, not the default, and it
        earns an 8.5/10 on our KYC score. This page covers exactly what flips it from
        exception to requirement.
      </Para>
      <Para>
        That distinction is what the Search Console data for &quot;bitstarz kyc&quot; and
        &quot;bitstarz kyc requirements&quot; suggests people are actually trying to settle
        before they sign up — so this page leads with the two trigger conditions, then
        covers the documents and the one interaction (the 25% bonus admin fee) that
        most often gets mistaken for a KYC hold.
      </Para>

      <SectionHeading>The two things that trigger BitStarz KYC</SectionHeading>
      <Para>
        In practice, Light KYC at BitStarz is triggered by one of two things. The first
        is fiat-side activity — BitStarz supports fiat as well as crypto, and the moment
        a withdrawal touches the regulated banking rails, identity verification becomes a
        compliance obligation the casino can&apos;t opt out of. The second is an automated
        compliance flag: account behaviour that the platform&apos;s monitoring reads as
        unusual (rapid pattern changes, mismatched deposit-and-withdrawal sources at
        larger amounts) can route a withdrawal into manual review.
      </Para>
      <Para>
        For a crypto-in, crypto-out player at normal stakes, neither condition typically
        fires. That is the whole point of the Light rating: the verification machinery
        exists, but the standard cashier path doesn&apos;t run through it.
      </Para>

      <SectionHeading>What documents BitStarz asks for — if it asks</SectionHeading>
      <Para>
        When verification is triggered, the request follows the standard pattern for a
        Curaçao-licensed operator: a government photo ID, a proof of address dated within
        the last few months, and — for fiat or card activity — proof of the payment
        method used. BitStarz processes these through live chat and its compliance team.
        We don&apos;t publish a turnaround figure we can&apos;t verify, but document review at
        this class of operator is typically same-day to a couple of days once everything
        is submitted correctly.
      </Para>
      <KeyList
        items={[
          'Government-issued photo ID (passport, national ID or driving licence) — the baseline document.',
          'Proof of address (utility bill or bank statement) dated within the recent window — requested for fiat-side or larger activity.',
          'Proof of payment method — only relevant if you used a card or fiat rail rather than pure crypto.',
        ]}
      />

      <SectionHeading>The 25% bonus admin fee is not a KYC hold — but it looks like one</SectionHeading>
      <Para>
        The single most common reason a BitStarz withdrawal sits in pending is not KYC
        at all — it&apos;s the 25% admin fee being calculated on a bonus-derived balance.
        If you took the 5 BTC welcome package and are withdrawing off cleared bonus
        money, 25% is deducted at the cashier, and the recalculation can briefly hold the
        payout. Players frequently misread that delay as identity verification. The two
        are unrelated: one is a compliance check, the other is a fee mechanic. We cover
        the fee in full on{' '}
        <Link href="/reviews/bitstarz/withdrawal" className="text-[#7BB8D4] hover:underline">
          the BitStarz withdrawal page
        </Link>
        .
      </Para>

      <SectionHeading>No published dollar threshold — and we won&apos;t invent one</SectionHeading>
      <Para>
        BitStarz does not publish a fixed amount above which KYC automatically triggers.
        We have not been able to source a verified figure, and per our editorial policy
        we would rather flag the gap than print a number we can&apos;t stand behind. The
        practical read from player reports is that ordinary crypto withdrawals clear
        without verification and that the trigger is behaviour-and-rail driven rather
        than a single hard ceiling. If a guaranteed-no-documents policy at any amount is
        your decisive factor, BitStarz&apos;s Light posture isn&apos;t the right fit — and the
        next section says where to look instead.
      </Para>

      <SectionHeading>BitStarz vs the no-KYC alternatives</SectionHeading>
      <Para>
        Among the casinos we review, BitStarz sits in the middle of the KYC spectrum:
        lighter than a Standard-KYC operator like Roobet, but not the zero-document
        posture of{' '}
        <Link href="/reviews/bc-game/kyc" className="text-[#7BB8D4] hover:underline">
          BC.Game
        </Link>
        , which requires no verification at all under an email-only signup. If you value
        BitStarz&apos;s decade-long track record and 3,000-game library and you&apos;re
        playing crypto-only at normal stakes, the Light posture rarely surfaces in
        practice. If anonymity at any withdrawal size is the priority, a no-KYC operator
        is the structurally correct choice. The category hub is{' '}
        <Link href="/no-kyc-casinos" className="text-[#7BB8D4] hover:underline">
          our no-KYC casinos page
        </Link>
        .
      </Para>
    </>
  )
}

const BITSTARZ_FAQS = [
  {
    question: 'Does BitStarz require KYC to withdraw crypto?',
    answer:
      'Not for routine crypto withdrawals. BitStarz runs a Light KYC policy — crypto-only players at ordinary stakes generally withdraw without uploading any documents. Verification is triggered by fiat-side activity or by an automated compliance flag on unusual account behaviour, not by every withdrawal. There is no published dollar threshold that forces KYC, and we don’t invent one.',
  },
  {
    question: 'What documents does BitStarz ask for during verification?',
    answer:
      'When KYC is triggered, BitStarz requests the standard set for a Curaçao-licensed operator: a government-issued photo ID, a recent proof of address (utility bill or bank statement), and — only if you used a card or fiat rail — proof of the payment method. Pure crypto players who never touch fiat rarely reach the proof-of-payment step.',
  },
  {
    question: 'Why is my BitStarz withdrawal pending if I wasn’t asked for ID?',
    answer:
      'The most common cause is the 25% admin fee being calculated on a bonus-derived balance, not a KYC check. If your withdrawal came off cleared welcome-bonus money, the fee recalculation can briefly hold the payout — players often mistake this for identity verification. Live chat will confirm which one is in play; the two mechanics are unrelated.',
  },
  {
    question: 'Can I stay anonymous at BitStarz?',
    answer:
      'For crypto-only play at normal stakes, you can typically deposit, play and withdraw without verifying your identity — but BitStarz reserves the right to trigger Light KYC on fiat activity or flagged behaviour, so it is not a guaranteed-anonymous platform by policy. If zero documents at any amount is a hard requirement, a no-KYC operator like BC.Game, 7Bit or Duelbits is the structurally correct choice.',
  },
  {
    question: 'Does verifying my BitStarz account make withdrawals faster?',
    answer:
      'It can remove a future friction point. If you complete any requested verification up front rather than mid-withdrawal, a later compliance flag won’t pause a payout while documents are reviewed. For players who expect to use fiat rails or play at higher volume, verifying early is the lower-friction path even though the casino doesn’t require it by default.',
  },
] as const
