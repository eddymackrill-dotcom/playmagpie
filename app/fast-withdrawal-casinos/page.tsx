import type { Metadata } from 'next'
import { casinos } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fastest Withdrawal Casinos 2026 — Instant Crypto Payouts',
  description:
    'The fastest crypto casino withdrawals ranked for 2026. Every platform verified for payout speed — sub-15-minute payouts confirmed. Get your winnings instantly.',
  alternates: {
    canonical: '/fast-withdrawal-casinos',
  },
  openGraph: {
    url: '/fast-withdrawal-casinos',
    title: 'Fastest Withdrawal Casinos 2026 — Instant Crypto Payouts',
    description:
      'The fastest crypto casino withdrawals ranked for 2026. Sub-15-minute payouts verified — get your winnings instantly.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fastest Withdrawal Casinos 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fastest Withdrawal Casinos 2026 — Instant Crypto Payouts',
    description: 'Sub-15-minute crypto payouts verified. The fastest paying crypto casinos ranked for 2026.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Fast Withdrawal Casinos', item: 'https://www.playmagpie.com/fast-withdrawal-casinos' },
  ],
}

export default function FastWithdrawalPage() {
  const fastCasinos = [...casinos]
    .sort((a, b) => b.withdrawalScore - a.withdrawalScore)

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
          <span className="text-[#f5f5f5]">Fast Withdrawal Casinos</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#7BB8D4] animate-pulse" />
            <span className="text-[#7BB8D4] text-sm font-medium">Verified Payout Times</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Fastest Withdrawal Casinos 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Ranked purely on payout speed. Every casino below has been verified for crypto withdrawal times.
            No delays, no excuses — just fast cash.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Fastest Payout', value: 'Instant', sub: 'BC.Game' },
            { label: 'Average Time', value: '< 30 min', sub: 'Across top 3' },
            { label: 'No-KYC Fast Payouts', value: '3 sites', sub: 'On this list' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Fastest Crypto Casinos — Ranked by Withdrawal Speed</h2>
          <CasinoComparisonTable casinos={fastCasinos} />
        </section>

        <TopRatedSection
          title="Top Fast-Payout Casinos"
          casinos={fastCasinos.slice(0, 3)}
        />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">Why Withdrawal Speed Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'On-Chain vs Off-Chain',
                body: 'True crypto withdrawals go directly to your wallet on-chain. Casinos that use internal credits or convert to fiat first will always be slower and carry more risk.',
              },
              {
                title: 'KYC Delays',
                body: 'The most common cause of slow withdrawals is mid-process KYC verification. No-KYC casinos eliminate this entirely — your crypto clears without a document check.',
              },
              {
                title: 'Network Choice',
                body: 'Using TRX, SOL or MATIC for withdrawals means near-instant confirmation and fees under $0.01. BTC can take minutes to confirm depending on fee market.',
              },
              {
                title: 'Withdrawal Limits',
                body: 'Some casinos impose daily or weekly limits. We list the maximum single-withdrawal limit for each casino — critical if you hit a big win.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Fast Withdrawal Casino Reviews</h2>
          <p className="text-[#888888] text-sm mb-5">
            Read full reviews for each fast-payout casino — withdrawal times tested, bonus terms analysed, KYC requirements listed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fastCasinos.map((casino) => (
              <Link
                key={casino.slug}
                href={`/reviews/${casino.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors">
                    {casino.name}
                  </span>
                  <span className="text-[#7BB8D4] font-bold text-sm">{casino.withdrawalScore}/10</span>
                </div>
                <p className="text-[#888888] text-xs">{casino.withdrawalTime} · {casino.kycLevel} KYC</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Fastest payouts with zero identity verification</div>
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
