import type { Metadata } from 'next'
import Link from 'next/link'
import { trackerShell } from '@/lib/tracker-content'

// Prediction-markets legality tracker (programme launch 2026-08-11).
// LITIGATION-LED skeleton: the federal-question pipeline leads, the active
// cases carry the page, the update log records movement. Deliberately a
// different structure from the sweepstakes matrix tracker: that page is
// jurisdiction-status-led. AUTHORITY-ONLY: no affiliate relationship with
// any platform named here; nothing on this page recommends an operator.
//
// Query cluster + portfolio metadata: lib/tracker-content.ts. Update
// workflow: append a dated log entry, re-date the verdict, bump
// `modified`, push, single-URL Bing dispatch. Corrections are dated
// entries, never silent rewrites.

const shell = trackerShell['prediction-markets-legality']

export const metadata: Metadata = {
  title: shell.title,
  description: shell.metaDescription,
  alternates: { canonical: '/tracker/prediction-markets-legality' },
  openGraph: {
    url: '/tracker/prediction-markets-legality',
    title: shell.h1,
    description: shell.metaDescription,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: shell.h1 }],
  },
  twitter: { card: 'summary_large_image', title: shell.h1, description: shell.metaDescription, images: ['/og-image.png'] },
}

// The pipeline: current stage marked. Order is chronological.
const PIPELINE = [
  { stage: 'CFTC proposed rule on event contracts published', date: '10 Jun 2026', current: false },
  { stage: 'Federal comment period closed', date: 'late Jul 2026', current: false },
  { stage: 'Washington preliminary injunction against Kalshi', date: '20 Jul 2026', current: false },
  { stage: 'Kalshi appeal filed; stay motion pending', date: 'late Jul 2026', current: false },
  { stage: 'Washington stay DENIED at both levels; geofencing ordered', date: '13 Aug 2026', current: false },
  { stage: 'IP and residency-based geofence deadline, met by Kalshi', date: '19 Aug 2026', current: false },
  { stage: 'Multi-source geofence deadline ($120,000/day fines beyond it)', date: '2 Sep 2026', current: false },
  { stage: 'Deadline passed with no public compliance statement from either side; outcome undetermined', date: '4 Sep 2026', current: true },
  { stage: 'CFTC final rule', date: 'pending, no date', current: false },
]

const CASES = [
  {
    court: 'Washington (King County Superior Court)',
    party: 'Kalshi v. state enforcement',
    status: 'Preliminary injunction GRANTED against Kalshi on 20 July 2026: Judge John McHale found the platform likely ran an illegal gambling operation under state law, rejecting the CFTC-preemption defence. Kalshi then lost the stay at BOTH levels: a Court of Appeals commissioner denied the emergency stay and McHale declined to pause his own injunction. On 13 August McHale ordered Kalshi to geofence Washington users out of sports, elections, politics, entertainment, culture, tech and science, and "mentions" markets: an IP and residency-based geofence by 19 August (which Kalshi met) and a multi-source geofence by 2 September, on pain of $120,000 a day in fines. Commodities, climate, economics and finance markets remain available. The appeal itself continues. The 2 September deadline has since passed with no public statement of compliance, extension or breach from either side (checked 4 September against the Attorney General\'s newsroom): the compliance outcome is undetermined.',
    lean: 'against preemption',
  },
  {
    court: 'Minnesota (federal court)',
    party: 'Kalshi',
    status: 'Order of 27 July 2026 BLOCKED Minnesota from enforcing its prediction-market ban: the federal court leaned toward CFTC jurisdiction.',
    lean: 'for preemption',
  },
  {
    court: 'Utah (federal court)',
    party: 'Kalshi',
    status: 'Ruling went AGAINST Kalshi: the court held the state can restrict the platform.',
    lean: 'against preemption',
  },
  {
    court: 'Michigan (federal court)',
    party: 'Coinbase Financial Markets',
    status: "Ruling of 7 August 2026 REJECTED Coinbase Financial Markets' bid to operate its own prediction market against state objection.",
    lean: 'against preemption',
  },
]

const LOG = [
  {
    date: '4 Sep 2026',
    text: 'The 2 September multi-source geofence deadline has passed with no public statement of compliance, extension or breach from either side: the Washington Attorney General\'s newsroom, the working primary for this case, has published nothing on Kalshi since its mid-August order coverage (checked 4 September), so the compliance outcome is recorded as undetermined rather than met or breached. The order\'s own terms give Kalshi an alternative to the $120,000-a-day fines: a sworn affidavit from a Kalshi or GeoComply representative explaining any delay, after which the court sets the penalty itself if sufficient diligence is not shown (GeekWire\'s read of the order). The state is separately seeking recovery of money Washington bettors have lost on the platform, plus civil penalties. Inside the window, Kalshi\'s counsel wrote to the Washington State Gambling Commission\'s executive director on 28 August alleging selective non-enforcement, arguing that rivals offer the same contracts in the state without restriction, and Nevada\'s Gaming Control Board is separately pressing a contempt claim seeking the same $120,000 a day over its own geofencing mandate. One characterisation conflict in the coverage is recorded rather than resolved: Sports Betting Dime describes the 13 August ruling as a final order, while OPB and Bettors Insider describe a preliminary injunction with a written geofencing order. The King County Superior Court docket is a state trial court and is not on CourtListener, so the document\'s own caption, which would settle it, is not available to us.',
  },
  {
    date: '25 Aug 2026',
    text: 'The Washington stay ruling landed against Kalshi at both levels: a Court of Appeals commissioner denied the emergency stay and Judge McHale declined to pause his own injunction. On 13 August McHale ordered Kalshi to geofence Washington users out of sports, elections, politics, entertainment, culture, tech and science, and "mentions" markets, on two deadlines: an IP and residency-based geofence by 19 August, which Kalshi met (Washington users saw the restrictions take effect from 19 to 21 August), and a multi-source geofence by 2 September, carrying $120,000 a day in fines if missed. Commodities, climate, economics and finance markets stay available in the state. The underlying appeal continues, and Kalshi can still ask a full Court of Appeals panel or the Washington Supreme Court to revisit the stay.',
  },
  {
    date: '11 Aug 2026',
    text: 'Tracker opened. Kalshi remains live in Washington three weeks after the injunction, pending the stay ruling. Neal Katyal, former US Acting Solicitor General, is now lead national counsel for Kalshi across its state cases, a signal the company is positioning the preemption question for higher courts.',
  },
  {
    date: '7 Aug 2026',
    text: 'Michigan federal court rejected Coinbase Financial Markets. The federal-court split now runs at least three ways across Minnesota, Utah and Michigan.',
  },
  {
    date: '27 Jul 2026',
    text: 'Minnesota federal court blocked that state from enforcing its prediction-market ban, the strongest ruling so far for the preemption side.',
  },
  {
    date: '20 Jul 2026',
    text: 'Washington preliminary injunction granted against Kalshi (Attorney General Nick Brown). The core holding: federal commodities oversight does not, at this stage, override state gambling law.',
  },
  {
    date: '10 Jun 2026',
    text: 'CFTC published a proposed rule for event-contract markets with a 45-day comment period: most sports event contracts would be permissible, with bans on manipulation-prone and violence-linked contracts. A final rule would reshape every state case.',
  },
]

const SOURCES = [
  { label: 'Washington Attorney General: judge orders Kalshi to cease numerous Washington operations (13 Aug 2026)', href: 'https://www.atg.wa.gov/news/news-releases/judge-orders-kalshi-cease-numerous-washington-operations' },
  { label: 'GeekWire: Kalshi ordered to shut down sports and election prediction markets in Washington by Sept. 2', href: 'https://www.geekwire.com/2026/kalshi-ordered-to-shut-down-sports-and-election-prediction-markets-in-washington-state-by-sept-2/' },
  { label: 'Covers: Kalshi accuses Washington of selective non-enforcement (2 Sep 2026)', href: 'https://www.covers.com/industry/kalshi-accuses-washington-state-of-selective-non-enforcement-against-rivals-sept-2-2026' },
  { label: 'Sports Betting Dime: Kalshi must geofence Washington from sports event contracts by September (14 Aug 2026)', href: 'https://www.sportsbettingdime.com/news/industry/kalshi-must-geofence-washington-from-sports-event-contracts-by-september/' },
  { label: 'Bettors Insider: judge orders Kalshi to stop most prediction-market operations in Washington (14 Aug 2026)', href: 'https://bettorsinsider.com/news/2026/08/14/judge-orders-kalshi-to-stop-most-prediction-market-operations-in-washington-state/' },
  { label: 'The Nevada Independent: control board says Kalshi should pay $120K per day for noncompliance', href: 'https://thenevadaindependent.com/article/control-board-kalshi-should-pay-120k-per-day-for-noncompliance-with-the-court' },
  { label: 'OPB: Kalshi ordered to sharply curtail operations in Washington state', href: 'https://www.opb.org/article/2026/08/14/kalshi-ordered-sharply-curtail-operations-washington-state/' },
  { label: 'Sports Betting Dime: Kalshi starts blocking access to sports event contracts in Washington', href: 'https://www.sportsbettingdime.com/news/industry/kalshi-starts-blocking-access-to-sports-event-contracts-in-washington/' },
  { label: 'GeekWire: Kalshi brings in former US Solicitor General as Washington case escalates', href: 'https://www.geekwire.com/2026/kalshi-brings-in-former-u-s-solicitor-general-as-washington-state-gambling-case-escalates/' },
  { label: 'KUOW: judge blocks Kalshi in WA', href: 'https://www.kuow.org/law/2026-07-21/judge-blocks-kalshi-in-wa-ruling-the-platform-likely-ran-illegal-gambling-operation' },
  { label: 'InGame: Utah judge latest to rule state can restrict Kalshi', href: 'https://www.ingame.com/utah-kalshi-status-prediction-market-rulings/' },
  { label: 'CNBC: CFTC prediction-markets rule proposal', href: 'https://www.cnbc.com/2026/05/27/prediction-markets-white-house-cftc-kalshi-polmarket-gensler.html' },
  { label: 'PYMNTS: CFTC investigation of Polymarket', href: 'https://www.pymnts.com/legal/2026/cftc-investigation-of-polymarket-broadens-compliance-questions-for-prediction-markets/' },
  { label: 'Congressional Research Service: prediction markets policy issues', href: 'https://www.congress.gov/crs-product/IF13187' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
    { '@type': 'ListItem', position: 2, name: 'Prediction Markets Legality Tracker', item: 'https://www.playmagpie.com/tracker/prediction-markets-legality' },
  ],
}

export default function PredictionMarketsTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Prediction Markets Tracker</span>
        </nav>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#7BB8D4] text-sm font-medium">Living tracker · updated as rulings land</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">{shell.h1}</h1>
          <p className="text-[#888888] text-lg leading-relaxed">
            One question is being litigated in parallel across American courts: when the CFTC supervises an
            event-contract market, can a state still call it illegal gambling? Kalshi, Polymarket, Robinhood and
            Coinbase Financial Markets are all downstream of the answer. This page tracks the cases and what they
            mean for whether you can actually use these platforms, dated at every step.
          </p>
        </div>

        {/* Pipeline */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Where the question stands</h2>
          <ol className="space-y-2">
            {PIPELINE.map((s) => (
              <li key={s.stage} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${s.current ? 'border-[#7BB8D4]/40 bg-[#7BB8D4]/[0.06]' : 'border-[#222222] bg-[#111111]'}`}>
                <span className={`text-xs font-semibold mt-0.5 whitespace-nowrap ${s.current ? 'text-[#7BB8D4]' : 'text-[#555555]'}`}>{s.date}</span>
                <span className={`text-sm ${s.current ? 'text-[#f5f5f5] font-medium' : 'text-[#bbbbbb]'}`}>{s.stage}{s.current ? ' ← current stage' : ''}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Player impact verdict */}
        <section className="mb-10">
          <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What this means for you, as of 4 September 2026</h2>
            <div className="space-y-3 text-[#bbbbbb] text-sm leading-relaxed">
              <p>
                Nothing in any of these cases targets the individual user: every action so far runs against the
                platforms. If you hold positions on a platform that loses in your state, the practical risks are
                account restrictions, forced offboarding and position unwinding on the operator&apos;s timetable,
                not enforcement against you.
              </p>
              <p>
                In Washington the provisional period is over: since 19 August, Kalshi has been blocking
                Washington users from sports, elections, politics, entertainment, culture, tech and science, and
                &quot;mentions&quot; markets under the 13 August geofencing order, and from 2 September the block
                must work from more than IP address alone. That second deadline has now passed, and whether the
                stronger multi-source block is in place has not been publicly confirmed by either side.
                Commodities, climate, economics and finance markets
                remain available in the state. If you hold Washington positions in a blocked category, expect
                offboarding and position unwinding on Kalshi&apos;s timetable. Elsewhere, availability still
                differs platform by platform and state by state, and the federal split means neither side can
                claim the settled answer yet.
              </p>
              <p className="text-[#888888]">
                We have no commercial relationship with any platform named on this page. This is legal-status
                tracking, not a recommendation to use any of them.
              </p>
            </div>
          </div>
        </section>

        {/* The core question */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">The question being litigated</h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-3">
            Kalshi operates a CFTC-designated exchange and argues that federal commodities oversight preempts
            state gambling law: if the CFTC supervises the market, a state cannot separately prosecute it as
            gambling. States reply that an event contract on sports or politics is a bet, whatever the venue
            registration says, and that gambling regulation has always been state police power. Washington&apos;s
            Judge McHale sided with the state at the preliminary stage; Minnesota&apos;s federal court leaned the
            other way a week later. Utah and Michigan have both since ruled for their states. A CFTC final rule,
            or an appellate decision, is what eventually collapses this split; until then the answer genuinely
            differs by courtroom.
          </p>
          <p className="text-[#888888] text-sm leading-relaxed">
            Polymarket sits in the same storm at a different angle: its main exchange is offshore and claims to
            block US users, while a smaller CFTC-approved exchange it acquired serves the US, a dual structure
            now drawing its own CFTC compliance questions. Robinhood, DraftKings and FanDuel offer event
            contracts under existing brokerage or wagering frameworks, so a preemption answer reshapes their
            products too.
          </p>
        </section>

        {/* Active cases */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Active cases and rulings</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#222222]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111111] border-b border-[#222222] text-left">
                  <th className="px-4 py-3 text-[#888888] font-semibold">Court</th>
                  <th className="px-4 py-3 text-[#888888] font-semibold">Platform</th>
                  <th className="px-4 py-3 text-[#888888] font-semibold">Status</th>
                  <th className="px-4 py-3 text-[#888888] font-semibold whitespace-nowrap">Leans</th>
                </tr>
              </thead>
              <tbody>
                {CASES.map((c) => (
                  <tr key={c.court} className="border-b border-[#222222] last:border-0 align-top">
                    <td className="px-4 py-3 text-[#f5f5f5] font-medium whitespace-nowrap">{c.court}</td>
                    <td className="px-4 py-3 text-[#bbbbbb] whitespace-nowrap">{c.party}</td>
                    <td className="px-4 py-3 text-[#bbbbbb] leading-relaxed">{c.status}</td>
                    <td className="px-4 py-3 text-[#7BB8D4] whitespace-nowrap">{c.lean}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#555555] text-xs mt-3">
            Wisconsin, New York and Illinois have also moved against event-contract platforms through regulators
            or litigation; those disputes are earlier-stage and join the table when a ruling or formal order is
            on the record.
          </p>
        </section>

        {/* Update log */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Update log</h2>
          <div className="space-y-4">
            {LOG.map((e) => (
              <div key={e.date + e.text.slice(0, 20)} className="border-l-2 border-[#7BB8D4]/40 pl-4">
                <div className="text-[#7BB8D4] text-xs font-semibold mb-1">{e.date}</div>
                <p className="text-[#888888] text-sm leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs mt-4">
            This tracker is updated as rulings land; entries are append-only and corrections are made as dated
            entries, never silent rewrites. Next scheduled review: 2 October 2026, a compliance re-check on the
            passed Washington deadline, earlier if either side makes a public statement, a penalty or affidavit
            filing surfaces, or an appellate ruling arrives first.
          </p>
        </section>

        {/* Related */}
        <section className="mb-10">
          <p className="text-[#888888] text-sm leading-relaxed">
            The state-versus-operator pattern here runs right through gambling law: for the equivalent story in
            traditional casino form, see our state-by-state{' '}
            <Link href="/tracker/us-sweepstakes-casinos-by-state" className="text-[#7BB8D4] hover:underline">
              sweepstakes casino ban tracker
            </Link>
            , where fourteen states have already answered their version of the question.
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
