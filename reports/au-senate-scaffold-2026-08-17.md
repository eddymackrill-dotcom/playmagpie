# Australia Senate committee report: same-day update scaffold (prepared 2026-08-11)

The Senate Environment and Communications Legislation Committee reports on
the Interactive Gambling Amendment (Gambling Reform) Bill 2026 on 17 August
2026. This scaffold exists so the update ships same-day. NO speculative
content: the bracketed slots are filled only from the published report.

## Where the update goes

The dated update section on /country/australia/legal (additive-only page;
byte-diff proof required). One new log-style paragraph appended INSIDE the
existing "Update, August 2026" section (after the inducements paragraph,
before the callout), or as a dated sibling paragraph, plus a re-dated
"as of" line in the callout. Then: lastmod bump for this URL alone, push,
single-URL Bing dispatch. Also re-date the homepage regulatory block's
Australia line if the wording changes.

## Section skeleton (fill from the report, cut what does not occur)

- "On 17 August the Senate committee reported. [MAJORITY RECOMMENDATION:
  pass / pass with amendments / do not pass]. [DISSENTING REPORTS by
  which parties, one line each]."
- "[INDUCEMENTS: whether the report recommends extending the bill to
  online inducements, the live negotiation issue]."
- "[NEXT STEP the report sets up: Senate vote timing if stated]."
- Callout re-date: "As of 17 August 2026 the player position is
  unchanged: [only if true per the report]."

## Source list (check these on the day)

- Committee report page: https://www.aph.gov.au/search/url/Inquiry/27411_16_
- Bill homepage: https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7520
- DSS ministers newsroom: https://ministers.dss.gov.au/
- Trade coverage for colour (secondary only): iGaming Business, SBC, AGB.

## Reminders

- Verify-or-omit: nothing from pre-report press speculation survives into
  the entry.
- The existing update section's text is FROZEN; the new entry is additive.
- reviewBy moves from 2026-09-01 to the next milestone the report creates.

## Pre-flight 2026-08-16: scaffold is now BUILT AND FENCED in the page

**GATE INVERTED 2026-08-17 (owner instruction; supersedes the mechanism
described in the next paragraph).** No report was tabled on the 17th
(abort branch 1), which left the 08-16 block-the-build gate holding the
whole site deploy-frozen for an open-ended wait. The mechanism is now
exclude-the-section: production builds (`VERCEL` set) SUCCEED while
tokens remain, and every token-carrying block and source entry is
EXCLUDED from the rendered output entirely (absent from production HTML,
no hidden markup of any kind); local/dev builds still render the fenced
section visibly for execution-day preview. The hard gate is repointed,
not removed: a `REPORT-PENDING` token that would render anywhere outside
the excludable blocks/sources arrays (lead, faqs, meta strings) still
fails the production build, so leaking remains structurally impossible.
Verified 2026-08-17: (a) `VERCEL=1` build with tokens present SUCCEEDS;
(b) zero hits for the token and for four scaffold-unique strings across
all servable build output, 11-Aug frozen section intact; (c) a token
injected into a FAQ answer fails the `VERCEL=1` build with the repointed
gate error. Execution-day flow unchanged: filling the slots and deleting
the tokens is what brings the section into production.

Original 2026-08-16 mechanism, superseded but kept for the record: the
section skeleton above is implemented in
`app/country/[slug]/legal/page.tsx` (working tree, uncommitted) as six
fenced blocks plus one fenced source entry. Every report-dependent slot
carries a literal `[REPORT-PENDING: ...]` token, and a publish gate below
`legalContent` throws on any Vercel build while a token remains (verified
2026-08-16: local build passes, `VERCEL=1` build fails). Execution steps
live in `reports/au-senate-execution-runbook-2026-08-17.md`.

Fetch note learned 2026-08-16: aph.gov.au returns 403 to generic fetchers.
Use curl with a full browser user-agent string; the runbook carries the
exact command.

## Invariant context, pre-verified 2026-08-16 (fill material; every item fact + source)

Public record only. Nothing below depends on the report's contents. Items
marked HEARING-COLOUR may be used only after the report document is read,
and only as colour, never to fill a report slot.

1. FACT: Interactive Gambling Amendment (Gambling Reform) Bill 2026
   introduced and read a first time in the House of Representatives on
   2 July 2026; second reading moved the same day; second reading debate
   12 and 13 August 2026; status "Before Reps" as of 16 August 2026.
   SOURCE: https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7520
2. FACT: introduced together with the National Self-exclusion Register
   (Cost Recovery Levy) Amendment Bill 2026 (companion levy bill funding
   BetStop). SOURCE: bill homepage summary, URL as item 1.
3. FACT: Senate referred both bills to the Environment and Communications
   Legislation Committee. The committee's own inquiry page states "Date
   referred: 1 July 2026" and that the Senate referred the Gambling Reform
   Bill on 1 July 2026 and the Levy Bill on 2 July 2026.
   DISCREPANCY, recorded not resolved: the bill homepage's Notes field
   says "Referred to Committee (02/07/2026)". If a referral date is needed
   in prose, use the committee page's own record or omit the date.
   SOURCE: https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/GamblingReform48P
4. FACT: submissions closed 24 July 2026. SOURCE: inquiry page, item 3.
5. FACT: reporting date 17 August 2026. SOURCE: inquiry page (item 3) and
   bill homepage Notes ("Report due 17/08/2026", item 1).
6. FACT: public hearings held in Canberra on 3 and 4 August 2026.
   SOURCE: inquiry page, item 3 ("Past Public Hearings").
7. FACT: as of 16 August 2026 no report is published; inquiry status reads
   "Submissions Closed". SOURCE: inquiry page, item 3.
8. FACT: bill scope per the parliamentary summary: new restrictions on
   wagering advertising including a ban on wagering advertising content
   during live coverage of sports; requirements on online services to
   prevent restricted users receiving advertising; expanded BetStop
   framework; prohibition of online keno and foreign matched lotteries;
   obligations on financial institutions and online services to block
   payments and access to designated interactive gambling services.
   SOURCE: bill homepage summary, item 1. The three-ads-per-hour cap, the
   6am-8.30pm window and the 1 January 2027 commencement are already live
   on the page from the 11 August primary-verified pass; do not re-derive.
9. FACT: Murphy report background: "You win some, you lose more", House
   Standing Committee on Social Policy and Legal Affairs, June 2023, with
   recommendations enumerated 1 through 31 (31 total, counted from the
   list of recommendations page 2026-08-16).
   SOURCE: https://www.aph.gov.au/Parliamentary_Business/Committees/House/Social_Policy_and_Legal_Affairs/Onlinegamblingimpacts/Report
   and its List_of_recommendations sub-page.
10. POSITION-AT-HEARING (Coalition, attribute as a stated position dated
    5 August 2026, never as a predicted vote or predicted dissent):
    Shadow Communications Minister Sarah Henderson: the Coalition "won't
    be supporting this deficient legislation in its current form"; "The
    bill ignores gambling inducements which are causing immeasurable harm
    to some Australians".
    SOURCE (primary for own position): https://sarahhenderson.com.au/coalition-to-drive-crucial-amendments-to-labors-defective-gambling-bill/
    Corroboration (ACM syndication, 5 Aug 2026): https://www.bunburymail.com.au/story/9324320/deficiencies-coalition-push-for-gambling-changes/
11. POSITION-AT-HEARING (Greens, attribute as a stated position, reported
    6 August 2026): communications spokesperson Sarah Hanson-Young called
    the legislation "dangerous", saying it provides weaker protections
    than existing measures.
    SOURCE (secondary, summarising The Australian): https://cathnews.com/2026/08/06/coalition-and-greens-force-labor-to-rework-reform-package/
    Grade: single secondary chain. If used on-page, soften to "reported
    positions" phrasing or corroborate on the day.
12. FACT: crossbench amendment activity on the parliamentary record:
    proposed second-reading and detail amendments in the House from
    Watson-Brown, Chaney, Haines, Ryan, Scamps, Boele and Spender, and
    four Senate amendment sheets circulated by Sen David Pocock.
    SOURCE: bill homepage "Proposed amendments", item 1.
13. HEARING-COLOUR (do NOT use to fill report slots): federal officials
    told the inquiry that discussions were under way with Communications
    Minister Anika Wells about potential amendments; the inducements gap
    was the recurring criticism at the hearings.
    SOURCE: item 11 URL (The Australian via CathNews, 6 Aug 2026).
