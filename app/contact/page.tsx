import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact PlayMagpie — Send Us Corrections & Suggestions',
  description:
    'Contact PlayMagpie with casino corrections, new platform suggestions, partnership enquiries or feedback. We read every message and respond promptly.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: '/contact',
    title: 'Contact PlayMagpie — Send Us Corrections & Suggestions',
    description:
      'Contact PlayMagpie with casino corrections, new platform suggestions, partnership enquiries or feedback.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact PlayMagpie' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact PlayMagpie — Send Us Corrections & Suggestions',
    description: 'Reach out with casino corrections, suggestions or partnership enquiries.',
    images: ['/og-image.png'],
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Contact Us</h1>
      <p className="text-[#888888] text-lg mb-10 leading-relaxed">
        Questions, corrections, casino suggestions or partnership enquiries — we read everything.
      </p>

      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 mb-10">
        <h2 className="text-[#f5f5f5] font-semibold">Email Us</h2>
        <p className="text-[#888888] text-sm mt-1 mb-2">Corrections, casino suggestions, partnership enquiries — we read everything.</p>
        <a
          href="mailto:support@playmagpie.com"
          className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm font-medium transition-colors"
        >
          support@playmagpie.com
        </a>
      </div>

      <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
        <h2 className="text-white font-bold mb-4">Send a Message</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[#888888] text-sm mb-1.5">Name</label>
            <input
              type="text"
              className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7BB8D4]/50 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-[#888888] text-sm mb-1.5">Email</label>
            <input
              type="email"
              className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7BB8D4]/50 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-[#888888] text-sm mb-1.5">Message</label>
            <textarea
              rows={5}
              className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7BB8D4]/50 transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>
          <button className="w-full bg-[#7BB8D4] hover:bg-[#8fc4d8] text-[#0a0a0a] font-bold py-3 rounded-lg transition-all text-sm">
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}
