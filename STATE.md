## Current state (updated 2026-06-19)
- Indexed pages: 92 (per GSC Page indexing report)
- Not indexed: 20 (1 crawled-not-indexed failed, 12 intentional /compare 404s aging out, 5 www-canonical redirects, 2 discovered)
- Strongest ranking cluster: BNB queries lifting (bnb casino pos 38, climbing); high-roller cluster on page 1 in Canada
- 5 live /compare pages (deliberately de-templated from 42 on 2026-05-21)
- 5 guides live, all ranking pos 41-62
- 2 new /country/[slug]/legal sub-pages live (Canada, Australia) — shipped this session, not yet indexed

## In flight (started, not finished)
- Legal-by-country guide cluster: diagnostic COMPLETE → Canada + Australia legal sub-pages built & deployed (commit ca7d500), live and verified (HTTP 200, FAQPage schema, primary-source citations). PENDING: manual GSC indexing request for the 2 new URLs + 2 modified hubs. NZ/IE/NO deferred (tested-market pollution — need keyword-research corroboration first); Japan dropped (clean demand but adverse law breaks commercial fit).
- BNB internal-link reinforcement to /bnb-crypto-casinos: COMPLETE — 3 inbound contextual links added (fast-withdrawal-casinos, best-crypto-casinos, best-crypto-for-gambling guide), deployed (commit c1558c5), verified live. PENDING: manual GSC reindex of the 3 host pages.
- 3 reverse-order /compare 301 redirects: COMPLETE — added to next.config.ts (bitstarz-vs-7bit-casino, bitstarz-vs-cloudbet, bitstarz-vs-mirax-casino → live reverse-order canonicals), deployed (commit b46d5a3), verified 308→200. PENDING: manual GSC reindex of the 3 source URLs.

> All three are code-complete and deployed; what remains is user-side manual GSC "Request Indexing" (the gsc MCP has no indexing endpoint).

## Next decided actions
- Monday: bi-weekly brand+intent extension review (per RUNBOOK)
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
