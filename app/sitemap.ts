import type { MetadataRoute } from 'next'
import { casinos } from '@/lib/casinos'
import { guides } from '@/lib/guides'
import { CRYPTO_LIST, COUNTRY_LIST, GAME_TYPES, BONUS_TYPES } from '@/lib/programmatic'
import { ROUTE_LASTMOD } from '@/lib/route-lastmod'
import { countryEditorial } from '@/lib/country-content'
import { COMPLIANCE_LASTMOD } from '@/lib/compliance-feed'
import { BONUS_CONTENT } from '@/lib/bonus-content'
import { cryptoEditorial } from '@/lib/crypto-content'
import { gameEditorial } from '@/lib/game-content'
import { TRACKER_LIST, trackerShell } from '@/lib/tracker-content'
import { COMPARE_PAIRS, compareEditorial } from '@/lib/compare-content'

const BASE_URL = 'https://www.playmagpie.com'

// Per-page lastmod (Batch 1, 2026-08-07). Previously every entry stamped
// `new Date()`, so the sitemap asserted sitewide modification on every deploy
// and the field carried no information (STATE.md 2026-07-28). Dates now come
// from data-level `modified` fields where the content lives in a data file
// (guides via lib/guides.ts) and from the git-derived floor map otherwise
// (lib/route-lastmod.ts, see its header for semantics). A missing map entry
// throws at build so a new URL cannot ship without a lastmod decision.
function lm(path: string): Date {
  const d = ROUTE_LASTMOD[path]
  if (!d) {
    throw new Error(
      `sitemap: no lastmod for "${path}". Add it to lib/route-lastmod.ts (or give the page a data-level modified field and read it here).`
    )
  }
  return new Date(d)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: lm('/'), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/best-crypto-casinos`, lastModified: lm('/best-crypto-casinos'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/fast-withdrawal-casinos`, lastModified: lm('/fast-withdrawal-casinos'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/high-roller-casinos`, lastModified: lm('/high-roller-casinos'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/no-kyc-casinos`, lastModified: lm('/no-kyc-casinos'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/best-crypto-pokies-nz`, lastModified: lm('/best-crypto-pokies-nz'), changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/bnb-crypto-casinos`, lastModified: lm('/bnb-crypto-casinos'), changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/best-bitcoin-casino-canada`, lastModified: lm('/best-bitcoin-casino-canada'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/crypto-casinos-with-sportsbook`, lastModified: lm('/crypto-casinos-with-sportsbook'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/research/crypto-casino-bonus-transparency`, lastModified: lm('/research/crypto-casino-bonus-transparency'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/crypto`, lastModified: lm('/crypto'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/country`, lastModified: lm('/country'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/game`, lastModified: lm('/game'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/bonus`, lastModified: lm('/bonus'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: lm('/guides'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: lm('/compare'), changeFrequency: 'weekly', priority: 0.8 },
    // Compliance feed hub (2026-09-05): data-level lastmod = newest entry
    // date in lib/compliance-feed.ts, honest by construction. The RSS
    // mirror /compliance/feed.xml is deliberately NOT in the sitemap.
    { url: `${BASE_URL}/compliance`, lastModified: new Date(COMPLIANCE_LASTMOD), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: lm('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/methodology`, lastModified: lm('/methodology'), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const casinoReviewPages: MetadataRoute.Sitemap = casinos.map((casino) => ({
    url: `${BASE_URL}/reviews/${casino.slug}`,
    lastModified: lm(`/reviews/${casino.slug}`),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const withdrawalPageSlugs = ['bitstarz', '7bit-casino', 'cloudbet', 'duelbits', 'roobet', 'bc-game']
  const casinoWithdrawalPages: MetadataRoute.Sitemap = withdrawalPageSlugs.map((slug) => ({
    url: `${BASE_URL}/reviews/${slug}/withdrawal`,
    lastModified: lm(`/reviews/${slug}/withdrawal`),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Payment-methods sub-page allowlist, must mirror PAYMENT_METHODS_SLUGS in
  // app/reviews/[slug]/payment-methods/page.tsx
  const paymentMethodsSlugs = ['cloudbet', 'bitstarz', 'bc-game']
  const casinoPaymentMethodsPages: MetadataRoute.Sitemap = paymentMethodsSlugs.map((slug) => ({
    url: `${BASE_URL}/reviews/${slug}/payment-methods`,
    lastModified: lm(`/reviews/${slug}/payment-methods`),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // KYC sub-page allowlist, must mirror KYC_SLUGS in app/reviews/[slug]/kyc/page.tsx
  const kycPageSlugs = ['bitstarz', 'bc-game', 'cloudbet', 'roobet']
  const casinoKycPages: MetadataRoute.Sitemap = kycPageSlugs.map((slug) => ({
    url: `${BASE_URL}/reviews/${slug}/kyc`,
    lastModified: lm(`/reviews/${slug}/kyc`),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Bonus sub-page allowlist, must mirror BONUS_SLUGS in
  // app/reviews/[slug]/bonus/page.tsx. Single slug by design: see the header
  // comment on that route before adding a second.
  const bonusPageSlugs = ['bitstarz']
  const casinoBonusPages: MetadataRoute.Sitemap = bonusPageSlugs.map((slug) => ({
    url: `${BASE_URL}/reviews/${slug}/bonus`,
    lastModified: lm(`/reviews/${slug}/bonus`),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Guides carry real per-guide dates in lib/guides.ts (`modified`), the
  // data-level pattern the rest of the site is converging on.
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.modified),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Crypto pages carry data-level dates in lib/crypto-content.ts (Batch 2b),
  // which override the floor map: editing one coin's copy bumps that URL alone.
  const cryptoPages: MetadataRoute.Sitemap = CRYPTO_LIST.map((crypto) => ({
    url: `${BASE_URL}/crypto/${crypto.slug}`,
    lastModified: new Date(cryptoEditorial[crypto.slug].modified),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Countries carry data-level dates in lib/country-content.ts (`modified`),
  // which override the floor map: editing one country's copy bumps that URL
  // alone, not all ten (the failure mode a shared source file would create).
  const countryPages: MetadataRoute.Sitemap = COUNTRY_LIST.map((country) => ({
    url: `${BASE_URL}/country/${country.slug}`,
    lastModified: new Date(countryEditorial[country.slug].modified),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Legal sub-page allowlist, must mirror LEGAL_ALLOWLIST in app/country/[slug]/legal/page.tsx
  const legalSubpageSlugs = ['canada', 'australia']
  const countryLegalPages: MetadataRoute.Sitemap = legalSubpageSlugs.map((slug) => ({
    url: `${BASE_URL}/country/${slug}/legal`,
    lastModified: lm(`/country/${slug}/legal`),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Game statics carry data-level dates in lib/game-content.ts (Batch 2b).
  const gamePages: MetadataRoute.Sitemap = GAME_TYPES.map((game) => ({
    url: `${BASE_URL}/game/${game.slug}`,
    lastModified: new Date(gameEditorial[game.slug].modified),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Bonus pages carry data-level dates in lib/bonus-content.ts (`editorial.modified`,
  // Batch 2a), which override the floor map: editing one bonus page's copy bumps
  // that URL alone, not all seven. Covers /bonus/free-spins too (static segment,
  // same data source).
  const bonusPages: MetadataRoute.Sitemap = BONUS_TYPES.map((bonus) => ({
    url: `${BASE_URL}/bonus/${bonus.slug}`,
    lastModified: new Date(BONUS_CONTENT[bonus.slug].editorial.modified),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Compare pages: allowlist and dates are data-level in lib/compare-content.ts
  // (Batch 2c, 2026-08-22), the same single-source pattern as bonus/crypto/game.
  // Editing one pair's shell bumps that URL alone. The floor-map compare entries
  // in lib/route-lastmod.ts are fallback-only from this commit on.
  const comparisonPages: MetadataRoute.Sitemap = COMPARE_PAIRS.map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: new Date(compareEditorial[slug].modified),
    changeFrequency: 'monthly',
    priority: 0.65,
  }))

  // Regulatory trackers (programme launch 2026-08-11): living pages, dates
  // data-level from lib/tracker-content.ts, bumped on every logged update.
  const trackerPages: MetadataRoute.Sitemap = TRACKER_LIST.map((t) => ({
    url: `${BASE_URL}/tracker/${t.slug}`,
    lastModified: new Date(trackerShell[t.slug].modified),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...casinoReviewPages, ...casinoWithdrawalPages, ...casinoPaymentMethodsPages, ...casinoKycPages, ...casinoBonusPages, ...guidePages, ...cryptoPages, ...countryPages, ...countryLegalPages, ...gamePages, ...bonusPages, ...comparisonPages, ...trackerPages]
}
