import type { Metadata } from 'next'
import { casinos } from '@/lib/casinos'
import CasinoComparisonTable from '@/components/CasinoComparisonTable'
import TopRatedSection from '@/components/TopRatedSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Crypto Pokies for NZ Players 2026 — Slot Libraries Compared',
  description:
    'The best crypto pokies sites for New Zealand players in 2026. Slot library size, providers, provably-fair originals and NZD-friendly crypto deposit options compared.',
  alternates: {
    canonical: '/best-crypto-pokies-nz',
  },
  openGraph: {
    url: '/best-crypto-pokies-nz',
    title: 'Best Crypto Pokies for NZ Players 2026 — Slot Libraries Compared',
    description:
      'Crypto pokies sites ranked for NZ players — library size, providers, provably-fair originals and NZD-to-crypto deposit options.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Crypto Pokies NZ 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Pokies for NZ Players 2026 — Slot Libraries Compared',
    description: 'Crypto pokies sites ranked for NZ players — library size, providers and NZD-to-crypto deposit options.',
    images: ['/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Best Crypto Pokies NZ', item: 'https://www.playmagpie.com/best-crypto-pokies-nz' },
  ],
}

const faqs = [
  {
    question: 'Can NZ players legally play crypto pokies online?',
    answer: 'New Zealand\'s online gambling rules are mid-transition in 2026. The Department of Internal Affairs licensing scheme commences on 1 May 2026, with licensed-only enforcement following on 1 December 2026. Until that second milestone, offshore crypto casinos remain accessible to NZ players, who currently make up the bulk of online casino activity. Casual gambling winnings are not taxable for individuals under IRD rules.',
  },
  {
    question: 'Which casino has the biggest pokies library?',
    answer: 'BC.Game and Shuffle both list 10,000+ titles — the largest libraries in our rankings. Mirax Casino and 7Bit Casino each carry 7,000+ pokies. BitStarz sits at 3,000+ titles but pairs that with 100+ providers, the broadest provider list on the site. Library size alone is a weak signal — provider quality and RTP transparency matter more for serious play.',
  },
  {
    question: 'What are provably-fair pokies?',
    answer: 'Provably-fair pokies use cryptographic seeds that you can audit independently to verify the outcome wasn\'t manipulated. BC.Game, Duelbits Originals and Shuffle Originals are the three main providers of provably-fair house games on our list — typically slot, crash, plinko and dice variants. RTP on the top Originals titles is often 97–99%, higher than most third-party slots.',
  },
  {
    question: 'Can I deposit in NZD or do I need crypto?',
    answer: 'NZD bank transfers to offshore gambling sites are slow and frequently blocked. Most NZ players acquire BTC, ETH or USDT through Easy Crypto or Independent Reserve and deposit on-chain. USDT removes NZD-to-coin conversion drift between deposit and play and is the most common funding route for active NZ players.',
  },
  {
    question: 'Do these casinos accept New Zealand accounts?',
    answer: 'None of the casinos listed here have New Zealand in their restricted-countries list as of our last review pass — but eligibility can change without notice. Verify acceptance on the operator\'s own terms before depositing.',
  },
  {
    question: 'What RTP can I expect on crypto pokies?',
    answer: 'Most third-party slots from NetEnt, Pragmatic Play, Hacksaw Gaming and NoLimit City sit in the 95.5–96.5% RTP band — that\'s what you should treat as the realistic average across a session. Provably-fair Originals at BC.Game, Shuffle and Duelbits typically run higher at 97–99%. The trap to watch for is RTP variants: the same slot title can have a 96.5% and a 94% version, and operators can choose which to deploy. Always check the in-game info panel for the actual RTP at the operator you\'re playing on.',
  },
  {
    question: 'Do I pay tax on crypto pokies winnings in New Zealand?',
    answer: 'No, on the gambling side — casual gambling winnings are not income for individuals under IRD rules. The taxable activity is on the crypto side: IRD treats cryptoassets as property, and disposing of crypto (including to fund a casino deposit or convert winnings back to NZD) can trigger a taxable event independent of the casino round itself. If you on-ramp NZD → crypto → deposit → withdraw → NZD in a short window with no price movement, exposure is minimal. If you hold appreciated crypto for months before depositing, that disposal can trigger a taxable gain. Not tax advice — IRD\'s cryptoassets guidance is the authoritative reference.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function CryptoPokiesNZPage() {
  const ranked = [...casinos].sort((a, b) => b.trustScore - a.trustScore)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Best Crypto Pokies NZ</span>
        </nav>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">🇳🇿 NZ Crypto Pokies</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Best Crypto Pokies for NZ Players 2026
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            What NZ players actually want from a pokies site is a real-money library worth playing — not 50 reskinned
            knockoffs. These platforms carry the providers, the originals and the RTP transparency to make a session
            worth your bankroll.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Largest Library', value: '10,000+', sub: 'BC.Game and Shuffle' },
            { label: 'Most Providers', value: '100+', sub: 'BitStarz — broadest selection' },
            { label: 'Provably-Fair Originals', value: '3 sites', sub: 'BC.Game · Shuffle · Duelbits' },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#7BB8D4] mb-1">{s.value}</div>
              <div className="text-[#f5f5f5] text-sm font-medium">{s.label}</div>
              <div className="text-[#555555] text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Crypto Pokies Sites Ranked for NZ Players</h2>
          <CasinoComparisonTable casinos={ranked} />
        </section>

        <TopRatedSection
          title="Top Pokies Picks for NZ"
          subtitle="Library depth, provider quality, RTP transparency and crypto withdrawal speed for NZD-on-ramping players"
          casinos={ranked.slice(0, 3)}
        />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">What Actually Matters in a Pokies Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Provider Quality Over Title Count',
                body: 'A 10,000-title library padded with low-quality reskins is worse than 3,000 titles from Pragmatic Play, NetEnt and Evolution. BitStarz with 100+ providers across 3,000+ games is the cleanest signal of curation; Mirax pulls from the same top-tier providers at higher title count.',
              },
              {
                title: 'Provably-Fair Originals',
                body: 'BC.Game, Shuffle Originals and Duelbits Originals run on cryptographic seed mechanics you can audit yourself. The model: the operator commits a hashed server seed before play, you contribute a client seed, and each round combines both with a nonce to produce the result. After the session, the unhashed server seed is published — you can independently re-run the hash to confirm it matches what was committed before any round was played. Third-party RNG slots from NetEnt or Pragmatic Play are audited by labs like GLI or iTech Labs, but you can\'t verify an individual spin; provably-fair lets you verify every one. RTP on top Originals is typically 97–99%, often higher than third-party slots — the trade-off is fewer titles in the catalogue.',
              },
              {
                title: 'RTP Transparency',
                body: 'The best operators publish RTP per title in-game. NetEnt and Pragmatic Play publish RTP at the provider level, so anything you find under their logo at BitStarz, Mirax or 7Bit is a known quantity. Operators that hide RTP behind generic "around 96%" copy aren\'t worth the time.',
              },
              {
                title: 'Volatility and Bonus-Round Mechanics',
                body: 'RTP is the long-run number; volatility is the variance around it. Two pokies with the same 96% RTP can pay very differently — one drips small wins frequently, the other accumulates losses then hits hard. High-volatility play suits bonus-clearance where you need a single hit large enough to wager through. Low-volatility play suits grinding through wagering with consistent small returns. Volatility is usually rated 1–5 in-game; match the rating to your bankroll plan before committing.',
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
          <h2 className="text-2xl font-bold text-white mb-6">Pokies Library at Each Casino</h2>
          <div className="space-y-4">
            {[
              {
                slug: 'bc-game',
                name: 'BC.Game',
                summary: '10,000+ titles including the BC.Game provably-fair Originals library. 100+ cryptocurrencies accepted with no-KYC throughout and instant-to-10-minute withdrawals. The widest crypto-deposit coverage of any operator on the list — useful if you on-ramp through Easy Crypto into something other than BTC.',
              },
              {
                slug: 'shuffle',
                name: 'Shuffle',
                summary: '10,000+ titles plus Shuffle Originals — provably-fair house slots, crash, plinko and dice with auditable seeds. The SHFL token ecosystem layers airdrop rewards and rakeback on top of standard play, which suits high-volume pokies players who want continuous return rather than one-shot bonuses.',
              },
              {
                slug: 'mirax-casino',
                name: 'Mirax Casino',
                summary: '7,000+ titles from Evolution, Pragmatic Play and NetEnt — the cleanest provider lineup at this library size. The 325% up to $3,250 welcome package is the most aggressive on the list; expect wagering to be cleared on slots before any cash-out, which is standard for bonus-clearance pokies sessions.',
              },
              {
                slug: '7bit-casino',
                name: '7Bit Casino',
                summary: '7,000+ titles with provably-fair originals included. No-KYC since 2014 — the longest unbroken anonymous-play record on the list — and 9.1/10 withdrawal score. The 1.5 BTC welcome cap is lower than some rivals but the cash-out side is consistently friction-free.',
              },
              {
                slug: 'bitstarz',
                name: 'BitStarz',
                summary: '3,000+ titles from 100+ providers — the broadest provider selection on the site even at lower headline title count. Multi-time "Best Bitcoin Casino" winner since 2014. Watch the 25% admin fee on bonus-related withdrawals if you\'re clearing the 5 BTC welcome.',
              },
              {
                slug: 'duelbits',
                name: 'Duelbits',
                summary: 'Smaller third-party library but Duelbits Originals — provably-fair slots, crash, plinko and dice — are the differentiator. RTP on top Originals is 97–99%. No-KYC for crypto play with sub-5-minute withdrawals across 12 supported coins.',
              },
              {
                slug: 'cloudbet',
                name: 'Cloudbet',
                summary: 'Lighter on pokies than the newer competitors but pairs the library with no withdrawal limits and a dual licence (Curaçao + Kahnawake). The 5 BTC welcome bonus is one of the largest available. Stronger sportsbook than pokies-first competitors — worth knowing if you split play.',
              },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/reviews/${c.slug}`}
                className="block bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
              >
                <div className="font-bold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors mb-1">
                  {c.name}
                </div>
                <p className="text-[#888888] text-sm leading-relaxed">{c.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">Typical RTP by provider category</h2>
          <p className="text-[#888888] leading-relaxed">
            RTP varies by individual title — the figures below are the published ranges most slots from each provider
            sit in. Specific titles can run higher or lower; always check the in-game info panel for the exact RTP at
            the operator you&apos;re playing on, since some casinos run lower-RTP variants of the same game from the
            same provider.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Provider category</th>
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Typical RTP range</th>
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: 'NetEnt slots', rtp: '95.5–96.5%', notes: 'Classic-style slots. Generally in the 96.0% band; some marquee titles slightly higher.' },
                  { cat: 'Pragmatic Play slots', rtp: '94–96.5%', notes: 'Wide variance. Be specific — operators can run lower-RTP variants of the same title.' },
                  { cat: 'Hacksaw Gaming slots', rtp: '96–96.5%', notes: 'High-volatility specialist. RTP narrow-banded around 96.x%.' },
                  { cat: 'NoLimit City slots', rtp: '96–96.5%', notes: 'Premium high-volatility output. RTP narrow-banded around 96.x%.' },
                  { cat: 'Megaways / BTG slots', rtp: '~96.5% baseline', notes: 'Framework-licensed; operators may run lower variants. Check the info panel.' },
                  { cat: 'Provably-fair Originals (BC.Game / Shuffle / Duelbits)', rtp: '97–99%', notes: 'In-house provably-fair titles typically top the RTP table.' },
                  { cat: 'Live dealer (Evolution etc.)', rtp: '~98.5–99.5% (table-specific)', notes: 'Blackjack with optimal play ~99.5%; European roulette ~97.3%; game-show formats lower.' },
                ].map((row, i) => (
                  <tr key={row.cat} className={`border-b border-[#222222] last:border-0 hover:bg-[#1a1a1a]/60 transition-colors ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}>
                    <td className="px-4 py-3.5 font-semibold text-[#f5f5f5] text-xs leading-relaxed">{row.cat}</td>
                    <td className="px-4 py-3.5 text-[#7BB8D4] text-xs font-semibold leading-relaxed">{row.rtp}</td>
                    <td className="px-4 py-3.5 text-[#888888] text-xs leading-relaxed hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#555555] text-xs">
            RTP ranges are provider-level published figures. The provably-fair Originals figures match the in-game RTP
            ranges documented for BC.Game, Shuffle and Duelbits Originals products.
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">Provider coverage at each casino we review</h2>
          <p className="text-[#888888] leading-relaxed">
            Honest framing: only one of the seven casinos in our reviews documents a specific provider lineup. For the
            others, library size and provably-fair Originals inclusion are confirmed, but specific third-party provider
            names aren&apos;t enumerated in our reviews. The summary below reflects exactly what&apos;s documented —
            check each operator&apos;s lobby for the current provider list before making a final decision.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Casino</th>
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Library size</th>
                  <th className="text-left px-4 py-3.5 text-[#888888] font-semibold hidden md:table-cell">Provider detail in our review</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { slug: 'mirax-casino', name: 'Mirax Casino', size: '7,000+ titles', detail: 'Evolution, Pragmatic Play, NetEnt explicitly listed' },
                  { slug: 'bitstarz', name: 'BitStarz', size: '3,000+ titles', detail: '"100+ providers" — broadest curation, specific names not enumerated' },
                  { slug: 'bc-game', name: 'BC.Game', size: '10,000+ titles', detail: 'Provably-fair Originals confirmed; third-party providers not enumerated' },
                  { slug: 'shuffle', name: 'Shuffle', size: '10,000+ titles', detail: 'Shuffle Originals confirmed; third-party providers not enumerated' },
                  { slug: '7bit-casino', name: '7Bit Casino', size: '7,000+ titles', detail: 'Provably-fair originals confirmed; third-party providers not enumerated' },
                  { slug: 'duelbits', name: 'Duelbits', size: 'Smaller third-party library', detail: 'Duelbits Originals (slots, crash, plinko, dice) confirmed' },
                  { slug: 'cloudbet', name: 'Cloudbet', size: 'Lighter than competitors', detail: 'Sportsbook is the differentiator; slots library narrower' },
                ].map((row, i) => (
                  <tr key={row.slug} className={`border-b border-[#222222] last:border-0 hover:bg-[#1a1a1a]/60 transition-colors ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}>
                    <td className="px-4 py-3.5">
                      <Link href={`/reviews/${row.slug}`} className="font-semibold text-[#f5f5f5] hover:text-[#7BB8D4] transition-colors text-xs">
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-[#7BB8D4] text-xs font-semibold leading-relaxed">{row.size}</td>
                    <td className="px-4 py-3.5 text-[#888888] text-xs leading-relaxed hidden md:table-cell">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#555555] text-xs">
            Mirax is the only casino whose third-party provider lineup is documented specifically in our review. For the
            others, we&apos;ve verified what the operator confirms about library size and Originals, but third-party
            provider rosters can change without notice — verify on the operator&apos;s own lobby.
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">Practical NZ Notes</h2>
          <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">NZD on-ramping</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                Easy Crypto is the NZ-native broker most retail players use to convert NZD to BTC, ETH or USDT.
                Independent Reserve is also active for Kiwi accounts. NZD bank transfers to offshore gambling sites are slow and
                frequently blocked, so most NZ pokies players acquire crypto first and deposit on-chain — see the full breakdown on the {' '}
                <Link href="/country/new-zealand" className="text-[#7BB8D4] hover:text-[#8fc4d8] transition-colors">
                  New Zealand crypto casinos page
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Stablecoins remove FX drift</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                USDT or USDC keeps deposited bankroll pegged to USD between sessions — meaningful when a pokies session
                runs over multiple weeks and crypto-side volatility would otherwise eat your balance independent of game outcomes.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Withdrawal speed at scale</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                If you hit a pokies win worth cashing out, withdrawal posture matters more than library size. See {' '}
                <Link href="/no-limit-withdrawal-casinos" className="text-[#7BB8D4] hover:text-[#8fc4d8] transition-colors">
                  no-limit withdrawal casinos
                </Link>{' '}
                for the cash-out side, and{' '}
                <Link href="/fast-withdrawal-casinos" className="text-[#7BB8D4] hover:text-[#8fc4d8] transition-colors">
                  fast-withdrawal casinos
                </Link>{' '}
                for the speed ranking.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Tax on pokies winnings — IRD position</h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-3">
                Casual gambling winnings are not income for individuals under IRD rules — the winnings themselves
                aren&apos;t taxable. The line moves if you can be argued to be in the &quot;business of gambling&quot;,
                which IRD applies narrowly (regular, professional-scale, demonstrable system); recreational pokies play
                falls clearly on the non-taxable side.
              </p>
              <p className="text-[#888888] text-sm leading-relaxed mb-3">
                The crypto side is where most of the actual tax mechanics live for NZ pokies players. IRD treats
                cryptoassets as property rather than currency. Disposing of crypto — including converting it to fund a
                casino deposit, or converting casino-withdrawn crypto back to NZD — can be a taxable event independent
                of the casino activity itself. The taxable amount depends on your acquisition cost and the value at
                disposal, and whether the asset was held with profit intent.
              </p>
              <p className="text-[#888888] text-sm leading-relaxed">
                Practical implication: if you on-ramp NZD → crypto → casino → crypto → NZD in a short window with no
                price movement, the crypto-disposal tax exposure is minimal. If you hold appreciated crypto for months
                before depositing, that disposal can trigger a taxable gain even before the casino round runs. None of
                this is tax advice — IRD&apos;s cryptoassets guidance is the authoritative reference.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-[#888888] text-sm mb-8">
            Common questions from NZ players researching crypto pokies sites in 2026.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{faq.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/country/new-zealand" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">NZ Crypto Casinos</div>
              <div className="text-[#888888] text-sm">Regulatory framing, NZD on-ramping and tax position</div>
            </Link>
            <Link href="/country/australia" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">Australia Crypto Casinos</div>
              <div className="text-[#888888] text-sm">AU-specific framing — Tier 1 market with similar pokies appetite</div>
            </Link>
            <Link href="/no-kyc-casinos" className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all">
              <div className="font-semibold text-[#f5f5f5] mb-1">No-KYC Casinos</div>
              <div className="text-[#888888] text-sm">Pokies without identity verification</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
