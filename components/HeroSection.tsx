import CTAButton from './CTAButton'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7BB8D4]/[0.06] via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7BB8D4]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#7BB8D4] animate-pulse" />
          <span className="text-[#7BB8D4] text-sm font-medium">Updated for 2026</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#f5f5f5] mb-6 leading-[1.05] tracking-tight">
          Best Crypto Casinos for{' '}
          <span className="text-[#7BB8D4]">
            Fast Withdrawals
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[#888888] mb-10 max-w-2xl mx-auto leading-relaxed">
          Independent ratings for crypto casinos — scored on withdrawal speed, bonus
          fairness, KYC friction and VIP value. Find your edge.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-14">
          <CTAButton href="/best-crypto-casinos" label="View Top Casinos" variant="primary" size="lg" />
          <CTAButton href="/fast-withdrawal-casinos" label="Fastest Withdrawals" variant="secondary" size="lg" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#888888]">
          {[
            '7 casinos reviewed',
            'Updated daily',
            'No paid placements',
            'Independent scores',
          ].map((stat) => (
            <div key={stat} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#7BB8D4]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
