// Compliance news feed data layer (built 2026-09-05, owner decision same
// date). ONE hub URL (/compliance) carrying dated additive entries across
// jurisdictions; entries here are SHORT verified notes, and where a story
// has a deep home on this site (the trackers, the legal pages) the entry
// links there rather than duplicating the analysis. Jurisdictions without
// a deep surface (Italy today) carry slightly fuller notes here until one
// is justified. Append-only in spirit: corrections are new dated entries,
// never silent rewrites (site-wide corrections policy).
//
// CAP NOTE: adding an entry edits an existing URL and consumes NO monthly
// publishing slot (the cap counts published new pages by ship month).
// Propagation: an entry ships with a modified bump below and a manual
// single-URL dispatch, the tracker-update loop.
//
// VERIFY-OR-OMIT applies to every entry: each carries its sources, and a
// claim that cannot be sourced is not entered.

export type ComplianceEntry = {
  date: string // ISO, the date the entry was logged
  jurisdiction: string
  title: string
  summary: string
  home?: { label: string; href: string } // the deep surface on this site
  sources: { label: string; href: string }[]
}

// Feeds the sitemap lastmod for /compliance via app/sitemap.ts: max entry
// date, so the field stays honest by construction.
export const COMPLIANCE_ENTRIES: ComplianceEntry[] = [
  {
    date: '2026-09-05',
    jurisdiction: 'Italy',
    title: 'Italy completes its online licensing overhaul: 52 nine-year concessions at EUR 7m each',
    summary:
      'Under the tender run pursuant to Article 6 of Legislative Decree 41/2024, ADM awarded 52 online gaming concessions to 46 operators, running nine years from 13 November 2025. The licence fee is EUR 7 million per concession (EUR 4 million on award, EUR 3 million on launch), up from roughly EUR 200,000 under the previous regime, a consolidation-by-price of the licensed market. A separate 2026 tender process covers land-based gaming. Figures per the legal analyses cited; ADM\'s own portal publishes the underlying decrees.',
    sources: [
      { label: 'DLA Piper: Italian online gambling licences, operators approved', href: 'https://www.dlapiper.com/en-us/insights/blogs/mse-today/2025/italian-online-gambling-licences' },
      { label: 'Chambers Gaming Law: Italy', href: 'https://practiceguides.chambers.com/practice-guides/gaming-law-2025/italy' },
      { label: 'Gaming Tech Law: the 2026 land-based tender', href: 'https://www.gamingtechlaw.com/2026/03/italy-2026-gambling-licenses-tender/' },
    ],
  },
  {
    date: '2026-09-04',
    jurisdiction: 'United States (Washington)',
    title: 'Kalshi\'s 2 September multi-source geofence deadline passes with no public compliance statement',
    summary:
      'The King County Superior Court deadline for a multi-source geofence, carrying $120,000-a-day exposure beyond it, passed with no public statement of compliance, extension or breach from either side; the outcome is graded undetermined on our tracker, which carries the order detail, the affidavit alternative and the characterisation conflict in the coverage.',
    home: { label: 'Prediction markets legality tracker', href: '/tracker/prediction-markets-legality' },
    sources: [
      { label: 'WA Attorney General: order coverage (13 Aug 2026)', href: 'https://www.atg.wa.gov/news/news-releases/judge-orders-kalshi-cease-numerous-washington-operations' },
    ],
  },
  {
    date: '2026-09-04',
    jurisdiction: 'United States (multi-state)',
    title: 'The sweepstakes ban wave, verified bill by bill',
    summary:
      'A verification pass upgraded our state matrix to primary sources where they exist: California AB 831 (chaptered 11 Oct 2025), New York S 5935A (5 Dec 2025, reaching payment processors, geolocation providers and media affiliates), Tennessee SB 2136 (22 May 2026, Consumer Protection Act enforcement), Louisiana HB 53 and HB 883 (May 2026, racketeering exposure), Iowa SF 2289 (commission enforcement powers, 1 Jul 2026), Oklahoma SB 1589 by veto override (effective 1 Nov 2026), Minnesota\'s SF 4474 dying in committee after a 62-3 Senate vote, and the pending DC bill pairing iGaming legalisation with a sweeps ban. Row-level detail and sources on the matrix.',
    home: { label: 'US sweepstakes casinos by state', href: '/tracker/us-sweepstakes-casinos-by-state' },
    sources: [
      { label: 'California Legislature: AB 831 status', href: 'https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202520260AB831' },
      { label: 'New York Senate: S5935A', href: 'https://www.nysenate.gov/legislation/bills/2025/S5935' },
    ],
  },
  {
    date: '2026-09-04',
    jurisdiction: 'Canada (Alberta)',
    title: 'Alberta\'s open market, verified against the province: 13 July launch, 13 October transition endpoint',
    summary:
      'Alberta\'s own iGaming-strategy page confirms the regulated market launched 13 July 2026 (AiGC operating, AGLC regulating, 20 per cent provincial retention, an estimated 70 per cent of the market previously unregulated). Legal analysis of the AGLC transition guidance puts the endpoint for unregulated activity at 13 October 2026, with transitional relief case-by-case. The full analysis lives on our Canada legality page.',
    home: { label: 'Is crypto gambling legal in Canada?', href: '/country/canada/legal' },
    sources: [
      { label: 'Alberta.ca: Alberta\'s iGaming strategy', href: 'https://www.alberta.ca/albertas-igaming-strategy' },
      { label: 'Gowling WLG: registration and transition analysis', href: 'https://gowlingwlg.com/en/insights-resources/articles/2026/alberta-igaming' },
    ],
  },
  {
    date: '2026-08-19',
    jurisdiction: 'Australia',
    title: 'The Gambling Reform Bill passes both houses; assent pending',
    summary:
      'The Interactive Gambling Amendment (Gambling Reform) Bill 2026 passed the House on 18 August (with 71 amendments agreed) and the Senate on 19 August. Nothing in it creates an offence for the individual player; what changes is enforcement machinery around offshore operators, including payment-blocking and site-blocking duties, once the Act commences. The full dated analysis, entry by entry, is on our Australia legality page, which also records that commencement dates await the Act as made.',
    home: { label: 'Is crypto gambling legal in Australia?', href: '/country/australia/legal' },
    sources: [
      { label: 'Parliament of Australia: bill homepage', href: 'https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7520' },
    ],
  },
]

export const COMPLIANCE_LASTMOD: string = COMPLIANCE_ENTRIES.reduce(
  (max, e) => (e.date > max ? e.date : max),
  '2026-09-05'
)
