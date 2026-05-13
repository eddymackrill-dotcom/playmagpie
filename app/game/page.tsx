import type { Metadata } from 'next'
import Link from 'next/link'
import { GAME_TYPES } from '@/lib/programmatic'

export const metadata: Metadata = {
  title: 'Crypto Casinos by Game Type — PlayMagpie',
  description:
    'Find the best crypto casinos for your favourite game. Compare casinos for slots, blackjack, live dealer and more.',
  alternates: { canonical: '/game' },
  openGraph: {
    url: '/game',
    title: 'Crypto Casinos by Game Type — PlayMagpie',
    description:
      'Find the best crypto casinos for your favourite game. Compare casinos for slots, blackjack, live dealer and more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Crypto Casinos by Game Type' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casinos by Game Type — PlayMagpie',
    description:
      'Find the best crypto casinos for your favourite game. Compare casinos for slots, blackjack, live dealer and more.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Crypto Casinos by Game Type', item: 'https://playmagpie.com/game' },
  ],
}

export default function GameHubPage() {
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
          <span className="text-[#f5f5f5]">Crypto Casinos by Game Type</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Crypto Casinos by Game Type</h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            Different games favour different casinos — game libraries, providers, bonus contributions and bet
            limits all shift depending on what you actually play.
          </p>
        </div>

        <section className="mb-10 prose prose-invert max-w-none">
          <p className="text-[#888888] leading-relaxed">
            A casino built for slots-heavy play is not necessarily the right choice for a live dealer regular or a
            dedicated crash hunter. Game contribution to wagering requirements alone can swing the value of a
            welcome bonus by 10x between game types, and provider breadth varies more than most marketing pages
            admit. Browse by your preferred game category below to see which crypto casinos offer the strongest
            library, best bonus terms and highest-RTP variants for that format. Every casino we rank is
            independently scored — no paid placements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Choose a Game</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAME_TYPES.map((game) => (
              <Link
                key={game.slug}
                href={`/game/${game.slug}`}
                className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] rounded-2xl p-5 transition-all group"
              >
                <h3 className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-lg">
                  {game.name}
                </h3>
                <div className="mt-3 text-xs text-[#555555] group-hover:text-[#7BB8D4] transition-colors">
                  View {game.name} casinos →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
