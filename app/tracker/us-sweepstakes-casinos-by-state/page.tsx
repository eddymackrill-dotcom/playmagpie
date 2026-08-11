import type { Metadata } from 'next'
import Link from 'next/link'
import { trackerShell } from '@/lib/tracker-content'

// US sweepstakes-casino matrix tracker (programme launch 2026-08-11).
// JURISDICTION-STATUS-LED skeleton: the matrix IS the page; prose serves
// the table. Deliberately a different structure from the prediction-markets
// tracker (litigation-led). AUTHORITY-ONLY: all 8 catalogue operators
// restrict the US, there is nothing compliant for us to recommend to a US
// reader, and the page says so.
//
// MATRIX RULES (build plan, binding): every row carries its own as-of date
// and source; a row that cannot be sourced is "not established", never
// guessed; rows older than 90 days are re-verified at the monthly audit or
// visibly downgraded; over 20% downgraded = archive the page.

const shell = trackerShell['us-sweepstakes-casinos-by-state']

export const metadata: Metadata = {
  title: shell.title,
  description: shell.metaDescription,
  alternates: { canonical: '/tracker/us-sweepstakes-casinos-by-state' },
  openGraph: {
    url: '/tracker/us-sweepstakes-casinos-by-state',
    title: shell.h1,
    description: shell.metaDescription,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: shell.h1 }],
  },
  twitter: { card: 'summary_large_image', title: shell.h1, description: shell.metaDescription, images: ['/og-image.png'] },
}

type Row = {
  state: string
  status: 'Banned (statute)' | 'Banned (enforcement)' | 'Enforcement wave' | 'Ban enacted, not yet in force' | 'Unresolved'
  changed: string
  impact: string
  source: { label: string; href: string }
  asOf: string
}

const ROWS: Row[] = [
  { state: 'California', status: 'Banned (statute)', changed: 'AB 831 signed 11 Oct 2025; operators wound down by 31 Dec 2025', impact: 'Sweepstakes casinos exited; dual-currency sites are illegal to operate here.', source: { label: 'PlayUSA tracker', href: 'https://www.playusa.com/news/sweepstakes-casinos-in-the-us-face-more-pressure-in-2026/' }, asOf: '2026-08-11' },
  { state: 'Connecticut', status: 'Banned (statute)', changed: 'Ban in effect 1 Oct 2025', impact: 'Operators exited at the effective date.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Montana', status: 'Banned (statute)', changed: 'Ban in effect 1 Oct 2025', impact: 'Operators exited at the effective date.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Indiana', status: 'Banned (statute)', changed: 'HB 1052 signed 12 Mar 2026; in force 1 Jul 2026', impact: 'Operators required out from July; expect account closures if any linger.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Maine', status: 'Banned (statute)', changed: 'LD 2007 signed 6 Apr 2026; in force 14 Jul 2026', impact: 'Ban live since mid-July; Maine also legalised regulated iGaming this year, so a licensed alternative exists.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Oklahoma', status: 'Ban enacted, not yet in force', changed: 'SB 1589 enacted by veto override; effective 1 Nov 2026', impact: 'Sites remain reachable until November; expect wind-down notices this autumn.', source: { label: 'BrightSideOfNews round-up', href: 'https://brightsideofnews.com/gambling/sweepstakes-casino-ban-us-states-2026/' }, asOf: '2026-08-11' },
  { state: 'New Jersey', status: 'Banned (statute)', changed: 'Statutory ban, 2025-26 wave', impact: 'One of the first regulated-iGaming states to close the sweepstakes lane.', source: { label: 'PlayUSA tracker', href: 'https://www.playusa.com/news/sweepstakes-casinos-in-the-us-face-more-pressure-in-2026/' }, asOf: '2026-08-11' },
  { state: 'New York', status: 'Banned (statute)', changed: 'Statutory ban, 2025-26 wave', impact: 'Operators exited; enforcement backed by AG attention.', source: { label: 'RG.org New York status', href: 'https://rg.org/casinos/sweepstakes-casinos/new-york' }, asOf: '2026-08-11' },
  { state: 'Louisiana', status: 'Banned (statute)', changed: 'Statutory ban, 2025-26 wave', impact: 'Operators exited.', source: { label: 'PlayUSA tracker', href: 'https://www.playusa.com/news/sweepstakes-casinos-in-the-us-face-more-pressure-in-2026/' }, asOf: '2026-08-11' },
  { state: 'Tennessee', status: 'Banned (statute)', changed: 'Statutory ban; AG Skrmetti ordered 38 sites to halt', impact: 'The most aggressive AG enforcement so far: named-site orders, not just a statute.', source: { label: 'BrightSideOfNews crackdown report', href: 'https://brightsideofnews.com/gambling/sweepstakes-casino-crackdown-2026-six-operators-shut-down-as-states-tighten-bans/' }, asOf: '2026-08-11' },
  { state: 'Nevada', status: 'Banned (enforcement)', changed: 'Enforcement under existing gambling law, tightened 2025-26', impact: 'No sweepstakes lane in the strictest land-based state.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Idaho', status: 'Banned (enforcement)', changed: 'Pre-existing law applied to sweepstakes operators', impact: 'Treated as illegal gambling without a new statute.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Michigan', status: 'Banned (enforcement)', changed: 'MGCB enforcement under existing law', impact: 'Cease-and-desist-driven exits in a regulated-iGaming state.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Washington', status: 'Banned (enforcement)', changed: 'Pre-existing law applied; long-standing hard line on online gambling', impact: 'Same state now litigating prediction markets; the strictest posture in the country.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Illinois', status: 'Enforcement wave', changed: '65 cease-and-desist letters issued May 2026', impact: 'No ban statute on the books yet; the C&D wave is doing the work. Watch for codification.', source: { label: 'BrightSideOfNews crackdown report', href: 'https://brightsideofnews.com/gambling/sweepstakes-casino-crackdown-2026-six-operators-shut-down-as-states-tighten-bans/' }, asOf: '2026-08-11' },
  { state: 'Federal (DOJ)', status: 'Unresolved', changed: '50-state AG coalition letter urging federal action, late 2025; response pending', impact: 'A federal move would overtake the state-by-state map at a stroke. Nothing has landed yet.', source: { label: 'BrightSideOfNews round-up', href: 'https://brightsideofnews.com/gambling/sweepstakes-casino-ban-us-states-2026/' }, asOf: '2026-08-11' },
  { state: 'All other states', status: 'Unresolved', changed: 'No ban statute or named enforcement action sourced as of the date shown', impact: 'Sweepstakes sites generally operate; "not banned" is an absence of action, not an endorsement of legality, and several legislatures have bills in motion.', source: { label: 'VegasInsider 50-state guide', href: 'https://www.vegasinsider.com/sweepstakes-casinos/legal-states/' }, asOf: '2026-08-11' },
]

const LOG = [
  { date: '11 Aug 2026', text: 'Tracker opened with 14 ban/enforcement states, the Illinois cease-and-desist wave, the pending Oklahoma effective date (1 Nov 2026) and the pending federal question. Six operators have shut down nationally since October 2025.' },
]

const SOURCES = [
  { label: 'PlayUSA: sweepstakes casinos face more pressure in 2026', href: 'https://www.playusa.com/news/sweepstakes-casinos-in-the-us-face-more-pressure-in-2026/' },
  { label: 'BrightSideOfNews: six operators shut as states tighten bans', href: 'https://brightsideofnews.com/gambling/sweepstakes-casino-crackdown-2026-six-operators-shut-down-as-states-tighten-bans/' },
  { label: 'Bettors Insider: Indiana and Maine ban sweepstakes casinos', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' },
  { label: 'Lines.com: sweepstakes casinos by state map', href: 'https://www.lines.com/sweepstakes-casinos/states' },
  { label: 'VegasInsider: 50-state legality guide', href: 'https://www.vegasinsider.com/sweepstakes-casinos/legal-states/' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'US Sweepstakes Casinos by State', item: 'https://www.playmagpie.com/tracker/us-sweepstakes-casinos-by-state' },
  ],
}

export default function SweepstakesMatrixPage() {
  const banned = ROWS.filter((r) => r.status.startsWith('Banned')).length
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Sweepstakes Casinos by State</span>
        </nav>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Living matrix · every row dated and sourced</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">{shell.h1}</h1>
          <p className="text-[#888888] text-lg max-w-3xl leading-relaxed">
            The dual-currency sweepstakes model spread precisely because it claimed not to be gambling; since late
            2025 state legislatures and attorneys general have been answering that claim, and the answer keeps
            being no. {banned} states now ban or enforce against the model, six operators have shut down
            nationally, and Oklahoma&apos;s ban arrives 1 November 2026. The map below is the current position,
            row by row.
          </p>
        </div>

        {/* Player impact verdict */}
        <section className="mb-10">
          <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6 max-w-3xl">
            <h2 className="text-xl font-bold text-white mb-3">What this means for you, as of 11 August 2026</h2>
            <div className="space-y-3 text-[#bbbbbb] text-sm leading-relaxed">
              <p>
                Every action in this wave targets operators, not players: bans criminalise offering the product,
                and no state in this table has prosecuted an individual for playing on a sweepstakes site. What a
                player actually experiences is abrupt exits: account closures, redemption deadlines and
                sometimes stranded balances when an operator leaves a state on short notice. If you hold a
                balance in a state with a pending effective date (Oklahoma, 1 November), redeeming before the
                deadline is the practical move.
              </p>
              <p className="text-[#888888]">
                We do not recommend any US-facing gambling site: every operator in our own review catalogue
                restricts the United States, so this page is legal-status reference, not a route to an
                alternative.
              </p>
            </div>
          </div>
        </section>

        {/* The matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">The state-by-state matrix</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222] text-left">
                  <th className="px-4 py-3 text-[#888888] font-semibold whitespace-nowrap">Jurisdiction</th>
                  <th className="px-4 py-3 text-[#888888] font-semibold whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-[#888888] font-semibold">What changed, and when</th>
                  <th className="px-4 py-3 text-[#888888] font-semibold">What it means for a player</th>
                  <th className="px-4 py-3 text-[#888888] font-semibold whitespace-nowrap">Source · as of</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.state} className="border-b border-[#222222] last:border-0 align-top">
                    <td className="px-4 py-3 text-[#f5f5f5] font-medium whitespace-nowrap">{r.state}</td>
                    <td className={`px-4 py-3 whitespace-nowrap ${r.status === 'Unresolved' ? 'text-[#888888]' : 'text-[#7BB8D4]'}`}>{r.status}</td>
                    <td className="px-4 py-3 text-[#bbbbbb] leading-relaxed">{r.changed}</td>
                    <td className="px-4 py-3 text-[#bbbbbb] leading-relaxed">{r.impact}</td>
                    <td className="px-4 py-3 text-[#555555] text-xs whitespace-nowrap">
                      <a href={r.source.href} target="_blank" rel="noopener noreferrer" className="text-[#7BB8D4] hover:underline">{r.source.label}</a>
                      <div className="mt-1">{r.asOf}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#555555] text-xs mt-3">
            Rows are admitted only with a source; where a state&apos;s position cannot be established from one,
            it sits under &ldquo;All other states&rdquo; rather than being guessed. Row dates are each row&apos;s
            own verification date; rows older than 90 days are re-verified or visibly downgraded at our monthly
            audit.
          </p>
        </section>

        {/* Why this happened */}
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold text-white mb-3">Why the wall came down</h2>
          <p className="text-[#888888] text-sm leading-relaxed">
            The regulatory logic across all these states is the same sentence: the dual-currency system is a
            cosmetic distinction, and a casino you can pay into and cash out of is a casino. Attorneys general
            reached that conclusion in materially identical terms from California to Tennessee, and a coalition
            of all fifty state AGs has asked the Department of Justice to take it federal, a request that is
            still pending. The open questions are which unresolved legislatures codify next, and whether the
            federal government moves first.
          </p>
        </section>

        {/* Update log */}
        <section className="mb-10 max-w-3xl">
          <h2 className="text-xl font-bold text-white mb-4">Update log</h2>
          <div className="space-y-4">
            {LOG.map((e) => (
              <div key={e.date} className="border-l-2 border-[#7BB8D4]/40 pl-4">
                <div className="text-[#7BB8D4] text-xs font-semibold mb-1">{e.date}</div>
                <p className="text-[#888888] text-sm leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs mt-4">
            Updated as states act; entries append-only, corrections dated. Next scheduled review: 1 November
            2026 (the Oklahoma effective date), earlier on any new state action.
          </p>
        </section>

        {/* Related */}
        <section className="mb-4 max-w-3xl">
          <p className="text-[#888888] text-sm leading-relaxed">
            The same &ldquo;is it actually gambling?&rdquo; fight is running in a second arena: CFTC-regulated
            prediction markets are litigating state gambling law across four courts right now, tracked on our{' '}
            <Link href="/tracker/prediction-markets-legality" className="text-[#7BB8D4] hover:underline">
              prediction markets legality tracker
            </Link>
            .
          </p>
        </section>

        {/* Sources */}
        <section className="mt-10 pt-8 border-t border-[#222222]">
          <h2 className="text-sm font-bold text-[#f5f5f5] mb-3 uppercase tracking-wider">Sources</h2>
          <ul className="space-y-1.5">
            {SOURCES.map((s) => (
              <li key={s.href} className="text-sm">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[#7BB8D4] hover:underline">{s.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
