# GSC Pollution Baseline Analysis

**Captured**: 2026-05-26
**Re-evaluated**: 2026-06-11 (early — pulled forward from the scheduled 2026-07-15; see the re-evaluation section at the bottom)
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

**[SUPERSEDED 2026-06-11 — these factors materially understated pollution for IE, NZ and AU. See "2026-06-11 re-evaluation" below for the current factors. Retained for history.]**

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

---

# 2026-06-11 re-evaluation (early — VPN-test withdrawal experiment)

**Why early:** the scheduled re-evaluation was 2026-07-15, but tested-market impressions collapsed period-over-period while untested markets rose sharply, implying the 2026-05-26 factors materially understated pollution. This section re-derives the factors from that natural experiment.

## Windows

- **P1** = 2026-05-14 → 2026-05-27 (14 days, heavy-testing period)
- **P2** = 2026-05-29 → 2026-06-11 (14 days, reduced-testing period)
- **Caveat — partial final days:** 2026-06-10 reported 289 site-wide impressions (vs ~500/day typical) and 2026-06-11 only 41 at pull time. P2 totals understate by roughly 1-1.5 day-equivalents (~7-10%). This does not change any conclusion below.
- GBR excluded throughout (Eddy is UK-based).

## Working assumption

The P1→P2 collapse in tested-market geo-query impressions is **dominated by withdrawal/reduction of VPN testing, not by a site-wide demand or ranking drop**. Evidence: over the same period, untested benchmark markets ROSE — USA 796→1,813 (+128%), CA 197→373 (+89%), NL 135→572 (+324%), SE 84→152 (+81%), BRA 93→140, ES 20→149 — which rules out a site-wide demand drop as the explanation. (Benchmark contamination caveat below.)

## Per-country totals (all queries, GSC country dimension)

| Market | P1 imp | P1 pos | P2 imp | P2 pos | Δ imp |
|--------|-------:|-------:|-------:|-------:|------:|
| IE (tested) | 1,138 | 32.5 | 912 | 45.3 | −20% |
| NZ (tested) | 1,140 | 37.4 | 528 | 43.6 | −54% |
| AU (tested) | 374 | 32.2 | 336 | 32.6 | −10% |
| DE (tested) | 247 | 22.7 | 318 | 40.1 | +29% |
| NO (tested) | 94 | 19.0 | 105 | 53.0 | +12% |
| US | 796 | 26.4 | 1,813 | 41.0 | +128% |
| CA | 197 | 31.3 | 373 | 48.9 | +89% |
| NL | 135 | 37.4 | 572 | 43.0 | +324% |
| SE | 84 | 44.6 | 152 | 48.6 | +81% |
| JP | 29 | 10.6 | 32 | 26.2 | +10% |
| BR | 93 | 31.3 | 140 | 48.8 | +51% |
| ES | 20 | 22.6 | 149 | 36.9 | +645% |

Country totals UNDERSTATE the withdrawal because new pages built during P2 (dogecoin/solana/BNB/duelbits etc.) added impressions in every market. The pollution-bearing signal is in the **country-targeted query subsets**:

## Geo-targeted query subsets (the load-bearing numbers)

| Market | Geo-query subset | P1 imp | P2 imp | Δ |
|--------|------------------|-------:|-------:|--:|
| AU | all "*australia*" variants | 213 | 12 | **−94%** |
| AU | top query "bitcoin casinos australia" | 134 | 4 | **−97%** |
| NZ | all NZ-targeted variants | ~1,115 | ~389 | **−65%** |
| IE | top query "crypto casino ireland" | 942 | 744 | −21% (testing continued) |
| IE | IE-geo long tail (excl. top query) | 178 | 37 | **−79%** |
| DE | all "*germany*" variants | 103 | 49 | −52% (confounded, see below) |
| NO | all Norway/norske variants | 74 | 95 | **+28% (no withdrawal observed)** |

Note on the trigger numbers: "AU −94%" matches the AU geo-query subset above. "NZ −83%" reconciles as the end-of-window **daily run-rate** change (NZ ~95-128 imp/day mid-P1 vs ~12-37 imp/day in the 2026-06-02→06-10 settled band ≈ −80-85%); the 14-day-total drop is −65% because withdrawal only completed around 2026-06-01/02 (NZ daily curve: 121 on 05-25 → 49 on 06-01 → 25 on 06-02 → 12-37/day thereafter).

## Is P2 actually clean? (sanity check — answer: NO)

P2 is a *reduced*-pollution window, not a clean one. Three observed signatures:

1. **IE testing continued through P2**: "crypto casino ireland" still 744 imp (82% of IE total — same concentration as P1's 83%), 0 clicks, position 44.7. An impression at position ~45 requires the searcher to page to SERP page 5; real users essentially never do this at volume. The IE top query remains near-totally polluted.
2. **NZ scripted-variant residue**: the unnatural rank-tracker-style phrasings persist in P2 at similar levels ("top-rated bitcoin casinos in nz april 2026" 8 imp, "leading bitcoin casinos in nz" 12, "best nz crypto casinos for beginners" 10, "top crypto casinos in nz with fast payouts" 6, "popular crypto casinos in new zealand" 9). That's ≥50 imp of test-like traffic inside the 389 P2 residual — NZ testing reduced, did not stop.
3. **Testing retargeted, not ended**: the AU exit node in P2 shows "duelbits vs bc game" 41 imp at position 4 with 0 clicks (rank-checking the new Duelbits page, ~3/day), plus other-country queries fired from AU ("crypto casino sweden" 20, "crypto sportsbook sweden" 28, "crypto casino germany" 13, "crypto casino netherlands" 6). Brand-query checking also visible: "mirax casino review(s)" from AU 77 imp at pos ~48, 0 clicks.

**Benchmark contamination caveat:** the untested-market rise is itself partly suspect. NL P2 includes "crypto casino nederland" 130 imp at pos 46.8 / 0 clicks and the same NL/SE country queries appear from the AU exit node; CA P2 includes "best crypto casino canada" 36 imp at pos 58.6 / 0 clicks. Some of the NL/SE/CA growth looks like *new or displaced* testing rather than organic growth. The US rise (heavily driven by new dogecoin/solana pages at deep positions) is the most credible organic-ish control. Conclusion direction is unaffected — tested-geo queries fell while everything else rose — but do NOT promote NL/SE to "clean benchmark" status without checking their query mix first.

## Methodology for the new factors

Two methods per market, cross-checked; where they disagree, the **conservative (lower-trust) factor** is used:

- **Method A — withdrawal cross-period**: organic share of a P1-style mixed window ≈ (P2 geo-query daily run-rate, stripped of residual test-pattern queries) ÷ (P1 geo-query daily run-rate). Computed with growth factor g=1 (i.e. assuming zero organic growth P1→P2), which makes it an *upper bound* on organic share — untested markets actually grew ~1.8-2.3×, and dividing P2 organic by that g would push the factors even lower.
- **Method B — query concentration + position plausibility** (extension of the original 2026-05-26 method): single-query concentration as before, PLUS the structural observation the May analysis missed: **an impression at position ≥30 requires the searcher to page to SERP page 3+**. Real users do this rarely; at the volumes observed, deep-position zero-click geo-query impressions are nearly all testers/rank-checkers. The May CTR test assumed real users at pos 25-40 still click at 0.3-1% — the correct prior is that real users at pos 30+ barely *impress* at all. This is the main reason the May factors were too generous.

Worked derivations:

- **AU**: P1 geo rate 213/14 = 15.2/day → P2 12/14 = 0.86/day (some of which may still be test). Method A: 0.86/15.2 ≈ **0.06**. Method B agrees (P1 top query at pos 33 = page-4 paging). → factor 0.05-0.10.
- **NZ**: P1 ~1,115/14 = 79.6/day → P2 389/14 = 27.8/day raw; stripping persistent scripted variants and applying the 06-02+ settled run-rate gives a cleaner ~12-25/day. Method A: 12-25/79.6 ≈ 0.15-0.31 upper bound; with benchmark growth g≈1.9 ≈ 0.08-0.16. Conservative → **0.10-0.20**, top query and long tail alike (the NZ "long tail" turned out to be scripted variants — MORE polluted than the head, inverting the May assumption).
- **IE top query**: Method A unavailable (testing never stopped). Method B: 82% concentration persists, 744 imp / 0 clicks / pos 44.7 = page-5 paging events; cross-inference from the AU/NZ withdrawal results → **0.05-0.10**.
- **IE long tail**: P1 178/14 = 12.7/day → P2 37/14 = 2.6/day. Method A: ≈ 0.21 upper bound, ≈ 0.11 at g≈1.9, and the 37 residual likely still contains tests. Conservative → **0.10-0.20**. (The May long-tail factor of 0.70-0.80 was badly wrong — the "dispersed" IE long tail was mostly varied test phrasings.)
- **DE**: P1 103/14 = 7.4/day → P2 49/14 = 3.5/day. Method A: ≈ 0.48 upper bound, ≈ 0.25 at g≈1.9. **Confound**: DE geo-query positions fell from 8-19 (P1, page 1-2 — where real users DO generate impressions) to 36-41 (P2), so part of the P2 drop is genuine rank loss suppressing organic impressions, which biases Method A downward. Methods disagree → conservative band **0.25-0.45, low confidence**.
- **NO**: **no defensible factor can be derived.** NO geo-queries *rose* 74→95 — the withdrawal experiment produced no signal in NO (either NO testing never paused, or NO was always organic; the data cannot distinguish). P2 pattern is ambiguous: concentration is moderate (top query 29/105 = 28%) but positions are deep (avg 53) with 0 clicks. The old 0.80-0.90 is retained **provisionally, flagged UNVALIDATED** — given how wrong the May estimates were for IE/NZ/AU, treat NO GSC data as low-confidence and rely on the external-corroboration rule regardless.

## Discount factors — current (2026-06-11)

| Market | Top-query discount | Long-tail discount | Confidence | (superseded 2026-05-26) |
|--------|------------------:|-------------------:|:-----------|:------------------------|
| IE     | 0.05-0.10         | 0.10-0.20          | Medium     | was 0.20-0.35 / 0.70-0.80 |
| NZ     | 0.10-0.20         | 0.10-0.20          | Medium     | was 0.70-0.80 / 0.85-0.90 |
| AU     | 0.05-0.10         | 0.05-0.15          | Medium-High | was 0.60-0.70 / 0.75-0.85 |
| DE     | 0.25-0.45         | 0.25-0.45          | Low        | was 0.80-0.90 / 0.85-0.95 |
| NO     | 0.80-0.90 (UNVALIDATED — retained, not re-derived) | 0.85-0.95 (UNVALIDATED) | Very low | unchanged |

Practical implications:

1. At these factors, **raw GSC impression counts from IE, NZ and AU tested-geo queries are effectively non-evidence** — an IE-localised query now needs >500-1,000 raw impressions to clear a 50-effective-impression bar. The CLAUDE.md tightened country-pattern rule (external corroboration required regardless of volume) is confirmed as the right posture, not an over-caution.
2. The discount applies to **any query observed from a tested-market exit node**, not just country-named queries — P2 shows brand/intent and other-country queries being checked from tested exits (duelbits-vs, mirax review, SE/NL country queries from AU).
3. Impressions at position ≥30 with 0 clicks should be treated as paging/rank-checker events by default, in any market.

## Honest caveats

- P2's final 1-2 days are partial (data lag), understating P2 by ~7-10%.
- Pollution withdrawal is conflated with genuine rank movement: site-wide weighted position degraded 26→44 P1→P2 (mostly new pages entering at deep positions, but some genuine rank loss — DE geo queries demonstrably fell from page 1-2 to page 4). DE's factor is the most affected; IE/NZ/AU are less affected because their P1 positions were already 30+ (page 3+), where organic impressions were minimal regardless.
- Small samples: DE geo subset is 103/49 impressions, NO is 74/95 — single-session noise can move these bands.
- P2 is not a clean organic window (see above), so Method A's outputs are upper bounds on organic share; the true factors may be lower still.
- The untested benchmarks (especially NL, SE, CA) show their own deep-position zero-click anomalies; the growth factor g≈1.9 used in cross-checks is rough.

## Next re-evaluation

**2026-07-15 (unchanged).** Reasoning: an earlier date buys nothing — the blocker is not elapsed time but window cleanliness. P2 proved that testing reduced rather than stopped (IE top query, NZ scripted variants, retargeted checks from AU). For 2026-07-15 to produce a real measurement rather than another upper bound, **all VPN testing and rank-checking — including the IE "crypto casino ireland" habit, scripted NZ variants, and new-page rank checks from any tested exit — must be fully frozen for the ≥14 days prior (i.e. from ~2026-06-29, ideally from today)**. If a full freeze isn't feasible, the 2026-07-15 re-evaluation should be skipped rather than run on another mixed window.

## Reproducing the 2026-06-11 analysis

```
# Per-country totals, each period
mcp__gsc__get_advanced_search_analytics \
  site_url=sc-domain:playmagpie.com \
  start_date=<2026-05-14|2026-05-29> end_date=<2026-05-27|2026-06-11> \
  dimensions=country row_limit=1000

# Geo-query subsets per tested market, each period
mcp__gsc__get_advanced_search_analytics \
  site_url=sc-domain:playmagpie.com \
  start_date=... end_date=... dimensions=query row_limit=1000 \
  filter_dimension=country filter_operator=equals \
  filter_expression=<irl|nzl|aus|deu|nor>

# Daily curves (withdrawal dating)
mcp__gsc__get_advanced_search_analytics \
  site_url=sc-domain:playmagpie.com \
  start_date=2026-05-14 end_date=2026-06-11 dimensions=date \
  [filter country=nzl etc.]
```
