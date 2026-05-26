# PlayMagpie — Working Guidelines for Claude Code

This file is for Claude Code to read at the start of every session. It captures what we've learned about building this site so each new session doesn't reinvent the wheel or repeat past mistakes.

## What this site is

PlayMagpie is an independent crypto casino review affiliate site. The thesis is that a small, focused, well-built site can outrank generic affiliate sites by being *more honest, more specific, and more useful* than the alternatives.

Target audience: crypto-native gamblers in Tier 1 English markets (Canada, Australia, New Zealand, Ireland) plus Germany, Netherlands, Nordics. **Not UK** — see footer disclaimer.

The brand voice is direct and editorial, not salesy. Phrases like "find your edge", "no paid placements", "we cut through the marketing spin" are on-brand. Phrases like "look no further than" or "welcome to the best" are off-brand.

---

## Long-tail content strategy

Read this section before any content recommendation or content work.

### The thesis

PlayMagpie has no domain authority and no backlinks. Competing for head terms like "best crypto casino" is a 12-18 month project requiring off-site link building, not just content. Until that authority exists, head-term rankings are not achievable.

**What we ARE pursuing:** the long tail — narrow, intent-specific queries where domain authority matters less than content fit. Four clusters:

1. **Country long-tail** — every country × variant queries (e.g. "best crypto casino ireland", "no kyc crypto casino germany", "crypto gambling legal in norway")
2. **Brand+intent long-tail** — every reviewed casino × specific player questions (e.g. `/reviews/bitstarz/withdrawal`, `/reviews/cloudbet/kyc`)
3. **Intent+modifier long-tail** — specific player needs (e.g. "no kyc bitcoin casino", "instant withdrawal crypto casino", "highest withdrawal limit crypto casino")
4. **Question long-tail** — direct user questions (e.g. "is crypto gambling legal in [country]", "do I pay tax on bitcoin casino winnings in [country]")

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
- `/country/[country]/no-kyc` — "no kyc crypto casino [country]"
- `/country/[country]/fast-withdrawal` — "fast withdrawal crypto casino [country]"
- `/country/[country]/legal` — "is crypto gambling legal in [country]"
- `/country/[country]/tax` — "do I pay tax on crypto gambling winnings in [country]"
- `/country/[country]/no-deposit` — where this query has volume

Addressable: ~45 sub-pages + 9 hub pages = ~54 country-cluster pages.

Rules:
- Country-specific facts MUST come from the country's `countryContext` entry. No generic content.
- Tax/legal pages cite primary sources (statute names with section numbers) or do not exist.
- Sub-pages link UP to the country hub and ACROSS to relevant siblings.
- Country hub links DOWN to all its sub-pages.

**Cluster 2: Brand+intent long-tail**

Current state: 7 casino review pages exist (verify against `lib/casinos.ts`). One sub-page exists (`/reviews/mirax-casino/withdrawal`).

For each casino, target the following as sub-pages:
- `/reviews/[casino]/withdrawal` — "[casino] withdrawal time", "[casino] withdrawal limits"
- `/reviews/[casino]/kyc` — "[casino] kyc requirements", "[casino] verification"
- `/reviews/[casino]/bonus` — "[casino] bonus terms", "[casino] wagering requirements"
- `/reviews/[casino]/payment-methods` — "[casino] crypto", "[casino] payment options"

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
- If only 1-2 casinos genuinely fit, the page does not exist — Claude Code refuses to build it.
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
- Hard cap: 10 pages per session — Claude Code refuses to do more in a single batch.
- Distribute across clusters: do not do 10 country pages in one week then nothing for two weeks. Mix clusters per week.
- After 4 weeks of sustained publishing, pause for one week of "no new pages" to let signals settle before continuing.

### Data sources for content selection

The site has three SEO-research tools wired into Claude Code. Use them to ground content decisions in observed demand, not guesses:

- **Google Search Console MCP** (`gsc`) — read-only access to the verified GSC property for playmagpie.com. Before proposing new pages, consult GSC to identify queries with existing impressions but no dedicated ranking page (recovery opportunities) and queries where an existing page is stuck at position 11-25 (improvement opportunities). Authenticated via Google Cloud service account — JSON key path lives in `GOOGLE_APPLICATION_CREDENTIALS`. When querying GSC, use the domain property `sc-domain:playmagpie.com` not the URL-prefix property. The URL-prefix property is empty because the site is on apex domain, not www. **Exclude GBR by default** when running site-wide GSC analyses (filter `country!=gbr` or remove GBR rows in post-processing) — Eddy is UK-based and his own browsing/testing inflates GBR impressions and CTR. Tested-location pollution rules below cover the targeted-VPN markets separately.
- **Keyword Research skill** (`keyword-research`, from aaron-he-zhu/seo-geo-claude-skills) — invoke when scoping a new page or cluster to validate that the target query has measurable demand. Uses the 8-phase workflow (scope → discover → variations → classify → score → GEO-check → cluster → deliver) against whatever free-source signal you can gather: Google autocomplete, Trends, PAA boxes, Reddit/Quora threads. If none of these sources show signal for a proposed query, do not build the page.
- **claude-seo skill suite** (`claude-seo`, AgriciDaniel) — 25 sub-skills covering technical audits, E-E-A-T checks, schema generation, programmatic SEO, and content quality gates. Use the relevant sub-skill (e.g. `seo-audit`, `seo-schema`, `seo-content`, `seo-programmatic`) when the task calls for it. Don't pull in the whole suite when one sub-skill suffices — the always-on token cost is ~5k per session and on-invoke costs stack.

**Hard rule:** a page does not get proposed unless at least one data source — GSC impressions, keyword-research signal (autocomplete / Trends / PAA), or competitor-page evidence from claude-seo — confirms the query has real demand. Invented patterns or "this seems like it would rank" intuitions don't count.

### GSC pollution rules

Eddy manually tests rankings from VPN exit nodes in **Ireland, New Zealand, Australia, Germany and Norway**. GSC impressions from those geographies include his own searches and overstate real demand. Pollution discount factors per market are tracked in `lib/pollution-baseline.md` — consult that file before scoring tested-location GSC data and re-evaluate at the date noted in the file.

Two pollution-aware rules override GSC-only scoring:

1. **Tightened country-pattern rule**: GSC-only evidence from queries that target tested locations (IE, NZ, AU, DE, NO) requires external corroboration (Google autocomplete, Trends, or PAA hits via the `keyword-research` skill) **regardless of impression volume**. Even a 700+ impression query in IE is not by itself sufficient signal, because the pollution discount can take effective demand below the threshold.
2. **Country sub-page refusal**: country sub-pages (e.g. `/country/ireland/legal`, `/country/germany/no-kyc`) whose only demand signal is GSC data from tested locations are refused until external corroboration confirms the sub-query has organic demand. Sub-queries that have never had a dedicated page can't be validated by GSC at all — GSC cannot observe demand it has never had an opportunity to surface.

Untested markets (Canada, Netherlands, Sweden, Japan, plus the rest of the world) remain scored against the original rules in the strategy section above.

### Selection rule (what to build next)

When the user says "build content" without specifying, Claude Code:

1. Consults `lib/casinos.ts`, `lib/countries.ts`, and existing site routes.
2. Pulls demand signals from the data sources above:
   - GSC MCP for queries with existing impressions but no dedicated page (recovery opportunities) and pages stuck at positions 11-25 with addressable improvements
   - The `keyword-research` skill for autocomplete / Trends / PAA confirmation on candidate queries from the opportunity map
3. Identifies the next 5-10 pages from the opportunity map, filtered to only those with confirmed demand from step 2.
4. Priority order:
   - a. GSC-impressions-without-page recoveries (highest confidence — Google already sees demand)
   - b. Pages that complete an existing cluster where the missing cluster member has keyword-research demand signal
   - c. Pages in clusters with proven performance, where keyword-research confirms the specific query has demand
   - d. Pages that fill obvious gaps in topical authority — only if keyword-research confirms demand
5. Proposes the batch with one-line rationale per page including which data source confirmed the demand (e.g. "GSC: 47 impressions, position 23" or "autocomplete + 3 PAA hits"), then waits for user confirmation before building.

**No demand confirmation → no page.** If a candidate from the opportunity map has zero GSC impressions AND no keyword-research signal, defer it.

### Refusal rules

Claude Code refuses to build a page when:
- The query target is genuinely covered by an existing page (cannibalisation risk)
- Required facts don't exist in `lib/casinos.ts` or `countryContext` and can't be verified from primary sources
- Fewer than 2 casinos in the catalogue genuinely fit the page's premise
- The user asks for a head-term page — push back and propose long-tail alternatives instead
- The page targets a tested location (IE, NZ, AU, DE, NO) and the only demand signal is GSC data — external corroboration via `keyword-research` skill is required first (see GSC pollution rules above and `lib/pollution-baseline.md`)

### Maintenance vs new pages

- New page creation is the default content work
- Existing page updates happen ONLY when:
  - `lib/casinos.ts` data has changed in a way that contradicts a published page's claims
  - A page is identified as factually outdated (e.g. regulator name, statute change)
  - A page has been live for 60+ days at position 11-25 and a clear improvement is identified
- Refreshing pages "for freshness" is forbidden. Every update must have a substantive justification recorded in the commit message.

---

## What's working (as of mid-May 2026)

The `/high-roller-casinos` page is ranking on page 1 of Google Canada for "high roller crypto casinos" — a high-intent commercial keyword. This proves the quality approach works. The site is showing up for "bitstarz withdrawal times", "cloudbet withdrawal time", "mirax casino review", and "bitcoin casinos australia" in Search Console, at positions ranging from 14 to 40.

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

This list isn't exhaustive — use judgement. The test is: would a human writing about this topic actually use this phrase? If it sounds like the opening of a thousand other affiliate site reviews, it probably is.

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

When researching facts for new content — regulator names, tax rates, statute citations, exchange licensing status, dates a regulator came into force, gambling-tax percentages — use a research subagent to cross-check against primary sources before publishing. Note source URLs in a comment block at the top of the relevant data file so they can be spot-checked later.

This is what worked for the country page strengthening: verified facts (DIA licensing milestones, Section 613(2) TCA 1997, GGL operational date, kansspelbelasting rate progression) made the content rank. Invented facts would get the site penalised.

Rule of thumb for what to verify externally rather than trust from training data:
* Anything date-stamped within the past 18 months (new regulators, tax rate changes, exchange licensing)
* Statute citations and section numbers
* Operational status of foreign exchanges in specific jurisdictions
* Any "current" claim about a regulator or law that may have moved on since training cutoff

If a single fact can't be verified to a primary source, omit it — don't bluff. Flagging "we don't have a verified figure to share" in copy is more credible than inventing one.

## Each page must be genuinely different

The failure mode of programmatic SEO is producing 50 pages where only the casino name changes. Google's Helpful Content algorithm explicitly targets this pattern.

For each page in a programmatic set, vary:

* **Opening sentence** — never the same template even with substitution
* **Structural order** — some pages lead with withdrawal speed, others with bonus structure, others with game selection
* **FAQ questions** — each page's FAQs should be substantively different, not the same questions with different names plugged in
* **Examples and use-cases** — a "withdrawal" page for a sportsbook-focused casino should discuss sportsbook withdrawal patterns; one for a slots-heavy casino should discuss slot bonus wagering before withdrawal

If two pages in a batch could swap their bodies and still make sense after a name find-and-replace, they're too templated. Rewrite them.

## Volume safeguards

When publishing at 5-10/week rate, Helpful Content System risk is elevated. Mitigations:
- No two pages in the same week may share more than 30% structural similarity
- Each batch should include pages from at least 2 different clusters
- Claude Code commits each page as a separate commit (so Google sees gradual signal, not bulk dumps)

## What we've learned about Google indexing

Search Console reports two failure states that look similar but mean different things — and the fixes are different:

* **"Crawled - currently not indexed"** — Google visited the page and chose not to index it. This is a content quality signal. The fix is to strengthen the content, then click "Validate Fix" in Search Console.
* **"Discovered - currently not indexed"** — Google knows the URL exists but hasn't crawled it yet. This is a crawl queue issue, not a quality issue. The fix is to submit via Request Indexing to push Google to visit the page.

Don't confuse the two. Strengthening the content of a "Discovered" page doesn't help — Google hasn't seen it yet. Requesting indexing for a "Crawled - currently not indexed" page just makes Google re-reject it without changes.

**The canary case: /country/new-zealand.** Google crawled it and rejected it as "Crawled - currently not indexed." Comparing it to /country/canada (indexed and ranking) showed the difference was content depth: Canada had ~150 words of dense, country-specific intro content covering five elements (regulator, exchanges, tax treatment, currency friction, regional regulatory variation). NZ had ~80 words and skipped most of those. Strengthening NZ to Canada's depth was the fix.

**The pattern that works for "Crawled - currently not indexed":** bring the page up to ~150 words of locally-grounded content covering whatever the five-element analogue is for that page type. For country pages it's regulator + exchanges + tax + currency friction + regional variation. For other page types the elements differ but the principle is the same — specific, verifiable, locally relevant facts in volume.

**Each page must have a structurally different opening hook** — not the same template with names swapped. NZ leads on regulatory transition dates, Ireland leads on a tax statute, Germany leads on the licensing regime, Netherlands leads on the kansspelbelasting rate hike. Google's Helpful Content algorithm explicitly targets name-swap templating.

**General principle:** if a page sits in "Crawled - currently not indexed", that's Google telling you the content depth is below threshold. Don't argue with the signal. Strengthen the content.

## Self-audit before deploy

After generating any batch of pages, before running `git push`, do a quick pass:

1. Read the opening paragraph of 3 random pages from the batch. Are they recognisably different beyond the casino name?
2. Search the codebase for any banned phrases from the list above. If found, rewrite those sentences.
3. Check that data points are present and look plausible (no $1,000,000,000 welcome bonus typos)
4. Confirm the page has internal links to relevant other pages (reviews link to comparison pages, comparison pages link to crypto pages, etc.)

This isn't a checklist to mechanically complete — it's a quality gate. If something feels templated or thin, flag it and ask before deploying.

## Internal linking conventions

The ranking pages on this site benefit from internal links pointing to them. Specifically:

* `/high-roller-casinos` should be linked from every casino review page that's a credible high-roller option
* `/fast-withdrawal-casinos` should be linked from any page mentioning withdrawal speed
* `/no-kyc-casinos` should be linked from any page mentioning KYC or anonymity
* Country pages should link to each other within Tier 1 markets (Canada → Australia → NZ → Ireland)
* Crypto pages should link to relevant casino review pages that accept that crypto

When building new pages, add 3-5 contextual internal links to existing pages. Use natural anchor text — "the best high roller crypto casinos" beats "click here".

## What not to do

* Don't publish more than ~10 new programmatic pages per day. Sudden bulk additions look like spam.
* Don't change page URLs of currently-ranking pages (`/high-roller-casinos` especially — leave it alone)
* Don't add boilerplate disclaimers that repeat across pages. One in the footer is enough.
* Don't generate FAQ schema with questions you didn't actually answer on the page — Google penalises this
* Don't claim a casino accepts a crypto it doesn't actually accept. Check `lib/casinos.ts` for the source of truth.

## Workflow

1. Read this file
2. Check `lib/casinos.ts` and `lib/programmatic.ts` for current data
3. Generate pages following the guidelines above
4. Self-audit per the section above
5. Run `git status` to confirm what's changing
6. Commit with a descriptive message ("Add withdrawal pages for BitStarz, Mirax, 7Bit")
7. `git push origin master` — Vercel auto-deploys

## Social presence

* **X account:** [@MagpieGG](https://x.com/MagpieGG) — linked from the footer
* Brand voice on X is identical to the site: direct, editorial, anti-shill. No emoji-heavy crypto-bro posting, no "GM frens", no hype-style affiliate spam.
* Posts can reference real on-site analysis (rankings, withdrawal data, country-specific regulatory notes) — but read like a person who knows the niche, not a content calendar.

## When in doubt

If a request would violate these guidelines, flag it rather than silently complying. If a generated page feels thin, say so. If you're guessing at data, say so. The honest answer is always more valuable than a polished but generic page.

The standard isn't "is this acceptable" — it's "would this make a real crypto gambler trust the site more or less?"

## Strategic decisions log

Append decisions here when strategy changes. Do not edit; append.

- **2026-05-25**: Long-tail content strategy formalised. Four target clusters (country, brand+intent, intent+modifier, question). 5-10 pages/week cadence with 1-week pause every 4 weeks. Head terms explicitly not pursued until domain authority improves.
- **2026-05-26**: GSC pollution baseline captured at `lib/pollution-baseline.md`. Site had no GSC activity before 2026-05-12, so no clean pre-VPN baseline window exists; discount factors derived from single-query concentration + CTR analysis per market. Tightened country-pattern rule and country sub-page refusal rule added to the Refusal Rules section. **Re-evaluate `lib/pollution-baseline.md` on 2026-07-15** — by then there will be 8 weeks of mixed organic-plus-test traffic, allowing a cleaner pollution estimate and updated discount factors.

## Follow-up audit list

Items flagged across sessions that warrant investigation but weren't fixed at the time they were noticed. Append; don't delete after fixing — mark as `[resolved YYYY-MM-DD]` instead so the history of what was once broken stays readable.

- **`/no-kyc-casinos` ranking anomaly** (flagged 2026-05-26): the page sits at GSC position 83.4 over the recent window with only 7 impressions — far below where a hub page in a high-search category should be. Possible causes: canonical tag misconfiguration, broken internal link path, duplicate content interfering with the canonical, or thin content relative to the query competition. Investigate before treating no-KYC as a non-performing category — the page itself may be the bottleneck, not the demand.
- **`/crypto/*` template audit** (flagged 2026-05-26): the BNB reposition split `/crypto/bnb` into informational-only + spun off `/bnb-crypto-casinos` as a dedicated commercial listicle. The other seven coin pages (`/crypto/bitcoin`, `/crypto/ethereum`, `/crypto/usdt`, `/crypto/usdc`, `/crypto/litecoin`, `/crypto/dogecoin`, `/crypto/solana`) still run the mixed informational-plus-casino-cards template. Open strategic question: do they each need a parallel commercial listicle split (`/usdt-crypto-casinos` etc.) based on GSC demand and intent-mismatch evidence, or is BNB an exception because it had unusually high commercial-query volume against an informational-template page? Don't auto-replicate the split — re-evaluate per coin with GSC + keyword-research signal.