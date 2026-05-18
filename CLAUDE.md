# agents.md

# 

# PlayMagpie — Working Guidelines for Claude Code

This file is for Claude Code to read at the start of every session. It captures what we've learned about building this site so each new session doesn't reinvent the wheel or repeat past mistakes.

## What this site is

PlayMagpie is an independent crypto casino review affiliate site. The thesis is that a small, focused, well-built site can outrank generic affiliate sites by being *more honest, more specific, and more useful* than the alternatives.

Target audience: crypto-native gamblers in Tier 1 English markets (Canada, Australia, New Zealand, Ireland) plus Germany, Netherlands, Nordics. **Not UK** — see footer disclaimer.

The brand voice is direct and editorial, not salesy. Phrases like "find your edge", "no paid placements", "we cut through the marketing spin" are on-brand. Phrases like "look no further than" or "welcome to the best" are off-brand.

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

* Don't publish more than \~10 new programmatic pages per day. Sudden bulk additions look like spam.
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

