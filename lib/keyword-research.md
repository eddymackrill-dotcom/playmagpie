# DataForSEO Keyword Research Cache

Rules: see `CLAUDE.md` > DataForSEO cost controls.

**Before any DataForSEO call:** grep this file for the query first. If a row already exists and the data is less than ~90 days old, use the cached value instead of paying again.

**After any DataForSEO call:** append a row to the table below. Update the spend running total for the current month.

| Date       | Query | Endpoint | Volume | Diff | Intent | Cost  | Notes |
|------------|-------|----------|-------:|-----:|--------|------:|-------|
| 2026-05-26 | crypto casino ireland | kw_data/google_ads/search_volume | 50 | - | commercial | $0.05 | geo=ie, lang=en; comp=LOW (idx 7); CPC $3.93-$12.32; 2026-03 spike to 480 (likely VPN-test pollution — IE is a tested market, see lib/pollution-baseline.md); confirmation test after MCP password rotation |

## Spend running total

- 2026-05: $0.05 (1 call)

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
