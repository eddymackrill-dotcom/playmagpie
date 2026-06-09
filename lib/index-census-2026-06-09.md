# Index census — 2026-06-09

Live indexed-URL baseline, built by single/batch URL Inspection over **all 74 sitemap
URLs** on 2026-06-09 (www host, `sc-domain:playmagpie.com`). Saved so the monthly
structural audit can do a **measured membership diff** (growing vs churning) instead of
inferring it.

**Method note:** the GSC API does not expose the Page Indexing aggregate report, so this
census is reconstructed from per-URL inspection of the sitemap universe (74 URLs). It does
NOT include non-sitemap URLs Google may know (e.g. `/privacy`, `/terms`, `/contact`,
`/icon.png`, apex/duplicate variants) — those can't be enumerated via the API.

**Caveat:** the batch URL-inspection endpoint can disagree with single-URL inspection on
edge cases. Here, batch reported `/bonus/free-spins` as "Discovered – not indexed" while the
authoritative single-URL inspection the same day said "URL is unknown to Google." Single-URL
wins (per the GSC MCP gotchas in CLAUDE.md / RUNBOOK). Either way it is not indexed.

## Summary
- **Sitemap URLs:** 74
- **Indexed ("Submitted and indexed"):** 70
- **Not indexed:** 4
- Google's sitemap-report `indexed_urls` field said 68, but it was last downloaded 2026-05-30 (lagged — predates the KYC batch, the sportsbook/duelbits batch, and the Roobet pickup). The live census (70) supersedes it.

## Not indexed (the gap) — 4 URLs
| URL | State | Last crawled | Class |
|---|---|---|---|
| `/bonus/free-spins` | URL unknown to Google (single-URL authoritative; batch said "Discovered") | Never | Discovery — undiscovered (hub not re-crawled since tile added); manual nudge in progress |
| `/compare/mirax-casino-vs-bitstarz` | Discovered – currently not indexed | Never | Crawl-queue lag — discovered via /compare hub tile, awaiting crawl. NOT orphaned. |
| `/game/live-dealer` | Discovered – currently not indexed | Never | Crawl-queue lag — discovered via /game hub tile, awaiting crawl. NOT orphaned. |
| `/crypto` | **Crawled – currently not indexed** | 2026-05-26 | **Content quality** — fetched and declined (thin nav hub). Likely dropped after a prior pos-65 impression. |

## Indexed set (70 URLs) — baseline membership for next month's diff
```
/
/about
/best-crypto-casinos
/best-crypto-pokies-nz
/bnb-crypto-casinos
/bonus
/bonus/cashback
/bonus/high-roller-bonus
/bonus/no-deposit-bonus
/bonus/reload-bonus
/bonus/vip-bonus
/bonus/welcome-bonus
/compare
/compare/7bit-casino-vs-bitstarz
/compare/bc-game-vs-shuffle
/compare/bitstarz-vs-bc-game
/compare/cloudbet-vs-bitstarz
/country
/country/australia
/country/canada
/country/germany
/country/ireland
/country/japan
/country/netherlands
/country/new-zealand
/country/norway
/country/sweden
/crypto-casinos-with-sportsbook
/crypto/bitcoin
/crypto/bnb
/crypto/dogecoin
/crypto/ethereum
/crypto/litecoin
/crypto/solana
/crypto/usdc
/crypto/usdt
/fast-withdrawal-casinos
/game
/game/blackjack
/game/crash
/game/dice
/game/plinko
/game/roulette
/game/slots
/guides
/guides/best-crypto-for-gambling
/guides/bitcoin-vs-usdt-casinos
/guides/do-crypto-casinos-require-kyc
/guides/how-casino-bonuses-really-work
/guides/how-crypto-casino-withdrawals-work
/high-roller-casinos
/no-kyc-casinos
/no-limit-withdrawal-casinos
/reviews/7bit-casino
/reviews/7bit-casino/withdrawal
/reviews/bc-game
/reviews/bc-game/kyc
/reviews/bitstarz
/reviews/bitstarz/kyc
/reviews/bitstarz/withdrawal
/reviews/cloudbet
/reviews/cloudbet/kyc
/reviews/cloudbet/payment-methods
/reviews/cloudbet/withdrawal
/reviews/duelbits
/reviews/duelbits/withdrawal
/reviews/mirax-casino
/reviews/mirax-casino/withdrawal
/reviews/roobet
/reviews/shuffle
```

## How to diff next month
1. Re-run the same all-sitemap-URL census (batch URL inspection, 8 batches of ~10).
2. Compare the indexed set against the 70 URLs above:
   - **Added** (new ∈ indexed, ∉ baseline) → growth.
   - **Dropped** (∈ baseline, now NOT indexed) → churn. Any drop here is the real signal.
3. If dropped > 0, that confirms churning and each dropped URL needs investigation. If added > 0 and dropped == 0, growth is confirmed as a measured fact.
4. Watch `/crypto` specifically — if `/game` and/or `/bonus` hubs join it in "Crawled – not indexed," the thin-hub problem has generalised (see the follow-up audit item in CLAUDE.md).
