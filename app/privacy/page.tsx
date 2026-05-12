import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | PlayMagpie',
  description: 'PlayMagpie privacy policy — how we collect, use and protect your data.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    url: '/privacy',
    title: 'Privacy Policy | PlayMagpie',
    description: 'PlayMagpie privacy policy — how we collect, use and protect your data.',
  },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
      <p className="text-[#888888] text-sm mb-10">Last updated: January 2026</p>

      <div className="space-y-8 text-[#f5f5f5] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Who We Are</h2>
          <p>PlayMagpie is an independent affiliate review website. We provide casino ratings, reviews and guides. We do not operate any gambling services ourselves.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Data We Collect</h2>
          <p className="mb-2">We collect the following types of data when you use this site:</p>
          <ul className="list-disc list-inside space-y-1 text-[#888888]">
            <li>Usage data via analytics (pages visited, session duration, referral source)</li>
            <li>Device and browser information for analytics</li>
            <li>Any information you voluntarily submit via our contact form</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-1 text-[#888888]">
            <li>To improve site content and user experience</li>
            <li>To respond to contact form submissions</li>
            <li>To track affiliate link clicks for commission purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. Affiliate Tracking</h2>
          <p>When you click a casino link on our site, we may use cookies or tracking parameters to record the referral. This allows us to earn commissions. Clicking a casino link does not create an account or share your personal data with the casino.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Third-Party Services</h2>
          <p>We use third-party analytics services. These services may collect non-personally-identifiable usage data in accordance with their own privacy policies.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Cookies</h2>
          <p>We use cookies for analytics and affiliate tracking. You can disable cookies in your browser settings; this will not prevent you from using the site but may affect tracking functionality.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. Your Rights</h2>
          <p>You have the right to request access to any personal data we hold about you, request deletion, or object to processing. Contact us at support@playmagpie.com.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">8. Contact</h2>
          <p>For privacy-related enquiries: <a href="mailto:support@playmagpie.com" className="text-[#7BB8D4] hover:text-[#8fc4d8] transition-colors">support@playmagpie.com</a></p>
        </section>
      </div>
    </div>
  )
}
