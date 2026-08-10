import { GAME_TYPES } from './programmatic'

// Per-game editorial shell (Batch 2b de-templating; same design as
// lib/country-content.ts). The three /game/{crash,dice,plinko} statics
// already carry fully differentiated bodies (distinct mechanics sections,
// per-operator notes, provably-fair explainers); what was templated is the
// year-stamped title/H1 stem ("Best Crypto Casinos for {X} 2026", title
// rendered equal to H1) and the "Top Casinos for {X}" ranked heading.
// Those shell fields move here. Each static page reads its own entry, the
// Sweden/Finland pattern: a missing entry is a BUILD error (Record over
// the slug union).
//
// WRITING RULES (Batch 1 standard): title and H1 differ; each carries a
// game-specific claim grounded in the page's own rendered content that
// fails the body-swap test; metas <= ~160; no bare year-stamps; operator
// names in metas trace to the page's own curated four-operator set.
//
// `modified` feeds the sitemap <lastmod> for this URL (data-level date,
// overrides lib/route-lastmod.ts). HONESTY RULE, same as
// lib/last-reviewed.ts: bump ONLY on a real content change to the page,
// in the same commit.

export type GameSlug = (typeof GAME_TYPES)[number]['slug']

export interface GameEditorial {
  title: string
  h1: string
  metaDescription: string
  // The ranked-grid H2 above the curated operator cards.
  rankedHeading: string
  modified: string // ISO date, feeds sitemap lastmod for this URL
}

export const gameEditorial: Record<GameSlug, GameEditorial> = {
  crash: {
    title: 'Best Crypto Casinos for Crash Games 2026: Aviator, JetX, Originals',
    h1: 'Best Crypto Casinos for Crash Games 2026',
    metaDescription: 'Crypto casinos with the best crash game selection in 2026. BC.Game, Shuffle, Duelbits and Roobet compared on native Originals, Aviator coverage, RTP and KYC posture.',
    rankedHeading: 'Top Casinos for Crash Games',
    modified: '2026-08-01',
  },
  dice: {
    title: 'Best Crypto Casinos for Dice 2026: Provably-Fair Originals & 99% RTP',
    h1: 'Best Crypto Casinos for Dice 2026',
    metaDescription: 'Crypto casinos with the best dice game selection in 2026. BC.Game, Shuffle, Duelbits and Roobet compared on native provably-fair Originals, adjustable win-chance and house edge.',
    rankedHeading: 'Top Casinos for Dice',
    modified: '2026-08-01',
  },
  plinko: {
    title: 'Best Crypto Casinos for Plinko 2026: Originals, Row Count & Volatility',
    h1: 'Best Crypto Casinos for Plinko 2026',
    metaDescription: 'Crypto casinos with the best Plinko selection in 2026. BC.Game, Shuffle, Duelbits and Roobet compared on native provably-fair Originals, row-count maths and multiplier ranges.',
    rankedHeading: 'Top Casinos for Plinko',
    modified: '2026-08-01',
  },
}
