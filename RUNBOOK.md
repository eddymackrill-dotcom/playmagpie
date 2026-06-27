# PlayMagpie RUNBOOK

Operational playbook for running this site sustainably. Companion to CLAUDE.md (which defines strategy and rules); this file defines workflows and cadences.

Last updated: 2026-06-04

## How to use this file

Three sections:
1. Recurring prompts: copy-paste into Claude Code at the cadence noted
2. Post-batch checklist: what to do after every content push
3. Diagnostic prompts: fire when something specific looks off

Prompts in this file are tested templates. Adjust placeholders in [brackets] before pasting.

## Recurring prompts

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

Propose 3-5 candidates with HIGH/MED/LOW confidence per candidate. Wait for my approval before any build.

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

Produce as a structured report categorised by severity (urgent / important / cosmetic). Do NOT fix yet. Propose fixes, wait for my approval per category.

### Quarterly: pollution baseline re-evaluation (next: 2026-07-15)

Re-evaluate lib/pollution-baseline.md. Since the baseline was last set on 2026-05-26, there's now [N] weeks of additional mixed organic-plus-test traffic.

For each tested market (IE, NZ, AU, DE, NO):
1. Pull GSC data for the most recent 28-day window
2. Pull GSC data for a comparable 28-day window from before any pollution was likely
3. Calculate: single-query concentration ratio, average CTR per market, query diversity
4. Update discount factors in lib/pollution-baseline.md
5. Document the methodology in the file so future re-evaluations can replicate

Commit the updated baseline as a single commit with reasoning in the message.

## Post-batch checklist

Run after every content push. ~10 minutes.

- Vercel deploy went green (no failed build)
- Sitemap includes all new URLs (curl https://www.playmagpie.com/sitemap.xml | grep [new-slug])
- At least one spot-check rendered correctly on production (pick the most editorially complex page in the batch)
- Mobile spot-check on at least one page (single-column stack, CTAs tappable, no overflow)
- Manual indexing requests in GSC for any substantive new pages (use www host explicitly; apex returns "URL unknown")
- If any new page is in a low-crawl section (/bonus/*, /crypto/*, /game/* leaves), confirm ≥1 inbound contextual prose link from a same-batch-modified frequently-crawled page (per CLAUDE.md internal-linking rule)
- Grep for em dashes in content touched this batch: must be zero. Em dashes (the "—" character) are a primary AI-content tell and are banned in all user-facing content (per CLAUDE.md "Never use em dashes"). Run `grep -rc "—" app lib --include='*.tsx' --include='*.ts'` and confirm every file reports 0. If anything is non-zero, rewrite it (comma, full stop, colon, or parentheses, never a spaced hyphen) before deploy. The internal `lib/*.md` working notes are out of scope; only `.tsx`/`.ts` content files must be clean.
- Confirm every page approved this session was actually built: cross-check approved-vs-shipped before wrap. (Added 2026-06-27 after the /country/finland hub was approved earlier in a session but initially missed in the batch and only caught later. List what was approved, tick each against what shipped.)
- Follow-up audit list updated with any items deferred from this batch
- Strategic decisions log appended with any new precedents or rule changes
- Wind-down: update STATE.md. Move completed work out of "In flight", add any new in-flight items, refresh the current-state numbers, append dated entries to the decisions log (append-only), then commit STATE.md. (Standing instruction lives in CLAUDE.md "KEEP STATE.md CURRENT".)

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

Don't fix yet. Surface findings first.

### A page is ranking unexpectedly poorly (position 50+ on a query it should win)

Investigate why [URL] is at position [N] for query "[query]" when [reason it should rank higher].

1. Pull current GSC data: position history, impression trend, CTR on the query
2. Inspect the page: title tag, meta description, H1, structured data, word count, internal link count
3. Identify competing pages on the same query: search "[query]" via [appropriate Google domain], note top 5 results, characterise what they have that this page doesn't
4. Apply CLAUDE.md refusal rule: is this a page that genuinely warrants higher ranking, or is the catalogue too thin to compete on this query?
5. Propose either content strengthening, internal-link reinforcement, or honest acceptance that this query is out of reach

Surface findings before any fix.

### Catalogue data may be stale on a specific operator

Verify lib/casinos.ts entry for [casino] against current primary sources. Specifically check:
- Welcome bonus structure (amount, free spins, deposit count, max value)
- KYC posture and trigger thresholds
- Supported cryptocurrencies
- Withdrawal limits and processing time
- Restricted countries
- Licensing

For any field that can't be verified to primary source (casino's T&C / promotions page), flag and propose either updating or marking "Not documented." Don't update lib/casinos.ts directly. Surface the verification report first so I can sanity-check before approving the diff.

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
- gsc MCP intermittently connects but fails to register its tools at session start (handshake healthy, but tools absent from registry). Fix: fully exit Claude Code and relaunch, sometimes twice. Credentials/config are correct (service-account via GOOGLE_APPLICATION_CREDENTIALS to gsc-key.json); this is a startup race, not an auth problem. Don't re-diagnose as a credentials issue.

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
