# Investigation: the /game/dice conversion finding (2026-09-05)

Investigation session, read-only on content. Owner-supplied GA4 data
recorded as FACT with window and source; interpretations graded
fact / hypothesis / guess, with sample size stated next to each.

## The owner-supplied GA4 data (FACT; GA4 free-form exploration,
## PlayMagpie property, window 2026-08-07 to 2026-09-03)

- Site-wide key events in window: 7. All affiliate_click, all on
  landing page /game/dice, all AI Assistant channel.
- By country: Bangladesh 4 clicks in 1 session; Italy 3 clicks in
  1 session. No GB rows (not owner testing).
- Direct 47 sessions / 0 key events; Organic Search 5 / 0; Referral
  1 / 0.
- AI Assistant: 8 sessions; landings /country/norway 3,
  /country/netherlands 2, /game/dice 2.
- /country/australia/legal: 3 sessions, all Direct, 0 key events,
  0 AI Assistant sessions.
- AI Assistant avg engagement 26s vs 7s Direct; user key event rate
  28.57% vs 4.44% site average.

## Task 1 answer: mostly artifact, with a small real kernel

**The tracker itself is global and its coverage is complete (FACT,
code-verified).** components/AffiliateClickTracker.tsx mounts once in
app/layout.tsx as a document-level capture-phase delegated listener on
`a[rel~="sponsored"]` filtered to known affiliate hostnames (map built
from lib/casinos.ts). It fires on every route and every link type:
every affiliate anchor on the site flows through CTAButton's `external`
branch (rel="noopener noreferrer nofollow sponsored") or one of two raw
anchors (best-bitcoin-casino-canada, bnb-crypto-casinos), both carrying
sponsored. Strip CTAs, casino cards, comparison-table buttons and
inline-variant CTAs all use the same path. No affiliate anchor without
rel~=sponsored was found anywhere in app/ or components/.

**But affiliate_click can only fire where an affiliate anchor renders,
and the page map splits the site in two (FACT, code-verified):**

- CONVERTIBLE (render >=1 affiliate anchor): the homepage, the six
  commercial statics (best-crypto-casinos, fast-withdrawal, high-roller,
  no-kyc, pokies-nz, sportsbook), bnb-crypto-casinos,
  best-bitcoin-casino-canada, every /country hub (incl. Finland and
  Sweden statics), every /crypto/[slug], /game/{crash,dice,plinko},
  every /bonus page, every /compare pair, every /reviews parent and all
  four sub-page families.
- STRUCTURALLY UNABLE TO CONVERT (no affiliate anchor at all): both
  /country/*/legal pages, both trackers, **every /guides/* page** (the
  guides CTA block is an INTERNAL link to /best-crypto-casinos, no
  affiliate anchor), /methodology, /about, the hub tile pages.

**Consequence (FACT): the site's top two AI assets cannot fire
affiliate_click at all.** /country/australia/legal (3,131 citations)
renders no affiliate link; neither does
/guides/why-is-my-crypto-casino-withdrawal-pending (1,709). Their zero
key events are structural and carry NO information about assistant
intent. A guide-landing session could still convert in-session via the
internal hop to a listicle (the landing dimension would credit it);
none did in this window, but on this sample that is not evidence.

**Instrumented window (FACT from repo records):** the tracker shipped
2026-08-18; affiliate_click was registered as a GA4 key event
2026-08-20 and key events accumulate only from that date (STATE 5b).
So of the 28-day window, key-event data exists for 20 Aug to 3 Sep:
**15 days, ~54%**. 7-17 Aug is wholly unmeasurable; 18-19 Aug fired
events but not key events.

**The real kernel that survives:** among CONVERTIBLE assistant
landings, /game/dice (2 sessions) produced 7 clicks while the norway
(3 sessions) and netherlands (2 sessions) hubs, which both carry full
CTA strips and cards, produced none; and 47 Direct + 5 Organic sessions
on a mostly-convertible site produced none. That part is behaviour, at
n=7 sessions and 15 instrumented days. Any interpretation of it is
GUESS-grade.

## Task 2: what is different about /game/dice (answer: nothing found)

- Structure: dice, crash and plinko are the same template family
  (350/348/350 lines, same CasinoCTAStrip + CasinoCard components,
  Breadcrumb + FAQPage schema, per-operator notes section, maths/
  mechanics sections). Dice's lineup is bc-game, duelbits, shuffle,
  roobet (4 operators; no BitStarz, the catalogue's only proven
  converter per the 08-01 affiliate data).
- The 10 Aug de-templating (commits 7ab7eb7 + 7a9cff8) gave dice the
  SAME treatment as its siblings: title/H1/meta de-stamping off the
  shared stem, editorial shells to lib. Nothing dice-specific shipped.
- Google crawl state (inspected 2026-09-05): last crawled
  **2026-07-29, BEFORE the 10 Aug de-templating**; "Submitted and
  indexed"; campaign-list row 31, unrequested. Google holds the
  pre-reform bytes. Bing: submitted 2026-08-10, accepted (SubmittedUrls
  row in both the 25 Aug and 4 Sep exports).
- Verdict: **no structural differentiator found (FACT for the checked
  dimensions). HYPOTHESIS, n=2 sessions: dice happened to receive
  ready-to-act visitors; the page is not doing anything its siblings do
  not.**

## Task 3: the two datasets do not overlap in this window (FACT, this
## window and sample only)

- /game/dice: **zero AI citations at all four series points** (absent
  from every AIPageStats and AISearchQueries export, 17 Aug through
  4 Sep) and **zero Bing search rows** (absent from both Keyword and
  PageTraffic reports in every pull). Its only search footprint is the
  GSC 3-month export: 173 Google impressions, 0 clicks, position ~59,
  a window dominated by pre-suppression June serving and rank-tracker
  pollution.
- /country/norway and /country/netherlands: absent from the citation
  page stats and from Bing page traffic in the 4 Sep pull. (Note: the
  24 Aug Google impression was on /best-bitcoin-casino-norway, which
  now 308-redirects to /country/norway after the July consolidation;
  /country/sweden, not norway, holds the 4-citation table entry.)
- The reverse: the top-cited pages received effectively no assistant
  sessions in the window. australia/legal: 0 assistant sessions
  (3 Direct, 7s engagement). The withdrawal-pending guide and
  /reviews/roobet do not appear among the 8 assistant landings.
- **Assistant-landing set {norway, netherlands, dice} and citation set
  {australia/legal, withdrawal guide, roobet, ...} share no members.**

**What this means, stated carefully:** the two instruments measure
different events. A Bing AI Performance citation is a Copilot grounding
read during answer composition; a GA4 AI Assistant session is a human
clicking a referral link out of an assistant. They can legitimately
diverge to zero overlap, and this exact shape is already on record at
operator level (the 2026-08-01 standing tension: Cloudbet 52 citations
/ zero FTDs vs BitStarz zero citations / only converter, with the owner
instruction not to argue either direction from it). **HYPOTHESIS,
untested, and the single most valuable next datum: if the two dice
sessions' source is chatgpt.com or perplexity.ai rather than
copilot.microsoft.com, the entire disconnect is explained by
instrumentation scope, because Bing AI Performance only measures
Copilot grounding and ChatGPT-referred visits would never appear in
it.** Only if converting assistant traffic proved to be Copilot-sourced
AND persistently landing on zero-citation pages would the citation-led
evidence base itself be in question, and 2 sessions cannot establish
that either way. No strategy conclusion is drawn from this sample.

## Task 4: the owner pulls that would settle it

1. **Session source on the 2 /game/dice sessions** (add Session
   source / medium to the exploration, filter landing = /game/dice).
   Useful answer: a referrer domain. chatgpt.com or perplexity.ai
   explains the Bing disconnect; copilot.microsoft.com makes it a real
   puzzle worth escalating.
2. **The operator behind the 7 clicks.** The event already sends
   operator, page_path, link_url and link_text (code fact), but the
   event-scoped custom dimension for `operator` was PARKED on
   2026-08-18 (STATE 5b(b)), so it is NOT reportable in explorations.
   Registering it starts coverage from registration day only; for the
   existing 7 clicks, link_url may be recoverable via BigQuery export
   if enabled, otherwise the historical params are effectively lost to
   reporting. Useful answer: which of bc-game / duelbits / shuffle /
   roobet took the clicks (bc-game would connect to the "next to
   nothing" affiliate line; duelbits/shuffle have no FTD history).
   Recommendation to weigh: un-park the dimension now so the NEXT
   click is attributable.
3. **Dates of the 7 clicks** (add Date). Useful answer: all >= 20 Aug
   (confirms the accounting boundary) and whether the two sessions are
   same-day (would suggest one answer surfacing the page twice).
4. **Click location** (dimension: Page path on the affiliate_click
   event). Useful answer: confirms the clicks fired ON /game/dice
   rather than downstream after an internal hop.
5. **Post-landing paths for the two sessions** (path exploration from
   /game/dice). Useful answer: whether 4 clicks in one session means
   comparison shopping across the four operators.

## Logged one-liners (noticed, not actioned, per standing rules)

- The GSC 25 Aug wave included an impression on /game/slots, a route
  that no longer exists in app/game/; likely a stale index entry from
  the old [slug] route. Not investigated (out of scope).
- /best-bitcoin-casino-norway 308-redirects to /country/norway; the
  24 Aug impression row sits on the redirecting URL.
