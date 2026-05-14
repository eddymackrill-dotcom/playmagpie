import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { casinos, getCasinoBySlug } from '@/lib/casinos'
import CTAButton from '@/components/CTAButton'
import CasinoLogo from '@/components/CasinoLogo'

export async function generateStaticParams() {
  const params: { slug: string }[] = []
  for (let i = 0; i < casinos.length; i++) {
    for (let j = 0; j < casinos.length; j++) {
      if (i !== j) {
        params.push({ slug: `${casinos[i].slug}-vs-${casinos[j].slug}` })
      }
    }
  }
  return params
}

export async function generateMetadata(props: PageProps<'/compare/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const vsIdx = slug.indexOf('-vs-')
  if (vsIdx === -1) return {}
  const c1 = getCasinoBySlug(slug.slice(0, vsIdx))
  const c2 = getCasinoBySlug(slug.slice(vsIdx + 4))
  if (!c1 || !c2) return {}
  const title = `${c1.name} vs ${c2.name} (2026) — Which Is Better? | PlayMagpie`
  const description = `${c1.name} vs ${c2.name}: independent head-to-head comparison of withdrawal speed, bonus fairness, KYC policy, supported cryptos and trust scores. Find out which wins in 2026.`
  return {
    title,
    description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      url: `/compare/${slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${c1.name} vs ${c2.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

function cmp(a: number, b: number): 'a' | 'b' | 'tie' {
  if (a > b) return 'a'
  if (b > a) return 'b'
  return 'tie'
}

function WinnerTag({ label }: { label: string }) {
  return (
    <span className="text-xs font-bold bg-[#7BB8D4]/10 border border-[#7BB8D4]/30 text-[#7BB8D4] px-3 py-1 rounded-full">
      Winner: {label}
    </span>
  )
}

function TieTag() {
  return (
    <span className="text-xs text-[#888888] bg-[#1a1a1a] border border-[#222222] px-3 py-1 rounded-full">
      Tied
    </span>
  )
}

export default async function ComparePage(props: PageProps<'/compare/[slug]'>) {
  const { slug } = await props.params
  const vsIdx = slug.indexOf('-vs-')
  if (vsIdx === -1) notFound()

  const c1 = getCasinoBySlug(slug.slice(0, vsIdx))
  const c2 = getCasinoBySlug(slug.slice(vsIdx + 4))
  if (!c1 || !c2) notFound()

  const overallWin = cmp(c1.trustScore, c2.trustScore)
  const withdrawalWin = cmp(c1.withdrawalScore, c2.withdrawalScore)
  const bonusWin = cmp(c1.bonusFairnessScore, c2.bonusFairnessScore)
  const kycWin = cmp(c1.kycScore, c2.kycScore)

  const winner = overallWin === 'a' ? c1 : overallWin === 'b' ? c2 : null
  const loser = overallWin === 'a' ? c2 : overallWin === 'b' ? c1 : null

  const cryptoWin = cmp(
    c1.acceptedCryptos.filter((s) => s !== '100+ more').length + (c1.acceptedCryptos.includes('100+ more') ? 100 : 0),
    c2.acceptedCryptos.filter((s) => s !== '100+ more').length + (c2.acceptedCryptos.includes('100+ more') ? 100 : 0),
  )

  const c1Cryptos = c1.acceptedCryptos.filter((s) => s !== '100+ more')
  const c2Cryptos = c2.acceptedCryptos.filter((s) => s !== '100+ more')
  const c1HasMore = c1.acceptedCryptos.includes('100+ more')
  const c2HasMore = c2.acceptedCryptos.includes('100+ more')

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${c1.name} vs ${c2.name} — Head-to-Head Comparison 2026`,
    description: `Independent comparison of ${c1.name} and ${c2.name} covering withdrawal speed, bonus fairness, KYC policy and trust score.`,
    url: `https://www.playmagpie.com/compare/${slug}`,
    publisher: { '@type': 'Organization', name: 'PlayMagpie', url: 'https://www.playmagpie.com' },
    dateModified: '2026-05-13',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare Casinos', item: 'https://www.playmagpie.com/compare' },
      { '@type': 'ListItem', position: 3, name: `${c1.name} vs ${c2.name}`, item: `https://www.playmagpie.com/compare/${slug}` },
    ],
  }

  const tableRows = [
    { label: 'Trust Score', a: `${c1.trustScore}/10`, b: `${c2.trustScore}/10`, win: overallWin },
    { label: 'Withdrawal Score', a: `${c1.withdrawalScore}/10`, b: `${c2.withdrawalScore}/10`, win: withdrawalWin },
    { label: 'Withdrawal Time', a: c1.withdrawalTime, b: c2.withdrawalTime, win: withdrawalWin },
    { label: 'Bonus Fairness Score', a: `${c1.bonusFairnessScore}/10`, b: `${c2.bonusFairnessScore}/10`, win: bonusWin },
    { label: 'KYC Level', a: c1.kycLevel, b: c2.kycLevel, win: kycWin },
    { label: 'KYC Score', a: `${c1.kycScore}/10`, b: `${c2.kycScore}/10`, win: kycWin },
    { label: 'Min Deposit', a: c1.minDeposit, b: c2.minDeposit, win: 'tie' as const },
    { label: 'Cryptos Accepted', a: `${c1Cryptos.length}${c1HasMore ? '+' : ''}`, b: `${c2Cryptos.length}${c2HasMore ? '+' : ''}`, win: cryptoWin },
    { label: 'VIP Program', a: c1.vipProgram ? 'Yes' : 'No', b: c2.vipProgram ? 'Yes' : 'No', win: cmp(c1.vipProgram ? 1 : 0, c2.vipProgram ? 1 : 0) },
    { label: 'Licence', a: c1.licence, b: c2.licence, win: 'tie' as const },
  ]

  const otherCasinos = casinos.filter((c) => c.slug !== c1.slug && c.slug !== c2.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">{c1.name} vs {c2.name}</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <p className="text-[#7BB8D4] text-sm font-semibold uppercase tracking-wider mb-4">Head-to-Head Comparison · 2026</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f5f5f5] mb-3">
            {c1.name} <span className="text-[#333333] px-2">vs</span> {c2.name}
          </h1>
          <p className="text-[#888888] text-lg">Which crypto casino is right for you?</p>
        </div>

        {/* Hero score cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {([{ c: c1, win: overallWin === 'a' }, { c: c2, win: overallWin === 'b' }] as const).map(({ c, win }) => (
            <div
              key={c.slug}
              className={`bg-[#111111] border rounded-2xl p-5 sm:p-6 text-center ${win ? 'border-[#7BB8D4]/40 shadow-[0_0_30px_rgba(123,184,212,0.07)]' : 'border-[#222222]'}`}
            >
              {win && overallWin !== 'tie' && (
                <div className="inline-block bg-[#7BB8D4]/10 border border-[#7BB8D4]/30 text-[#7BB8D4] text-xs font-bold px-3 py-1 rounded-full mb-3">
                  Overall Winner
                </div>
              )}
              {overallWin === 'tie' && (
                <div className="inline-block bg-[#1a1a1a] border border-[#333333] text-[#888888] text-xs px-3 py-1 rounded-full mb-3">
                  Tied
                </div>
              )}
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden">
                  <CasinoLogo src={c.logo} name={c.name} size={44} />
                </div>
              </div>
              <h2 className="font-bold text-[#f5f5f5] text-base sm:text-lg mb-1">{c.name}</h2>
              <div className={`text-4xl font-extrabold my-2 ${win ? 'text-[#7BB8D4]' : 'text-[#888888]'}`}>{c.trustScore}</div>
              <div className="text-[#555555] text-xs mb-4">Trust Score / 10</div>
              <CTAButton href={c.affiliateUrl} label="Play Now" variant="primary" size="sm" external />
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-[#f5f5f5] mb-3">Overview</h2>
          <p className="text-[#888888] leading-relaxed mb-3">
            Both {c1.name} and {c2.name} are established crypto casinos in 2026, but they serve different player priorities. {c1.name} holds a PlayMagpie trust score of {c1.trustScore}/10 against {c2.name}&apos;s {c2.trustScore}/10. This comparison evaluates every meaningful dimension — withdrawal speed, bonus fairness, KYC friction, cryptocurrency support and platform trust — so you can make an informed decision based on what matters most to you.
          </p>
          <p className="text-[#888888] leading-relaxed">
            PlayMagpie rates casinos independently. We earn commissions when you sign up through our affiliate links but this never influences our scores, category winners or overall recommendations. Our methodology is consistent across all casinos on the platform.
          </p>
        </div>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-5">Full Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222]">
                  <th className="text-left px-4 py-3 text-[#888888] font-semibold">Metric</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#f5f5f5]">{c1.name}</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#f5f5f5]">{c2.name}</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={row.label} className={`border-b border-[#222222] last:border-0 ${i % 2 !== 0 ? 'bg-[#111111]/40' : ''}`}>
                    <td className="px-4 py-3.5 text-[#888888]">{row.label}</td>
                    <td className={`px-4 py-3.5 text-center text-xs sm:text-sm ${row.win === 'a' ? 'text-[#7BB8D4] font-semibold' : 'text-[#f5f5f5]'}`}>
                      {row.a}{row.win === 'a' && <span className="ml-1 opacity-70">✓</span>}
                    </td>
                    <td className={`px-4 py-3.5 text-center text-xs sm:text-sm ${row.win === 'b' ? 'text-[#7BB8D4] font-semibold' : 'text-[#f5f5f5]'}`}>
                      {row.b}{row.win === 'b' && <span className="ml-1 opacity-70">✓</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Category Analysis */}
        <div className="space-y-8 mb-12">

          {/* Withdrawal Speed */}
          <section>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-xl font-bold text-[#f5f5f5]">Withdrawal Speed</h2>
              {withdrawalWin === 'tie' ? <TieTag /> : <WinnerTag label={withdrawalWin === 'a' ? c1.name : c2.name} />}
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-5">
                {([{ c: c1, score: c1.withdrawalScore, win: withdrawalWin === 'a' }, { c: c2, score: c2.withdrawalScore, win: withdrawalWin === 'b' }] as const).map(({ c, score, win }) => (
                  <div key={c.slug} className="text-center">
                    <div className={`text-3xl font-extrabold mb-1 ${win ? 'text-[#7BB8D4]' : 'text-[#888888]'}`}>{score}/10</div>
                    <div className="text-xs text-[#555555] mb-2">Withdrawal Score</div>
                    <div className="text-sm font-medium text-[#f5f5f5]">{c.withdrawalTime}</div>
                  </div>
                ))}
              </div>
              <p className="text-[#888888] leading-relaxed text-sm mb-3">
                {c1.name} processes crypto withdrawals in {c1.withdrawalTime.toLowerCase()}, earning a withdrawal score of {c1.withdrawalScore}/10. {c2.name} processes withdrawals in {c2.withdrawalTime.toLowerCase()}, scoring {c2.withdrawalScore}/10 in this category.
                {withdrawalWin === 'a' && ` ${c1.name} holds the clear advantage on payout speed. Players who prioritise immediate access to their funds will find ${c1.name} the stronger choice.`}
                {withdrawalWin === 'b' && ` ${c2.name} holds the clear advantage on payout speed. Players who prioritise immediate access to their funds will find ${c2.name} the stronger choice.`}
                {withdrawalWin === 'tie' && ` Both casinos are closely matched on withdrawal speed — this category is effectively a draw.`}
              </p>
              <p className="text-[#888888] leading-relaxed text-sm">
                Withdrawal times can vary significantly depending on blockchain network congestion and which cryptocurrency you choose. Bitcoin confirmations are slower than Litecoin, USDT (TRC-20) or other fast-finality networks. Always factor in on-chain confirmation time alongside the casino&apos;s internal processing window when comparing payout speed.
              </p>
            </div>
          </section>

          {/* Bonus Fairness */}
          <section>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-xl font-bold text-[#f5f5f5]">Bonus Fairness</h2>
              {bonusWin === 'tie' ? <TieTag /> : <WinnerTag label={bonusWin === 'a' ? c1.name : c2.name} />}
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-5">
                {([{ c: c1, score: c1.bonusFairnessScore, win: bonusWin === 'a' }, { c: c2, score: c2.bonusFairnessScore, win: bonusWin === 'b' }] as const).map(({ c, score, win }) => (
                  <div key={c.slug} className="text-center">
                    <div className={`text-3xl font-extrabold mb-1 ${win ? 'text-[#7BB8D4]' : 'text-[#888888]'}`}>{score}/10</div>
                    <div className="text-xs text-[#555555] mb-2">Bonus Score</div>
                    <div className="text-xs text-[#888888] leading-relaxed">{c.bonusSummary}</div>
                  </div>
                ))}
              </div>
              <p className="text-[#888888] leading-relaxed text-sm mb-3">
                The welcome offer from {c1.name} is {c1.bonusSummary} — rated {c1.bonusFairnessScore}/10 for fairness. {c2.name} offers {c2.bonusSummary}, rated {c2.bonusFairnessScore}/10.
                {bonusWin === 'a' && ` After accounting for wagering requirements and bonus term restrictions, ${c1.name} delivers better real expected value to the player.`}
                {bonusWin === 'b' && ` After accounting for wagering requirements and bonus term restrictions, ${c2.name} delivers better real expected value to the player.`}
                {bonusWin === 'tie' && ` Both casinos score equally on bonus fairness — the welcome packages are comparable in real value.`}
              </p>
              <p className="text-[#888888] leading-relaxed text-sm">
                Headline bonus figures can be deeply misleading. A 300% match bonus with 50x wagering requirements is typically worth far less than a 100% bonus with 30x requirements. PlayMagpie&apos;s bonus fairness scores account for wagering multipliers, game contribution percentages, maximum bet restrictions, time limits and withdrawal caps. Always read the full terms before depositing.
              </p>
            </div>
          </section>

          {/* KYC */}
          <section>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-xl font-bold text-[#f5f5f5]">KYC &amp; Privacy</h2>
              {kycWin === 'tie' ? <TieTag /> : <WinnerTag label={kycWin === 'a' ? c1.name : c2.name} />}
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-5">
                {([{ c: c1, score: c1.kycScore, win: kycWin === 'a' }, { c: c2, score: c2.kycScore, win: kycWin === 'b' }] as const).map(({ c, score, win }) => (
                  <div key={c.slug} className="text-center">
                    <div className={`text-3xl font-extrabold mb-1 ${win ? 'text-[#7BB8D4]' : 'text-[#888888]'}`}>{score}/10</div>
                    <div className="text-xs text-[#555555] mb-2">KYC Score</div>
                    <div className={`text-sm font-semibold ${c.kycLevel === 'None' ? 'text-[#7BB8D4]' : 'text-[#f5f5f5]'}`}>{c.kycLevel} KYC</div>
                  </div>
                ))}
              </div>
              <p className="text-[#888888] leading-relaxed text-sm mb-3">
                {c1.name} requires {c1.kycLevel.toLowerCase()} KYC (score: {c1.kycScore}/10). {c2.name} requires {c2.kycLevel.toLowerCase()} KYC (score: {c2.kycScore}/10).
                {kycWin === 'a' && ` ${c1.name} demands significantly less personal information from players, making it the better option for privacy-conscious users who want to minimise their data footprint.`}
                {kycWin === 'b' && ` ${c2.name} demands significantly less personal information from players, making it the better option for privacy-conscious users who want to minimise their data footprint.`}
                {kycWin === 'tie' && ` Both casinos have equivalent KYC policies.`}
              </p>
              <p className="text-[#888888] leading-relaxed text-sm">
                KYC friction is one of the defining differences between crypto casinos and traditional online gambling sites. A &quot;None&quot; KYC rating means you can sign up, deposit and withdraw without ever providing identity documents. &quot;Light&quot; KYC typically means documents are only requested above higher withdrawal thresholds. Higher KYC scores reflect fewer friction points and less personal data required to use the platform fully.
              </p>
            </div>
          </section>

          {/* Trust & Reputation */}
          <section>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-xl font-bold text-[#f5f5f5]">Trust &amp; Reputation</h2>
              {overallWin === 'tie' ? <TieTag /> : <WinnerTag label={overallWin === 'a' ? c1.name : c2.name} />}
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-5">
                {[c1, c2].map((c, idx) => {
                  const isWin = (idx === 0 && overallWin === 'a') || (idx === 1 && overallWin === 'b')
                  return (
                    <div key={c.slug} className="text-center">
                      <div className={`text-3xl font-extrabold mb-1 ${isWin ? 'text-[#7BB8D4]' : 'text-[#888888]'}`}>{c.trustScore}/10</div>
                      <div className="text-xs text-[#555555] mb-2">Trust Score</div>
                      <div className="text-xs text-[#888888] leading-relaxed">{c.licence}</div>
                    </div>
                  )
                })}
              </div>
              <p className="text-[#888888] leading-relaxed text-sm mb-3">
                {c1.name} holds a PlayMagpie trust score of {c1.trustScore}/10, operating under a licence from {c1.licence}. {c2.name} scores {c2.trustScore}/10, licensed by {c2.licence}. Trust scores are calculated from licence quality, player complaint volume, withdrawal reliability history and our direct testing experience.
              </p>
              <p className="text-[#888888] leading-relaxed text-sm">
                A higher trust score reflects lower player risk. Both platforms have been operational long enough to establish a track record, but score differences reflect real variations in licence rigour, complaint resolution speed and historical payout reliability. Both casinos reviewed here are considered legitimate operators — the trust scores indicate relative standing, not an endorsement of risk-free gambling.
              </p>
            </div>
          </section>

          {/* Cryptocurrencies */}
          <section>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-xl font-bold text-[#f5f5f5]">Supported Cryptocurrencies</h2>
              {cryptoWin === 'tie' ? <TieTag /> : <WinnerTag label={cryptoWin === 'a' ? c1.name : c2.name} />}
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-5">
                {[{ c: c1, cryptos: c1Cryptos, hasMore: c1HasMore }, { c: c2, cryptos: c2Cryptos, hasMore: c2HasMore }].map(({ c, cryptos, hasMore }) => (
                  <div key={c.slug}>
                    <div className="font-semibold text-[#f5f5f5] mb-2 text-sm">{c.name} — {cryptos.length}{hasMore ? '+' : ''} coins</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cryptos.map((coin) => (
                        <span key={coin} className="text-xs bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 text-[#7BB8D4] px-2 py-0.5 rounded-full">
                          {coin}
                        </span>
                      ))}
                      {hasMore && (
                        <span className="text-xs bg-[#1a1a1a] border border-[#222222] text-[#888888] px-2 py-0.5 rounded-full">
                          +100 more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#888888] leading-relaxed text-sm">
                {c1.name} accepts {c1Cryptos.length}{c1HasMore ? '+ ' : ' '}cryptocurrencies versus {c2.name}&apos;s {c2Cryptos.length}{c2HasMore ? '+' : ''}. Broader crypto support gives players more flexibility in funding their account and withdrawing winnings, and can significantly affect transaction fees and confirmation speed depending on which network you prefer to use.
              </p>
            </div>
          </section>

          {/* VIP Program */}
          <section>
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">VIP Program</h2>
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-5">
                {[c1, c2].map((c) => (
                  <div key={c.slug} className="text-center">
                    <div className={`text-2xl font-bold mb-2 ${c.vipProgram ? 'text-[#7BB8D4]' : 'text-[#888888]'}`}>
                      {c.vipProgram ? 'Yes' : 'No'}
                    </div>
                    <div className="text-xs text-[#555555]">{c.name} VIP</div>
                  </div>
                ))}
              </div>
              <p className="text-[#888888] leading-relaxed text-sm">
                {c1.vipProgram && c2.vipProgram
                  ? `Both ${c1.name} and ${c2.name} operate VIP loyalty programmes. These typically include tiered cashback on losses, higher withdrawal limits, dedicated account managers and exclusive promotions. High-volume players should compare the specific VIP tier structures directly with each casino, as cashback percentages and qualifying thresholds vary considerably.`
                  : !c1.vipProgram && !c2.vipProgram
                  ? `Neither ${c1.name} nor ${c2.name} currently operates a formal VIP loyalty programme.`
                  : `${c1.vipProgram ? c1.name : c2.name} operates a VIP loyalty programme while ${!c1.vipProgram ? c1.name : c2.name} does not. High-volume players will extract significantly more long-term value from ${c1.vipProgram ? c1.name : c2.name} through cashback rewards and elevated withdrawal limits.`
                }
              </p>
            </div>
          </section>

        </div>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-5">Pros &amp; Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[c1, c2].map((c) => (
              <div key={c.slug} className="bg-[#111111] border border-[#222222] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden flex-shrink-0">
                    <CasinoLogo src={c.logo} name={c.name} size={24} />
                  </div>
                  <h3 className="font-bold text-[#f5f5f5]">{c.name}</h3>
                  <span className="ml-auto text-[#7BB8D4] text-sm font-bold">{c.trustScore}/10</span>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-semibold text-[#7BB8D4] uppercase tracking-wider mb-2">Pros</div>
                  <ul className="space-y-2">
                    {c.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-[#888888]">
                        <span className="text-[#7BB8D4] mt-0.5 flex-shrink-0">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#222222]">
                  <div className="text-xs font-semibold text-[#555555] uppercase tracking-wider mb-2">Cons</div>
                  <ul className="space-y-2">
                    {c.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-[#888888]">
                        <span className="text-[#444444] mt-0.5 flex-shrink-0">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Verdict */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#f5f5f5] mb-5">Overall Verdict</h2>
          <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6">
            {winner && loser ? (
              <>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#7BB8D4]/30 flex items-center justify-center overflow-hidden">
                      <CasinoLogo src={winner.logo} name={winner.name} size={24} />
                    </div>
                    <span className="text-[#7BB8D4] font-bold text-lg">Overall Winner: {winner.name}</span>
                  </div>
                  <span className="text-xs bg-[#7BB8D4]/10 border border-[#7BB8D4]/30 text-[#7BB8D4] px-2 py-0.5 rounded-full">
                    {winner.trustScore}/10 vs {loser.trustScore}/10
                  </span>
                </div>
                <p className="text-[#888888] leading-relaxed mb-3">
                  Based on PlayMagpie&apos;s independent scoring methodology, {winner.name} edges ahead of {loser.name} with an overall trust score of {winner.trustScore}/10 versus {loser.trustScore}/10. The difference reflects a combination of factors across multiple scoring dimensions: withdrawal reliability, bonus term quality, KYC friction and overall platform trust.
                </p>
                <p className="text-[#888888] leading-relaxed mb-3">
                  That said, &quot;best&quot; depends on your individual priorities. For players where withdrawal speed is the primary concern, the withdrawal scores tell the real story: {c1.name} scores {c1.withdrawalScore}/10 versus {c2.name}&apos;s {c2.withdrawalScore}/10. For privacy-conscious players, KYC policy is decisive — {kycWin === 'tie' ? 'both casinos have equivalent KYC requirements' : `${kycWin === 'a' ? c1.name : c2.name} has lighter requirements`}. And for bonus seekers, the fairness scores — {c1.name} {c1.bonusFairnessScore}/10 vs {c2.name} {c2.bonusFairnessScore}/10 — show which platform offers better real value after wagering requirements.
                </p>
                <p className="text-[#888888] leading-relaxed">
                  Both {c1.name} and {c2.name} are legitimate, reputable operators that have processed thousands of player withdrawals without systemic issues. You will not go wrong with either. Our aggregate recommendation is {winner.name}, but we strongly encourage reading the full review for each casino before making a deposit.
                </p>
              </>
            ) : (
              <>
                <div className="text-[#7BB8D4] font-bold text-lg mb-4">It&apos;s a Tie — Both Score {c1.trustScore}/10</div>
                <p className="text-[#888888] leading-relaxed mb-3">
                  {c1.name} and {c2.name} score identically on overall trust at {c1.trustScore}/10. When two casinos are this closely matched, the right choice comes down entirely to your personal priorities. If fast withdrawals matter most, the withdrawal scores are your guide. If privacy is paramount, compare the KYC levels and scores. If you are chasing the best value on a welcome bonus, the bonus fairness scores will be decisive.
                </p>
                <p className="text-[#888888] leading-relaxed">
                  Both are solid, established choices for crypto players in 2026. We recommend reading both full reviews to identify which platform&apos;s specific feature set matches your playing style and bankroll.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Bottom CTAs */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {[c1, c2].map((c) => (
            <div key={c.slug} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222222] flex items-center justify-center overflow-hidden">
                  <CasinoLogo src={c.logo} name={c.name} size={32} />
                </div>
              </div>
              <div className="text-sm font-semibold text-[#f5f5f5] mb-1">{c.name}</div>
              <div className="text-[#7BB8D4] text-2xl font-extrabold mb-3">{c.trustScore}/10</div>
              <div className="flex flex-col gap-2">
                <CTAButton href={c.affiliateUrl} label={`Play at ${c.name}`} variant="primary" size="sm" external />
                <Link
                  href={`/reviews/${c.slug}`}
                  className="text-center text-sm text-[#888888] hover:text-[#f5f5f5] border border-[#222222] hover:border-[#333333] rounded-lg py-2 transition-all"
                >
                  Full Review
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Related Comparisons */}
        <section className="pt-8 border-t border-[#222222]">
          <h2 className="text-lg font-bold text-[#f5f5f5] mb-4">More Comparisons</h2>
          <div className="flex flex-wrap gap-2">
            {otherCasinos.flatMap((c) => [
              { label: `${c1.name} vs ${c.name}`, href: `/compare/${c1.slug}-vs-${c.slug}` },
              { label: `${c2.name} vs ${c.name}`, href: `/compare/${c2.slug}-vs-${c.slug}` },
            ]).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-lg text-sm text-[#888888] hover:text-[#f5f5f5] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
