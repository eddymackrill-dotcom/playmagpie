# Bing Site Explorer: /country folder crawl dates, captured 7 Aug 2026

Source: Bing WMT Site Explorer, /country folder view, owner capture on
deploy day of Batch 1. Supersedes the "no crawl-dates capture" gap note
in this folder's README.

**Every captured crawl date PRE-DATES the Batch 1 deploy (7 Aug), so this
is a clean pre-recrawl baseline.** Bing crawls these pages on a roughly
2-4 week cadence, meaning Bing will read the new titles organically within
Checkpoint A's window even without a propagation run. Japan is the most
recently crawled (4 Aug) and the only converting page, so it will likely
be the first to show the new title's effect.

## Folder totals (6 months)

12 URLs, 1 click, 49 impressions. 12 indexed, 0 error, 0 warning,
0 excluded.

## Per-URL last-crawled (all HTTP 200)

| URL | Last crawled | Notes |
|---|---|---|
| /country/japan | 4 Aug 2026 | 2 impressions, 1 click (discovered 20 May 2026) |
| /country/finland | 24 Jul 2026 | |
| /country/norway | 25 Jul 2026 | |
| /country/ireland | 21 Jul 2026 | |
| /country (hub) | 15 Jul 2026 | 4 impressions |
| /country/netherlands | 18 Jul 2026 | |
| /country/sweden | 16 Jul 2026 | 1 impression |
| /country/germany | 12 Jul 2026 | 42 impressions |
| /country/canada | uncaptured | indexed per folder count, date not visible in capture |
| /country/australia | uncaptured | indexed per folder count, date not visible in capture |
| /country/new-zealand | uncaptured | indexed per folder count, date not visible in capture |

Bookkeeping notes:
- 8 captured + 3 uncaptured = 11 URLs against a folder count of 12; the
  twelfth is most plausibly one of the /country/*/legal sub-pages, which
  share the folder path. Unconfirmed from this capture.
- Impression figures here are the Site Explorer 6-month window and differ
  from `search-performance-pages-3m.csv` (3-month Search Performance
  window): e.g. Germany 42 vs 20, Sweden 1 vs no row. Different windows
  and different tools; both are recorded, diff each against its own kind
  at Checkpoint A.

## Checkpoint A use (~21 Aug 2026)

Re-capture the same folder view. For each URL, a last-crawled date on or
after 7 Aug 2026 means Bing has read the new title; pair that with the
Search Performance and AI Performance diffs in the README before reading
any impression/citation movement as caused by Batch 1. Watch Japan first.
