# CTA strip rollout — push review summary

Prepared 2026-05-30. **6 commits ahead of origin/master, all held for push approval.** 38 pages affected. Build clean throughout.

---

## 1. Commit chain

| # | Hash | Scope |
|---|---|---|
| 1 | `e218eaf` | Add CasinoCTAStrip component + /bonus/free-spins above-the-fold strip |
| 2 | `9319dae` | Add CTA strip to 7 intent pages |
| 3 | `061d109` | Add CTA strip to game pages (crash + dice + plinko + 4 dynamic) |
| 4 | `2b636b7` | Add CTA strip to /crypto/[slug] dynamic — all 8 coin pages |
| 5 | `86e45f6` | Add CTA strip to country pages — dynamic + Sweden static |
| 6 | `34cbbd0` | Add CTA strip to bonus pages — 6 dynamic /bonus/[slug] types |

Push command (when approved): `git push origin master` → `1a12051..34cbbd0`.

---

## 2. Category decisions — what got strips, what didn't, why

### Strip applied (38 pages)

| Category | Pages | Selection logic |
|---|---|---|
| Intent listicles | 7 | Top 3 by the category's anchor metric (trust / withdrawal score / kyc filter). Editorial swaps logged in §3. |
| Game — bespoke (crash/dice/plinko) | 3 | Top 3 by trust from each page's curated 4-operator list. Roobet excluded from strip; remains in per-operator notes. |
| Game — dynamic ([slug]) | 4 | Per-slug config keyed by game type. Top 3 with format-specific fact surfacing. |
| Crypto coin pages | 8 | Top 3 by trust among casinos accepting that coin. /crypto/bnb included alongside dedicated /bnb-crypto-casinos. |
| Country pages | 9 | Top 3 by trust from `casinoAcceptsCountry()`-filtered eligible list. Restricted-territory filter enforced dynamically. |
| Bonus pages | 7 (incl. existing free-spins) | Per-bonus-type config tailored to each bonus's player intent. |
| **Total** | **38** | |

### Strip NOT applied — and why

| Category | Pages | Reasoning |
|---|---|---|
| `/reviews/[slug]` (8 pages) | Casino review pages | Already have prominent affiliate CTA in the hero + ReviewSection final CTA. Adding a strip would be redundant *and* potentially confusing — a review page recommending other casinos before its own review reads as low confidence in the operator under review. |
| `/reviews/[slug]/withdrawal`, `/reviews/[slug]/payment-methods` (5 pages) | Review sub-pages | Editorial deep-dives where commercial framing would interrupt the analytical narrative — these are pages a reader lands on because they want detail on one specific casino, not a comparison. Trust hierarchy here is "let the depth do the work". |
| `/compare/[slug]` (5 allowlisted pages) | Compare pairs | Already structured around dual CTAs (header score cards + Pick X / Pick Y scenario cards + bottom CTAs). A strip on top would duplicate. |
| `/guides/[slug]` (4 pages) | Editorial guides | User specifically called this out as skip. Guides do contain casino-specific examples in body prose; a commercial strip would undermine the editorial-explainer positioning. |
| Hub pages (/bonus, /game, /crypto, /country, /compare, /guides — 6 pages) | Category landings | Pure navigation pages — they're the "choose your category" entry points. No casino-comparison context to frame a strip against. Adding one here would force a recommendation before the reader has expressed intent. |
| `/` (home) | Home page | Already has the comparison table + BonusBanner + featured cards at the top of the fold — the strip's job is already done by existing components. |
| `/about`, `/privacy`, `/terms`, `/contact` (4 pages) | Static info | Not casino-context pages. |
| `/game/poker`, the 37 removed `/compare/*` pairs | 404s | Deliberately 404'd in prior commits. |

---

## 3. Every unilateral curation call I made

### A. /high-roller-casinos strip: Cloudbet over 7Bit (despite 7Bit's higher trust)

Strict top-3-by-trust among vipProgram && trustScore >= 8.0 → BitStarz 9.2, BC.Game 8.9, 7Bit 8.8. I swapped 7Bit out for Cloudbet (8.7) because the page's editorial spine is "no withdrawal limits at scale", and Cloudbet's formal no-limit policy is THE load-bearing high-roller proposition. 7Bit's strength is no-KYC, which is a different player profile.

### B. /no-limit-withdrawal-casinos strip: Cloudbet + BitStarz + BC.Game (not Duelbits 9.2 withdrawal score)

Strict by withdrawalScore → Cloudbet (page's no-limit anchor) + BitStarz 9.5 + BC.Game 9.3 + Duelbits 9.2. I cut Duelbits to keep the strip at 3 and to lead with the two highest-trust alternatives (BitStarz 9.2 trust, BC.Game 8.9). The page's argument is "Cloudbet for the formal policy; if you need an alternative, prioritise trust at scale." Duelbits at 8.5 trust is fast but its no-KYC posture matters more for grinders than for high-stakes withdrawals.

### C. Game pages crash/dice/plinko: Roobet excluded from strip despite being in the curated 4

The curated 4 on these pages is BC.Game, Shuffle, Duelbits, Roobet. Strip is top 3 by trust = BC.Game, Duelbits, Shuffle. Roobet (6.8 trust, documented withdrawal-hold pattern) remains covered in the per-operator notes block below the strip — which surfaces its `withdrawalCaveat` inline. **Editorial position: the strip is recommendation, not catalogue completeness.** Surfacing Roobet in an above-the-fold CTA without the caveat context immediately visible would undermine the page's structural integrity. The notes block handles that honestly.

If you want Roobet in the strip cards with its caveat surfaced in the card itself, that's a different design — would require extending the component to support a "caveat" field per card. Flag if you want this.

### D. /game/[slug] dynamic blackjack/roulette/live-dealer: Cloudbet over 7Bit

Same reasoning as §A above but applied at the game-type level. The page's content centres on live dealer / table game posture, where Evolution VIP table coverage + high bet limits + no-withdrawal-limit cashout is the load-bearing high-stakes-live proposition. 7Bit's strength is no-KYC slots, which doesn't carry into live tables. Cloudbet's Evolution VIP/Salon Privé coverage and €100k/hand limits matter here.

For /game/slots specifically, the strip uses the strict trust top 3 (BitStarz, BC.Game, 7Bit) — slots is where 7Bit's no-KYC + library-size proposition genuinely competes.

### E. /bnb-crypto-casinos strip: top 3 BNB-accepting (BitStarz/Mirax/Roobet excluded for not accepting BNB)

Mechanical exclusion — those three don't accept BNB per their `acceptedCryptos`. Top 3 of the 5 BNB-accepting by trust = BC.Game 8.9, 7Bit 8.8, Cloudbet 8.7. Matches the page's existing 5-casino comparison and the /crypto/bnb strip exactly.

### F. Country pages: identical top-3 across all 9 countries (BitStarz/BC.Game/7Bit)

The dynamic resolution gives the same top 3 on every country page because: (1) the restricted-territory filter is currently Roobet-only (full-name-matching design), so it never removes BitStarz/BC.Game/7Bit; (2) those three are the trust-top-3 globally. Visually this means country pages show the same strip operators across all 9 country slugs — accurate but monotonous.

Two alternatives to consider:
- (a) Add per-country curated configs that differentiate cards by country-specific facets (e.g. NZD on-ramp friction, German § 23 EStG tax implication). More work, more relevant per-country.
- (b) Leave as-is. The strip is "best casinos for X country" and the answer genuinely is "the same three top-trust operators". Honest.

I went with (b). Flag if you want (a).

### G. /bonus/high-roller-bonus strip: Cloudbet over 7Bit (same as §A)

Same reasoning as the intent-page high-roller strip. Consistent treatment across both pages.

### H. /bonus/free-spins: only 3 casinos in strip (BC.Game dropped from filter)

BC.Game's restructured bonusSummary (220% Deposit Rakeback, no spin component) no longer matches the existing `includes('spin')` filter. Strip and table both show only BitStarz/Mirax/7Bit. Correct outcome — surfaces what's actually available in the free-spins category right now.

### I. /best-crypto-pokies-nz: kept existing 7-casino curation (no Roobet add)

The page is currently ranking on Google Canada and its curation is an editorial decision that warrants a focused session — I deliberately did NOT add Roobet to the page (logged in CLAUDE.md from prior cascade). Strip top 3 = trust-leaders from the existing curation = BitStarz/BC.Game/7Bit.

### J. Library-size hardcoded facts (BitStarz "3,000+ titles", BC.Game "10,000+", 7Bit "7,000+")

Library size isn't a typed field in `Casino`. I hardcoded these on the slots and pokies-NZ strips, pulling values from each casino's `reviewSummary` prose. If the underlying library size changes, these strips need manual update. Logged as soft tech-debt — could be promoted to a `gameCount` field on `Casino` in a future commit.

### K. BC.Game's monthly withdrawal cap surfaced on /no-limit-withdrawal-casinos

The BC.Game card surfaces "€10k/month standard, €5k if 10x+ deposits" — this is the §8.6 BC.Game terms clause you verified in the manual T&C check earlier. Surfacing the actual cap (rather than a vague "limits apply") matches the editorial "verified against T&C" line.

### L. /game/[slug] dynamic only has STRIP_BY_GAME entries for 4 game types

Slots, blackjack, roulette, live-dealer all have configs. The other game-type slugs would render no strip (component guards on missing config). But all 7 game slugs in GAME_TYPES have either bespoke routes (crash/dice/plinko) or dynamic configs (slots/blackjack/roulette/live-dealer). Poker was removed earlier. So zero pages render with the dynamic strip silently absent — every game page has a strip.

---

## 4. Component visual structure

### Layout
- **Section wrapper**: `mb-10`, framed with a single-line context paragraph above (uppercase tracking-wider muted text).
- **Card grid**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4` for 3 cards. Scales gracefully — 1 card centres narrow, 2 side-by-side.
- **Mobile**: single-column stack throughout (every grid starts at `grid-cols-1`).

### Per-card structure
- **Header row**: 40×40 logo + casino name (linked to /reviews/[slug]) on left, trust score anchor on right (`text-xl font-extrabold text-[#7BB8D4]` + "TRUST" microlabel).
- **Facts list**: vertical stack of 2-3 facts. Each fact is a row with `w-24` left-column label (uppercase tracking-wider muted) + value (light grey content).
- **CTA**: `CTAButton variant="primary" size="sm" external` with default `Visit {Casino}` label. Renders the existing `rel="noopener noreferrer nofollow sponsored"` from the shared component.

### Component file
- `components/CasinoCTAStrip.tsx` — 95 lines including TypeScript types and comments
- Exports: `CasinoCTAStrip` (default), `CTAStripCard` (type), `CasinoCTAStripProps` (type)
- Dependencies: `getCasinoBySlug` from `lib/casinos`, existing `CTAButton`, existing `CasinoLogo`

### Edge cases handled
- Card slug not found in catalogue → silently dropped (no broken-link card)
- All cards drop → component renders nothing (no empty section artifact on country pages with full restrictions)
- `ctaLabel` optional per card — falls back to `Visit {Casino}`

---

## 5. Total page count + build status

- **38 pages affected** — 1 free-spins + 7 intent + 7 game + 8 crypto + 9 country + 6 bonus
- **78 static pages total** (unchanged from before this rollout — no page added or removed)
- **`npx next build`**: clean after every commit
- **Banned-phrase audit**: zero matches across all touched files (run after every commit)
- **Type-check**: no errors
- **Sitemap**: unchanged structurally — no new routes, no removed routes

---

## 6. Things I considered and refused

### A. Strip on /reviews/[slug] (the casino review pages themselves)
A review page that prominently CTAs *other* casinos before the reader has even seen the review of the casino they came to read would read as low operator confidence. The existing hero CTA (Play at [Casino]) and final-CTA pattern is the right shape for review pages.

### B. Strip on /reviews/*/withdrawal sub-pages
These pages are written as analytical deep-dives — *why* withdrawals work the way they do at this operator, what KYC triggers at scale, etc. The voice is editorial-explainer. A commercial recommendation strip on top would interrupt that narrative voice; readers landing here are looking for depth on the operator under review, not an alternative recommendation. The existing review→withdrawal cross-link path is the right one.

### C. Strip on /guides/[slug]
Guides are framed as "how it actually works" content. The bonus-guide page in particular surfaces casino-specific examples in the body prose; adding a commercial strip would convert the page from explainer to listicle. User explicitly called this out as skip, and I agree on the structural reasoning.

### D. Per-country strip differentiation
See §3F — I considered per-country curated configs that highlight country-specific facets (NZD on-ramps, German tax facets, etc.) and decided not to do it tonight. Identical top-3 across all 9 countries is honest if visually monotonous. The dynamic helper-based approach is cleanly extensible if you want per-country differentiation later — pass per-country card configs through the slug record without changing the strip component.

### E. Adding a `caveat` field to the strip component for Roobet
The current component shows facts + CTA; no caveat surfacing. Adding caveat support would let Roobet appear in strip cards on /game/crash, /dice, /plinko with its withdrawal-hold caveat visible. I considered this and decided against — the strip is meant to be an above-the-fold concise recommendation, and a card with both a "Visit Roobet" CTA AND a "documented withdrawal-hold pattern" caveat sends mixed signals on first-impression hierarchy. The per-operator notes block below handles the strength-with-caveat treatment more legibly.

---

## 7. Concerns to eyeball before push

### A. CTA strip visual hierarchy at scale
Most pages now have a CTA strip near the top + existing CTAs further down (BonusBanner, TopRatedSection, casino card grids, etc.). The strip is the new top-of-funnel; everything else becomes mid/bottom-funnel. **I haven't visually previewed the layout in browser** — the build compiles cleanly but I can't confirm that, say, the strip's `mb-10` + existing stats block above doesn't create awkward spacing on a specific page. If you want, I can run `npm run dev` and spot-check 5-6 representative pages before push. Otherwise, post-push you can flag any visual issues and I'll adjust spacing.

### B. Country pages with identical top-3 — visually monotonous
9 country pages, every strip shows BitStarz/BC.Game/7Bit. Per-country card differentiation would change this — see §3F and §6D. Flag if you want a follow-up commit for per-country fact differentiation.

### C. Cloudbet swap-ins (high-roller, blackjack/roulette/live-dealer)
Three separate places where I overrode strict top-3-by-trust to include Cloudbet (8.7) over 7Bit (8.8). Each is editorially defensible — the load-bearing differentiator at those pages is something Cloudbet offers and 7Bit doesn't — but the consistency of "Cloudbet > 7Bit when the page is high-stakes / live-dealer focused" is a pattern worth confirming you're happy with.

### D. BC.Game in /bonus/free-spins strip vs no
BC.Game's `bonusSummary` no longer contains "spin" so it drops from the existing filter. The strip and table both show 3 casinos. **Correct outcome**, but if you ever update BC.Game's bonusSummary to include "spin" again (e.g. if they bring back a spin component), the strip would expand to 4 cards (and the table would need a column added). Flagging this dependency.

### E. Library size hardcoded values
Per §3J — the slots and pokies-NZ strips have hardcoded "3,000+ / 10,000+ / 7,000+" library sizes. These will drift if the catalogue updates. Either I promote `gameCount` to a typed field (separate commit), or you accept manual maintenance. No code change required now — flagging.

### F. /crypto/bnb has both the strip AND the existing "looking for the casino ranking?" callout
Both surface paths to the same casinos. The strip is the above-the-fold direct CTA; the callout points to the full /bnb-crypto-casinos listicle. Readers now have two convergent paths to the same destinations. Reasonable but worth confirming you're happy with the doubled signal on this page specifically.

### G. CTA button width inside cards
The strip cards use `CTAButton variant="primary" size="sm" external` wrapped in `<div className="flex">`. The button renders at its natural content width (inline-flex), not full card width. Visually fine but worth confirming you don't want a full-width "Visit X" button per card — that would need a className override on CTAButton (which doesn't currently support it).

---

## What I need from you

**Two decisions:**

1. **Push approval** — 6 commits, 38 pages affected, build clean throughout. Push command: `git push origin master` will move `origin/master` from `1a12051` to `34cbbd0`.

2. **Any of the §7 concerns you want resolved BEFORE push** — most notably (a) the visual preview, (b) the country-page monotony, (g) the CTA button width. Flag specifically and I'll adjust in additional commits before pushing.

Otherwise: hold for push approval. Branch is ahead by 6 commits, nothing pushed. Will surface commit hashes once pushed.
