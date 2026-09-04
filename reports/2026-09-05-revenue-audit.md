# Revenue audit and next-step recommendations (2026-09-05)

Analysis session: documentation and logs only. Every conclusion is
graded fact / hypothesis / guess with sample sizes attached. Nothing is
retired or deprioritised here; recommendations only (2026-09-04 rule).

## Task 1: the revenue baseline (the audit's anchor)

**FACT: no revenue figure exists anywhere in the repo.** The sweep
covered STATE, CLAUDE.md, RUNBOOK, the decisions log, reports/, lib/
and the catalogue for commissions, revenue share, CPA, payments,
statements and depositor counts. The entire commercial record is ONE
owner-supplied reading, logged 2026-08-01 as "the first commercial
outcome data the project has ever held":

- BitStarz: 4 FTDs, "500 GGR". The only operator producing anything.
- 7Bit group (7Bit + Mirax): "acceptable" (no figure).
- BC.Game: "next to nothing" (no figure).
- Cloudbet: zero across the board.

Recorded then, and still true, as a level not a trend: one cumulative
reading, no window stated, no per-page attribution. The "only proven
FTD producer" line from the 4 September investigation rests entirely on
this entry.

**What is missing even inside that one reading (FACT):** the currency
of the 500 GGR is unstated; GGR is the OPERATOR'S gross gaming revenue
from referred players, not the site's income; no commission structure
(revshare percentage, CPA, hybrid) is recorded for any operator; no
payment received is recorded anywhere. **Whether this site has ever
been paid anything is not established by the repo.** Every metric the
project tracks (citations, impressions, positions, sessions, clicks)
stops at least three funnel stages short of money. That absence is the
audit's most important finding.

Affiliate accounts: the catalogue carries tracking-parameter affiliate
URLs for all 8 operators through named programs (bzstarz2.com,
bc.game/i-, cldbt.cloud af_token, mirax.partners, 7bit.partners,
shuffle.com ?r=, record.dbpartners.io, go.roobet.com ?bta=), so
dashboards should exist for all 8 (FACT for the URLs; inference for
dashboard access). The 08-01 reading names five; **Shuffle, Duelbits
and Roobet have no commercial reading at all**, which matters because
three of the four operators on the only converting page (/game/dice:
bc-game, duelbits, shuffle, roobet) are among the unread ones.

## Task 2: the funnel, stage by stage

| # | Stage | Instrument | Current number | Measurable? |
|---|---|---|---|---|
| 1 | Assistant grounding | Bing WMT AI Performance (Copilot ONLY) | ~6,400 cumulative citations since ~13 Jul; ~281/day differenced at 4 Sep | Yes, Copilot only; ChatGPT/Perplexity grounding invisible |
| 2 | Assistant referral visit | GA4 AI Assistant channel | 8 sessions in 7 Aug-3 Sep; flat ~21/28d across prior reads | Yes (referrer-dependent undercount possible) |
| 3 | Search impression | GSC + Bing WMT | Google: streak 0/7, trickle days only; Bing: 1,336 imp (3-month per-page window, growing) | Yes |
| 4 | Search click | GSC + Bing WMT | Google: 0 in last 30d; Bing: 24 clicks, of which ~12 in the last 10 days | Yes |
| 5 | Landing page view | GA4 | 61 sessions in window across listed channels (Direct 47, AI 8, Organic 5, Referral 1) | Yes |
| 6 | affiliate_click | GA4 key event | 7 events, ALL /game/dice landings, ALL AI channel; key-event data exists ONLY from 20 Aug (15 of the window's 28 days) | Yes, since 20 Aug; operator param NOT reportable (custom dimension parked 18 Aug) |
| 7 | Registration | Operator dashboards | UNKNOWN | Owner-side only |
| 8 | KYC completion | Operator dashboards | UNKNOWN | Owner-side only; some programs never show it |
| 9 | First-time deposit | Operator dashboards | 4 cumulative (BitStarz, as of 01 Aug) | Owner-side only |
| 10 | Revenue to site | Affiliate statements | NO FIGURE ON RECORD | Owner-side only |

**Where measurement stops (FACT): after stage 6.** Stages 7-10 are
visible only in eight owner-side dashboards, of which the repo has one
partial reading dated 01 August. Additionally, stage 6's operator and
URL are invisible in reporting (parked custom dimension), so even the
measured clicks cannot be joined to the one operator known to convert.

**The scale framing the funnel imposes (FACT, stated because the brief
asked not to defer to its framing):** total measurable human inflow is
on the order of 1-3 visitors/day (61 GA4 sessions in 28 days, ~1.2
Bing clicks/day and rising, Google ~0). At that volume, funnel
optimisation moves single FTDs at best. The binding constraints are
(a) upstream qualified-human volume, currently Bing search plus
whatever produced the BitStarz FTDs, and (b) the invisibility of
stages 7-10. Neither is fixed by conversion tweaks alone.

## Task 3: the structural CTA question. Design or defect? DESIGN, but an unmeasured one

- **The legal pages' CTA-free build is recorded design (FACT):** the
  route header states the legal sub-pages serve informational intent
  "kept structurally separate from the commercial /country/[slug]
  hub". The AU crypto-safety guide is "intentionally strip-free"
  (25 Aug record). The Roobet payment-methods REFUSAL (deposit-funnel
  page inappropriate on editorial-integrity grounds) shows deliberate
  commercial restraint is an established pattern.
- **The guides' internal-CTA block has NO recorded decision either
  way (FACT: searched).** It routes every guide reader to
  /best-crypto-casinos as an internal link. It is consistent with the
  informational/commercial separation, but nobody chose it on revenue
  grounds on the record.
- **Is there evidence the two-step funnel works? NO DATA (FACT).**
  Guide-landing sessions CAN convert in-session via the hop (the
  landing dimension would credit them); zero did in the 15 instrumented
  days, on a sample too small to mean anything. Guide-to-commercial
  navigation flow has never been pulled; it is owner pull item 5.
- **What would change with direct affiliate anchors on the top
  assets, and the arguments against:**
  - /country/australia/legal (3,131 citations): RECOMMEND AGAINST
    direct affiliate CTAs. Three stacked reasons: (1) the 11 Aug
    freeze directive permits additive dated sections only, and a CTA
    is not a dated informational addition; (2) compliance exposure is
    real and documented ON THE PAGE ITSELF: providing online casinos
    to Australians is prohibited under IGA s15 and ACMA blocks
    "sites and affiliate domains", so putting affiliate links to
    casino operators on an Australia-legality analysis is the exact
    profile ACMA blocks (HYPOTHESIS on likelihood, FACT on the
    mechanism existing); (3) HYPOTHESIS: the page earns citations as
    a neutral legality reference, and assistants ground on it partly
    because it reads as analysis, not affiliate promotion.
    A compliant additive alternative exists: a dated section may
    internally point readers to the /country/australia hub, which
    already carries the CTA strip; that keeps the freeze, the
    separation and the measurement (the hub click would attribute to
    the session).
  - /guides/why-is-my-crypto-casino-withdrawal-pending (1,709
    citations) and guides generally: the freeze does not apply, the
    compliance posture is page-dependent not structural, and the
    guide already names operators with verified processing facts.
    Contextual operator-level affiliate links here are editorially
    defensible where the fact pattern supports them. This is the
    real opportunity surface.
- **Quantification, and where it becomes guesswork:** measurable
  today: guides took an unknown share of the 61 sessions (landing
  split beyond the 8 assistant sessions was not in the owner cut).
  Everything beyond that is GUESS: no per-guide session counts, no
  hop-through rate, no click-to-FTD rate exist. What CAN be said: the
  two-step design inserts one extra page-load between the site's
  highest-intent readers (withdrawal-problem sufferers) and any
  operator link, and its throughput has never been measured. The
  honest framing is "unmeasured design worth instrumenting and
  testing", not "quantified leak".

## Task 4: the leaks, tested rather than assumed

1. **Citation to visit (FACT at the measured windows): a Copilot
   citation is effectively not a traffic source at current scale.**
   The 18 Aug read established ~1 session per ~80 citations; this
   window is worse (~8 sessions against thousands of window
   citations). Two caveats keep this from being a verdict on the
   channel: Bing AI Performance counts grounding reads, not offered
   links, so most citations may never surface a clickable reference;
   and GA4's channel grouping can misclassify stripped referrers.
   Nothing here says the citations are worthless (visibility inside
   answers is unmeasured); it says they do not produce sessions.
2. **Visit to click (n=61 sessions, 15 instrumented days):** the only
   clicks came from 2 assistant sessions on /game/dice; 5 assistant
   sessions on full-CTA country hubs produced none. Sample far too
   small to indict hub CTA placement (GUESS territory); the one
   structural observation is that hub strips sit below substantial
   country prose while dice's strip sits high under a short intro.
   Worth an eye at the next real sample, not action now.
3. **Direct traffic (47 sessions, 7s engagement, 0 clicks):**
   HYPOTHESIS, consistent with the on-record bot signature
   (rank-tracker fingerprints, zero-click, daily cadence): most
   Direct "sessions" are not humans. If so, the human denominator is
   even smaller than 61, which raises the per-human conversion rate
   and further shifts the problem upstream to volume.
4. **Click to deposit: INVISIBLE (FACT).** 7 clicks are known; whether
   any registered or deposited is unknowable from the repo. What makes
   it visible: the owner dashboard pull (Task 5.1) joined with the
   un-parked operator dimension going forward. Sub-affiliate/click-ID
   postback integration would automate it but is a bigger build;
   the manual join is enough at current volume.
5. **Operator mix (FACT on the mechanics, no recommendation on
   choice per the 2026-08-01 standing instruction):** strips are
   trust-score-sorted with editorial overrides, so the default top-3
   (BitStarz, BC.Game, 7Bit) does include the proven converter on
   most commercial pages. /game/dice's lineup (bc-game, duelbits,
   shuffle, roobet) is editorial fit, and three of those four have no
   commercial reading on record. Two alignment facts worth holding
   side by side without resolving: the site's largest human click
   stream (Bing search) lands overwhelmingly on /reviews/cloudbet
   (17 of 24 clicks), the operator with zero recorded conversions;
   and the operator with all recorded conversions (BitStarz) now has
   the fastest-accelerating citation page (payment-methods, +223 in
   ten days) and unserved deposit-intent grounding demand ("bitstarz
   deposit methods australia", 177 citations). Per the standing rule
   these tensions are recorded, not resolved; the dashboard pull is
   what would resolve them.

## Task 5: owner-side pulls, in value order

1. **All eight affiliate dashboards: clicks, registrations, FTDs,
   revenue, commission structure, available date ranges.** Source:
   each program's portal (bzstarz2/BitStarz partners, 7bit.partners,
   mirax.partners, BC.Game, Cloudbet, Shuffle, dbpartners/Duelbits,
   Roobet). Useful answer: a per-operator table with a money column
   and dates, however small the numbers. This converts the audit's
   central unknown into a baseline and resolves both Task 4.5
   tensions. Everything else in this audit is provisional until it
   exists.
2. **Un-park the GA4 `operator` custom dimension (and register
   link_url/page_path while there).** Registration is forward-only:
   every day parked is clicks lost to attribution. Useful answer:
   the next click reports operator and page.
3. **Session source on the two /game/dice sessions** (carried from
   the 5 Sep investigation): chatgpt.com/perplexity.ai explains the
   citation disconnect as instrumentation scope; copilot.microsoft.com
   makes it a real puzzle.
4. **Dates and page-paths of the 7 clicks** (confirm >= 20 Aug;
   confirm they fired on /game/dice).
5. **Path exploration: guide and legal landings onward-navigation**
   (does anyone use the two-step funnel? Useful answer: a
   guide-to-listicle flow count, even a small one).
6. **The GA4 three-leg 28-day pull already on the return list**,
   which this audit does not duplicate.

## Task 6: ranked recommendations (recommend only; nothing enacted)

**Cheap and well-evidenced:**

1. **Establish the revenue baseline (owner pull 1).** Evidence: FACT
   (no figure exists). Mechanism: cannot optimise for money while
   money is unrecorded; also resolves the Cloudbet-clicks and
   BitStarz-demand tensions with data instead of inference. Effort:
   one owner session. Risk: none. Worked when: a dated per-operator
   revenue table is in the repo.
2. **Un-park the operator dimension now.** Evidence: FACT (parked;
   forward-only). Mechanism: joins stage 6 to stages 7-10 via the
   dashboard pull, making click-to-deposit inspectable per operator.
   Effort: minutes. Risk: none. Worked when: the next affiliate_click
   carries a reportable operator.
3. **Instrument-then-test the guides' conversion path.** Evidence:
   HYPOTHESIS (design unmeasured; zero recorded justification for the
   two-step funnel; highest-intent readers sit on guides). First
   measure (owner pull 5); if throughput is effectively zero, A/B the
   change by shipping contextual operator-specific affiliate links on
   ONE guide (the withdrawal-pending guide, where operator processing
   facts are already published) and comparing affiliate_click on its
   landings before/after. Effort: small content change (a future
   session, not this one). Risk: credibility dilution on the #2 AI
   asset; mitigate by linking only operators whose processing facts
   the page already states, with the existing verified-fact framing.
   Worked when: guide-landing sessions produce attributable clicks.
4. **Australia legal page: add the compliant internal pointer, not
   CTAs.** Evidence: design + compliance facts above. Mechanism: an
   additive dated section pointing AU readers to the hub preserves
   freeze, credibility and law while opening a measurable path from
   the site's biggest asset. Effort: one additive section. Risk: low.
   Worked when: australia/legal landing sessions show onward hub
   navigation (pull 5 measures it).

**Speculative (flagged as such):**

5. **BitStarz deposit-intent strengthening on Bing-visible pages.**
   Evidence: HYPOTHESIS assembled from three facts (BitStarz is the
   only recorded FTD producer; bitstarz/payment-methods citations are
   accelerating fastest; 177-citation "bitstarz deposit methods
   australia" grounding demand is unserved by a dedicated treatment)
   but the causal chain citation-to-deposit is entirely unproven and
   the standing 08-01 instruction forbids arguing operator choice
   from the citation/FTD tension alone; this stands only as a
   demand-plus-converter coincidence until the dashboard pull speaks.
   **This is the recommendation most likely to be wrong. Falsified
   if:** the dashboard pull shows the 4 BitStarz FTDs predate or do
   not correlate with the pages carrying BitStarz deposit content, or
   if 60 days after any strengthening ship the BitStarz FTD count is
   unmoved while the pages' citations rose (visibility without money,
   the breadth-test shape at operator level).
6. **Hub CTA placement review** only if a real sample accumulates
   (n=5 sessions today is nothing).

## The 7 September monthly audit: what this changes

Add to its scope: (a) transcribe the affiliate-dashboard baseline if
the owner pulls it by then, as a new STATE commercial section with
dates; (b) verify the operator dimension got un-parked and record its
registration date as the attribution epoch; (c) a conversion-surface
line item alongside the census: which pages carry affiliate anchors is
now a mapped, checkable property (this audit's Task 1 map is the
baseline). Already in scope and unchanged: the free-spins orphan
diagnosis, census diff, quota series, catalogue check.
