import { COUNTRY_LIST } from './programmatic'

// Per-country editorial shell (Batch 1 de-templating, 2026-08-07).
//
// WHY THIS EXISTS: until this file, every /country/[slug] page interpolated
// one noun into fixed strings ("Best Crypto Casinos in {name} 2026" as both
// title and H1). Google's June 2026 spam update targeted exactly that
// scaled/templated shape. The route now reads these fields with NO FALLBACK:
// a country present in COUNTRY_LIST but absent here is a BUILD ERROR
// (Record over the slug union), so the template string cannot silently
// return when someone adds a country.
//
// `modified` feeds the sitemap <lastmod> for this URL (data-level date,
// overrides lib/route-lastmod.ts). HONESTY RULE, same as lib/last-reviewed.ts:
// bump ONLY on a real content change to the page, in the same commit.
// `reviewBy` marks copy with an expiry-shaped fact; the monthly audit checks it.

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
    title: 'Best Crypto Casinos in Canada 2026',
    h1: 'Best Crypto Casinos in Canada 2026',
    metaDescription: 'Top crypto casinos for Canada players. Compare bonuses, payment methods and withdrawal speeds for CAD users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for Canada players. Compare bonuses, payment methods and withdrawal speeds for CAD users.',
      stripFraming: 'Top 3 by trust score among operators accepting Canada accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for Canada Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts Canada accounts before depositing.',
      legalCrossLink: {
        before: "For the full breakdown of Canada's crypto gambling laws, covering the operator-versus-player distinction, what the statutes actually say, enforcement in practice, and how winnings and crypto are taxed, see our guide to ",
        anchor: 'whether crypto gambling is legal in Canada',
      },
    },
  },
  australia: {
    title: 'Best Crypto Casinos in Australia 2026',
    h1: 'Best Crypto Casinos in Australia 2026',
    metaDescription: 'Top crypto casinos for Australia players. Compare bonuses, payment methods and withdrawal speeds for AUD users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for Australia players. Compare bonuses, payment methods and withdrawal speeds for AUD users.',
      stripFraming: 'Top 3 by trust score among operators accepting Australia accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for Australia Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts Australia accounts before depositing.',
      legalCrossLink: {
        before: "For the full breakdown of Australia's crypto gambling laws, covering the operator-versus-player distinction, what the statutes actually say, enforcement in practice, and how winnings and crypto are taxed, see our guide to ",
        anchor: 'whether crypto gambling is legal in Australia',
      },
    },
  },
  'new-zealand': {
    title: 'Best Crypto Casinos in New Zealand 2026',
    h1: 'Best Crypto Casinos in New Zealand 2026',
    metaDescription: 'Top crypto casinos for New Zealand players. Compare bonuses, payment methods and withdrawal speeds for NZD users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for New Zealand players. Compare bonuses, payment methods and withdrawal speeds for NZD users.',
      stripFraming: 'Top 3 by trust score among operators accepting New Zealand accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for New Zealand Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts New Zealand accounts before depositing.',
    },
  },
  ireland: {
    title: 'Best Crypto Casinos in Ireland 2026',
    h1: 'Best Crypto Casinos in Ireland 2026',
    metaDescription: 'Top crypto casinos for Ireland players. Compare bonuses, payment methods and withdrawal speeds for EUR users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for Ireland players. Compare bonuses, payment methods and withdrawal speeds for EUR users.',
      stripFraming: 'Top 3 by trust score among operators accepting Ireland accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for Ireland Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts Ireland accounts before depositing.',
    },
  },
  germany: {
    title: 'Best Crypto Casinos in Germany 2026',
    h1: 'Best Crypto Casinos in Germany 2026',
    metaDescription: 'Top crypto casinos for Germany players. Compare bonuses, payment methods and withdrawal speeds for EUR users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for Germany players. Compare bonuses, payment methods and withdrawal speeds for EUR users.',
      stripFraming: 'Top 3 by trust score among operators accepting Germany accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for Germany Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts Germany accounts before depositing.',
    },
  },
  netherlands: {
    title: 'Best Crypto Casinos in Netherlands 2026',
    h1: 'Best Crypto Casinos in Netherlands 2026',
    metaDescription: 'Top crypto casinos for Netherlands players. Compare bonuses, payment methods and withdrawal speeds for EUR users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for Netherlands players. Compare bonuses, payment methods and withdrawal speeds for EUR users.',
      stripFraming: 'Top 3 by trust score among operators accepting Netherlands accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for Netherlands Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts Netherlands accounts before depositing.',
    },
  },
  norway: {
    title: 'Best Crypto Casinos in Norway 2026',
    h1: 'Best Crypto Casinos in Norway 2026',
    metaDescription: 'Top crypto casinos for Norway players. Compare bonuses, payment methods and withdrawal speeds for NOK users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for Norway players. Compare bonuses, payment methods and withdrawal speeds for NOK users.',
      stripFraming: 'Top 3 by trust score among operators accepting Norway accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for Norway Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts Norway accounts before depositing.',
    },
  },
  sweden: {
    title: 'Best Crypto Casinos in Sweden 2026: Spelinspektionen, On-Ramps & Tax',
    h1: 'Best Crypto Casinos in Sweden 2026',
    metaDescription: 'Crypto casinos for Swedish players in 2026. Spellag one-bonus rule, Spelinspektionen channelisation 72–82% online casino, Safello MiCA-CASP, BTCX, Trijo on-ramping.',
    modified: '2026-08-01',
    template: null,
  },
  finland: {
    title: 'Best Crypto Casinos in Finland 2026: Veikkaus, the 2027 Reform & Tax',
    h1: 'Best Crypto Casinos in Finland 2026',
    metaDescription: 'Crypto casinos for Finnish players in 2026. The Veikkaus monopoly runs until the licensed market opens on 1 July 2027, the EEA winnings-tax carve-out, and Coinmotion / Northcrypto on-ramping.',
    modified: '2026-08-01',
    template: null,
  },
  japan: {
    title: 'Best Crypto Casinos in Japan 2026',
    h1: 'Best Crypto Casinos in Japan 2026',
    metaDescription: 'Top crypto casinos for Japan players. Compare bonuses, payment methods and withdrawal speeds for JPY users.',
    modified: '2026-08-01',
    template: {
      intro: 'Top crypto casinos for Japan players. Compare bonuses, payment methods and withdrawal speeds for JPY users.',
      stripFraming: 'Top 3 by trust score among operators accepting Japan accounts. Restricted-territory filter applied.',
      contextHeading: 'Crypto Casinos for Japan Players',
      rankingHeading: 'All Crypto Casinos Ranked',
      rankingNote: 'Independent rankings. Verify each platform accepts Japan accounts before depositing.',
    },
  },
}
