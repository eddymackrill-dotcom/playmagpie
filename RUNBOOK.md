# PlayMagpie RUNBOOK

Operational playbook for running this site sustainably. Companion to CLAUDE.md (which defines strategy and rules); this file defines workflows and cadences.

Last updated: 2026-08-01

**AUTONOMY RULE, 2026-08-01, .com only. Read CLAUDE.md's autonomy and accuracy sections before using any prompt in this file.** Nothing in this playbook stops the session any more. Every "wait for my approval", "do not fix yet" and "surface findings first" has been removed from the prompts below; each removal is marked inline where it was. The only stops are the three emergency conditions: illegal, likely to get the site blocked or delisted immediately, or direct reader harm. Separately, accuracy corrections are no longer priority work here, so the audit and diagnostic prompts that used to hunt for drift now note and move on. Neither change touches verify-or-omit, which still governs everything written. **The UK repo is UKGC-facing and none of this applies there.**

## How to use this file

Three sections:
1. Recurring prompts: copy-paste into Claude Code at the cadence noted
2. Post-batch checklist: what to do after every content push
3. Diagnostic prompts: fire when something specific looks off

Prompts in this file are tested templates. Adjust placeholders in [brackets] before pasting.

## Recurring prompts

### RETIRED 2026-08-18: the daily Senate-report glance (report tabled 17 Aug, executed 18 Aug)

The report was tabled 17 August 2026 and the update shipped same-cycle on 18 August
(commit b4949cf): the Senate-report entry plus a separate news-sourced entry on the
government's own amendments. The first execution through the inverted gate PASSED the
positive visual confirmation (both sections visible in live served HTML before dispatch).
The daily inquiry-page glance is retired.

**RETIRED 2026-08-20: the Senate debate/vote watch.** The bill passed both houses
(House 18 Aug, Senate 19 Aug) and Entry 3 shipped same-cycle on 20 Aug (commit 7014b71),
written from the parliamentary record with the positive visibility check passed.
**Replacement, one line: royal assent = a one-line dated addendum to Entry 3 when it
lands, OWNER-TRIGGERED; the addendum also states the commencement dates from the Act as
made (deliberately omitted from Entry 3 because the as-passed text was unfetchable).**
The same positive visibility check applies to that addendum and any future fill here.

### Weekly WHILE SUPPRESSED: recovery check (replaces the full weekly, ~5 min)

In force while the June 2026 spam-update suppression stands (see STATE.md). Do NOT run the
full weekly situation report below while site-wide impressions are zero; there is nothing to
report on. Run this instead:

1. By-day site-wide impressions for the last 14 days (dataState=all). Record: which days are
   non-zero, and the current consecutive-non-zero-day streak.
2. Index spot-check via single-URL inspection on the 5 sentinels: /reviews/bitstarz/withdrawal
   (deindexed 06-26 window), /reviews/mirax-casino (absorbed its withdrawal sub-page 07-07),
   /fast-withdrawal-casinos (absorbed the withdrawals guide), /high-roller-casinos (flagship),
   /reviews/bitstarz/kyc (formerly carried FAQ rich results). Record any FAQ rich-result
   return: it is the earliest trust-restoration signal.
2b. DE-TEMPLATING CRAWL WATCH (temporary; drop each list when its window closes).
   Single-URL inspection last-crawled dates vs the baselines in STATE.md Next decided actions.
   Covers all three shipped batches, 25 URLs total:
   - Batch 1 (deployed 07 Aug), 10 /country/[slug] pages, 14-day window ends ~21 Aug.
   - Batch 2a (deployed 08 Aug), 7 /bonus pages, window ends ~22 Aug (baseline 2026-08-08:
     cashback 08-01, no-deposit 07-25, reload 07-19, welcome 07-03, vip 06-25, high-roller
     06-25, free-spins never crawled; a first-ever crawl of /bonus/free-spins = the
     welcome-bonus carrier link worked; log it when it appears).
   - Batch 2b (deployed 10 Aug), 5 /crypto + 3 /game pages, window ends ~24 Aug (baseline
     2026-08-10: all five crypto 07-09; dice 07-29, plinko 05-30, crash 05-28). /crypto/bnb
     is not on the watch (unchanged by design).
   - Regulatory ships (11 Aug), BING recrawl glance (owner Site Explorer look at the weekly
     WMT glance): /tracker/prediction-markets-legality, /tracker/us-sweepstakes-casinos-by-state,
     /country/australia/legal, /country/canada/legal. Drop each from this line once its first
     post-ship Bing crawl is observed.

   **STANDING TRIGGER, checked first every time: ANY Google crawl date >= 2026-08-07 on a
   changed URL -> execute 2c and 2d immediately from reports/batch2bcd-drafts.md. No
   redrafting, no new approval needed; the drafts are owner-approved as committed.**

   The two dated checkpoints:
   - **Checkpoint B, ~21 Aug (Google):** if Sweden/Netherlands/Australia show NO recrawl by
     then, STOP the de-templating programme and diagnose before touching the remaining URLs;
     the problem is upstream of page content.
   - **Checkpoint A, ~21 Aug (Bing/AI):** re-export and compare vs
     reports/bing-baseline-2026-08-07/. The crawl-date gate applies (a reading only counts
     against a page Bing has re-read). A clean pass opens the reviews batch under the
     match-phrase-invariant rule.
     **Regression floor RESET (2026-08-17): trailing-7-day basis, not the static 23.** The
     08-07 floor of 23 is three orders of magnitude stale against the current daily curve
     (regime change began 07 Aug; peak 283/day on 14 Aug), so "no drop below 23" can no
     longer detect a real regression on /country/australia/legal. At the checkpoint, compute
     each protected page's trailing-7-day citation level from the owner export and read
     regression against that, not against the 08-07 snapshot.
   - **Checkpoint A+B addition, BREADTH VERDICT (added 2026-08-17):** the two trackers and
     /country/canada/legal reach day 10 on 21 Aug, the age the withdrawal guide was when it
     started moving. They stand 0-for-3 in page stats at day 6 (17 Aug read). **Zero across
     all three at day 10 RETIRES the breadth programme and reweights the September slate
     toward the withdrawal/KYC process cluster**, where replication is compounding (guide
     102 to 168, now the #3 asset).
   - **CHECKPOINT-SESSION INPUTS, consolidated 2026-08-18 (confirm all five are in hand
     before running the 21 Aug session):** (1) the breadth verdict above (trackers +
     canada/legal at day 10); (2) Checkpoint A regression floors on the trailing-7-day
     basis, not the static 23; (3) a FRESH owner AI Performance pull, which also carries
     the SENATE-CATALYST NATURAL EXPERIMENT: does /country/australia/legal's daily
     citation rate (+146/day pre-catalyst) move after the 17-18 Aug report-and-amendments
     news cycle; (4) the owner WMT URL Submission glance: the legal page's row should
     flip 08-11 to 08-18, which closes the open ledger entry; (5) Senate debate/vote
     watch status (possible owner-triggered third entry; if it fired, its ship is its
     own session, not checkpoint work).
3. Optional, 1 DataForSEO call max: live SERP check on "high roller crypto casinos" (Canada).
   Present in top 100 = serving is returning.
4. Bing glance (added 2026-07-13, Bing Webmaster Tools live via GSC import): Search Performance
   for the playmagpie.com property. Record impressions and whether any are non-branded. Bing is
   not subject to the Google spam classification, so non-branded Bing impressions on the same
   content = evidence the suppression is Google-specific at serving. Owner-side glance
   (no API access); record the reading in the recovery-log `bing:` field.
   Serving CONFIRMED sustained 2026-07-25 (100 imp / 2 clicks over 15-22 Jul, daily flow);
   the public site: probe returns zero for this domain and is the DISCOUNTED signal (probe
   unreliability, same class as Google's apex inspections); the WMT glance is the arbiter.
   **Also glance the AI Performance tab (BETA; added to this check 2026-07-25):** record the
   citation count from Microsoft Copilots/Partners and the top grounding queries/pages if
   shown. Caveats: data collection began ~2026-07-13 regardless of the date-range selector;
   citations are grounding events, not visits; treat short windows as a level, not a trend.
   First reading: 50 citations for the first ~week (07-25 pull).
5. **UPDATE WATCH** (added 2026-07-16): check the Google Search Status Dashboard
   (status.search.google.com) for any announced ranking updates (spam updates especially,
   core updates also relevant). Any announced update is a potential re-evaluation event:
   during its rollout window, escalate from weekly to DAILY serving checks (GSC impressions
   on non-branded queries) until the rollout is confirmed complete, then log the outcome
   (recovered / partial / no change) in the recovery log as a dated entry. Context: there
   is NO known date for Google re-evaluating the suppression; algorithmic spam-action
   recovery follows the classifier re-running, most plausibly at the next spam update,
   which arrives on no published schedule (historically ~2 to ~8 months apart). This step
   is the tripwire.
5b. GA4 owner checklist (added 2026-08-18, retire each item once done and logged in STATE):
   (a) DONE 2026-08-20 (owner): affiliate_click marked as key event in GA4 Admin; Key
   events accumulate from 20 Aug, so channel-level conversion visibility starts then;
   (b) PARKED: the optional
   event-scoped custom dimension "operator" (Admin > Data display > Custom definitions);
   revisit when per-operator report breakdowns are actually needed; (c) the next GA4
   28-day pull now reads THREE legs and is a SEPTEMBER-SLATE INPUT: assistant-channel
   sessions (vs the flat-21 baseline), affiliate_click by page and channel, and the
   discounted owner test click of 18 Aug (logged in STATE) per the owner-browsing rule.
6. Production quick-check: latest deploy green, sitemap fetches, 2 random pages HTTP 200.
7. Append one line to the STATE.md "Recovery log" section (format documented there).
8. **Trigger: streak >= 7 consecutive non-zero days = recovery confirmed.** Lift the velocity
   freeze per the CLAUDE.md rule, resume the full weekly below, run the queued bitcoin-page
   go/no-go (signature-filtered) and the bi-weekly brand+intent cycle. Expect the bot
   fingerprints (lib/pollution-baseline.md) to reappear as serving resumes; that is
   confirmation, not a new attack.

### Weekly: situation report (every Monday morning, ~5 min)

Run a brief situation report for the past 7 days:

1. GSC indexing status: any new pages that successfully indexed, any pages stuck in Discovered/Unknown to Google, any indexing regressions
2. Top-performing queries: any new queries appearing in GSC, plus position changes on existing queries. Use compare_search_periods (or equivalent) against the prior 7-day window. First filter to queries with ≥5 impressions in the recent window, THEN apply the threshold, flagging any remaining query showing a position change of >5 in either direction (improvement or regression). The pre-filter matters: compare_search_periods returns a low-signal default set where most rows carry 0–3 impressions and a large ±position is just an appear/disappear artifact, not a real move. (Provenance: the prior-window comparison and the ≥5-impression pre-filter are both validation findings, from 2026-06-04 and 2026-06-05 respectively, kept inline so future sessions don't strip them as redundant.)
3. CTR anomalies: any pages with high impressions but 0% CTR (suggests pollution); any pages with unusually high CTR (suggests rich result win)
4. Production health: any Vercel deploy failures, any pages returning non-200, any sitemap discrepancies
5. Audit list status: any items now actionable, any that should be deprioritised

Use sc-domain:playmagpie.com via the gsc MCP. Apply pollution discount factors per lib/pollution-baseline.md. Exclude GBR per CLAUDE.md. Cache any DataForSEO calls.

Produce as a short structured report. Do NOT propose new content yet. Situation only.

### Bi-weekly: brand+intent extension review (every other Monday)

Run after at least 2 weeks since the last brand+intent batch. Don't run mid-batch.

Review whether the brand+intent sub-page pattern should be extended this batch:

1. For each existing brand+intent sub-page (Mirax/withdrawal, BitStarz/withdrawal, BitStarz/kyc, BC.Game/kyc, Cloudbet/kyc, Cloudbet/withdrawal, Cloudbet/payment-methods), pull current GSC position + impressions + clicks for its target query.
2. Categorise each: working as designed (sub-page outranking parent on target query), neutral (both ranking similarly), or unexpected (sub-page underperforming parent).
3. Identify candidate extensions: which casino+intent combinations would be highest-leverage to build next? Use:
   - GSC: main review pages stuck at position 30+ on intent queries with no dedicated sub-page
   - DataForSEO: volume corroboration for top 3-5 candidates (cache to lib/keyword-research.md per cost-control rules)
   - Pollution baseline: discount any tested-market signal
   - Refusal rules: don't pad. Only propose where the casino has a genuinely differentiated story for that intent

Pick the candidates worth building, record HIGH/MED/LOW confidence for each, build them within the velocity caps, and report the reasoning afterwards. ("Wait for my approval before any build" was removed 2026-08-01 by the autonomy rule in CLAUDE.md.)

### Monthly: structural audit (first Monday of each month)

This is the diagnostic-as-workflow pattern. Don't skip it; it surfaces problems content batches don't.

Run a structural audit of the site. Goal: find class-of-problem issues before they compound.

1. Indexing health across the site:
   - List all pages in app/sitemap.ts (or derived from routes)
   - Inspect each via GSC single-URL endpoint (NOT batch; single is authoritative per the 2026-06-04 free-spins finding)
   - Categorise: indexed, Discovered-not-indexed, Unknown to Google, excluded
   - Surface any starvation patterns (URL Unknown despite being live and in sitemap)
   - **Diff the current indexed-URL set against the saved baseline census** (lib/index-census-YYYY-MM-DD.md, first one 2026-06-09): confirm growing vs churning with actual membership comparison, not inference. Added (∈ now, ∉ baseline) = growth; Dropped (∈ baseline, ∉ now) = churn and each drop needs investigation. Save a fresh dated census each month so the diff chain continues. Note the Discovered-vs-Unknown distinction: "Discovered – not indexed" = crawl-queue lag (page has a valid inbound link, leave it); "URL unknown to Google" = genuine orphan (hub tile not seen because the hub wasn't re-crawled, so it needs a carrier link from a same-batch-modified page).

2. Internal-linking equity check:
   - For any page surfacing as starved in step 1, count inbound internal links via codebase grep
   - For each link, identify the linking page and whether it's been crawled recently
   - Apply the CLAUDE.md rule: every page should have ≥1 inbound contextual link from a frequently-crawled page

3. Catalogue freshness:
   - For each casino in lib/casinos.ts, sample 2-3 facts from each entry (bonus structure, KYC trigger thresholds, supported coins, licensing)
   - Spot-check against each casino's current public T&C / promotions page
   - Surface any drift between catalogue and live operator facts (per the 2026-05-30 catalogue-correction precedent)

4. Editorial drift check:
   - Sample 3 random pages across different clusters
   - Read for: banned phrases that slipped through, stale specific numbers in prose, broken internal links, schema validation issues

Produce as a structured report categorised by severity (urgent / important / cosmetic), fix what is worth fixing as you go, and report what you changed. ("Do NOT fix yet, propose fixes, wait for my approval per category" was removed 2026-08-01 by the autonomy rule.) Note the interaction with the accuracy rule in CLAUDE.md: **step 3, catalogue freshness, and step 4, editorial drift, are no longer correction-hunting exercises on this site.** Record what you notice in a line each and move on; only catastrophic claims (illegal, delisting-risk, direct reader harm) get fixed.

### Quarterly: pollution baseline re-evaluation (RETIRED 2026-07-07)

The 2026-07-15 re-evaluation was cancelled and folded into the 2026-07-07 rework of
lib/pollution-baseline.md. Its premise (freeze owner testing, then measure a clean window)
was falsified: the owner stopped all VPN testing on 2026-06-10 and the polluting traffic
continued unchanged, because it is external rank-tracker bot traffic (permanent, not
owner-controlled). The operating model is now **signature-based filtering**: see the
2026-07-07 section of lib/pollution-baseline.md for the bot-fingerprint inventory and the
scoring procedure. Maintenance is event-driven, not calendar-driven: when a new bot pattern
appears (daily cadence, desktop-heavy, zero-click, deep positions, keyword-list phrasing),
append it to the inventory with first-seen date and evidence. Do not re-derive geography
multipliers.

### Weekly: regulatory radar (run with the weekly check, ~45 min; added 2026-08-11, Option D launch)

1. Sweep, skim-level, for gambling-regulatory events worldwide: iGaming Business, SBC News,
   AGB (Asia), iGaming Today, Focus GN (Africa/LatAm), Yogonet (LatAm), plus regulator
   newsrooms on the active-story list (currently: APH/Australia, AGLC/AiGC, GRAI, ACMA, KSA,
   GGL, Spelinspektionen, DGOJ/Spain, SPA/Brazil, MeitY/India, PAGCOR, GCGRA, PlayCity,
   Sri Lanka COPF, and US state AG feeds for sweepstakes/prediction-market states), plus web
   searches on any story with a live tracker.
2. For each new event: one line in reports/regulatory-radar.md (append-only): date found,
   jurisdiction, event, source, trigger-test tags (own-position? dated-forward?
   English-sourceable?), proposed artefact (new page / tracker update / matrix row / radar
   only). Tags are recorded for the portfolio correlation analysis, not used to drop
   entries (breadth strategy, owner decision 2026-08-11).
3. Events matching an EXISTING artefact go to its update queue; ship same-session where the
   source is in hand (the ~30 min loop: dated log entry, verdict re-date, `modified` bump in
   lib/tracker-content.ts or the page's data layer, push, single-URL Bing dispatch line for
   the owner).
4. New-artefact candidates append to the build queue in
   reports/regulatory-programme-build-plan.md Part 4 (readiness-ranked).
5. STALENESS PASS (binding): single pages and timeline trackers whose newest dated element
   exceeds 60 days are updated that week or archived with a dated closing entry. Matrix rows
   over 90 days are re-verified or visibly downgraded to "unverified since [date]"; a matrix
   over 20% downgraded is archived. Never leave stale claims live.
6. MEASUREMENT (owner Bing AI Performance pull at the weekly glance): record citations per
   regulatory artefact in reports/regulatory-portfolio.md (7/30/60-day columns). Monthly:
   portfolio review: hit rate (15+ citations/30d = hit) and what correlates (format,
   jurisdiction size, event type, trigger tags).

Current dated tripwires (also in STATE.md): Gambling Reform Bill ROYAL ASSENT (bill
passed both houses 18-19 Aug, Entry 3 shipped 20 Aug; assent = one-line owner-triggered
addendum carrying the commencement dates from the Act as made); prediction-markets WA
stay ruling LANDED (stay denied; tracker update due, on the 21 Aug session list);
Canada/Alberta grey-market deadline 13 Oct 2026; Oklahoma sweepstakes ban effective
1 Nov 2026; NZ licensed-only deadline 1 Dec 2026.

## Post-batch checklist

Run after every content push. ~10 minutes.

- Vercel deploy went green (no failed build)
- Sitemap includes all new URLs (curl https://www.playmagpie.com/sitemap.xml | grep [new-slug])
- **Sitemap lastmod is per-page as of 2026-08-07 and must stay honest: a content change to a data-driven page bumps its `modified` field in the same commit** (guides: `lib/guides.ts`; countries: `lib/country-content.ts`; other routes fall back to the git-derived floor map `lib/route-lastmod.ts`, see its header). A NEW URL needs either a data-level date or a `lib/route-lastmod.ts` entry, or the build fails by design. Never revert any entry to `new Date()`: that is the sitewide-daily-modification signal removed on 2026-08-07.
- Bing URL submission for any new URL in this batch: see the dedicated section below. IndexNow was removed on 2026-07-28 (closed unsolved) and replaced by the Bing Webmaster API.
- At least one spot-check rendered correctly on production (pick the most editorially complex page in the batch)
- Mobile spot-check on at least one page (single-column stack, CTAs tappable, no overflow)
- Manual indexing requests in GSC for any substantive new pages (use www host explicitly; apex returns "URL unknown")
- If any new page is in a low-crawl section (/bonus/*, /crypto/*, /game/* leaves), confirm ≥1 inbound contextual prose link from a same-batch-modified frequently-crawled page (per CLAUDE.md internal-linking rule)
- **Affiliate-link rel hygiene (standing rule, 2026-08-18): every affiliate link MUST
  carry `rel="sponsored"`.** The affiliate_click tracker's delegated handler keys off
  that attribute (components/AffiliateClickTracker.tsx), so a CTA shipped without it
  still navigates fine but SILENTLY VANISHES from measurement, which is exactly the
  invisible-failure shape this repo guards against. Enforce at review on any page or
  component touching CTAs: new affiliate anchors go through CTAButton `external` (which
  sets the full rel) or carry `sponsored` explicitly.
- Grep for em dashes in content touched this batch: must be zero. Em dashes (the "—" character) are a primary AI-content tell and are banned in all user-facing content (per CLAUDE.md "Never use em dashes"). Run `grep -rc "—" app lib --include='*.tsx' --include='*.ts'` and confirm every file reports 0. If anything is non-zero, rewrite it (comma, full stop, colon, or parentheses, never a spaced hyphen) before deploy. The internal `lib/*.md` working notes are out of scope; only `.tsx`/`.ts` content files must be clean.
- Confirm every page planned this session was actually built: cross-check planned-vs-shipped before wrap. (Was "approved-vs-shipped"; there is no approval step as of 2026-08-01, but the cross-check is still worth running for the reason below.) (Added 2026-06-27 after the /country/finland hub was approved earlier in a session but initially missed in the batch and only caught later. List what was approved, tick each against what shipped.)
- **Never stage with `git add -A` or `git add .`** Stage explicit paths, or run `git status`
  and read the untracked list before staging. This repo continually accumulates untracked
  working files (scratch reports, review artefacts, skill config), so a blanket add sweeps
  whatever happens to be lying around into an unrelated commit. Caught on commit `a1907f8`,
  where a KYC compliance correction silently absorbed 8 unrelated untracked files. It was
  only noticed because the assistant checked its own commit afterwards, which is not a
  control you should have to rely on.
- Follow-up audit list updated with any items deferred from this batch
- Strategic decisions log appended with any new precedents or rule changes
- Wind-down: update STATE.md. Move completed work out of "In flight", add any new in-flight items, refresh the current-state numbers, append dated entries to the decisions log (append-only), then commit STATE.md. (Standing instruction lives in CLAUDE.md "KEEP STATE.md CURRENT".)

## Bing URL submission (replaced IndexNow 2026-07-28)

IndexNow was removed from the repo on 2026-07-28 and closed as unsolved, not fixed:
every submission returned `403 UserForbiddedToAccessSite`, a full key rotation changed
nothing, and the root cause was never established. The capability was obtained by another
route instead. Do not reinstate IndexNow or re-open that diagnosis; the thread has no
remaining value.

Submission now goes through the Bing Webmaster API, authorised by an account-level API key
from WMT Settings > API access. The same key covers both properties.

### How it runs (automatic)

`.github/workflows/submit-bing.yml` fires on every push to `master`. There is nothing to
run by hand on a normal publish. The job:

1. Builds the sitemap at HEAD and at the previous commit, and diffs the `<loc>` URL sets.
2. Submits only URLs present at HEAD and absent at the previous commit, so newly published
   pages and nothing else.
3. Prints quota before and after plus the decrement.
4. Exits non-zero on any submission error.

**Why it diffs URL sets and not lastmod:** there is no `public/sitemap.xml` in this repo and
never has been. The sitemap is generated at build time by `app/sitemap.ts`, where every
entry carries `lastModified: new Date()`, so all URLs share one build-timestamp lastmod and
every build changes all of them. A lastmod-based diff would return the whole sitemap on
every push. If per-page lastmod is ever made meaningful, revisit this.

**It cannot touch the deploy.** The workflow runs in GitHub Actions, entirely separate from
Vercel. There is no prebuild or postbuild hook in `package.json`, and none may be added: the
hook this replaced ran on every deploy and exited zero regardless of outcome, which is how
three days of rejected IndexNow submissions produced no signal at all.

### The hard cap

The job submits **at most 10 URLs**. Above that it submits **nothing**, prints the full list,
and fails. That is not a throttle, it is a tripwire: the .com is under a serving-layer
suppression after a scaled-content flag, so the failure mode worth engineering against is the
whole sitemap arriving at Bing in one burst. A cap breach means the diff saw something
unexpected, and a human should look before anything is sent.

If the list is genuinely correct and does exceed 10, submit deliberately in batches via
`workflow_dispatch`, not by raising the cap.

### Content corrections: use workflow_dispatch, this is not just an override

**The automatic diff covers publishes only. It will never resubmit a page whose content
changed, because the URL set did not change.** Corrections to existing pages are routine on
this site (verify-or-omit removals, catalogue drift fixes, answer-statement passes), and they
are exactly the case where fast propagation matters most: a page carrying a claim we have
since corrected should stop being served in its old form as soon as possible. So
`workflow_dispatch` is the **standard mechanism for corrections**, not a fallback.

**Add this to the post-batch checklist habit: if a batch corrected an existing page rather
than publishing a new one, dispatch it manually. Nothing else will.**

How to run it, for corrections or for anything else needing a hand-picked list:

- GitHub repo > **Actions** tab > **Submit new URLs to Bing** > **Run workflow**.
- Put space-separated URLs in the **urls** input. That bypasses the diff and submits exactly
  those. Leave it blank to run the normal sitemap diff.
- The 10-URL cap still applies. A correction sweep touching more than 10 pages goes in
  batches, deliberately, rather than by raising the cap.

Other uses of the same path: resubmitting a single URL, and submitting after a capped run.

The script is also callable directly for local testing, which is the same code path the
workflow uses:

```
export BING_WEBMASTER_KEY=<key>
node scripts/submit-bing.mjs https://www.playmagpie.com <pageUrl> [pageUrl...]
```

### Why this repo and the UK repo work differently

**What this repo does, and why**, which is the part verifiable from here: `app/sitemap.ts`
stamps `new Date()` on all 74 entries, so every URL carries the same build-timestamp lastmod
and the field holds no information. The workflow therefore has only one usable signal, the
URL set, and can detect published pages but **structurally cannot detect a content change to
an existing page**. That is why `workflow_dispatch` is the only correction route here. The
divergence from the UK repo is a consequence of this artefact, not a design preference.

**The UK repo's mechanism is documented in that repo's own RUNBOOK, which is the
authoritative account. It is deliberately not restated here.** A description of a sibling
repo maintained by hand in this file would go stale the moment that repo changed, silently,
which is precisely the failure mode these rules exist to prevent. Read it there. What matters
on this side is only that it differs, so no habit transfers between the two.

**The 03 August lastmod decision is therefore also a convergence decision.** If per-page dates
are adopted here, this repo gains a meaningful lastmod, corrections to existing pages become
detectable automatically, and `workflow_dispatch` stops being the only route for them. Weigh
that as part of the decision rather than treating it as a separate question.

**The cap difference, 10 here versus 6 on the UK, is deliberate and permanent.** It reflects
74 pages versus 10, and different velocity caps. Do not converge it.

### Where the secret lives

The key is a GitHub Actions repository secret named `BING_WEBMASTER_KEY`, at
**repo Settings > Secrets and variables > Actions**. It is never committed. For local runs
it goes in `.env.local`, which is gitignored via `.env*`.

**The `siteUrl` must match the registered WMT property host exactly**, or Microsoft returns
ErrorCode 14 NotAuthorized. **This repo's property is APEX, `https://playmagpie.com`**
(owner-verified 2026-07-28 by quota call), which is why the workflow's `SITE_URL` is the apex
form even though the site is www-canonical. The UK property is registered on a different host
from this one. Do not infer either from the other, and do not "correct" this value to www.
Both hosts are recorded in the STATE.md 2026-07-28 decisions entry.

**Status: SET, TESTED and now EXERCISED AT VOLUME on the .com (2026-07-28, upgraded
2026-08-01).** Two correction dispatch runs on 2026-08-01 submitted 9 and then 8 URLs, all
HTTP 200, zero failed, **with the quota decrementing by exactly 9 on the first run.** The
secret is also set on the UK repo; whether it has been exercised there is that repo's
business to record.

**The mixed host-form question is settled, on observed state change rather than inference.**
All nine URLs in that run were the **www** form while `SITE_URL` is the **apex** property,
and all nine were accepted and counted. The sitemap keeps emitting www, `SITE_URL` stays
apex, and no normalisation is needed. This supersedes the weaker 2026-07-28 grade, which
rested on a run exiting zero without the decrement being read.

**What this still does NOT prove, and the distinction is load-bearing: a decrement means
Bing accepted and counted the call, not that Bing acted on the URL.** See the verification
standard in the Rules below. The 2026-07-25 IndexNow failure is why this is written down.

It is protected twice over: GitHub masks secret values in Action logs, and
`scripts/submit-bing.mjs` passes all of its own output through a redactor that strips both
the raw and the percent-encoded form of the key, since the Bing API takes the key as a query
parameter and a network error message can carry the full request URL.

### Rules

- **Submit on publish only.** The workflow enforces this by construction: it submits the
  set difference, so only genuinely new URLs go. **No backfill, no bulk sitemap pushes, no
  resubmitting existing URLs.** This is the opposite of the old IndexNow posture, which
  pushed the entire 73-URL sitemap on every deploy; that posture is retired along with it.
- **Quota is per site**, allocated separately per property on the shared account key
  (verified 2026-07-28 on both playmagpie.com and playmagpie.co.uk). The script prints the
  quota before and after so the decrement is observable, and it is worth reading rather
  than skipping: the decrement is the only observed evidence that a call was counted.
  **The monthly allocation is NOT static.** Readings on the .com so far: 2026-07-28,
  daily 100 / monthly 400. 2026-08-01, daily 98 / **monthly 3098**, a roughly sevenfold
  rise in four days with the cause unestablished. An unverified hypothesis is that Bing
  scales monthly quota with site trust or index size. Do not plan against the higher
  figure as though it were permanent, and do not assert the cause. Re-read at each
  monthly audit so the series grows; two points cannot distinguish a trend from a one-off.
  **PLANNING NOTE (2026-08-17, three readings in): the monthly figure is noise. 400
  (07-28), 3098 (08-01), 1500 (08-17): no pattern, cause never established. Plan all
  submission work against the stable DAILY 100 only, and treat the monthly number as a
  reading to record, not a budget to spend.**
- **What counts as verified (standard set by owner 2026-07-28, carried over unchanged from
  the IndexNow rules): only URLs visibly appearing in WMT reporting count as verified.**
  An HTTP 200 is submitted-pending-confirmation and nothing more. This standard exists
  because the 07-25 session logged an IndexNow HTTP 202 as verified success when the spec
  meaning was "accepted, key validation pending", and validation subsequently failed. Do
  not record a submission as landed until the reporting shows it.
  **Reaffirmed 2026-08-01 against a much stronger-looking result: nine HTTP 200s with a
  matching quota decrement of nine is STILL submitted-pending-confirmation, not verified.**
  A decrement proves the call was accepted and counted. It says nothing about whether the
  URL was crawled or indexed. The rule is not relaxed by good evidence of the wrong thing.
  **Outstanding list RECONCILED AND CLOSED 2026-08-17** against the owner's WMT URL
  Submission export (reports/playmagpie.com_SubmittedUrls_8_17_2026.csv): 53 of 54
  distinct URLs dispatched since 2026-07-28 verified visible in WMT reporting; the one
  absentee is the apex-host test artifact from the 07-28 both-host-forms test, closed
  without action. Full diff in reports/bing-ledger-reconciliation-2026-08-17.md. The
  standard itself is unchanged: every dispatch after 2026-08-17 09:20 Pacific starts as
  submitted-pending-confirmation and closes only at the next export pull or WMT glance.
  (Superseded original line, kept for the record: "Currently outstanding under this
  standard: everything submitted since 2026-07-28", meaning the 07-28 guide submissions
  plus all 17 URLs from the two 08-01 dispatch runs.)

## Diagnostic prompts

Fire when a specific symptom appears.

### A page is stuck in "Discovered – not indexed"

Investigate why [URL] hasn't been crawled despite being live and in the sitemap. Specifically:

1. Run single-URL GSC inspection (not batch; single is authoritative). What's the coverage_state, last_crawled, referring_urls count?
2. Count inbound internal links via codebase grep
3. For each inbound link, identify the linking page and check whether it's been recently crawled
4. Compare against a control: a similar page from the same cluster that IS indexed
5. Check for technical suppression: canonical, robots meta, X-Robots-Tag, sitemap entry
6. Diagnose: most likely cause + proposed fix

Diagnose it, apply the fix you would defend, and report both. (Removed 2026-08-01: "Don't fix yet. Surface findings first.")

### A page is ranking unexpectedly poorly (position 50+ on a query it should win)

Investigate why [URL] is at position [N] for query "[query]" when [reason it should rank higher].

1. Pull current GSC data: position history, impression trend, CTR on the query
2. Inspect the page: title tag, meta description, H1, structured data, word count, internal link count
3. Identify competing pages on the same query: search "[query]" via [appropriate Google domain], note top 5 results, characterise what they have that this page doesn't
4. Apply CLAUDE.md refusal rule: is this a page that genuinely warrants higher ranking, or is the catalogue too thin to compete on this query?
5. Propose either content strengthening, internal-link reinforcement, or honest acceptance that this query is out of reach

Act on the diagnosis and report it. (Removed 2026-08-01: "Surface findings before any fix.")

### Catalogue data may be stale on a specific operator

Verify lib/casinos.ts entry for [casino] against current primary sources. Specifically check:
- Welcome bonus structure (amount, free spins, deposit count, max value)
- KYC posture and trigger thresholds
- Supported cryptocurrencies
- Withdrawal limits and processing time
- Restricted countries
- Licensing

For any field that can't be verified to primary source (casino's T&C / promotions page), mark it "Not documented" rather than carrying an unsourced figure, update `lib/casinos.ts` directly, and report the diff afterwards. ("Don't update lib/casinos.ts directly. Surface the verification report first" was removed 2026-08-01 by the autonomy rule.)

**Read this alongside the accuracy rule in CLAUDE.md before running this diagnostic at all.** Catalogue drift-hunting is no longer priority work on the .com, so this prompt is now fired on a specific operator for a specific reason, not as a routine sweep. What it must never do is put an unsourced number INTO the catalogue: verify-or-omit governs writing and is untouched by the autonomy rule.

### Site behaviour seems off but I'm not sure what

Run a focused investigation:

1. Last 7 days of Vercel deploys: any failures, any unexpected rebuild triggers
2. Last 7 days of GSC indexing changes: any pages dropped, any unexpected status changes
3. Production health: random sample of 5 pages, verify 200 response + correct render
4. Sitemap diff: is the live sitemap.xml structurally what we expect from the code?
5. Recent commits: anything that looks unintentional or that bypassed normal workflow

Produce a short report of anything unusual. If nothing's unusual, say so plainly.

## Useful reference

### GSC MCP gotchas
- Always use sc-domain:playmagpie.com for domain-level queries
- Always use https://www.playmagpie.com/... for URL-level inspections (apex is unreliable)
- Batch URL-inspection endpoint can give stale/inaccurate state; single-URL endpoint is authoritative
- "Discovered – not indexed" and "URL is unknown to Google" are different states with different fix patterns
- GSC's referring_urls field reflects what Google noticed during last crawl, not the real link graph. Use coverage_state + codebase grep for crawl-equity diagnostics, not referring_urls.
- Existing pages on actively-built trees still crawl on slow cadences (~3 weeks) if unchanged since their last crawl. Last-crawled date (single-URL inspection) is the diagnostic for whether a page will propagate new links in a reasonable window, not URL tree position. (2026-06-07: the 3 withdrawal pages given the free-spins link were last crawled 2026-05-18 and had not re-crawled 2 days after modification, so the link hadn't propagated yet.)
- gsc MCP intermittently connects but fails to register its tools at session start (handshake healthy, but tools absent from registry). Fix: fully exit Claude Code and relaunch, sometimes twice. This is a startup race, not an auth problem; don't re-diagnose as a credentials issue. Auth note (corrected 2026-07-07; the earlier claim of "service-account via GOOGLE_APPLICATION_CREDENTIALS to gsc-key.json" was wrong: that service account has access to zero GSC properties): the MCP actually authenticates via a cached user OAuth token at %LOCALAPPDATA%\mcp-gsc\mcp-gsc\token.json (scope webmasters). Workaround when the MCP won't register: a read-only scratchpad script using that same token against the Search Analytics / URL Inspection APIs (precedent: 2026-07-02 and 2026-07-07 sessions).

### DataForSEO cost-control reminder
- $0.05–0.10 per call
- Cache every result to lib/keyword-research.md before any new call
- 10 calls per session cap before asking for confirmation
- GSC first, DataForSEO second
- Don't run exploratory keyword sweeps; targeted validation only

### Content batch sizing
- Cap: 10 pages/session
- Realistic sustainable cadence: 3-5 pages every 1-2 weeks
- Mix clusters per batch (not 5 brand+intent pages in one batch)
- Always defer rather than pad; refusing to build is a feature, not a failure

### Internal-linking rule (2026-06-04)
Every new page in a low-crawl section (/bonus/*, /crypto/*, /game/* leaves) must ship with ≥1 inbound contextual prose link from a same-batch-modified, frequently-crawled page to guarantee timely discovery. Hub auto-tiles work for eventual discovery but depend on the hub being re-crawled, which can leave new pages stranded for weeks.

### Refusal rule reminder (full list in CLAUDE.md)
Refuse to build when:
- Demand can't be confirmed via GSC or DataForSEO
- <2 catalogue casinos genuinely fit the page's intent
- Cannibalisation risk against an existing page
- Query is in a tested VPN market without external corroboration
- The page's existence would require making editorial arguments the data doesn't support
