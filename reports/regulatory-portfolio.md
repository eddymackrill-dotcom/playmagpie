# Regulatory portfolio: per-artefact measurement (opened 2026-08-11)

One row per regulatory artefact. Metadata is fixed at publish; citation
columns are filled from the owner's Bing AI Performance pulls at the weekly
glance (7/30/60 days after publish). Hit = 15+ citations in 30 days on the
artefact's query cluster (the pending-guide benchmark). Monthly portfolio
review: hit rate, and what correlates with hits (format, jurisdiction
size, event type, trigger tags). Query clusters live in each artefact's
data-layer/portfolio block (lib/tracker-content.ts for trackers).

Update columns by appending a dated note rather than overwriting, so the
history stays readable.

| Artefact | Format | Jurisdictions | Event type | Published | reviewBy | Citations d7 | d30 | d60 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| /country/australia/legal (pre-programme benchmark) | single page + update section | 1 | national bill | page 2026-06-19; update 2026-08-11 | ~~2026-09-01 (bill milestones)~~ 2026-08-25 note: superseded 2026-08-18 to EVENT-DRIVEN (Senate debate/vote watch, then royal-assent addendum; see the 08-18 decisions entry) | - | - | - | 23 (7 Aug) -> 207 (10 Aug) -> 347 (11 Aug); the programme's proof case, measured before instrumentation opened. 2026-08-25 note: cumulative 1,816 at the 25 Aug export |
| /country/canada/legal Alberta update | additive update | 1 | market launch | 2026-08-11 | 2026-10-13 (grey-market deadline) | 0 | | | Update to an existing page: reads measure the page, attribute with care. 2026-08-25 note: ZERO citations through 23 Aug (owner exports); breadth programme RETIRED 2026-08-22 on this 0-for-3 evidence, so the hit-rate columns are moot; page stays live under the staleness rules |
| /tracker/prediction-markets-legality | timeline tracker | 7 (WA, MN, UT, MI + WI/NY/IL earlier-stage) | litigation | 2026-08-11 | ~~2026-08-25 (or WA stay ruling)~~ 2026-09-02 (WA multi-source geofence deadline) | 0 | | | Authority-only. 2026-08-25 note: ZERO citations through 23 Aug (owner exports); hit-rate columns moot, breadth retired 2026-08-22; FIRST LIVE UPDATE shipped 2026-08-25 (WA stay denied at both levels, 13 Aug geofence order, 2 Sep deadline; commit 8739788) |
| /tracker/us-sweepstakes-casinos-by-state | matrix tracker | 17 rows | state enforcement wave | 2026-08-11 | 2026-11-01 (OK effective date) | 0 | | | Authority-only; per-row as-of dates 2026-08-11. 2026-08-25 note: ZERO citations through 23 Aug (owner exports); hit-rate columns moot, breadth retired 2026-08-22; matrix stays live under the staleness rules |
