import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | PlayMagpie',
  description: 'PlayMagpie terms of use — how you may use this website, our affiliate disclosures, age restrictions and limitation of liability.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    url: '/terms',
    title: 'Terms of Use | PlayMagpie',
    description: 'PlayMagpie terms of use — affiliate disclosures, age restrictions, limitation of liability.',
  },
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Terms of Use</h1>
      <p className="text-[#888888] text-sm mb-10">Last updated: January 2026</p>

      <div className="space-y-8 text-[#f5f5f5] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Acceptance</h2>
          <p>By using PlayMagpie you agree to these terms. If you do not agree, do not use the site.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Nature of Service</h2>
          <p>PlayMagpie is an affiliate review and information website. We do not operate gambling services, hold gambling licences or process payments. We provide information about third-party casino platforms.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. Affiliate Relationships</h2>
          <p>We have affiliate relationships with the casinos we list. We may earn commissions when you sign up through our links. This does not affect our editorial independence or scoring methodology.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. No Gambling Advice</h2>
          <p>Nothing on this site constitutes gambling advice. Casino reviews are editorial opinions based on our testing methodology. Past performance of any casino is not indicative of future performance. Gambling involves risk.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Age Restriction</h2>
          <p>This site is intended for adults aged 18 or over (or the legal gambling age in your jurisdiction, whichever is higher). We do not knowingly provide content to minors.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Jurisdiction</h2>
          <p>Online gambling may be restricted or illegal in your jurisdiction. It is your responsibility to verify that you are permitted to access gambling-related content and services from your location. We accept no liability for use of this site in restricted jurisdictions.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. Accuracy of Information</h2>
          <p>We endeavour to keep casino data accurate and up to date. Bonus terms, withdrawal times and other details change frequently. Always verify current terms directly with the casino before depositing.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">8. Limitation of Liability</h2>
          <p>PlayMagpie is not liable for any losses incurred through gambling, decisions made based on our content, or actions taken by third-party casino platforms.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">9. Intellectual Property</h2>
          <p>All content on this site is the property of PlayMagpie. You may not reproduce, republish or redistribute our reviews or scoring data without written permission.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">10. Contact</h2>
          <p>Legal enquiries: <a href="mailto:support@playmagpie.com" className="text-[#7BB8D4] hover:text-[#8fc4d8] transition-colors">support@playmagpie.com</a></p>
        </section>
      </div>
    </div>
  )
}
