# Request Indexing campaign list (built 2026-08-20, evening)

Campaign log for the post-rollout Request Indexing protocol (RUNBOOK
section of the same date). Runs AFTER the 2c/2d deploy per the owner's
20 Aug sequencing decision: one campaign over the finished site.

## Campaign log

- **DAY-2 CRAWL WATCH VERDICT, 2026-09-04: PROVEN. Request Indexing works
  on URLs Google has never seen.** Six never-crawled URLs (rows 32, 44,
  45, 46, 47, 48) plus the tracker (row 49) were fetched 2026-08-25
  between 16:24 and 16:28 UTC, roughly 15 minutes after their 16:11-16:15
  UTC requests, and all are now "Submitted and indexed" with clean
  canonicals (single-URL inspections, 2026-09-04). The one FAILURE is row
  17, /bonus/free-spins: requested the same morning alongside the six
  that succeeded, still "URL is unknown to Google" ten days later. It has
  now resisted a hub tile, a carrier link, an accepted Bing submission
  (08 Aug row in the SubmittedUrls export) and an explicit indexing
  request. Graded a PAGE-SPECIFIC failure, NOT a mechanism failure;
  added to the 7 September audit scope as an orphan diagnosis.
- **ROWS 2 AND 39 ARE MOOT, 2026-09-04: both were fetched UNREQUESTED on
  2026-08-25 at 16:28 UTC.** /country/australia's fetch post-dates the
  22 Aug 20:50 UTC IGA-override push, and /best-bitcoin-casino-canada's
  post-dates the 25 Aug 11:10 UTC Ontario-correction push, so Google
  holds the current wording on both. The queued low-priority AU
  re-request is moot too. Neither row needs a campaign slot.
- **COUNT RECONCILIATION 2026-09-04 (supersedes the day-2 figures): 48
  unique campaign URLs; 18 requested; both "already indexed" skips
  satisfied by organic fetches; 30 outstanding. Resume top to bottom at
  row 11.**
- **Day 2, 2026-08-25 (owner): 8 requested, zero GSC refusals: rows 44,
  45, 46, 47, 48 (the five 2026-08-25 new URLs), row 17
  (/bonus/free-spins, never-crawled), row 32 (/compare/cloudbet-vs-roobet,
  never-crawled), and row 49 (/tracker/prediction-markets-legality, added
  to the list at request time; it was never a campaign row because it was
  unchanged when the list was built, and its WA stay-ruling update shipped
  2026-08-25 morning).** NOT submitted: rows 2 (/country/australia) and 39
  (/best-bitcoin-casino-canada): URL Inspection returned "already indexed"
  and the owner did not submit. **The distinction, recorded so it is not
  re-derived: indexed status is NOT crawl recency.** Both carry changes
  Google has not fetched (Canada's Ontario correction shipped 2026-08-25;
  the AU hub's IGA override pushed 2026-08-22 20:50 UTC, after Google's
  15:24 fetch that day), so both stay REQUESTABLE and move to the TOP of
  the return list.
  **COUNT RECONCILIATION after day 2 (supersedes all prior figures): 48
  unique campaign URLs (rows 1-49 minus the two duplicate listings, rows
  16 and 43, plus the row-49 addition); 18 requested (10 on day 1 + 8 on
  day 2); 30 outstanding.**
- **CRAWL WATCH OPENED on the day-2 eight: the observable is a Google
  crawl date advancing past 2026-08-25 per URL.** Note the asymmetry that
  makes this batch the better experiment: five of the eight (rows 44-48)
  plus the two never-crawled originals (rows 17, 32) have NEVER been
  fetched by Google, so ANY crawl on those is unambiguous evidence the
  request mechanism works on new pages, which the 22 August batch (all
  previously-indexed URLs) could not test.
- **Day 1, 2026-08-22 (owner): rows 1-10 requested, GSC refused nothing
  before the owner stopped at 10, consistent with the ~10/day
  undocumented quota. 32 of 42 URLs outstanding (rows 11-43).** Note on
  timing: day 1 ran the SAME DAY as the 2c/2d ship, not the following
  morning the protocol sketched; the actual request dates govern, since
  the crawl watch keys off them.
- **CRAWL WATCH OPEN against the 10 requested rows: the observable is a
  Google crawl date advancing PAST 2026-08-22 on each (single-URL
  inspection). First read not before 25 Aug, so a null is meaningful.**
  Per the protocol this doubles as the Checkpoint B
  STOP-branch diagnosis: prompt fetches = the zero-crawl pattern was
  ordinary low-priority scheduling; requests sitting unactioned =
  evidence of a suppression-linked crawl throttle, a different and worse
  finding with its own follow-up.
- **Day 2 ordering note (2026-08-22 close-out): lead with row 17
  /bonus/free-spins and row 32 /compare/cloudbet-vs-roobet, the two URLs
  Google has NEVER crawled, then resume top-to-bottom from row 11.** A
  granted request on a never-crawled URL is the highest-information
  probe the campaign has.
- Row 2 note (2026-08-22, later): /country/australia changed again AFTER
  its request was made (IGA-sentence owner override, same date). The
  crawl-watch observable is unchanged (a Google crawl date past
  2026-08-22); a fetch after 22 August picks up the override wording
  rather than the 17 August version. No re-request needed.
  **CORRECTED 2026-08-25: the actual fetch was 22 Aug 15:24 UTC, five and
  a half hours BEFORE the override push (20:50 UTC), so Google holds the
  17 Aug wording. The note's assumption (any post-request fetch picks up
  the override) was wrong for this timing. A re-request IS queued, LOW
  priority: on a future campaign day, after the never-crawled pair and
  the remaining rows 11-43. The override-specific observable is a crawl
  after 22 Aug 20:50 UTC.**
- **2026-08-25 afternoon note: the Roobet correction session changed ~20 URLs
  (catalogue ripple + direct edits), so several rows' "Last change" dates are
  now later than shown; every affected row remains VERIFIED-STALE a fortiori
  (a later change can only widen the change-to-crawl gap). Rows 32 and 39
  updated explicitly (dispatched to Bing this session); one NEW campaign row
  added at the end: /reviews/roobet/withdrawal (row 44). Reminder from the
  morning read: /country/australia (row 2) needs a LOW-PRIORITY re-request
  after rows 11-43, since its 22 Aug fetch predates the IGA-override push.**
- **CRAWL WATCH FIRST READ, 2026-08-25: CLEAN, 10 of 10.** Every
  requested row shows a Google fetch on 2026-08-22 between 15:24 and
  15:28 UTC (baselines ranged 20 Jun to 31 Jul), i.e. same-day action on
  the requests. STOP-branch verdict: ordinary low-priority scheduling,
  NOT a suppression-linked crawl throttle; Checkpoint B is closed and
  Request Indexing is a working lever on this site. Next observable per
  remaining row: crawl date advancing past that row's request date.

How to use: work top to bottom, ~10 requests/day (undocumented quota; if
GSC refuses a request, stop for the day and note it here). Put the
request date in the "Requested" column as each URL is submitted (GSC URL
Inspection, www host, then Request Indexing). The crawl watch then looks
for Google crawl dates advancing PAST the request dates.

Verification method for the two date columns: "Last change" is the URL's
sitemap lastmod (the per-page honest-lastmod system, read from the HEAD
build on 20 Aug); "Last crawl" is a fresh single-URL GSC inspection run
2026-08-20 via the URL Inspection API (44 URLs inspected; single-URL is
the authoritative endpoint per the RUNBOOK gotchas). VERIFIED-STALE =
last crawl predates last change, so Google holds pre-change bytes.
ALREADY-CRAWLED = crawl postdates change; excluded from the campaign.
PENDING-DEPLOY = 2c/2d page; its change date becomes the ship date, fill
in at deploy (every one becomes VERIFIED-STALE that day by construction).

Floor-map caveat, recorded honestly: several statics carry the
2026-08-01 git-derived floor date as lastmod, which can UNDERSTATE a
page's true last change but never overstates it, so a VERIFIED-STALE
verdict from it is safe; an ALREADY-CRAWLED verdict from a floor date
was double-checked against the known change history before exclusion.

## Tier 0: the 17-20 Aug regulatory pages (TOP: largest change-to-crawl gap)

| # | URL | Last change | Last crawl | Verdict | Requested |
|---|---|---|---|---|---|
| 1 | /country/australia/legal | 2026-08-20 | 2026-06-20 | VERIFIED-STALE (Google has NEVER fetched any of the four dated entries; two-month gap on the site's top AI asset) | 2026-08-22 |
| 2 | /country/australia | 2026-08-22 (IGA sentence, owner override; changed again AFTER the request was made) | 2026-08-25 16:28 UTC (unrequested organic fetch, post-override) | **MOOT 2026-09-04: fetched unrequested 25 Aug 16:28 UTC, after the 22 Aug 20:50 UTC override push, so Google holds the current wording. No re-request needed; the queued low-priority re-request is cancelled.** | n/a (satisfied organically) |

## Tier 1: sentinels + trust layer

| # | URL | Last change | Last crawl | Verdict | Requested |
|---|---|---|---|---|---|
| 3 | /reviews/bitstarz/kyc | 2026-08-01 | 2026-07-31 | VERIFIED-STALE (08-01 correction batch) | 2026-08-22 |
| 4 | /reviews/bitstarz/withdrawal | 2026-08-01 | 2026-07-13 | VERIFIED-STALE | 2026-08-22 |
| 5 | /reviews/mirax-casino | 2026-08-02 | 2026-07-30 | VERIFIED-STALE | 2026-08-22 |
| 6 | /fast-withdrawal-casinos | 2026-08-22 (2d rewrite shipped, commit 47a05b4) | 2026-07-28 | VERIFIED-STALE, requestable now (one request covers the 08-01 correction and the 2d rewrite) | 2026-08-22 |
| - | /high-roller-casinos | 2026-07-16 | 2026-07-30 | ALREADY-CRAWLED, excluded (also 2d-excluded flagship) | n/a |
| - | /methodology | 2026-07-17 | 2026-08-03 | ALREADY-CRAWLED, excluded | n/a |
| - | /about | 2026-07-07 | 2026-07-09 | ALREADY-CRAWLED, excluded | n/a |

## Tier 2: Batch 1 country pages (changed 2026-08-07; most-templated class, most-reformed)

| # | URL | Last change | Last crawl | Verdict | Requested |
|---|---|---|---|---|---|
| 7 | /country/canada | 2026-08-07 | 2026-06-24 | VERIFIED-STALE | 2026-08-22 |
| 8 | /country/japan | 2026-08-07 | 2026-05-27 | VERIFIED-STALE (worst gap in the batch) | 2026-08-22 |
| 9 | /country/new-zealand | 2026-08-07 | 2026-07-07 | VERIFIED-STALE | 2026-08-22 |
| 10 | /country/ireland | 2026-08-07 | 2026-07-07 | VERIFIED-STALE | 2026-08-22 |
| 11 | /country/germany | 2026-08-07 | 2026-07-07 | VERIFIED-STALE | |
| 12 | /country/norway | 2026-08-07 | 2026-07-07 | VERIFIED-STALE | |
| 13 | /country/finland | 2026-08-07 | 2026-07-09 | VERIFIED-STALE | |
| 14 | /country/netherlands | 2026-08-07 | 2026-07-25 | VERIFIED-STALE | |
| 15 | /country/sweden | 2026-08-07 | 2026-07-29 | VERIFIED-STALE | |
| 16 | /country/australia | see Tier 0 row 2 | | (listed once) | n/a |

## Tier 3: Batch 2a bonus pages (changed 2026-08-08)

| # | URL | Last change | Last crawl | Verdict | Requested |
|---|---|---|---|---|---|
| 17 | /bonus/free-spins | 2026-08-08 | never | **FAILURE 2026-09-04: still "URL is unknown to Google" ten days after the 25 Aug request, while all six never-crawled peers requested the same morning were fetched in ~15 minutes. Page-specific, not mechanism. On the 7 Sep audit scope as an orphan diagnosis.** | 2026-08-25 (unactioned) |
| 18 | /bonus/welcome-bonus | 2026-08-08 | 2026-07-03 | VERIFIED-STALE (carries the free-spins carrier link) | |
| 19 | /bonus/vip-bonus | 2026-08-08 | 2026-06-25 | VERIFIED-STALE | |
| 20 | /bonus/high-roller-bonus | 2026-08-08 | 2026-06-25 | VERIFIED-STALE | |
| 21 | /bonus/reload-bonus | 2026-08-08 | 2026-07-19 | VERIFIED-STALE | |
| 22 | /bonus/no-deposit-bonus | 2026-08-08 | 2026-07-25 | VERIFIED-STALE | |
| 23 | /bonus/cashback | 2026-08-08 | 2026-08-01 | VERIFIED-STALE | |

## Tier 4: Batch 2b crypto/game pages (changed 2026-08-10)

| # | URL | Last change | Last crawl | Verdict | Requested |
|---|---|---|---|---|---|
| 24 | /game/crash | 2026-08-10 | 2026-05-28 | VERIFIED-STALE | |
| 25 | /game/plinko | 2026-08-10 | 2026-05-30 | VERIFIED-STALE | |
| 26 | /crypto/bitcoin | 2026-08-10 | 2026-07-09 | VERIFIED-STALE | |
| 27 | /crypto/ethereum | 2026-08-10 | 2026-07-09 | VERIFIED-STALE | |
| 28 | /crypto/usdt | 2026-08-10 | 2026-07-09 | VERIFIED-STALE | |
| 29 | /crypto/dogecoin | 2026-08-10 | 2026-07-09 | VERIFIED-STALE | |
| 30 | /crypto/solana | 2026-08-10 | 2026-07-09 | VERIFIED-STALE | |
| 31 | /game/dice | 2026-08-10 | 2026-07-29 | VERIFIED-STALE | |

## Tier 5: Batch 2c/2d, SHIPPED 2026-08-22 (commits 66857ec compare copy, 47a05b4 statics), requestable now

2c compare (6), crawl dates recorded 2026-08-20, all predate the ship by construction:

| # | URL | Last change | Last crawl (20 Aug) | Verdict | Requested |
|---|---|---|---|---|---|
| 32 | /compare/cloudbet-vs-roobet | 2026-08-25 (fee unsuppressed + cap/weekend withdrawn) | never | VERIFIED-STALE (published 08-01, still unknown to Google: second never-crawled URL on the board) | 2026-08-25 |
| 33 | /compare/mirax-casino-vs-bitstarz | 2026-08-22 | 2026-06-09 | VERIFIED-STALE | |
| 34 | /compare/cloudbet-vs-bitstarz | 2026-08-22 | 2026-06-24 | VERIFIED-STALE | |
| 35 | /compare/7bit-casino-vs-bitstarz | 2026-08-22 | 2026-06-24 | VERIFIED-STALE | |
| 36 | /compare/bc-game-vs-shuffle | 2026-08-22 | 2026-07-17 | VERIFIED-STALE | |
| 37 | /compare/bitstarz-vs-bc-game | 2026-08-22 | 2026-07-21 | VERIFIED-STALE | |

2d statics (6), crawl dates recorded 2026-08-20, all predate the ship by construction:

| # | URL | Last change | Last crawl (20 Aug) | Verdict | Requested |
|---|---|---|---|---|---|
| 38 | /crypto-casinos-with-sportsbook | 2026-08-22 | 2026-06-08 | VERIFIED-STALE | |
| 39 | /best-bitcoin-casino-canada | 2026-08-25 (Ontario correction, page rebuilt off the carve-out spine) | 2026-08-25 16:28 UTC (unrequested organic fetch, post-correction) | **MOOT 2026-09-04: fetched unrequested 25 Aug 16:28 UTC, five hours after the 11:10 UTC correction push, so Google holds the corrected page. No request needed.** | n/a (satisfied organically) |
| 40 | /no-kyc-casinos | 2026-08-22 | 2026-07-20 | VERIFIED-STALE (was already stale from the 08-01 correction; the shipped 2d rewrite is the liability fix for its meta) | |
| 41 | /best-crypto-pokies-nz | 2026-08-22 | 2026-08-03 | VERIFIED-STALE | |
| 42 | /best-crypto-casinos | 2026-08-22 | 2026-08-03 | VERIFIED-STALE | |
| 43 | /fast-withdrawal-casinos | see Tier 1 row 6 | | (listed once; its 2d rewrite has shipped, requestable now) | n/a |

## Added 2026-08-25: the fourth August page

| # | URL | Last change | Last crawl | Verdict | Requested |
|---|---|---|---|---|---|
| 44 | /reviews/roobet/withdrawal | 2026-08-25 (published) | never | NEW URL (first crawl doubles as an indexing probe on a fresh URL) | 2026-08-25 |

## Added 2026-08-25 (night): the September-slate four, deployed under the amended caps

| # | URL | Last change | Last crawl | Verdict | Requested |
|---|---|---|---|---|---|
| 45 | /guides/crypto-casino-verification-process | 2026-08-25 (published) | never | NEW URL | 2026-08-25 |
| 46 | /reviews/roobet/kyc | 2026-08-25 (published) | never | NEW URL | 2026-08-25 |
| 47 | /reviews/bc-game/withdrawal | 2026-08-25 (published) | never | NEW URL | 2026-08-25 |
| 48 | /guides/is-crypto-safe-at-australian-casinos | 2026-08-25 (published) | never | NEW URL | 2026-08-25 |
| 49 | /tracker/prediction-markets-legality | 2026-08-25 (WA stay-ruling update) | unknown (never inspected; not on the 20 Aug sweep because it was then unchanged) | Added at request time, day 2 | 2026-08-25 |

## Count and duration

All 42 unique URLs are now requestable: 31 from the pre-22-Aug deploy set
(Tiers 0-4) + 11 more numbered rows that joined at the 2c/2d ship on
2026-08-22 (Tier 5; /fast-withdrawal-casinos is shared with Tier 1 and
counted once). Row 44 (/reviews/roobet/withdrawal, published 2026-08-25)
made the campaign 43 unique URLs; rows 45-48 (the slate four, deployed
2026-08-25) and row 49 (the tracker, added at request time on day 2)
make it 48. **After day 2 (2026-08-25): 18 requested, 30 outstanding.**
**RECONCILED 2026-09-04: rows 2 and 39 are MOOT (both fetched
unrequested on 25 Aug carrying their current wording), so the return-day
order is simply top to bottom from row 11 through the undated rows: 30
outstanding at ~10/day, roughly 3 owner mornings, ~2 minutes each
alongside the daily serving check.**

## What this campaign is and is not (from the protocol, restated here)

Request Indexing forces a FETCH. It does not force re-evaluation or
serving. Indexing was never the problem (the 07-07 census kept 82 of 87
pages indexed, 94 per cent); visibility of the reformed bytes to the
classifier is. The
success observable is crawl dates advancing past request dates on the
crawl watch, which also answers the STOP-branch diagnosis: if requested
fetches happen promptly, the 13-day zero-crawl pattern was ordinary
low-priority scheduling; if requests sit unactioned, that is evidence of
a suppression-linked crawl throttle, which is a different finding.
