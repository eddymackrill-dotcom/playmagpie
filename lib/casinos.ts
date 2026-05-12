export type Casino = {
  name: string
  slug: string
  logo: string
  licence: string
  acceptedCryptos: string[]
  withdrawalTime: string
  minDeposit: string
  kycLevel: 'None' | 'Light' | 'Standard' | 'Full'
  vipProgram: boolean
  bonusSummary: string
  restrictedCountries: string[]
  trustScore: number
  withdrawalScore: number
  bonusFairnessScore: number
  kycScore: number
  affiliateUrl: string
  reviewSummary: string
  pros: string[]
  cons: string[]
  featured: boolean
  badges: string[]
}

export const casinos: Casino[] = [
  {
    name: 'BitStarz',
    slug: 'bitstarz',
    logo: '/logos/bitstarz.png',
    licence: 'Curaçao eGaming (Antillephone N.V.)',
    acceptedCryptos: ['BTC', 'ETH', 'LTC', 'DOGE', 'BCH', 'USDT'],
    withdrawalTime: 'Under 10 minutes',
    minDeposit: '$20',
    kycLevel: 'Light',
    vipProgram: true,
    bonusSummary: 'Up to 5 BTC + 200 free spins across your first four deposits',
    restrictedCountries: ['US', 'UK', 'AU', 'NL', 'FR'],
    trustScore: 9.2,
    withdrawalScore: 9.5,
    bonusFairnessScore: 8.8,
    kycScore: 8.5,
    affiliateUrl: 'https://bzstarz2.com/bcdvryve8',
    reviewSummary:
      'BitStarz is one of the most decorated crypto casinos on the market, having won multiple "Best Bitcoin Casino" awards since launching in 2014. With over 3,000 games from 100+ providers, consistently fast crypto withdrawals, and a proven track record, it remains the benchmark other crypto casinos are measured against. The 5 BTC welcome package is genuinely competitive, though the 25% admin fee on certain bonus withdrawals is a notable catch to be aware of.',
    pros: [
      'Industry-leading reputation — multiple "Best Bitcoin Casino" awards since 2014',
      'Vast game library: 3,000+ titles including slots, live dealer and provably fair games',
      'Consistently fast crypto withdrawals — typically processed in under 10 minutes',
      'Accepts 6 cryptocurrencies including BTC, ETH, LTC, DOGE, BCH and USDT',
      'Generous welcome package: up to 5 BTC + 200 free spins across four deposits',
      '24/7 multilingual live chat support',
    ],
    cons: [
      '25% admin fee deducted from bonus-related withdrawals — a significant hidden cost',
      'Light KYC required for larger withdrawals and fiat transactions',
      'US, UK and Australian players restricted',
      'Wagering requirements on match bonuses can reach 40x',
    ],
    featured: true,
    badges: ['Top Rated', 'Fast Payouts', 'VIP', 'Crypto'],
  },
  {
    name: 'BC.Game',
    slug: 'bc-game',
    logo: '/logos/bc-game.png',
    licence: 'Curaçao eGaming',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'DOGE', 'LTC', 'XRP', 'TRX', 'USDC', 'ADA', 'MATIC', 'BCH', 'ETC', 'DASH', '100+ more'],
    withdrawalTime: 'Instant to 10 minutes',
    minDeposit: '$5',
    kycLevel: 'None',
    vipProgram: true,
    bonusSummary: 'Up to 300% deposit bonus + 200 free spins across first 4 deposits',
    restrictedCountries: ['US', 'FR', 'NL'],
    trustScore: 8.9,
    withdrawalScore: 9.3,
    bonusFairnessScore: 8.5,
    kycScore: 9.5,
    affiliateUrl: 'https://bc.game/i-9767kimyer-n/',
    reviewSummary:
      'BC.Game is one of the most crypto-native casinos in the industry, operating since 2017 with a core focus on blockchain gaming. It supports over 100 cryptocurrencies for deposits and withdrawals — by far the widest selection on the market — and operates a strict no-KYC policy. The platform hosts 10,000+ games including provably fair originals, a full sportsbook, and one of the strongest VIP loyalty systems available. Withdrawals are processed almost instantly for most coins, and the $5 minimum deposit makes it accessible at any bankroll level.',
    pros: [
      '100+ cryptocurrencies accepted — widest selection of any major crypto casino',
      'Strict no-KYC policy — sign up with email only, no documents ever required',
      'Instant to near-instant withdrawals across most supported blockchains',
      '10,000+ games including provably fair originals, slots, live dealer and sports',
      'Tiered VIP programme with dedicated managers, higher limits and cashback',
      '$5 minimum deposit — accessible for all bankroll sizes',
    ],
    cons: [
      '25% standard affiliate commission rate on player losses — passed on in bonus value',
      'Restricted in USA, France and Netherlands',
      'Customer support response times can be slow during peak hours',
      'Vast game library can make navigation overwhelming for new players',
    ],
    featured: true,
    badges: ['No KYC', 'Fast Payouts', 'VIP', 'Crypto'],
  },
  {
    name: 'Cloudbet',
    slug: 'cloudbet',
    logo: '/logos/cloudbet.png',
    licence: 'Curaçao eGaming + Kahnawake Gaming Commission',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'BNB', 'DOGE', 'LTC', 'BCH', 'PAX'],
    withdrawalTime: 'Instant to 30 minutes',
    minDeposit: '0.001 BTC equivalent',
    kycLevel: 'Light',
    vipProgram: true,
    bonusSummary: '100% deposit bonus up to 5 BTC + ongoing reload bonuses',
    restrictedCountries: ['US', 'UK', 'FR', 'NL', 'AU'],
    trustScore: 8.7,
    withdrawalScore: 9.0,
    bonusFairnessScore: 8.3,
    kycScore: 8.8,
    affiliateUrl: 'https://cldbt.cloud/go/en/landing/bitcoin-casino?af_token=d30618699794f13b6b09b67534671ded&aftm_campaign=playmagpie&aftm_source=organic&aftm_medium=SEO',
    reviewSummary:
      'Cloudbet is one of the longest-standing crypto casinos in the industry, established in 2013. That track record counts: Cloudbet has processed withdrawals reliably through multiple crypto cycles without issues. It operates under dual licensing from Curaçao eGaming and the Kahnawake Gaming Commission. The platform is particularly strong for high rollers — there are no withdrawal limits, the 5 BTC welcome bonus is one of the most generous available, and the VIP programme delivers meaningful cashback and dedicated support. The sportsbook is among the best-in-class for crypto betting.',
    pros: [
      'Established in 2013 — one of the longest-running and most trusted crypto casinos',
      'No withdrawal limits — critical for high-roller play',
      'Excellent sportsbook with crypto betting across hundreds of markets',
      'Dual licensing: Curaçao eGaming + Kahnawake Gaming Commission',
      'High-roller friendly — large single-bet limits and dedicated VIP support',
      'Supports 10 major cryptocurrencies including BTC, ETH, USDT, SOL and BNB',
    ],
    cons: [
      'Game library lighter than newer competitors — fewer slots providers',
      '25% starting commission rate on standard affiliate terms',
      'Light KYC may be triggered for very large withdrawal amounts',
      'Restricted in USA, UK, France, Netherlands and Australia',
    ],
    featured: true,
    badges: ['Top Rated', 'Fast Payouts', 'VIP', 'High Roller'],
  },
  {
    name: 'Mirax Casino',
    slug: 'mirax-casino',
    logo: '/logos/mirax-casino.png',
    licence: 'Curaçao eGaming',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'LTC', 'DOGE', 'BCH', 'XRP'],
    withdrawalTime: 'Instant to 15 minutes',
    minDeposit: '$20',
    kycLevel: 'Light',
    vipProgram: true,
    bonusSummary: '325% up to $3,250 + 250 free spins across first 4 deposits',
    restrictedCountries: ['US', 'UK', 'AU', 'NL', 'FR'],
    trustScore: 8.6,
    withdrawalScore: 8.8,
    bonusFairnessScore: 8.4,
    kycScore: 8.6,
    affiliateUrl: 'https://mirax.partners/pua8ehgj5',
    reviewSummary:
      'Mirax Casino launched in 2022 and is part of the 7Bit Partners network, which also operates 7Bit Casino — a brand with over a decade of industry experience. Despite being a newer brand, Mirax benefits from the infrastructure and relationships of an established operator. The welcome package is among the most generous in the market: 325% across four deposits up to $3,250 with 250 free spins. The game library covers 7,000+ titles and crypto withdrawals are typically processed within 15 minutes, with light KYC only triggered above higher withdrawal thresholds.',
    pros: [
      'Exceptionally generous welcome package: 325% up to $3,250 + 250 free spins',
      'Part of the established 7Bit Partners network — proven operator infrastructure',
      '7,000+ games from top-tier providers including Evolution, Pragmatic Play and NetEnt',
      'Fast crypto withdrawals — typically instant to 15 minutes',
      'Tiered VIP programme with cashback, higher limits and personal account management',
      'Accepts 7 major cryptocurrencies including BTC, ETH, USDT and LTC',
    ],
    cons: [
      'Relatively new brand — launched 2022, shorter track record than older rivals',
      'Light KYC may be required for larger withdrawals',
      'Limited fiat payment options — primarily crypto-focused',
      'Restricted in USA, UK, Australia, Netherlands and France',
    ],
    featured: true,
    badges: ['Fast Payouts', 'VIP', 'Crypto', 'Top Rated'],
  },
  {
    name: '7Bit Casino',
    slug: '7bit-casino',
    logo: '/logos/7bit-casino.png',
    licence: 'Curaçao eGaming',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'LTC', 'DOGE', 'BCH', 'XRP', 'BNB'],
    withdrawalTime: 'Instant to 10 minutes',
    minDeposit: '$10',
    kycLevel: 'None',
    vipProgram: true,
    bonusSummary: '100% up to 1.5 BTC + 100 free spins on first deposit, plus weekly reload bonuses',
    restrictedCountries: ['US', 'UK', 'AU', 'NL', 'FR'],
    trustScore: 8.8,
    withdrawalScore: 9.1,
    bonusFairnessScore: 8.6,
    kycScore: 9.2,
    affiliateUrl: 'https://7bit.partners/plmd4b5bb',
    reviewSummary:
      '7Bit Casino has operated since 2014, making it one of the longest-running Bitcoin casinos in the industry. Over more than a decade it has built a consistent reputation for fast crypto payouts, a strict no-KYC policy for crypto withdrawals, and a broad game library. The platform supports 8 cryptocurrencies and processes withdrawals almost instantly for most coins. The game library spans 7,000+ titles including slots, table games, live dealer and provably fair originals. Weekly reload bonuses run continuously, and a structured VIP programme rewards regular players with tiered cashback and higher limits.',
    pros: [
      'Established since 2014 — over a decade of reliable operation in the Bitcoin casino space',
      'No KYC required for crypto withdrawals — full anonymity maintained',
      'Instant to 10-minute crypto withdrawals across 8 supported coins',
      'Provably fair games available — independently verifiable outcomes',
      'Weekly reload bonuses with transparent terms',
      'Comprehensive VIP programme with tiered cashback and personal account management',
    ],
    cons: [
      'Welcome bonus capped at 1.5 BTC — lower ceiling than some competitors',
      'Live dealer game selection smaller than dedicated live casino platforms',
      'Fiat deposit and withdrawal options are limited',
    ],
    featured: true,
    badges: ['No KYC', 'Fast Payouts', 'VIP', 'Crypto'],
  },
]

export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find((c) => c.slug === slug)
}

export function getFeaturedCasinos(): Casino[] {
  return casinos.filter((c) => c.featured)
}

export function getTopCasinos(n = 5): Casino[] {
  return [...casinos].sort((a, b) => b.trustScore - a.trustScore).slice(0, n)
}
