import { COUNTRY_LIST } from './programmatic'

// Per-country editorial shell (Batch 1 de-templating, shipped 2026-08-07).
//
// WHY THIS EXISTS: until this file, every /country/[slug] page interpolated
// one noun into fixed strings ("Best Crypto Casinos in {name} 2026" as both
// title and H1). Google's June 2026 spam update targeted exactly that
// scaled/templated shape. The route reads these fields with NO FALLBACK:
// a country present in COUNTRY_LIST but absent here is a BUILD ERROR
// (Record over the slug union), so the template string cannot silently
// return when someone adds a country.
//
// WRITING RULES (Batch 1 standard, apply to any future entry):
// - Title and H1 are different strings; each carries a country-unique fact
//   that fails the CLAUDE.md body-swap test (swap the country name and the
//   sentence becomes false, not merely odd).
// - The page's demonstrated search phrase stays contiguous in the title
//   (e.g. "bitcoin casinos australia", "crypto casinos nz").
// - Meta descriptions <= ~160 chars, distinctive fact front-loaded.
// - No bare year-stamps; dates appear only when load-bearing facts.
// - NO operator-count claims without per-field provenance in lib/casinos.ts.
//   Roobet-specific restriction claims are safe (terms §3.5, user-verified).
// - Every fact must trace to the page's verified body copy (countryContext
//   provenance block) or lib/casinos.ts. Verify-or-omit.
//
// `modified` feeds the sitemap <lastmod> for this URL (data-level date,
// overrides lib/route-lastmod.ts). HONESTY RULE, same as lib/last-reviewed.ts:
// bump ONLY on a real content change to the page, in the same commit.
// `reviewBy` marks copy carrying an expiry-shaped fact; the monthly audit
// checks it (see STATE.md next-actions for the standing tripwire).

export type CountrySlug = (typeof COUNTRY_LIST)[number]['slug']

export interface CountryTemplateStrings {
  // Rendered only by the dynamic app/country/[slug]/page.tsx template.
  intro: string
  stripFraming: string
  contextHeading: string
  rankingHeading: string
  rankingNote: string
  // Only for countries with a /legal sub-page (LEGAL_SUBPAGE_SLUGS in the
  // route); the route throws if the sub-page is gated on and this is absent.
  legalCrossLink?: { before: string; anchor: string }
}

export interface CountryEditorial {
  title: string
  h1: string
  metaDescription: string
  modified: string // ISO date, feeds sitemap lastmod for this URL
  reviewBy?: string // ISO date: copy carries an expiry-shaped fact, re-review by then
  // null for sweden/finland: their bespoke static segments do not render the
  // dynamic template's strings. The dynamic route throws on null by design.
  template: CountryTemplateStrings | null
}

export const countryEditorial: Record<CountrySlug, CountryEditorial> = {
  canada: {
    title: 'Crypto Casinos in Canada: The Ontario Split',
    h1: 'Crypto Casinos in Canada: Ontario Plays by Different Rules to the Rest',
    metaDescription: "Canada regulates gambling province by province, and Ontario's iGaming regime is the outlier. Roobet's terms exclude Ontario by name while accepting the rest.",
    modified: '2026-08-07',
    template: {
      intro: 'Gambling law is provincial here, and Ontario runs its own licensed regime. What the split means before the first CAD on-ramp.',
      stripFraming: 'Top 3 by trust score for Canadian players. Ontario players: check each operator’s terms for the provincial carve-out.',
      contextHeading: "How Canada's Provincial Split Works",
      rankingHeading: 'Our Full Ranking for Canadian Players',
      rankingNote: "Independent rankings. Provincial rules differ, and Ontario carve-outs can appear in operator terms (Roobet's does); check yours before depositing.",
      legalCrossLink: {
        before: 'Whether any of this is legal from a Canadian sofa is its own question, with a provincial answer rather than a federal one. The statutes, the Ontario regime and the tax treatment are covered in our guide to ',
        anchor: 'whether crypto gambling is legal in Canada',
      },
    },
  },
  australia: {
    title: 'Bitcoin Casinos Australia: ACMA Blocks and the CGT Catch',
    h1: 'Crypto Casinos in Australia: The IGA Targets Operators, Not You',
    metaDescription: "Australia's IGA restricts operators, not players. ACMA blocks sites at DNS, banks block AUD transfers, and the ATO can treat the funding itself as a CGT event.",
    // 2026-08-17: sentence-level intro correction (VPN caveat added), commit-record only
    // 2026-08-22: owner override (decisions log, same date): the 08-17 VPN caveat is
    // replaced with "difficult to detect", scoped by the sentence to the two state-side
    // frictions; citable basis = Senate committee report para 2.92 (VPN traffic outside
    // the blocking regime, already cited on /country/australia/legal). Objection made,
    // considered, overruled by the owner. Do not revert in either direction without a
    // new owner decision.
    modified: '2026-08-22',
    template: {
      intro: "The IGA restricts operators rather than players, so the real frictions are ACMA's DNS blocks and banks refusing AUD transfers. VPNs and crypto are how AU players route around both, which is difficult to detect.",
      stripFraming: 'Top 3 by trust score. Check each operator’s restricted-territory terms for Australian accounts before depositing.',
      contextHeading: 'Playing From Australia: The Real Frictions',
      rankingHeading: 'Every Operator Ranked: Check AU Terms First',
      rankingNote: 'Independent rankings. AU acceptance differs across operator terms; verify yours before moving AUD into crypto for a deposit.',
      legalCrossLink: {
        before: 'The operator-versus-player distinction above is the load-bearing fact of Australian law, and the statutes, ACMA enforcement practice and ATO treatment each add their own wrinkle. The full statutory breakdown is in our guide to ',
        anchor: 'whether crypto gambling is legal in Australia',
      },
    },
  },
  'new-zealand': {
    title: 'Crypto Casinos NZ: The 1 December 2026 Licence Deadline',
    h1: 'Crypto Casinos in New Zealand: Offshore Is Legal Until the Licensing Deadline Bites',
    metaDescription: "New Zealand's licensed-only enforcement starts 1 December 2026, so today's offshore position has an expiry date. Winnings stay tax-free; IRD taxes the disposal.",
    modified: '2026-08-07',
    // The deadline framing inverts once enforcement starts: reframe this set
    // (title, H1, intro) to the post-enforcement position on or before this date.
    reviewBy: '2026-12-01',
    template: {
      intro: 'Offshore play is lawful today; the 1 December 2026 licensed-only deadline is what changes that. The NZD leg runs through Easy Crypto or Independent Reserve.',
      stripFraming: 'Top 3 by trust score for NZ play ahead of the licensing deadline. Trust-ranked, not paid placement.',
      contextHeading: 'The Regulatory Clock on NZ Offshore Play',
      rankingHeading: 'Full Ranking for Kiwi Players',
      rankingNote: 'Independent rankings. With the licensing transition underway, confirm NZ acceptance at signup rather than assuming it holds through the year.',
    },
  },
  ireland: {
    title: 'Crypto Casinos Ireland: Section 613(2) and the 2024 Act',
    h1: 'Crypto Casinos in Ireland: No CGT on Winnings, So Choose on Cashier Speed',
    metaDescription: 'Section 613(2) TCA 1997 keeps winnings outside capital gains for individuals, so coin choice is pure cashier maths. Where the 2024 Act leaves offshore play.',
    modified: '2026-08-07',
    template: {
      intro: 'No CGT on winnings under Section 613(2), so nothing tax-side separates the coins here. Pick on withdrawal speed and the cashier you can live with.',
      stripFraming: 'Top 3 by trust score for Irish players. Trust-ranked, never pay-ranked.',
      contextHeading: 'The Irish Position: Tax-Free Winnings, Offshore Sites',
      rankingHeading: 'Every Casino Ranked on Cashier Merit',
      rankingNote: "Independent rankings. Confirm Irish acceptance in the operator's own terms at signup.",
    },
  },
  germany: {
    title: 'Best Crypto Casinos in Germany: GGL, § 23 EStG and SCHUFA',
    h1: 'Crypto Casinos in Germany: Where GGL Licensing Leaves Offshore Play',
    metaDescription: 'Why § 23 EStG makes coin held over a year the cheapest thing to deposit, why SCHUFA flags gambling transfers, and where GGL licensing leaves offshore play.',
    modified: '2026-08-07',
    template: {
      intro: 'Long-held coin deposits tax-free under § 23 EStG; SCHUFA-linked transfers to casinos get flagged. German crypto play is mostly about picking the right rail.',
      stripFraming: 'Top 3 by trust score. The restricted-territory filter removes Roobet here: its terms name Germany.',
      contextHeading: 'Germany: Tax, SCHUFA and the GGL',
      rankingHeading: 'Every Casino Ranked (Roobet Sits This One Out)',
      rankingNote: 'Independent rankings. Operator terms can be more granular than published lists; confirm German acceptance before depositing.',
    },
  },
  netherlands: {
    title: 'Crypto Casinos Netherlands: Why Dutch Players Get Locked Out',
    h1: 'Crypto Casinos in the Netherlands: Why Dutch Accounts Get Refused',
    metaDescription: 'Dutch banks block gambling transfers and kansspelbelasting takes 37.8% of winnings above the threshold, licensed or offshore. What is left for Dutch players.',
    modified: '2026-08-07',
    template: {
      intro: 'Kansspelbelasting takes 37.8% whether you play licensed or offshore, and Dutch banks routinely block gambling transfers. Here is what that leaves for NL players.',
      stripFraming: 'Top 3 by trust score. Dutch acceptance varies by operator: check the restricted-territory terms before you deposit.',
      contextHeading: 'The Dutch Squeeze: 37.8% Tax and Blocked Rails',
      rankingHeading: 'The Full List, With Dutch Caveats',
      rankingNote: "Independent rankings. Registration from the Netherlands depends on each operator's restricted-territory terms; read them before depositing.",
    },
  },
  norway: {
    title: 'Bitcoin Casinos Norway: The Payment Block That Misses Coins',
    h1: 'Crypto Casinos in Norway: The Payment Blocklist Stops Cards, Not Coins',
    metaDescription: "Lottstift's blocklist stops card and bank rails, not on-chain transfers. The catch most lists skip: winnings from outside the EEA are taxable in Norway.",
    modified: '2026-08-07',
    template: {
      intro: "The monopoly blocks payments, not play: Lottstift's list catches cards and bank rails while on-chain transfers pass it entirely. Mind the outside-EEA tax line.",
      stripFraming: 'Top 3 by trust score for NOK-funded play. No paid placement in this ranking.',
      contextHeading: "Norway's Monopoly and Its Payment Blocklist",
      rankingHeading: 'Every Casino Ranked for Norwegian Play',
      rankingNote: "Independent rankings. Norwegian acceptance is stated in each operator's terms; confirm before funding from a NOK on-ramp.",
    },
  },
  sweden: {
    title: 'Crypto Casinos in Sweden: The One-Bonus Rule, Spelinspektionen and SEK On-Ramps',
    h1: 'Crypto Casinos in Sweden: Why the One-Bonus Rule Pushes Players Offshore',
    metaDescription: "Spellag 14 kap. § 9 limits Swedish-licensed sites to one bonus per player, for life; offshore operators are not bound by it. Roobet's terms exclude Sweden.",
    modified: '2026-08-07',
    template: null,
  },
  finland: {
    title: 'Crypto Casinos in Finland: Veikkaus and the 2027 Reform',
    h1: 'Crypto Casinos in Finland: What Changes When the Monopoly Ends in 2027',
    metaDescription: 'Finland is dismantling the Veikkaus monopoly for a licensed market in 2027. The EEA carve-out already decides whether winnings are taxable, reform or not.',
    modified: '2026-08-07',
    template: null,
  },
  japan: {
    title: 'Crypto Casinos in Japan: The JPY Question and the Law',
    h1: 'Crypto Casinos in Japan: The Yen Is Easy, the Law Is Not',
    metaDescription: 'Online casino play is not legal under current Japanese law; crypto gains are taxed as miscellaneous income at up to ~55%. The JPY on-ramp is the easy part.',
    modified: '2026-08-07',
    template: {
      intro: 'The JPY leg is simple: bitFlyer, Coincheck and Bitbank all convert yen to crypto in minutes. The legal position is the part to read before anything else.',
      stripFraming: 'Top 3 by trust score. Read the legal position on this page before treating a deposit as a casual decision.',
      contextHeading: "Japan's Legal Position, Stated Plainly",
      rankingHeading: 'The Catalogue, Ranked: Legal Context First',
      rankingNote: 'Independent rankings. Japanese law does not license offshore online casinos; the legal section on this page comes before any deposit decision.',
    },
  },
}
