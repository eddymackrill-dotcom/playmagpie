import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'

export const metadata: Metadata = {
  title: 'About PlayMagpie — Independent Crypto Casino Ratings',
  description:
    'PlayMagpie is an independent affiliate review site rating crypto casinos on withdrawal speed, bonus fairness, KYC friction and platform trust. No paid placements.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
    title: 'About PlayMagpie — Independent Crypto Casino Ratings',
    description:
      'PlayMagpie is an independent affiliate review site rating crypto casinos on withdrawal speed, bonus fairness, KYC friction and platform trust.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About PlayMagpie' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PlayMagpie — Independent Crypto Casino Ratings',
    description:
      'Independent crypto casino ratings scored on withdrawal speed, bonus fairness, KYC friction and platform trust.',
    images: ['/og-image.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">About PlayMagpie</h1>
      <p className="text-[#888888] text-lg mb-12 leading-relaxed">
        Independent ratings for crypto casinos. We score on what actually matters to players.
      </p>

      <div className="space-y-8 text-[#f5f5f5] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">What We Do</h2>
          <p>
            PlayMagpie rates and ranks crypto casinos based on four metrics that directly affect your
            experience: withdrawal speed, bonus fairness, KYC friction and platform trust. We do not accept
            paid placements. Our scores are independent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">How We Score Casinos</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Withdrawal Score',
                desc: 'We test real crypto withdrawal times across multiple networks and size tiers. We measure time from request to wallet arrival.',
              },
              {
                title: 'Bonus Fairness Score',
                desc: 'We read the full T&Cs. We calculate the real expected value of each bonus based on wagering requirements, game contributions and caps.',
              },
              {
                title: 'KYC Score',
                desc: 'Lower is better. We rate how much personal information a casino requires and when it asks for it — at signup, at deposit, or only at high withdrawal thresholds.',
              },
              {
                title: 'Trust Score',
                desc: 'Based on licence quality, platform history, player complaint rates and our own testing experience. The combined score across all four categories.',
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
          <h2 className="text-xl font-bold text-white mb-3">How We Make Money</h2>
          <p>
            PlayMagpie earns commission when you sign up at a casino through one of our links. This is
            standard affiliate revenue and does not affect our scores or rankings. We would rather lose
            a commission than recommend a casino we do not stand behind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
          <p className="mb-4">
            Have a correction, a casino to suggest or a complaint? We read everything.
          </p>
          <CTAButton href="/contact" label="Get in Touch" variant="secondary" />
        </section>
      </div>
    </div>
  )
}
