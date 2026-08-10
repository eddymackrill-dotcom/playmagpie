# Batch 2c + 2d: approved drafts, held for the recrawl gate

Committed 2026-08-10. The Part 2 gate check found NO Google recrawl of any
Batch 1 or 2a page (all 17 URLs exactly on their baselines), so per the
owner's gate rule only 2b shipped this session. **2c and 2d execute from
this file, without redrafting, when EITHER (a) any Batch 1 country page
shows a Google crawl date >= 2026-08-07, or (b) 2026-08-21 (Checkpoint B)
arrives, whichever is first.** Checkpoint B's stop condition still applies:
if none of Sweden/Netherlands/Australia has recrawled by 21 Aug, the
programme stops and the failure is reported instead.

Execution mechanics for both: Batch 1/2a commit-pair discipline (data
layer verbatim + behaviour-neutral with TS2741 deletion test and byte-diff
spot-check, then copy with `modified`/floor-map bumps), pre-commit gates
(em-dash 0, banned phrases 0, single suffix, title != h1, titles <=60
where achievable, metas <=160, build green), live spot-checks + sitemap
date verification after deploy, one workflow_dispatch list per sub-batch.

Bing exposure re-checked against the committed 2026-08-07 baseline CSVs on
2026-08-10: zero rows for every 2c and 2d URL except `/high-roller-casinos`
(10 imp, pos 7.7), which is excluded from 2d scope (below).

## 2c: compare/[slug], 6 pairs

Structure: the allowlist currently lives duplicated in
`app/compare/[slug]/page.tsx` (COMPARE_ALLOWLIST) and `app/sitemap.ts`
(comparisonAllowlist). Commit 1 unifies it: one `as const` export from
`lib/compare-content.ts`, Record keyed on the pair union, route +
sitemap both import it (kills the documented mirror-drift risk), per-pair
`modified` feeding the sitemap. The hero H1 stays the plain
"{A} vs {B}" (it is the natural comparison hero and already differs from
every title below); titles and metas go per-pair, verdict-led.

Swap test applied: swapping EITHER operator name breaks each sentence.

| Pair | title | meta (<=160) |
|---|---|---|
| bitstarz-vs-bc-game | `BitStarz vs BC.Game: Match Structure or Rakeback Model` (55) | `No single winner: BitStarz suits BTC players who want the 5 BTC match-plus-spins pack; BC.Game suits altcoin holders at a $5 minimum. The structural split.` (152) |
| cloudbet-vs-roobet | `Cloudbet vs Roobet: Trust Gap vs the Originals Suite` (52) | `Cloudbet for most players: trust 8.7 against 6.8, no withdrawal limits once verified. Roobet answers with Crash and Originals. Where each case actually holds.` (156) |
| cloudbet-vs-bitstarz | `Cloudbet vs BitStarz: Sportsbook Reach or Casino Legacy` (55) | `The split: Cloudbet brings the sportsbook and verified no-limit cashouts; BitStarz the cleaner casino-only pick with the 5 BTC welcome. Which fits your play.` (155) |
| 7bit-casino-vs-bitstarz | `7Bit vs BitStarz: Privacy Posture Against Bonus Muscle` (54) | `7Bit is the pick when document-light play decides it; BitStarz brings the bigger BTC welcome and the louder brand. Both 12-year operators, 0.4 apart on trust.` (156) |
| bc-game-vs-shuffle | `BC.Game vs Shuffle: Scores vs the SHFL Token Layer` (50) | `BC.Game wins every scoring dimension we publish; Shuffle counters with SHFL token rewards the scores do not capture. Which model pays for your play style.` (152) |
| mirax-casino-vs-bitstarz | `Mirax vs BitStarz: Same 5 BTC Ceiling, Different Shape` (54) | `Both packs top out at 5 BTC over four deposits; Mirax front-loads 1.5 BTC + 100 spins on D1, BitStarz spreads 180 spins. History is the real difference.` (150) |

Sourcing notes: every clause traces to the pair's own `compareContent`
verdict or scores (trust 8.7/6.8, withdrawal 9.0/6.5, 5 BTC ceilings,
D1 front-load 1.5 BTC + 100 spins, 12-year track records, SHFL model,
$5 minimum). The 7Bit line deliberately says "privacy posture" and
"document-light", never "no KYC at any amount": the absolutism was
retracted 2026-08-01 and new copy must not reintroduce it. Same for
BC.Game (its clause leads on altcoin breadth and the $5 minimum, not KYC).

Dispatch after 2c ships: one run, 6 URLs.

## 2d: statics, 6 pages, single commit

Direct in-file title/H1/meta edits + `lib/route-lastmod.ts` bumps (no
Record: approved deviation, these are one-off pages with no interpolation).

**Scope decision (autonomous, logged): IN = best-crypto-casinos,
fast-withdrawal-casinos, no-kyc-casinos, best-crypto-pokies-nz,
best-bitcoin-casino-canada, crypto-casinos-with-sportsbook. OUT =
/high-roller-casinos (CLAUDE.md flagship leave-it-alone rule, and the only
candidate with live Bing exposure: 10 imp pos 7.7 in the baseline CSVs) and
/bnb-crypto-casinos (title tail already differentiated, "Fast, Cheap, Smart
Chain"; the BNB cluster had faded for two straight weeks pre-crash).**
The plan's "statics 6" count implied two exclusions without naming them;
these two are the lowest-gain highest-risk pair on the board.

Ranking phrases preserved: "best crypto casinos", "fastest withdrawal",
"no-kyc casinos", "crypto pokies" + NZ, "bitcoin casino canada" all stay
contiguous in their titles.

| Page | title | h1 | meta (<=160) |
|---|---|---|---|
| /no-kyc-casinos (APPROVED SET, ships unchanged) | `No-KYC Casinos: Where the Document Thresholds Actually Sit` (59) | `No-KYC Crypto Casinos, Honestly Ranked: Thresholds Included` | `The no-KYC label usually ends at a threshold: EUR 2,000 equivalent at the operators we have verified against live terms. Where anonymity actually stops, casino by casino.` (159) |
| /best-crypto-casinos | `Best Crypto Casinos, Ranked on Payouts, Terms and Trust` (55) | `The Best Crypto Casinos, Ranked by What We Can Verify` | `Eight operators ranked on withdrawal speed, bonus terms and KYC posture, BTC to SOL. Trust-scored from published terms and complaint records, not ad spend.` (154) |
| /fast-withdrawal-casinos | `Fastest Withdrawal Crypto Casinos: Published Windows Ranked` (59) | `Fast Withdrawal Casinos: Ranked on the Windows Operators Publish` | `Payout speed ranked from each operator's published window, instant-to-5-minutes at the front. What the fastest cashiers do differently and what slows the rest.` (158) |
| /best-crypto-pokies-nz | `Crypto Pokies for NZ Players: Slot Libraries Compared` (53) | `Crypto Pokies in New Zealand: Library Size, Providers, NZD On-Ramps` | `Slot libraries from 3,000 to 10,000+ titles compared for New Zealand players: providers, provably-fair originals and NZD-friendly crypto deposit routes.` (151) |
| /best-bitcoin-casino-canada | `Best Bitcoin Casino Canada: Ranked, With the Ontario Catch` (58) | `Bitcoin Casinos for Canada: One Ontario Carve-Out, Ranked Around It` | `All 8 reviewed casinos take Canadian Bitcoin players; Roobet alone restricts Ontario by name. Ranked by trust, with the provincial detail and the CRA tax note.` (157) |
| /crypto-casinos-with-sportsbook | `Crypto Casinos With a Real Sportsbook: Five Operators Ranked` (60) | `Sportsbook Crypto Casinos: The Five That Actually Run a Book` | `Five of our eight operators run a real sportsbook beside the casino: Cloudbet, Roobet, BC.Game, Shuffle and Duelbits. Trust-ranked, with per-operator notes.` (155) |

Sourcing notes: the no-kyc set is the plan-record approved set (EUR 2,000
figure owner-primary verified for the named operators; it REPLACES the
current live meta, which still reads "sign up, deposit and withdraw without
submitting documents", making this the one liability fix in 2d). "Eight
operators" is the established catalogue count. "Instant-to-5-minutes" is
Duelbits, the catalogue's fastest published window. "3,000 to 10,000+" are
the strip's existing library figures. The Canada Roobet/Ontario claim is
terms-verified (s3.5). The sportsbook five are the page's own list. The
Ontario-catch title tail and the Canada meta shape survive from the current
page (already distinctive); the current Canada meta runs ~199 chars and is
trimmed to 157 in passing.

Dispatch after 2d ships: one run, 6 URLs.
