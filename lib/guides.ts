export type Guide = {
  title: string
  slug: string
  description: string
  readTime: string
  category: string
  // Real per-guide dates. Added 2026-07-28: the route previously hardcoded
  // datePublished '2026-01-01' and a rendered "Updated May 2026" for every
  // guide, which would have published a false date on anything written after
  // May. `published` and `modified` are ISO and feed Article schema; `updated`
  // is the month-granularity string rendered on the page. All three follow the
  // lib/last-reviewed.ts honesty rule: they move only on a real content or
  // verification event, never for freshness.
  //
  // The four pre-existing guides keep modified '2026-05-21', the value the route
  // hardcoded before this change, so none of their published dates shift here.
  // Three of them did receive answer statements on 2026-07-16, which makes that
  // date arguably stale, but bumping dateModified on indexed pages is a
  // deliberate editorial act, not a side effect of adding a guide. Logged to the
  // CLAUDE.md follow-up audit list instead.
  published: string
  modified: string
  updated: string
}

// 'how-crypto-casino-withdrawals-work' removed 2026-07-07 (spam-update
// consolidation): the page was one of the three the June 2026 spam update
// dropped from the index, and its explainer content strengthens the
// commercial page that owns the withdrawal-speed intent. Content folded
// into /fast-withdrawal-casinos#how-withdrawals-work; old URL 301s there
// via next.config.ts. Its content blocks in app/guides/[slug]/page.tsx are
// unreachable and retained for reference (poker-content precedent).
export const guides: Guide[] = [
  {
    title: 'Best Crypto for Gambling',
    slug: 'best-crypto-for-gambling',
    description:
      'Bitcoin, USDT, SOL, TRX: which cryptocurrency gives you the fastest withdrawals and lowest fees at online casinos?',
    readTime: '6 min read',
    category: 'Crypto',
    published: '2026-01-01',
    modified: '2026-05-21',
    updated: 'May 2026',
  },
  {
    title: 'How Casino Bonuses Really Work',
    slug: 'how-casino-bonuses-really-work',
    description:
      'Cut through the marketing speak. We break down wagering requirements, bonus caps, game contributions and what actually makes a bonus worth taking.',
    readTime: '8 min read',
    category: 'Bonuses',
    published: '2026-01-01',
    modified: '2026-05-21',
    updated: 'May 2026',
  },
  {
    title: 'Bitcoin vs USDT Casinos: Which is Better?',
    slug: 'bitcoin-vs-usdt-casinos',
    description:
      'BTC is the most accepted, USDT is the most stable. Which one should you use for deposits, withdrawals and big wins? We compare them head-to-head.',
    readTime: '5 min read',
    category: 'Crypto',
    published: '2026-01-01',
    modified: '2026-05-21',
    updated: 'May 2026',
  },
  {
    title: 'Do Crypto Casinos Require KYC?',
    slug: 'do-crypto-casinos-require-kyc',
    description:
      'Some crypto casinos demand ID, others never ask. We break down which operators require KYC, which run no-KYC, what triggers a verification check, and which documents you’ll be asked for.',
    readTime: '6 min read',
    category: 'KYC',
    published: '2026-01-01',
    modified: '2026-05-21',
    updated: 'May 2026',
  },
  // Added 2026-07-28 under the monthly editorial-guide exception to the velocity
  // freeze (owner decision 2026-07-27, CLAUDE.md). Scope is deliberately the
  // FAILURE path: /fast-withdrawal-casinos#how-withdrawals-work owns the success
  // path and is the page carrying the Bing page-one ranking on "how do crypto
  // casino withdrawals work". This guide must never compete for that query.
  {
    title: 'Why Is My Crypto Casino Withdrawal Pending?',
    slug: 'why-is-my-crypto-casino-withdrawal-pending',
    description:
      'A pending withdrawal is in one of three states, and only one of them is the casino’s to fix. How to tell which, using the transaction ID, and what actually resolves each.',
    readTime: '9 min read',
    category: 'Withdrawals',
    published: '2026-07-28',
    modified: '2026-07-28',
    updated: 'July 2026',
  },
  // Added 2026-08-01, page 1 of the owner-approved August slate (STATE.md).
  // SCOPE, committed before build and binding on the rest of the slate: this
  // guide owns THE MONEY, meaning caps, verification thresholds, holds and what
  // happens to a large cashout at the moment it triggers a check. It does NOT
  // own the document workflow (what is requested, turnaround, rejection
  // reasons), which is reserved for the verification-process guide, and it does
  // NOT own policy and who, which stays with do-crypto-casinos-require-kyc.
  // No threshold figure is stated for any operator the owner has not verified.
  {
    title: 'Large Crypto Casino Withdrawals: What Actually Happens',
    slug: 'large-crypto-casino-withdrawals',
    description:
      'Above a certain size a crypto casino stops simply paying you. The documented caps and verification thresholds at the casinos we review, what a big cashout actually triggers, and how to tell a cap from a hold.',
    readTime: '8 min read',
    category: 'Withdrawals',
    published: '2026-08-01',
    modified: '2026-08-01',
    updated: 'August 2026',
  },
]
