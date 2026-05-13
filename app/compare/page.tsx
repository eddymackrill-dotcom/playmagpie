import type { Metadata } from 'next'
import Link from 'next/link'
import { casinos } from '@/lib/casinos'
import CasinoLogo from '@/components/CasinoLogo'

export const metadata: Metadata = {
  title: 'Compare Crypto Casinos Side by Side | PlayMagpie',
  description:
    'Head-to-head crypto casino comparisons. Compare withdrawal speed, bonus fairness, KYC policy and trust scores between the top-rated platforms.',
  alternates: { canonical: '/compare' },
  openGraph: {
    url: '/compare',
    title: 'Compare Crypto Casinos Side by Side | PlayMagpie',
    description: 'Side-by-side crypto casino comparisons covering withdrawals, bonuses, KYC and trust scores.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Compare Crypto Casinos' }],
  },
}

export default function ComparePage() {
  const pairs: { c1: (typeof casinos)[0]; c2: (typeof casinos)[0] }[] = []
  for (let i = 0; i < casinos.length; i++) {
    for (let j = i + 1; j < casinos.length; j++) {
      pairs.push({ c1: casinos[i], c2: casinos[j] })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="mb-10">
        <p className="text-[#7BB8D4] text-sm font-semibold uppercase tracking-wider mb-3">Head-to-Head</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f5f5f5] mb-4">Compare Crypto Casinos</h1>
        <p className="text-[#888888] text-lg leading-relaxed max-w-2xl">
          Side-by-side comparisons of the top-rated crypto casinos. We score withdrawal speed, bonus fairness, KYC policy and overall trust so you can make a confident choice.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pairs.map(({ c1, c2 }) => {
          const href = `/compare/${c1.slug}-vs-${c2.slug}`
          const w1 = c1.trustScore >= c2.trustScore ? c1 : c2
          return (
            <Link
              key={href}
              href={href}
              className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-5 transition-all group block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden flex-shrink-0">
                    <CasinoLogo src={c1.logo} name={c1.name} size={28} />
                  </div>
                  <span className="text-[#888888] text-xs font-bold">vs</span>
                  <div className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden flex-shrink-0">
                    <CasinoLogo src={c2.logo} name={c2.name} size={28} />
                  </div>
                </div>
                <div className="ml-1 min-w-0">
                  <div className="text-[#f5f5f5] font-semibold text-sm group-hover:text-[#7BB8D4] transition-colors leading-snug">
                    {c1.name} vs {c2.name}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                {[c1, c2].map((c) => (
                  <div key={c.slug} className="bg-[#1a1a1a] rounded-xl p-2.5">
                    <div className="text-[#7BB8D4] font-bold text-lg">{c.trustScore}</div>
                    <div className="text-[#555555] text-xs">{c.name}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#888888]">
                  Winner: <span className="text-[#f5f5f5] font-semibold">{w1.name}</span>
                </span>
                <span className="text-[#7BB8D4] text-xs font-semibold group-hover:underline">Compare →</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
