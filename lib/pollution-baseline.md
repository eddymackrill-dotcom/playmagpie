# GSC Pollution Baseline Analysis

**Captured**: 2026-05-26
**Author**: Claude Code session, working from Eddy's pollution flag

## Why this file exists

Eddy has been manually search-testing PlayMagpie from VPN exit nodes in Ireland, New Zealand, Australia, Germany and Norway. An unknown share of GSC impressions from those geographies are his own searches, not real users. This document quantifies that pollution so future content-selection decisions can discount affected query volumes proportionally.

## Data window

Site GSC activity began **2026-05-12**. The 90-day window 2026-02-27 → 2026-05-26 was queried, but all impressions fall inside a 14-day band (May 12 → May 25, with May 26 incomplete). There is **no clean pre-VPN baseline window available** — the site started ranking after Eddy began testing.

Daily impression curve (Window 2026-02-27 → 2026-05-26):

| Date       | Impressions |
|------------|------------:|
| 2026-05-12 |           3 |
| 2026-05-13 |          20 |
| 2026-05-14 |          43 |
| 2026-05-15 |         119 |
| 2026-05-16 |         166 |
| 2026-05-17 |         293 |
| 2026-05-18 |         312 |
| 2026-05-19 |         379 |
| 2026-05-20 |         426 |
| 2026-05-21 |         437 |
| 2026-05-22 |         476 |
| 2026-05-23 |         418 |
| 2026-05-24 |         524 |
| 2026-05-25 |         489 |

Implication: the "28-day GSC window" cited in proposals only represents ~14 days of real signal. Sample sizes per query are smaller than face-value impression counts suggest, and the baseline is unstable.

## Methodology

Two pollution tests applied per tested geography:

1. **Single-query concentration**: percentage of a country's total impressions consumed by its top query. Real organic traffic disperses across many variants; one tester repeating the same query concentrates volume in a single phrasing.
2. **CTR test**: at average positions 25-40, real users still click at ~0.3-1%. Test searches click at 0% by definition. A high-impression, zero-click country is suspect.

Geographic concentration alone is NOT a pollution marker — "crypto casino ireland" naturally gets searched 95%+ from Ireland regardless of who's doing it.

## Per-market pollution estimates

### Ireland — HIGH POLLUTION

- Total impressions from `irl`: 906 (largest of any country)
- Top query: `"crypto casino ireland"` — **741 of 906 = 82% concentration**
- CTR: 1 click / 906 impressions = 0.11% at avg pos 29.6 (expected ~0.5-1% at this position)
- Estimate: **65-80% of "crypto casino ireland" volume is test pollution**. Discount the headline 749 imp to a real-demand floor of ~150-260 imp.
- Other Irish queries (e.g. "irish bitcoin casinos" 12 imp, "bitcoin casino ireland" 21 imp): dispersed pattern, lighter pollution. Discount 20-30%.

### New Zealand — MODERATE POLLUTION

- Total impressions across NZ queries: ~615 (estimated, not directly filtered)
- Top query: `"crypto casino nz"` — 161 imp (~26% of NZ traffic)
- Dispersed across 50+ distinct NZ-localised queries
- Estimate: **20-30% pollution on top NZ queries**, lower on long-tail. The dispersed query pattern is closer to organic.

### Australia — MODERATE POLLUTION

- Total impressions from `aus`: 278
- Top query: `"bitcoin casinos australia"` — 98 imp (~35% concentration)
- Healthy dispersion across mirax review, high-roller casinos, crypto gambling AU
- Estimate: **30-40% pollution on top AU query**, 15-25% on others.

### Germany — LIGHT POLLUTION

- Total impressions from `deu`: 185
- Top query: `"best bitcoin casino germany"` — 15 imp (~8% concentration — well dispersed)
- Estimate: **10-20% pollution on top DE queries**. The `bnb casino vergleich` (15 imp) query is plausibly Eddy testing in DE for BNB-specific behaviour, but overall pattern looks organic.

### Norway — LIGHT POLLUTION

- Total impressions from `nor`: 71
- 14 distinct queries, top is `"bitcoin casinos norway"` at 18 imp (~25%)
- Lowest absolute volume — sample too small for confident pollution estimate
- Estimate: **10-20% pollution**, but treat all NO data as low-confidence due to small sample.

### Untested markets (control comparison)

- `gbr`: 182 imp / 8 clicks / 4.4% CTR — almost certainly Eddy browsing his own site from his UK location (not pollution of country-targeted content, but visible in totals)
- `can`: 141 imp / 0 clicks — no Canada-targeted test pattern reported; the CTR-zero is concerning but data is sparse
- `bra`: 71 imp / 0 clicks — organic, no test pattern

## Discount factors (use these when scoring demand)

| Market | Top-query discount | Long-tail discount | Confidence |
|--------|------------------:|-------------------:|:-----------|
| IE     | 0.20-0.35         | 0.70-0.80          | Medium     |
| NZ     | 0.70-0.80         | 0.85-0.90          | Medium     |
| AU     | 0.60-0.70         | 0.75-0.85          | Medium     |
| DE     | 0.80-0.90         | 0.85-0.95          | Low        |
| NO     | 0.80-0.90         | 0.85-0.95          | Low        |

"Discount factor" = multiplier to apply to raw GSC impression count to estimate real-user demand. So Ireland's `"crypto casino ireland"` at 749 raw imp × 0.20-0.35 = **~150-260 effective imp** when scoring against the 10-impression / 50-impression thresholds.

## Hard rules these factors imply

1. The 50-impression rule for tested-location queries in CLAUDE.md needs raising for IE specifically: an IE-localised query needs >200 raw GSC imp to clear a 50-imp effective threshold.
2. Sub-queries (e.g. "fast withdrawal crypto casino ireland", "is crypto gambling legal in ireland") **never appear in current GSC** because the site has no pages targeting them. For these, external corroboration is mandatory — GSC cannot validate demand it has never had a chance to observe.
3. Re-evaluate this baseline at 2026-07-15 (8 weeks from now). By then organic traffic will have had time to either dominate or remain a minority share of impressions, allowing a cleaner before/after comparison.

## Reproducing this analysis

```
# Daily impression curve
mcp__gsc__get_advanced_search_analytics \
  site_url=sc-domain:playmagpie.com \
  start_date=2026-02-27 end_date=2026-05-26 \
  dimensions=date

# Per-country query breakdown
mcp__gsc__get_advanced_search_analytics \
  site_url=sc-domain:playmagpie.com \
  start_date=2026-02-27 end_date=2026-05-26 \
  dimensions=query \
  filter_dimension=country filter_operator=equals \
  filter_expression=<irl|nzl|aus|deu|nor>
```
