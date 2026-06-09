# Backlink recon — 2026-06-09 (DataForSEO Backlinks API free trial)

Competitor backlink mapping + own-profile baseline, captured during the **DataForSEO
Backlinks API 14-day free trial**. Saved to repo so it persists after the trial ends.

**Trial cancel-by: 2026-06-22** (converts to $100/mo on ~2026-06-23 / day 14). Cancel before then.

## Spend log
| Date | Call | Targets | Cost | Notes |
|------|------|---------|-----:|-------|
| 2026-06-09 | `backlinks_bulk_referring_domains` (Step A) | 10 | $0 (free trial) | Succeeded, full data for all 10. MCP response did **not** include a `cost` field, so exact per-call price isn't confirmable from the response — on the trial, spend is $0. Trial permitted the bulk endpoint with no cap hit. |

Running trial spend: **$0** (free trial active). Post-trial, `bulk_referring_domains` is a cheap bulk endpoint (~$0.02–0.05 est.), but confirm in the DataForSEO dashboard — the MCP doesn't surface per-call cost or remaining trial quota.

## t=0 own-profile baseline
**`playmagpie.com` = 0 referring domains** (no data returned — not in DataForSEO's backlink index). Confirms the premise: ~zero backlinks. **This is the measured starting point** for monitoring — any referring domain that appears later is net new.

## Step A — referring-domain counts (10 targets, one call)
| Domain | Referring domains | Main domains | Nofollow (main) | Tier |
|--------|------------------:|-------------:|----------------:|------|
| **playmagpie.com** | **0** | 0 | 0 | us (t=0) |
| cryptogambling.org | 528 | 516 | 172 | **Attainable — closest comparable** (high dofollow ratio) |
| cryptocasinos.com | 1,832 | 1,568 | 849 | **Attainable** pure-play |
| affpapa.com | 2,566 | 2,503 | 1,494 | **Attainable** (iGaming-affiliate industry) |
| pokertube.com | 7,710 | 5,959 | 2,745 | Aspirational (gambling media) |
| banklesstimes.com | 7,703 | 6,021 | 2,794 | Aspirational (crypto media) |
| cryptomaniaks.com | 9,911 | 7,643 | 3,708 | Mid — **pure-play editorial twin** (bigger but same model) |
| esportsinsider.com | 35,959 | 32,510 | 5,124 | Context only (general esports media) |
| ccn.com | 38,094 | 33,970 | 9,804 | Context only (big crypto news) |
| cryptonews.com | 40,569 | 36,118 | 7,193 | Context only (big crypto news) |

## Read
- **The attainable neighborhood is the pure-play crypto-casino affiliates**, not the big publishers. cryptogambling.org (528) is the realistic "next rung"; cryptocasinos.com / affpapa.com (1.8k–2.6k) the rung after; cryptomaniaks.com (9.9k) the editorial twin to aim at over years.
- The mega-publishers (ccn / cryptonews / esportsinsider, 36k–40k) earn links via crypto-news PR/syndication — **not replicable by an affiliate**. Useful only as context for how far the ceiling is.
- Picking comparables by RD tier (not by guessing) is exactly what this cheap call was for.

## Step B (PENDING your go-ahead) — domain_intersection
Recommended set = the 4 pure-play affiliates whose links are most replicable:
**cryptomaniaks.com, cryptocasinos.com, cryptogambling.org, affpapa.com**.
`domain_intersection` on these returns domains that link to ≥2 of them = the proven
crypto-casino-affiliate link neighborhood = highest-confidence targets. (Excluding the
mega-publishers keeps the intersection free of unreplicable crypto-news links.)

## Step C (PENDING) — backlinks_summary per competitor
Profile shape per comparable: dofollow/nofollow split, link types, anchor distribution.
FLAG (do not copy) any paid/PBN footprint as a §4 penalty risk.

## Free self-monitoring status (WI4 — checked via claude-seo:seo-backlinks)
**Not operational out of the box.** The check found:
- claude-seo backlink scripts not installed in this repo (no `scripts/` dir).
- Moz API: no key configured. Bing Webmaster: no key, site not verified. Common Crawl: reachable but **0 data for playmagpie.com** (too new — CC hasn't crawled it; expect 6–12 months).
- To make the free path work: install the skill scripts + add Moz free-tier key (`MOZ_ACCESS_ID`/`MOZ_SECRET_KEY`, 10 req/mo) + verify site in Bing Webmaster Tools.
- **Interim free baseline = GSC "Links" report (manual UI capture).** That + this DataForSEO t=0 (0 RD) is the starting scoreboard.

---

## RESULTS — Steps B + C (2026-06-09, free trial, $0)

### Step C — competitor profile shape (`backlinks_summary`). FLAG: footprints NOT to copy.
| Competitor | Rank | Backlinks | Ref. domains | Spam score | Dominant footprint (penalty-risk pattern — DO NOT COPY) |
|---|--:|--:|--:|--:|---|
| cryptomaniaks.com | 417 | 172,936 | 9,911 | **40** | Mass spam-blog network: `.online` 50k, `.xyz` 12k, `.space`, blogspot 9k; 65k "blogs" links. PBN-adjacent. |
| cryptocasinos.com | 447 | 501,263 | 1,832 | 13 | Sitewide template links — 500k backlinks from 1.8k domains, ~97% in "section"/footer. |
| cryptogambling.org | 501 | 110,462 | 528 | 6 | 97% footer links (106k of 110k) — sitewide/network badge, not editorial. |
| affpapa.com | 498 | 409,808 | 2,566 | 3 | 94% **image** links (award badges — AffPapa iGaming Awards). |

All four inflated their counts with **non-editorial** links (spam blogs / sitewide footers / badges). The headline backlink numbers overstate real authority.

### Step B — `domain_intersection` (domains linking to ALL 4 competitors): 52 domains
**~96% is SEO spam — the exact §4 penalty tactics. DO NOT COPY.** Representative entries: `great-choice-for-pbn-domains.co.uk`, `thebestbacklinksavailable.click`, `seobacklinks.agency`, `rankgrow.agency`, `kingranks.com`, `topbilliondirectory.com`, `australianwebdirectory.pro/.shop`, plus "website-worth"/metric-scraper pages (`getwebsiteworth.com`, `data-information-api.com`, `global-ranks.pages.dev`) that auto-list every domain, and junk-TLD blogs (`.ga`/`.xyz`/`.party`, spam scores 45–95).

**Only 2 legitimate domains in the entire intersection:**
- **bitcointalk.org** (rank 231) — the one genuine forum link source. Confirms the community map: Bitcointalk is where crypto-casino affiliates actually earn (nofollow) links.
- **bc.game** (an operator) — links to all 4 affiliates. **Validates the operator-outreach route: operators DO link to affiliate review sites** (likely "as featured / partners / press" pages). The recon's most actionable positive.

### Bottom line — the recon's value is confirmatory/negative
The competitor link neighborhood in this niche is overwhelmingly PBN / directory / scraper spam — copying it = the §4 penalty risks. **There is no editorial shortcut to steal here.** The durable routes stand confirmed, unchanged:
1. Original-research **asset** → editorial citations (the only scalable white-hat play).
2. **Bitcointalk / community** participation (referral + nofollow).
3. **Operator featured/partner links** (bc.game proves operators link out — pursue via the §3 outreach draft).

The recon **saved spend on chasing a spam graph**; it did not surface a replicable editorial shortcut, because in this vertical there largely isn't one. That itself is worth knowing before pouring effort into competitor-mirroring.

## Spend (running)
Steps A + B + C = 6 calls + Step D (1 call) = 7 calls, all **$0 (free trial)**. MCP surfaced no per-call cost field. Post-trial ~$0.02–0.06 each.

---

## Step D — cryptomaniaks.com referring-domains deep-dive (2026-06-09, free trial)
`backlinks_referring_domains`, filtered to **rank > 150 AND spam_score < 30**, sorted by rank, limit 60 → **28 domains returned**. Goal: isolate the editorial twin's GENUINE links from the spam/PBN/directory noise.

**Caveat on "reason":** `referring_domains` returns domain + metrics, NOT the linking page URL or anchor text. The "likely reason" below is **inferred from each domain's identity/type**, not confirmed from the link context. To confirm anchors/source pages for the genuine few, a `backlinks_backlinks` pull (a few more trial calls) would be needed — not done yet.

### The genuine / replicable handful (≈4 of 28)
| Domain | Rank | Type | Follow? | Likely reason | Replicable by us? |
|---|--:|---|---|---|---|
| publish0x.com | 188 | Crypto content/blogging platform (write-to-earn) | Mixed (55 nofollow / 390) | A user post on the platform cited/linked cryptomaniaks | **Yes** — publish there or earn a mention (but it's UGC + partly nofollow) |
| gokrypto.net | 247 | Crypto **forum / message-board** | Dofollow | A community/forum post | **Yes** — genuine participation (same lane as Bitcointalk) |
| cryptsy.com | 175 | Crypto news/blog (old exchange domain, repurposed) | Dofollow | A crypto-news/blog mention | **Partially** — earn a news mention; verify the domain's current legitimacy first |
| slots777.org | 196 | Gambling/slots directory | Image+anchor (badge-ish) | Directory listing / badge | **Maybe** — get listed, but low value |

### The other ≈24 — PBN / link-injection (NOT replicable without penalty risk)
Even after the rank>150, spam<30 filter, the bulk are **completely unrelated businesses each with hundreds-to-thousands of links to cryptomaniaks from a single domain** — the classic PBN / compromised-site / mass-injection footprint: `bestwesterndrycleaners.co.uk` (605), `emleather.co.za` (leather, 641), `turnkeymodular.ca` (modular homes, 1,296), `alkhazana.net` (2,324), `twobtextile.com` (textiles, 1,037), `solarandmore.com`, `fly2.travel`, `latam-translations.com`, `magnolialaser.com` (laser clinic), `river-gas.com`, `perhumas.or.id`, etc. A dry-cleaner linking a crypto-casino affiliate 600+ times is not editorial — it's injected. DataForSEO's `spam_score` doesn't catch these because it rates the *linking domain's own* profile, not whether the link is manipulative.

### What this means (the honest answer to "what does a site like mine do to earn real links?")
**Even the editorial twin's profile is ~85%+ PBN/injection at the high-rank tier.** Its genuine links are a thin handful from **crypto content platforms (Publish0x), crypto forums (gokrypto — same lane as Bitcointalk), and the occasional crypto-news mention** — mostly nofollow or low-value. There is **no clean editorial-citation engine to copy**: cryptomaniaks did not rank by earning high-authority editorial links; it ranked substantially on a manipulated link graph we should not replicate.

The replicable, white-hat path for us is unchanged and now doubly evidenced:
1. **Build the citable asset** (the Transparency Report) so we can earn the *rare genuine editorial/news mention* the competitors barely have — the one thing missing from their profiles that's actually defensible.
2. **Crypto forums / content platforms** — Bitcointalk, gokrypto-style communities, Publish0x — genuine participation (mostly nofollow; value is referral + reach).
3. **Operator featured/partner links** (bc.game proof from Step B).
The recon's verdict across all four targets and this deep-dive: the niche's link graph is manipulated; there is no shortcut to copy, only the slow legitimate routes.
