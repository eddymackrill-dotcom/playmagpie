import type { Metadata } from 'next'
import { casinos } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best No-KYC Casinos 2026 — Play Without ID Verification',
  description:
    'Play without identity checks. The best no-KYC crypto casinos for 2026 let you sign up, deposit and withdraw without submitting documents. Ranked and rated.',
  alternates: {
    canonical: '/no-kyc-casinos',
  },
  openGraph: {
    url: '/no-kyc-casinos',
    title: 'Best No-KYC Casinos 2026 — Play Without ID Verification',
    description:
      'The best no-KYC crypto casinos for 2026 — sign up, deposit and withdraw without submitting identity documents.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best No-KYC Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best No-KYC Casinos 2026 — Play Without ID Verification',
    description: 'Top no-KYC crypto casinos for 2026 — play instantly without submitting ID documents.',
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
            Best No-KYC Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Sign up in minutes. No passport, no selfie, no utility bill. These platforms let you play with full
            crypto anonymity — deposit, play and withdraw without submitting a single document.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'True No-KYC Casinos', value: `${noKyc.length}`, sub: 'Zero verification required' },
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

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">True No-KYC Casinos</h2>
          <p className="text-[#888888] text-sm mb-6">Zero verification required — sign up and play immediately</p>
          <CasinoComparisonTable casinos={noKyc} />
        </section>

        {lightKyc.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Light KYC Casinos</h2>
            <p className="text-[#888888] text-sm mb-6">Email confirmation only — full KYC triggered only at high limits</p>
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
              <strong className="text-white">True no-KYC</strong> means you can register with an email address, deposit
              crypto and withdraw without ever submitting identity documents. The casino never sees your name, address
              or government ID.
            </p>
            <p>
              <strong className="text-white">Light KYC</strong> casinos require minimal upfront verification — usually
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
            Full reviews for each no-KYC casino — verification requirements tested, withdrawal times verified.
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
                    {casino.kycLevel} KYC
                  </span>
                </div>
                <p className="text-[#888888] text-xs">{casino.withdrawalTime}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/fast-withdrawal-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Fast Withdrawal Casinos</div>
              <div className="text-[#888888] text-sm">No-KYC and fastest payout times combined</div>
            </Link>
            <Link href="/best-crypto-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">All Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Full rankings across all categories</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
