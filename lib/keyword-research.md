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

## Spend running total

- 2026-05: $0.05 (1 call)
- 2026-06: $0.30 (4 calls — 8-keyword KYC batch on 06-02 + 5-keyword sportsbook batch on 06-08 + 3-keyword bitstarz deposit/payment batch on 06-22 + 3-keyword bc-game deposit/payment batch on 06-29; MCP returned no explicit cost field, $0.075/call standard estimate)

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
