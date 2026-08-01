# Batch review — 2026-06-08 (autonomous build)

Built autonomously per the four approved work items while you were away. All pushed to
`origin/master`. This file is your spot-check artifact: every operator claim and its
`lib/casinos.ts` source, what was omitted as unverifiable, the Dogecoin before/after,
build/banned-phrase status, and unilateral calls.

## Commits (pushed: `4e7e8e2..0b83b0a`)

| Hash | Work item |
|------|-----------|
| `0d4583b` | WI-1: CLAUDE.md refusal-rule clarification (structural, not thin demand) + dated log entry |
| `9104b93` | WI-2: Strengthen `/crypto/dogecoin` (commercial table, no split) |
| `2150ff6` | WI-3: New `/crypto-casinos-with-sportsbook` + carrier links + sitemap |
| `24ddac8` | WI-4: New `/reviews/duelbits/withdrawal` + carrier + sitemap |
| `0b83b0a` | Cache the sportsbook DataForSEO batch in `lib/keyword-research.md` |

## Build + quality status
- **Build:** clean before EVERY commit; final full build clean — `✓ 84 static pages`.
- **Banned phrases:** scanned all three touched content files (`crypto/[slug]`, `crypto-casinos-with-sportsbook`, `reviews/[slug]/withdrawal`) → **0 occurrences** each.
- **Zero invented facts:** every operator claim traces to `lib/casinos.ts` (enumerated below). Where the catalogue doesn't document a figure, it was omitted, not filled.

## Production URLs to spot-check
- https://www.playmagpie.com/crypto/dogecoin (strengthened — commercial table leads)
- https://www.playmagpie.com/crypto-casinos-with-sportsbook (new)
- https://www.playmagpie.com/reviews/duelbits/withdrawal (new)
- Carriers (should show new contextual links): https://www.playmagpie.com/reviews/cloudbet , /reviews/roobet (→ sportsbook), /reviews/duelbits (→ withdrawal deep-dive)

---

## WI-2 — `/crypto/dogecoin` strengthen

**Before:** H1 → informational intro ("Gambling with Dogecoin") → CTA strip → 8-casino card grid → back link.
**After:** H1 → CTA strip → **NEW commercial comparison table** (all 8 DOGE casinos, sorted by trust) → 8-casino card grid → informational intro ("How Dogecoin behaves at crypto casinos") **moved below** → back link.

- **Not split** into `/dogecoin-crypto-casinos` (approved decision; BNB split is inverted and `/crypto/dogecoin` already outranks that experiment). DOGE-only via `isDOGE` guard — the other 7 coin pages are byte-for-byte unchanged in behaviour.
- **Comparison table cells** are direct field reads from each casino object — `name`, `withdrawalTime`, `minDeposit`, `kycLevel`, `trustScore` — so they are inherently catalogue-sourced. "Accepts DOGE ✓" is the table's inclusion filter (all 8 have `DOGE` in `acceptedCryptos`).
- **Honesty footnote (added):** "Withdrawal window is each operator's general crypto-cashier processing time … we do not publish a separate per-coin DOGE timing." → I did **not** invent DOGE-specific per-operator withdrawal speeds; the column is the general window, flagged as such.
- The pre-existing DOGE intro paragraph (network facts like ~1-min confirmation) was **left unchanged** and relocated, not rewritten — no new network claims added.
- CTA strip unchanged (existing top-3-by-trust DOGE: BitStarz 9.2, BC.Game 8.9, 7Bit 8.8 — all accept DOGE, no override needed).

## WI-3 — `/crypto-casinos-with-sportsbook` (new)

**Sportsbook-operator identification:** there is no typed `sportsbook` field in `lib/casinos.ts`. The 5 operators were identified from catalogue prose (cited below) and hardcoded in `SPORTSBOOK_SLUGS` with a source comment. Every per-operator claim:

| Operator | Claim used | `lib/casinos.ts` source |
|----------|-----------|--------------------------|
| Cloudbet | "best-in-class for crypto betting" | `reviewSummary`: "The sportsbook is among the best-in-class for crypto betting." |
| Cloudbet | "hundreds of markets" | `pros`: "Excellent sportsbook with crypto betting across hundreds of markets" |
| Cloudbet | "no withdrawal limits" | `pros`: "No withdrawal limits — critical for high-roller play" |
| Cloudbet | "dual Curaçao + Kahnawake" | `licence`: "Curaçao eGaming + Kahnawake Gaming Commission" |
| Cloudbet | "0.001 BTC equivalent minimum" | `minDeposit`: "0.001 BTC equivalent" |
| Roobet | "full crypto sportsbook covering ~40 sports including esports" | `pros`: "Full crypto sportsbook covering ~40 sports including esports…" |
| Roobet | "Chelsea FC (LatAm + Canada outside Ontario) and 100 Thieves" | `pros` / `reviewSummary` (verbatim) |
| Roobet | "withdrawal holds … $20k, $84k, $97k, $111k, $115k … $84,000 Unsolved" | `cons` (verbatim) |
| Roobet | "lowest trust score" | `trustScore`: 6.8 (lowest of the 5) |
| BC.Game | "full sportsbook" | `reviewSummary`: "a full sportsbook"; `pros`: "…live dealer and sports" |
| BC.Game | "100+ cryptocurrencies" | `acceptedCryptos` (ends "100+ more"); `reviewSummary` |
| BC.Game | "no-KYC, no documents at any withdrawal size" | `kycLevel`: None; `pros`: "Strict no-KYC policy…" |
| BC.Game | "$5 minimum" | `minDeposit`: "$5" |
| Shuffle | "crypto casino and sportsbook launched in 2022" | `reviewSummary` (verbatim) |
| Shuffle | "native SHFL token and rakeback" | `reviewSummary` / `pros` |
| Shuffle | "Curaçao licence, Light KYC" | `licence`; `kycLevel`: Light |
| Duelbits | "casino and sportsbook launched in 2020" | `reviewSummary` (verbatim) |
| Duelbits | "instant to 5 minutes (fastest)" | `withdrawalTime`: "Instant to 5 minutes" |
| Duelbits | "no-KYC for crypto play" | `kycLevel`: None; `pros` |
| Duelbits | "up to $30 weekly cashback + Originals" | `bonusSummary` / `reviewSummary` |

- **Stats row:** "5 of 8" (SPORTSBOOK_SLUGS vs `casinos.length`), "Hundreds — Cloudbet" (pros), "<5 min — Duelbits" (`withdrawalTime`), "$5 — BC.Game" (`minDeposit`).
- **CTA strip:** top-3-by-trust among the 5 → **BC.Game (8.9), Cloudbet (8.7), Duelbits (8.5)**. See unilateral call #2 on Roobet's exclusion.
- **OMITTED as unverifiable:** BC.Game / Shuffle / Duelbits specific sport counts or market numbers — the catalogue documents none, so they got "full sportsbook" / "casino and sportsbook" framing rather than fabricated figures. Only Cloudbet ("hundreds of markets") and Roobet ("~40 sports") have documented quantities, and only those were stated.
- FAQ (5) + FAQPage schema; all FAQ claims mirror the table above.
- **Carrier:** contextual `relatedLists` link added to `/reviews/cloudbet` and `/reviews/roobet` (last crawled 06-03 / 06-02 — freshest review pages, modified this commit). Sitemap entry added (`priority 0.8`).

## WI-4 — `/reviews/duelbits/withdrawal` (new)

Every claim:

| Claim | `lib/casinos.ts` source |
|-------|--------------------------|
| "instant to 5 minutes — fastest headline window" | `withdrawalTime` "Instant to 5 minutes" vs all others' `withdrawalTime` (BitStarz under-10, 7Bit/BC.Game instant-10, Mirax instant-15, Cloudbet instant-30) |
| "9.2/10 withdrawal score" | `withdrawalScore`: 9.2 |
| "no-KYC, basic checks only / 9.3 KYC score" | `kycLevel`: None; `pros`: "basic checks only"; `kycScore`: 9.3 |
| "12 coins: BTC, ETH, LTC, USDT, USDC, DOGE, SOL, BNB, BCH, XRP, TRX, MATIC" | `acceptedCryptos` (verbatim, 12 entries) |
| coin counts BitStarz 6 / Mirax 7 / 7Bit 8 / Cloudbet 10 | `acceptedCryptos` lengths |
| "cashback-first, up to $30 weekly + Originals" | `bonusSummary` / `reviewSummary` |
| "BitStarz deducts a 25% admin fee on bonus-derived withdrawals" | BitStarz `cons`: "25% admin fee deducted from bonus-related withdrawals" |
| "7Bit no-KYC since 2014 / Duelbits 2020 launch" | 7Bit `reviewSummary` (2014); Duelbits `reviewSummary` (2020) |
| "Curaçao (Antillephone N.V.), no Tier-1 regulator" | `licence`: "Curacao (Antillephone N.V.)" |

- **Network-speed claims** (SOL/TRX/MATIC settle in seconds, BTC mempool-gated): general crypto-network facts, **consistent with the existing withdrawal sub-pages** (7Bit/Mirax/Cloudbet pages make identical framing). These are network properties, not operator claims — flagged here for transparency.
- **FAQ 4 ("bonus admin fee?")**: deliberately did **not** claim "zero withdrawal fees" — the catalogue documents no casino-side per-coin Duelbits fee, so the FAQ states: "We don't have a documented casino-side per-coin withdrawal fee figure for Duelbits to quote." Honest omission.
- No name-swap templating: distinct lead (fastest-payout + no-KYC + cashback-clean) vs the other four withdrawal pages.
- **Carrier:** contextual deep-dive link added to the purpose-built `casinoSubPages` record for the Duelbits main review (last crawled **05-19** — modifying it triggers re-crawl per the crawl-discovery rule). Sitemap slug added.

---

## Unilateral calls (flagged for your review)

1. **Sportsbook strip excludes Roobet.** Strict top-3-by-trust = BC.Game/Cloudbet/Duelbits. Roobet has the most *sports-specific* catalogue content (~40 sports, Chelsea/100 Thieves) but the lowest trust (6.8) **and** a documented withdrawal-hold record — so it would be a poor "top pick" in a trust-anchored strip. I kept strict trust order (no override needed since all 3 top-trust ops have sportsbooks) and gave Roobet honest full-body coverage including the withdrawal caveat. **If you'd rather feature Roobet's sports breadth in the strip, that's a curation change to make.**

2. **Sportsbook carrier scoped to Cloudbet + Roobet only** (per your instruction), not all 5 sportsbook operators. Low-risk future enhancement: extend the contextual link to BC.Game / Shuffle / Duelbits reviews too for more inbound equity. Not done — stayed within the instruction.

3. **Dogecoin implementation choices** (the strengthen itself was approved): custom inline comparison table (not the shared `CasinoComparisonTable` component) so I could control the exact columns + add the honesty footnote; intro relocated below via `isDOGE` conditional rather than rewritten.

4. **Duelbits withdrawal carrier via `casinoSubPages`** (the purpose-built per-casino deep-dive record with natural anchor text) rather than the `relatedLists` tiles I'd originally proposed — `casinoSubPages` is the established, more contextual mechanism (it already links the other 4 withdrawal sub-pages).

5. **Affiliate `rel` on the sportsbook page's raw `<a>` tags** = `noopener noreferrer nofollow sponsored` (full `nofollow sponsored`), which also resolves the consistency gap the audit list flagged on `/bnb-crypto-casinos` (that page uses `sponsored` only). New page ships correct.

## Open follow-ups (not actioned — for your call)
- The `/bnb-crypto-casinos` outbound-`rel` inconsistency (audit list item) remains on that page; only the new sportsbook page was written correct.
- Sportsbook carrier could extend to the other 3 operators (call #2).
- DataForSEO June spend now **$0.15** (2 calls); logged in `lib/keyword-research.md`.
