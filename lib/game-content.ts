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
    title: 'Crash Game Crypto Casinos: Aviator, JetX and Originals',
    h1: 'Crash Games: Four Operators Run Native Provably-Fair Originals',
    metaDescription: 'Four operators in our rankings run native provably-fair Crash Originals: BC.Game, Shuffle, Duelbits and Roobet. Aviator and JetX coverage, RTP, verification.',
    rankedHeading: 'The Four Crash Operators, Ranked',
    modified: '2026-08-10',
  },
  dice: {
    title: 'Dice Crypto Casinos: Provably-Fair Originals at 99% RTP',
    h1: 'Dice: The Original Provably-Fair Game, Still 99% RTP',
    metaDescription: 'Dice pays 99% RTP at every win-chance setting, the highest of any common casino format. The four operators with native provably-fair Dice Originals, compared.',
    rankedHeading: 'The Four Dice Originals Operators, Ranked',
    modified: '2026-08-10',
  },
  plinko: {
    title: 'Plinko Crypto Casinos: Row Count, Volatility, Originals',
    h1: 'Plinko: Eight to Sixteen Rows Between Steady and 1,000x',
    metaDescription: 'Row count sets the volatility: 8 rows plays steady, 16 rows reaches roughly 1,000x. The four operators running native provably-fair Plinko Originals, compared.',
    rankedHeading: 'The Four Plinko Operators, Ranked',
    modified: '2026-08-10',
  },
}
