import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { guides } from '@/lib/guides'
import { casinos, kycDisplayLabel } from '@/lib/casinos'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import TxidLookup from '@/components/TxidLookup'

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata(props: PageProps<'/guides/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return {}
  const title = `${guide.title}`
  return {
    title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      url: `/guides/${guide.slug}`,
      title,
      description: guide.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: guide.description,
      images: ['/og-image.png'],
    },
  }
}

type ContentBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | {
      type: 'matrix'
      items: { priority: string; recommendation: string; rationale: string }[]
    }
  // Per-casino KYC breakdown. kycLevel/kycScore are pulled live from lib/casinos.ts
  // at render time (single source of truth). The block only carries the editorial
  // "note" and an optional deep-link href to the casino's /kyc or main review page.
  | {
      type: 'kycposture'
      items: { slug: string; href: string; note: string }[]
    }
  // Paragraph with inline contextual links. Added 2026-07-28: the plain 'p'
  // block renders text only, so guides could previously carry internal links
  // only as cards in the "Where to read next" grid. CLAUDE.md's internal-linking
  // convention wants contextual prose links with natural anchor text, so this
  // block renders an ordered run of plain strings and links.
  | {
      type: 'plink'
      parts: (string | { text: string; href: string })[]
    }
  // Input-dependent lookup layer (slate 2026-09-05): renders the API-free
  // TxidLookup client component. The block carries no data; the component
  // is self-contained. Used by crypto-casino-withdrawal-txid only.
  | { type: 'txidlookup' }

const guideContent: Record<string, ContentBlock[]> = {
  'how-crypto-casino-withdrawals-work': [
    { type: 'h2', text: 'How the process works' },
    { type: 'p', text: 'When you request a crypto withdrawal from an online casino, the platform initiates a transaction from their hot wallet (a live, internet-connected wallet used for operational payments) directly to the wallet address you provide. Unlike traditional bank transfers, which route money through correspondent banks and clearing houses, blockchain transactions are peer-to-peer. There is no intermediary holding or approving the funds once the transaction is broadcast to the network.' },
    { type: 'p', text: 'The moment the casino sends the transaction, it enters the mempool, the holding area for unconfirmed blockchain transactions. Miners or validators then pick up the transaction, include it in a block, and confirm it. From that point, your funds are in your wallet, fully under your control.' },
    { type: 'h2', text: 'What determines withdrawal speed' },
    { type: 'p', text: 'Three factors control how fast your crypto withdrawal arrives. The first is the casino\'s internal processing time: how quickly their system generates the outgoing transaction. Automated platforms can do this in seconds. Platforms that rely on manual batch processing, where a staff member approves withdrawals in batches at set intervals, can add hours of delay before the transaction even hits the blockchain.' },
    { type: 'p', text: 'The second factor is which blockchain you use. This is often the most significant variable. Networks vary dramatically in confirmation speed and cost. Tron (TRX) and Solana (SOL) confirm transactions in under 5 seconds with negligible fees. Polygon (MATIC) is similarly fast. Ethereum (ETH) typically confirms in 15–30 seconds but carries higher gas fees during congestion. Bitcoin (BTC) is the slowest of the major networks: blocks are produced every 10 minutes on average, and during periods of high network congestion your transaction may wait for multiple block confirmations before the casino considers it final.' },
    { type: 'p', text: 'The third factor is network congestion. Even fast networks can slow down during extreme demand. BTC is most susceptible to this: the mempool can grow to tens of thousands of pending transactions during bull markets, pushing confirmation times to hours unless you pay a premium fee. SOL and TRX rarely experience meaningful congestion under current usage levels.' },
    { type: 'h2', text: 'The fastest withdrawal networks' },
    { type: 'p', text: 'For the fastest possible casino withdrawals, USDT on TRC-20 (Tron network) is the current gold standard. It combines the stability of a USD-pegged stablecoin with Tron\'s near-instant finality and fees typically under $0.01. Most top-tier crypto casinos support it, and it is the single most popular withdrawal method across fast-payout platforms. SOL-based tokens are equally fast. BTC should be treated as a 10–60 minute option depending on conditions.' },
    { type: 'h2', text: 'KYC: the biggest source of delays' },
    { type: 'p', text: 'Beyond the blockchain itself, Know Your Customer (KYC) verification is by far the most common cause of withdrawal delays. If a casino triggers a KYC check mid-withdrawal, your funds can be held for 24–72 hours while their compliance team processes your documents. Some casinos do this routinely above certain withdrawal thresholds. Others only ask at registration. No-KYC casinos, which include BC.Game and 7Bit Casino, do not require identity documents for crypto withdrawals at all, eliminating this delay entirely.' },
    { type: 'h2', text: 'Payout methods ranked by speed' },
    { type: 'p', text: 'The gap between crypto and traditional payout rails is not subtle. Here is what you can realistically expect from each method, ranked by real wall-clock withdrawal time end-to-end.' },
    { type: 'h3', text: '#1 Crypto on fast networks (TRX, SOL, MATIC): under 5 minutes' },
    { type: 'p', text: 'Crypto withdrawals via Tron (TRC-20), Solana or Polygon are the fastest payout method available at any online casino, and it is not close. Once the casino broadcasts the transaction, funds typically arrive in your wallet within 10–30 seconds for Solana, under 1 minute for TRC-20 and 1–3 minutes for Polygon. Total wall-clock time from requesting a withdrawal to spendable funds is usually under 5 minutes including the casino\'s internal processing at automated platforms. Fees are negligible, often under $0.01 per transaction.' },
    { type: 'h3', text: '#2 Crypto on slower networks (BTC, ETH): 10 minutes to 2 hours' },
    { type: 'p', text: 'Bitcoin and Ethereum withdrawals are still dramatically faster than any non-crypto method, but they are subject to network conditions. Bitcoin\'s 10-minute average block time means a best-case withdrawal takes around 10–20 minutes. During mempool congestion it can stretch to 60 minutes or beyond, and most casinos require 1–3 confirmations before treating the transaction as final. Ethereum is faster at 15–30 seconds per block but gas-fee variability makes it unpredictable in cost.' },
    { type: 'h3', text: '#3 E-wallets (Skrill, Neteller, MiFinity): 1–24 hours' },
    { type: 'p', text: 'E-wallets are the fastest non-crypto option. Skrill and Neteller are widely accepted at licensed casinos, and processing typically completes within a few hours during business hours. The limitations are real, though: e-wallet transactions are subject to AML compliance checks that can hold funds for manual review, weekend or holiday processing often defers payouts to the next business day, and e-wallets themselves frequently block accounts or reverse transactions related to gambling: risk that goes beyond speed.' },
    { type: 'h3', text: '#4 Debit and credit cards: 1–5 business days' },
    { type: 'p', text: 'Card withdrawals are subject to bank processing cycles that have not meaningfully improved in decades. The casino typically initiates the refund within 24 hours, but the card network and your bank then process it on their own schedule. Visa and Mastercard withdrawals generally clear in 1–3 business days. Weekend transactions are queued until Monday. Some banks apply additional holds on gambling-related transactions, and many credit card networks have restricted gambling transactions entirely, making credit card deposits impossible at most regulated sites.' },
    { type: 'h3', text: '#5 Bank transfer: 2–7 business days' },
    { type: 'p', text: 'Bank transfers are the slowest and most friction-heavy method. They require full KYC, involve correspondent banking relationships that add processing delays, and are subject to AML compliance reviews on both the casino and bank side. International wire transfers can take 3–5 business days in normal circumstances. For players in jurisdictions with restrictive banking relationships with gambling operators, bank transfers may be rejected outright. There is no practical reason to use bank transfer when crypto alternatives are available.' },
    { type: 'h2', text: 'Withdrawal speed at the casinos we review' },
    { type: 'p', text: 'Across the seven crypto casinos in PlayMagpie\'s rankings, five carry withdrawal scores at or above 9.0/10, meaning consistently fast, automated payout pipelines: BitStarz 9.5/10 (under-10-minute typical processing), BC.Game 9.3/10 (instant to 10 minutes across 100+ supported cryptocurrencies), Duelbits 9.2/10 (instant to 5 minutes, the fastest verified end-to-end), 7Bit Casino 9.1/10 (instant to 10 minutes, no-KYC throughout) and Cloudbet 9.0/10 (instant to 30 minutes with no withdrawal limits). The score gap between 9.5 and 9.0 represents the difference between "almost always under 10 minutes" and "almost always under 30 minutes". Both fast in the broader landscape, but if you cash out frequently, the speed difference compounds.' },
    { type: 'p', text: 'The two casinos in the 8.0–9.0 band, Mirax (8.8/10, instant to 15 minutes) and Shuffle (8.8/10, instant to 10 minutes with potential KYC review on larger amounts), still beat any non-crypto method. The variable that bumps a casino from 9.x to 8.x in our scoring is usually a structural caveat: temporary holds on flagged withdrawals, larger-amount KYC triggers, or batch-processing windows. None of these affect routine play; all of them can matter on a big win.' },
    { type: 'h2', text: 'How to check your withdrawal status' },
    { type: 'p', text: 'Once a casino sends your transaction, you will typically receive a transaction ID (TXID). Paste this into the relevant blockchain explorer: Tronscan for TRC-20 transactions, Solscan for Solana, Etherscan for Ethereum, and Blockchain.com or Mempool.space for Bitcoin. These explorers show you real-time confirmation status, number of confirmations received, and the transaction fee paid. If a transaction has been broadcast to the network but is showing as unconfirmed for an unusually long time, this points to network congestion or a low fee setting rather than a casino problem.' },
    { type: 'h2', text: 'Tips for the fastest withdrawals' },
    { type: 'p', text: 'Choose TRC-20 USDT or SOL for routine withdrawals. Avoid BTC withdrawals when mempool congestion is high. Check Mempool.space before requesting. Always complete any required KYC in advance rather than mid-withdrawal. Use a non-custodial wallet you control rather than an exchange address: exchange crediting can add additional delays on top of the blockchain confirmation. Finally, check your casino\'s withdrawal schedule: some platforms process withdrawals 24/7 automatically, while others have defined processing windows.' },
  ],

  'best-crypto-for-gambling': [
    { type: 'h2', text: 'Why your choice of cryptocurrency matters' },
    { type: 'p', text: 'The cryptocurrency you use at an online casino affects four things directly: how fast your deposits and withdrawals clear, how much you pay in network fees, how stable your bankroll is in dollar terms, and how much privacy you retain. Most players default to Bitcoin out of familiarity, but for most gambling use cases it is not the optimal choice. For most players the answer is USDT on the TRC-20 network: it holds a fixed 1:1 dollar value, confirms in under 3 seconds, costs under $0.01 per transaction, and is accepted at every casino we review. For the focused head-to-head on the two most-used coins, see our Bitcoin vs USDT comparison.' },
    { type: 'h2', text: 'USDT on TRC-20: the practical best-in-class' },
    { type: 'p', text: 'USDT (Tether) on the Tron (TRC-20) network is the closest thing to a perfect gambling cryptocurrency available in 2026. It is a stablecoin (one USDT always equals one US dollar), which means your bankroll does not fluctuate with market movements between sessions. Tron confirmations typically complete in under 3 seconds. Network fees are consistently below $0.01. USDT on TRC-20 is accepted at virtually every crypto casino on the market. For players who want to gamble with predictable amounts without exposure to crypto volatility, this is the default choice.' },
    { type: 'p', text: 'The only genuine disadvantage of USDT is counterparty risk: Tether Limited, the issuer, must maintain sufficient reserves to back each token. This has been scrutinised extensively and Tether has continued operating without incident, but it is a structural risk that does not exist with decentralised cryptocurrencies.' },
    { type: 'h2', text: 'Bitcoin: the universal standard' },
    { type: 'p', text: 'Bitcoin is accepted at more casino platforms than any other cryptocurrency. Every serious crypto casino supports BTC deposits and withdrawals. However, for active gambling, BTC carries meaningful drawbacks. Confirmation times range from 10 minutes during quiet periods to 60 minutes or more during network congestion. Fees can spike significantly during bull markets. Most importantly, Bitcoin\'s price volatility means your bankroll value changes constantly: a deposit worth $1,000 might be worth $900 or $1,100 by the time you withdraw, regardless of your gambling outcome.' },
    { type: 'p', text: 'Bitcoin makes most sense for players who want price exposure: who believe BTC will be worth more at withdrawal time than at deposit time. It is a speculation instrument grafted onto gambling, which is not necessarily a strategy most players should pursue deliberately.' },
    { type: 'h2', text: 'Solana: the high-performance option' },
    { type: 'p', text: 'Solana has emerged as the premier high-performance blockchain for gambling since 2024. Sub-second confirmation finality and fees under $0.001 make it theoretically the fastest on-chain option available. Casino adoption has grown rapidly: BC.Game, Cloudbet and several other major platforms now support SOL deposits and withdrawals. The limitation is that not all casinos have added SOL support yet, and the network has experienced intermittent stability issues historically, though these have become rarer with infrastructure improvements.' },
    { type: 'h2', text: 'Ethereum: wider adoption, higher fees' },
    { type: 'p', text: 'Ethereum is the second most widely accepted cryptocurrency at crypto casinos and is a reliable option where USDT on TRC-20 is not supported. Confirmation times are typically 15–30 seconds. The main drawback is gas fees, which fluctuate with network demand and can reach $5–$30 per transaction during peak periods: unacceptable for frequent small withdrawals but manageable for larger, less frequent transactions.' },
    { type: 'h2', text: 'XRP, LTC and DOGE: the mid-tier options' },
    { type: 'p', text: 'XRP (Ripple) is accepted at most major crypto casinos and offers fast 3–5 second confirmations with low fees. It is a solid alternative when USDT or SOL are not available. Litecoin (LTC) is slower than XRP but widely accepted and reliable. DOGE is accepted primarily at larger platforms and has an active community, but offers no practical advantage over the options above for gambling purposes.' },
    { type: 'h2', text: 'Privacy-focused options' },
    { type: 'p', text: 'For players who prioritise transaction privacy above all else, Monero (XMR) is the only cryptocurrency with native, protocol-level privacy. Monero transactions are untraceable by design. XMR support at general-market crypto casinos is rare and varies by operator. Verify on the casino\'s current cashier page if privacy is your decisive factor, since this is one area where listed crypto support changes more often than other coins.' },
    { type: 'h2', text: 'Decision matrix: what matters most to you?' },
    { type: 'p', text: 'The right coin depends on what you\'re optimising for. Pick the priority that best matches your play, and use the recommended chain.' },
    {
      type: 'matrix',
      items: [
        {
          priority: 'Speed (fastest end-to-end)',
          recommendation: 'USDT on TRC-20, or SOL where supported',
          rationale: 'Sub-second to 3-second on-chain finality with fees under $0.01 on both. Functionally instant if the casino\'s internal processing is automated. TRC-20 is universally accepted; SOL is added at BC.Game, Cloudbet, Shuffle, Duelbits and Roobet per the casinos we review.',
        },
        {
          priority: 'Anonymity below the verification threshold',
          recommendation: 'Any chain at a no-KYC casino: coin choice is secondary',
          rationale: 'Anonymity is the casino-side decision, not the coin-side. BC.Game, 7Bit Casino and Duelbits operate no-KYC policies in lib/casinos.ts. Within those operators, choose your coin for speed and fees. Monero is the only protocol-level-private chain but casino support is narrow.',
        },
        {
          priority: 'Lowest fees per transaction',
          recommendation: 'USDT on TRC-20 (or SOL)',
          rationale: 'Consistently under $0.01 per transaction on both. ETH gas can spike to $5–$30 during congestion. Avoid for routine play. Bitcoin fees fluctuate with mempool demand; at low congestion under $1, at high congestion $50+.',
        },
        {
          priority: 'Stability (no FX drift between sessions)',
          recommendation: 'USDT or USDC on the fastest chain your casino accepts',
          rationale: 'Stablecoins pegged 1:1 to USD remove crypto-side volatility entirely. USDT has wider casino acceptance (every casino we review supports it). USDC has stronger regulatory transparency (Circle, audited monthly). Pick on counterparty preference; speed characteristics are equivalent.',
        },
        {
          priority: 'You already hold BTC and want to play with it',
          recommendation: 'BTC mainnet: accepted everywhere',
          rationale: 'Every casino we review accepts BTC. Tolerate 10–60 minute confirmation times and treat the volatility as already part of your existing portfolio exposure. Don\'t acquire BTC specifically to gamble. Acquire USDT instead and avoid the FX drift on top of gambling variance.',
        },
        {
          priority: 'First time / not sure which to choose',
          recommendation: 'USDT on TRC-20: the default',
          rationale: 'Stable, fast, cheap, universally accepted. Acquire via a regulated exchange (Bitvavo, Kraken, Coinbase, or your country\'s licensed alternative), send to a self-custodial wallet, deposit on TRC-20 at the casino. Confirm the network selection at the cashier before broadcasting. Wrong-network sends are not recoverable.',
        },
      ],
    },
    { type: 'h2', text: 'The PlayMagpie recommendation' },
    { type: 'p', text: 'For most players: use USDT on TRC-20 as your primary gambling currency. It is stable, fast, cheap and universally accepted. Use SOL if your casino supports it and you want marginally faster withdrawals. Use BTC only if your specific casino does not support USDT or SOL, or if you deliberately want price exposure. Avoid ETH for small or frequent transactions due to gas fees. Check your specific casino\'s supported networks before depositing. Transferring on the wrong network results in lost funds.' },
  ],

  'how-casino-bonuses-really-work': [
    { type: 'h2', text: 'The gap between headline and reality' },
    { type: 'p', text: 'A 200% deposit bonus up to $2,000 sounds straightforward: deposit $1,000, receive $2,000 extra, play with $3,000 total. In practice, the bonus terms determine whether that extra $2,000 has any real value or is effectively unwithdrawable. Most players never fully read the terms. This guide breaks down every mechanism casinos use in bonus structures and tells you exactly what to look for before accepting any offer. The single number that decides a bonus\'s real value is the wagering requirement: a $500 bonus at 30x means $15,000 in bets before anything is withdrawable, and on a typical 96% RTP slot library that volume carries an expected loss of around $600.' },
    { type: 'h2', text: 'Wagering requirements: the primary filter' },
    { type: 'p', text: 'Wagering requirements (also called playthrough requirements) specify how many times you must bet through the bonus amount before you can withdraw bonus-derived winnings. A $500 bonus with 30x wagering means you must place $15,000 in total bets before the bonus converts to withdrawable cash. Some casinos apply the requirement to the bonus amount only. Others apply it to the bonus plus deposit combined: a $500 deposit matched with a $500 bonus at 30x deposit-plus-bonus means $30,000 in wagering. Always identify which calculation applies.' },
    { type: 'p', text: 'For context: a typical slot with 96% RTP loses approximately $0.04 per $1 wagered on average. To wager $30,000 on slots, you would statistically lose around $1,200, more than double your original bonus value. Wagering requirements below 20x can offer genuine value. Requirements above 40x are rarely worth the effort. Requirements above 60x should be declined entirely.' },
    { type: 'h2', text: 'Game contributions: the hidden multiplier' },
    { type: 'p', text: 'Even when wagering requirements look manageable, game contributions can make them far harder to meet than they appear. Most casinos apply different contribution percentages to different game types. Slots typically contribute 100% to wagering: $1 bet on a slot counts as $1 toward your requirement. Table games like blackjack, roulette, and baccarat commonly contribute only 5–10%. Live dealer games often contribute 0–10%. If you primarily play table games, a 30x wagering requirement on slots effectively becomes 300x+ for your preferred game type.' },
    { type: 'p', text: 'Check the game contributions table. It should be in the bonus terms, though it is often buried in footnotes. If a casino does not publish clear contribution rates, treat any bonus there with significant scepticism.' },
    { type: 'h2', text: 'Maximum win caps' },
    { type: 'p', text: 'Many bonuses include a maximum withdrawal limit on winnings derived from bonus play. A common structure is a $200 or $500 cap regardless of actual winnings. This means if you hit a large win during bonus wagering (say, $5,000 on a $500 bonus) you can only withdraw $200 or $500 of that amount, with the remainder forfeited. Maximum win caps are most common in smaller welcome bonuses and free spin offers. High-value match bonuses at reputable casinos typically do not have win caps, or set them at a reasonable multiple of the deposit (e.g., 5x or 10x).' },
    { type: 'h2', text: 'Time limits' },
    { type: 'p', text: 'Bonuses expire if wagering requirements are not met within a specified window, commonly 7, 14 or 30 days. Time limits matter most for larger bonuses with high wagering requirements. If you cannot realistically meet a 40x wagering requirement within 7 days at your normal play volume, the bonus will expire and both the bonus funds and any winnings generated will be forfeited. Accepting a bonus you cannot complete within the time limit is equivalent to accepting a withdrawal restriction on your account.' },
    { type: 'h2', text: 'Worked examples from casinos we review' },
    { type: 'p', text: 'Take Mirax Casino\'s headline offer: up to 5 BTC across four deposits with 150 free spins distributed as 100 on D1 and 50 on D2 (D3 and D4 are cash-only matches). The BTC ceiling is real and competitive with the largest in our rankings. The cost of clearing it is the question. With wagering applied to bonus funds (read the current terms for the multiplier and game contribution split), getting to a withdrawable balance from a fully-claimed package means real-money play volume well into five figures of BTC-equivalent value. On a slot library with 96% RTP, that wagering volume implies a four-figure expected loss before the bonus converts. The bonus is generous on paper; whether it\'s genuinely worth clearing depends on how aggressively you were planning to play anyway.' },
    { type: 'p', text: 'BitStarz\'s 5 BTC + 180 free spins package shows how the wagering multiplier, not any fee, is where the real cost lives: its live terms document no fees on deposits or withdrawals at all, but match-bonus wagering runs up to 40x. Clearing 40x on a $1,000-equivalent bonus means $40,000 in bets, and at a typical 96% slot RTP that volume carries an expected loss of around $1,600, more than many players will ever be up. Whether you\'d still take the bonus knowing that is the better way to think about it than the headline number alone.' },
    { type: 'p', text: 'Across the eight casinos we review, the bonuses with the cleanest math are usually the rakeback and weekly cashback offers at platforms like Duelbits ($30 weekly cashback) and Cloudbet (VIP cashback rates): no wagering, no maximum win caps, nothing between the reward and the wallet. BC.Game\'s 220% Deposit Rakeback Welcome Bonus has structurally moved to the same model: locked-balance unlocking as you wager rather than wagering-then-withdraw. Cashback beats most match bonuses for active players for exactly this reason.' },
    { type: 'h2', text: 'The bonuses actually worth taking' },
    { type: 'p', text: 'Cashback offers with no wagering requirements are the most player-friendly bonus type available. The casino returns a percentage of net losses (typically 10–20%) with no strings attached. What you win, you keep. These are standard in VIP programmes at casinos like BitStarz, Cloudbet and BC.Game. Reload bonuses with low wagering (under 25x) are worthwhile for regular players. Free spins are lower risk but also lower value. Read the maximum win cap carefully. First deposit match bonuses at 20–30x wagering with no game restrictions are reasonable. Anything with 40x+ wagering, restricted game lists, and a win cap is a marketing tool, not a player incentive.' },
    { type: 'h2', text: 'Summary checklist before accepting any bonus' },
    { type: 'p', text: 'Before accepting any casino bonus, verify: the wagering requirement (and whether it applies to bonus only or deposit plus bonus), the game contribution percentages for your preferred game type, any maximum withdrawal limit on winnings, the time window to complete wagering, and whether the bonus can be declined. A bonus you cannot or will not complete within its terms is not a bonus: it is a withdrawal restriction. The best bonus is often no bonus at all, particularly for players who primarily play table games or who plan to withdraw quickly after winning.' },
  ],

  'bitcoin-vs-usdt-casinos': [
    { type: 'h2', text: 'The fundamental difference' },
    { type: 'p', text: 'Bitcoin (BTC) and USDT (Tether) are the two most widely accepted cryptocurrencies at online casinos. They are structurally very different assets, and that difference has practical consequences for every player. Bitcoin is a volatile decentralised currency whose price changes constantly. USDT is a stablecoin pegged 1:1 to the US dollar: one USDT always equals one dollar. Everything else flows from that distinction. For most players USDT on TRC-20 is the better casino currency on all three measures that matter: confirmation in under 3 seconds against 10 to 60 minutes for Bitcoin, fees under $0.01 against BTC\'s variable fees, and a bankroll that holds its dollar value between sessions.' },
    { type: 'h2', text: 'Stability: the decisive factor for most players' },
    { type: 'p', text: 'For most casino players, bankroll stability is the most important factor. When you deposit $500 of BTC and play for a few hours, the value of that $500 may have shifted to $450 or $560 by the time you consider withdrawing, regardless of whether you won or lost at the tables. This creates a second, uncontrolled gambling variable on top of the games themselves. Your casino results and your BTC price exposure are now intertwined.' },
    { type: 'p', text: 'USDT eliminates this entirely. A $500 USDT deposit is worth $500 when you withdraw, assuming your gambling results were breakeven. You know exactly where you stand at all times. For players managing a gambling budget carefully, this predictability is genuinely valuable: it lets you track wins and losses accurately against your actual bankroll rather than against a moving target.' },
    { type: 'h2', text: 'Speed comparison' },
    { type: 'p', text: 'USDT on TRC-20 wins on speed. Tron network confirmations complete in under 3 seconds, making USDT withdrawals arrive almost instantly once the casino broadcasts the transaction. USDT on ERC-20 (Ethereum) is slower and more expensive: 15–30 seconds per block but with gas fees that can be $5–$30. If your casino offers TRC-20 USDT, use it over ERC-20.' },
    { type: 'p', text: 'Bitcoin withdrawals depend heavily on network conditions. During quiet periods, a BTC transaction confirms in 10–20 minutes. During bull market congestion, the same transaction can take 60–90 minutes with priority fees, or hours without them. On a day-to-day basis, BTC withdrawal speed is simply less predictable than TRC-20 USDT.' },
    { type: 'h2', text: 'Fees comparison' },
    { type: 'p', text: 'TRC-20 USDT fees are under $0.01 per transaction in virtually all conditions. Bitcoin fees fluctuate with network demand. At times of low congestion, BTC fees can be under $1. During peak demand periods in 2024 and 2025, fees spiked to $50–$100 per transaction. For frequent depositors and withdrawers, USDT on TRC-20 is substantially cheaper over time.' },
    { type: 'h2', text: 'Availability at casinos' },
    { type: 'p', text: 'Bitcoin has a slight edge on availability: virtually every crypto casino accepts BTC, including some smaller platforms that only support Bitcoin. USDT is accepted at all major crypto casinos but may not be available at the very smallest operators. All eight platforms reviewed on PlayMagpie support both BTC and USDT. In practice, availability is not a meaningful differentiator for players using reputable platforms.' },
    { type: 'h2', text: 'TRC-20 USDT support across the casinos we review' },
    { type: 'p', text: 'The catch with USDT is that the same coin runs on multiple networks. ERC-20 (Ethereum) USDT carries the same gas-fee exposure as ETH itself: slow and expensive. TRC-20 (Tron) USDT is the version that delivers the speed and cost advantages described above. Looking at our eight reviewed casinos: BC.Game lists 100+ cryptocurrencies including TRC-20 USDT explicitly. Duelbits supports 12 cryptos including USDT TRC-20. Cloudbet\'s 29-coin lineup includes USDT and USDC across supported chains. BitStarz, Mirax Casino, 7Bit Casino, Shuffle and Roobet all support USDT. Verify the network selection at the cashier before depositing, since sending TRC-20 USDT to an ERC-20 address results in lost funds.' },
    { type: 'p', text: 'Practical rule: if the casino lists USDT support and has been operating for more than a year, it almost certainly enables TRC-20. The deposit screen in the cashier confirms which networks are accepted. Pick TRC-20 unless your wallet only holds ERC-20 USDT and you don\'t want to bridge.' },
    { type: 'h2', text: 'The case for choosing Bitcoin' },
    { type: 'p', text: 'Bitcoin makes sense if you hold BTC as a long-term investment and want to use it at casinos without converting to stablecoins. Some players prefer to keep all of their wealth in BTC and treat casino deposits as transactions from their existing holdings. In this case, the volatility is not an added risk: it was already present in their portfolio. Bitcoin also makes sense for players in jurisdictions where stablecoin acquisition is harder than BTC, or where exchange-based BTC purchases are the most accessible on-ramp.' },
    { type: 'h2', text: 'The PlayMagpie verdict' },
    { type: 'p', text: 'For the majority of casino players, USDT on TRC-20 is the superior option: faster, cheaper, and predictable. It lets you gamble with a fixed dollar amount and understand your results clearly. Bitcoin is appropriate for players who already hold BTC and prefer not to convert, or who want deliberate price exposure alongside their gaming. If you are deciding which to acquire specifically for gambling, acquire USDT on TRC-20 via an exchange, send it to a self-custodial wallet, and deposit from there. Your experience will be faster and your bankroll more manageable.' },
  ],

  'do-crypto-casinos-require-kyc': [
    { type: 'h2', text: 'The short answer' },
    { type: 'p', text: 'Some do, some don’t, and unlike at a licensed fiat casino, it is a genuine choice rather than a universal mandate. At a crypto casino, KYC (Know Your Customer identity verification) is set by the operator’s own policy, not imposed on every player by a Tier-1 regulator. Across the eight casinos we review, three keep routine crypto play document-free (two of them up to a KYC check that is standard at EUR 2,000 equivalent), four run a "Light" policy that only triggers on larger or fiat-side activity, and one applies Standard KYC with documented holds on large wins. So whether you will be asked for ID depends entirely on which operator you pick, and, at the Light-KYC ones, on how you play.' },

    { type: 'h2', text: 'What KYC actually is at a crypto casino' },
    { type: 'p', text: 'KYC is the process of confirming you are who you say you are: typically a government photo ID plus a recent proof of address. Licensed fiat casinos must run it on every player because their regulators and banking partners require it. Crypto casinos sit in a different position: settlement happens on-chain rather than through the banking system, and most operate under a Curaçao licence rather than a Tier-1 regulator like the UKGC or MGA. That gives them room to choose how much verification to apply, and they land in noticeably different places.' },
    { type: 'p', text: 'The practical consequence is that "do I need to verify my identity" has no single answer for crypto casinos the way it does for a regulated fiat site. It is an operator-level decision, and it is one of the more meaningful differences between platforms: more meaningful, for a privacy-focused player, than the welcome bonus or the game count.' },

    { type: 'h2', text: 'The three KYC postures, by operator' },
    { type: 'p', text: 'We score each casino’s KYC posture on a 0–10 transparency-and-friction scale, recorded alongside the rest of its profile in our data. The scores sort into three bands: None (no documents collected on routine crypto play, in two cases up to a published EUR 2,000 equivalent check), Light (document-free for routine play, with verification reserved for larger or fiat-side activity), and Standard (verification applied more readily, including on large wins). Here is where each casino we review actually sits. The three with dedicated KYC pages link through to the full breakdown.' },
    {
      type: 'kycposture',
      items: [
        { slug: 'bc-game', href: '/reviews/bc-game/kyc', note: 'Email-only signup and document-free routine crypto play, with a KYC check standard at EUR 2,000 equivalent, applied at BC.Game’s discretion and sometimes triggered earlier.' },
        { slug: '7bit-casino', href: '/reviews/7bit-casino', note: 'Operating since 2014. Crypto withdrawals are document-free below a KYC check that is standard at EUR 2,000 equivalent, applied at 7Bit’s discretion and sometimes triggered earlier.' },
        { slug: 'duelbits', href: '/reviews/duelbits', note: 'No KYC for crypto play and withdrawals, only basic checks on unusual activity. Most crypto payouts clear in under 5 minutes.' },
        { slug: 'bitstarz', href: '/reviews/bitstarz/kyc', note: 'Light KYC. Crypto-only play rarely triggers it; fiat-side activity or a flagged pattern can. No published dollar threshold.' },
        { slug: 'cloudbet', href: '/reviews/cloudbet/kyc', note: 'Light at scale. Withdrawals to $2,200 a day pre-verification; no limits once fully verified. Dual Curaçao + Kahnawake licence.' },
        { slug: 'mirax-casino', href: '/reviews/mirax-casino', note: 'Light KYC: same posture as sister brand 7Bit’s operator. Triggered above higher withdrawal thresholds rather than on routine play.' },
        { slug: 'shuffle', href: '/reviews/shuffle', note: 'Light KYC that can trigger on larger withdrawals, with some reported temporary holds on high-value cash-outs pending review.' },
        { slug: 'roobet', href: '/reviews/roobet', note: 'Standard KYC: the strictest here. Documented multi-day holds on large wins (AskGamblers cases at $20k–$115k); expect re-verification on any sizeable cashout.' },
      ],
    },

    { type: 'h2', text: 'When KYC triggers: if it does' },
    { type: 'p', text: 'At an operator with a document-free range, nothing in routine play below its threshold triggers a document request; compliance is handled in the background through on-chain transaction monitoring, and the check arrives at the stated boundary rather than never. At a Light-KYC operator, two things flip verification from exception to requirement. The first is fiat-side activity: the moment a deposit or withdrawal touches the regulated banking rails, identity verification becomes a compliance obligation the casino cannot opt out of. The second is an outsized or flagged crypto withdrawal: a large cash-out, or account behaviour the platform’s monitoring reads as unusual, can route a payout into manual review.' },
    { type: 'p', text: 'Standard KYC works differently again. At an operator like Roobet, verification is applied more readily and (per the documented complaint record) can re-trigger on large wins even for accounts that have transacted before, which is the single biggest reason we score its KYC posture lowest in the catalogue. The lesson across all three bands is the same: routine crypto play is where no-KYC and Light-KYC look identical, and the large-withdrawal moment is where they diverge sharply.' },

    { type: 'h2', text: 'What documents you’ll be asked for' },
    { type: 'p', text: 'When verification does happen, the request is consistent across operators: a government-issued photo ID (passport, national ID or driving licence), a recent proof of address such as a utility bill or bank statement, and, only if you used a card or fiat rail, proof of that payment method. At genuinely large withdrawal amounts, source-of-funds documentation can be requested, which is standard for high-value crypto cash-outs anywhere, not specific to gambling. On turnaround we have no verified figure to give you: none of the operators we review publishes a review time we have been able to confirm, so we would rather say that than print an estimate.' },

    { type: 'h2', text: 'How to keep documents out of it for as long as possible' },
    { type: 'p', text: 'If keeping identity documents out of the loop is your priority, the route is straightforward: choose an operator with a document-free range, play crypto-only, and withdraw to a self-custodial wallet you control. Among the casinos we review, BC.Game and 7Bit keep routine crypto play document-free up to a KYC check that is standard at EUR 2,000 equivalent and applied at their discretion, and Duelbits publishes a no-KYC posture for crypto play for which we have not verified a threshold either way. Note the framing: this defers verification rather than removing it, and any operator can act on a flagged account. The key point most guides miss is that the privacy comes from the casino’s policy, not from the coin. There is no "anonymous cryptocurrency" that bypasses a casino that requires KYC, and at a no-KYC casino your coin choice is purely a speed-and-fees decision. The category hub is our no-KYC crypto casinos page.' },

    { type: 'h2', text: 'The honest trade-off' },
    { type: 'p', text: 'No-KYC is not free of downsides. A casino that collects identity documents only above a threshold, or not at all, is almost by definition one that operates outside the Tier-1 regulatory framework: Curaçao rather than the UKGC or MGA. That means lighter external oversight and, if a dispute ever escalates, a weaker formal recourse path than a Tier-1 licence would give you. The decision is a genuine trade between anonymity and oversight: privacy-first players are well served by the no-KYC operators, while players who weight regulatory protection more heavily should accept Light KYC as the cost of it. Neither answer is universally correct, which is exactly why this is an operator-level choice rather than an industry default.' },
    {
      type: 'plink',
      parts: [
        'One practical footnote: verification is also the most common reason a withdrawal already in progress stops moving. If that is what brought you here, the mechanics of a stalled payout, including what a mid-withdrawal document request actually does to your balance, are covered in ',
        { text: 'why a crypto casino withdrawal goes pending', href: '/guides/why-is-my-crypto-casino-withdrawal-pending' },
        '.',
      ],
    },
    // Scope line added 2026-08-25 when the verification-process guide shipped.
    {
      type: 'plink',
      parts: [
        'Scope note: this page owns policy and who, meaning which operators verify and what they ask for. What the process itself looks like once a check triggers, stage by stage, is covered in ',
        { text: 'our guide to the crypto casino verification process', href: '/guides/crypto-casino-verification-process' },
        '.',
      ],
    },
  ],

  'why-is-my-crypto-casino-withdrawal-pending': [
    { type: 'h2', text: 'The short answer' },
    { type: 'p', text: 'A pending crypto casino withdrawal is in one of three states: the casino has accepted the request but has not broadcast it yet, the transaction is on the blockchain but not yet confirmed, or it is confirmed on-chain and has arrived somewhere you have not checked. Those three look identical inside the casino cashier, which is why "pending" feels so uninformative, but they have completely different causes and completely different fixes. Only the first is the casino’s to resolve. The second resolves itself. The third is almost always at your end, and it is the one where acting quickly matters most.' },
    { type: 'p', text: 'Working out which state you are in takes about a minute and does not require contacting anyone. Everything below is organised around that single diagnostic, because the most common reason a stuck withdrawal stays stuck is that the player spends three days chasing the wrong party.' },

    { type: 'h2', text: 'Find the transaction ID first: it splits the problem in two' },
    { type: 'p', text: 'Whether a transaction ID exists yet is the one fact that tells you whether the delay belongs to the casino or to the blockchain. A transaction ID, usually labelled TXID or transaction hash, is the long string of letters and numbers that identifies a transaction on-chain. It is created at the moment the casino broadcasts your payout, not at the moment you request it. So its presence or absence is a clean dividing line.' },
    { type: 'p', text: 'Look in the casino cashier under withdrawal or transaction history and open the pending entry. If a TXID is shown, copy it and paste it into the explorer for the network you withdrew on: Tronscan for TRC-20, Solscan for Solana, Etherscan for Ethereum and ERC-20 tokens, BscScan for BNB Smart Chain, and mempool.space for Bitcoin. If no TXID is shown, there is nothing to look up, because nothing has been broadcast. That absence is not a bug in the interface. It is the answer.' },
    { type: 'p', text: 'One caveat worth knowing before you draw conclusions: some platforms display a TXID field that stays blank until the payout clears internal review, and a few populate it only after the first confirmation. If the field exists but is empty, treat that as state one below.' },
    {
      type: 'plink',
      parts: [
        'The one-click version of that lookup, with a chain selector, plus how to read confirmations, the sent-but-not-received checklist and who to contact with what, lives in ',
        { text: 'our TXID tracking guide', href: '/guides/crypto-casino-withdrawal-txid' },
        ', which owns the on-chain half of this diagnostic; this page keeps the casino-side half.',
      ],
    },

    { type: 'h2', text: 'State 1: no transaction ID, so the casino still holds the funds' },
    { type: 'p', text: 'If no TXID exists, your money has not left the casino, and no amount of blockchain analysis will explain the delay. This is the state where contacting support is worth doing, and it is also the state that covers most genuinely long waits. Five things commonly cause it.' },

    { type: 'h3', text: 'Batched or manually reviewed payouts' },
    { type: 'p', text: 'Not every operator broadcasts payouts the instant you click withdraw. Some run automated systems that push the transaction within seconds; others batch withdrawals into processing runs, or route anything above a threshold to a human for sign-off. A platform doing manual review at 2am on a Sunday behaves very differently from the same platform at midday on a Tuesday. This is ordinary process rather than a problem, and it is the single most likely explanation for a payout that is a few hours late rather than a few days.' },

    { type: 'h3', text: 'Verification requested mid-withdrawal' },
    { type: 'p', text: 'A document request raised after you hit withdraw will hold the payout until the check clears, and this is the delay cause most likely to run into days rather than hours. It is worth being precise about what varies here. Verification posture is set operator by operator, and the operators that describe routine crypto play as document-free are the least likely to stop a payout this way.' },
    {
      type: 'plink',
      parts: [
        'We are deliberately not restating BC.Game’s or 7Bit’s no-KYC policy as an absolute in this guide: both are queued for direct re-verification against their live terms, so for now we treat their published wording as the operator’s claim rather than our finding. What is verified from primary sources is Cloudbet’s tiered model, where accounts are capped at $2,200 a day until Level 2 verification is complete and uncapped after it (Cloudbet help centre, verified July 2026), and Roobet’s Standard posture, the strictest in our catalogue. For who asks for what and when, see ',
        { text: 'our guide to KYC at crypto casinos', href: '/guides/do-crypto-casinos-require-kyc' },
        ', and for the operators that publish a no-document policy, ',
        { text: 'the no-KYC casino hub', href: '/no-kyc-casinos' },
        '.',
      ],
    },

    { type: 'h3', text: 'An unfinished bonus is locking the balance' },
    { type: 'p', text: 'If you accepted a welcome offer and have not met its wagering requirement, part or all of your balance may not be withdrawable yet, and some platforms surface that as a pending withdrawal rather than a clear refusal. Check whether the cashier separates real balance from bonus balance. If it does, and the withdrawable figure is lower than you expected, the delay is a bonus term rather than a payment problem. Requesting a withdrawal with an active bonus can also forfeit the bonus and anything won from it, so read the offer’s terms before you cancel anything.' },

    { type: 'h3', text: 'You have hit a limit rather than a delay' },
    { type: 'p', text: 'Daily and per-transaction withdrawal caps produce queued payouts that look pending but are actually scheduled. Cloudbet’s $2,200 daily cap before full verification is the clearest documented example in our catalogue: a larger cash-out does not fail, it meets the ceiling. Minimums cause the mirror-image problem, where a request below the operator’s floor sits unprocessed rather than being rejected outright. Minimum withdrawal amounts are usually set in the cashier rather than the headline terms, so check there before assuming a small cash-out has failed.' },

    { type: 'h3', text: 'A changed address, a new device or a first cash-out' },
    { type: 'p', text: 'Security reviews cluster around change. A withdrawal address you have never used before, a login from a new device or country, or your first withdrawal on the account are all things that risk systems are built to pause on. This class of hold is usually short and usually resolves without you doing anything, but it is worth knowing that the trigger was the change rather than the amount.' },

    { type: 'h2', text: 'State 2: broadcast but not yet confirmed' },
    { type: 'p', text: 'If the explorer recognises your TXID but shows it as unconfirmed or pending, the transaction has left the casino and is queued on the network, which means the casino can no longer speed it up and neither can you in most cases. The money is not lost. It is sitting in the mempool, the waiting area of unconfirmed transactions, until a miner or validator includes it in a block.' },
    { type: 'p', text: 'How long that takes depends almost entirely on which network you chose. Bitcoin averages around ten minutes per block, and most casinos wait for one to three confirmations before treating a payout as settled, so a thirty to sixty minute wait is normal rather than alarming. When the Bitcoin mempool is busy, a transaction sent with a low fee can wait considerably longer, because fee level determines queue position. Ethereum confirms in seconds but has the same fee dynamic during congestion. Tron and Solana confirm in a few seconds at fees well under a cent, and effectively never produce this state, which is the practical reason they dominate our payout-speed rankings.' },
    {
      type: 'plink',
      parts: [
        'There is nothing to fix here, only to wait for. If this state is a recurring annoyance rather than a one-off, the fix is upstream: pick a faster rail next time. ',
        { text: 'Which crypto to gamble with', href: '/guides/best-crypto-for-gambling' },
        ' covers the trade-offs coin by coin.',
      ],
    },

    { type: 'h2', text: 'State 3: confirmed on-chain but not in your wallet' },
    { type: 'p', text: 'If the explorer shows confirmations, the transfer completed and the problem is at the receiving end, which is the state that most rewards acting quickly. The casino has done everything it agreed to do, and support will be able to tell you little beyond what the explorer already shows. Four causes account for nearly all of these.' },
    { type: 'p', text: 'The most common is a token your wallet holds but does not display: many wallets show only assets you have manually added, so a USDT balance can arrive and remain invisible until you add the token contract. The second is a deposit to an exchange rather than a self-custodial wallet, where crediting is the exchange’s process and often needs more confirmations than the chain itself required. The third is an omitted memo or destination tag, which some exchanges require to route a deposit to the right account; funds sent without one are usually recoverable but only through that exchange’s support. The fourth is the serious one: a withdrawal sent on a network the receiving address does not support.' },
    { type: 'p', text: 'That last case deserves a blunt warning. Sending TRC-20 USDT to an address that only exists on Ethereum, or the equivalent mismatch on any other pair of chains, generally means the tokens sit at an address nobody can access on that network. Recovery is possible in narrow circumstances, usually only where the receiving wallet supports both chains and you control the keys, but the realistic outcome is permanent loss. This is why the network selector at the casino cashier matters more than any other field on the withdrawal form.' },

    { type: 'h2', text: 'What the casinos we review actually publish about timing' },
    { type: 'p', text: 'Published payout windows across the eight casinos we review run from instant to 24 hours, which means "pending" only becomes unusual once you are past the operator’s own stated window. Those figures are the operators’ published or documented processing times as recorded in our catalogue, not stopwatch measurements taken by us, and we describe them that way deliberately.' },
    { type: 'p', text: 'For crypto payouts, Duelbits publishes instant to five minutes, BitStarz under ten minutes, and BC.Game, 7Bit and Shuffle instant to ten minutes. Mirax runs instant to fifteen. Cloudbet states that most withdrawals are instant with some taking up to 24 hours, which is the widest published window among the group and is verified against its own help centre. Roobet publishes around fifteen minutes for most crypto and up to 24 hours for Bitcoin; its current terms, read in full on 25 August 2026, carry no weekend-processing clause, so a payout sitting past those windows there points to a verification check rather than the calendar.' },
    {
      type: 'plink',
      parts: [
        'Read those numbers as thresholds for concern rather than promises. A payout inside the stated window is behaving normally even when it feels slow. The full speed ranking, and the mechanics of a withdrawal that is working correctly, are on ',
        { text: 'our fast withdrawal casinos page', href: '/fast-withdrawal-casinos#how-withdrawals-work' },
        '.',
      ],
    },

    { type: 'h2', text: 'How long to wait before you chase it' },
    { type: 'p', text: 'Give the operator its stated window plus one full processing cycle before contacting support, and check the explorer before you do. In practice that means a few hours on a platform publishing sub-ten-minute payouts, and a full day where the published window is 24 hours or the operator does not process at weekends. Contacting support twenty minutes into a payout that the casino says takes up to a day achieves nothing except a longer queue for everyone.' },
    { type: 'p', text: 'The exception is state three. If the explorer shows the transaction confirmed and you suspect a wrong-network send or a missing memo, do not wait at all. Those cases get harder to resolve with time, and where an exchange is involved its support queue is the slow step.' },

    { type: 'h2', text: 'What to send support so it is resolved on the first reply' },
    { type: 'p', text: 'One message containing five specifics resolves more cases than five messages containing none. Include the exact amount and currency, the network you selected, the destination address you entered, the date and time of the request with your timezone, and the TXID if one exists. If you are in state one, say explicitly that no TXID has been generated, because that tells the agent immediately that this is an internal matter rather than a chain query.' },
    { type: 'p', text: 'Ask one direct question rather than describing your frustration: is this payout awaiting internal approval, awaiting verification, or blocked by a limit or bonus condition? Those are the three answers that determine what happens next, and an agent can answer all three from your account record in a single reply. Keep the ticket in one thread; opening a second one usually resets your position in the queue.' },

    { type: 'h2', text: 'When a delay stops looking like process and starts looking like a problem' },
    { type: 'p', text: 'A delay becomes a genuine warning sign when the stated reason changes each time you ask, or when a large win specifically is what triggered the hold. Ordinary processing delays have consistent explanations and finite timelines. The pattern worth taking seriously is a payout that was routine at small amounts and became complicated at a large one, particularly when new verification requirements appear only after the win.' },
    {
      type: 'plink',
      parts: [
        'We score this behaviour into our ratings rather than treating it as an aside. Roobet carries the lowest withdrawal score in our catalogue at 6.5 out of 10, on the basis of a public complaint record including holds on cash-outs between roughly $20,000 and $115,000 that were resolved through AskGamblers mediation, plus one unresolved $84,000 case. Shuffle has attracted reports of temporary holds on high-value withdrawals pending review, which we record as reports rather than as verified operator policy. Both are documented in the respective reviews, and the sourcing standard behind them is set out in ',
        { text: 'our methodology', href: '/methodology' },
        '.',
      ],
    },

    { type: 'h2', text: 'The one decision that prevents most of this' },
    { type: 'p', text: 'Almost every avoidable pending withdrawal traces back to a choice made before the money was ever at stake: the rail you deposited on, the verification state of your account, and whether you accepted a bonus. Withdrawing on the network you deposited on, completing any verification the operator is going to ask for before you have winnings waiting, and knowing whether a bonus is attached to your balance eliminates the majority of the delays described above.' },
    {
      type: 'plink',
      parts: [
        'The rest is network choice, and that one is settled: Tron and Solana confirm in seconds for fractions of a cent, which is why state two barely exists for players using them. If payout speed is the thing you optimise for, start with ',
        { text: 'the casinos ranked on withdrawal speed', href: '/fast-withdrawal-casinos' },
        ' and the ',
        { text: 'coin-by-coin comparison', href: '/guides/best-crypto-for-gambling' },
        '.',
      ],
    },
  ],

  // Added 2026-08-01. Scope is the MONEY side of a large cash-out: caps,
  // documented verification thresholds, and holds. The document workflow is
  // deliberately not covered here (reserved for the verification-process
  // guide), and policy/who stays with do-crypto-casinos-require-kyc. Every
  // figure below traces to lib/casinos.ts or to an owner primary-source read
  // recorded in STATE.md. The Roobet fiat withdrawal fee is deliberately
  // OMITTED: its clause boundary is under owner re-verification and an
  // unresolved number does not go on a page about what large cash-outs cost.
  'large-crypto-casino-withdrawals': [
    { type: 'h2', text: 'The short answer' },
    { type: 'p', text: 'A large withdrawal runs into one of three things, and they are not the same problem. A cap meters it, so the money arrives in instalments instead of all at once. A verification threshold gates it, so the money waits on documents. A discretionary review holds it, so the money waits on a decision. Which one you meet is set by the operator and by the amount, and at most of the casinos we review it is knowable before you deposit rather than discovered afterwards.' },
    { type: 'p', text: 'The size that matters is lower than most players expect. The lowest documented verification trigger in our catalogue is EUR 2,000 equivalent, and the lowest daily ceiling is $2,200. Those are ordinary wins on a modest bankroll, not jackpots, which is why this is worth understanding before it is your money sitting still.' },
    {
      type: 'plink',
      parts: [
        'This guide covers what happens to the money: the caps, the thresholds and the holds. If your payout is simply not moving and you want to work out where it is stuck, that is a different diagnostic and it lives in ',
        { text: 'our guide to why a crypto casino withdrawal goes pending', href: '/guides/why-is-my-crypto-casino-withdrawal-pending' },
        '. For which operators ask for documents at all, and on what policy, see ',
        { text: 'do crypto casinos require KYC', href: '/guides/do-crypto-casinos-require-kyc' },
        '.',
      ],
    },

    { type: 'h2', text: 'A cap meters your money, it does not refuse it' },
    { type: 'p', text: 'Hitting a daily ceiling is not a failed withdrawal, and reading it as one is the most common unnecessary panic in this whole area. The balance stays yours and pays out across consecutive requests until it is gone. The practical cost is time and the mild indignity of doing the same thing four days running, not risk to the money.' },
    { type: 'p', text: 'Cloudbet publishes the clearest documented example in our catalogue, and it is a tier rather than a flat rule: accounts are capped at $2,200 a day until Level 2 verification is complete, and carry no withdrawal limit at all once it is. That is the single most useful number on this page, because it tells you the cap is something you can remove in advance rather than something you negotiate afterwards. It is verified against Cloudbet’s own help centre.' },
    { type: 'p', text: 'Roobet is the opposite structure: on a full read of its current Terms of Service (25 August 2026), the terms set no withdrawal maximum at all, with clause 10.2 reserving only the right to set a minimum. What replaces the arithmetic of a cap is discretion: clause 10.4 lets enhanced due diligence delay or decline a withdrawal, with Roobet able to decline to explain the nature of the investigation, and clause 10.3 lets multiple pending withdrawals be rejected and consolidated into one. An earlier version of this paragraph cited a $200,000 daily ceiling and a no-weekend-processing rule; neither appears anywhere in the current terms, and both claims are withdrawn.' },
    { type: 'p', text: 'The reason the distinction matters is that a cap is arithmetic and a hold is a judgement. You can calculate exactly when a capped balance finishes paying out. You cannot calculate when a review ends.' },

    { type: 'h2', text: 'The verification threshold: what is actually documented' },
    { type: 'p', text: 'Two operators in our catalogue run a KYC check as standard at EUR 2,000 equivalent: BC.Game and 7Bit Casino. Application is at the operator’s discretion in both cases and can be triggered earlier, so treat the figure as the point where a check becomes normal rather than the point where it becomes possible. Below it, both keep routine crypto play document-free, and BC.Game’s signup is email-only.' },
    {
      type: 'plink',
      parts: [
        'That is a correction to what this site used to say, and it is published rather than quietly rewritten. We previously described both operators as requiring no documents at any amount. The owner read both sets of live terms on 1 August 2026 and that description was wrong, so it was retracted site-wide rather than softened. The dated correction record sits with our earlier ones on ',
        { text: 'the bonus and withdrawal transparency report', href: '/research/crypto-casino-bonus-transparency' },
        '.',
      ],
    },
    { type: 'p', text: 'For every other operator in the catalogue we do not state a trigger figure, and the omission is deliberate. We have not verified one, and a number invented for the sake of a complete table would be worse than an honest gap, particularly on a page a reader might act on with real money. Duelbits is the specific case worth naming: it publishes a no-KYC posture we have not independently checked either way, so this guide gives it no threshold rather than inferring one.' },

    { type: 'h2', text: 'What a large cash-out does not automatically change' },
    { type: 'p', text: 'Size does not by itself introduce a fee. That is worth stating because the opposite is widely assumed, and in this catalogue the documented position runs the other way: the live BitStarz terms record no fees on deposits or withdrawals at all, at any amount. That is one operator rather than a general rule, and it is exactly as far as the evidence goes. Where a fee does exist at another operator it is usually tied to the payment rail or to how often you cash out, not to the size of a single payout.' },

    { type: 'h2', text: 'The hold: when the review is discretionary' },
    { type: 'p', text: 'The third case is the one with no published number attached, because discretion is the whole mechanism. Shuffle documents that KYC can be triggered at withdrawal for larger amounts, and there are reports of temporary holds on high-value withdrawals pending review. We record that as reports rather than as verified operator policy, and the distinction is deliberate.' },
    {
      type: 'plink',
      parts: [
        'Roobet is where the public record is heaviest and where we are most direct about it. AskGamblers carries complaints against Roobet at roughly $20,000, $84,000, $97,000, $111,000 and $115,000, in which verified accounts saw cash-outs held in routine verification for days; the $84,000 case is publicly listed as unsolved. Those are public mediation records rather than our own testing, and they are the reason Roobet carries the lowest withdrawal score in our catalogue at 6.5 out of 10. The detail is in ',
        { text: 'our Roobet review', href: '/reviews/roobet' },
        ', and the head-to-head against the operator with the opposite cash-out architecture is ',
        { text: 'Cloudbet versus Roobet', href: '/compare/cloudbet-vs-roobet' },
        '.',
      ],
    },
    { type: 'p', text: 'None of that makes a hold the likely outcome of any particular large withdrawal. It makes it the outcome worth pricing in when you choose where to play with an amount you would mind waiting on.' },

    { type: 'h2', text: 'The pattern that should actually worry you' },
    { type: 'p', text: 'A delay stops looking like process and starts looking like a problem when the requirements appear only after the win. Verification that was never mentioned while you were depositing and losing, arriving the week you cash out something substantial, is a different signal from a check applied consistently at a published threshold. So is a stated reason that changes each time you ask.' },
    { type: 'p', text: 'Ordinary process has two properties: it is consistent across players and amounts, and it has an end date somebody will commit to. When either is missing, the useful question is not how long to keep waiting but whether the operator has ever published the rule it is now applying to you.' },

    { type: 'h2', text: 'Do not split a withdrawal to duck a threshold' },
    { type: 'p', text: 'It is the obvious workaround and it is a bad one. Operator terms generally prohibit structuring withdrawals to stay under a verification limit, so the tactic converts a routine documentation request into a suspicion about your account, which is a far worse position than simply uploading a passport. It also rarely works, because thresholds are commonly assessed cumulatively rather than per transaction.' },
    { type: 'p', text: 'The legitimate version of the same idea is to deal with verification when nothing is riding on it.' },

    { type: 'h2', text: 'What to do before the big win rather than after' },
    { type: 'p', text: 'Three things remove most of the friction described above, and all three have to happen while your balance is still ordinary. Complete verification early, at the point where a document request is an administrative task rather than an obstacle between you and a payout. Find the operator’s daily ceiling before you deposit, because that number decides whether a large win arrives in one piece or over a week. Keep your bonus state clean, since an unfinished wagering requirement can make a perfectly healthy balance partly unwithdrawable at exactly the wrong moment.' },
    {
      type: 'plink',
      parts: [
        'If cashing out large amounts is the normal case for you rather than the exception, the operator choice matters more than any of this. The catalogue ranked on documented limits and cap-free cash-out is on ',
        { text: 'our high roller casinos page', href: '/high-roller-casinos#withdrawal-limits' },
        ', and the speed ranking, for when the amount is fine but the wait is not, is on ',
        { text: 'fast withdrawal casinos', href: '/fast-withdrawal-casinos' },
        '.',
      ],
    },

    { type: 'h2', text: 'Where the figures on this page come from' },
    { type: 'p', text: 'Cloudbet’s $2,200 daily cap and its removal at Level 2 come from Cloudbet’s own help centre, read in July 2026. The EUR 2,000 checks at BC.Game and 7Bit come from a direct reading of both operators’ live terms on 1 August 2026. The BitStarz no-fee position comes from its live terms. The Roobet complaint amounts are public AskGamblers records. The published payout windows are the operators’ own stated processing times as recorded in our catalogue.' },
    {
      type: 'plink',
      parts: [
        'What none of these are is stopwatch measurements taken by us. We do not run test accounts or time our own withdrawals, and we do not describe operator claims as findings. Where a figure could not be verified to a primary source it is absent from this page rather than estimated. The full standard is set out in ',
        { text: 'our methodology', href: '/methodology' },
        '.',
      ],
    },
    // Scope line added 2026-08-25 when the verification-process guide shipped.
    {
      type: 'plink',
      parts: [
        'Scope note: this page owns the money side of a big cashout. What the verification itself looks like once it triggers, step by step, is covered in ',
        { text: 'our guide to the crypto casino verification process', href: '/guides/crypto-casino-verification-process' },
        ', and which operators verify at all is covered in ',
        { text: 'the KYC requirements guide', href: '/guides/do-crypto-casinos-require-kyc' },
        '.',
      ],
    },
  ],
  // September slate page 1 (drafted and deployed 2026-08-25). SCOPE: the
  // MECHANICS of verification. Policy-and-who stays with
  // do-crypto-casinos-require-kyc; the money stays with
  // large-crypto-casino-withdrawals. Sources per claim inline below; no
  // turnaround figures exist to publish and the page says so.
  'crypto-casino-verification-process': [
    { type: 'p', text: 'Verification at a crypto casino is a document sequence, not a single event: identity first, then proof of address, then, where the amounts justify it, source of funds, with your withdrawal limits restricted while each stage is under review. This page walks that sequence in the order it actually happens, sourced from the operators whose processes we can verify. Where no operator publishes a figure, and that includes verification turnaround times, this guide says so instead of inventing one.' },
    { type: 'h2', text: 'When verification actually triggers' },
    { type: 'p', text: 'Entry-level identity is thin at most crypto casinos. Cloudbet’s Level 1, per its own help centre (read 25 August 2026), requires a phone number, and routine crypto play at threshold operators runs on an email signup. The escalation points are what matter. First, cashout size: BC.Game and 7Bit Casino run a KYC check as standard at EUR 2,000 equivalent, applied at the operator’s discretion and capable of being triggered earlier, per a direct reading of both operators’ live terms on 1 August 2026. Second, compliance discretion with no threshold at all: Roobet’s Terms of Service (full read, 25 August 2026) let it demand KYC at any time under clause 4.9 and restrict deposit and withdrawal functions until the check completes. The practical rule: the trigger is the operator’s call, not yours, and a clean account history does not exempt you.' },
    { type: 'h2', text: 'The document sequence' },
    { type: 'p', text: 'The verifiable model is Cloudbet’s Level 2, which its help centre specifies as three items: a photo ID such as a national ID, a proof of address such as a utility bill, and face verification. That order (identity, then address, then a liveness check) is the standard shape of the sequence wherever it runs. Expect each item to be reviewed separately, and expect a rejected photo (glare, cropped corners, expired document) to restart that item rather than the whole sequence.' },
    {
      type: 'plink',
      parts: [
        'Which documents each operator asks for, and which operators ask at all, is the territory of ',
        { text: 'our guide to whether crypto casinos require KYC', href: '/guides/do-crypto-casinos-require-kyc' },
        '; this page is about what happens once the request lands.',
      ],
    },
    { type: 'h2', text: 'The under-review state' },
    { type: 'p', text: 'While documents are under review, the cashier does not simply pause: it gates. Cloudbet’s help centre states it directly: if you have submitted verification documents and are waiting for approval, your withdrawal limits remain restricted until the review is complete. Generalise that honestly and you get the under-review state everywhere: the balance is not gone, it is gated; deposits usually still work; and nothing about a review implies an accusation. What you should not do is stack new withdrawal requests on top of a gated one, since terms commonly allow pending requests to be rejected and consolidated (Roobet’s clause 10.3 says exactly that).' },
    { type: 'h2', text: 'Refusal grounds, from the one operator that publishes them' },
    { type: 'p', text: 'Most operators refuse withdrawals under a general compliance clause. Roobet’s terms are unusually specific, and useful for exactly that reason: clause 10.5 names four refusal grounds (identity not verified, payment method not confirmed as the account holder’s, an outstanding information request, minimum wager not met), and clause 10.4 adds enhanced due diligence that can delay or decline a withdrawal with the operator able to decline to explain the nature of the investigation. Read those four grounds as the categories to self-check anywhere: is your identity verified, is the destination provably yours, is there an unanswered document request in your inbox, and is your deposit fully wagered.' },
    { type: 'h2', text: 'Source-of-funds escalation' },
    {
      type: 'plink',
      parts: [
        'At genuinely large or accumulated cashouts, the sequence grows a fourth stage: source-of-funds documentation, meaning evidence of where the money you gambled with came from. It is the slowest stage because it is judged rather than matched against a template. The money side of that moment, caps, thresholds and what a large win actually triggers, belongs to ',
        { text: 'our guide to large crypto casino withdrawals', href: '/guides/large-crypto-casino-withdrawals' },
        '.',
      ],
    },
    { type: 'h2', text: 'How long does it take? The honest answer' },
    { type: 'p', text: 'No operator we can verify publishes a verification turnaround, and we will not invent one. What determines it is observable: how many stages the check involves, whether your documents pass first time, and whether the review is automated matching or human judgement (source-of-funds always the latter). The complaint record shows the tail risk rather than the average: documented cases exist of verified accounts re-checked at the moment of a large cashout, with the review running days. Plan around the tail if the money matters: complete verification before you need a payout, not during one.' },
    {
      type: 'plink',
      parts: [
        'If your withdrawal is already sitting in pending and you are not sure whether verification is the cause, ',
        { text: 'our guide to diagnosing a pending crypto casino withdrawal', href: '/guides/why-is-my-crypto-casino-withdrawal-pending' },
        ' separates a compliance hold from a network delay using the transaction ID.',
      ],
    },
  ],
  // September slate page 4 (drafted and deployed 2026-08-25). AU question
  // guide. ANTI-CANNIBALISATION CONTROLS, binding: zero legality verdicts,
  // scope line in the opening block, legality linked never restated. Only
  // Roobet's AU restriction is claimed by name (ToS s3.5, owner read
  // 2026-08-25).
  'is-crypto-safe-at-australian-casinos': [
    {
      type: 'plink',
      parts: [
        'The crypto part is the safest link in the chain: on-chain deposits and withdrawals work the same from Australia as anywhere. The real risks sit around it: operator terms, the custody gap while funds sit with an offshore operator, and the state-side frictions on the fiat rails. Whether any of this is legal for you is a different question with its own page: see ',
        { text: 'whether crypto gambling is legal in Australia', href: '/country/australia/legal' },
        '. This page stays on the safety mechanics.',
      ],
    },
    { type: 'h2', text: 'The operator-terms risk comes first' },
    { type: 'p', text: 'The largest avoidable risk for an Australian player is depositing at an operator whose own terms exclude Australia. It is not hypothetical: Roobet lists Australia in its restricted territories (Terms of Service clause 3.5, read in full on 25 August 2026), and restricted-territory accounts there are exposed to closure and fund forfeiture under clause 6.4. We do not publish acceptance claims for the other operators we review because we have not verified their restriction lists to the same standard, and that is precisely the point: the list lives in each operator’s own terms, it is the first thing to read before an AUD-equivalent ever leaves your wallet, and an operator that takes your deposit is not thereby confirming you were allowed to make it.' },
    { type: 'h2', text: 'The custody gap' },
    { type: 'p', text: 'An offshore casino balance is not a bank deposit and not an exchange account under AUSTRAC supervision: it is an unsecured claim on an operator regulated, at best, by an offshore licensing body. The practical rule is deposit-to-play, not deposit-to-store. Keep the bankroll on the site no longer than the session needs, and treat anything you would mind losing as misplaced the moment it is not in a wallet you control. This is an editorial judgement, and it is the same one we apply in our reviews when we score custody-adjacent risk.' },
    { type: 'h2', text: 'The state-side frictions, briefly' },
    {
      type: 'plink',
      parts: [
        'Australia’s frictions on this market are aimed at operators and payment rails rather than at the technology: DNS-level blocking of offshore sites and banks declining gambling-coded AUD transfers are the two a player actually meets, and the crypto rail is how AU players route around both in practice. The mechanics, the statute behind them and the 2026 reform bill are covered on ',
        { text: 'the Australia legality page', href: '/country/australia/legal' },
        ' and ',
        { text: 'the Australia country hub', href: '/country/australia' },
        '; this page does not restate them.',
      ],
    },
    { type: 'h2', text: 'The tax mechanic worth knowing before you fund' },
    { type: 'p', text: 'The ATO treats crypto as a CGT asset, so disposing of it, and funding a casino deposit can be a disposal, can itself be a taxable event separate from anything that happens at the casino, while casual gambling winnings are generally not assessable income for individuals. The trap is therefore on the funding side, not the winning side: moving a long-held, appreciated coin into a deposit can crystallise a gain. General information, not tax advice; the country hub covers the on-ramp detail.' },
    { type: 'h2', text: 'The safest funding path' },
    { type: 'p', text: 'Consumer protection in this chain lives at the regulated on-ramp, not at the casino. AUSTRAC-registered exchanges (CoinSpot, Independent Reserve and Swyftx are the majors Australians actually use) are the supervised step; everything after the withdrawal from the exchange is on you and the operator’s terms. Buy on a registered exchange, send on-chain, play with what you sent, and withdraw winnings back to a wallet you control rather than letting them sit.' },
    {
      type: 'plink',
      parts: [
        'If a payout does stall, the diagnostic lives in ',
        { text: 'our guide to pending crypto casino withdrawals', href: '/guides/why-is-my-crypto-casino-withdrawal-pending' },
        ', and what verification will look like if it triggers is in ',
        { text: 'the verification process guide', href: '/guides/crypto-casino-verification-process' },
        '.',
      ],
    },
  ],
  // Slate 2026-09-05, page 1. Scope: verifying ON-CHAIN. No operator figures.
  'crypto-casino-withdrawal-txid': [
    { type: 'h2', text: 'The short answer' },
    { type: 'p', text: 'Every crypto withdrawal that has actually been sent has a transaction ID, usually labelled TXID or transaction hash: the long string that identifies your payout on the blockchain itself. Once you have it, you do not need to trust the casino cashier, support chat or anyone else, because the chain is a public record and you can read your withdrawal directly off it. This page is the doing side of that check: where the TXID lives, a one-click lookup for the networks casinos actually pay out on, and how to read what the explorer shows you.' },
    {
      type: 'plink',
      parts: [
        'One scope note before the tool: this guide owns verifying the withdrawal on-chain. If your cashier shows no TXID at all, or you want the full three-state diagnostic of why a payout goes pending in the first place, that lives in ',
        { text: 'the pending withdrawals guide', href: '/guides/why-is-my-crypto-casino-withdrawal-pending' },
        ', which owns the casino-side half of this problem.',
      ],
    },
    { type: 'h2', text: 'Find your TXID first' },
    { type: 'p', text: 'Open the casino cashier and go to the withdrawal or transaction history. The pending or completed entry for your payout should carry the TXID, sometimes behind a details or expand control. Copy the whole string exactly: explorers match on the full hash, and a truncated paste finds nothing. If the field is empty or absent, the casino has not broadcast the transaction yet, and there is nothing on-chain to check; that situation is casino-side and belongs to the pending guide linked above.' },
    { type: 'h2', text: 'Check it on-chain' },
    { type: 'p', text: 'Pick the network you actually withdrew on, paste the TXID, and the button opens the public explorer for that chain with your transaction. The network matters: a TRC-20 USDT withdrawal is invisible to Etherscan, and vice versa, because they are different blockchains. The cashier entry states the network next to the withdrawal.' },
    { type: 'txidlookup' },
    { type: 'h2', text: 'How to read what you see' },
    { type: 'p', text: 'Three outcomes cover almost every lookup. First, the transaction is shown as confirmed: the money left, the chain agrees, and if it is not in your wallet the problem is at the receiving end, most often a wrong or old address, a missing memo or tag where the receiving platform requires one, or a wallet that has not refreshed. Second, the transaction exists but shows zero or few confirmations: it is in flight, and no one can speed it up or lose it at that point; Bitcoin produces a block roughly every ten minutes on average, Ethereum finalises in minutes, and Tron and Solana are usually a matter of seconds to low minutes end to end. Third, the explorer finds nothing at all: the TXID was never broadcast or was copied wrong, so re-copy it carefully, and if it still finds nothing, the withdrawal has not actually left the casino regardless of what the cashier status says.' },
    { type: 'h2', text: 'Sent but not received: the checklist' },
    { type: 'p', text: 'A confirmed transaction that has not arrived is the most stressful outcome and usually the most fixable. Check, in order: that the receiving address on the explorer matches the address you meant to withdraw to; that the network matches what your receiving wallet or exchange supports, because a token sent on the wrong network needs the receiving platform\'s help rather than the casino\'s; that any required memo, tag or destination code was included, since exchanges commonly credit memo-less deposits only after a manual support ticket; and that you are looking at the right asset in the receiving wallet, because a token can arrive without appearing until it is added to the wallet\'s display list. If the explorer shows your funds sitting at the correct address and your platform still has not credited them, the ticket goes to the receiving platform with the TXID attached, not to the casino.' },
    { type: 'h2', text: 'Who to contact, with what' },
    { type: 'p', text: 'The TXID decides who owns the problem. No TXID: the casino owns it, and the pending guide covers how long to wait and how to chase. TXID with confirmations and the right address: the receiving platform owns it, and your TXID is exactly what their support needs. TXID confirmed to a wrong address you control: move on the receiving side. Confirmed to an address you do not control and did not enter: stop and treat it as a security incident, because withdrawals do not rewrite their own destinations.' },
  ],
  // Slate 2026-09-05, page 2 (the marginal call, approved flagged). Scope:
  // payment RAILS for Australians. Law and site-blocking stay with
  // /country/australia/legal (frozen, untouched); operator ranking stays
  // with the /country/australia hub.
  'paypal-blocked-casino-australia': [
    { type: 'h2', text: 'The short answer' },
    { type: 'p', text: 'PayPal treats gambling as a restricted category: merchants need PayPal\'s prior approval to take gambling payments at all, and, as its acceptable use policy is consistently reported, no online casino serving Australians holds that approval. There is also nothing on the Australian side for PayPal to approve, because providing an online casino to people in Australia is itself prohibited under the Interactive Gambling Act, so no licensed Australian online casino exists to become a PayPal gambling merchant. The deposit does not fail because you did something wrong. It fails because both ends of the rail are closed.' },
    { type: 'h2', text: 'What the law actually blocks, and what it does not' },
    { type: 'p', text: 'The Interactive Gambling Act 2001 makes it an offence to PROVIDE an online casino to people in Australia; it does not penalise the individual playing at one. Separately, since June 2024, licensed Australian wagering operators cannot accept credit cards or cryptocurrency, but that payment ban covers licensed sports and race betting, not online casinos, which were already prohibited outright. The practical consequence for payments: the regulated Australian rails, PayPal included, do not connect to casino gambling at all, and offshore casinos that serve Australians work on rails outside that system.' },
    {
      type: 'plink',
      parts: [
        'The full legal position, including the operator-versus-player line and ACMA\'s site blocking, is on ',
        { text: 'our Australia crypto gambling law page', href: '/country/australia/legal' },
        ', which owns that analysis; this page owns the payment side only.',
      ],
    },
    { type: 'h2', text: 'What Australians actually run into' },
    { type: 'p', text: 'The common experiences are a casino cashier that simply never lists PayPal, a PayPal payment that is declined at the point of transfer, or a third-party processor that drops the transaction during review. Some offshore sites advertise e-wallet logos loosely, so the honest rule of thumb is that any casino serving Australians and claiming frictionless PayPal deposits deserves suspicion rather than excitement: the rail it is claiming does not officially connect.' },
    { type: 'h2', text: 'Where crypto fits, stated plainly' },
    { type: 'p', text: 'Crypto is the rail offshore casinos actually run on: an on-chain transfer needs no acquiring bank, no card scheme and no PayPal-style intermediary, which is precisely why the operators we review are crypto-first. That is a statement about how the plumbing works, not a recommendation to bypass anything: playing at an offshore casino remains unregulated for an Australian, with no local recourse if a withdrawal is frozen, and the safety trade-offs are real.' },
    {
      type: 'plink',
      parts: [
        'If you are weighing that trade seriously, ',
        { text: 'our guide to whether crypto is safe at Australian casinos', href: '/guides/is-crypto-safe-at-australian-casinos' },
        ' covers the actual risks, and ',
        { text: 'the Australia casino hub', href: '/country/australia' },
        ' carries the operator side.',
      ],
    },
    { type: 'h2', text: 'The one thing not to do' },
    { type: 'p', text: 'Workarounds that route PayPal money through gift cards, peer-to-peer transfers to strangers, or third-party top-up services add a counterparty you cannot pursue, usually violate the terms of every service in the chain, and are the classic shape of a scam aimed at exactly the person searching for this page. If a deposit path needs a stranger in the middle, the answer is no.' },
  ],
}

// FAQ data per guide. Only include questions actually answered in the guide content
// (per CLAUDE.md: don't generate FAQ schema with questions you didn't answer on the page).
const guideFAQs: Record<string, { question: string; answer: string }[]> = {
  'how-crypto-casino-withdrawals-work': [
    {
      question: 'How long should a crypto casino withdrawal take?',
      answer: 'On TRC-20 (Tron) or Solana, under 5 minutes end-to-end including the casino\'s internal processing. On Bitcoin, 10–60 minutes depending on network conditions. On Ethereum, 1–15 minutes for the chain itself but gas fees can spike. Anything longer than that points to KYC review, manual batch processing on the casino side, or a flagged transaction, not a blockchain issue.',
    },
    {
      question: 'Why is my casino withdrawal pending?',
      answer: 'The two most common causes are mid-process KYC verification (the casino is asking for ID or proof of address before releasing funds) and manual review for unusual activity. Network congestion on Bitcoin can also delay confirmation, though that\'s usually visible on the blockchain explorer rather than as a "pending" status in the casino UI. Light-KYC platforms like BitStarz, Cloudbet, Mirax and Shuffle reserve the right to trigger ID checks on larger withdrawals. BC.Game and 7Bit keep routine crypto play document-free up to a KYC check that is standard at EUR 2,000 equivalent, applied at the operator\'s discretion and capable of being triggered earlier; Duelbits publishes a no-KYC policy for crypto play.',
    },
    {
      question: 'Do I need KYC to withdraw crypto from an online casino?',
      answer: 'It depends on the operator and the amount. At BC.Game and 7Bit a KYC check is standard at EUR 2,000 equivalent, applied at the operator’s discretion and sometimes triggered earlier; below that, crypto withdrawals process without documents. Duelbits runs a no-KYC policy for crypto play. At Light-KYC casinos (BitStarz, Cloudbet, Mirax, Shuffle), routine withdrawals usually don\'t require KYC, but larger amounts or activity that flags compliance checks can trigger document requests. If KYC matters to you, the policy is documented in each casino\'s review.',
    },
    {
      question: 'Which network should I use for the fastest withdrawal?',
      answer: 'TRC-20 (Tron) for USDT, Solana for any SOL-native or Solana-bridged coin, or Polygon for MATIC and USDC on Polygon. All three confirm in under 30 seconds with fees below $0.01. Avoid Bitcoin and Ethereum mainnet for routine small withdrawals: both work, but you pay in either time or fees. Always verify the casino supports your chosen network before requesting the withdrawal.',
    },
    {
      question: 'What if I send a casino withdrawal to the wrong network?',
      answer: 'Funds are lost. Sending TRC-20 USDT to an ERC-20 address (or vice versa) results in tokens sitting at an address the receiving wallet can\'t read on that chain. Recovery is technically possible in narrow cases if the receiving wallet supports multiple chains and the network can be derived, but the realistic outcome is permanent loss. Always copy the deposit address from the matching network selector at the casino and confirm one or two characters before broadcasting.',
    },
  ],
  'best-crypto-for-gambling': [
    {
      question: 'What is the best cryptocurrency for online gambling in 2026?',
      answer: 'USDT on TRC-20 is the best default for most players: it is a USD-pegged stablecoin (so your bankroll value doesn\'t move between sessions), confirms in under 3 seconds on Tron, and costs under $0.01 per transaction. It is accepted at virtually every major crypto casino. Use SOL if your casino supports it and you want marginally faster finality; use BTC only if your specific casino doesn\'t support stablecoins or you deliberately want price exposure.',
    },
    {
      question: 'Why is USDT better than Bitcoin for gambling?',
      answer: 'Three reasons. Speed: TRC-20 USDT confirms in under 3 seconds; BTC takes 10–60 minutes depending on network conditions. Cost: USDT fees are consistently below $0.01; BTC fees fluctuate and can spike to $50+ during congestion. Stability: USDT is pegged 1:1 to USD, so a $500 deposit is still $500 when you withdraw; BTC value moves constantly. For active gambling, all three favour USDT unless you specifically want BTC price exposure.',
    },
    {
      question: 'Is Solana fast enough to replace USDT on TRC-20?',
      answer: 'Solana confirmations finalise in under a second with fees under $0.001, which is competitive with (and often faster than) TRC-20 USDT. The catch is casino acceptance: not every operator has added native SOL deposits and withdrawals yet, though the list grows each quarter. If your preferred casino supports SOL, it is a strong choice; if not, TRC-20 USDT remains the lower-friction option.',
    },
    {
      question: 'What about Ethereum, is it good for casino deposits?',
      answer: 'Ethereum is the second most widely accepted crypto at casinos, but it is the wrong choice for small or frequent transactions. Gas fees range from a few dollars at quiet times to $5–30 during congestion. For larger, infrequent withdrawals it is workable; for routine deposits and small withdrawals, the fee structure becomes meaningful. If TRC-20 USDT or Solana is available, prefer those.',
    },
    {
      question: 'Do any casinos accept Monero (XMR)?',
      answer: 'Monero support at general-market crypto casinos is rare and varies by operator. XMR is the only cryptocurrency with native protocol-level transaction privacy, so it has appeal for privacy-first players, but the list of operators accepting it is narrow and changes more often than other coin listings. Verify on the casino\'s current cashier page if privacy is your decisive factor.',
    },
  ],
  'how-casino-bonuses-really-work': [
    {
      question: 'What is a wagering requirement and why does it matter?',
      answer: 'A wagering requirement (also called playthrough) specifies how many times you must bet through the bonus amount before the bonus converts to withdrawable cash. A $500 bonus at 30x means $15,000 in total bets. Statistically, wagering $15,000 on a 96% RTP slot library implies around $600 in expected losses, more than the bonus value itself in many cases. Wagering under 20x can offer real value; over 40x rarely does; over 60x should be declined entirely.',
    },
    {
      question: 'Why do different games contribute different amounts to wagering?',
      answer: 'Casinos use contribution percentages to steer players toward higher-house-edge games. Slots contribute 100%: $1 bet = $1 toward wagering. Blackjack, roulette, baccarat usually contribute 5–10%. Live dealer often contributes 0–10%. If you primarily play table games, a 30x wagering requirement effectively becomes 300x+ for your preferred game type. Always check the contribution table before accepting a bonus if you don\'t play slots.',
    },
    {
      question: 'Is a 300% bonus always better than a 100% bonus?',
      answer: 'No. A 300% bonus with 50x wagering and a $200 max-win cap is typically worth far less than a 100% bonus with 25x wagering and no cap. The headline percentage is the most marketed number and the least relevant for real expected value. Calculate the wagering requirement in dollars, factor in your game contribution percentage, and check whether a max-win cap applies before comparing offers.',
    },
    {
      question: 'Should I take the welcome bonus or decline it?',
      answer: 'Decline if: the wagering requirement exceeds 40x; the time limit is too short for your normal play volume; there\'s a low max-win cap relative to the bonus; or the bonus excludes your preferred game type. For active players who plan to wager the requirement anyway on slots, a 20–30x match bonus with no game restrictions is often worth taking. For players who plan to deposit, play briefly, and withdraw quickly, the bonus becomes a withdrawal restriction, usually better declined.',
    },
    {
      question: 'Do all casino bonuses have a maximum win cap?',
      answer: 'No. Smaller welcome bonuses and free-spin offers commonly include a max-win cap (often $200–$500). Larger match bonuses at reputable platforms typically don\'t cap winnings, or set the cap at a reasonable multiple of the deposit (5x or 10x). Cashback offers and rakeback rewards almost never have caps. Always read the maximum withdrawal clause in the bonus terms before depositing: a $5,000 win on a $500 bonus is worth $200 with a $200 cap.',
    },
  ],
  'bitcoin-vs-usdt-casinos': [
    {
      question: 'Is USDT better than Bitcoin for online casinos?',
      answer: 'For most players, yes. USDT on TRC-20 is faster (under 3 seconds vs 10–60 minutes), cheaper (under $0.01 vs unpredictable), and more stable (1:1 USD peg vs market volatility). Bitcoin makes sense only if you already hold BTC and prefer not to convert, or if you actively want price exposure alongside your gaming. For players acquiring crypto specifically to gamble, USDT on TRC-20 is the better default.',
    },
    {
      question: 'What is TRC-20 USDT and why does it matter?',
      answer: 'USDT exists on multiple blockchains. TRC-20 is the version on the Tron network: confirms in under 3 seconds with fees under $0.01. ERC-20 is the version on Ethereum: 15–30 seconds per block but gas fees that can be $5–$30. Same token, very different transaction characteristics. Always select TRC-20 at the casino cashier when available; sending TRC-20 USDT to an ERC-20 address results in lost funds.',
    },
    {
      question: 'Can I switch between BTC and USDT at the same casino?',
      answer: 'Yes, at every major crypto casino. The eight platforms we review (BitStarz, BC.Game, Cloudbet, Mirax, 7Bit, Shuffle, Duelbits, Roobet) all support both BTC and USDT for deposits and withdrawals. Most maintain separate balance ledgers per coin, so you can fund the account with BTC, play, withdraw to USDT, or any other combination. Welcome bonuses are usually denominated equivalently across coins.',
    },
    {
      question: 'Is USDT safe given Tether\'s reserves history?',
      answer: 'USDT carries counterparty risk that BTC doesn\'t: Tether Limited must maintain sufficient reserves to back each token, and the reserves question has been scrutinised extensively over the years. Tether has continued operating without incident through multiple market cycles. The structural risk exists; in practice, USDT has functioned as expected for crypto-native users. If counterparty risk is your decisive factor, USDC (issued by Circle, audited monthly) is the more transparent stablecoin alternative.',
    },
    {
      question: 'Are there casinos that only accept Bitcoin?',
      answer: 'Some smaller and older Bitcoin-specialist casinos do, but among the platforms we review at PlayMagpie, all eight accept multiple coins including both BTC and USDT. BTC-only acceptance has become rare among credible operators since 2022: stablecoin support is now table-stakes for any new launch. If you find a casino that accepts only Bitcoin, that\'s a credibility signal worth weighing.',
    },
  ],
  'do-crypto-casinos-require-kyc': [
    {
      question: 'Do all crypto casinos require KYC?',
      answer: 'No. Unlike licensed fiat casinos, crypto casinos set their own KYC policy rather than verifying every player by regulatory mandate. Of the eight casinos we review, three (BC.Game, 7Bit Casino and Duelbits) keep routine crypto play document-free, with BC.Game and 7Bit running a KYC check as standard at EUR 2,000 equivalent, applied at their discretion and capable of being triggered earlier. Four run Light KYC that only triggers on larger or fiat-side activity, and one (Roobet) applies Standard KYC. Whether you need to verify depends on which operator you choose and on the size of your cash-out.',
    },
    {
      question: 'Which crypto casinos don’t require KYC?',
      answer: 'Among the casinos we review, BC.Game, 7Bit Casino and Duelbits keep routine crypto play document-free. At BC.Game and 7Bit a KYC check is standard at EUR 2,000 equivalent, applied at the operator’s discretion and sometimes triggered earlier. Below those thresholds no government ID or proof of address is required to deposit, play or withdraw under the standard flow. BC.Game holds the highest KYC score in our catalogue (9.5/10) on the strength of an email-only signup and a document-free range that runs up to that threshold. Compliance at these operators is handled through transaction monitoring rather than up-front document collection.',
    },
    {
      question: 'What triggers a KYC check at a crypto casino?',
      answer: 'At Light-KYC operators, two things flip verification from exception to requirement: fiat-side activity (any deposit or withdrawal touching regulated banking rails makes identity verification mandatory) and an outsized or flagged crypto withdrawal (a large cash-out, or unusual account behaviour, can route a payout into manual review). At no-KYC operators, routine play triggers nothing. At Standard-KYC operators like Roobet, verification can re-trigger on large wins even for previously-transacting accounts.',
    },
    {
      question: 'What documents do crypto casinos ask for during KYC?',
      answer: 'The standard set is a government-issued photo ID (passport, national ID or driving licence), a proof of address dated within the last few months (utility bill or bank statement), and (only if you used a card or fiat rail) proof of that payment method. At genuinely large withdrawal amounts, source-of-funds documentation can be requested, which is normal for high-value crypto cash-outs anywhere. Turnaround is typically same-day to a couple of days once submitted correctly.',
    },
    {
      question: 'Is it safe to use a no-KYC casino?',
      answer: 'A document-free range means no routine document collection, not no compliance: these operators manage risk through on-chain transaction monitoring instead of identity files. The real trade-off is regulatory: a casino that collects documents only above a threshold almost always operates under a Curaçao licence rather than a Tier-1 regulator (UKGC, MGA), which means lighter oversight and a weaker formal recourse path if a dispute escalates. For privacy-first players the no-document model is the appeal; players who weight regulatory protection more heavily should accept Light KYC as the cost of it.',
    },
  ],
  // Each FAQ below maps to a section actually answered in the body above
  // (CLAUDE.md: no FAQ schema for questions the page does not answer).
  'why-is-my-crypto-casino-withdrawal-pending': [
    {
      question: 'How long should a crypto casino withdrawal stay pending before I worry?',
      answer:
        'Use the operator’s own published window plus one processing cycle as the threshold. Among the casinos we review, published crypto payout times run from instant to five minutes at Duelbits, under ten minutes at BitStarz, instant to ten at BC.Game, 7Bit and Shuffle, instant to fifteen at Mirax, and instant to 24 hours at Cloudbet. Roobet publishes around fifteen minutes for most crypto but up to 24 hours for Bitcoin. Anything inside those windows is behaving normally; past them, contact support.',
    },
    {
      question: 'Why does my withdrawal show as pending with no transaction ID?',
      answer:
        'Because it has not been broadcast to the blockchain yet, which means the funds are still with the casino. A transaction ID is created at the moment the payout is sent on-chain, not when you request it, so an absent TXID tells you the delay is internal: batched or manually reviewed processing, a verification check raised after you clicked withdraw, an unfinished bonus locking the balance, a daily or minimum limit, or a security review triggered by a new withdrawal address or device. This is the one state where contacting support is genuinely useful.',
    },
    {
      question: 'My transaction is confirmed on the blockchain but not in my wallet. Where is it?',
      answer:
        'If the explorer shows confirmations, the transfer completed and the issue is at the receiving end. The four usual causes are a token your wallet holds but does not display until you add its contract, an exchange deposit that needs more confirmations before crediting, an omitted memo or destination tag that some exchanges require to route funds to your account, or a send on a network the receiving address does not support. The last case is serious: cross-chain mismatches are usually unrecoverable, so act immediately rather than waiting.',
    },
    {
      question: 'Can an unfinished bonus stop my withdrawal from processing?',
      answer:
        'Yes. If you accepted an offer and have not met its wagering requirement, some or all of your balance may not be withdrawable yet, and some platforms present that as a pending withdrawal rather than a clear refusal. Check whether the cashier separates real balance from bonus balance. Requesting a withdrawal while a bonus is active can also forfeit the bonus and any winnings derived from it, so read the offer terms before cancelling anything.',
    },
    {
      question: 'Does identity verification hold up a withdrawal that is already in progress?',
      answer:
        'It can, and a document request raised after you hit withdraw is the delay cause most likely to run into days rather than hours. How exposed you are depends on the operator’s posture. Cloudbet’s model is documented from its own help centre: accounts are capped at $2,200 a day until Level 2 verification is complete, and uncapped afterwards. Roobet applies the strictest verification posture in our catalogue. Several operators publish no-KYC policies for routine crypto play; we are re-verifying two of those against their live terms and treat the published wording as the operator’s claim until that is done.',
    },
  ],
  // Each FAQ maps to a section actually answered in the body above.
  'large-crypto-casino-withdrawals': [
    {
      question: 'At what amount does a crypto casino start asking questions?',
      answer:
        'Lower than most players expect. The lowest documented verification trigger across the casinos we review is EUR 2,000 equivalent, which is the point where BC.Game and 7Bit Casino run a KYC check as standard, applied at the operator’s discretion and capable of being triggered earlier. The lowest daily withdrawal ceiling is Cloudbet’s $2,200, which applies until Level 2 verification is complete. We do not publish a trigger figure for the other operators in our catalogue because we have not verified one, and an invented number would be worse than the gap.',
    },
    {
      question: 'Is a daily withdrawal limit the same as a blocked withdrawal?',
      answer:
        'No, and confusing the two causes a lot of unnecessary alarm. A cap meters the payout: the balance remains yours and pays out across consecutive daily requests until it is gone. The cost is time, not risk. A hold is different because it is a judgement with no published end date. Cloudbet’s $2,200 a day before Level 2 verification is a cap, and it is one you can remove in advance by completing verification rather than negotiating it afterwards.',
    },
    {
      question: 'Can I avoid verification by splitting a large withdrawal into smaller ones?',
      answer:
        'It is the obvious workaround and it is a bad one. Operator terms generally prohibit structuring withdrawals to stay under a verification threshold, so it converts a routine document request into a suspicion about your account, which is a much worse position to be in. It also tends not to work, because thresholds are commonly assessed cumulatively rather than per transaction. Completing verification while your balance is ordinary achieves the same goal legitimately.',
    },
    {
      question: 'Do crypto casinos charge a fee on large withdrawals?',
      answer:
        'Size does not by itself introduce a fee, despite the common assumption that it does. The live BitStarz terms record no fees on deposits or withdrawals at all, at any amount. That is one operator rather than a general rule. Where fees do exist elsewhere they are usually attached to the payment rail or to how frequently you cash out, rather than to the size of a single payout.',
    },
    {
      question: 'When does a slow large withdrawal stop being normal?',
      answer:
        'When the requirements appear only after the win. Verification that was never mentioned while you were depositing, arriving the week you cash out something substantial, is a different signal from a check applied consistently at a published threshold, and so is a stated reason that changes each time you ask. Ordinary process is consistent across players and amounts and has an end date somebody will commit to. Roobet is the case where the public record is heaviest: AskGamblers carries complaints at roughly $20,000 to $115,000 involving multi-day holds, with one $84,000 case listed as unsolved.',
    },
  ],
  // Each FAQ maps to a section actually answered in the body above.
  'crypto-casino-verification-process': [
    {
      question: 'How long does crypto casino verification take?',
      answer:
        'No operator we can verify publishes a turnaround figure, and we will not invent one. What determines the wait is observable: how many stages your check involves (identity and address checks are usually template-matched; source-of-funds review is human judgement and always slower), whether your documents pass first time, and whether the request landed before or during a withdrawal. The documented tail risk is days rather than hours on large cashouts, which is why completing verification before you need a payout is the single most useful move this page recommends.',
    },
    {
      question: 'Can I withdraw while my verification is under review?',
      answer:
        'Expect the cashier to be gated. Cloudbet states it directly in its help centre: if you have submitted verification documents and are waiting for approval, your withdrawal limits remain restricted until the review is complete. Terms elsewhere commonly allow pending withdrawal requests to be rejected and consolidated into one (Roobet clause 10.3), so stacking new requests on top of a gated one achieves nothing. Deposits usually continue to work during a review.',
    },
    {
      question: 'Why was I asked to verify again after years on the same account?',
      answer:
        'Because most terms permit exactly that. Roobet clause 4.9 is the explicit version: KYC can be demanded at any time, with deposit and withdrawal functions restricted until it completes, and account age grants no exemption. The documented pattern across public complaint records is re-verification triggering at the moment of a large cashout, which is the moment the operator re-scores its own risk.',
    },
    {
      question: 'What actually gets a withdrawal refused during verification?',
      answer:
        'The one operator that publishes named refusal grounds is Roobet, and its four (terms clause 10.5) are the categories to self-check anywhere: identity not verified, the payment method or wallet not confirmed as the account holder’s, an outstanding information request sitting unanswered, and the minimum wager not met. Beyond those, enhanced due diligence clauses (Roobet 10.4) allow delay or refusal with the operator able to decline to explain the investigation.',
    },
    {
      question: 'Do all crypto casinos run this process?',
      answer:
        'No. Postures range from document-free routine play up to a threshold (BC.Game and 7Bit run a KYC check as standard at EUR 2,000 equivalent, at operator discretion and sometimes earlier) through Light KYC to Standard. Which operators verify at all, and what they ask for, is covered in our guide to whether crypto casinos require KYC; this page covers what happens once a check actually triggers.',
    },
  ],
  'is-crypto-safe-at-australian-casinos': [
    {
      question: 'Is the crypto itself the risky part for Australian players?',
      answer:
        'No. On-chain deposits and withdrawals work identically from Australia as from anywhere else. The genuine risks are around the coin, not in it: an operator whose terms exclude Australia, the custody gap while your balance sits with an offshore operator, and the funding-side tax mechanics. Rank your attention in that order.',
    },
    {
      question: 'Can a casino close my account for playing from Australia?',
      answer:
        'If its terms restrict Australia, yes, and it does not have to warn you first. The verified example: Roobet lists Australia in its restricted territories (terms clause 3.5), with restricted-territory accounts exposed to closure and fund forfeiture under clause 6.4. An operator accepting your deposit is not confirmation you were allowed to make it. Read the restricted-territories clause of any operator before funding; it is a two-minute check that removes the largest avoidable risk on this page.',
    },
    {
      question: 'Is it legal to use a crypto casino from Australia?',
      answer:
        'That is a different question from safety, and it has its own page: our guide to whether crypto gambling is legal in Australia covers the Interactive Gambling Act, the blocking regime and the 2026 reform bill. This page deliberately makes no legality claims.',
    },
    {
      question: 'Do I pay tax on crypto casino winnings in Australia?',
      answer:
        'The trap is on the funding side rather than the winning side. The ATO treats crypto as a CGT asset, so disposing of an appreciated coin to fund a deposit can itself be a taxable event, while casual gambling winnings are generally not assessable income for individuals. General information rather than tax advice: the numbers depend on your cost basis, and a professional should confirm your position.',
    },
    {
      question: 'What is the safest way to fund a crypto casino from Australia?',
      answer:
        'Buy on an AUSTRAC-registered exchange (CoinSpot, Independent Reserve and Swyftx are the majors), send on-chain to the casino, play with what you sent, and withdraw winnings back to a wallet you control rather than leaving a balance on the site. Consumer protection in this chain lives at the regulated exchange, not at the offshore operator, so keep the unprotected leg as short as the session allows.',
    },
  ],
  'crypto-casino-withdrawal-txid': [
    {
      question: 'Where do I find my casino withdrawal TXID?',
      answer: 'In the casino cashier, under withdrawal or transaction history: open the entry for your payout and the TXID (transaction hash) is shown there, sometimes behind a details control. It is created when the casino broadcasts the payment, not when you request it, so an empty TXID field means nothing has been sent yet.',
    },
    {
      question: 'What does it mean if the explorer cannot find my TXID?',
      answer: 'Either the TXID was copied incompletely, you are looking on the wrong network, or the transaction was never actually broadcast. Re-copy the full string and confirm the network shown in the cashier. If a correct TXID on the correct network still returns nothing, the withdrawal has not left the casino, whatever the cashier status says.',
    },
    {
      question: 'My withdrawal is confirmed on-chain but not in my wallet. Who do I contact?',
      answer: 'The receiving side, with the TXID attached. If the explorer shows the funds confirmed at your correct address, the casino has done its part; the usual causes are a missing memo or tag at an exchange, a token not yet added to your wallet display, or a network mismatch. The receiving platform\'s support resolves those, and the TXID is exactly the evidence they ask for.',
    },
    {
      question: 'Can a casino or anyone speed up a transaction that is already on-chain?',
      answer: 'Generally no. Once broadcast, the transaction confirms at the pace of the network: Bitcoin averages a block roughly every ten minutes, while Tron and Solana usually settle in seconds to low minutes. A payment stuck at zero confirmations for a long period is rare and chain-specific; the practical answer is that neither you nor casino support can hurry the chain, which is also why a confirmed TXID is such a clean proof of payment.',
    },
  ],
  'paypal-blocked-casino-australia': [
    {
      question: 'Why will PayPal not work at any online casino in Australia?',
      answer: 'Two closed doors at once. PayPal treats gambling as a restricted category needing its prior merchant approval, and no online casino serving Australians is reported to hold that approval; separately, providing an online casino to people in Australia is prohibited under the Interactive Gambling Act, so there is no licensed Australian online casino that could become an approved PayPal merchant in the first place.',
    },
    {
      question: 'Is it illegal for me to try to deposit at an offshore casino from Australia?',
      answer: 'The Interactive Gambling Act targets the operator, not the player: there is no offence for the individual Australian playing at an offshore casino. What you give up is regulation and recourse, because an offshore site sits outside every Australian consumer-protection mechanism. The full legal position is on our Australia legality page.',
    },
    {
      question: 'Did the 2024 payment ban block casino deposits?',
      answer: 'No. The June 2024 ban stops licensed Australian wagering operators (sports and race betting) from accepting credit cards and cryptocurrency. Online casinos were not part of it because providing them to Australians was already prohibited outright. The rail you cannot use at a licensed bookmaker and the casino rail that never existed are two different closures.',
    },
    {
      question: 'Should I use a workaround service to deposit with PayPal money?',
      answer: 'No. Routing money through gift cards, peer-to-peer transfers or third-party top-up middlemen inserts a counterparty you cannot pursue, breaches the terms of the services involved, and is the classic shape of scams aimed at people searching for exactly this. If a deposit path requires a stranger in the middle, treat the answer as no.',
    },
  ],
}

// Per-guide intent-page links. Pairs with the worked examples, pointing readers
// from informational content back to commercial intent pages where appropriate.
const guideRelatedPages: Record<string, { label: string; href: string; teaser: string }[]> = {
  'how-crypto-casino-withdrawals-work': [
    { label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos', teaser: 'Ranked purely on payout speed' },
    { label: 'High Roller Casinos: Withdrawal Limits', href: '/high-roller-casinos#withdrawal-limits', teaser: 'Cap-free cash-out for big wins' },
    { label: 'No-KYC Casinos', href: '/no-kyc-casinos', teaser: 'Withdrawals without ID verification' },
  ],
  'best-crypto-for-gambling': [
    { label: 'Bitcoin vs USDT: head-to-head', href: '/guides/bitcoin-vs-usdt-casinos', teaser: 'The two-coin focused comparison' },
    { label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos', teaser: 'Where coin choice converts to speed' },
    { label: 'Best BNB Crypto Casinos', href: '/bnb-crypto-casinos', teaser: 'The five operators that accept BNB on Smart Chain' },
    { label: 'Best Crypto Casinos', href: '/best-crypto-casinos', teaser: 'Full rankings across all categories' },
  ],
  'how-casino-bonuses-really-work': [
    { label: 'High Roller Casinos', href: '/high-roller-casinos', teaser: 'Where VIP cashback beats welcome-bonus math' },
    { label: 'High Roller Casinos: Withdrawal Limits', href: '/high-roller-casinos#withdrawal-limits', teaser: 'Cap-free cash-out when bonus play wins big' },
    { label: 'Mirax Casino Review', href: '/reviews/mirax-casino', teaser: 'The 4-deposit / 5 BTC / 150 FS welcome structure in detail' },
  ],
  'bitcoin-vs-usdt-casinos': [
    { label: 'Best Crypto for Gambling', href: '/guides/best-crypto-for-gambling', teaser: 'The broader guide across all major coins' },
    { label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos', teaser: 'Where coin choice converts to speed' },
    { label: 'High Roller Casinos: Withdrawal Limits', href: '/high-roller-casinos#withdrawal-limits', teaser: 'For when USDT-fast meets a big win' },
  ],
  'do-crypto-casinos-require-kyc': [
    { label: 'BC.Game KYC', href: '/reviews/bc-game/kyc', teaser: 'Email-only signup, with a check at EUR 2,000 equivalent' },
    { label: 'BitStarz KYC', href: '/reviews/bitstarz/kyc', teaser: 'Light KYC: what actually triggers verification' },
    { label: 'Cloudbet KYC', href: '/reviews/cloudbet/kyc', teaser: 'No limits, verification only at scale' },
    { label: 'Bonus & Withdrawal Transparency Report', href: '/research/crypto-casino-bonus-transparency', teaser: 'Headline offers vs the real cashout terms, all 8 sourced' },
  ],
  'why-is-my-crypto-casino-withdrawal-pending': [
    { label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos', teaser: 'The success path, and the speed ranking behind these windows' },
    { label: 'Do Crypto Casinos Require KYC?', href: '/guides/do-crypto-casinos-require-kyc', teaser: 'Which operators ask for documents, and when' },
    { label: 'Best Crypto for Gambling', href: '/guides/best-crypto-for-gambling', teaser: 'Pick a rail that never reaches the mempool queue' },
    { label: 'How We Review', href: '/methodology', teaser: 'The sourcing standard behind the complaint-record findings' },
    { label: 'Large Crypto Casino Withdrawals', href: '/guides/large-crypto-casino-withdrawals', teaser: 'When the delay is about the size of the win, not the state of the payout' },
  ],
  'large-crypto-casino-withdrawals': [
    { label: 'High Roller Casinos: Withdrawal Limits', href: '/high-roller-casinos#withdrawal-limits', teaser: 'The catalogue ranked on documented limits and cap-free cash-out' },
    { label: 'Why Is My Crypto Casino Withdrawal Pending?', href: '/guides/why-is-my-crypto-casino-withdrawal-pending', teaser: 'The other diagnostic: where a stuck payout actually is' },
    { label: 'Cloudbet KYC', href: '/reviews/cloudbet/kyc', teaser: 'The $2,200 daily cap and what Level 2 verification removes' },
    { label: 'Bonus & Withdrawal Transparency Report', href: '/research/crypto-casino-bonus-transparency', teaser: 'Sourced cashout terms, and our published correction record' },
  ],
  'crypto-casino-verification-process': [
    { label: 'Do Crypto Casinos Require KYC?', href: '/guides/do-crypto-casinos-require-kyc', teaser: 'Policy and who: which operators verify, and what they ask for' },
    { label: 'Large Crypto Casino Withdrawals', href: '/guides/large-crypto-casino-withdrawals', teaser: 'The money side: caps, thresholds and what a big win triggers' },
    { label: 'Why Is My Crypto Casino Withdrawal Pending?', href: '/guides/why-is-my-crypto-casino-withdrawal-pending', teaser: 'Already stuck? Split a compliance hold from a network delay' },
    { label: 'Cloudbet KYC', href: '/reviews/cloudbet/kyc', teaser: 'The published two-level model this page sources' },
    { label: 'Roobet Withdrawal', href: '/reviews/roobet/withdrawal', teaser: 'The clause-level cashier terms behind the refusal grounds' },
  ],
  'is-crypto-safe-at-australian-casinos': [
    { label: 'Is Crypto Gambling Legal in Australia?', href: '/country/australia/legal', teaser: 'The legality question this page deliberately does not answer' },
    { label: 'Crypto Casinos in Australia', href: '/country/australia', teaser: 'The market picture: frictions, on-ramps and operator fit' },
    { label: 'Why Is My Crypto Casino Withdrawal Pending?', href: '/guides/why-is-my-crypto-casino-withdrawal-pending', teaser: 'The diagnostic for a stalled payout' },
    { label: 'Roobet Review', href: '/reviews/roobet', teaser: 'The operator whose terms restrict Australia by name' },
  ],
  'crypto-casino-withdrawal-txid': [
    { label: 'Why Is My Crypto Casino Withdrawal Pending?', href: '/guides/why-is-my-crypto-casino-withdrawal-pending', teaser: 'The casino-side half: the three states and what resolves each' },
    { label: 'Fast Withdrawal Casinos', href: '/fast-withdrawal-casinos', teaser: 'Operators ranked on published payout windows' },
    { label: 'Best Crypto for Gambling', href: '/guides/best-crypto-for-gambling', teaser: 'Why the network you withdraw on decides how long you wait' },
  ],
  'paypal-blocked-casino-australia': [
    { label: 'Is Crypto Gambling Legal in Australia?', href: '/country/australia/legal', teaser: 'The law side this page deliberately points to rather than restates' },
    { label: 'Is Crypto Safe at Australian Casinos?', href: '/guides/is-crypto-safe-at-australian-casinos', teaser: 'The honest risk trade if you are considering the crypto rail' },
    { label: 'Crypto Casinos in Australia', href: '/country/australia', teaser: 'The operator side: who serves Australians and on what terms' },
  ],
}

const relatedCasinos: Record<string, { name: string; slug: string; reason: string }[]> = {
  'how-crypto-casino-withdrawals-work': [
    { name: 'BC.Game', slug: 'bc-game', reason: 'Instant withdrawals, 100+ cryptos' },
    { name: '7Bit Casino', slug: '7bit-casino', reason: 'Instant to 10-min payouts, no KYC' },
    { name: 'BitStarz', slug: 'bitstarz', reason: 'Under 10-min withdrawal guarantee' },
  ],
  'best-crypto-for-gambling': [
    { name: 'BC.Game', slug: 'bc-game', reason: '100+ cryptocurrencies supported' },
    { name: 'Cloudbet', slug: 'cloudbet', reason: 'BTC, ETH, USDT, SOL, BNB and more' },
    { name: '7Bit Casino', slug: '7bit-casino', reason: 'Wide crypto support, no KYC required' },
  ],
  'how-casino-bonuses-really-work': [
    { name: 'Mirax Casino', slug: 'mirax-casino', reason: 'Up to 5 BTC + 150 spins across 4 deposits' },
    { name: 'BitStarz', slug: 'bitstarz', reason: '5 BTC + 180 free spins package' },
    { name: 'Cloudbet', slug: 'cloudbet', reason: '$2,500 package: cash rewards, no wagering' },
  ],
  'bitcoin-vs-usdt-casinos': [
    { name: 'BitStarz', slug: 'bitstarz', reason: 'BTC, USDT and 4 more cryptos' },
    { name: 'BC.Game', slug: 'bc-game', reason: 'BTC, USDT and 100+ more options' },
    { name: 'Cloudbet', slug: 'cloudbet', reason: 'BTC, USDT, SOL and 7 more cryptos' },
  ],
  'do-crypto-casinos-require-kyc': [
    { name: 'BC.Game', slug: 'bc-game', reason: 'Document-free below EUR 2,000; highest KYC score (9.5/10)' },
    { name: '7Bit Casino', slug: '7bit-casino', reason: 'Operating since 2014; check at EUR 2,000 equivalent' },
    { name: 'BitStarz', slug: 'bitstarz', reason: 'Light KYC: rarely triggered on crypto-only play' },
  ],
  'why-is-my-crypto-casino-withdrawal-pending': [
    { name: 'Duelbits', slug: 'duelbits', reason: 'Publishes instant to 5-minute crypto payouts' },
    { name: 'Cloudbet', slug: 'cloudbet', reason: 'Tiered limits: $2,200/day before Level 2 verification' },
    { name: 'Roobet', slug: 'roobet', reason: 'The documented-holds case: multi-day verification holds on record' },
  ],
  // Roobet is deliberately NOT in this strip. The page's holds section is about
  // its complaint record, and pairing that argument with an affiliate card for
  // the same operator on the same page is not a trade this site makes.
  'large-crypto-casino-withdrawals': [
    { name: 'Cloudbet', slug: 'cloudbet', reason: 'No withdrawal limit at all once Level 2 verification completes' },
    { name: 'BC.Game', slug: 'bc-game', reason: 'Document-free routine play, with a check standard at EUR 2,000' },
    { name: 'BitStarz', slug: 'bitstarz', reason: 'Live terms record no deposit or withdrawal fees at any size' },
  ],
  // Roobet deliberately absent (its clauses are cited as the refusal-grounds
  // example; the large-withdrawals precedent applies).
  'crypto-casino-verification-process': [
    { name: 'Cloudbet', slug: 'cloudbet', reason: 'The published two-level model: $2,200/day until Level 2, no limits after' },
    { name: 'BC.Game', slug: 'bc-game', reason: 'Document-free routine play below the EUR 2,000-equivalent check' },
    { name: 'BitStarz', slug: 'bitstarz', reason: 'Light KYC, and a fee-free cashier per its live terms' },
  ],
  // 'is-crypto-safe-at-australian-casinos' deliberately has NO casino strip:
  // Roobet's terms restrict Australia (s3.5) and the other operators' AU
  // postures are unverified (ISO-list provenance gap), so an affiliate strip
  // on this page would recommend operators the page cannot vouch AU access
  // for. The route's ?? [] fallback renders nothing.
}

export default async function GuidePage(props: PageProps<'/guides/[slug]'>) {
  const { slug } = await props.params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  const blocks: ContentBlock[] = guideContent[slug] ?? [{ type: 'p', text: guide.description }]
  const related = relatedCasinos[slug] ?? []
  const relatedPages = guideRelatedPages[slug] ?? []
  const faqs = guideFAQs[slug] ?? []

  const guideUrl = `https://www.playmagpie.com/guides/${guide.slug}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.playmagpie.com/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: guideUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
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
    datePublished: guide.published,
    dateModified: guide.modified,
    url: guideUrl,
    mainEntityOfPage: guideUrl,
  }

  const faqSchema = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">{guide.title}</span>
        </nav>

        <div className="mb-2">
          <span className="text-xs text-[#7BB8D4] font-semibold uppercase tracking-widest">{guide.category}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">{guide.h1 ?? guide.title}</h1>
        <div className="flex items-center gap-3 text-sm text-[#888888] mb-10">
          <span>{guide.readTime}</span>
          <span>·</span>
          <span>Updated {guide.updated}</span>
        </div>

        <div className="space-y-5 mb-12">
          {blocks.map((block, i) =>
            block.type === 'h2' ? (
              <h2 key={i} className="text-xl font-bold text-[#f5f5f5] mt-8 mb-2 first:mt-0">
                {block.text}
              </h2>
            ) : block.type === 'h3' ? (
              <h3 key={i} className="text-base font-bold text-[#f5f5f5] mt-6 mb-2">
                {block.text}
              </h3>
            ) : block.type === 'matrix' ? (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4 not-prose">
                {block.items.map((item, idx) => (
                  <div key={idx} className="bg-[#111111] border border-[#222222] rounded-2xl p-5">
                    <div className="text-[#7BB8D4] text-xs font-bold uppercase tracking-widest mb-2">
                      If your priority is
                    </div>
                    <h3 className="text-white font-semibold mb-3 text-base">{item.priority}</h3>
                    <div className="text-[#7BB8D4] text-sm font-semibold mb-2">→ {item.recommendation}</div>
                    <p className="text-[#888888] text-sm leading-relaxed">{item.rationale}</p>
                  </div>
                ))}
              </div>
            ) : block.type === 'kycposture' ? (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4 not-prose">
                {block.items.map((item, idx) => {
                  const casino = casinos.find((c) => c.slug === item.slug)
                  if (!casino) return null
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-5 transition-all group block"
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className="text-white font-semibold text-base group-hover:text-[#7BB8D4] transition-colors">
                          {casino.name}
                        </h3>
                        <span className="text-[#7BB8D4] text-sm font-bold shrink-0">{casino.kycScore}/10</span>
                      </div>
                      <div className="text-[#7BB8D4] text-xs font-bold uppercase tracking-widest mb-2">
                        KYC: {kycDisplayLabel(casino)}
                      </div>
                      <p className="text-[#888888] text-sm leading-relaxed">{item.note}</p>
                    </Link>
                  )
                })}
              </div>
            ) : block.type === 'txidlookup' ? (
              <TxidLookup key={i} />
            ) : block.type === 'plink' ? (
              <p key={i} className="text-[#888888] leading-relaxed">
                {block.parts.map((part, idx) =>
                  typeof part === 'string' ? (
                    <span key={idx}>{part}</span>
                  ) : (
                    <Link key={idx} href={part.href} className="text-[#7BB8D4] hover:underline">
                      {part.text}
                    </Link>
                  )
                )}
              </p>
            ) : (
              <p key={i} className="text-[#888888] leading-relaxed">
                {block.text}
              </p>
            )
          )}
        </div>

        <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="text-[#f5f5f5] font-bold mb-1">Ready to find your casino?</div>
            <div className="text-[#888888] text-sm">Top-rated crypto platforms, ranked by real withdrawal times.</div>
          </div>
          <CTAButton href="/best-crypto-casinos" label="View Top Casinos" variant="primary" size="md" />
        </div>

        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Related Casino Reviews</h2>
            <p className="text-[#888888] text-sm mb-4">
              Based on this guide, here are the most relevant casino reviews to read next:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/reviews/${c.slug}`}
                  className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-4 transition-all group"
                >
                  <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors mb-1 text-sm">
                    {c.name} Review
                  </div>
                  <div className="text-[#888888] text-xs">{c.reason}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedPages.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Where to read next</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="bg-[#111111] border border-[#222222] hover:border-[#7BB8D4]/30 rounded-2xl p-4 transition-all group"
                >
                  <div className="font-semibold text-[#f5f5f5] group-hover:text-[#7BB8D4] transition-colors mb-1 text-sm">
                    {p.label}
                  </div>
                  <div className="text-[#888888] text-xs">{p.teaser}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="mb-10 pt-8 border-t border-[#222222]">
            <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-[#888888] text-sm mb-6">
              Common questions on {guide.title.toLowerCase()}.
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

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link href="/guides" className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all guides
          </Link>
        </div>
      </div>
    </>
  )
}
