# Cascade work — push review summary

Prepared 2026-05-30. All five planned commits are in locally. Branch is 8 commits ahead of `origin/master`. **Not pushed.** This file is your eyeball check before push approval.

---

## 1. Commit chain

| # | Hash | Subject | Scope |
|---|---|---|---|
| 1 | `3a8d055` | Catalogue corrections — verified 4 welcome offers against live T&C | lib/casinos.ts: 4 bonusSummary corrections + sources block (already done before this session) |
| 2 | `e1cc616` | Mechanical cascade fixes — bonus-number swaps + seven→eight count updates | 8 files, ~28 changed lines. Simple swaps + seven→eight count updates. No editorial judgement. |
| 3 | `d7fff24` | Editorial cascade — rewrite arguments invalidated by the corrections | 4 files. Argument-restructure prose work. 3 compare pairs + 5 review-page FAQs + 2 withdrawal sub-pages + bnb-crypto-casinos BC.Game value-prop. |
| 4 | `9c0b92d` | Promote /bonus/free-spins to bespoke route with verified T&C table | New static segment with 3-casino × 5-field verified table + "What this means in practice" callout + bottom related tiles + inbound editorial link from /best-crypto-casinos. |
| 5 | `08a4ce7` | Differentiate /game/dice and /game/plinko — replace templated parallels | Per-operator notes, "How provably-fair X verifies", FAQs #1, #5, #6 rewritten on each page to be substantively distinct. |

Pre-existing in-flight commits also held (none pushed):

| `ac95ba0` | Promote /game/dice (initial templated version) |
| `c0b7302` | Promote /game/plinko (initial templated version) |
| `fb6e574` | Refuse to build /game/poker — drop from GAME_TYPES, log decision |

Total: **8 commits ahead of origin/master.**

---

## 2. /game/dice vs /game/plinko differentiation diff

### Section A — Per-operator notes (8 paragraphs rewritten)

**BC.Game**
- OLD (dice): "BC.Game Dice is one of the longest-running provably-fair Dice products in the market — adjustable win-chance slider… No-KYC at any withdrawal size across 100+ supported cryptocurrencies"
- OLD (plinko): "BC.Game Plinko has been in the Originals lineup since BC.Game launched in 2017 — 8-16 row customisation… No-KYC across all 100+ supported cryptocurrencies. The longest-running Plinko product in this list"
- NEW (dice): grounded in dice-as-strategy-grinding-format with multiplier math (1.02x to ~99x), high-frequency auto-bet validation in minutes
- NEW (plinko): grounded in "ships the full 8-16 row range plus all three volatility modes" as distinctive configurability — being able to switch modes inside one balance

**Shuffle**
- OLD (dice): "Shuffle Dice uses the same server-seed commitment model… SHFL token rakeback and airdrop accrual regardless of outcome"
- OLD (plinko): "Shuffle Plinko uses the same server-seed model… SHFL token rakeback and counts toward airdrop accrual regardless of multiplier hit"
- NEW (dice): per-roll SHFL accrual matters specifically because dice cycles at 200+ rolls/min on auto-bet — token rakeback compounds far faster than on lower-frequency formats
- NEW (plinko): SHFL accrual matters in structurally different way — Plinko at high volatility is negative-variance with long losing streaks; rakeback floor offsets the variance drag, turning dead time between hits into steady positive EV

**Duelbits**
- OLD (dice): "clean modern interface and fast auto-bet cycle suited to high-volume strategy play. No-KYC… sub-5-minute crypto withdrawals"
- OLD (plinko): "Clean drop animation, full auto-bet for high-volume strategy play, no-KYC for crypto play. Sub-5-minute crypto withdrawal headline"
- NEW (dice): fastest auto-bet cycle on the page matters because dice strategy validates over thousands of rolls — Duelbits cuts the validation loop to single-digit minutes
- NEW (plinko): cashback-first welcome model fits Plinko's variance profile distinctively — miss-streak cash positions still contribute to weekly cashback total, softening drawdown specifically on high-variance formats

**Roobet**
- OLD (both, near-identical): "Trust score 6.8 with documented multi-day cashout holds at $20k+ — fine for testing… at modest stakes, structurally riskier as a [five-figure / max-volatility outlier] cashout destination"
- NEW (dice): dice is lowest-stakes-per-decision — the hold caveat applies most when long grinding accumulates balance into the $20k-$84k range complaints have surfaced at
- NEW (plinko): plinko is highest-variance format in Roobet Originals — outlier multipliers in ~1,000x range are exactly the win-size that triggers documented holds. Structurally the worst-fit Roobet format if your goal is to chase a single outlier and cash out fast

### Section B — "How provably-fair X verifies" sections

**Dice** (retitled: "one nonce, one number, one check"):
> Dice is the simplest verification case across the Originals catalogue: each roll resolves to a single output, and the audit is a single comparison. Before play, the operator publishes a SHA-256 hash of a server seed. You contribute a client seed. Each roll combines server seed + client seed + an incrementing nonce through the casino's documented hash chain to produce one number — typically 0-9,999 or 0-99 depending on implementation — which is then compared against your win-chance threshold to determine the outcome.
> 
> [Para 2 explains audit speed + entry-level verification load + explicit cross-link contrast to crash and plinko]

**Plinko** (retitled: "the multi-deflection hash chain"):
> Plinko verification is structurally heavier than dice or crash. Each drop produces a sequence of left-or-right peg-deflection decisions — one per row, so 8 to 16 deflections per drop depending on configuration — that determines the path the ball takes through the board and the bucket it lands in. The provably-fair model has to deterministically produce that whole sequence from the seed combination, not just a single number or one multiplier output.
> 
> [Para 2 explains the bit-extraction mechanics — each hash bit determines one peg-deflection direction. Plinko is N hash extractions per drop where N = row count.]

**Differentiation check:** dice frames as "one output → simplest audit". Plinko frames as "N-step sequence output → heaviest audit". Same underlying server-seed commitment model, different per-round verification work. Genuinely distinct technical framing, no name-swap templating.

### Section C — FAQ rewrites

**Plinko FAQ #1** was replaced entirely from "What is provably-fair Plinko?" (name-swap of dice answer) to:
> "How is Plinko's provably-fair verification different from Dice and Crash?"
> 
> Plinko's verification is heavier per round than its sibling Originals because each drop produces a sequence, not a single output. Dice resolves to one number (compared to your win-chance threshold) per roll. Crash resolves to one multiplier per round. Plinko produces an N-step sequence of left-or-right peg-deflection decisions — one per row, 8 to 16 total — that determines the ball's path and the bucket it lands in. Verifying a single Plinko drop is therefore N hash extractions versus one comparison for dice or one multiplier for crash.

**Dice FAQ #5** (casino-pick) — old was "Four platforms in our rankings run native… BC.Game has the longest track record… Shuffle layers SHFL… Duelbits offers the fastest… Roobet caveat". New surfaces operator picks against **dice-specific decision criteria**: strategy iteration speed, high-frequency rakeback compounding, no-KYC for grind balance fluctuation, Roobet's grinding-accumulation hold-risk band.

**Plinko FAQ #6** (casino-pick) — old was same parallel structure. New surfaces operator picks against **plinko-specific decision criteria**: configuration breadth, variance-drag offset via rakeback, fast cash-out post-multiplier-landing, Roobet's outlier-multiplier hold-risk band.

**Dice FAQ #6** (KYC) — old was "BC.Game and Duelbits no-KYC, Shuffle Light, Roobet Standard". New surfaces **dice-specific reasons KYC posture matters**: long sessions with balance fluctuating substantially in both directions need zero-friction cashout.

**Plinko FAQ #5** (KYC) — old was the same answer with vocabulary swap. New surfaces **plinko-specific reasons KYC posture matters**: bimodal distribution means most drops are small variance but the occasional outlier produces a single-drop win in the cashout-size band that triggers KYC reviews at Light-KYC operators.

### Sections deliberately unchanged on both pages

- "How dice works" vs "How Plinko works": already substantively different content (slider mechanics vs ball-drop/row-count mechanics)
- House-edge maths (dice, 4 cards) vs Row-count/volatility maths (plinko, 4 cards): same structural pattern, completely different content
- FAQ #2-4 on each page: already game-specific
- Stat cards: differ
- Bottom related-pages tile sections: differ (dice links to crash/no-KYC/fast-withdrawal; plinko links to crash/dice/no-KYC)

---

## 3. BC.Game editorial rewrite text — /bnb-crypto-casinos lines 228, 334

### Line 228 — "For the largest welcome bonus" decision card

**OLD:**
> Cloudbet's 100% match up to 5 BTC equivalent is the largest on this list, with Shuffle's 100% up to $1,000 next. BC.Game runs a 300% across four deposits package that often delivers more dollar value depending on deposit sizing.

**NEW:**
> Cloudbet's 100% match up to 5 BTC equivalent is the largest cash-match welcome on this list, with Shuffle's 100% up to $1,000 next. BC.Game has moved to a structurally different model — a 220% Deposit Rakeback Welcome across 4 monthly stages where locked balance unlocks as you wager — which sits outside the headline-match comparison but may deliver more value to active high-volume players over the first month.

**Editorial intent:** doesn't paper over BC.Game's removal from the cash-match ranking. Acknowledges the structural change explicitly. Notes "for active high-volume players over the first month" as the specific player profile the rakeback model serves. Does not claim BC.Game is the largest — that would be misleading. Honest read.

### Line 334 — BC.Game FAQ value-prop

**OLD:**
> None of the five BNB-accepting casinos run a BNB-specific welcome bonus. All offer their standard welcome packages denominated in BTC-equivalent or USD-equivalent terms, applied proportionally to BNB deposits. Cloudbet's 100% up to 5 BTC equivalent is the largest single-coin-denominated welcome on the list; BC.Game's 300% across four deposits often delivers more dollar value depending on deposit sizing.

**NEW:**
> None of the five BNB-accepting casinos run a BNB-specific welcome bonus. All offer their standard welcome packages denominated in BTC-equivalent or USD-equivalent terms, applied proportionally to BNB deposits. Cloudbet's 100% up to 5 BTC equivalent is the largest single-coin-denominated cash-match welcome on the list. BC.Game's structure is now a Deposit Rakeback Welcome (220% across 4 monthly stages) rather than a traditional match — locked balance unlocks as you wager rather than wagering-then-withdraw, which fits active BNB volume play differently than the cash-match operators on this list.

**Editorial intent:** same as line 228 — acknowledges structural change rather than papering over, notes who the rakeback model fits.

---

## 4. Mirax + 7Bit withdrawal sub-page rewrites — before/after key passages

### Mirax — opening lead paragraph

**OLD:**
> Mirax Casino's pitch is a 325% welcome package across four deposits, worth up to $3,250 plus 250 free spins. That is the most generous match in our top seven, and it's the single most relevant variable for your first withdrawal — because bonus money carries wagering before it can be cleared off the platform.

**NEW:**
> Mirax Casino's pitch is a 4-deposit welcome pack with a 5 BTC headline ceiling and 150 free spins distributed across the first two deposits. That ties Mirax with BitStarz on raw BTC-denominated ceiling and avoids the 25% admin fee BitStarz charges on bonus-related withdrawals — the single largest hidden cost in the BitStarz cashier flow.

**Voice preservation:** kept the "X's pitch is Y" lead pattern, the comparison framing, and the "single largest" hidden-cost callout. Updated facts.

### Mirax — "the welcome match and your first withdrawal" section

**OLD:** described 325% across four deposits with the 250 spins "released alongside"; acknowledged no verified wagering multiplier and used "sister-site 7Bit's mid-30s as a reasonable mental model".

**NEW:** describes the per-deposit structure verbatim from the verified T&C — D1 100% / 1.5 BTC + 100 FS, D2 75% / 1.25 BTC + 50 FS (code W2), D3 cash-only 1.25 BTC (code W3), D4 cash-only 1 BTC (code W4) — total 5 BTC + 150 FS distributed 100-50-0-0. Cites the verified 45x wagering on free-spin winnings and the €100 max cashout.

**Voice preservation:** kept the "as with virtually every match bonus in the industry…" comparative framing. Updated the per-deposit specifics + cited verified numbers instead of speculative ones.

### Mirax — "vs BitStarz vs 7Bit on withdrawal" comparison

**OLD:**
> Where Mirax stands out is the bonus offer — 325% across four deposits is materially larger than BitStarz' 5 BTC package in real dollar terms for most players, and Mirax does not impose the 25% bonus admin fee BitStarz does.

This sentence was editorially wrong even before (325% × $3,250 ≈ $3,250 is not "materially larger" than 5 BTC × ~$60k ≈ $300k). Corrections compound: 325%/$3,250 was wrong; correct figures put Mirax tied with BitStarz at 5 BTC.

**NEW:**
> Where Mirax stands out is bonus-side cashier economics — the 5 BTC ceiling ties with BitStarz' 5 BTC package on headline, but Mirax does not impose the 25% bonus admin fee BitStarz does. After fee, Mirax delivers ~25% more BTC-equivalent value at the same headline ceiling.

**Voice preservation:** kept the "where Mirax stands out is…" lead. Reframed the standout from "bigger bonus" to "cleaner cashier economics". Both factually correct now.

### 7Bit — "Why the smaller welcome bonus actually helps withdrawals" section

**OLD section heading:** *"Why the smaller welcome bonus actually helps withdrawals"*
**Old argument:** 7Bit's 1.5 BTC ceiling is smaller than BitStarz/Mirax → less bonus-locked balance → faster path to first eligible withdrawal. This was the editorial spine of the 7Bit withdrawal page's competitive positioning.

This entire argument is now **structurally false** — 7Bit's actual welcome is 325% / €5,400 / 250 spins, which is competitive with rivals.

**NEW section heading:** *"The welcome pack — competitive with rivals, decoupled from the no-KYC story"*

**NEW argument:**
> 7Bit's welcome offer is a 325% match up to €5,400 plus 250 free spins on Elvis Frog in Vegas, distributed across the 4-deposit welcome pack. That headline now sits in competitive territory with rivals — Mirax tops out at 5 BTC across 4 deposits with 150 spins, BitStarz at 5 BTC + 180 spins (with the 25% admin-fee catch on bonus withdrawals), 7Bit at €5,400 + 250 spins. 7Bit's spin count is the highest of the three. The previous version of this page argued that a smaller welcome bonus actually helped withdrawals — that framing was tied to 7Bit's older 1.5 BTC ceiling and no longer applies.
> 
> What that means for withdrawals: the welcome bonus is no longer the structural trade-off it used to read as. The thing that actually differentiates 7Bit on the cashier side is the no-KYC posture — every other operator in this batch imposes Light or Standard KYC that can be triggered at larger withdrawal amounts. 7Bit doesn't.

**Voice preservation:** kept the "what that means for withdrawals…" lead pattern. Reframed the editorial spine entirely around no-KYC as the unique-to-7Bit value prop. **Explicitly acknowledges the previous version's argument is now false** rather than silently rewriting it — that's the honesty cost.

### 7Bit — final comparison paragraph

**OLD:**
> The single trade-off is the welcome bonus ceiling — 7Bit's 1.5 BTC cap is the smallest of the three. For players who don't use match bonuses heavily, this is irrelevant or beneficial.

**NEW:**
> The differentiator is the no-KYC posture, not the bonus ceiling. 7Bit's 325% match up to €5,400 + 250 spin package is competitive with Mirax (5 BTC + 150 spins) and BitStarz (5 BTC + 180 spins with the 25% admin fee catch). On withdrawal specifically, the case for 7Bit is that document verification will never come into play — regardless of how aggressively you use the welcome match, the cashier-side flow is identical from the first to the hundredth withdrawal.

---

## 5. Build status + banned-phrases check

**Build:** `npx next build` runs clean after every commit. Final state: 78 static pages, no errors. The new `/bonus/free-spins` static route renders. `/game/dice`, `/game/plinko`, `/game/crash` all static. `/game/poker` correctly 404s. `/bonus/free-spins`, `/game/dice`, `/game/plinko` all excluded from their respective `[slug]` dynamic routes via `STATIC_SEGMENT_SLUGS` sets.

**Banned-phrase audit:** zero matches across all touched files for the CLAUDE.md banned-phrase list ("look no further than", "in the world of", "offers many advantages", "revolutionised", "whether you're a seasoned", "stands out from the competition", "perfect choice for", "elevate your gaming", "delve into", "unparalleled", "tapestry of", "ever-evolving landscape", "boasts an impressive", "premier destination"). Checked per commit and at the end.

**Type-check:** no TypeScript errors across the cascade. `npx tsc --noEmit` clean.

---

## 6. Things I decided unilaterally — flag for your review

### 6a. lib/casinos.ts edits beyond your COMMIT 2 list
You listed 5 explicit files for COMMIT 2. I also included `lib/casinos.ts` (3 line edits: BitStarz pro 200→180, Mirax pro rewrite, 7Bit con DELETED) and `lib/compare-content.ts` (cloudbet-vs-bitstarz pair: 3 line BitStarz 200→180 swaps).

Reason: your "every clean number/string swap from the audit" framing implied thoroughness, and these were mechanical-clean. **The 7Bit cons deletion is the one to eyeball** — the "Welcome bonus capped at 1.5 BTC — lower ceiling than some competitors" item was genuinely false post-correction; I removed it without inventing a replacement con. The 7Bit cons array now has 2 items (down from 3): "Live dealer game selection smaller than dedicated live casino platforms" + "Fiat deposit and withdrawal options are limited". If you want a 3rd con added back, I can — but I'd rather not invent one rather than have an inaccurate one.

### 6b. Seven→eight count updates (not in your audit list)
Your audit didn't enumerate the "seven casinos / seven platforms" framing — I found 5 instances across `/best-crypto-pokies-nz`, `/no-limit-withdrawal-casinos`, `/bnb-crypto-casinos`, and `/guides/how-casino-bonuses-really-work`. Updated all to "eight" with Roobet added to the explicit list where applicable. Mechanical fix following the Roobet integration from earlier in this session.

### 6c. /bnb-crypto-casinos line 324 in COMMIT 2 vs lines 228/334 in COMMIT 3
Line 324 was the "five of the seven casinos" count framing — mechanical seven→eight swap with Roobet added to the "doesn't accept BNB" list. Put in COMMIT 2.

Lines 228 (decision card) and 334 (FAQ) had BC.Game value-prop framing that required restructure for the rakeback move. Put in COMMIT 3 per your explicit instruction.

This split looked correct to me but flagging the boundary call.

### 6d. /bonus/welcome-bonus → /bonus/free-spins cross-link
Your Bucket B plan included this as a cross-link option. The `/bonus/welcome-bonus` page is rendered by the dynamic `/bonus/[slug]` template, which doesn't have a "related" section or per-slug link customization. Adding one would touch every `/bonus/*` page (currently 6 of them).

I did NOT add this cross-link in this batch. The `/bonus/free-spins` page has inbound editorial links from `/best-crypto-casinos` (in the methodology section) and inbound auto-renderable links from the bottom related tiles on `/bonus/free-spins` itself pointing back to `/bonus/welcome-bonus` and `/bonus/cashback`.

If you want a structural edit to the `/bonus/[slug]` template to add a "related" section per slug, that's a separate commit and a separate scope decision (since it affects all 6 bonus pages).

### 6e. lib/compare-content.ts bc-game-vs-shuffle pair
This pair had a single passing reference to "BC.Game's tier-based structure" (line 195) that was accurate when BC.Game ran a 4-tier deposit match. Now that BC.Game runs 4 monthly stages with rakeback, "tier-based structure" is still defensible (it's still tier-based, just monthly-stage-tier instead of deposit-tier) — but it's edge-case-true rather than precise.

**I did NOT edit this line.** Flagging because if you want it tightened to "4-stage monthly rakeback structure" instead, that's a one-line follow-up.

### 6f. app/best-crypto-pokies-nz/page.tsx care
This page is currently ranking on Google Canada per CLAUDE.md ("ranking on page 1 of Google Canada"). I touched 3 lines in COMMIT 2:
- Line 184 Mirax summary: rewrite around new figures
- Line 189 7Bit summary: removed "lower than rivals" framing
- Line 266 "seven casinos" → "eight casinos"

Voice and structure preserved. The 184 + 189 rewrites both kept the existing sentence cadence ("X+ titles… The Y welcome package is Z; expect…"). The "currently ranking" status warranted extra care; flagging that I did the edits but you may want to spot-check the live render before pushing.

### 6g. Guides page lines 154-155 not in your explicit list
You listed `app/guides/[slug]/page.tsx lines 153, 294, 315, 316`. I also touched lines 154 (mentions "5 BTC welcome headline" + "25% admin fee", which is still accurate — no edit needed actually) — wait, looking back I confirmed line 154 was already accurate so I didn't edit it. I did edit line 155 ("seven casinos we review" → "eight" + added BC.Game's new rakeback as another example of cleaner-math bonus class) and line 265 (FAQ "seven platforms" → "eight" + Roobet added to the parenthetical list).

Both unilateral; both mechanical seven→eight class.

### 6h. "Most generous match in our top seven" framing in Mirax withdrawal sub-page
This phrase was on the Mirax withdrawal sub-page lead paragraph. Even with the corrected figures (Mirax 5 BTC vs BitStarz 5 BTC), Mirax is no longer "the most generous match" — they're TIED. I changed the framing entirely to "ties Mirax with BitStarz on raw BTC-denominated ceiling" rather than trying to preserve "most generous" in a defensible form.

This was the right editorial call but it's a substantive shift in the page's positioning. Flagging.

---

## What I need from you

One decision: **push the chain?**

If yes:
- `git push origin master` → `d862814..08a4ce7` → Vercel auto-deploy
- 8 commits live, including the catalogue corrections, both `/game/*` promotions, both differentiated, `/game/poker` removed, `/bonus/free-spins` strengthened, and all cascade fixes

If you want changes before push, flag the specific items in §6 you want adjusted and I'll apply.

If you want any of the editorial rewrites in §4 reworded, paste the passage and I'll redo.

Will hold for your call.
