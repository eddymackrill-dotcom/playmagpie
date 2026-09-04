// Regulatory tracker registry (programme launch 2026-08-11, Option D).
//
// Each tracker is a single living URL: status pipeline at the top, a
// maintained player-impact verdict re-dated at every update, a dated
// append-only update log, and a sources list. Page skeletons are BESPOKE
// per tracker (mechanic-led ordering: a litigation-status story and a
// jurisdiction-status matrix must not share a layout); this file holds the
// shell metadata the sitemap and the portfolio instrumentation read.
//
// MAINTENANCE RULES (binding, from the programme build plan):
// - reviewBy is REQUIRED. A tracker whose newest dated element exceeds 60
//   days at a weekly check is updated that week or archived with a dated
//   closing entry. Matrix rows over 90 days are re-verified or visibly
//   downgraded to "unverified since [date]"; a matrix over 20% downgraded
//   is archived.
// - Updates are append-only; corrections get a dated correction entry,
//   never a silent rewrite.
// - `modified` feeds the sitemap lastmod; bump in the same commit as any
//   content change (honesty rule, as lib/last-reviewed.ts).
//
// PORTFOLIO INSTRUMENTATION: the `portfolio` block per tracker is the
// per-artefact metadata the correlation analysis needs (format,
// jurisdiction count, event type, publish date, query cluster). Citation
// reads at 7/30/60 days are recorded against these in
// reports/regulatory-portfolio.md from the owner's Bing AI Performance
// pulls. AUTHORITY-ONLY flag: neither tracker has any affiliate
// relationship behind it; pages must not imply commercial endorsement.

export const TRACKER_LIST = [
  { slug: 'prediction-markets-legality', name: 'Prediction Markets Legality Tracker' },
  { slug: 'us-sweepstakes-casinos-by-state', name: 'US Sweepstakes Casinos by State' },
] as const

export type TrackerSlug = (typeof TRACKER_LIST)[number]['slug']

export interface TrackerShell {
  title: string
  h1: string
  metaDescription: string
  modified: string // ISO date, feeds sitemap lastmod
  reviewBy: string // next scheduled re-verification / milestone date
  portfolio: {
    format: 'timeline' | 'matrix'
    jurisdictionCount: number
    eventType: string
    published: string
    queryCluster: string[]
  }
}

export const trackerShell: Record<TrackerSlug, TrackerShell> = {
  'prediction-markets-legality': {
    title: 'Prediction Markets Legality State by State: Kalshi, CFTC',
    h1: 'Are Prediction Markets Legal? The Live State-vs-CFTC Scorecard',
    metaDescription: 'Kalshi\'s 2 September Washington geofence deadline has passed with no public compliance statement from either side. The state-vs-CFTC split, tracked and dated.',
    modified: '2026-09-04',
    reviewBy: '2026-10-02',
    portfolio: {
      format: 'timeline',
      jurisdictionCount: 7,
      eventType: 'litigation',
      published: '2026-08-11',
      queryCluster: [
        'are prediction markets legal',
        'is kalshi legal in washington',
        'is polymarket legal in the us',
        'kalshi lawsuit states',
        'prediction market gambling ruling',
      ],
    },
  },
  'us-sweepstakes-casinos-by-state': {
    title: 'US Sweepstakes Casinos by State: Ban Dates and Enforcement',
    h1: 'Sweepstakes Casinos in the US: Where They Are Banned, State by State',
    metaDescription: 'Sweepstakes casino bans state by state, every row dated and sourced: California, New York, Tennessee, Louisiana, Iowa and more. Oklahoma joins 1 Nov 2026.',
    modified: '2026-09-04',
    reviewBy: '2026-11-01',
    portfolio: {
      format: 'matrix',
      jurisdictionCount: 17,
      eventType: 'state-enforcement-wave',
      published: '2026-08-11',
      queryCluster: [
        'are sweepstakes casinos legal in my state',
        'sweepstakes casino ban states',
        'is [operator] shutting down',
        'sweepstakes casinos legal states 2026',
        'why did sweepstakes casino leave my state',
      ],
    },
  },
}
