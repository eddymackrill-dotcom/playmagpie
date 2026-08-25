import { CRYPTO_LIST } from './programmatic'

// Per-coin editorial shell (Batch 2b de-templating; same design as
// lib/country-content.ts and the bonus editorial in lib/bonus-content.ts).
// Until this file, the five non-BNB /crypto/[slug] pages interpolated one
// noun into fixed strings ("Best {name} Casinos 2026" as both title and H1,
// identical meta/sub-head/boilerplate x5). Google's June 2026 spam update
// targeted exactly that scaled/templated shape. BNB's shell was already
// bespoke (2026-05 informational reposition) and enters this Record
// verbatim, no copy change.
//
// The route reads these fields with NO FALLBACK: a coin present in
// CRYPTO_LIST but absent here is a BUILD error (Record over the slug
// union), and the route throws at runtime rather than re-templating.
//
// WRITING RULES (Batch 1 standard): title and H1 differ; each carries a
// coin-specific claim grounded in the page's own rendered content that
// fails the body-swap test; metas <= ~160, distinctive fact front-loaded;
// no bare year-stamps; no unsourced count claims.
//
// `modified` feeds the sitemap <lastmod> for this URL (data-level date,
// overrides lib/route-lastmod.ts). HONESTY RULE, same as
// lib/last-reviewed.ts: bump ONLY on a real content change to the page,
// in the same commit.

export type CryptoSlug = (typeof CRYPTO_LIST)[number]['slug']

export interface CryptoEditorial {
  title: string
  h1: string
  metaDescription: string
  subHead: string
  // The intro-prose H2 ("Gambling with {name}" pattern before Batch 2b).
  // For dogecoin this renders on the bottom informational section (the
  // page leads with its comparison table); for BNB it heads the
  // chain-mechanics explainer.
  introHeading: string
  // Rendered after the computed operator count ("{N} {rankedHeading}").
  // Not rendered on the BNB page (its ranking lives at
  // /bnb-crypto-casinos); the value is kept so the Record stays total.
  rankedHeading: string
  rankedNote: string
  stripFraming: string
  breadcrumbLabel: string
  modified: string // ISO date, feeds sitemap lastmod for this URL
}

export const cryptoEditorial: Record<CryptoSlug, CryptoEditorial> = {
  bitcoin: {
    title: 'Bitcoin Casinos: Where BTC Is Still the Default Rail',
    h1: 'Bitcoin Casinos: Universal Acceptance, 10-Minute Blocks',
    metaDescription: 'Every casino in our rankings takes BTC, which is exactly why it stays the default. The trade: 10-minute confirmations and a bankroll that moves with the market.',
    subHead: 'The widest operator coverage of any coin, priced in confirmation time: what BTC buys you at the cashier and what it costs in practice.',
    introHeading: 'Gambling with Bitcoin: reach versus speed',
    rankedHeading: 'Bitcoin Casinos, Trust-Ranked',
    rankedNote: 'Every operator below takes BTC at the cashier, deposits and withdrawals both.',
    stripFraming: 'Top 3 by trust among BTC operators. Not paid placement.',
    breadcrumbLabel: 'Bitcoin Casinos',
    modified: '2026-08-25', // bumped 2026-08-25: Roobet withdrawalTime/caveat correction renders on this page
  },
  ethereum: {
    title: 'Ethereum Casinos: ETH Deposits, Gas Fees, Real Speed',
    h1: 'Ethereum at Crypto Casinos: Fast Blocks, Costly Congestion',
    metaDescription: 'ETH confirms in 15-30 seconds; gas decides the economics, $5-$30 a transaction at peak. Which casinos take Ethereum, and when a stablecoin serves better.',
    subHead: 'Confirmations in 15-30 seconds make ETH a genuine speed upgrade on BTC; gas fees are the line item that decides whether to use it.',
    introHeading: 'ETH at the cashier: speed first, gas second',
    rankedHeading: 'Ethereum Casinos Ranked by Trust',
    rankedNote: 'Each platform below accepts ETH directly; check gas conditions before routine small withdrawals.',
    stripFraming: 'Top 3 ETH-accepting operators by trust. Not paid placement.',
    breadcrumbLabel: 'Ethereum Casinos',
    modified: '2026-08-25', // bumped 2026-08-25: Roobet withdrawalTime/caveat correction renders on this page
  },
  usdt: {
    title: 'USDT Casinos: Tether on TRC-20 as the Gambling Default',
    h1: 'Tether Casinos: A Fixed-Dollar Bankroll That Settles in Seconds',
    metaDescription: 'A $500 USDT deposit is worth $500 at withdrawal; TRC-20 clears in under three seconds for under a cent. Why Tether is the default, USDC the alternative.',
    subHead: 'Dollar-pegged, sub-three-second confirmations, sub-cent fees on TRC-20: the coin chosen for predictability rather than conviction.',
    introHeading: 'Why a fixed-dollar bankroll changes the math',
    rankedHeading: 'Tether Casinos, Trust-Ranked',
    rankedNote: 'Each platform below accepts USDT, most across more than one network.',
    stripFraming: 'Top 3 by trust for USDT play. Not paid placement.',
    breadcrumbLabel: 'Tether Casinos',
    modified: '2026-08-25', // bumped 2026-08-25: Roobet withdrawalTime/caveat correction renders on this page
  },
  // The strongest pre-crash Google signal in the crypto tree (524 imp/wk at
  // pos 45.6, pollution-clean, per the CLAUDE.md audit-list item), so this
  // set got the most drafting care. "Dogecoin Casinos" kept contiguous.
  dogecoin: {
    title: 'Dogecoin Casinos Compared: Fees, KYC, Payout Windows',
    h1: 'Dogecoin Casinos: One-Minute Confirmations, Every Operator Compared',
    metaDescription: 'DOGE confirms in about a minute for negligible fees, and every casino in our ratings accepts it. The comparison table: withdrawal windows, minimums, KYC, trust.',
    subHead: 'DOGE clears in about a minute for next to nothing, and acceptance runs right across our ratings. The table below prices the operators, not the coin.',
    introHeading: 'How Dogecoin behaves at crypto casinos',
    rankedHeading: 'DOGE-Accepting Casinos, Ranked',
    rankedNote: 'Every operator below takes DOGE both directions, deposit and cashout.',
    stripFraming: 'Top 3 by trust among DOGE operators. Not paid placement.',
    breadcrumbLabel: 'Dogecoin Casinos',
    modified: '2026-08-25', // bumped 2026-08-25: Roobet withdrawalTime/caveat correction renders on this page
  },
  solana: {
    title: 'Solana Casinos: Sub-Second Finality, Fees Under $0.001',
    h1: 'Solana at Crypto Casinos: The Fastest Rail, Fewer Takers',
    metaDescription: 'SOL settles in under a second for under $0.001, quicker than TRC-20 in practice. Adoption is the catch: the operators with native Solana support, compared.',
    subHead: 'Sub-second finality and fees under a tenth of a cent, at the operators that have actually added it: the adoption gap is the real story.',
    introHeading: 'SOL at the cashier: speed without the fee',
    rankedHeading: 'Casinos with Native SOL Support, Ranked',
    rankedNote: 'The subset of our ratings with native SOL deposits and withdrawals; the coverage gap is closing quarter by quarter.',
    stripFraming: 'Top 3 by trust with native SOL support. Not paid placement.',
    breadcrumbLabel: 'Solana Casinos',
    modified: '2026-08-25', // bumped 2026-08-25: Roobet withdrawalTime/caveat correction renders on this page
  },
  // Bespoke informational shell from the 2026-05 BNB reposition, entered
  // verbatim: /crypto/bnb is the chain/coin reference page and the
  // commercial ranking lives at /bnb-crypto-casinos. No copy change in
  // Batch 2b and no dispatch for this URL.
  bnb: {
    title: 'BNB on Crypto Casinos: Chain Mechanics, Fees, Networks',
    h1: 'BNB at Crypto Casinos: Chain Mechanics & Networks',
    metaDescription: 'How BNB works at crypto casinos: BNB Smart Chain mechanics, confirmation times, fee character. For the ranked list of BNB-accepting operators, see /bnb-crypto-casinos.',
    subHead: 'BNB Smart Chain mechanics, deposit-side behaviour, and fee character at crypto casinos. The ranked listicle of BNB-accepting operators lives at /bnb-crypto-casinos.',
    introHeading: 'How BNB behaves at crypto casinos',
    rankedHeading: 'BNB Casinos Ranked',
    rankedNote: 'Every platform below accepts BNB for deposits and withdrawals.',
    stripFraming: 'Top 3 BNB-accepting operators by trust score. Not paid placement.',
    breadcrumbLabel: 'BNB Reference',
    modified: '2026-08-25', // bumped 2026-08-25: Roobet withdrawalTime correction renders in the BNB table
  },
}
