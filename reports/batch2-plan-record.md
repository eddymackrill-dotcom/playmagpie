# Batch 2 de-templating: approved plan record

Committed 2026-08-08. The plan was drafted and approved in the 2026-08-07/08
planning session but existed only in that session's transcript; this file makes
it durable. Wording below is the approved wording (including the owner's
amendments), restated em-dash-free. The verbatim transcript extract is not
needed once this exists.

## Scope and sequencing (owner-approved)

28 leaf URLs in four sub-batches, in order:

- **2a: bonus/[slug], 7 URLs** (6 dynamic + `/bonus/free-spins` via the
  static-segment pattern, Sweden/Finland precedent). **Ships first.**
- **2b: crypto (5 copy) + game (3).** `/crypto/bnb` enters the Record verbatim,
  no copy change, no dispatch.
- **2c: compare (6).** Allowlist unified to one `as const` source (kills the
  route/sitemap mirror-drift risk).
- **2d: statics (6).** No data layer (deliberate deviation): direct in-file
  edits + `route-lastmod.ts` bumps.

**2b, 2c and 2d are GATED on Checkpoint B (~2026-08-21: Google recrawl observed
on the Batch 1 country pages).** Do not start them before it.

**Hubs stay OUT, all five** (`/bonus /crypto /country /guides /compare`),
including `/country` with its 8 AI citations.

## Mechanics (Batch 1 pattern, all sub-batches)

`as const` slug list; typed `Record<Slug, Editorial>` with NO fallback (TS2741
fires on a missing entry, verified by removal test); runtime throw in the
route; per-slug `modified` feeding the sitemap (floor map becomes fallback-only
for these routes); title <=60 where achievable; meta <=160; no bare
year-stamps; no unsourced count claims; body-swap test; bodies untouched.
Commit structure per sub-batch: data-layer commit (verbatim current strings,
behaviour-neutral, byte-diff spot-check) then copy commit (with `modified`
bumps). Pre-commit gates: em-dash grep 0, banned phrases 0, single
"| PlayMagpie" suffix, title != h1, build green.

## 2a: the approved bonus heading sets

Per-slug editorial fields extend the existing type in `lib/bonus-content.ts`
(NOT a second file): title, h1, metaDescription, subHead, howItWorksHeading,
rankedHeading, termsNote, stripFraming, modified.

| Slug | title | h1 | meta (<=160) |
|---|---|---|---|
| welcome-bonus | `Crypto Casino Welcome Bonuses: The 4-Deposit Structure` (54) | `Welcome Bonuses at Crypto Casinos: What the Headline Number Hides` | `Operators match 100% to 500% across up to four deposits, then take it back with 40-45x wagering. The packages decoded, from 5 BTC headlines to staged rakeback.` (158) |
| no-deposit-bonus | `Crypto Casino No Deposit Bonuses: Free Credit, Real Caps` (56) | `No Deposit Bonuses: The Free Sample With a Cashout Ceiling` | `$10-$50 in credit or 20-50 spins just for registering, then a hard cashout cap: BitStarz publishes EUR 100 under T&C 1.1. What survives the wagering, per operator.` (160) |
| reload-bonus | `Crypto Casino Reload Bonuses: The Retention Maths` (49) | `Reload Bonuses: What the Weekly Deposit Offer Actually Pays` | `Reloads sit between the welcome headline and free-spin crumbs: 25% Monday offers, tier-scaled dailies, and the wagering that decides if any of it pays.` (150) |
| cashback | `Crypto Casino Cashback: Skipping the Wagering Trap` (50, owner-selected trim) | `Cashback at Crypto Casinos: Why the Boring Bonus Wins` | `Cashback removes the two mechanics that gut every other offer: wagering requirements and cashout caps. 15-25% at top VIP tiers, weekly net-loss, live rakeback.` (157) |
| free-spins | `Crypto Casino Free Spins: Headline Counts vs Cashout Value` (58) | `Free Spins: Why 200 Spins Can Be Worth Less Than 20` | `Spin value is set by stake size, eligible games, win caps and wagering, not the headline count. Per-operator T&C figures, clause-sourced where published.` (152) |
| vip-bonus | `Crypto Casino VIP Programmes: Tiers, Rakeback and Hosts` (55) | `VIP Bonuses: Where Crypto Casinos Do Their Real Retention Work` | `The welcome offer recruits; the VIP ladder retains. Points progression, real-time rakeback, invite-only hosts, and which structures pay without wagering.` (152) |
| high-roller-bonus | `High Roller Bonus Terms: Wagering, Caps & Negotiation` (53; existing good title, year-stamp removed) | unchanged (already distinct) | existing meta trimmed to <=160 |

**No-deposit meta, Gate 2 (RESOLVED 2026-08-08, PASS):** the "BitStarz
publishes EUR 100 under T&C 1.1" claim is covered by existing owner-primary
verification: bitstarz.com/promotions T&C owner-pulled 2026-05-30 (primary,
clause-level; lib/casinos.ts header), survived the owner's 2026-07-16 live
BitStarz bonus-T&C read (the read that removed the 25% fee and Mirax cap), and
is the load-bearing claim of the owner-approved `/reviews/bitstarz/bonus`
(fa1cb20). **The approved operator-specific meta ships.** The fallback variant
(recorded in case the claim is ever retracted): `$10-$50 in credit or 20-50
spins just for registering, then a hard cashout cap decides what you keep. What
survives the wagering, per operator.`

**Boilerplate dispositions:** sub-head ("Real terms: wagering multipliers..."),
how-it-works H2 (de-stamped), ranked H2, terms note, strip framing all go
per-slug; FAQ block, breadcrumb and back-link are kept.

**The "terms verified independently" line is REPLACED everywhere it renders**
(it contradicts /methodology, which denies independent testing). Approved
wording, varied per slug on this footing, em-dash-free in code:

> "Structures below are read from each operator's published bonus T&Cs, clause
> numbers where they exist, 'not documented' where they don't. We read terms;
> we don't run lab tests."

**Free-spins carrier link (approved):** `/bonus/free-spins` is "URL is unknown
to Google" per the 07-07 census (chronic orphan, never crawled). One
contextual prose link from a same-commit-modified sibling bonus page, per the
CLAUDE.md crawl-discovery rule. Sentence to be shown in the ship report.

## Bing exposure (verified against the 2026-08-07 baseline CSVs)

- `/bonus/no-deposit-bonus`: 4 imp, pos 5.5 on one long-tail keyword; "no
  deposit bonus" kept contiguous in its new title.
- Everything else in 2a scope: zero rows across all three baseline CSVs.
- `/compare/cloudbet-vs-roobet`: zero rows (checked specifically).

## Pre-ship gates for 2a (owner-set, all three before any commit)

1. **GSC access restored** (reauthenticate + live call). FAILED 2026-08-08;
   see STATE.md decisions entry for the daily-17:49 credential-wipe finding.
2. **BitStarz EUR 100 / T&C 1.1 verification.** PASSED 2026-08-08 (above).
3. **Fresh GSC baseline for the 7 bonus URLs** (index state + last crawl per
   URL, free-spins status specifically, plus sitewide Page indexing totals as
   the first post-outage reading). Blocked by gate 1.

## Constraints carried from the approval

- Goal is Google ranking/visibility only. No pages deleted, redirected or
  noindexed; grids, CTA strips and affiliate links untouched.
- Cloudbet patch stays parked; no commit touches lib/casinos.ts.
- No GSC submissions (Request Indexing stays manual and deferred).
- Dispatch after 2a ships: one workflow_dispatch run, the 7 bonus URLs
  (within the 10-URL cap), fired by the owner.
- Post-ship: STATE.md updated (commits, Gate 2 outcome, carrier sentence,
  baseline, 14-day crawl watch), RUNBOOK weekly check gains the 7 bonus URLs
  on the crawl watch alongside the country pages.
