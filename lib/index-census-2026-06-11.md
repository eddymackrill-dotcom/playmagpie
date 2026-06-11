# Index census — 2026-06-11

Live indexed-URL census, built by **single-URL `inspect_url_enhanced`** over **all 75 sitemap
URLs** on 2026-06-11 (www host, `sc-domain:playmagpie.com`). Diffs against the 2026-06-09
baseline (`lib/index-census-2026-06-09.md`) for the measured membership comparison
(growing vs churning).

**Method note:** the GSC API does not expose the Page Indexing aggregate report, so this
census is reconstructed from per-URL inspection of the sitemap universe (75 URLs). Every URL
was inspected via the authoritative single-URL endpoint — no batch endpoint was used, so the
batch-vs-single disagreement caveat from the baseline does not apply to this census. It does
NOT include non-sitemap URLs Google may know (e.g. `/privacy`, `/terms`, `/contact`,
`/icon.png`, apex/duplicate variants) — those can't be enumerated via the API.

## Summary
- **Sitemap URLs:** 75
- **Indexed ("Submitted and indexed"):** 72
- **Not indexed:** 3
- **Zero "Crawled – currently not indexed" states site-wide** — the quality-rejection bucket is empty.
- GSC's sitemap report remains stale (last downloaded 2026-05-30, `url_count` 68 vs 75 live). The live census supersedes it; sitemap resubmission is being handled separately today.

## Not indexed (the gap) — 3 URLs
| URL | State | Last crawled | Class |
|---|---|---|---|
| `/bonus/free-spins` | Discovered – currently not indexed | Never | Crawl-queue lag — **progressed** from "URL unknown to Google" at baseline; Google has now discovered it and it awaits crawl. |
| `/game/live-dealer` | **URL is unknown to Google** | Never | **REGRESSED** from "Discovered – currently not indexed" at baseline. Genuine orphan — zero contextual prose inbound links in the codebase (hub tile + sitemap only). Orphan fix shipping in same-day batch. |
| `/research/crypto-casino-bonus-transparency` | URL is unknown to Google | Never | New URL (published 2026-06-09, not in baseline). Its carrier pages were last crawled before the inbound links shipped, so Google hasn't seen the links yet. Expected — discovery pending carrier re-crawl. |

## Diff vs 2026-06-09 baseline
- **Newly indexed (+2):**
  - `/crypto` — was "Crawled – currently not indexed" at baseline, now "Submitted and indexed". **Ambiguity:** its `last_crawled` is still 2026-05-26, i.e. Google did NOT re-crawl between censuses. Either Google re-assessed the existing crawl and admitted it, OR the baseline's "Crawled – not indexed" reading was a batch-endpoint artefact (the baseline used batch inspection for some URLs; single-URL is authoritative per the GSC MCP gotchas). Cannot distinguish from the data — on the watch-list.
  - `/compare/mirax-casino-vs-bitstarz` — was "Discovered – currently not indexed" at baseline; crawled and indexed 2026-06-09. Clean crawl-queue resolution.
- **Dropped (0):** no URL that was indexed at baseline has left the index.
- **New sitemap URLs not in baseline (+1):** `/research/crypto-casino-bonus-transparency` (published 2026-06-09; not yet known to Google — see gap table).
- **Verdict: growing, not churning.** 70 → 72 indexed, zero drops, zero "Crawled – currently not indexed" states anywhere. The thin-hub problem flagged in the baseline did **not** spread — `/game` and `/bonus` remain indexed, and `/crypto` itself has recovered (with the caveat above).

## Full per-URL table (75 URLs)
All paths are on `https://www.playmagpie.com`. Rich results column shows detected types from the inspection's rich-results verdict.

| URL | Coverage state | Last crawled | Rich results |
|---|---|---|---|
| `/` | Submitted and indexed | 2026-06-04 | — |
| `/about` | Submitted and indexed | 2026-05-18 | — |
| `/best-crypto-casinos` | Submitted and indexed | 2026-06-08 | Breadcrumbs |
| `/best-crypto-pokies-nz` | Submitted and indexed | 2026-05-26 | Breadcrumbs, FAQ |
| `/bnb-crypto-casinos` | Submitted and indexed | 2026-05-30 | Breadcrumbs, FAQ |
| `/bonus` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/bonus/cashback` | Submitted and indexed | 2026-05-20 | Breadcrumbs, FAQ |
| `/bonus/free-spins` | Discovered – currently not indexed | Never | — |
| `/bonus/high-roller-bonus` | Submitted and indexed | 2026-05-26 | Breadcrumbs, FAQ |
| `/bonus/no-deposit-bonus` | Submitted and indexed | 2026-05-24 | Breadcrumbs, FAQ |
| `/bonus/reload-bonus` | Submitted and indexed | 2026-05-18 | Breadcrumbs, FAQ |
| `/bonus/vip-bonus` | Submitted and indexed | 2026-05-28 | Breadcrumbs, FAQ |
| `/bonus/welcome-bonus` | Submitted and indexed | 2026-05-16 | Breadcrumbs, FAQ |
| `/compare` | Submitted and indexed | 2026-05-20 | — |
| `/compare/7bit-casino-vs-bitstarz` | Submitted and indexed | 2026-05-22 | Breadcrumbs, FAQ |
| `/compare/bc-game-vs-shuffle` | Submitted and indexed | 2026-05-20 | Breadcrumbs |
| `/compare/bitstarz-vs-bc-game` | Submitted and indexed | 2026-05-17 | Breadcrumbs |
| `/compare/cloudbet-vs-bitstarz` | Submitted and indexed | 2026-05-26 | Breadcrumbs, FAQ |
| `/compare/mirax-casino-vs-bitstarz` | Submitted and indexed | 2026-06-09 | Breadcrumbs, FAQ |
| `/country` | Submitted and indexed | 2026-06-03 | Breadcrumbs |
| `/country/australia` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/country/canada` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/country/germany` | Submitted and indexed | 2026-05-23 | Breadcrumbs |
| `/country/ireland` | Submitted and indexed | 2026-05-25 | Breadcrumbs |
| `/country/japan` | Submitted and indexed | 2026-05-27 | Breadcrumbs |
| `/country/netherlands` | Submitted and indexed | 2026-05-22 | Breadcrumbs |
| `/country/new-zealand` | Submitted and indexed | 2026-05-16 | Breadcrumbs |
| `/country/norway` | Submitted and indexed | 2026-05-28 | Breadcrumbs |
| `/country/sweden` | Submitted and indexed | 2026-05-26 | Breadcrumbs, FAQ |
| `/crypto` | Submitted and indexed | 2026-05-26 | Breadcrumbs |
| `/crypto-casinos-with-sportsbook` | Submitted and indexed | 2026-06-08 | Breadcrumbs, FAQ |
| `/crypto/bitcoin` | Submitted and indexed | 2026-06-10 | Breadcrumbs |
| `/crypto/bnb` | Submitted and indexed | 2026-05-20 | Breadcrumbs |
| `/crypto/dogecoin` | Submitted and indexed | 2026-05-24 | Breadcrumbs |
| `/crypto/ethereum` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/crypto/litecoin` | Submitted and indexed | 2026-05-17 | Breadcrumbs |
| `/crypto/solana` | Submitted and indexed | 2026-05-21 | Breadcrumbs |
| `/crypto/usdc` | Submitted and indexed | 2026-05-26 | Breadcrumbs |
| `/crypto/usdt` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/fast-withdrawal-casinos` | Submitted and indexed | 2026-06-03 | Breadcrumbs |
| `/game` | Submitted and indexed | 2026-05-20 | Breadcrumbs |
| `/game/blackjack` | Submitted and indexed | 2026-05-17 | Breadcrumbs |
| `/game/crash` | Submitted and indexed | 2026-05-28 | Breadcrumbs, FAQ |
| `/game/dice` | Submitted and indexed | 2026-05-30 | Breadcrumbs, FAQ |
| `/game/live-dealer` | **URL is unknown to Google** | Never | — |
| `/game/plinko` | Submitted and indexed | 2026-05-30 | Breadcrumbs, FAQ |
| `/game/roulette` | Submitted and indexed | 2026-05-21 | Breadcrumbs |
| `/game/slots` | Submitted and indexed | 2026-05-17 | Breadcrumbs |
| `/guides` | Submitted and indexed | 2026-05-19 | Breadcrumbs |
| `/guides/best-crypto-for-gambling` | Submitted and indexed | 2026-06-06 | Breadcrumbs, FAQ |
| `/guides/bitcoin-vs-usdt-casinos` | Submitted and indexed | 2026-06-03 | Breadcrumbs, FAQ |
| `/guides/do-crypto-casinos-require-kyc` | Submitted and indexed | 2026-06-02 | Breadcrumbs, FAQ |
| `/guides/how-casino-bonuses-really-work` | Submitted and indexed | 2026-05-28 | Breadcrumbs, FAQ |
| `/guides/how-crypto-casino-withdrawals-work` | Submitted and indexed | 2026-05-30 | Breadcrumbs, FAQ |
| `/high-roller-casinos` | Submitted and indexed | 2026-06-03 | Breadcrumbs |
| `/no-kyc-casinos` | Submitted and indexed | 2026-06-06 | Breadcrumbs |
| `/no-limit-withdrawal-casinos` | Submitted and indexed | 2026-05-26 | Breadcrumbs, FAQ |
| `/research/crypto-casino-bonus-transparency` | **URL is unknown to Google** | Never | — |
| `/reviews/7bit-casino` | Submitted and indexed | 2026-06-03 | Breadcrumbs, FAQ, Review snippets |
| `/reviews/7bit-casino/withdrawal` | Submitted and indexed | 2026-06-07 | Breadcrumbs, FAQ |
| `/reviews/bc-game` | Submitted and indexed | 2026-06-04 | Breadcrumbs, FAQ, Review snippets |
| `/reviews/bc-game/kyc` | Submitted and indexed | 2026-06-02 | Breadcrumbs, FAQ |
| `/reviews/bitstarz` | Submitted and indexed | 2026-05-14 | Breadcrumbs, FAQ, Review snippets |
| `/reviews/bitstarz/kyc` | Submitted and indexed | 2026-06-02 | Breadcrumbs, FAQ |
| `/reviews/bitstarz/withdrawal` | Submitted and indexed | 2026-06-07 | Breadcrumbs, FAQ |
| `/reviews/cloudbet` | Submitted and indexed | 2026-06-08 | Breadcrumbs, FAQ, Review snippets |
| `/reviews/cloudbet/kyc` | Submitted and indexed | 2026-06-02 | Breadcrumbs, FAQ |
| `/reviews/cloudbet/payment-methods` | Submitted and indexed | 2026-05-30 | Breadcrumbs, FAQ |
| `/reviews/cloudbet/withdrawal` | Submitted and indexed | 2026-05-30 | Breadcrumbs, FAQ |
| `/reviews/duelbits` | Submitted and indexed | 2026-06-08 | Breadcrumbs, FAQ, Review snippets |
| `/reviews/duelbits/withdrawal` | Submitted and indexed | 2026-06-08 | Breadcrumbs, FAQ |
| `/reviews/mirax-casino` | Submitted and indexed | 2026-06-03 | Breadcrumbs, FAQ, Review snippets |
| `/reviews/mirax-casino/withdrawal` | Submitted and indexed | 2026-06-07 | Breadcrumbs, FAQ |
| `/reviews/roobet` | Submitted and indexed | 2026-06-08 | Breadcrumbs, FAQ, Review snippets |
| `/reviews/shuffle` | Submitted and indexed | 2026-05-16 | Breadcrumbs, FAQ, Review snippets |

## Notes

### GSC sitemap report is stale
The sitemap entry under `sc-domain:playmagpie.com` was last downloaded 2026-05-30 and reports
`url_count` 68 vs 75 URLs live in the sitemap. The report lags reality by ~12 days of
publishing. Resubmission is being handled separately today — do not read the sitemap report's
counts as current.

### 21 indexed URLs have >3-week-stale last-crawl
Cutoff: last crawled before 2026-05-21 (21 days before this census). These pages will NOT
promptly propagate any internal links added to them unless they are themselves modified —
this list re-confirms the crawl-discovery rule (link from a same-batch-*modified* page; never
rely on an unmodified carrier).

| URL | Last crawled |
|---|---|
| `/reviews/bitstarz` | 2026-05-14 |
| `/bonus` | 2026-05-15 |
| `/country/australia` | 2026-05-15 |
| `/country/canada` | 2026-05-15 |
| `/crypto/ethereum` | 2026-05-15 |
| `/crypto/usdt` | 2026-05-15 |
| `/bonus/welcome-bonus` | 2026-05-16 |
| `/country/new-zealand` | 2026-05-16 |
| `/reviews/shuffle` | 2026-05-16 |
| `/compare/bitstarz-vs-bc-game` | 2026-05-17 |
| `/crypto/litecoin` | 2026-05-17 |
| `/game/blackjack` | 2026-05-17 |
| `/game/slots` | 2026-05-17 |
| `/about` | 2026-05-18 |
| `/bonus/reload-bonus` | 2026-05-18 |
| `/guides` | 2026-05-19 |
| `/bonus/cashback` | 2026-05-20 |
| `/compare` | 2026-05-20 |
| `/compare/bc-game-vs-shuffle` | 2026-05-20 |
| `/crypto/bnb` | 2026-05-20 |
| `/game` | 2026-05-20 |

### `/reviews/bitstarz` stored apex user_canonical artefact
The inspection's stored `user_canonical` for `/reviews/bitstarz` is
`https://playmagpie.com/reviews/bitstarz` (apex form), while `google_canonical` is the correct
www form. This is a stored artefact from the page's last crawl (2026-05-14, the oldest on the
site, predating canonical fixes). The live page serves the correct www canonical, so this
self-resolves on next crawl. No action needed; noted so the next census doesn't re-discover it.

### Apex domain now 308→www
The apex (`playmagpie.com`) returned a clean 308 redirect to `www.playmagpie.com` on 4/4
fetches, tested 2026-06-11 from one network. The previously-flagged intermittent
200/timeout behaviour (see CLAUDE.md follow-up audit list, 2026-06-02) was not reproduced.
Single-network test only — not yet grounds to mark the audit item resolved, but the
behaviour is now consistent with a correctly configured apex→www redirect.

## Watch-list for next census
1. **`/crypto`** — recovered to indexed, but `last_crawled` still 2026-05-26 means we can't
   distinguish a genuine Google re-assessment from a baseline batch-endpoint artefact. If it
   holds "Submitted and indexed" through a fresh crawl, treat as recovered; if it flips back,
   the thin-hub quality concern stands.
2. **`/game/live-dealer`** — regressed to "URL is unknown to Google"; genuine orphan. The
   contextual-prose-link fix ships in a same-day batch — verify discovery and crawl next census.
3. **`/bonus/free-spins`** — progressed to "Discovered"; pure crawl-queue lag now. Should
   resolve without intervention; escalate only if still uncrawled next census.
4. **`/research/crypto-casino-bonus-transparency`** — new research asset, unknown to Google
   because carrier pages haven't been re-crawled since its links shipped. Verify discovery.
5. **`/game` and `/bonus` hubs** — still indexed; keep watching for the thin-hub pattern
   (both have stale last-crawls: 2026-05-20 and 2026-05-15).

## How to diff next census
1. Re-run the same all-sitemap-URL census using **single-URL `inspect_url_enhanced` only**
   (the batch endpoint can return stale/contradictory coverage states).
2. Compare the indexed set against the 72 indexed URLs above:
   - **Added** (new ∈ indexed, ∉ this census) → growth.
   - **Dropped** (∈ this census's indexed set, now NOT indexed) → churn. Any drop is the real signal.
3. Work the watch-list above before drawing conclusions from raw counts.
