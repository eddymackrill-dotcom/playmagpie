# Backlink recon — 2026-06-09 (DataForSEO Backlinks API free trial)

Competitor backlink mapping + own-profile baseline, captured during the **DataForSEO
Backlinks API 14-day free trial**. Saved to repo so it persists after the trial ends.

**Trial cancel-by: 2026-06-22** (converts to $100/mo on ~2026-06-23 / day 14). Cancel before then.

## Spend log
| Date | Call | Targets | Cost | Notes |
|------|------|---------|-----:|-------|
| 2026-06-09 | `backlinks_bulk_referring_domains` (Step A) | 10 | $0 (free trial) | Succeeded, full data for all 10. MCP response did **not** include a `cost` field, so exact per-call price isn't confirmable from the response — on the trial, spend is $0. Trial permitted the bulk endpoint with no cap hit. |

Running trial spend: **$0** (free trial active). Post-trial, `bulk_referring_domains` is a cheap bulk endpoint (~$0.02–0.05 est.), but confirm in the DataForSEO dashboard — the MCP doesn't surface per-call cost or remaining trial quota.

## t=0 own-profile baseline
**`playmagpie.com` = 0 referring domains** (no data returned — not in DataForSEO's backlink index). Confirms the premise: ~zero backlinks. **This is the measured starting point** for monitoring — any referring domain that appears later is net new.

## Step A — referring-domain counts (10 targets, one call)
| Domain | Referring domains | Main domains | Nofollow (main) | Tier |
|--------|------------------:|-------------:|----------------:|------|
| **playmagpie.com** | **0** | 0 | 0 | us (t=0) |
| cryptogambling.org | 528 | 516 | 172 | **Attainable — closest comparable** (high dofollow ratio) |
| cryptocasinos.com | 1,832 | 1,568 | 849 | **Attainable** pure-play |
| affpapa.com | 2,566 | 2,503 | 1,494 | **Attainable** (iGaming-affiliate industry) |
| pokertube.com | 7,710 | 5,959 | 2,745 | Aspirational (gambling media) |
| banklesstimes.com | 7,703 | 6,021 | 2,794 | Aspirational (crypto media) |
| cryptomaniaks.com | 9,911 | 7,643 | 3,708 | Mid — **pure-play editorial twin** (bigger but same model) |
| esportsinsider.com | 35,959 | 32,510 | 5,124 | Context only (general esports media) |
| ccn.com | 38,094 | 33,970 | 9,804 | Context only (big crypto news) |
| cryptonews.com | 40,569 | 36,118 | 7,193 | Context only (big crypto news) |

## Read
- **The attainable neighborhood is the pure-play crypto-casino affiliates**, not the big publishers. cryptogambling.org (528) is the realistic "next rung"; cryptocasinos.com / affpapa.com (1.8k–2.6k) the rung after; cryptomaniaks.com (9.9k) the editorial twin to aim at over years.
- The mega-publishers (ccn / cryptonews / esportsinsider, 36k–40k) earn links via crypto-news PR/syndication — **not replicable by an affiliate**. Useful only as context for how far the ceiling is.
- Picking comparables by RD tier (not by guessing) is exactly what this cheap call was for.

## Step B (PENDING your go-ahead) — domain_intersection
Recommended set = the 4 pure-play affiliates whose links are most replicable:
**cryptomaniaks.com, cryptocasinos.com, cryptogambling.org, affpapa.com**.
`domain_intersection` on these returns domains that link to ≥2 of them = the proven
crypto-casino-affiliate link neighborhood = highest-confidence targets. (Excluding the
mega-publishers keeps the intersection free of unreplicable crypto-news links.)

## Step C (PENDING) — backlinks_summary per competitor
Profile shape per comparable: dofollow/nofollow split, link types, anchor distribution.
FLAG (do not copy) any paid/PBN footprint as a §4 penalty risk.

## Free self-monitoring status (WI4 — checked via claude-seo:seo-backlinks)
**Not operational out of the box.** The check found:
- claude-seo backlink scripts not installed in this repo (no `scripts/` dir).
- Moz API: no key configured. Bing Webmaster: no key, site not verified. Common Crawl: reachable but **0 data for playmagpie.com** (too new — CC hasn't crawled it; expect 6–12 months).
- To make the free path work: install the skill scripts + add Moz free-tier key (`MOZ_ACCESS_ID`/`MOZ_SECRET_KEY`, 10 req/mo) + verify site in Bing Webmaster Tools.
- **Interim free baseline = GSC "Links" report (manual UI capture).** That + this DataForSEO t=0 (0 RD) is the starting scoreboard.
