import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import { casinoLastReviewed } from '@/lib/last-reviewed'
import CTAButton from '@/components/CTAButton'

// /reviews/bitstarz/payid (published 2026-09-05, September slate slot 4 of 8).
// THE FRAME, decided under the corrected brief: this is the Australian
// funding-routes page, and it answers the PayID question HONESTLY rather
// than resolving it, because it cannot be resolved from here: PayID is
// absent from the terms (owner full-terms read 2026-08-25, document stamp
// 25 Jun 2025), s8.6.1 defers the method list to the product UI, and the
// Australian logged-in cashier is not verifiable by the owner (no AU
// access; s3.6 restricts the UK). The page never implies an answer it does
// not have, names its unblock route, and states every verified clause with
// its provenance. Demand: grounding-only ("bitstarz deposit methods
// australia" 177, "bitstarz vs bitstarz payid" 68), no human keyword rows;
// visit case HYPOTHESIS, same footing as the txid guide.
// SCOPE SPLIT, binding: /reviews/bitstarz/payment-methods keeps the full
// method list and operational detail (linked, not duplicated); the FROZEN
// /country/australia/legal page keeps the law and banking-friction
// analysis (linked, never restated); this page owns the AU funding route.

const PAYID_SLUGS = ['bitstarz'] as const

export const dynamicParams = false

export function generateStaticParams() {
  return PAYID_SLUGS.map((slug) => ({ slug }))
}

const TITLE = 'BitStarz PayID: What Australians Can Actually Verify (2026)'
const DESCRIPTION =
  "PayID isn't in BitStarz's terms, and the Australian cashier can't be verified from outside. What the terms do confirm about funding from Australia, clause by clause."

export async function generateMetadata(props: PageProps<'/reviews/[slug]/payid'>): Promise<Metadata> {
  const { slug } = await props.params
  if (!(PAYID_SLUGS as readonly string[]).includes(slug)) return {}
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `/reviews/${slug}/payid` },
    openGraph: {
      url: `/reviews/${slug}/payid`,
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }],
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og-image.png'] },
  }
}

export default async function PayidPage(props: PageProps<'/reviews/[slug]/payid'>) {
  const { slug } = await props.params
  const casino = getCasinoBySlug(slug)
  if (!casino || !(PAYID_SLUGS as readonly string[]).includes(slug)) notFound()

  const pageUrl = `https://www.playmagpie.com/reviews/${slug}/payid`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: `${casino.name} Review`, item: `https://www.playmagpie.com/reviews/${slug}` },
      { '@type': 'ListItem', position: 3, name: 'PayID and Australian Funding', item: pageUrl },
    ],
  }

  const faqs = [
    {
      question: 'Does BitStarz accept PayID deposits?',
      answer:
        'We cannot verify it either way, and we will not copy an answer from other affiliate sites. PayID appears nowhere in the BitStarz Terms and Conditions (full document read 25 August 2026, document last updated 25 June 2025), but section 8.6.1 says available payment methods appear on the website itself, so the terms cannot settle what the Australian cashier shows. We have asked through the operator channel and this page will carry the dated answer when it lands.',
    },
    {
      question: 'Can Australians play at BitStarz at all?',
      answer:
        'Yes, with one carve-out. Section 3.6 of the terms lists restricted countries and Australia is not on it, so Australians can register and play. Separately, section 4.3.2 blacklists Australia for all NetEnt games, so that provider\'s titles are off the menu for Australian accounts.',
    },
    {
      question: 'What is the verified way to fund BitStarz from Australia?',
      answer:
        'Crypto. The cashier is crypto-first (BTC, ETH, LTC, DOGE, BCH and USDT per our verified list), and every named fiat payout route in the terms is non-Australian: bank transfer is EUR-only at 3 to 10 banking days, and the closed e-wallet list applies to USD depositors. No AUD payout route is named anywhere in the terms.',
    },
    {
      question: 'If I deposit one way, can I withdraw another?',
      answer:
        'The terms say no: section 8.7.13 requires withdrawals to return to the deposit method. That makes your deposit choice a payout choice too, which is the single most practical fact on this page: fund with a rail you would be happy to be paid back on.',
    },
  ]

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/reviews/${slug}`} className="hover:text-white transition-colors">{casino.name} Review</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">PayID</span>
        </nav>

        <div className="mb-2">
          <span className="text-xs text-[#7BB8D4] font-semibold uppercase tracking-widest">Payments · Australia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Funding BitStarz From Australia: The PayID Question, Answered Honestly
        </h1>
        <p className="text-[#555555] text-xs mb-8">
          Facts last verified: {casinoLastReviewed[casino.slug] ?? 'May 2026'} ·{' '}
          <Link href="/methodology" className="text-[#7BB8D4]/80 hover:text-[#7BB8D4] hover:underline">how we verify</Link>
        </p>

        <p className="text-[#bbbbbb] text-lg leading-relaxed mb-8">
          The short answer is the honest one: we cannot tell you whether BitStarz accepts PayID, and neither
          can any review site that has not seen the Australian cashier while logged in. What we can do is show
          you exactly what the operator&apos;s own terms verify about funding an account from Australia, why an
          Australian bank rail is structurally unlikely at an offshore crypto casino, and which route is
          actually documented to work.
        </p>

        <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6 mb-10">
          <div className="text-[#7BB8D4] text-xs font-bold uppercase tracking-widest mb-2">PayID status: unverified, and here is the provenance</div>
          <p className="text-[#bbbbbb] text-sm leading-relaxed">
            We read the full BitStarz Terms and Conditions on 25 August 2026 (the document&apos;s own stamp:
            last updated 25 June 2025). PayID appears nowhere in them. That is not the same as &quot;not
            accepted&quot;: section 8.6.1 says the available payment methods appear on the website, so the
            cashier can carry options the terms never name, and the Australian cashier view is exactly what we
            cannot access from outside Australia. We will not fill that gap by copying other affiliate sites,
            because operator payment claims are the class of claim that gets duplicated between sites and is
            wrong about half the time. We have put the question to the operator channel; when a dated, named
            answer arrives, it goes here.
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#f5f5f5] mt-8 mb-2">Why an Australian bank rail is the unlikely candidate</h2>
        <p className="text-[#888888] leading-relaxed mb-4">
          PayID is an addressing layer for Australian bank transfers: it moves AUD between Australian bank
          accounts. BitStarz is an offshore casino whose terms name no AUD payout route at all, and the
          Australian regulatory machinery is squarely aimed at exactly this kind of rail: ACMA blocks offshore
          gambling sites, and the Gambling Reform Bill passed in August 2026 carries payment-blocking duties
          for banks once it commences. The law and the friction analysis live on{' '}
          <Link href="/country/australia/legal" className="text-[#7BB8D4] hover:underline">our Australia legality page</Link>
          {' '}and we will not restate them here; the practical consequence for this page is that even if a
          PayID option appeared in the cashier tomorrow, it would be swimming against every current in that
          analysis.
        </p>

        <h2 className="text-xl font-bold text-[#f5f5f5] mt-8 mb-2">What the terms DO verify about funding, clause by clause</h2>
        <p className="text-[#888888] leading-relaxed mb-4">
          Everything below is from the same 25 August 2026 full-terms read, cited by section so you can hold
          us to it.
        </p>
        <ul className="space-y-3 text-[#888888] text-sm leading-relaxed list-disc pl-5 mb-6">
          <li><span className="text-[#f5f5f5] font-medium">Australians can register and play (s3.6):</span> Australia is not on the restricted-countries list. One carve-out: s4.3.2 blacklists Australia for all NetEnt games.</li>
          <li><span className="text-[#f5f5f5] font-medium">Withdrawals return to the deposit method (s8.7.13):</span> your funding choice is also your payout choice. This is the mechanic that makes the deposit decision matter.</li>
          <li><span className="text-[#f5f5f5] font-medium">Bank transfer is EUR-only (s8.7.7):</span> 3 to 10 banking days, and USD payouts are barred from bank transfer. No AUD bank route is named anywhere.</li>
          <li><span className="text-[#f5f5f5] font-medium">USD depositors get a closed e-wallet list (s8.7.9):</span> EcoPayz, Interac, Instadebit, iDebit, MiFinity, MuchBetter. PayID is not among them.</li>
          <li><span className="text-[#f5f5f5] font-medium">No withdrawal fees (s8.7.10):</span> neither BitStarz nor its payment processor charges them; network fees on crypto are the chain&apos;s, not the casino&apos;s.</li>
          <li><span className="text-[#f5f5f5] font-medium">1x wagering before withdrawal (s9.9):</span> deposits must be wagered once before cashing out, the anti-laundering floor rather than a bonus condition.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#f5f5f5] mt-8 mb-2">The route that is actually documented: crypto</h2>
        <p className="text-[#888888] leading-relaxed mb-4">
          BitStarz runs a crypto-first cashier: BTC, ETH, LTC, DOGE, BCH and USDT per our verified list, with
          the minimums, per-coin behaviour and the full method detail on{' '}
          <Link href={`/reviews/${slug}/payment-methods`} className="text-[#7BB8D4] hover:underline">the BitStarz payment methods page</Link>
          , which owns that territory. For an Australian the practical shape is the one already mapped on{' '}
          <Link href="/guides/is-crypto-safe-at-australian-casinos" className="text-[#7BB8D4] hover:underline">our Australian crypto-safety guide</Link>
          : the supervised step is a registered Australian exchange, the on-chain transfer replaces the bank
          rail entirely, and under s8.7.13 the same route carries your winnings back. That is not a claim that
          crypto is frictionless; it is the observation that it is the one funding route the operator&apos;s
          own documents and our own verification actually support.
        </p>

        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 my-8">
          <p className="text-[#888888] text-sm leading-relaxed mb-4">
            If the funding question is settled and you want the operator itself, the full review covers scores,
            bonuses and withdrawal behaviour; the button goes to the casino.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <CTAButton href={casino.affiliateUrl} label={`Visit ${casino.name}`} variant="primary" size="md" external />
            <CTAButton href={`/reviews/${slug}`} label="Read the full review" variant="secondary" size="md" />
          </div>
        </div>

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-[#f5f5f5] mb-6">PayID and Australian funding: FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{f.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link href={`/reviews/${slug}`} className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to the {casino.name} review
          </Link>
        </div>
      </div>
    </>
  )
}
