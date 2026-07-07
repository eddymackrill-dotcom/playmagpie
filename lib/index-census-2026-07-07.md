# Index census: 2026-07-07

Live indexed-URL census, built by single-URL inspection over all **87 sitemap URLs** on
2026-07-07 (www host, `sc-domain:playmagpie.com`, parallel single-URL API calls; no batch
endpoint used). Diffs against the 2026-06-11 census (`lib/index-census-2026-06-11.md`).

**Context this census cannot be read without:** the site was hit by the **Google June 2026
spam update** (rolled out 2026-06-24 to 2026-06-26). Site-wide impressions fell from ~750/day
to literal zero from 06-27; live SERP checks on 2026-07-07 confirm flagship rankings
(high-roller Canada page 1, bitstarz-withdrawal pos ~4.8, cloudbet-payment-methods pos 16.8)
are gone from the served top 20-30. **Index membership below is therefore NOT evidence of
ranking**: 82 pages remain indexed but essentially none are being served. The suppression is
a serving-level site demotion; the index churn it caused is small and listed here.

## Summary
- Sitemap URLs: 87 (was 75 on 06-11)
- Indexed ("Submitted and indexed"): **82**
- Crawled - currently not indexed (quality rejection): **3** (was 0 on 06-11)
- URL is unknown to Google: 2 (the two chronic orphans)
- Recrawled on/after 2026-06-24 (during/after the spam update): 37 URLs, of which **35 kept
  indexed status on their post-update crawl**. Google is still crawling normally and mostly
  re-admitting pages; the demotion is in serving, not crawl/index mechanics.

## Cluster breakdown (the load-bearing table)

| Cluster | URLs | Indexed | Not indexed | Non-indexed detail |
|---|---|---|---|---|
| Country hubs | 11 | 11 | 0 | all indexed |
| Brand+intent sub-pages | 11 | 9 | 2 | `/reviews/bitstarz/withdrawal` CRAWLED-NOT-INDEXED; `/reviews/mirax-casino/withdrawal` CRAWLED-NOT-INDEXED |
| Crypto tree | 9 | 9 | 0 | all indexed |
| Intent-modifier listicles | 8 | 8 | 0 | all indexed |
| Game tree | 8 | 7 | 1 | `/game/live-dealer` UNKNOWN |
| Bonus tree | 8 | 7 | 1 | `/bonus/free-spins` UNKNOWN |
| Casino reviews (parents) | 8 | 8 | 0 | all indexed |
| Bitcoin-commercial | 7 | 7 | 0 | all indexed |
| Guides | 6 | 5 | 1 | `/guides/how-crypto-casino-withdrawals-work` CRAWLED-NOT-INDEXED |
| Compare | 6 | 6 | 0 | all indexed |
| Trust/research | 2 | 2 | 0 | all indexed |
| Legal sub-pages | 2 | 2 | 0 | all indexed |
| Home | 1 | 1 | 0 | all indexed |

**Cluster-level reading.** No cluster was gutted from the index. Every commercial cluster the
Helpful-Content risk analysis worried about (bitcoin-commercial x7, country hubs x11,
intent-modifier listicles x8, compare x6, crypto/game/bonus trees) is 100% indexed, including
pages crawled DURING and AFTER the spam update (all 7 bitcoin-commercial pages re-crawled
06-24 to 07-02 and kept). The only quality-rejection drops are **3 withdrawal-intent pages**:
the two oldest brand+intent proof points (`bitstarz/withdrawal`, `mirax-casino/withdrawal`)
and the withdrawal how-to guide. `mirax-casino/withdrawal` was re-crawled 2026-06-29, i.e.
actively re-assessed after the update, then dropped. Everything else in the brand+intent
cluster survived, including the 06-29 `bc-game/payment-methods` page.

**What this says about the classifier:** index membership did not key on cluster or
programmatic-template pattern. If it had, the 7-page bitcoin-commercial set (the most
template-adjacent thing on the site) would show drops; it shows none. The visible damage is
(a) a site-level serving demotion applied roughly uniformly, and (b) a targeted rejection of
withdrawal-intent pages, which were also the site's strongest performers pre-update. For the
recovery plan, the census supports "site-level trust/spam classification" over "specific
cluster got caught", with withdrawal-intent content as the one content-type-level signal.

## FAQ rich results revoked site-wide (new, high-signal)

In the 06-11 census, ~30 pages carried a detected **FAQ** rich result. In this census, **zero
pages do** - including pages whose `lastCrawl` is UNCHANGED since 06-11 (e.g.
`/reviews/bitstarz/kyc` crawled 2026-06-02 showed Breadcrumbs+FAQ then, Breadcrumbs-only now;
same for `/bonus/no-deposit-bonus`, `/reviews/cloudbet/kyc`, others). Review snippets on the
8 parent reviews survived. A rich-result eligibility change without re-crawl is an
assessment-side change on Google's end. Since 2023 Google restricts FAQ rich results to
"well-known, authoritative" sites, so a site-wide FAQ revocation is consistent with a trust
downgrade from the spam update. Tooling caveat: this census reads
`richResultsResult.detectedItems` from the raw API where prior censuses used the MCP's
enhanced inspection; a reporting-shape difference can't be fully excluded, but the
same-crawl-date before/after pairs make revocation the likely reading.

## Diff vs 2026-06-11 census
- **Newly indexed (+13):** all 12 URLs published since (7x `/best-bitcoin-casino-*`,
  `/country/finland`, `/country/australia/legal`, `/country/canada/legal`,
  `/reviews/bitstarz/payment-methods`, `/reviews/bc-game/payment-methods`) plus
  `/research/crypto-casino-bonus-transparency` (was "URL unknown", now indexed, crawled 06-11).
- **DROPPED (-3, all "Crawled - currently not indexed"):**
  | URL | Was (06-11) | Last crawled | Note |
  |---|---|---|---|
  | `/reviews/bitstarz/withdrawal` | Indexed, ranking pos ~4.8 on "bitstarz withdrawal" | 2026-06-07 | Dropped without re-crawl: assessment-side revocation |
  | `/reviews/mirax-casino/withdrawal` | Indexed (the original displacement proof point) | 2026-06-29 | Re-crawled after the spam update, then dropped |
  | `/guides/how-crypto-casino-withdrawals-work` | Indexed | 2026-06-24 | Crawled on update day 1, dropped |
- **Orphan watch-list from 06-11:**
  - `/game/live-dealer`: still "URL is unknown to Google" (never crawled). The 06-11
    contextual-link orphan fix has NOT produced discovery in ~4 weeks. Needs re-diagnosis
    (was the carrier page ever re-crawled?).
  - `/bonus/free-spins`: REGRESSED from "Discovered - currently not indexed" back to "URL is
    unknown to Google". Google has apparently discarded the discovered-but-uncrawled URL.
  - `/crypto`: recovered/indexed at 06-11 with stale crawl; still indexed, still last crawled
    2026-05-26. Holding, but never re-crawled; watch stands.
- **Verdict: index membership grew (+13/-3, 72 to 82) while serving collapsed to zero.** The
  census diff alone would read as a healthy month; it is not. Do not read index growth as
  health while the suppression stands.

## Full per-URL table (87 URLs)
All paths on `https://www.playmagpie.com`. Rich results from the inspection's detected items.

| URL | Coverage state | Last crawled | Rich results |
|---|---|---|---|
| `/` | Submitted and indexed | 2026-06-27 | - |
| `/about` | Submitted and indexed | 2026-06-22 | - |
| `/best-bitcoin-casino-canada` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/best-bitcoin-casino-finland` | Submitted and indexed | 2026-07-02 | Breadcrumbs |
| `/best-bitcoin-casino-germany` | Submitted and indexed | 2026-06-27 | Breadcrumbs |
| `/best-bitcoin-casino-ireland` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/best-bitcoin-casino-new-zealand` | Submitted and indexed | 2026-06-29 | Breadcrumbs |
| `/best-bitcoin-casino-norway` | Submitted and indexed | 2026-06-29 | Breadcrumbs |
| `/best-bitcoin-casino-sweden` | Submitted and indexed | 2026-06-29 | Breadcrumbs |
| `/best-crypto-casinos` | Submitted and indexed | 2026-06-19 | Breadcrumbs |
| `/best-crypto-pokies-nz` | Submitted and indexed | 2026-06-27 | Breadcrumbs |
| `/bnb-crypto-casinos` | Submitted and indexed | 2026-05-30 | Breadcrumbs |
| `/bonus` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/bonus/cashback` | Submitted and indexed | 2026-06-20 | Breadcrumbs |
| `/bonus/free-spins` | URL is unknown to Google | Never | - |
| `/bonus/high-roller-bonus` | Submitted and indexed | 2026-06-25 | Breadcrumbs |
| `/bonus/no-deposit-bonus` | Submitted and indexed | 2026-05-24 | Breadcrumbs |
| `/bonus/reload-bonus` | Submitted and indexed | 2026-06-17 | Breadcrumbs |
| `/bonus/vip-bonus` | Submitted and indexed | 2026-06-25 | Breadcrumbs |
| `/bonus/welcome-bonus` | Submitted and indexed | 2026-07-03 | Breadcrumbs |
| `/compare` | Submitted and indexed | 2026-06-28 | - |
| `/compare/7bit-casino-vs-bitstarz` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/compare/bc-game-vs-shuffle` | Submitted and indexed | 2026-07-02 | Breadcrumbs |
| `/compare/bitstarz-vs-bc-game` | Submitted and indexed | 2026-06-15 | Breadcrumbs |
| `/compare/cloudbet-vs-bitstarz` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/compare/mirax-casino-vs-bitstarz` | Submitted and indexed | 2026-06-09 | Breadcrumbs |
| `/country` | Submitted and indexed | 2026-06-03 | Breadcrumbs |
| `/country/australia` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/country/australia/legal` | Submitted and indexed | 2026-06-20 | Breadcrumbs |
| `/country/canada` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/country/canada/legal` | Submitted and indexed | 2026-06-20 | Breadcrumbs |
| `/country/finland` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/country/germany` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/country/ireland` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/country/japan` | Submitted and indexed | 2026-05-27 | Breadcrumbs |
| `/country/netherlands` | Submitted and indexed | 2026-05-22 | Breadcrumbs |
| `/country/new-zealand` | Submitted and indexed | 2026-06-15 | Breadcrumbs |
| `/country/norway` | Submitted and indexed | 2026-06-27 | Breadcrumbs |
| `/country/sweden` | Submitted and indexed | 2026-06-18 | Breadcrumbs |
| `/crypto` | Submitted and indexed | 2026-05-26 | Breadcrumbs |
| `/crypto-casinos-with-sportsbook` | Submitted and indexed | 2026-06-08 | Breadcrumbs |
| `/crypto/bitcoin` | Submitted and indexed | 2026-06-26 | Breadcrumbs |
| `/crypto/bnb` | Submitted and indexed | 2026-05-20 | Breadcrumbs |
| `/crypto/dogecoin` | Submitted and indexed | 2026-05-24 | Breadcrumbs |
| `/crypto/ethereum` | Submitted and indexed | 2026-07-03 | Breadcrumbs |
| `/crypto/litecoin` | Submitted and indexed | 2026-05-17 | Breadcrumbs |
| `/crypto/solana` | Submitted and indexed | 2026-05-21 | Breadcrumbs |
| `/crypto/usdc` | Submitted and indexed | 2026-05-26 | Breadcrumbs |
| `/crypto/usdt` | Submitted and indexed | 2026-05-15 | Breadcrumbs |
| `/fast-withdrawal-casinos` | Submitted and indexed | 2026-07-04 | Breadcrumbs |
| `/game` | Submitted and indexed | 2026-05-20 | Breadcrumbs |
| `/game/blackjack` | Submitted and indexed | 2026-06-16 | Breadcrumbs |
| `/game/crash` | Submitted and indexed | 2026-05-28 | Breadcrumbs |
| `/game/dice` | Submitted and indexed | 2026-05-30 | Breadcrumbs |
| `/game/live-dealer` | URL is unknown to Google | Never | - |
| `/game/plinko` | Submitted and indexed | 2026-05-30 | Breadcrumbs |
| `/game/roulette` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/game/slots` | Submitted and indexed | 2026-07-03 | Breadcrumbs |
| `/guides` | Submitted and indexed | 2026-06-19 | Breadcrumbs |
| `/guides/best-crypto-for-gambling` | Submitted and indexed | 2026-06-19 | Breadcrumbs |
| `/guides/bitcoin-vs-usdt-casinos` | Submitted and indexed | 2026-06-03 | Breadcrumbs |
| `/guides/do-crypto-casinos-require-kyc` | Submitted and indexed | 2026-06-02 | Breadcrumbs |
| `/guides/how-casino-bonuses-really-work` | Submitted and indexed | 2026-06-20 | Breadcrumbs |
| `/guides/how-crypto-casino-withdrawals-work` | Crawled - currently not indexed | 2026-06-24 | - |
| `/high-roller-casinos` | Submitted and indexed | 2026-06-23 | Breadcrumbs |
| `/no-kyc-casinos` | Submitted and indexed | 2026-06-24 | Breadcrumbs |
| `/no-limit-withdrawal-casinos` | Submitted and indexed | 2026-06-25 | Breadcrumbs |
| `/research/crypto-casino-bonus-transparency` | Submitted and indexed | 2026-06-11 | Breadcrumbs |
| `/reviews/7bit-casino` | Submitted and indexed | 2026-06-25 | Breadcrumbs, Review snippets |
| `/reviews/7bit-casino/withdrawal` | Submitted and indexed | 2026-07-03 | Breadcrumbs |
| `/reviews/bc-game` | Submitted and indexed | 2026-06-24 | Breadcrumbs, Review snippets |
| `/reviews/bc-game/kyc` | Submitted and indexed | 2026-06-27 | Breadcrumbs |
| `/reviews/bc-game/payment-methods` | Submitted and indexed | 2026-06-29 | Breadcrumbs |
| `/reviews/bitstarz` | Submitted and indexed | 2026-06-22 | Breadcrumbs, Review snippets |
| `/reviews/bitstarz/kyc` | Submitted and indexed | 2026-06-02 | Breadcrumbs |
| `/reviews/bitstarz/payment-methods` | Submitted and indexed | 2026-06-22 | Breadcrumbs |
| `/reviews/bitstarz/withdrawal` | Crawled - currently not indexed | 2026-06-07 | - |
| `/reviews/cloudbet` | Submitted and indexed | 2026-06-25 | Breadcrumbs, Review snippets |
| `/reviews/cloudbet/kyc` | Submitted and indexed | 2026-06-02 | Breadcrumbs |
| `/reviews/cloudbet/payment-methods` | Submitted and indexed | 2026-05-30 | Breadcrumbs |
| `/reviews/cloudbet/withdrawal` | Submitted and indexed | 2026-05-30 | Breadcrumbs |
| `/reviews/duelbits` | Submitted and indexed | 2026-06-08 | Breadcrumbs, Review snippets |
| `/reviews/duelbits/withdrawal` | Submitted and indexed | 2026-06-08 | Breadcrumbs |
| `/reviews/mirax-casino` | Submitted and indexed | 2026-06-19 | Breadcrumbs, Review snippets |
| `/reviews/mirax-casino/withdrawal` | Crawled - currently not indexed | 2026-06-29 | - |
| `/reviews/roobet` | Submitted and indexed | 2026-06-27 | Breadcrumbs, Review snippets |
| `/reviews/shuffle` | Submitted and indexed | 2026-06-17 | Breadcrumbs, Review snippets |

## Watch-list for next census
1. The 3 withdrawal-intent drops: do they return to the index after content/trust remediation,
   or does the rejection spread to the surviving withdrawal pages
   (`7bit-casino/withdrawal` was re-crawled 2026-07-03 and KEPT: track it specifically)?
2. FAQ rich results: do they return anywhere? Their return is probably the earliest visible
   signal of trust restoration, ahead of rankings.
3. `/game/live-dealer` + `/bonus/free-spins`: orphan pair, now both "unknown". Re-run the
   starvation diagnostic; the 06-11 fix did not take.
4. Serving status: this census records INDEX state only. Pair the next census with 2-3 live
   SERP spot checks (high-roller CA, bitstarz withdrawal, cloudbet payment methods) so
   recovery is measured at the serving layer where the damage is.
