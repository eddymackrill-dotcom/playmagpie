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
  { state: 'California', status: 'Banned (statute)', changed: 'AB 831 signed and chaptered 11 Oct 2025 (Ch. 623, Statutes of 2025, adding Penal Code s.337o); operators wound down by 31 Dec 2025', impact: 'Sweepstakes casinos exited; dual-currency sites are illegal to operate here.', source: { label: 'CA Legislature: AB 831 status (primary)', href: 'https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202520260AB831' }, asOf: '2026-09-04' },
  { state: 'Connecticut', status: 'Banned (statute)', changed: 'Ban in effect 1 Oct 2025', impact: 'Operators exited at the effective date.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Montana', status: 'Banned (statute)', changed: 'Ban in effect 1 Oct 2025', impact: 'Operators exited at the effective date.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Indiana', status: 'Banned (statute)', changed: 'HB 1052 signed 12 Mar 2026; in force 1 Jul 2026', impact: 'Operators required out from July; expect account closures if any linger.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Maine', status: 'Banned (statute)', changed: 'LD 2007 signed 6 Apr 2026; in force 14 Jul 2026', impact: 'Ban live since mid-July; Maine also legalised regulated iGaming this year, so a licensed alternative exists.', source: { label: 'Bettors Insider', href: 'https://bettorsinsider.com/casino/2026/04/08/two-more-states-ban-sweepstakes-casinos-is-your-favorite-site-next/' }, asOf: '2026-08-11' },
  { state: 'Oklahoma', status: 'Ban enacted, not yet in force', changed: 'SB 1589 enacted May 2026 by veto override (House 68-19, Senate 34-10, after Gov. Stitt\'s 7 May veto); effective 1 Nov 2026; tribal gaming under IGRA carved out', impact: 'Sites remain reachable until November; expect wind-down notices this autumn. Promotion of unregulated gambling becomes a felony-level offence per contemporaneous reporting.', source: { label: 'Casino Reports: veto override', href: 'https://www.casinoreports.com/oklahoma-legislators-ban-sweeps/' }, asOf: '2026-09-04' },
  { state: 'New Jersey', status: 'Banned (statute)', changed: 'A5447 signed 15 Aug 2025, effective immediately: dual-currency casino-style sweepstakes prohibited; $100,000 first offence, $250,000 thereafter, each day a fresh offence', impact: 'One of the first regulated-iGaming states to close the sweepstakes lane.', source: { label: 'SBC Americas: NJ ban signed', href: 'https://sbcamericas.com/2025/08/18/new-jersey-sweepstakes-ban-into-law/' }, asOf: '2026-09-04' },
  { state: 'New York', status: 'Banned (statute)', changed: 'S 5935A signed 5 Dec 2025, effective immediately: $10,000 to $100,000 per violation, and the prohibition expressly bars support by financial institutions, payment processors, geolocation providers, platform providers and media affiliates', impact: 'Operators exited; the statute reaches the ecosystem around the operator, not just the operator.', source: { label: 'NY Senate: S5935A (primary)', href: 'https://www.nysenate.gov/legislation/bills/2025/S5935' }, asOf: '2026-09-04' },
  { state: 'Louisiana', status: 'Banned (statute)', changed: 'HB 53 signed 11 May 2026 (illegal gambling pulled into the racketeering statute, penalties up to 50 years hard labour and $1m fines) and HB 883 signed 15 May 2026 (dual-currency ban reaching platforms, content, geolocation, promotion and media support; up to $40,000 and five years)', impact: 'The harshest penalty framework in the wave: racketeering exposure, not just fines.', source: { label: 'Covers: HB 53 signed', href: 'https://www.covers.com/industry/louisiana-gambling-racketeering-bill-signed-by-governor-may-22-2026' }, asOf: '2026-09-04' },
  { state: 'Tennessee', status: 'Banned (statute)', changed: 'SB 2136 (with HB 1885) signed 22 May 2026: dual-currency platforms banned as a Tennessee Consumer Protection Act violation with AG enforcement (Senate 32-0, House 69-17); AG Skrmetti had already ordered 38 sites to halt', impact: 'Statute now backs the most aggressive AG enforcement in the wave: named-site orders plus TCPA liability.', source: { label: 'Casino Reports: TN governor signs', href: 'https://www.casinoreports.com/news/tennessee-governor-signs-sweepstakes-ban-bill/' }, asOf: '2026-09-04' },
  { state: 'Nevada', status: 'Banned (enforcement)', changed: 'Enforcement under existing gambling law, tightened 2025-26', impact: 'No sweepstakes lane in the strictest land-based state.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Idaho', status: 'Banned (enforcement)', changed: 'Pre-existing law applied to sweepstakes operators', impact: 'Treated as illegal gambling without a new statute.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Michigan', status: 'Banned (enforcement)', changed: 'MGCB enforcement under existing law', impact: 'Cease-and-desist-driven exits in a regulated-iGaming state.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Washington', status: 'Banned (enforcement)', changed: 'Pre-existing law applied; long-standing hard line on online gambling', impact: 'Same state now litigating prediction markets; the strictest posture in the country.', source: { label: 'Lines.com state map', href: 'https://www.lines.com/sweepstakes-casinos/states' }, asOf: '2026-08-11' },
  { state: 'Illinois', status: 'Enforcement wave', changed: '65 cease-and-desist letters issued May 2026', impact: 'No ban statute on the books yet; the C&D wave is doing the work. Watch for codification.', source: { label: 'BrightSideOfNews crackdown report', href: 'https://brightsideofnews.com/gambling/sweepstakes-casino-crackdown-2026-six-operators-shut-down-as-states-tighten-bans/' }, asOf: '2026-08-11' },
  { state: 'Iowa', status: 'Banned (enforcement)', changed: 'SF 2289 signed 15 May 2026, effective 1 Jul 2026: the Racing and Gaming Commission gains cease-and-desist and injunction powers over unlicensed gambling including illegal sweepstakes (Senate 44-0, House 93-0)', impact: 'An enforcement-power statute rather than a new product ban: expect commission-driven exits rather than a dated shutdown.', source: { label: 'Gambling Insider: SF 2289 signed', href: 'https://www.gamblinginsider.com/news/161120/iowa-governor-signs-sf2289-illegal-sweepstakes-enforcement' }, asOf: '2026-09-04' },
  { state: 'Minnesota', status: 'Unresolved', changed: 'SF 4474 (online sweepstakes ban) passed the Senate 62-3 on 30 Apr 2026 but died in House committee when the session closed in May', impact: 'No ban on the books: sites generally operate. The 62-3 margin makes a re-run next session the thing to watch.', source: { label: 'MN Revisor: SF 4474 status (primary)', href: 'https://www.revisor.mn.gov/bills/bill.php?b=Senate&f=SF4474&ssn=0&y=2026' }, asOf: '2026-09-04' },
  { state: 'District of Columbia', status: 'Unresolved', changed: 'B26-0656 (Internet Gaming and Consumer Protection Act) introduced 9 Apr 2026: would legalise online casino gaming and ban sweepstakes platforms together; pending in committee', impact: 'Nothing enacted. Listed because it pairs legalisation with a sweeps ban, the shape several states may copy.', source: { label: 'SBC Americas: DC bill', href: 'https://sbcamericas.com/2026/04/13/dc-online-casino-sweeps-ban-bill/' }, asOf: '2026-09-04' },
  { state: 'Federal (DOJ)', status: 'Unresolved', changed: '50-state AG coalition letter urging federal action, late 2025; response pending', impact: 'A federal move would overtake the state-by-state map at a stroke. Nothing has landed yet.', source: { label: 'BrightSideOfNews round-up', href: 'https://brightsideofnews.com/gambling/sweepstakes-casino-ban-us-states-2026/' }, asOf: '2026-08-11' },
  { state: 'All other states', status: 'Unresolved', changed: 'No ban statute or named enforcement action sourced as of the date shown', impact: 'Sweepstakes sites generally operate; "not banned" is an absence of action, not an endorsement of legality, and several legislatures have bills in motion.', source: { label: 'VegasInsider 50-state guide', href: 'https://www.vegasinsider.com/sweepstakes-casinos/legal-states/' }, asOf: '2026-08-11' },
]

const LOG = [
  { date: '4 Sep 2026', text: 'Legislative catch-up, verified row by row. Upgraded to primary sources: California (AB 831 confirmed signed and chaptered 11 Oct 2025 at the Legislature\'s own status page, which also resolves a conflict in circulation: accounts describing a "SB 1247 signed March 2026" do not match the primary and are discarded), New York (S 5935A, signed 5 Dec 2025, effective immediately, $10,000 to $100,000 per violation, expressly reaching payment processors, geolocation providers and media affiliates) and Minnesota (SF 4474 passed the Senate 62-3 on 30 Apr 2026, then died in House committee at session close: a failure worth recording, not omitting). Detail added on verified secondaries: Tennessee SB 2136 signed 22 May 2026 (Consumer Protection Act violation, AG enforcement), Louisiana HB 53 and HB 883 signed 11 and 15 May 2026 (racketeering exposure plus a dual-currency ban reaching promotion and media support), Oklahoma SB 1589\'s veto-override votes and IGRA carve-out, and New Jersey A5447\'s dates and penalties. New rows: Iowa (SF 2289, commission enforcement powers, effective 1 Jul 2026), Minnesota and the District of Columbia (B26-0656, pending, would legalise iGaming and ban sweeps together). The headline state count is retired from this page: published counts disagree on number and membership, so we report rows, not a total.' },
  { date: '11 Aug 2026', text: 'Tracker opened with 14 ban/enforcement states, the Illinois cease-and-desist wave, the pending Oklahoma effective date (1 Nov 2026) and the pending federal question. Six operators have shut down nationally since October 2025.' },
]

const SOURCES = [
  { label: 'California Legislature: AB 831 bill status (primary)', href: 'https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202520260AB831' },
  { label: 'New York Senate: S5935A (primary)', href: 'https://www.nysenate.gov/legislation/bills/2025/S5935' },
  { label: 'Minnesota Revisor: SF 4474 status (primary)', href: 'https://www.revisor.mn.gov/bills/bill.php?b=Senate&f=SF4474&ssn=0&y=2026' },
  { label: 'Casino Reports: Oklahoma legislators ban sweeps by overriding veto', href: 'https://www.casinoreports.com/oklahoma-legislators-ban-sweeps/' },
  { label: 'Casino Reports: Tennessee governor signs sweepstakes ban bill', href: 'https://www.casinoreports.com/news/tennessee-governor-signs-sweepstakes-ban-bill/' },
  { label: 'Covers: Louisiana gambling racketeering bill signed', href: 'https://www.covers.com/industry/louisiana-gambling-racketeering-bill-signed-by-governor-may-22-2026' },
  { label: 'Gambling Insider: Iowa governor signs SF 2289', href: 'https://www.gamblinginsider.com/news/161120/iowa-governor-signs-sf2289-illegal-sweepstakes-enforcement' },
  { label: 'SBC Americas: New Jersey sweepstakes ban signed into law', href: 'https://sbcamericas.com/2025/08/18/new-jersey-sweepstakes-ban-into-law/' },
  { label: 'SBC Americas: DC bill to legalise online casinos and ban sweeps', href: 'https://sbcamericas.com/2026/04/13/dc-online-casino-sweeps-ban-bill/' },
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
            being no. Ban statutes and enforcement actions now run from California to New York, six operators
            have shut down nationally, and Oklahoma&apos;s ban arrives 1 November 2026. We deliberately publish
            no count of ban states: published counts disagree on both the number and the membership, so the map
            below gives the per-state position, row by row, dated and sourced.
          </p>
        </div>

        {/* Player impact verdict */}
        <section className="mb-10">
          <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6 max-w-3xl">
            <h2 className="text-xl font-bold text-white mb-3">What this means for you, as of 4 September 2026</h2>
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
            . Developments from both trackers, and from jurisdictions beyond the US, are logged in our dated{' '}
            <Link href="/compliance" className="text-[#7BB8D4] hover:underline">compliance news feed</Link>.
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
