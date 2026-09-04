# September slate proposal (2026-09-05)

Proposal for owner approval; nothing built this session. Conclusions
graded fact / hypothesis / guess with sample sizes. Nothing is retired
or deprioritised (2026-09-04 rule).

## New evidence committed this session

**Copilot surfacing probe (owner, 2026-09-04, UK location; five
screenshots in reports/Copilot-4Sept, verified against the images):**

- "can i use crypto casino australia": playmagpie.com cited
  PROMINENTLY as a visible linked chip, on the opening sentence and
  again on the ACMA point; GamblingSites.com secondary (verified in
  q1 image).
- "bitstarz deposit methods australia": playmagpie.com cited twice,
  on the six-coin deposit list and the minimum-deposit figure
  (verified in q4 image). Copilot delivered the ENTIRE answer in the
  chat window: coins, timings, minimum, fee position.
- "why is my crypto casino withdrawal pending": complete structured
  answer, NO citations shown for anyone (verified in q2 image).
- "crypto casino withdrawal txid": NO citations shown (per capture).
- "is cloudbet casino legit": NO citations shown (per capture).

**Conclusion logged: the SURFACING hypothesis is CLOSED. Citations do
surface as visible clickable links where they appear, so the ~6,400
citations to 8 sessions gap is not a surfacing failure. The leading
remaining explanation, NOT proven: Copilot answers the question
completely and the user has no reason to click.** Two limitations
recorded honestly: the probe ran from the UK while most of the demand
is Australian, and Copilot grounding varies between runs, so the three
zero-citation results are not proof of absence; a repeat run would
firm them up (n=5 queries, 1 run each).

**Backlinks baseline (owner, 2026-09-04): the Bing WMT Backlinks
report is EMPTY. Zero backlinks recorded.** First reading of a metric
the project has never measured; the CLAUDE.md "no backlinks" thesis
statement is now instrumented fact rather than assumption.

## Task 1: the strategic constraint

The brief's five-point framing is supported with one sharpening and
one correction:

- Bing organic is the only channel delivering humans (~1.2 clicks/day,
  n=24), and the impression-click gap is mostly query mix (FACT/
  HYPOTHESIS as graded 5 Sep).
- Copilot citations are visibility and authority, not traffic, and the
  probe now says why: **the site's content is consumed in place.
  Where Copilot grounds on us, it delivers our answer whole (q4), and
  a satisfied user does not click.** (Leading explanation, not
  proven.)
- Google suppressed, flickers unexplained, streak 0/7 settled.
- Zero backlinks (FACT, first baseline).
- Revenue per click unknown; dashboard pull deferred by owner
  decision; click volume is the optimisable currency meanwhile (noted
  once, moved past).

**The sharpening, and the constraint the slate is judged against
(FACT from this session's export check): the visit-shaped demand the
site can see is almost entirely ALREADY SERVED by existing pages
ranking 4 to 7.** The pending family (193 impressions, 3 clicks,
9 rows) lands on the withdrawal-pending guide; the KYC-process family
(positions 4 to 5) lands on the existing KYC sub-pages; trust queries
land on the reviews. The measured gap is not coverage, it is
click-through and position on pages that already rank, plus the gated
reviews batch. **New pages are therefore not the primary traffic
lever this month; existing-page optimisation is.** The slate below is
sized accordingly, and the cap's ceiling-not-target rule does the
rest.

**A correction to the brief, stated because the evidence requires it:
"crypto casino withdrawal txid" is NOT a both-shapes candidate as
measured.** It has zero rows in the Bing keyword report and zero in
the GSC queries export; its 147 citations are grounding-only. Caveat:
both reports truncate their long tails, so absence above ~2
impressions is what is actually established. It remains a valid
candidate under the demand rule (grounding queries are a named
evidence source) but its visit case is a HYPOTHESIS, not measured
demand, and the proposal below treats it that way.

## Task 2: content shape assessment

Assessed on merits, not adopted from the brief:

- **The giveaway dynamic is real (FACT, n=1 clean demonstration):**
  q4 shows a citation-shaped query answered completely from our data,
  in-window. Writing more complete prose against citation-shaped
  queries increases what is given away without producing a visit. The
  response is allocation, not withholding: existing pages stay whole
  (honesty positioning and the authority asset are untouched; this is
  not a deprioritisation of anything), and the SLATE points at
  visit-shaped demand.
- **Interactive tools, honestly costed:** a client-side tool is
  buildable in this stack (client components already exist), but the
  tool output is invisible to crawlers, so any tool page still needs
  a prose shell to rank or ground; there is no template system for
  tools; and a data-table "tool" (fee comparator, sortable matrix)
  does NOT resist absorption, because assistants summarise tables
  happily (q4 summarised exactly such data). **A KYC-requirement
  checker and a fee comparator are therefore weak candidates: high
  effort, absorbable output.**
- **The one shape that genuinely resists absorption is
  input-dependent guidance: the user holds an artifact (a TXID) and
  needs to DO something with it.** A chat answer can describe the
  method (q3 did, uncited); it cannot check the user's transaction.
  A page built as prose plus a light interactive layer (chain
  selector driving per-chain explorer deep-links and status
  meanings, an input field that constructs the explorer URL) gives a
  mid-problem visitor a reason to be ON the page. Effort: one
  session, small client component, no API dependencies (deep-linking
  to public explorers, not querying them; a live status API is
  scope creep and is NOT proposed).
- **Verdict: prose remains the default format for this site. One
  bounded shape experiment is justified, on the one candidate where
  the input-dependence argument applies. If it fails its window, the
  answer is "prose only" and the experiment closes cheaply.**

## Task 3: the proposed slate

**Proposed: ONE new page now, plus existing-page optimisation that
costs no cap slots. Not four. Reasoning: the ceiling-not-target rule
plus the Task 1 finding that coverage is not the gap.** September
would stand at 1 of 8 with 26 days left, capacity deliberately held
for the payid page when its glance lands and for demand the next WMT
pull surfaces.

**Page 1 (the only new build proposed):
/guides/crypto-casino-withdrawal-txid** (working title: "Track a
crypto casino withdrawal by TXID").
- Query evidence: 147 grounding citations (Learn and Solve), the #10
  grounding query; ZERO measured human keyword rows (stated plainly;
  visit case is HYPOTHESIS); q3 probe shows Copilot currently answers
  this query citing NOBODY, an open field (n=1 run, UK).
- Traffic mechanism: adjacency to the pending family (193 imp, the
  guide's cluster) via Bing; the input-dependence shape gives the
  click a purpose an answer window cannot serve.
- Shape: prose (answer-first, per-chain status meanings, the
  casino-side vs chain-side decision tree) + the light interactive
  layer above. No API calls, crawlable static shell, FAQPage schema.
- Scope split, binding: the pending guide keeps WHY it is pending
  (casino-side reasons); the txid page owns VERIFYING WHERE IT IS
  (chain-side). Reciprocal links and a scope line on each, the
  established discipline.
- Scaled-content risk (stated per the amendment): low; no sibling
  template exists to swap a name into; the page has no precedent
  structure on the site.
- Links: from the pending guide (same-batch-modified carrier), to the
  crypto coin pages and relevant withdrawal sub-pages.
- Failure signal: no Bing impressions on txid/tracking queries within
  4-6 weeks of a confirmed Bing re-read; zero clicks at 8 weeks =
  the visit hypothesis failed (the citation side may still bank,
  which would be recorded as visibility, not traffic).
- One verify-or-omit note: the page states chain mechanics and
  explorer usage, no operator figures needed beyond what the
  catalogue already verifies; nothing new to verify.

**Existing-page work proposed alongside (no cap cost):**
- The Bing CTR pass from the 5 Sep strategy (pending guide title/meta
  answer-sharpening, KYC sub-page titles, cloudbet review title),
  shipped with honest lastmods and a batched dispatch. The KYC
  family's zero CTR at positions 4-5 is on single-digit impressions
  per query (n=4-22), too small to diagnose page-vs-title-vs-
  zero-click; the CTR pass IS the cheap diagnostic.
- The reviews de-templating batch ships when the owner Site Explorer
  glance lands; it should not ship incomplete (its gate exists for a
  reason and trust queries already click on reviews).

**Explicitly NOT proposed this month (notes, not retirements):**
- "bitstarz vs bitstarz payid" / the payid page: still blocked on the
  owner's logged-in deposit-page glance; assistant-phrased,
  citation-shaped as measured; and q4 demonstrated the giveaway
  dynamic on exactly this operator's deposit content. It remains a
  valid AUTHORITY candidate the moment the glance lands, judged on
  visibility grounds rather than traffic.
- A USDT-specific pending page: "usdt withdrawal pending casino" (51
  imp, 2 clicks) is already won by the pending guide at pos 5.6; a
  dedicated page is a cannibalisation risk against a working ranking
  (structural refusal trigger). The CTR pass serves this query
  instead.
- "crypto casinos in germany" (4 imp, pos 8): tested market, needs
  external corroboration first (standing rule).
- A tools programme beyond the one bounded experiment (absorbable
  outputs, one-person effort).
- Additional breadth artefacts on TRAFFIC grounds: the reopened
  breadth programme stands untouched and justifies itself on
  visibility and authority; this slate simply allocates traffic
  budget elsewhere. Not a deprioritisation.
- Racing toward 8 of 8: ceiling, not target, and velocity remains the
  diagnosed suppression variable.

**Sequencing:** one session ships page 1 plus the CTR pass together
(the carrier-link rule is satisfied by the same-batch pending-guide
edit). The reviews batch ships on its glance. A second new-page
session happens only if the next pull surfaces measured visit-shaped
demand that existing pages do not cover, or the payid glance lands.
Where the deferred dashboard pull would sharpen this (noted once):
whether cloudbet clicks or bitstarz intent is worth more per click
would change which titles the CTR pass optimises hardest.

## What would falsify the slate's premise

The premise is that existing-ranker optimisation beats new coverage
this month. Falsified if the CTR pass produces no click movement on
the pending family within 3-4 weeks of a confirmed Bing re-read WHILE
some unserved query family shows fresh impressions in the next pull;
that combination would say coverage, not click-through, is the gap,
and the October slate should flip accordingly.
