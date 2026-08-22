import type { Metadata } from 'next'
import { casinos, kycDisplayLabel } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import CasinoCTAStrip, { type CTAStripCard } from '@/components/CasinoCTAStrip'
import Link from 'next/link'

// Top 3 of kycLevel='None' by trust. The page filters for true no-KYC.
const STRIP_CARDS: CTAStripCard[] = [
  {
    slug: 'bc-game',
    facts: [
      { label: 'KYC', value: 'Check at EUR 2,000 equivalent' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'Cryptos', value: '100+ supported' },
    ],
  },
  {
    slug: '7bit-casino',
    facts: [
      { label: 'KYC', value: 'Check at EUR 2,000 equivalent' },
      { label: 'Withdrawal', value: 'Instant to 10 minutes' },
      { label: 'Cryptos', value: '8 supported' },
    ],
  },
  {
    slug: 'duelbits',
    facts: [
      { label: 'KYC', value: 'None for crypto play' },
      { label: 'Withdrawal', value: 'Instant to 5 minutes' },
      { label: 'Cryptos', value: '12 supported' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'No-KYC Casinos: Where the Document Thresholds Actually Sit',
  description:
    'The no-KYC label usually ends at a threshold: EUR 2,000 equivalent at the operators we verified against live terms. Where anonymity stops, casino by casino.',
  alternates: {
    canonical: '/no-kyc-casinos',
  },
  openGraph: {
    url: '/no-kyc-casinos',
    title: 'No-KYC Casinos: Where the Document Thresholds Actually Sit',
    description:
      'Document-light crypto casinos ranked honestly: where the verification thresholds actually sit, operator by operator.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'No-KYC Casinos: Where the Document Thresholds Actually Sit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'No-KYC Casinos: Where the Document Thresholds Actually Sit',
    description: 'Where the no-KYC label actually stops: verification thresholds ranked, operator by operator.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'No-KYC Casinos', item: 'https://www.playmagpie.com/no-kyc-casinos' },
  ],
}

export default function NoKYCPage() {
  const noKyc = casinos.filter((c) => c.kycLevel === 'None')
  const lightKyc = casinos.filter((c) => c.kycLevel === 'Light')
  const allLowKyc = [...noKyc, ...lightKyc]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">No-KYC Casinos</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">🔓 Zero Verification</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            No-KYC Crypto Casinos, Honestly Ranked: Thresholds Included
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Sign up in minutes with an email address alone. These platforms keep routine crypto play document-free:
            deposit, play and withdraw without a passport, a selfie or a utility bill, up to each operator&apos;s own
            verification threshold. At BC.Game and 7Bit that check is standard at EUR 2,000 equivalent, applied at
            their discretion and capable of being triggered earlier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Document-Free Operators', value: `${noKyc.length}`, sub: 'No routine document checks' },
            { label: 'Light-KYC Options', value: `${lightKyc.length}`, sub: 'Email only, minimal checks' },
            { label: 'Fastest No-KYC', value: 'Instant', sub: 'BC.Game' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <CasinoCTAStrip
          framing="Top 3 true-no-KYC operators by trust score. Not paid placement."
          cards={STRIP_CARDS}
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">True No-KYC Casinos</h2>
          <p className="text-[#888888] text-sm mb-2">No routine document checks: sign up with an email and play immediately</p>
          <p className="text-[#bbbbbb] text-base leading-relaxed mb-6 max-w-3xl">
            Three of the eight crypto casinos we review are true no-KYC operators: BC.Game, 7Bit Casino and
            Duelbits all allow signup with an email address and crypto withdrawals without routine identity
            checks. 7Bit has operated since 2014 and runs a KYC check as standard at EUR 2,000 equivalent, applied at its discretion and sometimes earlier, and Duelbits
            has the fastest cashier window of the three at instant to 5 minutes.
          </p>
          <CasinoComparisonTable casinos={noKyc} />
        </section>

        {lightKyc.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Light KYC Casinos</h2>
            <p className="text-[#888888] text-sm mb-6">Email confirmation only; full KYC triggered only at high limits</p>
            <CasinoComparisonTable casinos={lightKyc} />
          </section>
        )}

        <TopRatedSection
          title="Top No-KYC Platforms"
          casinos={noKyc}
        />

        <section className="mt-12 bg-[#111111] border border-[#222222] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">Understanding No-KYC Casinos</h2>
          <div className="space-y-4 text-[#888888] text-sm leading-relaxed">
            <p>
              <strong className="text-white">Document-free</strong> means you can register with an email address,
              deposit crypto and withdraw without submitting identity documents on routine play. It does not mean the
              operator has undertaken never to ask. BC.Game and 7Bit both run a KYC check as standard at EUR 2,000
              equivalent, applied at their discretion and capable of being triggered earlier, so the honest description
              is a document-free range with a stated boundary rather than an absence of verification.
            </p>
            <p>
              <strong className="text-white">Light KYC</strong> casinos require minimal upfront verification, usually
              just email confirmation. Identity verification is only triggered if you reach specific withdrawal
              thresholds (often 2–5 BTC lifetime).
            </p>
            <p>
              <strong className="text-white">Why it matters:</strong> KYC delays are the most common reason withdrawals
              are held. No-KYC platforms process payouts in minutes rather than days. They also preserve financial
              privacy for players in jurisdictions with restrictive banking.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">No-KYC Casino Reviews</h2>
          <p className="text-[#888888] text-sm mb-5">
            Full reviews for each operator: verification posture as documented, and published withdrawal windows.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allLowKyc.map((casino) => (
              <Link
                key={casino.slug}
                href={`/reviews/${casino.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors">
                    {casino.name}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#7BB8D4]/10 text-[#7BB8D4] border border-[#7BB8D4]/20">
                    {kycDisplayLabel(casino)} KYC
                  </span>
                </div>
                <p className="text-[#888888] text-xs">{casino.withdrawalTime}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/high-roller-casinos#withdrawal-limits" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-Limit Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">No-KYC + uncapped cash-out: the privacy + scale combination</div>
            </Link>
            <Link href="/best-crypto-pokies-nz" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Best Crypto Pokies NZ</div>
              <div className="text-[#888888] text-sm">Provably-fair Originals: verify each spin yourself, no third party needed</div>
            </Link>
            <Link href="/guides/best-crypto-for-gambling" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Best Crypto for Gambling</div>
              <div className="text-[#888888] text-sm">Anonymity is the casino-side decision; the coin choice still matters for speed and fees</div>
            </Link>
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">No-KYC and fastest payout times combined</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
