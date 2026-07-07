// Last-reviewed registry (trust layer, added 2026-07-07).
//
// HONESTY RULE: a date here may ONLY be set or bumped when a documented
// verification event actually happened (catalogue spot-check against the
// operator's live T&C / promotions page, or primary-source re-verification
// of a country's legal/tax facts). Never bump for cosmetic edits or
// "freshness": CLAUDE.md forbids fake-freshness updates, and a fabricated
// fact-check date is worse than none. Month granularity is deliberate; it
// matches the cadence of real verification events.
//
// Provenance for the current values:
// - Casino entries: full catalogue verification May 2026 (lib/casinos.ts
//   build-out); Roobet entry researched and written late June 2026;
//   BitStarz + BC.Game spot-checked 2026-07-07 monthly audit (2 facts each,
//   confirmed). Cloudbet deliberately stays at May 2026: the 07-07 audit
//   FLAGGED possible drift on its payment rails (fiat via Swapped/Jeton/
//   Vega), so it must not carry a fresher date until that check completes.
// - Country facts: countryContext primary-source verification May 2026
//   (see provenance block in app/country/[slug]/page.tsx); Sweden research
//   June 2026 (Spellag/MiCA/channelisation sourcing); Finland research
//   June 2026 (Vero/FIN-FSA/Veikkaus reform sourcing).

export const casinoLastReviewed: Record<string, string> = {
  bitstarz: 'July 2026',
  'bc-game': 'July 2026',
  cloudbet: 'May 2026',
  'mirax-casino': 'May 2026',
  '7bit-casino': 'May 2026',
  shuffle: 'May 2026',
  duelbits: 'June 2026',
  roobet: 'June 2026',
}

export const countryLastReviewed: Record<string, string> = {
  canada: 'May 2026',
  australia: 'May 2026',
  'new-zealand': 'May 2026',
  ireland: 'May 2026',
  germany: 'May 2026',
  netherlands: 'May 2026',
  norway: 'May 2026',
  sweden: 'June 2026',
  finland: 'June 2026',
  japan: 'June 2026',
}
