## Current state (updated 2026-06-22)
- Indexed pages: 92 (per GSC Page indexing report) — +1 new URL deployed 2026-06-22 (/reviews/bitstarz/payment-methods), not yet indexed
- Not indexed: 20 (1 crawled-not-indexed failed, 12 intentional /compare 404s aging out, 5 www-canonical redirects, 2 discovered)
- Strongest ranking cluster: BNB queries lifting (bnb casino pos 38, climbing); high-roller cluster on page 1 in Canada
- 5 live /compare pages (deliberately de-templated from 42 on 2026-05-21)
- 5 guides live, all ranking pos 41-62
- 2 new /country/[slug]/legal sub-pages live (Canada, Australia) — indexing requested 2026-06-19, awaiting Google processing

## In flight (started, not finished)
- (none code-complete and unfinished — see "Awaiting Google processing" below)

## Awaiting Google processing (deployed + indexing requested; no further action until Google responds)
- **PENDING MANUAL INDEXING REQUEST** — /reviews/bitstarz/payment-methods: brand+intent extension built & deployed 2026-06-22 (commits f9f394c page + 024e452 bookkeeping), live and verified (HTTP 200, FAQPage + BreadcrumbList schema, all facts to lib/casinos.ts, sitemap includes slug). Demand: GSC "bitstarz minimum deposit" pos 37 + DataForSEO ~30/mo deposit/payment family. Parent /reviews/bitstarz modified (down-link added) so it should re-crawl. **Action for Eddy: submit GSC indexing request (www host) for the new URL + the modified /reviews/bitstarz parent**, then move this line down to the indexed-requested group.
- Legal-by-country guide cluster: Canada + Australia legal sub-pages built & deployed (commit ca7d500), live and verified (HTTP 200, FAQPage schema, primary-source citations). Indexing requested 2026-06-19 for the 2 new URLs + 2 modified hubs, awaiting Google processing. NZ/IE/NO deferred (tested-market pollution — need keyword-research corroboration first); Japan dropped (clean demand but adverse law breaks commercial fit).
- BNB internal-link reinforcement to /bnb-crypto-casinos: 3 inbound contextual links added (fast-withdrawal-casinos, best-crypto-casinos, best-crypto-for-gambling guide), deployed (commit c1558c5), verified live. Indexing requested 2026-06-19 for the 3 host pages, awaiting Google processing.
- 3 reverse-order /compare 301 redirects: added to next.config.ts (bitstarz-vs-7bit-casino, bitstarz-vs-cloudbet, bitstarz-vs-mirax-casino → live reverse-order canonicals), deployed (commit b46d5a3), verified 308→200. Indexing requested 2026-06-19 for the 3 source URLs, awaiting Google processing.

## Next decided actions
- 2026-06-22 bi-weekly brand+intent review: DONE. Built bitstarz/payment-methods (MED, proven template + highest-traffic casino). Deferred bc-game/withdrawal (#2, LOW — no withdrawal demand yet). Held bitstarz/bonus (#3) for 06-30 recheck.
- Next bi-weekly brand+intent review: 2026-07-06 (every other Monday). Includes the duelbits/withdrawal inversion remediation (run the "ranking poorly" diagnostic — see CLAUDE.md audit list).
- 2026-06-30: review check due (/reviews/bitstarz/bonus deferral re-check — CLAUDE.md audit list)
- Quarterly pollution baseline re-eval: 2026-07-15 (only if VPN testing frozen ≥14 days prior, else skip — per lib/pollution-baseline.md)
- First Monday of July: monthly structural audit (per RUNBOOK) — includes BNB Beacon Chain verification

## Open questions / parked
- BNB Beacon Chain decommission status — verify at monthly audit (low priority); affects the "send BEP-20 not Beacon Chain" warning on /crypto/bnb + /bnb-crypto-casinos
- Legal cluster expansion to NZ/IE/NO — blocked on external demand corroboration (pollution); Japan permanently parked (adverse law)

## Decisions log (APPEND-ONLY — never delete entries)
- 2026-05-21: Deliberately de-templated /compare from 42 pairs to 5 hand-written (Helpful-Content fix). No redirects added. Resulting 404s are EXPECTED, not bugs — will age out.
- 2026-06-19: Refused new BNB page (cannibalisation — 3 BNB pages already cover the intent). Did internal-link reinforcement instead.
- 2026-06-19: Refused safety/trust guide (demand is contested-head "are crypto casinos legit", high GEO zero-click risk, our evidence already lives on review pages).
- 2026-06-19: Identified legal-by-country as strongest validated guide demand (CA/JP clean signal, AU/DE/NZ/IE pollution-discounted). Pursuing via proper diagnostic.
- 2026-06-19: Added 3 reverse-order /compare 301 redirects to live canonicals (recovering ~29 imp of stranded ranking); other 37 dropped pairs left to age out as intended.
- 2026-06-19: Built /country/[slug]/legal sub-pages for Canada + Australia (new allowlisted route). Every legal/tax claim verified to primary source. Japan dropped despite clean demand (illegal/prosecutable → breaks commercial model + editorial integrity).
- 2026-06-20: Manual GSC indexing requests submitted for all three 2026-06-19 deploys — legal sub-pages (2 new URLs + 2 modified hubs), 3 BNB host pages, 3 redirect source URLs. Moved from "In flight/PENDING" to "Awaiting Google processing". No further action until Google responds.
- 2026-06-22: Bi-weekly brand+intent review. All 7 sub-pages still hold the displacement pattern (sub-page ≥ parent on target query); cloudbet/payment-methods strongest at pos 16.8, making payment-methods the best-ranking template. Built /reviews/bitstarz/payment-methods as the single extension (deployed f9f394c). One anomaly logged to audit list: duelbits/withdrawal ranks BELOW its parent (47.2 vs 39.0) — remediation, not a new build. Site-wide cosmetic flagged: doubled "| PlayMagpie" title suffix on payment-methods pages (pre-existing template pattern, present on the ranking Cloudbet page too — not fixed, logged for a global title-template pass).
