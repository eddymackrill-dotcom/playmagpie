# Bing WMT baseline, captured 7 Aug 2026

Bing WMT baseline captured 7 Aug 2026, deploy day of Batch 1 (country
de-templating), captured before Bing recrawled the new titles. Checkpoint A
comparison due ~21 Aug 2026. Protected pages baseline: /reviews/cloudbet 111
citations, /reviews/roobet 54, /reviews/bitstarz/payment-methods 31,
/country/australia/legal 23.

All four protected-page citation counts verified against
`ai-performance-pages.csv` on capture day: exact match.

## Files

| File | Source (Bing WMT) | Window |
|---|---|---|
| `search-performance-pages-3m.csv` | Search Performance > Pages | 3 months |
| `search-performance-keywords-3m.csv` | Search Performance > Keywords | 3 months |
| `ai-performance-pages.csv` | AI Performance > Pages (BETA) | Collection began ~2026-07-13 regardless of selector |

No Site Explorer crawl-dates screenshot was captured this session (nothing
matching in Downloads); if wanted for the Checkpoint A diff, pull it at the
next glance.

## Country-page baseline (the numbers Checkpoint A diffs against)

Search Performance, 3M window, from `search-performance-pages-3m.csv`:

| Country URL | Impressions | Clicks | Avg position |
|---|---|---|---|
| /country/germany | 20 | 0 | 8.05 |
| /country/japan | 2 | 1 | 2.0 |
| all 8 others (canada, australia, new-zealand, ireland, netherlands, norway, sweden, finland) | **no row = 0 impressions** | 0 | n/a |

AI Performance citations on country pages: /country (hub) 8,
/country/japan 2, /country/germany 1, /country/sweden 1; all other country
URLs zero. (Sitewide list also includes /reviews/cloudbet/kyc 1.)

Reading notes: citations are grounding events, not visits; the AI
Performance window is ~3.5 weeks of collection, treat as a level, not a
trend. The Bing floor for country pages is near-zero, which is why the
Batch 1 brief graded this batch LOW RISK for Bing: there is almost nothing
to lose on these 10 URLs. The four protected pages are where regression
would matter, hence the verified counts above.

## Checkpoint A procedure (~21 Aug 2026)

Re-export the same three reports, diff against this folder:
1. Protected four: citation counts at or above 111 / 54 / 31 / 23
   (allowing for window drift) = no regression signal.
2. Country pages: Germany and Japan are the only URLs with a measurable
   before; a drop to zero on both plus a sitewide citation fall would
   implicate the new headings; movement up is the hoped-for signal.
3. Keywords: watch whether "crypto casinos in germany" (4 imp, pos 8) and
   "is crypto casino accepting jpy" (2 imp, 1 click, pos 2) survive the
   title changes; both phrases were deliberately kept contiguous in the
   new titles.
