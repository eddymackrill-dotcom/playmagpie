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
      "A pending withdrawal is in one of three states, and only one is the casino's to fix. Paste your TXID, see which state you're in, and what resolves each one.",
    readTime: '9 min read',
    category: 'Withdrawals',
    published: '2026-07-28',
    modified: '2026-09-05', // CTR meta sharpen + txid-guide carrier link and scope line (slate 2026-09-05)
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
  // Added 2026-09-05, page 1 of the owner-approved September slate (two-page
  // slate, reports/2026-09-05-september-slate-full.md). SCOPE, binding: this
  // guide owns VERIFYING THE WITHDRAWAL ON-CHAIN (finding the TXID, reading
  // the explorer, the sent-but-not-received path). It does NOT own why a
  // withdrawal is pending casino-side, which stays with
  // why-is-my-crypto-casino-withdrawal-pending; reciprocal scope lines on
  // both. Demand: 147 grounding citations ("crypto casino withdrawal txid"),
  // zero human keyword rows; visit case is a HYPOTHESIS (open field per the
  // 4 Sep Copilot probe). Interactive layer: components/TxidLookup.tsx,
  // API-free by design. No operator figures are stated anywhere in it.
  {
    title: 'Track a Crypto Casino Withdrawal by TXID',
    h1: 'Your Withdrawal Has a TXID (or It Does Not): How to Check It On-Chain',
    slug: 'crypto-casino-withdrawal-txid',
    description:
      "Your withdrawal either has a TXID or it doesn't, and that splits the problem in two. Find it, check it on-chain in one click, and read what the explorer shows.",
    readTime: '7 min read',
    category: 'Withdrawals',
    published: '2026-09-05',
    modified: '2026-09-05',
    updated: 'September 2026',
  },
  // Added 2026-09-05, page 2 of the owner-approved September slate (the
  // marginal call, approved with the flag read). SCOPE, binding: this guide
  // owns PAYMENT-RAIL blocking for Australians (why a PayPal deposit fails,
  // what the 2024 payment ban actually covers, where crypto rails fit). It
  // does NOT own law and site-blocking, which stays with
  // /country/australia/legal (frozen page, untouched), and it does NOT rank
  // operators, which stays with the /country/australia hub. Demand: 33
  // grounding citations ("paypal blocked casino australia"); visit case is a
  // HYPOTHESIS. PayPal AUP fact attributed as consistently reported (the
  // primary truncates to fetchers; see the 2026-09-05 decisions entry).
  {
    title: 'PayPal Casino Deposits in Australia: Why They Fail',
    h1: 'Why You Cannot Deposit at a Casino With PayPal From Australia',
    slug: 'paypal-blocked-casino-australia',
    description:
      'PayPal treats gambling as approval-only and no casino serving Australians holds it. Why deposits fail, what the law actually blocks, and where crypto fits.',
    readTime: '6 min read',
    category: 'Payments',
    published: '2026-09-05',
    modified: '2026-09-05',
    updated: 'September 2026',
  },
]
