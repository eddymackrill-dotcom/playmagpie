// Roobet factual profile + reputational findings verified May 2026 against primary sources:
// - Restricted territories + 2% fiat withdrawal fee on 11+/30-day: roobet.com/terms §3.5 + §10.8 (user-verified from live ToS)
// - Operating entity Raw Entertainment B.V., Curaçao reg. 157205: Casino.Guru + AskGamblers profiles (Dec 2025)
// - $84,000 unsolved AskGamblers complaint: https://www.askgamblers.com/casino-complaints/roobet-casino-account-wrongfully-locked-after-requesting-usd84-000-withdrawal-1
// - Pattern of $20k-$115k withdrawal holds resolved via AskGamblers mediation: https://www.askgamblers.com/online-casinos/reviews/roobet-casino-casino/complaints
// - Card-counting "low-risk play" confiscation case (Jan 2025): https://casino.guru/roobet-casino-player-s-funds-have-been-confiscated
// - Self-exclusion failures: https://lcb.org/onlinecasinobonusforum/player-complaints/roobet-self-exclusion + https://casino.guru/roobet-casino-the-player-s-self-exclusion-failed
// - Twitch gambling-stream ban (Oct 2022): https://www.nbcnews.com/tech/tech-news/twitch-announces-will-ban-users-streaming-unlicensed-gambling-content-rcna48663
// - ASCI India referral to MIB (Feb 2025): https://www.storyboard18.com/gaming-news/exclusive-asci-to-report-snoop-dogg-backed-gambling-platform-roobet-to-mib-57751.htm
// - Chelsea FC LatAm + Canada (excl. Ontario) partnership (Jan 2025): https://www.chelseafc.com/en/news/article/roobet-official-betting-partner-in-latin-america-and-canada
// - Fast Track third-party breach (Oct 2025): https://www.vegasslotsonline.com/news/2025/10/13/roobet-says-users-arent-impacted-after-external-partner-suffered-cyber-attack/
// - Curaçao LOK regime end of orange-seal transition (15 Oct 2025): https://gamblingtalk.net/news/curacao-to-end-orange-seal-system-on-15-october-2025-as-sublicensing-era-concludes
// - Anjouan secondary licence ALSI-202507005 (per Casino.Guru, verified listing): https://casino.guru/roobet-casino-review
// - Roowards 2.0 VIP product (30 tiers + invite-only top VIP Club): aggregated across thespike.gg, bitcoinchaser.com, gamechampions.com
// - $200k/day max withdrawal + $10 min withdrawal + $10 min deposit: AskGamblers + thespike.gg (May 2026)

// Bonus / welcome-package terms verified 2026-05-30 against each operator's
// live promotions / T&C page (user-pulled directly, primary source). Prior
// bonusSummary entries were stale by multiple revisions — corrected below.
// - BC.Game current welcome offer: 220% Deposit Rakeback Welcome Bonus across
//   4 monthly stages (180%+40% / 240%+60% / 300%+100% / 360%+140% RakeBack).
//   No free spins component in the current structure. Source:
//   https://bc.game/deposit-offer (verified 2026-05-30).
// - BitStarz welcome package: 5 BTC + 180 free spins across first 4 deposits.
//   180 free spins credited as 20 instant + 20/day for 8 consecutive days
//   (T&C §2.7). Source: https://www.bitstarz.com/promotions T&C (last updated
//   25 June 2025, verified 2026-05-30).
// - Mirax Casino welcome pack: up to 5 BTC + 150 free spins across 4 deposits.
//   D1: 1.5 BTC + 100 FS (no code); D2: 1.25 BTC + 50 FS (code W2); D3: 1.25
//   BTC cash-only (code W3); D4: 1 BTC cash-only (code W4). Max cashout from
//   free spins = €100. Source: https://miraxcasino.com/promotions (verified
//   2026-05-30).
// - 7Bit Casino welcome pack: 325% match up to €5,400 + 250 free spins across
//   the 4-deposit welcome pack. Source: https://7bitcasino.com/bonuses
//   (verified 2026-05-30).

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
  /**
   * Optional. Replaces the generic "no middlemen, no holds" tail in ReviewSection's
   * withdrawal block when set. Use when the casino has documented withdrawal holds
   * that contradict the generic claim — keeps the review honest at the data layer
   * rather than requiring a fork of the review template.
   */
  withdrawalCaveat?: string
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
    bonusSummary: 'Up to 5 BTC + 180 free spins across your first four deposits',
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
      'Generous welcome package: up to 5 BTC + 180 free spins across four deposits',
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
    bonusSummary: '220% Deposit Rakeback Welcome — 4 monthly stages from 180%+40% RakeBack to 360%+140% RakeBack, locked balance unlocks as you wager (min $5)',
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
    bonusSummary: 'Up to 5 BTC + 150 free spins across first 4 deposits (100 on D1, 50 on D2, cash-only on D3/D4)',
    restrictedCountries: ['US', 'UK', 'AU', 'NL', 'FR'],
    trustScore: 8.6,
    withdrawalScore: 8.8,
    bonusFairnessScore: 8.4,
    kycScore: 8.6,
    affiliateUrl: 'https://mirax.partners/pua8ehgj5',
    reviewSummary:
      'Mirax Casino launched in 2022 and is part of the 7Bit Partners network, which also operates 7Bit Casino — a brand with over a decade of industry experience. Despite being a newer brand, Mirax benefits from the infrastructure and relationships of an established operator. The welcome package spans the first four deposits with a 5 BTC headline ceiling: 1.5 BTC + 100 free spins on the first deposit, 1.25 BTC + 50 free spins on the second (code W2), then cash-only matches of 1.25 BTC on the third (code W3) and 1 BTC on the fourth (code W4). The free-spins component totals 150 across the pack with a €100 max cashout on free-spin winnings per the live promotions page. The game library covers 7,000+ titles and crypto withdrawals are typically processed within 15 minutes, with light KYC only triggered above higher withdrawal thresholds.',
    pros: [
      'Substantial welcome package: up to 5 BTC + 150 free spins across the 4-deposit pack (100 on D1, 50 on D2, cash-only on D3/D4)',
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
    bonusSummary: '325% match up to €5,400 + 250 free spins across the 4-deposit welcome pack, plus weekly reload bonuses',
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
      'Live dealer game selection smaller than dedicated live casino platforms',
      'Fiat deposit and withdrawal options are limited',
    ],
    featured: true,
    badges: ['No KYC', 'Fast Payouts', 'VIP', 'Crypto'],
  },
  {
    name: 'Shuffle',
    slug: 'shuffle',
    logo: '/logos/shuffle.png',
    licence: 'Curaçao (Natural Nine B.V.)',
    acceptedCryptos: ['BTC', 'ETH', 'LTC', 'USDT', 'USDC', 'SOL', 'DOGE', 'BNB', 'XRP', 'TRX', 'MATIC', 'SHFL'],
    withdrawalTime: 'Instant to 10 minutes',
    minDeposit: '$20',
    kycLevel: 'Light',
    vipProgram: true,
    bonusSummary: '100% deposit bonus up to $1,000 plus SHFL token rewards and rakeback',
    restrictedCountries: ['US', 'UK', 'AU', 'NL', 'FR'],
    trustScore: 8.2,
    withdrawalScore: 8.8,
    bonusFairnessScore: 7.8,
    kycScore: 8.0,
    affiliateUrl: 'https://shuffle.com?r=XvbI9QwSTw',
    reviewSummary:
      'Shuffle is a fast-growing crypto casino and sportsbook that launched in 2022, built around its own native SHFL token and a community-driven rakeback rewards model. The platform hosts 10,000+ games from major providers alongside Shuffle Originals — provably fair in-house games with independently verifiable outcomes. Crypto withdrawals are processed instantly to 10 minutes for most transactions across 12 supported cryptocurrencies. The SHFL token enables ongoing airdrop rewards and stacked rakeback, giving active players continuous value beyond the initial welcome bonus. The main caveats: a 35x wagering requirement on the welcome offer is above the industry average, the bonus must be activated via live chat rather than automatically, and KYC checks can be triggered at withdrawal for larger amounts.',
    pros: [
      '10,000+ games including Shuffle Originals — provably fair in-house titles',
      'Instant to 10-minute crypto withdrawals across most supported networks',
      'Native SHFL token with airdrop rewards for active players',
      '12 cryptocurrency options including BTC, ETH, SOL, USDC and SHFL',
      'Strong rakeback-based VIP programme with transparent tier progression',
      'Excellent 24/7 customer support via live chat',
    ],
    cons: [
      '35x wagering requirement on welcome bonus — above industry average',
      'Welcome bonus must be activated via live chat, not automatically',
      'KYC verification can be triggered at withdrawal for larger amounts',
      'Curaçao licence only — less regulated than MGA-licensed alternatives',
      'Some reports of temporary holds on high-value withdrawals pending review',
    ],
    featured: true,
    badges: ['Fast Payouts', 'VIP', 'Crypto'],
  },
  {
    name: 'Duelbits',
    slug: 'duelbits',
    logo: '/logos/duelbits.png',
    licence: 'Curacao (Antillephone N.V.)',
    acceptedCryptos: ['BTC', 'ETH', 'LTC', 'USDT', 'USDC', 'DOGE', 'SOL', 'BNB', 'BCH', 'XRP', 'TRX', 'MATIC'],
    withdrawalTime: 'Instant to 5 minutes',
    minDeposit: '$10',
    kycLevel: 'None',
    vipProgram: true,
    bonusSummary: 'Up to $30 cashback weekly plus Duelbits Originals rewards and seasonal promotions',
    restrictedCountries: ['US', 'UK', 'AU', 'NL', 'FR'],
    trustScore: 8.5,
    withdrawalScore: 9.2,
    bonusFairnessScore: 8.4,
    kycScore: 9.3,
    affiliateUrl: 'https://go.duelbits.io/visit/?bta=38006&brand=duelbits',
    reviewSummary:
      'Duelbits is a modern crypto-native casino and sportsbook launched in 2020, built around its own Duelbits Originals games — provably fair slots, crash, plinko and dice with cryptographically verifiable outcomes. The platform operates a no-KYC policy for crypto play and withdrawals, with only basic checks triggered for unusual activity, and processes most crypto payouts in under 5 minutes across 12 supported cryptocurrencies. The bonus structure is cashback-focused rather than headline match: up to $30 weekly cashback plus continuous Duelbits Originals rewards and seasonal leaderboard promotions, which delivers better real expected value than high-wagering match bonuses for active players. Duelbits is particularly popular with streamers and high rollers — the VIP system runs on rakeback rather than tier-locked bonuses, and the platform interface is cleaner and more crypto-native than older brands.',
    pros: [
      'No KYC required for crypto play and withdrawals — basic checks only',
      'Instant crypto withdrawals — typically processed in under 5 minutes',
      'Duelbits Originals — provably fair house games (slots, crash, plinko, dice)',
      '12 supported cryptocurrencies including BTC, ETH, USDT, SOL, BNB and MATIC',
      'Weekly cashback up to $30 plus seasonal bonuses and Originals rewards',
      'Streamer-friendly with an active community and frequent leaderboard events',
      'Modern interface designed for crypto users — clean cashier and account flows',
    ],
    cons: [
      'Welcome bonus is cashback-focused rather than a large deposit match',
      'Smaller game library than older established casinos like BC.Game or BitStarz',
      'Curaçao licence only — less regulated than MGA-licensed alternatives',
      'Some restricted jurisdictions including US, UK and Australia',
    ],
    featured: true,
    badges: ['No KYC', 'Fast Payouts', 'VIP', 'Crypto'],
  },
  {
    name: 'Roobet',
    slug: 'roobet',
    logo: '/logos/roobet.png',
    licence: 'Curaçao (Raw Entertainment B.V., reg. 157205) + Anjouan ALSI-202507005',
    acceptedCryptos: ['BTC', 'ETH', 'LTC', 'USDT', 'USDC', 'XRP', 'TRX', 'DOGE'],
    withdrawalTime: '~15 minutes for most crypto; BTC up to 24 hours; no weekend processing',
    minDeposit: '$10',
    kycLevel: 'Standard',
    vipProgram: true,
    bonusSummary: 'No traditional welcome bonus — 7-day 20% net-loss cashback capped near $1,400 plus a $5 sportsbook free bet (code MAXBONUS)',
    // Full territory list lifted verbatim from roobet.com/terms §3.5 (user-verified
    // May 2026). Stored as full country names rather than ISO codes — country-page
    // exclusion is driven via casinoAcceptsCountry() which matches full names only,
    // so this list also serves as the authoritative restricted-jurisdictions copy
    // on the review page.
    restrictedCountries: [
      'Aruba', 'Australia', 'Belgium', 'Bonaire', 'Cuba', 'Curacao', 'Cyprus', 'Denmark',
      'Germany', 'Gibraltar', 'Haiti', 'Israel', 'Iran', 'Iraq', 'Malta', 'Myanmar',
      'Netherlands', 'Nicaragua', 'North Korea', 'Ontario', 'Portugal', 'Saba',
      'Saint Maarten', 'Saint Martin', 'South Sudan', 'Spain', 'Statia', 'Syria',
      'Sweden', 'United States', 'United Kingdom', 'Yemen', 'Zimbabwe',
    ],
    trustScore: 6.8,
    withdrawalScore: 6.5,
    bonusFairnessScore: 6.0,
    kycScore: 6.5,
    affiliateUrl: 'https://go.roobet.com/visit/?bta=45872&brand=roobet',
    reviewSummary:
      'Roobet has been operating since 2019 under Raw Entertainment B.V. (Curaçao registration 157205), with a secondary Anjouan licence picked up in 2025 as the Curaçao licensing regime moved from the legacy sub-licensee model to the post-LOK direct framework. The product is built around Roobet Originals — Crash is the flagship, with Mines, Towers, Dice, Plinko and the Snoop-branded HotBox variant alongside roughly 6,000 third-party slots and a full sportsbook that picked up regional partnership deals with Chelsea FC (Latin America plus Canada outside Ontario) and 100 Thieves in 2025. The honest picture has two sides. The catalogue is real, the originals are provably fair, and headline crypto withdrawals process in around 15 minutes across the 8 supported coins. The documented track record at the high-stakes end is harder to ignore — AskGamblers carries Roobet complaints at $20k, $84k, $97k, $111k and $115k where verified accounts saw cashouts held in "routine verification" for days, and the $84,000 case is publicly listed as Unsolved. Roobet T&C explicitly authorise winnings confiscation on "low-risk play," with a January 2025 card-counting case running ~$2,700-3,000 voided on those grounds. There is also no traditional welcome bonus — only net-loss cashback that only triggers if you lose. The restricted-territories list is unusually wide for a Curaçao operator, covering the UK, US, Germany, Netherlands, Sweden and Australia among others, which is itself useful signal about the platform\'s offshore positioning. Roobet is a usable platform for crash-led play at modest stakes; it is not where you want to be holding a five- or six-figure win waiting on a cashier review.',
    pros: [
      'Roobet Originals — Crash is the flagship, plus Mines, Towers, Dice, Plinko and the Snoop-branded HotBox variant, all provably fair',
      '~6,000 third-party slots from providers including Pragmatic Play, Hacksaw, Play\'n GO, Push, Relax, Nolimit City and NetEnt',
      'Full crypto sportsbook covering ~40 sports including esports, plus regional partnerships with Chelsea FC (LatAm + Canada outside Ontario) and 100 Thieves',
      'Headline crypto withdrawal time of ~15 minutes across 8 supported coins (BTC, ETH, LTC, USDT, USDC, XRP, TRX, DOGE)',
      '$10 minimum deposit and minimum withdrawal — accessible entry point for smaller bankrolls',
      'Roowards 2.0 — 30-tier rakeback programme with rakeback drops every 30 minutes, plus invite-only top VIP Club above it',
    ],
    cons: [
      'Documented pattern of withdrawal holds on large wins — AskGamblers complaints at $20k, $84k, $97k, $111k and $115k where verified accounts saw "routine verification" stretch days; the $84,000 case is publicly listed as Unsolved as of 2026',
      'T&C permit winnings confiscation on "low-risk play" — Jan 2025 card-counting case voided $2,700-3,000 with Roobet stating "this decision is final" (case logged on Casino.Guru)',
      'Self-exclusion has not been bulletproof — documented LCB.org case (2021, ~$200k lifetime exposure across three accounts) and Casino.Guru Ireland case (€1,061 deposited a month after a self-exclusion request, refund refused on the basis that the player had not disclosed gambling-problem status)',
      'Offshore-only licensing — Curaçao (Raw Entertainment B.V., transitioning under post-LOK regime) plus secondary Anjouan ALSI-202507005; no Tier 1 regulator backing (UK GC, MGA, AGCO etc.)',
      'No traditional welcome bonus — only a 7-day 20% net-loss cashback capped near $1,400 plus a $5 sports free bet; value only realised on losses',
      'Notably wide restricted-territory list — UK, US, Germany, Netherlands, Sweden, Australia, Belgium, Denmark, Portugal, Spain, Cyprus, Malta and more excluded',
      'Twitch banned Roobet streams in October 2022 alongside Stake, Rollbit and Duelbits — content presence is now Kick-led; ASCI in India referred Roobet to the Ministry of Information & Broadcasting in February 2025 over alleged UPI payment-partner claims',
      '$200,000/day withdrawal cap and no weekend cashout processing — material constraints for the high-roller use case despite the Roowards VIP structure',
      '2% fiat withdrawal fee triggered on every fiat cashout after the 10th in a rolling 30-day window (per terms §10.8)',
    ],
    featured: false,
    badges: ['Crash Originals', 'Sportsbook', 'Crypto'],
    withdrawalCaveat:
      'Headline processing time is ~15 minutes for most cryptos (no weekend cashier). The honest caveat: AskGamblers carries multiple resolved-but-multi-day delay cases against Roobet at $20k+, and one publicly Unsolved $84,000 account-lock case. Expect KYC re-triggers on any sizeable cashout regardless of account tenure.',
  },
]

// Maps each country slug we have a page for to the token(s) we look for in a
// casino's restrictedCountries array. Full country names ONLY — existing casinos
// use ISO codes ('AU', 'NL') which are deliberately NOT in this map, so they
// keep their current behaviour on country pages (rendered with the standard
// "verify acceptance before depositing" warning). Roobet uses full country
// names per its live ToS §3.5, so the filter only catches Roobet today.
// Add ISO codes here later if we decide to enforce restriction filtering for
// the rest of the catalogue — it would be a separate editorial decision.
const COUNTRY_RESTRICTION_TOKENS: Record<string, string[]> = {
  australia: ['Australia'],
  canada: ['Canada'],
  germany: ['Germany'],
  ireland: ['Ireland'],
  japan: ['Japan'],
  netherlands: ['Netherlands'],
  'new-zealand': ['New Zealand'],
  norway: ['Norway'],
  sweden: ['Sweden'],
}

export function casinoAcceptsCountry(casino: Casino, countrySlug: string): boolean {
  const tokens = COUNTRY_RESTRICTION_TOKENS[countrySlug]
  if (!tokens) return true
  return !casino.restrictedCountries.some((r) => tokens.includes(r))
}

export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find((c) => c.slug === slug)
}

export function getFeaturedCasinos(): Casino[] {
  return casinos.filter((c) => c.featured)
}

export function getTopCasinos(n = 5): Casino[] {
  return [...casinos].sort((a, b) => b.trustScore - a.trustScore).slice(0, n)
}
