# Monthly structural audit: 2026-07-07 (first Monday of July)

Run per RUNBOOK, under exceptional conditions: the site is serving-suppressed following the
June 2026 spam update (see reports/2026-07-07-weekly.md for the diagnosis and evidence chain).
The audit's indexing section doubles as the spam-update damage census.

## 1. Indexing health (full census: lib/index-census-2026-07-07.md)

Headline: **82/87 indexed, +13/-3 vs the 06-11 census, zero fetch/canonical/robots errors.**
Index membership grew while serving collapsed to zero; do not read the growth as health.

Cluster breakdown (the decision-critical table; full detail in the census file):

| Cluster | URLs | Indexed | Not indexed | Detail |
|---|---|---|---|---|
| Country hubs | 11 | 11 | 0 | all indexed |
| Brand+intent sub-pages | 11 | 9 | 2 | bitstarz/withdrawal, mirax-casino/withdrawal: Crawled - not indexed |
| Crypto tree | 9 | 9 | 0 | all indexed |
| Intent-modifier listicles | 8 | 8 | 0 | all indexed |
| Game tree | 8 | 7 | 1 | /game/live-dealer: unknown to Google (chronic orphan) |
| Bonus tree | 8 | 7 | 1 | /bonus/free-spins: unknown to Google (regressed from Discovered) |
| Casino reviews (parents) | 8 | 8 | 0 | all indexed |
| Bitcoin-commercial | 7 | 7 | 0 | all indexed, incl. post-update re-crawls |
| Guides | 6 | 5 | 1 | how-crypto-casino-withdrawals-work: Crawled - not indexed |
| Compare | 6 | 6 | 0 | all indexed |
| Trust/research | 2 | 2 | 0 | all indexed |
| Legal sub-pages | 2 | 2 | 0 | all indexed |
| Home | 1 | 1 | 0 | indexed |

**The cluster pattern's message for recovery planning:**
- The classifier did NOT deindex by cluster or by programmatic-template signature. The most
  template-adjacent sets (bitcoin-commercial x7, country hubs x11, listicles x8) are 100%
  indexed, including pages re-crawled during and after the update.
- The only quality-rejection drops are **3 withdrawal-intent pages**, including both original
  displacement proof points. mirax/withdrawal was re-crawled 06-29 (post-update) and then
  dropped, i.e. actively rejected on re-assessment, not stale-cache fallout.
- **FAQ rich results were revoked site-wide without re-crawl** (~30 pages had them on 06-11;
  zero do now; Review snippets survived). This is the clearest trust-downgrade tell and the
  earliest signal to watch for recovery.
- Net reading: site-level trust/spam classification with a withdrawal-content flag, not a
  cluster-level content-quality verdict. For the UK-site content strategy: nothing in this
  census indicts the country-hub / bitcoin-commercial / listicle formats per se; the
  withdrawal-intent rejections and the trust downgrade are the two signals to design against.

Severity: **urgent** (site-wide), but the fix is strategic, not structural per-page.

## 2. Internal-linking equity

- `/game/live-dealer`: still "URL is unknown to Google" ~4 weeks after the 06-11 orphan fix.
  The carrier (bonus/[slug] template pages) HAS been re-crawled since (06-25 to 07-03 crawls
  observed), yet Google has not queued the URL. With normal re-crawl of carriers plus
  non-discovery, the residual explanations are the link rendering only on a subset of bonus
  slugs, or Google declining to enqueue new URLs from a demoted site. Given the suppression,
  do not spend another fix cycle now; re-diagnose after serving resumes. Severity: cosmetic
  (while suppressed).
- `/bonus/free-spins`: regressed from "Discovered" to "unknown to Google": Google discarded
  the discovered-but-uncrawled URL. Same deferral. Severity: cosmetic (while suppressed).
- No other starvation: all 12 new-since-06-11 URLs were discovered and indexed fast.

## 3. Catalogue freshness (sampled: 3 operators x 2 facts)

- **BitStarz**: withdrawalTime "Under 10 minutes" matches bitstarz.com/about-us ("average
  cashout no longer than 10 minutes"); T&C states payouts "within 1 hour" upper bound. OK.
- **Cloudbet**: minDeposit "0.001 BTC equivalent" corroborated (casino.org review). **DRIFT
  FLAG:** Cloudbet's own help centre (March 2026) now promotes fiat rails: buying crypto
  in-platform via Swapped, and fiat deposits via Jeton/Vega, plus AstroPay/Skrill/Neteller/
  Apple Pay through Swapped. Our /reviews/cloudbet/payment-methods frames Cloudbet as a
  curated crypto-only book. Needs a primary-source read of the Cloudbet help pages and a
  page update if confirmed. Severity: important (it is our best-ranking sub-page when served).
- **BC.Game**: minDeposit $5 confirmed; 4-stage welcome structure with 360% top tier
  confirmed against multiple 2026 sources; catalogue's rakeback framing consistent. OK.
- Remaining 5 operators: deferred to the August audit (session scope consumed by the
  spam-update census; Roobet's entry was verified extensively in late June).

## 4. BNB Beacon Chain verification (flagged 2026-06-19, due this audit)

**Confirmed stale.** BNB Beacon Chain was fully halted at block 384,544,850 on
**19 November 2024** and validators shut down 3 December 2024, per the official BNB Chain
sunset plan (bnbchain.org/en/blog/final-sunset-plan-of-bnb-beacon-chain) and post-fusion FAQ
(docs.bnbchain.org/bc-fusion/post-fusion/faq/). Players cannot send on Beacon Chain at all.

**Proposed fix (awaiting approval, not applied):** on /crypto/bnb (intros.BNB in
app/crypto/[slug]/page.tsx) and /bnb-crypto-casinos (intro + the Binance-withdrawal FAQ),
replace the "send on BEP-20, not Beacon Chain" warning with a plain BEP-20 confirmation
("BNB moves on BNB Smart Chain (BEP-20); the legacy Beacon Chain was retired in November
2024"). Severity: important (factual staleness on a live page), one-commit fix.

## 5. Editorial drift

- Em-dash gate: 0 across all app/lib .tsx/.ts content. PASS.
- Banned-phrase grep: 0 hits. PASS.
- Sampled pages read during census work (bitcoin-commercial, bonus template, withdrawal
  template): no drift beyond the two flags above (Cloudbet payment framing; BNB warning).

## 6. Approved-vs-shipped cross-check

All owner approvals through 2026-06-29 shipped and indexed (9/9 batch URLs confirmed by owner
07-02 and re-confirmed in today's census). Nothing approved since. No gaps.

## Proposed actions (by severity, awaiting approval per RUNBOOK)

- **Urgent / strategic:** owner decision on recovery posture (pause vs continue publishing;
  whether to remediate the 3 dropped withdrawal pages or wait out reassessment). The census
  argues the problem is site-level trust, so per-page rewrites are unlikely to lift the
  suppression on their own.
- **Important:** (a) BNB Beacon Chain copy fix (one commit, verified above); (b) Cloudbet
  payment-methods primary-source verification and page update if confirmed.
- **Cosmetic / deferred:** orphan pair re-diagnosis after serving resumes; remaining 5-operator
  catalogue check at August audit.
