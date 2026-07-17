import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { casinos, getCasinoBySlug } from '@/lib/casinos'
import { casinoLastReviewed } from '@/lib/last-reviewed'
import ReviewSection from '@/components/ReviewSection'
import ScoreBadge from '@/components/ScoreBadge'
import CTAButton from '@/components/CTAButton'
import Link from 'next/link'

export async function generateStaticParams() {
  return casinos.map((c) => ({ slug: c.slug }))
}

const casinoMetaDescriptions: Record<string, string> = {
  bitstarz: 'BitStarz review 2026. Award-winning Bitcoin casino: 5 BTC + 180 free spins, 3,000+ games, under 10-min crypto withdrawals. Rated 9.2/10 by PlayMagpie.',
  'bc-game': 'BC.Game review 2026. No-KYC crypto casino: 100+ cryptocurrencies, instant withdrawals, 10,000+ games. Zero identity verification required. Rated 8.9/10.',
  cloudbet: 'Cloudbet review 2026. Trusted since 2013: $2,500 welcome package with no wagering, no withdrawal limits for verified accounts, excellent sportsbook for crypto bettors. Rated 8.7/10 by PlayMagpie.',
  'mirax-casino': 'Mirax Casino review 2026. Up to 5 BTC + 150 free spins across the 4-deposit welcome pack, 7,000+ games, fast crypto withdrawals in under 15 minutes. Rated 8.6/10.',
  '7bit-casino': '7Bit Casino review 2026. No-KYC Bitcoin casino since 2014: instant withdrawals, 7,000+ games, weekly reload bonuses and VIP cashback. Rated 8.8/10.',
  shuffle: 'Shuffle Casino review 2026. Native SHFL token, rakeback VIP rewards, 10,000+ games and instant crypto withdrawals. 12 cryptocurrencies accepted. Rated 8.2/10.',
  duelbits: 'Duelbits review 2026. No-KYC crypto casino since 2020: Duelbits Originals, instant under-5-minute withdrawals, weekly cashback and rakeback VIP. 12 cryptos accepted. Rated 8.5/10.',
  roobet: 'Roobet review 2026. Crash-led Originals, ~6,000 slots and a sportsbook. Honest take on documented withdrawal holds on $20k+ wins, the "low-risk play" T&C clause, and the offshore-only Curaçao + Anjouan licensing. Rated 6.8/10.',
}

// Sub-page index: per-casino contextual links to the deep-dive pages that
// exist below this review. Sub-pages without an inbound link from the parent
// review get deprioritised by search, so each entry below has natural anchor
// text written to match the sub-page's actual angle, not generic phrasing.
// Add entries here as new sub-pages ship.
const casinoSubPages: Record<string, { href: string; label: string; teaser: string }[]> = {
  bitstarz: [
    {
      href: '/reviews/bitstarz/withdrawal',
      label: 'BitStarz withdrawal times in detail: under 10 minutes, no cashier fees',
      teaser: 'The fee-free cashier per the live terms, KYC triggers, and what each of the six supported coins means for clearing time.',
    },
    {
      href: '/reviews/bitstarz/payment-methods',
      label: 'BitStarz deposits: six classic coins, $20 floor, and the fiat-vs-crypto KYC fork',
      teaser: 'Per-coin deposit speeds, why there is no Solana, BNB or USDC in the lineup, and how choosing crypto over fiat keeps your verification light.',
    },
  ],
  // Mirax withdrawal sub-page absorbed into this parent review 2026-07-07
  // (spam-update consolidation): the sub-page went impression-dark in June,
  // was dropped from the index by the June 2026 spam update, and its unique
  // facts now live in the withdrawal-times FAQ below. /reviews/mirax-casino/
  // withdrawal 301s here via next.config.ts.
  '7bit-casino': [
    {
      href: '/reviews/7bit-casino/withdrawal',
      label: '7Bit withdrawal: no-KYC at any amount, eight coins, under 10 minutes',
      teaser: 'What no-KYC actually means at the 7Bit cashier, the eight-coin lineup with per-network notes, and how the 325% / €5,400 welcome pack interacts with cash-out posture.',
    },
  ],
  cloudbet: [
    {
      href: '/reviews/cloudbet/withdrawal',
      label: 'Cloudbet withdrawal: the verified-account no-limit policy, dual-regulator backstop, 29-coin lineup',
      teaser: 'Why the standard cashier handles outsized payouts without an exceptions path, what the Kahnawake licence adds, and how SOL or BNB clear fastest end-to-end.',
    },
    {
      href: '/reviews/cloudbet/payment-methods',
      label: 'Cloudbet deposits: 29 cryptos, ~$1 minimum, fiat rails via Jeton and Vega',
      teaser: 'Per-coin deposit behaviour, the new low deposit floor and fiat options, and why the Kahnawake segregated-funds requirement matters at deposit time.',
    },
  ],
  duelbits: [
    {
      href: '/reviews/duelbits/withdrawal',
      label: 'Duelbits withdrawal: under 5 minutes, no KYC, 12 coins',
      teaser: 'Why the instant-to-5-minute window is the fastest in our catalogue, how the no-KYC cashier removes the usual payout-hold step, and which of the 12 coins clear fastest end to end.',
    },
  ],
}

const casinoRelatedGuides: Record<string, { title: string; slug: string }[]> = {
  bitstarz: [
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
  ],
  'bc-game': [
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
    { title: 'Best Crypto for Gambling', slug: 'best-crypto-for-gambling' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
  ],
  cloudbet: [
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
  ],
  'mirax-casino': [
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Best Crypto for Gambling', slug: 'best-crypto-for-gambling' },
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
  ],
  '7bit-casino': [
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
    { title: 'Best Crypto for Gambling', slug: 'best-crypto-for-gambling' },
  ],
  shuffle: [
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
    { title: 'Best Crypto for Gambling', slug: 'best-crypto-for-gambling' },
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
  ],
  duelbits: [
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Bitcoin vs USDT Casinos: Which is Better?', slug: 'bitcoin-vs-usdt-casinos' },
  ],
  roobet: [
    { title: 'Do Crypto Casinos Require KYC?', slug: 'do-crypto-casinos-require-kyc' },
    { title: 'How Casino Bonuses Really Work', slug: 'how-casino-bonuses-really-work' },
    { title: 'Best Crypto for Gambling', slug: 'best-crypto-for-gambling' },
  ],
}

const casinoFAQs: Record<string, { question: string; answer: string }[]> = {
  bitstarz: [
    {
      question: 'Is BitStarz legit?',
      answer: 'BitStarz is a legitimate, award-winning crypto casino licensed by Curaçao eGaming (Antillephone N.V.). Is BitStarz legit? Yes. It has operated since 2014, won multiple "Best Bitcoin Casino" awards, and has a proven track record of paying out winnings without dispute. PlayMagpie independently rates it 9.2/10 for trust, the highest score in our current rankings, based on licensing quality, payout history and player feedback.',
    },
    // Withdrawal-intent FAQs deliberately removed (2026-06-11): the dedicated
    // /reviews/bitstarz/withdrawal sub-page owns that query cluster per the
    // validated displacement pattern. Duplicating Q&A here put the parent in
    // competition with its own sub-page on "bitstarz withdrawal" queries.
    {
      question: 'Does BitStarz offer a no deposit bonus?',
      answer: 'BitStarz does not currently offer a no deposit bonus for new players in 2026. The welcome offer is a deposit-based package worth up to 5 BTC plus 180 free spins spread across your first four deposits (20 spins credited instantly on first deposit, then 20 per day for eight consecutive days per T&C §2.7). Some regions may occasionally see limited promotional no deposit free spins. Check the BitStarz promotions page for current offers available in your country, as these change regularly.',
    },
    {
      question: 'What is the BitStarz minimum deposit?',
      answer: 'The BitStarz minimum deposit is $20 or the crypto equivalent at current exchange rates. For Bitcoin this is approximately 0.0003 BTC. Crypto deposits are processed instantly and credited to your account after one blockchain confirmation, allowing you to start playing within minutes of funding your account. No deposit fees are charged by BitStarz; standard network fees apply on the blockchain side.',
    },
    {
      question: 'What are BitStarz KYC verification requirements?',
      answer: 'BitStarz has Light KYC requirements. Standard play requires only email registration, no documents at signup. BitStarz KYC verification is triggered for larger fiat withdrawals or when account activity flags a compliance review. Crypto-only players operating below higher withdrawal thresholds typically never need to submit identity documents. The light KYC model is designed to balance regulatory compliance with player privacy.',
    },
    {
      question: 'How does the BitStarz VIP program work?',
      answer: 'The BitStarz VIP program rewards high-volume players with exclusive benefits: dedicated account managers, higher withdrawal limits, bespoke bonuses, priority cashback and invitations to real-world events. BitStarz VIP status is invite-only, assessed based on your deposit and wagering history. The programme operates across multiple tiers, each delivering progressively better perks. Active high-value players are typically contacted directly by the BitStarz VIP team.',
    },
    {
      question: 'How does BitStarz compare to other crypto casinos?',
      answer: 'BitStarz vs competitors: BitStarz leads on trust and reputation with the highest score in our rankings (9.2/10) and the most industry awards since 2014. Compared to BC.Game, BitStarz scores higher for trust but BC.Game supports 100+ cryptocurrencies versus BitStarz\'s six. Compared to 7Bit Casino, BitStarz offers a larger BTC-denominated welcome ceiling (5 BTC vs 7Bit\'s 325% match up to €5,400) and both share fast withdrawals, but 7Bit runs a full no-KYC policy where BitStarz runs Light KYC; 7Bit\'s offer is more competitive than its old structure made it look.',
    },
  ],
  'bc-game': [
    {
      question: 'Is BC.Game legit?',
      answer: 'BC.Game is a legitimate crypto casino licensed under Curaçao eGaming, operating since 2017. Is BC.Game legit? Yes. Independent testing confirms fast withdrawals, a verified no-KYC policy maintained consistently since launch, and provably fair outcomes on original games. PlayMagpie rates BC.Game 8.9/10 for trust based on licensing quality, payout history and its no-KYC track record across over seven years of operation.',
    },
    {
      question: 'What are BC.Game withdrawal times in 2026?',
      answer: 'BC.Game withdrawal time in 2026 is instant to 10 minutes for most supported cryptocurrencies. The platform processes withdrawals automatically through its blockchain infrastructure with no manual review required for standard amounts. This near-instant processing across 100+ cryptocurrencies earns BC.Game a 9.3/10 withdrawal score on PlayMagpie: second only to BitStarz in our current rankings for payout speed.',
    },
    {
      question: 'Does BC.Game require KYC verification?',
      answer: 'BC.Game is a strict no-KYC casino. You can register, deposit, play and withdraw using only an email address: no identity documents, selfies or proof of address are ever required. The BC.Game no KYC policy applies to all withdrawal sizes and all 100+ supported cryptocurrencies. This makes it the top choice among privacy-focused players who want to gamble without submitting personal information to any third party.',
    },
    {
      question: 'What are the best BC.Game bonus codes for 2026?',
      answer: 'BC.Game has moved away from the traditional deposit-match welcome model. The current welcome offer at bc.game/deposit-offer is a 220% Deposit Rakeback Welcome Bonus across four monthly stages: 180%+40% RakeBack (min $5 deposit), 240%+60% (min $10), 300%+100% (min $20), 360%+140% (min $30). No free-spins component. Locked balance unlocks as you wager rather than the wager-then-withdraw match model. Affiliate-code variants may exist for specific promotions; check the live deposit-offer page for any active codes at signup. Bonus terms including wagering requirements vary. Always read full T&Cs before claiming.',
    },
    {
      question: 'Is BC.Game a good Bitcoin casino?',
      answer: 'As a BC.Game bitcoin casino, BTC is fully supported for deposits, withdrawals and in-game wagering. Bitcoin withdrawals are processed on-chain with typical confirmation times under 10 minutes. BC.Game is also compatible with 100+ other cryptocurrencies, making it the most versatile crypto gambling platform for Bitcoin players who also hold altcoins or prefer privacy coins. The 10,000+ game library includes provably fair Bitcoin-native originals.',
    },
    {
      question: 'What is the BC.Game minimum deposit?',
      answer: 'The BC.Game minimum deposit is just $5 or the crypto equivalent, one of the lowest thresholds in the industry. This makes BC.Game accessible for players testing the platform at low stakes before committing larger sums. The minimum is calculated at current exchange rates, so small amounts of most supported cryptocurrencies qualify. No deposit fees are charged by BC.Game itself; standard blockchain network fees apply.',
    },
    {
      question: 'How do BC.Game VIP rewards work?',
      answer: 'The BC.Game VIP rewards programme uses a tiered ranking system where players earn XP through wagering activity. Higher ranks unlock dedicated VIP managers, weekly cashback, higher withdrawal limits and exclusive deposit bonuses. BC.Game VIP rewards scale significantly at top tiers, making it particularly valuable for high-volume players. Unlike some invite-only VIP systems, BC.Game\'s tiers are transparent and progression-based.',
    },
    {
      question: 'What crypto options does BC.Game support?',
      answer: 'BC.Game crypto options are the widest of any major casino: over 100 cryptocurrencies accepted for deposits and withdrawals. Supported coins include Bitcoin, Ethereum, USDT, SOL, BNB, DOGE, LTC, XRP, TRX, USDC, ADA, MATIC, BCH and many more. BC.Game crypto options span multiple blockchains including ERC-20, TRC-20, BEP-20 and native chains, giving players maximum flexibility in managing funds without forced conversions.',
    },
  ],
  cloudbet: [
    {
      question: 'Is Cloudbet legit?',
      answer: 'Cloudbet is a legitimate, long-established crypto casino and sportsbook founded in 2013. Is Cloudbet legit? Yes. It holds dual licensing from Curaçao eGaming and the Kahnawake Gaming Commission, has processed withdrawals reliably through multiple crypto market cycles, and has zero reported unresolved withdrawal disputes in over a decade. PlayMagpie rates Cloudbet 8.7/10 for trust, reflecting its strong regulatory standing and operational history.',
    },
    {
      question: 'What are Cloudbet withdrawal times in 2026?',
      answer: 'Most Cloudbet crypto withdrawals in 2026 are processed instantly, with a stated upper bound of 24 hours for requests that go through manual review. Bitcoin withdrawals typically clear in one blockchain confirmation. Cloudbet imposes no withdrawal limits on fully verified accounts (until Level 2 verification, withdrawals are capped at $2,200 a day), which is a critical advantage for high-roller players who need large sums processed without the daily or weekly caps that restrict other casinos.',
    },
    {
      question: 'What is the Cloudbet welcome bonus?',
      answer: 'Cloudbet replaced its former 100% deposit match (up to 5 BTC) with the $2,500 Welcome Package: real cash rewards earned over your first 30 days through 10% casino rakeback, daily cash drops and one weekly sports cash drop. There are no wagering requirements on the package; rewards are paid as withdrawable cash rather than locked bonus balance. That structure favours active players and avoids the wagering-multiplier math that erodes traditional match bonuses.',
    },
    {
      question: 'What is the Cloudbet minimum deposit?',
      answer: 'The Cloudbet minimum deposit is roughly $1 equivalent, one of the lowest floors among the casinos we review; the long-standing 0.001 BTC minimum no longer applies. Exact thresholds vary by cryptocurrency and are shown at the deposit screen. Deposits are credited after one blockchain confirmation. No deposit fees are charged by Cloudbet; standard network fees apply.',
    },
    {
      question: 'What are Cloudbet KYC requirements?',
      answer: 'Cloudbet has Light KYC requirements. Standard play and routine crypto withdrawals are available without identity verification. Cloudbet KYC requirements are triggered for very large withdrawal amounts or when account activity warrants a compliance review. For crypto-only players operating at normal stake levels, identity checks are rarely encountered. This light-touch approach balances regulatory compliance with a smooth player experience.',
    },
    {
      question: 'Is Cloudbet good for high rollers?',
      answer: 'Cloudbet is widely regarded as one of the best casinos for high rollers. Key Cloudbet high roller features include no withdrawal limits for fully verified accounts, large single-bet maximums across casino and sportsbook, a dedicated VIP programme with personal account managers, and a $2,500 welcome package paid as cash rewards with no wagering requirements. High rollers also benefit from priority support, enhanced cashback through the VIP tier system, and, once Level 2 verification is complete, the ability to withdraw any amount without restriction.',
    },
    {
      question: 'What crypto options does Cloudbet support?',
      answer: 'Cloudbet accepts 29 cryptocurrencies, spanning the majors (BTC, ETH, USDT, USDC, SOL, BNB, DOGE, LTC, BCH, XRP), a broad altcoin bench (ADA, DOT, LINK, AVAX, TON, TRX and more) and an unusually deep stablecoin set (USDT, USDC, DAI, USDP, USDe). Fiat balances in CAD, EUR, JPY and USD are also supported, with fiat deposits via the third-party wallets Jeton and Vega. All crypto options can be used for deposits, withdrawals and in-game wagering without conversion fees.',
    },
    {
      question: 'How good is the Cloudbet sportsbook?',
      answer: 'The Cloudbet sportsbook is rated among the best in the crypto betting space. It covers hundreds of markets across football, basketball, tennis, cricket, esports and more. Live in-play betting is available with real-time odds. In this Cloudbet sportsbook review, standout features include competitive crypto odds, high betting limits suited to high rollers, and seamless integration with the casino platform for unified account management and instant fund movement.',
    },
  ],
  'mirax-casino': [
    {
      question: 'Is Mirax Casino legit?',
      answer: 'Mirax Casino is a legitimate crypto casino licensed under Curaçao eGaming, operating since 2022 as part of the established 7Bit Partners network. Is Mirax Casino legit? Yes. The 7Bit Partners network has over a decade of industry experience operating reputable brands with consistent payout records. PlayMagpie rates Mirax Casino 8.6/10 for trust, accounting for its newer status alongside the proven operator infrastructure behind it.',
    },
    {
      question: 'What are Mirax Casino withdrawal times?',
      answer: 'Mirax Casino withdrawal time for cryptocurrency transactions is instant to 15 minutes: that window is the casino-side processing, with on-chain clearing added on top depending on the network. XRP is the fastest coin in the Mirax lineup (settlement in seconds at fractions of a cent), LTC and DOGE clear in low single-digit minutes, and BTC depends on mempool conditions. Mirax\'s fast crypto payouts earn it an 8.8/10 withdrawal score on PlayMagpie. Mirax imposes no cashier fees on withdrawals, bonus-related or otherwise, per its live terms. Until you clear wagering on any accepted bonus portion, only real-money-deposited balance and its winnings are freely withdrawable, which is standard across match-bonus casinos.',
    },
    {
      question: 'What is the Mirax Casino bonus for 2026?',
      answer: 'The Mirax Casino welcome offer in 2026 spans the first four deposits with a 5 BTC headline ceiling: 100% up to 1.5 BTC + 100 free spins on D1 (no code), 75% up to 1.25 BTC + 50 free spins on D2 (code W2), then cash-only matches of 1.25 BTC on D3 (code W3) and 1 BTC on D4 (code W4). Total: up to 5 BTC + 150 free spins across the welcome pack. That ties with BitStarz on BTC ceiling. Free-spin winnings carry a 45x wagering requirement (distinct from the 40x on cash deposit bonuses); no free-spin max-cashout cap is documented in the live terms. Ongoing promotions include weekly free spins, Monday Lootboxes and a 20% highroller cashback.',
    },
    {
      question: 'What is the Mirax Casino minimum deposit?',
      answer: 'The Mirax Casino minimum deposit is $20 or the crypto equivalent at current exchange rates. This applies to all payment methods including Bitcoin, Ethereum, USDT and other supported cryptocurrencies. Mirax Casino minimum deposit thresholds are in line with industry standards. Crypto deposits are typically credited after one blockchain confirmation, with no deposit fees charged by the casino itself.',
    },
    {
      question: 'What crypto does Mirax Casino accept?',
      answer: 'Mirax Casino crypto support covers seven major cryptocurrencies: BTC, ETH, USDT, LTC, DOGE, BCH and XRP. Mirax Casino crypto withdrawals are processed instantly to 15 minutes with no additional fees charged by the casino. While the crypto selection is smaller than BC.Game\'s 100+ options, it covers the major coins most players use. All Mirax crypto transactions are handled on-chain with standard network fees applying.',
    },
    {
      question: 'Is Mirax Casino worth joining in 2026?',
      answer: 'This Mirax Casino review 2026 highlights three key strengths: a competitive welcome pack (up to 5 BTC + 150 free spins across the 4-deposit welcome pack, with no cashier fees per the live terms), a 7,000+ game library from top providers including Evolution and Pragmatic Play, and fast crypto payouts within 15 minutes. Backed by the experienced 7Bit Partners network, Mirax earns an 8.6/10 trust score. The main consideration is its shorter track record compared to older crypto casinos like BitStarz or 7Bit.',
    },
    {
      question: 'How does the Mirax Casino VIP programme work?',
      answer: 'The Mirax Casino VIP programme rewards loyal players with tiered benefits including cashback on losses, higher withdrawal limits, personal account management and exclusive bonuses unavailable to standard players. Mirax Casino VIP status is earned through sustained wagering activity: higher tiers unlock progressively better perks. As part of the 7Bit Partners network, Mirax VIP players benefit from infrastructure and support systems proven across multiple established brands.',
    },
    {
      question: 'What are Mirax Casino KYC requirements?',
      answer: 'Mirax Casino has Light KYC requirements. Most players can register, deposit and play without submitting identity documents. Mirax Casino KYC verification may be triggered for larger withdrawal amounts or when account review flags a compliance check. Crypto-only players operating at standard stakes typically do not encounter identity verification at Mirax. The light KYC approach is standard across the 7Bit Partners network.',
    },
  ],
  shuffle: [
    {
      question: 'Is Shuffle Casino legit?',
      answer: 'Shuffle Casino is a legitimate crypto casino licensed by Curaçao through Natural Nine B.V., operating since 2022. Is Shuffle Casino legit? Independent testing confirms fast crypto withdrawals, a functional rakeback system, and provably fair outcomes on Shuffle Original games. PlayMagpie rates Shuffle 8.2/10 for trust. As a relatively newer brand it has built a positive reputation, though it has a shorter track record than decade-old rivals like BitStarz or 7Bit Casino.',
    },
    {
      question: 'What are Shuffle Casino withdrawal times?',
      answer: 'Shuffle Casino withdrawal time for cryptocurrency is instant to 10 minutes for most transactions. Crypto withdrawals are processed automatically on-chain for standard amounts. Shuffle Casino\'s payout speed earns an 8.8/10 withdrawal score on PlayMagpie. Note that larger withdrawals may trigger a KYC review which can extend processing time. Choosing fast-confirmation networks like SOL, TRX or MATIC speeds up on-chain settlement significantly.',
    },
    {
      question: 'Does Shuffle Casino require KYC verification?',
      answer: 'Shuffle Casino has Light KYC requirements. Most players can register, deposit and play without submitting identity documents. Shuffle Casino KYC checks are triggered at withdrawal for larger amounts, typically when transactions exceed set thresholds. The tiered approach means basic play is frictionless, but high-value withdrawals may require government ID and proof of address before funds are released. Standard crypto-only players at normal stakes rarely encounter verification requests.',
    },
    {
      question: 'What is the Shuffle Casino bonus for 2026?',
      answer: 'The Shuffle Casino bonus for 2026 is a 100% deposit match up to $1,000 on your first deposit, plus ongoing SHFL token rewards and rakeback. Importantly, the Shuffle Casino bonus must be activated via live chat before depositing. It is not applied automatically. Wagering requirements are 35x, above the industry average. SHFL token rewards and daily rakeback provide additional ongoing value that partially offsets the higher wagering threshold on the initial welcome offer.',
    },
    {
      question: 'What crypto does Shuffle Casino accept?',
      answer: 'Shuffle Casino crypto options include 12 cryptocurrencies: BTC, ETH, LTC, USDT, USDC, SOL, DOGE, BNB, XRP, TRX, MATIC and the native SHFL token. This covers major coins across multiple blockchains. Shuffle Casino crypto withdrawals are processed instantly to 10 minutes with no casino-side fees. The inclusion of SHFL allows players to hold and use the platform\'s native token for rewards, wagers and rakeback accumulation.',
    },
    {
      question: 'What is the Shuffle SHFL token?',
      answer: 'The Shuffle SHFL token is the platform\'s native cryptocurrency used for rewards, rakeback distribution and periodic airdrops. Active Shuffle players earn SHFL through wagering activity, and loyalty airdrops reward long-term users. The SHFL token can be held, traded or used directly on the platform for bets and rewards. This native token model gives Shuffle a differentiated rewards structure compared to traditional cashback-only VIP programmes at rival casinos.',
    },
    {
      question: 'How does the Shuffle Casino VIP programme work?',
      answer: 'The Shuffle Casino VIP programme is built around rakeback: a percentage of the house edge returned to players based on wagering volume. Higher tiers unlock increased rakeback rates, priority withdrawals, elevated betting limits and exclusive bonuses. SHFL token rewards stack on top of standard rakeback earnings. The Shuffle Casino VIP system has transparent progression criteria, making it accessible for players who want to maximise their long-term return through sustained play.',
    },
    {
      question: 'Is Shuffle Casino worth joining in 2026?',
      answer: 'This Shuffle Casino review 2026 highlights a strong game library (10,000+ titles including provably fair Originals), instant crypto withdrawals for most players, a unique SHFL token rewards ecosystem, and a solid rakeback-based VIP programme. The main caveats: the 35x welcome bonus wagering requirement is above average, the bonus requires live chat activation, and larger withdrawals may trigger KYC review. Overall Shuffle earns 8.2/10 from PlayMagpie: a compelling choice for players drawn to the SHFL token ecosystem and rakeback model.',
    },
  ],
  '7bit-casino': [
    {
      question: 'Is 7Bit Casino legit?',
      answer: '7Bit Casino is a legitimate and well-established Bitcoin casino that has operated since 2014. Is 7Bit Casino legit? Yes. With over a decade of reliable operation, a strict no-KYC policy maintained throughout, and consistent payout performance across thousands of player transactions, it is one of the most trusted Bitcoin casinos available. PlayMagpie rates 7Bit Casino 8.8/10 for trust, reflecting its long track record and player-first policies.',
    },
    {
      question: 'What are 7Bit Casino withdrawal times?',
      answer: '7Bit Casino withdrawal time for crypto is instant to 10 minutes, making it one of the fastest-paying casinos in PlayMagpie\'s rankings. Bitcoin and other supported cryptocurrencies are processed automatically with no manual review required for standard withdrawal amounts. The 9.1/10 withdrawal score reflects consistently fast performance over years of operation. Large withdrawals may occasionally require additional processing time.',
    },
    {
      question: 'Does 7Bit Casino require KYC?',
      answer: '7Bit Casino no KYC policy applies to all crypto withdrawals regardless of amount. Players registering with email only can deposit, play and withdraw cryptocurrency without ever submitting identity documents, selfies or proof of address. The 7Bit Casino no KYC policy has been consistently maintained since 2014, making it one of the most reliable privacy-preserving casinos for long-term players who value anonymity above all.',
    },
    {
      question: 'What is the 7Bit Casino Bitcoin bonus for 2026?',
      answer: 'The 7Bit Casino welcome offer in 2026 is a 325% match up to €5,400 plus 250 free spins across the 4-deposit welcome pack, sourced directly from 7bitcasino.com/bonuses. Per the published T&C the welcome bonus is wagered 40-45x (most BTC bonuses at 7Bit sit in that range) with a $100 max cashout from free-spin winnings on Elvis Frog in Vegas. Subsequent deposits unlock further reload bonuses as part of the welcome package. Weekly reload bonuses (25% match + 50 free spins on Monday) and Wednesday Free Spins (code WEDNESDAY) run continuously, providing ongoing value beyond the initial offer.',
    },
    {
      question: 'What is the 7Bit Casino minimum deposit?',
      answer: 'The 7Bit Casino minimum deposit is $10 or the crypto equivalent, lower than BitStarz ($20) and Mirax ($20), making it accessible for players who want to test the platform at lower stakes. This minimum applies across all eight supported cryptocurrencies: BTC, ETH, USDT, LTC, DOGE, BCH, XRP and BNB. Crypto deposits are credited after one blockchain confirmation with no casino-side deposit fees.',
    },
    {
      question: 'What crypto options does 7Bit Casino support?',
      answer: '7Bit Casino crypto options cover eight cryptocurrencies: BTC, ETH, USDT, LTC, DOGE, BCH, XRP and BNB. This covers the major coins most crypto casino players use for gambling. All 7Bit Casino crypto withdrawals are processed instantly to 10 minutes with no fees charged by the casino: only standard blockchain network fees apply. The curated eight-coin selection prioritises reliability and processing speed over breadth.',
    },
    {
      question: 'How does the 7Bit Casino VIP program work?',
      answer: 'The 7Bit Casino VIP program is a structured multi-tier system rewarding players with escalating benefits as wagering volume increases. Higher tiers unlock increased cashback percentages, higher withdrawal limits, a dedicated account manager and exclusive VIP-only bonuses. Unlike invite-only VIP programmes, the 7Bit Casino VIP program is progression-based: all players can advance through tiers by meeting wagering thresholds, with no referral or special access required.',
    },
    {
      question: 'Is 7Bit Casino worth using in 2026?',
      answer: 'This 7Bit Casino review 2026 confirms its position as a top-tier no-KYC Bitcoin casino. Key strengths: operating since 2014 with a flawless payout track record, instant to 10-minute crypto withdrawals, a 7,000+ game library including provably fair originals, and a strict no-KYC policy throughout. The 325% match up to €5,400 + 250 free spins welcome package is competitive with rivals (matches Mirax on BTC-equivalent ceiling at a meaningful spread; beats BitStarz on spin count at 250 vs 180), and 7Bit earns an 8.8/10 trust score overall. Remains a top pick for anonymity-focused players where the no-KYC posture is the decisive factor.',
    },
  ],
  duelbits: [
    {
      question: 'Is Duelbits legit?',
      answer: 'Duelbits is a legitimate crypto casino and sportsbook licensed under Curacao (Antillephone N.V.), operating since 2020. Is Duelbits legit? Yes. Independent testing confirms fast crypto withdrawals, provably fair outcomes on Duelbits Originals games, and a track record of paying out winnings without dispute. PlayMagpie rates Duelbits 8.5/10 for trust, reflecting its no-KYC policy for crypto play, fast payout reliability and active streamer-friendly community since launch.',
    },
    {
      question: 'What are Duelbits withdrawal times?',
      answer: 'Duelbits withdrawal time for cryptocurrency is instant to 5 minutes for most transactions: one of the fastest in the industry. Crypto withdrawals are processed automatically on-chain without manual review for standard amounts. This earns Duelbits a 9.2/10 withdrawal score on PlayMagpie. The fastest payouts are seen on TRX, SOL and MATIC networks where confirmation times are sub-second; BTC withdrawals depend on standard Bitcoin block times.',
    },
    {
      question: 'Does Duelbits require KYC verification?',
      answer: 'Duelbits has a no-KYC policy for crypto play and withdrawals: basic checks only. You can register with email, deposit, play and withdraw cryptocurrency without submitting identity documents in standard cases. Additional verification may be requested if account activity flags an unusual pattern or for very large withdrawal amounts. For typical crypto-only players operating at standard stakes, Duelbits provides one of the most privacy-preserving experiences in the market.',
    },
    {
      question: 'What is the Duelbits welcome bonus for 2026?',
      answer: 'The Duelbits welcome offer for 2026 is cashback-focused rather than a traditional deposit match: up to $30 weekly cashback, ongoing Duelbits Originals rewards and seasonal leaderboard promotions. This structure delivers better real expected value than high-wagering match bonuses for active players. The platform also runs continuous tournaments and rakeback through its VIP system. Wagering requirements are minimal on cashback compared to match bonuses at competitors.',
    },
    {
      question: 'What crypto does Duelbits accept?',
      answer: 'Duelbits crypto options include 12 cryptocurrencies: BTC, ETH, LTC, USDT, USDC, DOGE, SOL, BNB, BCH, XRP, TRX and MATIC. This covers all major coins across multiple blockchains including ERC-20, TRC-20, BEP-20 and native chains. Duelbits crypto withdrawals are processed instantly to 5 minutes with no casino-side fees. The 12-coin lineup balances breadth with reliability: every supported chain is volume-tested for fast processing.',
    },
    {
      question: 'What are Duelbits Originals?',
      answer: 'Duelbits Originals are provably fair house-designed games unique to the platform: slots, crash, plinko and dice variants with cryptographically verifiable outcomes. Every Originals round uses seeds players can audit independently, ensuring the results are not manipulated by the casino. The Originals library is core to the Duelbits brand and is heavily featured by streamers. RTP on top Originals titles is typically 97-99%, among the highest in the industry.',
    },
    {
      question: 'Is Duelbits good for high rollers?',
      answer: 'Duelbits is well-suited to high rollers: the platform combines no-KYC convenience with fast crypto withdrawals and a rakeback-based VIP system that returns a percentage of house edge to active players. There are no aggressive bonus caps locking in winnings, and the cashback structure means meaningful returns scale linearly with volume. The clean modern interface and 12-crypto support make it particularly attractive for crypto-native high rollers who prioritise speed and privacy.',
    },
    {
      question: 'How does the Duelbits VIP programme work?',
      answer: 'The Duelbits VIP programme is built around rakeback rather than tier-locked bonuses: active players earn back a percentage of the house edge as withdrawable balance. Higher activity levels unlock increased rakeback rates and access to exclusive promotions, seasonal rewards and Originals leaderboards. Unlike traditional VIP tiers that gate benefits behind wagering thresholds, Duelbits scales rewards transparently with play, making it accessible for both mid-volume players and high rollers.',
    },
  ],
  roobet: [
    {
      question: 'Is Roobet legit?',
      answer: 'Roobet is a real operating casino licensed in Curaçao under Raw Entertainment B.V. (registration 157205), with a secondary Anjouan licence (ALSI-202507005 per Casino.Guru). It has been live since 2019 and signed visible partnerships with Chelsea FC and 100 Thieves in 2025. "Legit" is a different question to "safe at scale." The operator is real and the games are real, but Roobet also has a documented pattern of withdrawal holds on large wins (AskGamblers cases at $20k, $84k, $97k, $111k and $115k; the $84,000 case is publicly listed as Unsolved) and T&C that explicitly permit confiscation on "low-risk play." PlayMagpie rates Roobet 6.8/10 for trust: usable at modest stakes, structurally risky for large wins.',
    },
    {
      question: 'Does Roobet pay out big wins?',
      answer: 'On the public record, Roobet does pay out most large wins, but often after multi-day "routine verification" holds that AskGamblers complaints have documented at $20,000, $84,000, $97,000, $111,000 and $115,000 amounts. Most of those cases were ultimately resolved via AskGamblers mediation. The exception is a $84,000 case publicly listed as Unsolved as of 2026, where a verified account with ~$6 million lifetime wagered was locked at the cashout request and asked for additional documentation including a handwritten "Roobet" selfie. The honest position: expect a KYC re-trigger on any sizeable cashout regardless of account tenure, and do not expect documented disputes to resolve fast.',
    },
    {
      question: 'What is the Roobet welcome bonus?',
      answer: 'Roobet does not run a traditional deposit-match welcome bonus. The current new-player offer is a 20% cashback on net losses across your first seven days, capped at approximately $1,400, plus a $5 sportsbook free bet under promo code MAXBONUS. Cashback only triggers if you lose. There is no headline "free $X on signup" element. Compared to operators like BitStarz (up to 5 BTC + 180 free spins) or Mirax (up to 5 BTC + 150 free spins across four deposits), Roobet\'s welcome value is structurally lower for players expecting upside.',
    },
    {
      question: 'What countries does Roobet restrict?',
      answer: 'Roobet\'s restricted-territories list under terms §3.5 is unusually wide for a Curaçao operator: Aruba, Australia, Belgium, Bonaire, Cuba, Curaçao, Cyprus, Denmark, Germany, Gibraltar, Haiti, Israel, Iran, Iraq, Malta, Myanmar, Netherlands, Nicaragua, North Korea, Ontario (province of Canada), Portugal, Saba, Saint Maarten, Saint Martin, South Sudan, Spain, Statia, Syria, Sweden, United States, United Kingdom, Yemen and Zimbabwe. That excludes the UK, US, most of Western and Northern Europe, Australia and Ontario specifically. Verify your jurisdiction is not on the live list before depositing, as restricted-territory accounts are subject to closure and fund forfeiture under terms clause 6.4.',
    },
    {
      question: 'Is Roobet no-KYC?',
      answer: 'No. Roobet runs Standard KYC: Level 1 (basic personal data) is required at deposit, and Levels 2-4 (government ID, proof of address, source-of-funds) are triggered by withdrawal size, account activity flags, or compliance review. Roobet does not publish a fixed-dollar KYC threshold; observed triggers across complaint records run from around $10,000 to well above $50,000 depending on account history. If full anonymity is the priority, BC.Game, 7Bit Casino or Duelbits are no-KYC alternatives in our rankings.',
    },
    {
      question: 'What are Roobet withdrawal limits?',
      answer: 'Roobet\'s headline daily withdrawal cap is $200,000 USD-equivalent. The minimum withdrawal is $10 in crypto or $15 in fiat. Crypto withdrawals are stated at ~15 minutes for most coins, with Bitcoin specifically listed at up to 24 hours; fiat withdrawals run 1-5 days. There is no weekend cashier processing. Per Roobet\'s terms §10.8, a 2% fee applies to the 10th and each subsequent fiat withdrawal in any rolling 30-day window.',
    },
    {
      question: 'Why was Roobet banned from Twitch?',
      answer: 'Twitch announced in September 2022 that it would ban streams of "slots, roulette, or dice games" from gambling sites not licensed in the US or jurisdictions Twitch deemed to provide sufficient consumer protection. Curaçao\'s sub-licensee regime did not qualify, and Roobet was named alongside Stake.com, Rollbit and Duelbits when the ban took effect on 18 October 2022. The casino-affiliated streamer scene migrated largely to Kick in response. Roobet\'s current creator deals (Snoop Dogg, Nadeshot, TimTheTatman) run on Kick or independent channels rather than Twitch.',
    },
    {
      question: 'How does Roobet compare to BC.Game or BitStarz?',
      answer: 'Roobet vs BC.Game: BC.Game wins on no-KYC policy, 100+ crypto support, and a clean dispute record: trust 8.9 vs Roobet\'s 6.8. Roobet vs BitStarz: BitStarz wins on track record (since 2014, multiple "Best Bitcoin Casino" awards), withdrawal speed scores, and a substantially larger welcome bonus: trust 9.2 vs Roobet\'s 6.8. Roobet\'s distinct strengths are Crash-led Originals (BC.Game and BitStarz both have crash content, but Roobet\'s native Crash is the genre-anchor for the brand) and the sportsbook (BitStarz does not run a sportsbook; Cloudbet is the stronger sportsbook comparator). For most players asking the question, the trust delta is the dominant factor.',
    },
  ],
}

export async function generateMetadata(props: PageProps<'/reviews/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const casino = getCasinoBySlug(slug)
  if (!casino) return {}
  const title = `${casino.name} Review 2026: Scores, Bonuses & Withdrawal Times`
  const description = casinoMetaDescriptions[slug] ?? casino.reviewSummary.slice(0, 155)
  return {
    title,
    description,
    alternates: {
      canonical: `/reviews/${casino.slug}`,
    },
    openGraph: {
      url: `/reviews/${casino.slug}`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${casino.name} Review 2026` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export default async function ReviewPage(props: PageProps<'/reviews/[slug]'>) {
  const { slug } = await props.params
  const casino = getCasinoBySlug(slug)
  if (!casino) notFound()

  const relatedGuides = casinoRelatedGuides[slug] ?? []
  const subPages = casinoSubPages[slug] ?? []
  const faqs = casinoFAQs[slug] ?? []

  const kycDescription =
    casino.kycLevel === 'None'
      ? 'No identity verification required. Sign up with an email and start playing immediately.'
      : casino.kycLevel === 'Light'
      ? 'Minimal verification: usually just email confirmation. Full KYC only triggered above high withdrawal thresholds.'
      : casino.kycLevel === 'Standard'
      ? 'Standard verification required: government ID and proof of address.'
      : 'Full KYC verification required for all players before withdrawals are processed.'

  const relatedLists = [
    { label: 'Best Crypto Casinos', href: '/best-crypto-casinos' },
    ...(casino.withdrawalScore >= 9.0 ? [{ label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos' }] : []),
    ...(casino.kycLevel === 'None' ? [{ label: 'No-KYC Casinos', href: '/no-kyc-casinos' }] : []),
    // Mirror the /high-roller-casinos filter (vipProgram AND trustScore >= 8.0)
    // so this link only shows on review pages whose casino actually renders on
    // the high-roller listing.
    ...(casino.vipProgram && casino.trustScore >= 8.0 ? [{ label: 'High Roller Casinos', href: '/high-roller-casinos' }] : []),
    // Cloudbet is the only operator on our list with an explicit no-withdrawal-limit
    // policy (verified in its lib/casinos.ts pros). Surfacing /no-limit-withdrawal-casinos
    // from its review specifically rather than from every VIP casino, to keep the link
    // contextually accurate rather than templated.
    ...(casino.slug === 'cloudbet' ? [{ label: 'High Roller Casinos: Withdrawal Limits', href: '/high-roller-casinos#withdrawal-limits' }] : []),
    // Carrier link for /crypto-casinos-with-sportsbook (2026-06-08). Both Cloudbet
    // and Roobet run a sportsbook (verified in their lib/casinos.ts prose), so the
    // link is contextually accurate; these two reviews are also the freshest-crawled
    // (06-03 / 06-02), which propagates the new listicle into the crawl quickly.
    ...(casino.slug === 'cloudbet' || casino.slug === 'roobet'
      ? [{ label: 'Crypto Casinos With a Sportsbook', href: '/crypto-casinos-with-sportsbook' }]
      : []),
  ]

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${casino.name} Review`,
    reviewBody: casino.reviewSummary,
    author: {
      '@type': 'Organization',
      name: 'PlayMagpie',
      url: 'https://www.playmagpie.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PlayMagpie',
      url: 'https://www.playmagpie.com',
    },
    itemReviewed: {
      '@type': 'Organization',
      name: casino.name,
      description: casino.reviewSummary,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: casino.trustScore,
      bestRating: 10,
      worstRating: 0,
    },
    datePublished: '2026-01-01',
    dateModified: '2026-05-12',
    url: `https://www.playmagpie.com/reviews/${casino.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: 'Best Crypto Casinos', item: 'https://www.playmagpie.com/best-crypto-casinos' },
      { '@type': 'ListItem', position: 3, name: casino.name, item: `https://www.playmagpie.com/reviews/${casino.slug}` },
    ],
  }

  const faqSchema = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is ${casino.name} safe and legitimate?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${casino.name} is licensed by ${casino.licence} and has a trust score of ${casino.trustScore}/10 on PlayMagpie's independent rating system.`,
            },
          },
          {
            '@type': 'Question',
            name: `How fast are ${casino.name} crypto withdrawals?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${casino.name} processes crypto withdrawals in ${casino.withdrawalTime.toLowerCase()}. Withdrawal score: ${casino.withdrawalScore}/10.`,
            },
          },
        ],
      }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/best-crypto-casinos" className="hover:text-white transition-colors">Casinos</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">{casino.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-2xl font-bold text-white border border-[#222222]">
                {casino.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white">{casino.name} Review</h1>
                <p className="text-[#888888] text-sm mt-1">{casino.licence}</p>
                {/* Registry-driven, honesty rule in lib/last-reviewed.ts. Replaced the
                    previous hardcoded site-wide "Last updated: May 12, 2026" line. */}
                <p className="text-[#555555] text-xs mt-0.5">
                  Facts last verified: {casinoLastReviewed[casino.slug] ?? 'May 2026'} ·{' '}
                  <Link href="/methodology" className="text-[#7BB8D4]/80 hover:text-[#7BB8D4] hover:underline">how we verify</Link>
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-extrabold text-[#7BB8D4]">{casino.trustScore}</div>
              <div className="text-[#888888] text-sm">Trust Score / 10</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {casino.badges.map((badge) => (
              <ScoreBadge key={badge} label={badge} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Withdrawal Time', value: casino.withdrawalTime },
              { label: 'Min Deposit', value: casino.minDeposit },
              { label: 'KYC', value: casino.kycLevel },
              { label: 'VIP', value: casino.vipProgram ? 'Yes' : 'No' },
            ].map((s) => (
              <div key={s.label} className="bg-[#111111] border border-[#222222] rounded-xl p-3 text-center">
                <div className="text-white font-bold text-sm">{s.value}</div>
                <div className="text-[#555555] text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Answer statement (2026-07-13 assistant-channel extractability pass).
              Deliberately prose, NOT FAQ schema: the withdrawal FAQs were removed
              2026-06-11 because /reviews/bitstarz/withdrawal owns that query
              cluster. Do not convert this into an FAQ entry. */}
          {casino.slug === 'bitstarz' && (
            <p className="text-[#bbbbbb] text-base leading-relaxed mb-6">
              BitStarz processes crypto withdrawals in under 10 minutes on average across its six supported
              coins, and per its live terms charges no fees on any deposits or withdrawals; only the
              blockchain network fee applies, deducted by the network rather than the casino.
            </p>
          )}

          <div className="flex gap-3">
            <CTAButton href={casino.affiliateUrl} label="Play at Casino" variant="primary" size="lg" external />
            <CTAButton href="/best-crypto-casinos" label="Compare Casinos" variant="secondary" size="lg" />
          </div>
        </div>

        <ReviewSection casino={casino} />

        {/* Deep-dive sub-pages: only rendered when the parent review has dedicated sub-pages */}
        {subPages.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[#222222]">
            <h2 className="text-xl font-bold text-white mb-2">Go deeper on {casino.name}</h2>
            <p className="text-[#888888] text-sm mb-6">
              Dedicated pages for the parts of {casino.name} that most often surface specific player questions.
            </p>
            <div className={`grid grid-cols-1 ${subPages.length > 1 ? 'sm:grid-cols-2' : ''} gap-4`}>
              {subPages.map((sp) => (
                <Link
                  key={sp.href}
                  href={sp.href}
                  className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group"
                >
                  <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-sm leading-snug mb-2">
                    {sp.label}
                  </div>
                  <p className="text-[#888888] text-xs leading-relaxed">{sp.teaser}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[#222222]">
            <h2 className="text-xl font-bold text-white mb-4">Related Guides</h2>
            <p className="text-[#888888] text-sm mb-5">
              Learn more about {casino.name}&apos;s key features with these in-depth guides:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-4 transition-all group"
                >
                  <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors text-sm leading-snug">
                    {g.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Appears in lists */}
        <section className="mt-10 pt-8 border-t border-[#222222]">
          <h2 className="text-lg font-bold text-white mb-4">{casino.name} Appears In</h2>
          <div className="flex flex-wrap gap-3">
            {relatedLists.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-lg text-sm text-[#888888] hover:text-[#f5f5f5] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[#222222]">
            <h2 className="text-xl font-bold text-white mb-2">{casino.name} Frequently Asked Questions</h2>
            <p className="text-[#888888] text-sm mb-8">
              Common questions from players researching {casino.name} in 2026.
            </p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2 text-base">{faq.question}</h3>
                  <p className="text-[#888888] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="mt-12 pt-10 border-t border-[#222222] text-center">
          <p className="text-[#888888] text-sm mb-4">
            Ready to play at {casino.name}? Check the latest bonus offers on their site.
          </p>
          <CTAButton href={casino.affiliateUrl} label={`Visit ${casino.name}`} variant="primary" size="lg" external />
        </section>
      </div>
    </>
  )
}
