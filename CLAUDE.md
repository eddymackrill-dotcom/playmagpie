## SESSION START: DO THIS FIRST, EVERY TIME
Before responding to my first request, read STATE.md and RUNBOOK.md in full. Then give me a 3-line summary: (1) current state, (2) what's in flight, (3) the next decided action. Do this automatically. I should not have to ask.

## KEEP STATE.md CURRENT
When I indicate we're wrapping up, or after any deploy, update STATE.md (move completed items out of in-flight, add new in-flight items, update current-state numbers, append dated decisions to the append-only log), then commit it.

## VELOCITY FREEZE (in force since 2026-07-07, June 2026 spam-update recovery)

**No new .com pages.** No new URLs may be added to the site until serving recovery is confirmed. Recovery is confirmed when GSC shows **7 or more consecutive days of non-zero site-wide impressions** (dataState=all; the raw site-wide count, no filters). Claude Code refuses new-page requests during the freeze and cites this rule, including pages that would otherwise pass every demand gate.

**Permitted content work during the freeze:** (1) consolidation (merging pages into stronger parents with 301s, which reduces URL count); (2) strengthening existing pages (factual fixes, depth improvements, honesty passes); (3) the trust layer: /methodology (the one sanctioned new URL, shipped 2026-07-07), /about upgrades, and the last-reviewed-date convention. Nothing else ships.

**When recovery confirms:** the freeze lifts, but publishing restarts at reduced cadence (max 3 pages/week for the first 4 weeks) and every batch is preceded by the queued go/no-go reads. The freeze-lift event and date go in the STATE.md recovery log and decisions log.

---

# PlayMagpie: Working Guidelines for Claude Code

This file is for Claude Code to read at the start of every session. It captures what we've learned about building this site so each new session doesn't reinvent the wheel or repeat past mistakes.

## What this site is

PlayMagpie is an independent crypto casino review affiliate site. The thesis is that a small, focused, well-built site can outrank generic affiliate sites by being *more honest, more specific, and more useful* than the alternatives.

Target audience: crypto-native gamblers in Tier 1 English markets (Canada, Australia, New Zealand, Ireland) plus Germany, Netherlands, Nordics. **Not UK** (see footer disclaimer).

The brand voice is direct and editorial, not salesy. Phrases like "find your edge", "no paid placements", "we cut through the marketing spin" are on-brand. Phrases like "look no further than" or "welcome to the best" are off-brand.

---

## Long-tail content strategy

Read this section before any content recommendation or content work.

### The thesis

PlayMagpie has no domain authority and no backlinks. Competing for head terms like "best crypto casino" is a 12-18 month project requiring off-site link building, not just content. Until that authority exists, head-term rankings are not achievable.

**What we ARE pursuing:** the long tail, meaning narrow, intent-specific queries where domain authority matters less than content fit. Four clusters:

1. **Country long-tail**: every country × variant queries (e.g. "best crypto casino ireland", "no kyc crypto casino germany", "crypto gambling legal in norway")
2. **Brand+intent long-tail**: every reviewed casino × specific player questions (e.g. `/reviews/bitstarz/withdrawal`, `/reviews/cloudbet/kyc`)
3. **Intent+modifier long-tail**: specific player needs (e.g. "no kyc bitcoin casino", "instant withdrawal crypto casino", "highest withdrawal limit crypto casino")
4. **Question long-tail**: direct user questions (e.g. "is crypto gambling legal in [country]", "do I pay tax on bitcoin casino winnings in [country]")

**What we are NOT pursuing:**
- Head terms ("best crypto casino", "bitcoin gambling", "online casino")
- Generic comparison pages ("Casino X vs Casino Y" without specific intent)
- Content on coins/games/topics where we have no reviewed casino offering them
- Year-in-slug pages ("best crypto casino 2026")
- More than one page per query cluster (no cannibalisation)

### Success criteria

In 6 months, success means:
- Page 1 rankings for a portfolio of 30+ long-tail queries
- Affiliate conversions correlated with that ranking improvement

NOT measured: total clicks, total impressions, total page count, total queries.

### Long-tail opportunity map

This is the inventory of what we're targeting. Claude Code uses this map to decide what to build next without asking the user.

**Cluster 1: Country long-tail**

Current state: 9 country pages exist (verify against `lib/programmatic.ts`). Each is a single page targeting one head-ish query.

For each country, target the following sub-queries (page-per-query, NOT one mega-page):
- `/country/[country]/no-kyc`: "no kyc crypto casino [country]"
- `/country/[country]/fast-withdrawal`: "fast withdrawal crypto casino [country]"
- `/country/[country]/legal`: "is crypto gambling legal in [country]"
- `/country/[country]/tax`: "do I pay tax on crypto gambling winnings in [country]"
- `/country/[country]/no-deposit`: where this query has volume

Addressable: ~45 sub-pages + 9 hub pages = ~54 country-cluster pages.

Rules:
- Country-specific facts MUST come from the country's `countryContext` entry. No generic content.
- Tax/legal pages cite primary sources (statute names with section numbers) or do not exist.
- Sub-pages link UP to the country hub and ACROSS to relevant siblings.
- Country hub links DOWN to all its sub-pages.

**Cluster 2: Brand+intent long-tail**

Current state: 7 casino review pages exist (verify against `lib/casinos.ts`). One sub-page exists (`/reviews/mirax-casino/withdrawal`).

For each casino, target the following as sub-pages:
- `/reviews/[casino]/withdrawal`: "[casino] withdrawal time", "[casino] withdrawal limits"
- `/reviews/[casino]/kyc`: "[casino] kyc requirements", "[casino] verification"
- `/reviews/[casino]/bonus`: "[casino] bonus terms", "[casino] wagering requirements"
- `/reviews/[casino]/payment-methods`: "[casino] crypto", "[casino] payment options"

Addressable: 7 casinos × 4 sub-queries = 28 pages.

Rules:
- All facts from `lib/casinos.ts`. No fabrication.
- Each page targets ONE specific search intent. No omnibus pages.
- Each page links UP to the main review and ACROSS to the same sub-page on competing casinos.
- Word count: 600-900 words. Density over length.

**Cluster 3: Intent+modifier long-tail**

Current state: /no-kyc-casinos, /fast-withdrawal-casinos, /high-roller-casinos, /no-limit-withdrawal-casinos, /best-crypto-pokies-nz exist.

Expansion candidates:
- `/instant-withdrawal-crypto-casinos`
- `/no-deposit-crypto-casinos`
- `/crypto-casinos-with-free-spins`
- `/anonymous-crypto-casinos`
- `/highest-rtp-crypto-casinos`
- `/crypto-casinos-mobile`
- `/crypto-casinos-with-sportsbook`
- `/usdt-crypto-casinos`, `/btc-crypto-casinos`, `/eth-crypto-casinos`, `/solana-crypto-casinos`, `/[coin]-crypto-casinos` for any coin with meaningful casino support

Addressable: ~15-20 pages, depending on what `lib/casinos.ts` supports.

Rules:
- Page MUST have casinos from `lib/casinos.ts` that genuinely fit the modifier. No padding the list.
- If only 1-2 casinos genuinely fit, the page does not exist. Claude Code refuses to build it.
- Each page has a comparison table specific to the modifier (actual stated withdrawal times, not generic "fast").

**Cluster 4: Question long-tail**

Current state: Sparse. Some embedded FAQ content but no dedicated question pages.

Targets:
- `/guides/is-crypto-gambling-legal-in-[country]` (one per country, 9 pages)
- `/guides/do-i-pay-tax-on-crypto-casino-winnings-in-[country]` (one per country, 9 pages)
- `/guides/how-to-deposit-crypto-at-a-casino`
- `/guides/how-to-withdraw-from-crypto-casino`
- `/guides/what-is-kyc-at-crypto-casino`
- `/guides/what-is-provably-fair`
- `/guides/are-crypto-casinos-safe`
- `/guides/how-to-choose-crypto-casino`

Addressable: ~25 pages.

Rules:
- Each page targets ONE question, answers it in the first paragraph (for featured snippet eligibility), then expands.
- FAQPage schema required.
- Legal/tax pages cite primary sources or do not exist.
- "How to" pages include screenshots or specific worked examples.

### Production cadence

- Target: 5-10 new pages per week.
- Hard cap: 10 pages per session. Claude Code refuses to do more in a single batch.
- Distribute across clusters: do not do 10 country pages in one week then nothing for two weeks. Mix clusters per week.
- After 4 weeks of sustained publishing, pause for one week of "no new pages" to let signals settle before continuing.

### Data sources for content selection

The site has three SEO-research tools wired into Claude Code. Use them to ground content decisions in observed demand, not guesses:

- **Google Search Console MCP** (`gsc`): read-only access to the verified GSC property for playmagpie.com. Before proposing new pages, consult GSC to identify queries with existing impressions but no dedicated ranking page (recovery opportunities) and queries where an existing page is stuck at position 11-25 (improvement opportunities). Authenticated via Google Cloud service account, with the JSON key path living in `GOOGLE_APPLICATION_CREDENTIALS`. When querying GSC, use the domain property `sc-domain:playmagpie.com` (the domain property covers both hosts). **The live, indexed host is `www.playmagpie.com`. The apex (`playmagpie.com`) responds inconsistently (sometimes 200, sometimes connection timeout), and Google has never indexed any URL under the apex host. Treat the apex as unreliable; the operational rule is to always use the www host for URL inspections and any direct fetches.** When inspecting or filtering by a specific page URL, you MUST use the `https://www.playmagpie.com/...` form. Inspecting the apex form returns a misleading "URL is unknown to Google" for every page because Google has only ever indexed the www host. (Earlier guidance here wrongly claimed the site was on the apex; corrected 2026-06-02, see strategic decisions log.) **Exclude GBR by default** when running site-wide GSC analyses (filter `country!=gbr` or remove GBR rows in post-processing): Eddy is UK-based and his own browsing/testing inflates GBR impressions and CTR. Tested-location pollution rules below cover the targeted-VPN markets separately.
- **Keyword Research skill** (`keyword-research`, from aaron-he-zhu/seo-geo-claude-skills): invoke when scoping a new page or cluster to validate that the target query has measurable demand. Uses the 8-phase workflow (scope → discover → variations → classify → score → GEO-check → cluster → deliver) against whatever free-source signal you can gather: Google autocomplete, Trends, PAA boxes, Reddit/Quora threads. If none of these sources show signal for a proposed query, do not build the page.
- **claude-seo skill suite** (`claude-seo`, AgriciDaniel): 25 sub-skills covering technical audits, E-E-A-T checks, schema generation, programmatic SEO, and content quality gates. Use the relevant sub-skill (e.g. `seo-audit`, `seo-schema`, `seo-content`, `seo-programmatic`) when the task calls for it. Don't pull in the whole suite when one sub-skill suffices: the always-on token cost is ~5k per session and on-invoke costs stack.

**Hard rule:** a page does not get proposed unless at least one data source (GSC impressions, keyword-research signal (autocomplete / Trends / PAA), or competitor-page evidence from claude-seo) confirms the query has real demand. Invented patterns or "this seems like it would rank" intuitions don't count.

### GSC MCP gotchas

- **`referring_urls` is not the internal link graph** (learned 2026-06-04). GSC's URL-inspection `referring_urls` field reflects what Google happened to notice during its last crawl, not the real set of inbound internal links. `/no-limit-withdrawal-casinos` reports `referring_urls: []` despite having 15+ genuine inbound links in the codebase. For crawl-equity diagnostics (is this page link-starved?), use `coverage_state` + a codebase grep for the URL as the evidence base. **Never** treat `referring_urls` as a link count.
- **Single-URL inspection is authoritative; batch can be stale.** The `batch_url_inspection` endpoint has returned a different `coverage_state` for the same URL than `inspect_url_enhanced` did moments later. When the indexing state actually matters, trust the single-URL endpoint.
- **Use the www host for page-level inspection** (see the host-correction log entry): the apex returns a misleading "URL is unknown to Google".

### GSC pollution rules

Eddy manually tests rankings from VPN exit nodes in **Ireland, New Zealand, Australia, Germany and Norway**. GSC impressions from those geographies include his own searches and overstate real demand. Pollution discount factors per market are tracked in `lib/pollution-baseline.md`. Consult that file before scoring tested-location GSC data and re-evaluate at the date noted in the file.

Two pollution-aware rules override GSC-only scoring:

1. **Tightened country-pattern rule**: GSC-only evidence from queries that target tested locations (IE, NZ, AU, DE, NO) requires external corroboration (Google autocomplete, Trends, or PAA hits via the `keyword-research` skill) **regardless of impression volume**. Even a 700+ impression query in IE is not by itself sufficient signal, because the pollution discount can take effective demand below the threshold.
2. **Country sub-page refusal**: country sub-pages (e.g. `/country/ireland/legal`, `/country/germany/no-kyc`) whose only demand signal is GSC data from tested locations are refused until external corroboration confirms the sub-query has organic demand. Sub-queries that have never had a dedicated page can't be validated by GSC at all: GSC cannot observe demand it has never had an opportunity to surface.

Untested markets (Canada, Netherlands, Sweden, Japan, plus the rest of the world) remain scored against the original rules in the strategy section above.

### DataForSEO cost controls

DataForSEO MCP calls cost ~$0.05-0.10 each. Claude Code follows these rules without exception:

- **GSC first, DataForSEO second.** Always check GSC data before calling DataForSEO. Only call DataForSEO when the question genuinely cannot be answered from existing GSC signal (e.g. validating volume for queries not yet ranking).
- **Per-session call cap: 10.** If a content-selection or research session would need more than 10 DataForSEO calls, stop and ask the user before continuing. Surface the estimated cost.
- **Batch where possible.** Use DataForSEO's batch endpoints (e.g. multi-keyword volume requests) rather than firing one call per keyword. A 20-keyword batch is one call, not twenty.
- **Cache to `lib/keyword-research.md`.** Before any DataForSEO call, check whether the query is already cached. After any DataForSEO call, append the result to `lib/keyword-research.md` with the date. Never pay for the same query twice.
- **Cost preview for >5 calls.** Any session that would use more than 5 DataForSEO calls must surface estimated cost to the user before proceeding ("This research would use ~8 calls, estimated $0.40-0.80. Proceed?").
- **No exploratory research.** Refuse prompts like "tell me everything about this keyword universe" or "audit all potential pages." DataForSEO is for targeted validation, not discovery sweeps.

The cache file `lib/keyword-research.md` is a flat markdown table: append one row per query, keep the spend running total current. See the file for the column structure.

### Selection rule (what to build next)

When the user says "build content" without specifying, Claude Code:

1. Consults `lib/casinos.ts`, `lib/countries.ts`, and existing site routes.
2. Pulls demand signals from the data sources above:
   - GSC MCP for queries with existing impressions but no dedicated page (recovery opportunities) and pages stuck at positions 11-25 with addressable improvements
   - The `keyword-research` skill for autocomplete / Trends / PAA confirmation on candidate queries from the opportunity map
3. Identifies the next 5-10 pages from the opportunity map, filtered to only those with confirmed demand from step 2.
4. Priority order:
   - a. GSC-impressions-without-page recoveries (highest confidence, since Google already sees demand)
   - b. Pages that complete an existing cluster where the missing cluster member has keyword-research demand signal
   - c. Pages in clusters with proven performance, where keyword-research confirms the specific query has demand
   - d. Pages that fill obvious gaps in topical authority, only if keyword-research confirms demand
5. Proposes the batch with one-line rationale per page including which data source confirmed the demand (e.g. "GSC: 47 impressions, position 23" or "autocomplete + 3 PAA hits"), then waits for user confirmation before building.

**No demand confirmation → no page.** If a candidate from the opportunity map has zero GSC impressions AND no keyword-research signal, defer it.

### Refusal rules

Claude Code refuses to build a page when:
- The query target is genuinely covered by an existing page (cannibalisation risk)
- Required facts don't exist in `lib/casinos.ts` or `countryContext` and can't be verified from primary sources
- Fewer than 2 casinos in the catalogue genuinely fit the page's premise
- The user asks for a head-term page. Push back and propose long-tail alternatives instead
- The page targets a tested location (IE, NZ, AU, DE, NO) and the only demand signal is GSC data. External corroboration via `keyword-research` skill is required first (see GSC pollution rules above and `lib/pollution-baseline.md`)

**Refusal fires on STRUCTURAL problems, not thin demand (clarified 2026-06-08).** At this site's current data maturity, meaning a few weeks of pollution-influenced, sample-starved GSC signal, a *weak-but-positive* demand signal (e.g. a single GSC impression on an intent query, or a sub-floor DataForSEO volume that GSC nonetheless corroborates) is **build-and-measure, not grounds for refusal**. At this stage thin demand is indistinguishable from "not enough clean data yet," so refusing on it would discard genuine opportunities that only a live page can measure. Refusal is reserved for the *structural* problems in the list above: no genuine fit / fewer than 2 fits, cannibalisation against an existing page, facts that can't be verified to `lib/casinos.ts` or a primary source, editorial-integrity risk (the page would require arguments the data doesn't support), or a tested-location query without external corroboration. Volume thinness alone is not a structural problem. (The data-confirmation hard rule still holds: there must be *some* positive signal from GSC or keyword-research; the change is that the signal need not be *strong*, only present and non-pollution-artefactual.)

### Maintenance vs new pages

- New page creation is the default content work
- Existing page updates happen ONLY when:
  - `lib/casinos.ts` data has changed in a way that contradicts a published page's claims
  - A page is identified as factually outdated (e.g. regulator name, statute change)
  - A page has been live for 60+ days at position 11-25 and a clear improvement is identified
- Refreshing pages "for freshness" is forbidden. Every update must have a substantive justification recorded in the commit message.

---

## What's working (as of mid-May 2026)

The `/high-roller-casinos` page is ranking on page 1 of Google Canada for "high roller crypto casinos", a high-intent commercial keyword. This proves the quality approach works. The site is showing up for "bitstarz withdrawal times", "cloudbet withdrawal time", "mirax casino review", and "bitcoin casinos australia" in Search Console, at positions ranging from 14 to 40.

This means: **Google will rank programmatic pages on this site, but only if the quality stays high.** Template-detected pages get filtered. Genuinely differentiated pages get ranked.

## Core principle: write like a human who actually knows the niche

Every page should pass the test: *would a real crypto gambler reading this think "this person knows what they're talking about"?*

That doesn't mean "use casual language." It means:

* Use specific numbers, not vague claims. "Withdrawals process in 8-12 minutes on Bitcoin" beats "fast withdrawals."
* Acknowledge tradeoffs. Every casino has weaknesses; pretending otherwise destroys credibility.
* Reference real platform mechanics: KYC thresholds, wagering requirements, specific game providers, withdrawal limits per tier, etc.
* Avoid filler sentences that say nothing. "Cryptocurrency has revolutionised online gambling" is a sentence that contributes zero information.

## Generic phrases that signal AI/template content

If a page contains any of these, rewrite the sentence:

* "look no further than"
* "in the world of online gambling/crypto"
* "offers many advantages"
* "Cryptocurrency has revolutionised..."
* "Whether you're a seasoned player or a beginner..."
* "stands out from the competition"
* "the perfect choice for"
* "elevate your gaming experience"
* "delve into"
* "unparalleled"
* "tapestry of options"
* "ever-evolving landscape"
* "boasts an impressive"
* "premier destination"

This list isn't exhaustive, so use judgement. The test is: would a human writing about this topic actually use this phrase? If it sounds like the opening of a thousand other affiliate site reviews, it probably is.

## Never use em dashes

**NEVER use em dashes (—) in any user-facing content.** Use commas, full stops, colons, or parentheses instead. Em dashes are a primary AI-content tell and violate the human-content standard. This applies to page copy, FAQs, meta descriptions, and titles. Check for this in every content self-audit before deploy. (Note: the rule is about content. This instructions file itself is not user-facing, but it is kept em-dash-free too so it never re-seeds the habit. Do not swap an em dash for a spaced hyphen, which is still a tell. Rewrite the sentence: split it, or use a comma, colon, or parentheses.)

## Data points per page

Every programmatic page should include at least 3 specific, verifiable data points. Examples of what counts:

* Specific withdrawal times in minutes (8-12 min, not "fast")
* Actual wagering requirements (35x, 40x, etc.)
* Real bonus amounts in $ or % (100% up to $500, not "generous")
* Minimum deposit amounts ($20 minimum, not "low")
* Number of games (3,500+ slots, not "huge selection")
* Specific game providers (NetEnt, Pragmatic Play, Evolution)
* VIP tier thresholds (deposit $X for tier Y)
* Crypto withdrawal fees (0 BTC fee, 0.0001 ETH, etc.)

Don't invent numbers. If you don't have data, either get it from `lib/casinos.ts` or omit the claim entirely. Wrong data is worse than no data.

## On numerical data (and other verifiable facts)

When researching facts for new content (regulator names, tax rates, statute citations, exchange licensing status, dates a regulator came into force, gambling-tax percentages) use a research subagent to cross-check against primary sources before publishing. Note source URLs in a comment block at the top of the relevant data file so they can be spot-checked later.

This is what worked for the country page strengthening: verified facts (DIA licensing milestones, Section 613(2) TCA 1997, GGL operational date, kansspelbelasting rate progression) made the content rank. Invented facts would get the site penalised.

Rule of thumb for what to verify externally rather than trust from training data:
* Anything date-stamped within the past 18 months (new regulators, tax rate changes, exchange licensing)
* Statute citations and section numbers
* Operational status of foreign exchanges in specific jurisdictions
* Any "current" claim about a regulator or law that may have moved on since training cutoff

If a single fact can't be verified to a primary source, omit it. Don't bluff. Flagging "we don't have a verified figure to share" in copy is more credible than inventing one.

## Each page must be genuinely different

The failure mode of programmatic SEO is producing 50 pages where only the casino name changes. Google's Helpful Content algorithm explicitly targets this pattern.

For each page in a programmatic set, vary:

* **Opening sentence**: never the same template even with substitution
* **Structural order**: some pages lead with withdrawal speed, others with bonus structure, others with game selection
* **FAQ questions**: each page's FAQs should be substantively different, not the same questions with different names plugged in
* **Examples and use-cases**: a "withdrawal" page for a sportsbook-focused casino should discuss sportsbook withdrawal patterns; one for a slots-heavy casino should discuss slot bonus wagering before withdrawal

If two pages in a batch could swap their bodies and still make sense after a name find-and-replace, they're too templated. Rewrite them.

## Volume safeguards

When publishing at 5-10/week rate, Helpful Content System risk is elevated. Mitigations:
- No two pages in the same week may share more than 30% structural similarity
- Each batch should include pages from at least 2 different clusters
- Claude Code commits each page as a separate commit (so Google sees gradual signal, not bulk dumps)

## What we've learned about Google indexing

Search Console reports two failure states that look similar but mean different things, and the fixes are different:

* **"Crawled - currently not indexed"**: Google visited the page and chose not to index it. This is a content quality signal. The fix is to strengthen the content, then click "Validate Fix" in Search Console.
* **"Discovered - currently not indexed"**: Google knows the URL exists but hasn't crawled it yet. This is a crawl queue issue, not a quality issue. The fix is to submit via Request Indexing to push Google to visit the page.

Don't confuse the two. Strengthening the content of a "Discovered" page doesn't help, because Google hasn't seen it yet. Requesting indexing for a "Crawled - currently not indexed" page just makes Google re-reject it without changes.

**The canary case: /country/new-zealand.** Google crawled it and rejected it as "Crawled - currently not indexed." Comparing it to /country/canada (indexed and ranking) showed the difference was content depth: Canada had ~150 words of dense, country-specific intro content covering five elements (regulator, exchanges, tax treatment, currency friction, regional regulatory variation). NZ had ~80 words and skipped most of those. Strengthening NZ to Canada's depth was the fix.

**The pattern that works for "Crawled - currently not indexed":** bring the page up to ~150 words of locally-grounded content covering whatever the five-element analogue is for that page type. For country pages it's regulator + exchanges + tax + currency friction + regional variation. For other page types the elements differ but the principle is the same: specific, verifiable, locally relevant facts in volume.

**Each page must have a structurally different opening hook**, not the same template with names swapped. NZ leads on regulatory transition dates, Ireland leads on a tax statute, Germany leads on the licensing regime, Netherlands leads on the kansspelbelasting rate hike. Google's Helpful Content algorithm explicitly targets name-swap templating.

**General principle:** if a page sits in "Crawled - currently not indexed", that's Google telling you the content depth is below threshold. Don't argue with the signal. Strengthen the content.

## Self-audit before deploy

After generating any batch of pages, before running `git push`, do a quick pass:

1. Read the opening paragraph of 3 random pages from the batch. Are they recognisably different beyond the casino name?
2. Search the codebase for any banned phrases from the list above. If found, rewrite those sentences.
3. Check that data points are present and look plausible (no $1,000,000,000 welcome bonus typos)
4. Confirm the page has internal links to relevant other pages (reviews link to comparison pages, comparison pages link to crypto pages, etc.)

This isn't a checklist to mechanically complete; it's a quality gate. If something feels templated or thin, flag it and ask before deploying.

## Internal linking conventions

The ranking pages on this site benefit from internal links pointing to them. Specifically:

* `/high-roller-casinos` should be linked from every casino review page that's a credible high-roller option
* `/fast-withdrawal-casinos` should be linked from any page mentioning withdrawal speed
* `/no-kyc-casinos` should be linked from any page mentioning KYC or anonymity
* Country pages should link to each other within Tier 1 markets (Canada → Australia → NZ → Ireland)
* Crypto pages should link to relevant casino review pages that accept that crypto

When building new pages, add 3-5 contextual internal links to existing pages. Use natural anchor text: "the best high roller crypto casinos" beats "click here".

**Crawl-discovery rule (hard rule, 2026-06-04; mechanism clarified 2026-06-07):** every new page in a low-crawl section (`/bonus/*`, `/crypto/*`, `/game/*` leaves, and similar intent-page subdirectories) must ship with **≥1 inbound contextual prose link from a page that is itself being modified in the same batch**. The load-bearing property is the *modification*, not the host page's location: editing a page signals re-crawl intent to Google, though propagation timing varies, so verify via last-crawled date rather than assuming prompt re-crawl will follow. **Tree position is NOT a reliable proxy for crawl frequency**: an existing, *unchanged* page on an actively-built tree (e.g. the `/reviews/*` withdrawal sub-pages) drifts to a ~3-week re-crawl cadence regardless of how "active" the tree is. Before relying on a host page to propagate a link, check its **last-crawled date** via single-URL GSC inspection: that date is the diagnostic for whether it will carry the link within a reasonable window. A page last crawled weeks ago and *not* modified this batch will not propagate the link promptly. Hub auto-tiles (e.g. the `/bonus` hub mapping over `BONUS_TYPES`) and sitemap inclusion enable only *eventual* discovery, on Google's own schedule. Evidence: `/bonus/free-spins` sat "URL unknown to Google" for weeks despite being live, in the sitemap, and carrying a hub tile + one prose link, because none of its linking pages had been re-crawled since the links were added. The distinction that prompted this clarification: *new* pages on the `/reviews/*` tree crawl within a day (first crawl on publish), but *modified existing* pages on the same tree re-crawl far more slowly. The 3 withdrawal pages that received the free-spins link were last crawled 2026-05-18 and had still not re-crawled 2 days after their 2026-06-05 modification. So the rule is specifically: link from a same-batch-*modified* page, and verify the host's last-crawled date. Do not assume any `/reviews/*` URL is "frequently crawled".

## What not to do

* Don't publish more than ~10 new programmatic pages per day. Sudden bulk additions look like spam.
* Don't change page URLs of currently-ranking pages (`/high-roller-casinos` especially; leave it alone)
* Don't add boilerplate disclaimers that repeat across pages. One in the footer is enough.
* Don't generate FAQ schema with questions you didn't actually answer on the page; Google penalises this
* Don't claim a casino accepts a crypto it doesn't actually accept. Check `lib/casinos.ts` for the source of truth.

## Workflow

1. Read this file
2. Check `lib/casinos.ts` and `lib/programmatic.ts` for current data
3. Generate pages following the guidelines above
4. Self-audit per the section above
5. Run `git status` to confirm what's changing
6. Commit with a descriptive message ("Add withdrawal pages for BitStarz, Mirax, 7Bit")
7. `git push origin master` (Vercel auto-deploys)

Subagents inherit the hold-for-push rule: only the orchestrating session pushes, and only on explicit user approval (rule added 2026-06-11 after a subagent's unauthorised, harmless but out-of-process, push of commit 5f71a93).

## Social presence

* **X account:** [@MagpieGG](https://x.com/MagpieGG), linked from the footer
* Brand voice on X is identical to the site: direct, editorial, anti-shill. No emoji-heavy crypto-bro posting, no "GM frens", no hype-style affiliate spam.
* Posts can reference real on-site analysis (rankings, withdrawal data, country-specific regulatory notes) but should read like a person who knows the niche, not a content calendar.

## When in doubt

If a request would violate these guidelines, flag it rather than silently complying. If a generated page feels thin, say so. If you're guessing at data, say so. The honest answer is always more valuable than a polished but generic page.

The standard isn't "is this acceptable", it's "would this make a real crypto gambler trust the site more or less?"

## Strategic decisions log

Append decisions here when strategy changes. Do not edit; append.

- **2026-05-25**: Long-tail content strategy formalised. Four target clusters (country, brand+intent, intent+modifier, question). 5-10 pages/week cadence with 1-week pause every 4 weeks. Head terms explicitly not pursued until domain authority improves.
- **2026-05-26**: GSC pollution baseline captured at `lib/pollution-baseline.md`. Site had no GSC activity before 2026-05-12, so no clean pre-VPN baseline window exists; discount factors derived from single-query concentration + CTR analysis per market. Tightened country-pattern rule and country sub-page refusal rule added to the Refusal Rules section. **Re-evaluate `lib/pollution-baseline.md` on 2026-07-15**: by then there will be 8 weeks of mixed organic-plus-test traffic, allowing a cleaner pollution estimate and updated discount factors.
- **2026-05-30**: Refused to build `/game/poker` and dropped `poker` from `GAME_TYPES` in `lib/programmatic.ts`. Per CLAUDE.md <2-genuine-fits rule, no operator in the catalogue is a genuine top pick for poker: Evolution live poker is available at multiple operators but the table-game wagering-contribution profile (typically 5%-10%) makes welcome-bonus poker uneconomic for any bonus-using player; PvP poker is delegated to specialist rooms (CoinPoker, SwC Poker) outside our review scope. The dynamic `/game/[slug]` route 404s via its `notFound()` guard when the slug is absent from `GAME_TYPES`. Do NOT auto-rebuild `/game/poker` without external trigger, e.g. the catalogue gains a serious poker-focused operator, or GSC shows specific poker-query demand at an existing operator that we can credibly serve. The existing `gameContent['poker']` paragraph in `app/game/[slug]/page.tsx` is left in place as unreachable code for now; not worth removing because the entry is harmless and removing it creates risk if a code path I haven't seen references it.
- **2026-05-30**: **Strip-curation override rule formalised**. When selecting casinos for an above-the-fold CTA strip via `components/CasinoCTAStrip.tsx`, the default is strict top-N-by-trust-score over the page's eligible operator set. The override: when strict top-N includes an operator whose strength does NOT match the page's load-bearing editorial differentiator, swap in the next-best-trust operator whose strength DOES match, even if their trust score is marginally lower. The rule applies only when the substitution preserves the page's editorial spine; do not swap on aesthetic preference or to pad. Worked examples from this session, each substituting Cloudbet (8.7) for 7Bit (8.8): (1) `/high-roller-casinos`, where the page's load-bearing differentiator is no-withdrawal-limit cashout at scale, which Cloudbet's formal policy provides and 7Bit's no-KYC posture does not; (2) `/game/[slug]` for blackjack/roulette/live-dealer, where page content centres on Evolution VIP table coverage + high bet limits, which Cloudbet's Salon Privé up to €100k/hand provides and 7Bit's slot-focused no-KYC offering does not; (3) `/bonus/high-roller-bonus`, same logic as (1) applied at the bonus-page level. The pattern is "match the recommendation to what the page actually argues", not "follow the trust ranking blindly". Future strip rollouts: apply the same test. If a strict-trust top-N pick doesn't fit the page's load-bearing argument, swap to the next-best-trust pick that does.
- **2026-06-02**: **Host correction: site is on `www`, not the apex.** The data-sources GSC note previously claimed "the site is on apex domain, not www" and instructed that the URL-prefix property was empty for that reason. This was wrong and was actively breaking URL-inspection work. Corrected the note to specify that `www.playmagpie.com` is the live, indexed host and that all page-level URL inspections must use the `https://www.playmagpie.com/...` form. Evidence for the correction: (1) every row of GSC Search Analytics returns pages on `https://www.playmagpie.com/...`, never the apex; (2) URL-inspecting the apex form of all 7 then-pending pages returned "URL is unknown to Google / last crawled Never", while inspecting the identical paths on the www host returned real coverage states (5 "Submitted and indexed" with Breadcrumb+FAQ rich results, 2 "Discovered – currently not indexed"); (3) live `curl` of the apex (`https://playmagpie.com/`) was inconsistent: one attempt returned `200`, another timed out connecting on :443, whereas `https://www.playmagpie.com/` served `200` reliably. The likely root cause of a prior session's "GSC looks broken" situation report was inspecting the apex host and reading the universal "unknown to Google" as a site-wide indexing failure. Going forward: domain-property queries (`sc-domain:playmagpie.com`) are unaffected and cover both hosts; only page-scoped inspections/filters need the explicit www host.
- **2026-06-04**: **Brand+intent sub-page displacement pattern validated a third time.** The pattern, a dedicated `/reviews/[casino]/[intent]` sub-page out-ranking its own parent review on the specific intent query, now has three independent proof points across two intent types: (1) Mirax/withdrawal, (2) BitStarz/withdrawal (sub-page pos 4.8 vs parent pos 44 on "bitstarz withdrawal"), and (3) BitStarz/kyc (sub-page pos 18 vs parent pos 31 on "bitstarz kyc process", surfacing within ~1 day of indexing). Two distinct intents (withdrawal, KYC) now confirm the same mechanic, so this is a reliable structural play rather than a withdrawal-specific fluke. Continue extending it per the brand+intent cluster rules: build the dedicated sub-page where the main review is stuck at pos 30+ on an intent query with confirmed demand, and expect the sub-page to displace the parent on that query once indexed.
- **2026-06-08**: **Refusal rules clarified to fire on structural problems, not thin demand signal.** At low data maturity (few weeks of pollution-influenced, sample-starved GSC), weak-but-positive demand is build-and-measure, not refuse: thin demand is indistinguishable from "not enough clean data yet," so refusing on volume thinness alone discards genuine opportunities that only a live page can measure. Refusal stays reserved for structural problems (no/<2 genuine fits, cannibalisation, facts unverifiable to primary source, editorial-integrity risk, tested-location-without-corroboration). **Worked example:** `/reviews/duelbits/withdrawal` was built this batch on a *single* GSC impression for "duelbits withdrawal time" (already pos 10 on the main review) plus a cached DataForSEO 10/mo. Under the old reading the 1-impression signal might have read as "too thin"; under the clarified rule it's a valid build-and-measure candidate because the signal is positive, non-pollution (DOGE/Duelbits queries aren't tested-market), the casino has a genuinely differentiated story (instant-to-5-min payouts, the fastest in the catalogue), and there's no structural problem. If it underperforms after measurement, that's data; refusing pre-emptively would have been guessing.
- **2026-06-24**: **Japan unblocked for commercial pages (owner decision; supersedes the 2026-06-19 Japan drop).** Japan is eligible for commercial pages. Requirements retained: (1) a brief disclaimer at the FOOT of any Japan page (not prominent): "Online gambling in Japan is legally restricted and some casinos may not accept Japanese customers. Proceed at own risk."; (2) a build-time compliance check that a casino's affiliate terms permit Japan before featuring it (not user-facing). This reverses the earlier "adverse law breaks commercial fit" posture for Japan only; the verify-or-omit rule on legal/tax facts still applies to every Japan page.

## Follow-up audit list

Items flagged across sessions that warrant investigation but weren't fixed at the time they were noticed. Append; don't delete after fixing. Mark as `[resolved YYYY-MM-DD]` instead so the history of what was once broken stays readable.

- **`/no-kyc-casinos` ranking anomaly** (flagged 2026-05-26) `[resolved 2026-06-24]`: resolved by the 2026-06-24 weekly report. The page is no longer stranded at pos 83 / 7 imp; over the 2026-06-17→23 window it drew 619 impressions at pos 38.4, indexed (PASS, canonical clean, Breadcrumbs rich result PASS, last crawled 2026-06-06). The "is the page itself the bottleneck" question is answered: it is not — the page ranks and pulls impressions, just at page-4 depth with 0 clicks so far (and the impression magnitude is partly AU-exit rank-checking pollution, see the 06-24 report). No canonical/link/duplicate misconfiguration found. Original entry follows. The page sits at GSC position 83.4 over the recent window with only 7 impressions, far below where a hub page in a high-search category should be. Possible causes: canonical tag misconfiguration, broken internal link path, duplicate content interfering with the canonical, or thin content relative to the query competition. Investigate before treating no-KYC as a non-performing category: the page itself may be the bottleneck, not the demand.
- **`/crypto/*` template audit** (flagged 2026-05-26): the BNB reposition split `/crypto/bnb` into informational-only + spun off `/bnb-crypto-casinos` as a dedicated commercial listicle. The other seven coin pages (`/crypto/bitcoin`, `/crypto/ethereum`, `/crypto/usdt`, `/crypto/usdc`, `/crypto/litecoin`, `/crypto/dogecoin`, `/crypto/solana`) still run the mixed informational-plus-casino-cards template. Open strategic question: do they each need a parallel commercial listicle split (`/usdt-crypto-casinos` etc.) based on GSC demand and intent-mismatch evidence, or is BNB an exception because it had unusually high commercial-query volume against an informational-template page? Don't auto-replicate the split; re-evaluate per coin with GSC + keyword-research signal.
- **Country-page restriction filter scope** (flagged 2026-05-28): the `casinoAcceptsCountry()` helper added in commit `1f90979` deliberately matches only full country names in `restrictedCountries`. Today that means **only Roobet is filtered out** of `/country/australia`, `/country/germany`, `/country/netherlands`, `/country/sweden`: existing casinos still render on country pages they technically restrict because their `restrictedCountries` uses ISO codes (`'AU'`, `'NL'`, `'FR'`) that the token map deliberately omits. Enabling site-wide enforcement would empty `/country/australia` and `/country/netherlands` of effectively all 7 existing casinos. The decision required: (a) keep current Roobet-only behaviour with the existing "verify acceptance before depositing" warning for everyone else, or (b) enforce site-wide and either delete or repurpose `/country/australia` and `/country/netherlands`, since they'd no longer have ranked casinos to display. Tied to a broader question: should restricted-market country pages exist at all if the catalogue can't legitimately serve them?
- **`/bnb-crypto-casinos` outbound-link rel standardisation** (flagged 2026-05-28): the raw `<a>` at `app/bnb-crypto-casinos/page.tsx:186-188` uses `rel="noopener noreferrer sponsored"`, technically compliant with Google's current guidance (which accepts `sponsored` alone for affiliate links) but inconsistent with every other affiliate link on the site, which flows through `components/CTAButton.tsx` with `rel="noopener noreferrer nofollow sponsored"`. Standardise eventually: either route the BNB page through `CTAButton` or update the raw tag to match. Low priority; pure consistency, no SEO impact.
- **`/best-crypto-pokies-nz` count mismatch** (flagged 2026-05-30): the cascade fixes updated the "seven casinos in our reviews" framing to "eight" on line 266 (Roobet added to the catalogue earlier in this session). However the page's casino-summary grid still curates 7 casinos (Roobet not present). Slight count inconsistency between the prose claim ("eight") and the visible grid (7). Resolves when the Roobet-on-pokies-NZ curation decision is made, deliberately not made in this cascade batch because the page is currently ranking on Google Canada and curation changes warrant a focused editorial decision rather than a side effect of a number-correction commit. When the Roobet curation decision is made, either: (a) add Roobet to the page's curated grid and the count stays at 8; or (b) decide Roobet doesn't fit this page's editorial frame and revert line 266 to "seven" (which is wrong as a catalogue count but right as a page-internal count). The honest framing line on /best-crypto-pokies-nz needs to match what the grid actually shows.
- **Per-country strip differentiation** (flagged 2026-05-30): the CTA strip on the 9 country pages currently resolves to BitStarz / BC.Game / 7Bit across every country, because the restricted-territory filter is full-name-only (catches Roobet only) and those three are the trust-top-3 globally. Accurate but visually monotonous: the same three operators appear in every country strip. Decision required: (a) leave as-is (the strip is "best casinos for X country" and the answer genuinely is the same trust-top-3 across all in-scope markets); or (b) build per-country curated strip configs that surface country-specific facets in the card facts (NZD on-ramp framing for NZ, § 23 EStG tax-implication framing for DE, etc.) without changing the casino picks; or (c) curate different casinos per country based on country-specific facet relevance (e.g. surface Mirax on /country/ireland for the no-admin-fee bonus structure relevant to IE tax-neutral play). Option (b) is the cleanest first step (same operators, country-tailored facts) and the existing component supports per-card facts already, so the change is data-only at the page level. Tied to the broader open question of whether country pages should differentiate at all beyond the country-context prose.
- **Promote `gameCount` to a typed `Casino` field** (flagged 2026-05-30): the CTA strips on `/best-crypto-pokies-nz`, `/game/slots` and a handful of other pages currently hardcode each casino's game-library size ("3,000+ titles" for BitStarz, "10,000+ titles" for BC.Game, "7,000+ titles" for 7Bit) pulled from each casino's `reviewSummary` prose. Library size is not a typed field in `lib/casinos.ts`, so updates to the catalogue's underlying figures will drift the strip values. Soft tech-debt: works fine today but creates a manual-sync maintenance cost. To resolve cleanly: add `gameCount: string` (string because the values are "3,000+" style approximations rather than exact integers) to the `Casino` type in `lib/casinos.ts`, populate it for each operator from the verified-against-catalogue reviewSummary text, then update the strip configurations to read `casino.gameCount` instead of hardcoded values. Single-commit refactor. Not urgent; flag at the next catalogue-data update.
- **Apex domain behaviour** (flagged 2026-06-02) `[resolved 2026-06-11]`: re-tested during the 2026-06-11 structural audit. 4/4 fetches of `https://playmagpie.com/` returned a clean 308 → `https://www.playmagpie.com/` (0.14–1.0s). The intermittent 200/timeout pattern did not reproduce; either the Vercel config was fixed in the interim or the original flake was transient. Caveat: tested from a single network in one session, so a recurrence can't be fully excluded. If the flake is ever observed again, reopen this item rather than re-flagging from scratch. Original entry follows. Does `playmagpie.com` (the apex) have a configured redirect to `www.playmagpie.com`, or is the apex meant to serve at all? Observed an intermittent `200`-then-connection-timeout pattern when fetching the apex directly, which suggests either a flaky apex→www redirect or an unconfigured apex host. Check the Vercel domain settings for this project. Not urgent (Google has only ever indexed the www host so organic ranking is unaffected) but a flaky apex could cause edge-case issues for search-engine crawlers that hit the apex, or for anyone landing on a shared apex link. Resolve by confirming the intended apex behaviour and making it deterministic (ideally a clean 308 apex→www redirect).
- **`/reviews/bitstarz/bonus` deferral** (flagged 2026-06-02): during the KYC-cluster batch, DataForSEO showed "bitstarz bonus" at 10/mo (Canada, LOW comp) with a measured CPC of **$7.14** and an April-2026 spike to 40/mo, i.e. real commercial value. It was NOT built because there is currently **zero GSC demand signal** for the query (no bonus-intent query surfaced on `/reviews/bitstarz` over the 28-day window) and the `/reviews/[slug]/bonus` route does not exist. Per the refusal rules, DataForSEO volume alone without GSC corroboration doesn't clear the bar. **Revisit ~2026-06-30**: by then the three new KYC sub-pages (BitStarz/BC.Game/Cloudbet) should have influenced site indexing and crawl depth on the `/reviews/*` tree, so re-check GSC for whether bonus-intent queries (`bitstarz bonus`, `bitstarz wagering requirements`, `bitstarz welcome bonus`) have begun surfacing on the main review. If GSC then shows the intent can rank, the bonus sub-page clears the bar; if still nothing, defer again. (Note on provenance: the original session directive cited a $19.46 CPC for this term; that figure did not match the DataForSEO response, which returned $7.14; the $7.14 is the value cached in `lib/keyword-research.md` and used here.)
- **Thin-hub quality risk: `/crypto` dropped from index** (flagged 2026-06-09): the 2026-06-09 live index census found `/crypto` in **"Crawled – currently not indexed"** (last crawled 2026-05-26). Google fetched the hub and declined to index it, and it had previously shown a live impression (pos 65), so this looks like a quality-assessment **drop**, not a never-indexed page. `/crypto` is a thin navigational hub (auto-generated coin tiles, little original content). The concern is that `/game` and `/bonus` are the **same category** (auto-tile nav hubs) and could follow. Not fixing now. Action when it generalises: if the next monthly census shows `/game` and/or `/bonus` joining `/crypto` in "Crawled – not indexed," assess whether the hub pages need genuine original content (editorial framing, comparison context) beyond the auto-generated tile grid, rather than leaving them as pure link directories. Watch via the monthly census diff (see `lib/index-census-2026-06-09.md`).
- **`/crypto/dogecoin` future-batch candidate** (flagged 2026-06-04): in the 2026-06-04 weekly situation report (7-day window, GBR excluded), `/crypto/dogecoin` was the **highest-impression untested-market page on the site, 524 impressions at position 45.6**. That's real, pollution-clean demand (the dogecoin query mix is global/DE/ES, not a tested VPN market) currently buried on page 5. NOT for action now; logged for a future brand+intent or crypto-coin extension batch. The page runs the mixed informational-plus-cards template, and its volume + commercial-intent profile mirrors the BNB case that justified the `/bnb-crypto-casinos` commercial split (see the `/crypto/*` template audit item above). When picked up: validate per the standard selection rule (GSC + keyword-research; ≥2 genuine-fit casinos is satisfied, since DOGE is accepted by 8+ catalogue operators) and decide between strengthening `/crypto/dogecoin` in place vs spinning off a dedicated `/dogecoin-crypto-casinos` commercial listicle.
- **BNB Beacon Chain warning may be factually stale** (flagged 2026-06-19): both `/crypto/bnb` (`intros.BNB` in `app/crypto/[slug]/page.tsx`) and `/bnb-crypto-casinos` (intro prose + the "Can I withdraw BNB back to my Binance account?" FAQ) warn players to "send on BNB Smart Chain (BEP-20), not BNB Beacon Chain." BNB Beacon Chain was being sunset/decommissioned around 2024. If it is now fully retired, the "not Beacon Chain" framing is moot (you can't send there at all) and should be simplified to a plain BEP-20 confirmation. This meets the "factually outdated" maintenance-update bar, but per the rule against asserting recent date-stamped facts from memory it must be **verified against a primary source** (Binance/BNB Chain docs) before any edit. Deferred from the 2026-06-19 BNB internal-link batch (Option 2). **Action at the next monthly structural audit (first Monday of July)** as part of the catalogue/editorial-drift pass.
- **Doubled `| PlayMagpie` title suffix on payment-methods sub-pages** (flagged 2026-06-22) `[resolved 2026-06-22]`: fixed globally same day. Root cause was confirmed exactly as suspected (layout `title.template` appends the brand AND 13 files hand-rolled it). Fix: stripped the hand-rolled suffix from all 13 title files so the template is the single source of truth; `guides/[slug]` dropped its `| PlayMagpie Guides` qualifier for one consistent suffix. Verified live (single suffix on the previously-doubled Cloudbet + BitStarz pages). Original entry follows. live title tags on `/reviews/[slug]/payment-methods` render as `... | PlayMagpie | PlayMagpie`, because the per-page META `title` strings already end in `| PlayMagpie` AND the root layout's `title.template` appends the brand again. Confirmed pre-existing and site-pattern, not introduced this batch: the ranking Cloudbet page (`/reviews/cloudbet/payment-methods`, pos 16.8) carries the identical double-suffix and ranks fine, so impact is cosmetic, not load-bearing. NOT fixed unilaterally because the clean fix (strip `| PlayMagpie` from the META strings so only the template adds it) touches the currently-ranking Cloudbet title and should be done as one deliberate site-wide title-template pass, not a side effect of a single-page batch. **Action:** audit which pages hand-roll the brand suffix in their META vs rely on the template, then normalise globally. Low priority; pure title hygiene, no demonstrated ranking impact.
- **BitStarz 25% bonus-withdrawal admin fee: URGENT re-verification** (flagged 2026-07-16 staleness audit): the claim could not be verified against the primary (bitstarz.com region-blocks fetchers) and found ZERO corroboration across five current dated secondaries (several state "no withdrawal fees" outright). No source positively contradicts it, but it now rests solely on the May 2026 owner verification, and it is load-bearing on 4 surfaces: the transparency-report headline finding, the BitStarz review cons, the bonuses-guide worked example, and the 13-July answer statement on /reviews/bitstarz (commit c52bbc1). Owner must re-pull the BitStarz bonus T&C from a non-UK exit. If it fails re-verification, verify-or-omit takes all four placements down; if it verifies, note the T&C clause reference in lib/casinos.ts so this never re-opens.
- **Secondary-confirmed catalogue drift held back from the 2026-07-16 correction batch** (flagged 2026-07-16; apply only after primary verification per verify-or-omit): (a) **BC.Game no-KYC absolutism**: "no documents at any withdrawal size" contradicted by casinosblockchain.io (2026-04-23) + worldpokerdeals (2025-12-10): risk-based KYC, unverified accounts capped €10,000/month (ToS §8.6), €5,000/month on the "big winner" clause; BC.Game's own blog hosts a "KYC Verification Required" article (fetch 403'd). Touches /no-kyc-casinos, the KYC guide grid, bc-game/kyc, lib/casinos.ts. (b) **7Bit no-KYC absolutism**: "no KYC at any amount since 2014" contradicted by four 2026 secondaries (threshold-based, ~$2,000 reported trigger). (c) **Duelbits bonus restructure**: "$30 weekly cashback" absent from all 2026 sources; current offer $100 free bets + 500 free spins + Ace's Lounge 5-12.5% rakeback (thespike 2026-06-30, cryptocashspin 2026-07-13). (d) **Coin-count drift**: BitStarz 6 -> ~12 direct (sources conflict, cashier check needed), Mirax 7 -> 10 (+BNB/TRX/ADA, 3 sources agree), Shuffle 12 -> ~20 (+DAI/AVAX/TON + memecoins, plus card/Apple Pay on-ramp), Duelbits 12 -> 13 (BCH + MATIC dropped, DAI + SHIB added). (e) Minor unverifiables: 7Bit min deposit ($10 stored vs $20 bonus-qualifying), Duelbits min deposit (varies by coin per completesports 2026-06-29), Roobet weekend-processing clause (help centre "instantly" language mildly cuts against it), possible BC.Game free-spins bonus variant (affiliate-code evidence only), Duelbits KYC posture (thespike claims a 5-level KYC ladder; conflicts with the no-KYC majority read).
- **`/reviews/duelbits/withdrawal` ranks below its own parent (displacement inversion)** (flagged 2026-06-22, bi-weekly brand+intent review): on the target query "duelbits casino withdrawal time" the **parent `/reviews/duelbits` outranks the sub-page**: parent pos 39.0 (8 imp) vs sub-page pos 47.2 (11 imp) over the 28-day window to 2026-06-22. This inverts the brand+intent displacement pattern that holds cleanly on all 7 original sub-pages (sub-page leads parent in every case). The sub-page's only strong position (3.8) is an irrelevant junk match on `"kyc request" "active network"`, not the intent query. Built 2026-06-08 on a single-impression build-and-measure signal (see 2026-06-08 strategic-decisions entry). Candidate causes to check: canonical pointing sub-page→parent or parent→sub-page, internal-link starvation of the sub-page vs the parent, title/H1 intent mismatch, or simply that Duelbits withdrawal demand is too thin (8-11 imp) for Google to have settled the two pages yet. **Action:** run the "ranking unexpectedly poorly" diagnostic (RUNBOOK) on the sub-page next batch and surface findings before any fix. Not a new-build item; remediation only.