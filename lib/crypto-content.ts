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
    title: 'Best Bitcoin Casinos 2026',
    h1: 'Best Bitcoin Casinos 2026',
    metaDescription: 'Top crypto casinos accepting Bitcoin. Compare bonuses, withdrawal times and fees.',
    subHead: 'Top crypto casinos accepting Bitcoin. Compare bonuses, withdrawal times and fees.',
    introHeading: 'Gambling with Bitcoin',
    rankedHeading: 'Bitcoin Casinos Ranked',
    rankedNote: 'Every platform below accepts BTC for deposits and withdrawals.',
    stripFraming: 'Top 3 BTC-accepting operators by trust score. Not paid placement.',
    breadcrumbLabel: 'Bitcoin Casinos',
    modified: '2026-08-01',
  },
  ethereum: {
    title: 'Best Ethereum Casinos 2026',
    h1: 'Best Ethereum Casinos 2026',
    metaDescription: 'Top crypto casinos accepting Ethereum. Compare bonuses, withdrawal times and fees.',
    subHead: 'Top crypto casinos accepting Ethereum. Compare bonuses, withdrawal times and fees.',
    introHeading: 'Gambling with Ethereum',
    rankedHeading: 'Ethereum Casinos Ranked',
    rankedNote: 'Every platform below accepts ETH for deposits and withdrawals.',
    stripFraming: 'Top 3 ETH-accepting operators by trust score. Not paid placement.',
    breadcrumbLabel: 'Ethereum Casinos',
    modified: '2026-08-01',
  },
  usdt: {
    title: 'Best Tether Casinos 2026',
    h1: 'Best Tether Casinos 2026',
    metaDescription: 'Top crypto casinos accepting Tether. Compare bonuses, withdrawal times and fees.',
    subHead: 'Top crypto casinos accepting Tether. Compare bonuses, withdrawal times and fees.',
    introHeading: 'Gambling with Tether',
    rankedHeading: 'Tether Casinos Ranked',
    rankedNote: 'Every platform below accepts USDT for deposits and withdrawals.',
    stripFraming: 'Top 3 USDT-accepting operators by trust score. Not paid placement.',
    breadcrumbLabel: 'Tether Casinos',
    modified: '2026-08-01',
  },
  dogecoin: {
    title: 'Best Dogecoin Casinos 2026',
    h1: 'Best Dogecoin Casinos 2026',
    metaDescription: 'Top crypto casinos accepting Dogecoin. Compare bonuses, withdrawal times and fees.',
    subHead: 'Top crypto casinos accepting Dogecoin. Compare bonuses, withdrawal times and fees.',
    introHeading: 'How Dogecoin behaves at crypto casinos',
    rankedHeading: 'Dogecoin Casinos Ranked',
    rankedNote: 'Every platform below accepts DOGE for deposits and withdrawals.',
    stripFraming: 'Top 3 DOGE-accepting operators by trust score. Not paid placement.',
    breadcrumbLabel: 'Dogecoin Casinos',
    modified: '2026-08-01',
  },
  solana: {
    title: 'Best Solana Casinos 2026',
    h1: 'Best Solana Casinos 2026',
    metaDescription: 'Top crypto casinos accepting Solana. Compare bonuses, withdrawal times and fees.',
    subHead: 'Top crypto casinos accepting Solana. Compare bonuses, withdrawal times and fees.',
    introHeading: 'Gambling with Solana',
    rankedHeading: 'Solana Casinos Ranked',
    rankedNote: 'Every platform below accepts SOL for deposits and withdrawals.',
    stripFraming: 'Top 3 SOL-accepting operators by trust score. Not paid placement.',
    breadcrumbLabel: 'Solana Casinos',
    modified: '2026-08-01',
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
    modified: '2026-08-01',
  },
}
