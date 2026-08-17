# Bing submission channel: retirement check + ledger reconciliation (2026-08-17)

Two-part record. Part 1 answers whether the 31 August 2026 SOAP/POX API
retirement touches this repo's dispatch channel. Part 2 reconciles every
dispatch since 28 July against the owner's WMT URL Submission export
(`reports/playmagpie.com_SubmittedUrls_8_17_2026.csv`, committed alongside
this file as the primary-source verification artifact).

## Part 1: endpoint audit. VERDICT (fact): already on the migration target, no code change.

What the channel actually calls, quoted from the repo:

- `scripts/submit-bing.mjs` line 28:
  `const API_BASE = 'https://ssl.bing.com/webmaster/api.svc/json'`
- Line 95 (submission): `POST {API_BASE}/SubmitUrl?apikey=...` with a JSON
  body (`Content-Type: application/json`), line 68 (quota):
  `GET {API_BASE}/GetUrlSubmissionQuota?apikey=...`, JSON response parsed.
- Auth: `apikey` query parameter from the `BING_WEBMASTER_KEY` repo secret
  (workflow line 173). The workflow itself contains no endpoint URL; the
  script is the only caller.

What retires on 31 August 2026, per the announcement as reported: endpoint
paths containing `/api.svc/soap` or `/api.svc/pox/`. The named migration
target is the JSON/HTTP API. Microsoft's own SubmitUrlBatch reference
(learn.microsoft.com, IWebmasterApi.SubmitUrlBatch) documents the two
bindings side by side: the retiring form
`POST /webmaster/api.svc/pox/SubmitUrlBatch?apikey=...` (XML body) and the
continuing form `POST /webmaster/api.svc/json/SubmitUrlbatch?apikey=...`
(JSON body) on the same host, `ssl.bing.com`. Two independent secondary
reports of the announcement state the JSON binding carries identical
methods, the same API key with no reissue, and unchanged quotas; one states
directly: "If your setup calls /api.svc/json/ instead, you're already on
the safe side and don't need to touch anything."

**Conclusion, labelled: FACT that this repo calls the `/api.svc/json/`
binding exclusively (both endpoints, quoted above). FACT that the
retirement notice names SOAP and POX, not JSON. Therefore no migration is
needed and 31 August should pass with zero effect on the channel.** The
one residual, graded honestly: the official announcement page itself was
not directly fetchable (seroundtable.com returned 403 to the fetcher), so
the SOAP/POX-only scope rests on Microsoft's endpoint taxonomy in the API
reference plus two independent secondaries quoting the announcement, which
agree with each other. No evidence anywhere suggests the JSON binding
retires.

Not done, deliberately: no workflow or script edit (none needed), so the
Node 20 deprecation carry-over on `actions/checkout@v4` / `setup-node@v4`
remains parked until the workflow is next touched for a real reason.

### Verification run

No new dispatch was fired, and the reasons are recorded because the session
brief offered two options that both turned out wrong on inspection:

1. A re-dispatch of `/country/australia` would spend a quota unit to prove
   an endpoint that already carries a same-day, end-to-end, WMT-confirmed
   proof: the 2026-08-17 09:20 (Pacific) dispatch of exactly that URL went
   through `ssl.bing.com/webmaster/api.svc/json/SubmitUrl` (HTTP 200, quota
   100 to 99) and appears as row 1 of the owner's export pulled later the
   same day. The full loop, including the owner-confirmation step, is
   already closed for that URL against the exact endpoint under audit.
2. A blank-list `workflow_dispatch` run does not print quota and does not
   prove auth: with no manual URLs the workflow runs the sitemap diff,
   computes 0 URLs, and skips the submit step entirely, so the Bing API is
   never called (workflow steps "Nothing to submit" / `if: count != '0'`).
   That is a fact from the workflow structure, not a judgement.

Honest scope note on what today's live proof does and does not show: it
proves the JSON endpoint, the key, and the WMT reporting loop work today,
14 days before the retirement date. It cannot prove anything about
1 September. The claim that the channel survives the 31st rests on the
documentation evidence above, not on today's run.

## Part 2: submission-ledger reconciliation

### Export shape

`reports/playmagpie.com_SubmittedUrls_8_17_2026.csv`: 53 data rows plus
header. Columns: `URL`, `Submitted` (Pacific-offset timestamps,
`-07:00`). Window: 2026-07-28T04:08 to 2026-08-17T09:20. **The window
reaches back before 10 Aug and covers every dispatch date in the ledger,
so nothing lands in UNVERIFIABLE-BY-THIS-EXPORT: the 07-28 guide, the
08-01 corrections and Batch 1 are all adjudicated CONFIRMED or MISSING on
direct evidence.**

Structural observation, labelled: FACT that the export contains no
duplicate URLs (53 rows, 53 distinct). HYPOTHESIS, supported by both
multi-dispatch cases below: the export shows one row per URL carrying the
LATEST submission, so an earlier submission of a URL that was later
re-submitted is subsumed rather than separately listed.

### Dispatch record since 28 July (event level, from STATE/decisions/run history)

- 07-28: guide `/guides/why-is-my-crypto-casino-withdrawal-pending` (owner
  manual + workflow_dispatch test in both host forms) + apex placeholder
  `guides/YOUR-SLUG` (deliberate 404 test). 4 submission events.
- 08-01: auto URL-set diff on publish: `/guides/large-crypto-casino-withdrawals`,
  `/compare/cloudbet-vs-roobet`. Manual correction runs: 9 URLs (10:45)
  + 8 URLs (10:48), 17 total.
- 08-02: auto: `/reviews/bitstarz/bonus`; manual: `/reviews/bitstarz`
  (+ `/bonus/free-spins` intended in the same run; see below).
- 08-07: Batch 1, 10 `/country/*` hubs.
- 08-08: Batch 2a, 7 `/bonus/*`.
- 08-10: Batch 2b, 5 `/crypto/*` + 3 `/game/*`.
- 08-11: auto (run #53): both trackers; manual: `/country/canada/legal` +
  homepage; own run: `/country/australia/legal`.
- 08-17: `/country/australia` (single-URL run, this session).

54 distinct URLs, 56 submission events.

### a. CONFIRMED (53 of 54 distinct URLs): flip to verified

Every content URL dispatched since 28 July is visible in WMT with a
timestamp matching its dispatch run to the minute-level grouping:

- 07-28 guide (www form, 05:24) and the YOUR-SLUG placeholder (04:08,
  apex): both visible. The placeholder appearing is itself informative:
  WMT records apex-host submissions, and records URLs that 404.
- 08-01: all 17 correction URLs, in two timestamp groups of 9 (10:45) and
  8 (10:48) exactly matching the two runs; plus both auto-submitted new
  pages (09:16, 09:48).
- 08-02: `/reviews/bitstarz` (05:40) and `/reviews/bitstarz/bonus` (04:50).
- 08-07: 9 of 10 Batch 1 hubs at 13:42; the 10th (`/country/australia`)
  appears with today's 08-17 timestamp instead, consistent with the
  latest-row-per-URL hypothesis and today's re-dispatch of that URL.
- 08-08: all 7 bonus URLs (10:52). This also closes `/bonus/free-spins`,
  whose 08-02 manual submission left no separate trace: indeterminate
  whether the 08-02 run included it (the export cannot distinguish
  "subsumed by the 08-08 row" from "never sent on 08-02"), but the URL is
  verified submitted either way.
- 08-10: all 8 crypto/game URLs (04:28).
- 08-11: all 5 (trackers 07:08, canada/legal + homepage 07:15,
  australia/legal 01:06).
- 08-17: `/country/australia` (09:20).

### b. MISSING (1, test artifact, no action)

- `https://playmagpie.com/guides/why-is-my-crypto-casino-withdrawal-pending`
  (APEX host form), submitted 07-28 as half of the both-host-forms
  dispatch test. Inside the window, absent from the export. Not explained
  by host normalisation: the apex YOUR-SLUG row shows apex URLs can
  appear. Genuinely absent. Proposed next step: NONE. The canonical www
  form of the same page is confirmed (05:24 row), and the mixed-host
  question this test probed was settled on direct evidence on 08-01
  (9 www-form URLs accepted against the apex property with a matching
  decrement). Re-dispatching a non-canonical host form would spend quota
  to re-answer a closed question. Recorded and closed as a known absence.

### c. UNEXPECTED (0)

Every CSV row maps to a recorded dispatch event. In particular the three
auto-route rows (large-withdrawals guide, cloudbet-vs-roobet, bitstarz/
bonus) and the two tracker rows match the push-triggered URL-set diff
history, so the auto route needs no special pleading.

### d. UNVERIFIABLE-BY-THIS-EXPORT (0)

The window covers all dispatch dates. Nothing is adjudicated on inference.

### Ledger disposition

The "submitted-pending-confirmation since 2026-07-28" ledger is CLOSED as
of 2026-08-17, verification source: the owner's WMT URL Submission export
committed at `reports/playmagpie.com_SubmittedUrls_8_17_2026.csv`. 53 of
54 distinct URLs verified; the single absentee is the apex-form test
artifact above, closed without action. The Bing URL Submission channel is
verified working end to end at volume: accepted, counted, and visibly
reported by WMT, across manual dispatch, auto URL-set diff, and gh-fired
dispatch routes.
