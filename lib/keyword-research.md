# DataForSEO Keyword Research Cache

Rules: see `CLAUDE.md` > DataForSEO cost controls.

**Before any DataForSEO call:** grep this file for the query first. If a row already exists and the data is less than ~90 days old, use the cached value instead of paying again.

**After any DataForSEO call:** append a row to the table below. Update the spend running total for the current month.

| Date       | Query | Endpoint | Volume | Diff | Intent | Cost  | Notes |
|------------|-------|----------|-------:|-----:|--------|------:|-------|
| 2026-05-26 | crypto casino ireland | kw_data/google_ads/search_volume | 50 | - | commercial | $0.05 | geo=ie, lang=en; comp=LOW (idx 7); CPC $3.93-$12.32; 2026-03 spike to 480 (likely VPN-test pollution — IE is a tested market, see lib/pollution-baseline.md); confirmation test after MCP password rotation |
| 2026-06-02 | bitstarz kyc | kw_data/google_ads/search_volume | 10 | - | navigational | $0.075 | geo=ca, lang=en; comp=LOW; stable 10/mo across 12mo; batch of 8 keywords — $0.075 is the total batch cost, written against this lead row; remaining 7 rows below are $0 |
| 2026-06-02 | bitstarz kyc requirements | kw_data/google_ads/search_volume | <10 | - | navigational | $0 | geo=ca; null volume (sub-10 reporting floor) BUT GSC shows "bitstarz kyc requirements 2026" at pos 12 with live impressions — GSC ground-truth demand exists below Ads floor; batch |
| 2026-06-02 | bc game kyc | kw_data/google_ads/search_volume | 10 | - | navigational | $0 | geo=ca; stable 10/mo; pairs with GSC "does bc.game require kyc 2026" pos 14; batch |
| 2026-06-02 | cloudbet kyc | kw_data/google_ads/search_volume | 10 | - | navigational | $0 | geo=ca; comp=LOW; was 20/mo mid-2025, now 10; GSC "cloudbet kyc" pos 35.8; batch |
| 2026-06-02 | 7bit casino kyc | kw_data/google_ads/search_volume | <10 | - | navigational | $0 | geo=ca; null volume (sub-floor); NO GSC signal either — demand unconfirmed both sources; batch |
| 2026-06-02 | bitstarz bonus | kw_data/google_ads/search_volume | 10 | - | commercial | $0 | geo=ca; comp=LOW; CPC $7.14 (high commercial value); spiked to 40 in 2026-04; but ZERO GSC signal currently; batch |
| 2026-06-02 | bitstarz wagering requirements | kw_data/google_ads/search_volume | <10 | - | informational | $0 | geo=ca; null volume (sub-floor); batch |
| 2026-06-02 | duelbits withdrawal | kw_data/google_ads/search_volume | 10 | - | navigational | $0 | geo=ca; stable 10/mo; GSC "duelbits withdrawal time" already pos 10; batch |
| 2026-06-08 | crypto sportsbook | kw_data/google_ads/search_volume | 170 | - | commercial | $0.075 | geo=ca, lang=en; comp=LOW; 12mo range 90-320; batch of 5 keywords — $0.075 total batch cost written against this lead row, remaining 4 rows $0 |
| 2026-06-08 | crypto casino with sportsbook | kw_data/google_ads/search_volume | <10 | - | commercial | $0 | geo=ca; null volume (sub-floor); the exact-match phrasing is sub-floor but the head term "crypto sportsbook" carries the volume; batch |
| 2026-06-08 | best crypto sportsbook | kw_data/google_ads/search_volume | 50 | - | commercial | $0 | geo=ca; comp=LOW; **CPC $25.67** (very high commercial value); 12mo range 30-110; batch |
| 2026-06-08 | bitcoin sportsbook | kw_data/google_ads/search_volume | <10 | - | commercial | $0 | geo=ca; null volume (sub-floor) — "crypto" framing outweighs "bitcoin" for this term; batch |
| 2026-06-08 | crypto betting sites | kw_data/google_ads/search_volume | 210 | - | commercial | $0 | geo=ca; comp=LOW; highest of the set, 12mo range 110-390; batch |
| 2026-06-22 | bitstarz minimum deposit | kw_data/google_ads/search_volume | 10 | 23 | navigational | $0.075 | geo=ca, lang=en; comp=LOW (idx 23); very stable 10/mo across 11mo; GSC corroborates ("bitstarz minimum deposit" pos 37, 1 imp); batch of 3 deposit/payment keywords — $0.075 total batch cost written against this lead row, remaining 2 rows $0 |
| 2026-06-22 | bitstarz deposit | kw_data/google_ads/search_volume | 10 | - | navigational | $0 | geo=ca; stable 10/mo (one 20/mo spike 2025-09); batch |
| 2026-06-22 | bitstarz payment methods | kw_data/google_ads/search_volume | 10 | - | navigational | $0 | geo=ca; comp=LOW; intermittent reporting (only 2026-05 + 2025-11 surfaced, else sub-floor); batch. Validates /reviews/bitstarz/payment-methods candidate — same volume band as the working kyc sub-pages (all 10/mo) and the cloudbet/payment-methods proof page |
| 2026-06-29 | bc game payment methods | kw_data/google_ads/search_volume | 10 | - | navigational | $0.075 | geo=ca, lang=en; comp=LOW; stable 10/mo (2025-06, 08, 10, 11, 2026-05 reported, else sub-floor); batch of 3 BC.Game deposit/payment keywords — $0.075 total batch cost written against this lead row, remaining 2 rows $0. GSC silent on payment intent for BC.Game, so DataForSEO is sole confirm; same 10/mo band that justified the bitstarz + cloudbet payment-methods pages. Validates /reviews/bc-game/payment-methods build |
| 2026-06-29 | bc game deposit | kw_data/google_ads/search_volume | 10 | - | navigational | $0 | geo=ca; stable 10/mo (2025-06 through 2025-12 reported); batch |
| 2026-06-29 | bc game minimum deposit | kw_data/google_ads/search_volume | 10 | - | navigational | $0 | geo=ca; comp=LOW; very stable 10/mo across all 12 months reported (strongest of the three); batch |
| 2026-07-13 | site:www.playmagpie.com | serp/organic_live_advanced (BING) | 0 results | - | probe | $0.05 | Bing existence probe for the AI-assistant channel session: Bing returned "No Search Results" (API code 40102) = zero pages indexed on the www host. Not a keyword-volume row; logged for spend tracking |
| 2026-07-13 | site:playmagpie.com | serp/organic_live_advanced (BING) | 0 results | - | probe | $0.05 | Same probe, whole domain incl. apex: also zero. Bing has NO pages from playmagpie.com on any host; Bing Webmaster Tools setup + sitemap submission is the fix path |
| 2026-07-16 | site:playmagpie.com | serp/organic_live_advanced (BING) | 0 results | - | probe | $0.05 | Follow-up probe 3 days after Bing WMT setup: still "No Search Results" (code 40102). Bing's public index remains empty for the domain; WMT Site Explorer discovery (owner-side) is not yet translating to indexed/served pages. Expected at day 3; re-probe at the next weekly recovery check |
| 2026-07-25 | site:playmagpie.com | serp/organic_live_advanced (BING) | 0 results | - | probe | $0.05 | Weekly recovery-check probe, 12 days after Bing WMT setup: still "No Search Results" (code 40102). Third consecutive zero. Owner WMT shows Search Performance impressions + Site Explorer coverage, so Bing is crawling/serving via WMT telemetry while the public site: operator still returns nothing; treat site: as a lagging indicator for this domain |
| 2026-07-25 | bitstarz withdrawal time | serp/organic_live_advanced (BING) | absent top 20 | - | serving check | $0.05 | Live Bing SERP, US desktop, depth 20: playmagpie.com ABSENT. The 07-16 owner WMT reading (11 imp, pos 9 on this query) does not reproduce in the public US SERP; either market-specific serving, Bing SERP volatility for barely-indexed pages, or the impressions came from a different Bing surface (e.g. Copilot/partner). Do not treat pos 9 as a stable public ranking yet |
| 2026-08-02 | bitstarz no deposit bonus | kw_data/google_ads/search_volume | 480 | 11 | commercial | $0.075 | geo=ca, lang=en; comp=LOW (idx 11); **CPC $12.33**; highly stable across 12mo, range 320-720, no single-month spike carrying the average. **Highest-volume validated keyword on this site to date, ~40x the 10/mo band every existing brand+intent sub-page was built on.** Zero GSC impressions across the whole clean window, so the site has never surfaced for it at all: absence here is non-coverage, not tested-and-failed. Note the honest editorial angle: the parent review states BitStarz has no standing no-deposit offer, so the page answering this query answers it "no, and here is what exists instead". Batch of 8 BitStarz bonus/fee keywords, $0.075 total batch cost written against this lead row; remaining 7 rows $0 |
| 2026-08-02 | bitstarz bonus code | kw_data/google_ads/search_volume | 390 | 9 | commercial | $0 | geo=ca; comp=LOW; **CPC $27.17**, the highest CPC ever returned for this site bar "best crypto sportsbook"; stable 260-590 across 12mo. NOT proposed as a page: we hold no verified bonus code, so verify-or-omit blocks the page's own premise, and the page shape (coupon farm) is the scaled-thin-affiliate pattern the June 2026 classifier targets. Recorded so the volume is not rediscovered and mistaken for an opportunity; batch |
| 2026-08-02 | bitstarz free spins | kw_data/google_ads/search_volume | 40 | 11 | commercial | $0 | geo=ca; comp=LOW; 12mo range 20-90, declining trend through 2026; no CPC returned. Partially occupied already by /bonus/free-spins, which carries a BitStarz free-spins data block incl. the §1.1 cap; batch |
| 2026-08-02 | bitstarz bonus | kw_data/google_ads/search_volume | 20 | 6 | commercial | $0 | geo=ca; comp=LOW; **CPC $32.91** (the 2026-06-02 read recorded $7.14 at 10/mo, so both volume and CPC have risen); 10/mo baseline with a 2026-04 to 06 lift to 40/30/70. Supersedes the 2026-06-02 row for currency, does not replace it; batch |
| 2026-08-02 | bitstarz welcome bonus | kw_data/google_ads/search_volume | 10 | 7 | commercial | $0 | geo=ca; comp=LOW; flat 10-20/mo across 12mo; batch |
| 2026-08-02 | bitstarz wagering requirements | kw_data/google_ads/search_volume | <10 | - | informational | $0 | geo=ca; null volume (sub-10 reporting floor), unchanged from the 2026-06-02 read; batch |
| 2026-08-02 | bitstarz withdrawal fee | kw_data/google_ads/search_volume | <10 | - | informational | $0 | geo=ca; **null volume (sub-floor)**. Load-bearing negative result: the owner-verified "no fees on any withdrawal" fact has NO measurable standalone search demand, so it is a supporting fact inside a page rather than a page spine. It is also already published on /reviews/bitstarz/withdrawal (meta description, a dedicated section and an FAQ); batch |
| 2026-08-02 | bitstarz fees | kw_data/google_ads/search_volume | <10 | - | informational | $0 | geo=ca; null volume (sub-floor); same conclusion as the row above; batch |

## Spend running total

- 2026-05: $0.05 (1 call)
- 2026-06: $0.30 (4 calls — 8-keyword KYC batch on 06-02 + 5-keyword sportsbook batch on 06-08 + 3-keyword bitstarz deposit/payment batch on 06-22 + 3-keyword bc-game deposit/payment batch on 06-29; MCP returned no explicit cost field, $0.075/call standard estimate)
- 2026-08: $0.075 (1 call — 8-keyword BitStarz bonus/fee validation batch on 08-02, run to score the final August page candidate before the owner chooses rather than after; $0.075/call standard estimate)
- 2026-07: $0.25 (5 calls — Bing site: existence probes on 07-13, follow-up probe on 07-16, weekly probe + bitstarz-withdrawal-time serving check on 07-25; $0.05/call estimate for SERP live advanced)

## Conventions

- **Date**: YYYY-MM-DD of the call.
- **Query**: exact query string passed to DataForSEO. Quote it if it contains pipes or special chars.
- **Endpoint**: the DataForSEO endpoint family used (e.g. `keyword_data/volume`, `serp/google/organic`, `dataforseo_labs/keyword_ideas`).
- **Volume**: monthly search volume returned. `-` if endpoint doesn't return volume.
- **Diff**: keyword difficulty (0-100). `-` if not applicable.
- **Intent**: `informational` / `commercial` / `transactional` / `navigational` / `mixed`. Use the DataForSEO-returned intent when available; otherwise classify from SERP composition.
- **Cost**: actual cost of the call in USD. Use the per-call cost shown in the MCP response, not the rule-of-thumb estimate.
- **Notes**: anything that affects how this data should be interpreted later. Examples: "geo=ie", "pre-VPN-test baseline", "batch of 20 — cost is total for the batch row written against the lead keyword".

## Stale entries

A cached row older than ~90 days should be treated as a hint, not a fact — search volumes drift, keyword difficulty changes as competition shifts. For a row that's gone stale and is load-bearing for a current decision, re-query and append a new dated row rather than editing the old one. The history of how a query's metrics moved is itself useful signal.
