// One-time git-derived lastmod backfill map (Batch 1 de-templating, 2026-08-07).
//
// WHAT THIS IS: a FLOOR for sitemap <lastmod>, not a maintained artifact.
// Before this map existed, app/sitemap.ts stamped `lastModified: new Date()`
// on every entry, so all 77 URLs asserted sitewide modification on every
// deploy and the field carried no information (see STATE.md 2026-07-28
// decisions entry and the 2026-08-07 audit).
//
// DERIVATION (one-off, 2026-08-07): last git commit date (%cs) of the route's
// own source file; for [slug] routes whose body is data-driven, the max of the
// route file and its principal data file (reviews/* -> lib/casinos.ts,
// bonus/* -> lib/bonus-content.ts, compare/* -> lib/compare-content.ts).
// File-level dates cannot distinguish URLs served by the same [slug] route,
// which is exactly why this is a floor.
//
// MAINTENANCE MODEL (RUNBOOK post-batch checklist): pages whose content lives
// in a data file get a data-level `modified` field read directly by
// app/sitemap.ts, which OVERRIDES this map (guides via lib/guides.ts
// `modified`; countries via lib/country-content.ts `modified` from Batch 1
// commit 2 onward). A content change to a data-driven page bumps its
// `modified` field in the same commit. This map is only the fallback for
// routes without data-level dates, and regenerating it is never required.
//
// Missing entry = build error by design (the lm() helper in app/sitemap.ts
// throws), so a new URL cannot silently ship without a lastmod decision.

export const ROUTE_LASTMOD: Record<string, string> = {
  // Bumped 2026-08-25 (Roobet catalogue correction ripple): the roobet
  // withdrawalTime string, cons and withdrawalCaveat changed on the 2026-08-25
  // owner terms read (weekend clause and $200k/day cap removed as NOT IN TERMS,
  // fee rule qualified), and every page rendering those fields changed bytes.
  // /high-roller-casinos and /no-kyc-casinos exclude Roobet by filter and are
  // unaffected; both stay unbumped.
  '/': '2026-08-25',
  '/best-crypto-casinos': '2026-08-25',
  '/fast-withdrawal-casinos': '2026-08-25',
  '/high-roller-casinos': '2026-07-16',
  '/no-kyc-casinos': '2026-08-22',
  '/best-crypto-pokies-nz': '2026-08-25',
  '/bnb-crypto-casinos': '2026-08-25',
  '/best-bitcoin-casino-canada': '2026-08-25',
  '/crypto-casinos-with-sportsbook': '2026-08-25',
  '/research/crypto-casino-bonus-transparency': '2026-08-25',
  '/crypto': '2026-07-07',
  '/country': '2026-06-22',
  '/game': '2026-07-16',
  '/bonus': '2026-06-15',
  '/guides': '2026-06-15',
  '/compare': '2026-06-22',
  '/about': '2026-07-07',
  '/methodology': '2026-07-17',
  // Bumped 2026-08-25: the last-reviewed registry moved bitstarz to August
  // 2026 on the owner's full T&C read, and the rendered "Facts last verified"
  // line changed on the parent review and the withdrawal sub-page (the kyc
  // sub-page was bumped in the slate deploy commit).
  '/reviews/bitstarz': '2026-08-25',
  '/reviews/bc-game': '2026-08-02',
  '/reviews/cloudbet': '2026-08-02',
  '/reviews/mirax-casino': '2026-08-02',
  '/reviews/7bit-casino': '2026-08-02',
  '/reviews/shuffle': '2026-08-02',
  '/reviews/duelbits': '2026-08-02',
  // Bumped 2026-08-25: roobet catalogue fields (see block comment at '/') plus
  // the Ontario FAQ correction and the payout-limits FAQ rewrite on the page.
  '/reviews/roobet': '2026-08-25',
  '/reviews/bitstarz/withdrawal': '2026-08-25',
  '/reviews/7bit-casino/withdrawal': '2026-08-01',
  '/reviews/cloudbet/withdrawal': '2026-08-01',
  '/reviews/duelbits/withdrawal': '2026-08-01',
  // New URL 2026-08-25: the fourth August page, built on the owner's full
  // Roobet terms read of the same date.
  '/reviews/roobet/withdrawal': '2026-08-25',
  '/reviews/cloudbet/payment-methods': '2026-08-01',
  '/reviews/bitstarz/payment-methods': '2026-08-01',
  '/reviews/bc-game/payment-methods': '2026-08-01',
  // The three existing KYC pages bumped 2026-08-25: the hardcoded June date
  // was swapped to the last-reviewed registry, the cross-link grid gained the
  // roobet card, and the BC.Game grid label was corrected off the retracted
  // "None" wording. Rendered bytes changed on all three.
  '/reviews/bitstarz/kyc': '2026-08-25',
  '/reviews/bc-game/kyc': '2026-08-25',
  '/reviews/cloudbet/kyc': '2026-08-25',
  // New URLs 2026-08-25: September slate pages 2 and 3, deployed under the
  // amended caps.
  '/reviews/roobet/kyc': '2026-08-25',
  '/reviews/bc-game/withdrawal': '2026-08-25',
  '/reviews/bitstarz/bonus': '2026-08-02',
  '/crypto/bitcoin': '2026-08-01',
  '/crypto/ethereum': '2026-08-01',
  '/crypto/usdt': '2026-08-01',
  '/crypto/dogecoin': '2026-08-01',
  '/crypto/solana': '2026-08-01',
  '/crypto/bnb': '2026-08-01',
  '/country/canada': '2026-08-01',
  '/country/australia': '2026-08-01',
  '/country/new-zealand': '2026-08-01',
  '/country/ireland': '2026-08-01',
  '/country/germany': '2026-08-01',
  '/country/netherlands': '2026-08-01',
  '/country/norway': '2026-08-01',
  '/country/japan': '2026-08-01',
  '/country/sweden': '2026-08-01',
  '/country/finland': '2026-08-01',
  // Bumped 2026-09-04: verification pass against alberta.ca + Gowling WLG
  // (revenue split, election-betting ban, centralised self-exclusion vs
  // Ontario, 13 Oct transition endpoint refined, Ontario 2025 revenue);
  // Ontario FAQ line updated to launched-market wording. reviewBy tripwire
  // 2026-10-13 (transition endpoint, Gowling-verified) in STATE.md.
  '/country/canada/legal': '2026-09-04',
  // Bumped 2026-08-20: Entry 3, Senate passage 19 Aug (bill homepage anchor,
  // "Passed Both Houses"; news colour attributed in text; commencement dates
  // omitted pending the Act as made). Next event: royal assent, one-line
  // addendum, owner-triggered.
  '/country/australia/legal': '2026-08-20',
  '/game/crash': '2026-08-01',
  '/game/dice': '2026-08-01',
  '/game/plinko': '2026-08-01',
  '/bonus/welcome-bonus': '2026-08-02',
  '/bonus/no-deposit-bonus': '2026-08-02',
  '/bonus/reload-bonus': '2026-08-02',
  '/bonus/cashback': '2026-08-02',
  '/bonus/vip-bonus': '2026-08-02',
  '/bonus/high-roller-bonus': '2026-08-02',
  '/bonus/free-spins': '2026-08-02',
  '/compare/bitstarz-vs-bc-game': '2026-08-01',
  '/compare/cloudbet-vs-bitstarz': '2026-08-01',
  '/compare/7bit-casino-vs-bitstarz': '2026-08-01',
  '/compare/bc-game-vs-shuffle': '2026-08-01',
  '/compare/mirax-casino-vs-bitstarz': '2026-08-01',
  '/compare/cloudbet-vs-roobet': '2026-08-01',
}
