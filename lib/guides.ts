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
  // Optional distinct on-page H1. Added 2026-08-25: the route previously
  // rendered `title` as both the document title and the H1, which fails the
  // title-not-equal-to-H1 gate for new guides. When absent, the route falls
  // back to `title`, so the four pre-2026-08-25 guides render unchanged.
  h1?: string
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
      'Some crypto casinos demand ID up front, others keep routine play document-free up to a stated threshold. We break down which operators verify, what triggers a check, and which documents you’ll be asked for.',
    readTime: '6 min read',
    category: 'KYC',
    published: '2026-01-01',
    modified: '2026-08-25', // scope line + link to the new verification-process guide (real content change)
    updated: 'August 2026',
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
    modified: '2026-08-25', // Roobet weekend-clause correction (not in terms, 08-25 owner read)
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
    modified: '2026-08-25', // Roobet cap+weekend correction + verification-process scope line (both 08-25)
    updated: 'August 2026',
  },
  // Added 2026-08-25, page 1 of the September slate (built as drafts 2026-08-25,
  // deployed same day under the amended caps; reports/september-slate-2026-09-drafts.md).
  // SCOPE (binding, resolves the split open since the August page-3 close):
  // do-crypto-casinos-require-kyc owns POLICY AND WHO; large-crypto-casino-
  // withdrawals owns THE MONEY; this guide owns THE MECHANICS: what happens
  // from the moment verification is requested to the moment it resolves.
  // Sources: Cloudbet help centre (machine-fetched 2026-08-25, re-verified at
  // deploy same day), Roobet ToS owner read 2026-08-25, BC.Game/7Bit EUR 2,000
  // owner verification 2026-08-01. No turnaround figures exist to publish and
  // the page says so in prose.
  {
    title: 'Crypto Casino Verification: What Actually Happens',
    h1: 'The Crypto Casino Verification Process, Step by Step',
    slug: 'crypto-casino-verification-process',
    description:
      'What happens once a crypto casino asks you to verify: the document sequence, the under-review state, refusal grounds and source-of-funds escalation, sourced.',
    readTime: '8 min read',
    category: 'KYC',
    published: '2026-08-25',
    modified: '2026-08-25',
    updated: 'August 2026',
  },
  // Added 2026-08-25, page 4 of the September slate. AU question guide on the
  // 45-citation Research query. ANTI-CANNIBALISATION CONTROLS (binding): zero
  // legality verdicts anywhere on the page, scope line in the opening block,
  // every legality-shaped sentence links /country/australia/legal rather than
  // restating it. Only Roobet's AU restriction is claimed by name (ToS s3.5,
  // owner read 2026-08-25); no other operator's AU posture is asserted (the
  // ISO-coded restriction lists carry no per-field provenance).
  {
    title: 'Is Crypto Safe at Australian Casinos? The Real Risks',
    h1: 'Using Crypto at Online Casinos From Australia: What Is Actually Risky',
    slug: 'is-crypto-safe-at-australian-casinos',
    description:
      'Crypto at offshore casinos from Australia: the real risks are operator terms, custody and payment rails, not the technology. Sourced, legality linked.',
    readTime: '7 min read',
    category: 'Crypto',
    published: '2026-08-25',
    modified: '2026-08-25',
    updated: 'August 2026',
  },
]
