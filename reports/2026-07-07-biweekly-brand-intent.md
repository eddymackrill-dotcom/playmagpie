# Bi-weekly brand+intent review: 2026-07-07 (due 07-06)

Window caveat: GSC is dark from 06-26 (serving suppression, see 2026-07-07-weekly.md). Reads
below use the last clean 14 days (2026-06-12 to 06-25) plus today's index census. No position
data exists after 06-25; "current status" means index status as of today.

## Categorisation (11 sub-pages)

| Sub-page | Pre-update read (06-12..25) | Category | Index status today |
|---|---|---|---|
| cloudbet/payment-methods | target q pos 16.5 (26 imp); parent absent | working | indexed |
| bitstarz/withdrawal | pos 35.1 vs parent 46.8 (97 v 73 imp) | working | **DEINDEXED** |
| bitstarz/kyc | pos 20.8-24.8; parent not surfacing kyc | working | indexed |
| cloudbet/kyc | pos 23.1 vs parent 31.7 | working | indexed |
| cloudbet/withdrawal | pos 33.2 vs parent 36.6 | working | indexed |
| 7bit-casino/withdrawal | pos 25.2; parent silent | working | indexed (kept on 07-03 re-crawl) |
| mirax-casino/withdrawal | 0 impressions all window | dark | **DEINDEXED** (re-crawled 06-29, dropped) |
| bc-game/kyc | 0 impressions all window | dark | indexed |
| bitstarz/payment-methods | 0 impressions (young) | dormant | indexed |
| bc-game/payment-methods | shipped 06-29 into the suppression | unreadable | indexed |
| duelbits/withdrawal | pos 45.9 vs parent 40.3: inversion persists | unexpected | indexed |

Pattern note: 6 of 9 readable pages still held the displacement pattern in the final clean
window. The two DEINDEXED pages are the two oldest proof points, both withdrawal-intent, and
mirax/withdrawal had already gone impression-dark BEFORE the update window. Whatever hit
withdrawal-intent content, bitstarz/withdrawal was still winning its query days before being
dropped, so the drop is not explained by page-level performance decay alone.

## Duelbits/withdrawal inversion diagnostic (deferred from 06-22, run today)

1. GSC: 28 imp/14d on the page, of which 12 are the junk exact-phrase query at pos 3.5. Real
   intent volume is ~16 imp/14d: very thin, and the target query sits pos 45.9 vs parent 40.3.
2. Page inspection: canonical clean (self-referencing, Google agrees), indexed, title/H1
   intent-matched ("Duelbits Withdrawal: Under 5 Minutes, No KYC, 12 Coins").
3. Internal links: 2 inbound sources (fast-withdrawal-casinos, parent review template) vs 4
   for bitstarz/withdrawal. The missing 2 are cross-links from sibling sub-pages (kyc,
   payment-methods) that Duelbits does not have. Structural, mild.
4. Refusal-rule check: page premise remains genuine (fastest payouts in catalogue).
5. Verdict: **thin-demand non-settlement plus a mild structural link deficit.** No
   misconfiguration found. Remediation options (add a Duelbits sibling sub-page, or add 1-2
   contextual links from same-batch-modified pages) are MOOT under the suppression: Google is
   not serving either page. Park until serving resumes; then re-read before any fix.

## Candidate extensions

**None proposed.** Demand data is unreadable post-06-25 and the site is not being served;
building into a suppression wastes both content and the measurement window. The payment-methods
holds (Shuffle MED, Duelbits MED-blocked, 7Bit LOW, Mirax LOW, Roobet REFUSED) stay as-is.
Next review: first bi-weekly Monday after GSC shows 7+ consecutive days of non-zero impressions.
