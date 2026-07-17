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
//   confirmed). Cloudbet re-verified 2026-07-16 against its own help centre
//   (primary): bonus restructure, 29-coin list, ~$1 min deposit, tiered
//   no-limit policy, Jeton/Vega/Swapped fiat rails; the 07-07 drift flag is
//   resolved. Roobet re-verified 2026-07-16 (help.roobet.com primary):
//   11-coin list, fee-threshold wording. The other six casinos were checked
//   2026-07-16 against dated secondaries only (operators block fetchers);
//   per the honesty rule their dates do NOT bump on secondary evidence.
//   EXCEPTION same day: BitStarz + Mirax owner-verified 2026-07-16 against
//   LIVE operator terms (direct browser reads, non-UK exit): the BitStarz
//   25% bonus-withdrawal fee and the Mirax €100 free-spin cap both FAILED
//   verification and were removed site-wide (verify-or-omit); BitStarz's
//   live terms document no deposit/withdrawal fees at all. Both dates bump
//   to July 2026 on that documented verification event.
// - Country facts: countryContext primary-source verification May 2026
//   (see provenance block in app/country/[slug]/page.tsx); Sweden research
//   June 2026 (Spellag/MiCA/channelisation sourcing); Finland research
//   June 2026 (Vero/FIN-FSA/Veikkaus reform sourcing).

export const casinoLastReviewed: Record<string, string> = {
  bitstarz: 'July 2026',
  'bc-game': 'July 2026',
  cloudbet: 'July 2026',
  'mirax-casino': 'July 2026',
  '7bit-casino': 'May 2026',
  shuffle: 'May 2026',
  duelbits: 'June 2026',
  roobet: 'July 2026',
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
