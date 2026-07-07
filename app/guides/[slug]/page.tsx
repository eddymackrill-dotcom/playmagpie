import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { guides } from '@/lib/guides'
import { casinos } from '@/lib/casinos'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'

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
    { type: 'p', text: 'The cryptocurrency you use at an online casino affects four things directly: how fast your deposits and withdrawals clear, how much you pay in network fees, how stable your bankroll is in dollar terms, and how much privacy you retain. Most players default to Bitcoin out of familiarity, but for most gambling use cases it is not the optimal choice. For the focused head-to-head on the two most-used coins, see our Bitcoin vs USDT comparison.' },
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
          rationale: 'Sub-second to 3-second on-chain finality with fees under $0.01 on both. Functionally instant if the casino\'s internal processing is automated. TRC-20 is universally accepted; SOL is added at BC.Game, Cloudbet, Shuffle and Duelbits per the casinos we review.',
        },
        {
          priority: 'Anonymity (no-KYC at any size)',
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
    { type: 'p', text: 'A 200% deposit bonus up to $2,000 sounds straightforward: deposit $1,000, receive $2,000 extra, play with $3,000 total. In practice, the bonus terms determine whether that extra $2,000 has any real value or is effectively unwithdrawable. Most players never fully read the terms. This guide breaks down every mechanism casinos use in bonus structures and tells you exactly what to look for before accepting any offer.' },
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
    { type: 'p', text: 'BitStarz documents a different kind of catch: a 25% admin fee on bonus-related withdrawals, flagged in our review as the one most players don\'t see coming. The 5 BTC welcome headline is also real. But if you clear the bonus and want to withdraw the resulting winnings, 25% comes off at the cashier. That changes the effective expected value of the bonus meaningfully. A $5,000 BTC-equivalent win after clearing the bonus arrives in your wallet as $3,750. Whether you\'d still take the bonus knowing that is the better way to think about it than the headline number alone.' },
    { type: 'p', text: 'Across the eight casinos we review, the bonuses with the cleanest math are usually the rakeback and weekly cashback offers at platforms like Duelbits ($30 weekly cashback) and Cloudbet (VIP cashback rates): no wagering, no maximum win caps, no admin fees on the way out. BC.Game\'s 220% Deposit Rakeback Welcome Bonus has structurally moved to the same model: locked-balance unlocking as you wager rather than wagering-then-withdraw. Cashback beats most match bonuses for active players for exactly this reason.' },
    { type: 'h2', text: 'The bonuses actually worth taking' },
    { type: 'p', text: 'Cashback offers with no wagering requirements are the most player-friendly bonus type available. The casino returns a percentage of net losses (typically 10–20%) with no strings attached. What you win, you keep. These are standard in VIP programmes at casinos like BitStarz, Cloudbet and BC.Game. Reload bonuses with low wagering (under 25x) are worthwhile for regular players. Free spins are lower risk but also lower value. Read the maximum win cap carefully. First deposit match bonuses at 20–30x wagering with no game restrictions are reasonable. Anything with 40x+ wagering, restricted game lists, and a win cap is a marketing tool, not a player incentive.' },
    { type: 'h2', text: 'Summary checklist before accepting any bonus' },
    { type: 'p', text: 'Before accepting any casino bonus, verify: the wagering requirement (and whether it applies to bonus only or deposit plus bonus), the game contribution percentages for your preferred game type, any maximum withdrawal limit on winnings, the time window to complete wagering, and whether the bonus can be declined. A bonus you cannot or will not complete within its terms is not a bonus: it is a withdrawal restriction. The best bonus is often no bonus at all, particularly for players who primarily play table games or who plan to withdraw quickly after winning.' },
  ],

  'bitcoin-vs-usdt-casinos': [
    { type: 'h2', text: 'The fundamental difference' },
    { type: 'p', text: 'Bitcoin (BTC) and USDT (Tether) are the two most widely accepted cryptocurrencies at online casinos. They are structurally very different assets, and that difference has practical consequences for every player. Bitcoin is a volatile decentralised currency whose price changes constantly. USDT is a stablecoin pegged 1:1 to the US dollar: one USDT always equals one dollar. Everything else flows from that distinction.' },
    { type: 'h2', text: 'Stability: the decisive factor for most players' },
    { type: 'p', text: 'For most casino players, bankroll stability is the most important factor. When you deposit $500 of BTC and play for a few hours, the value of that $500 may have shifted to $450 or $560 by the time you consider withdrawing, regardless of whether you won or lost at the tables. This creates a second, uncontrolled gambling variable on top of the games themselves. Your casino results and your BTC price exposure are now intertwined.' },
    { type: 'p', text: 'USDT eliminates this entirely. A $500 USDT deposit is worth $500 when you withdraw, assuming your gambling results were breakeven. You know exactly where you stand at all times. For players managing a gambling budget carefully, this predictability is genuinely valuable: it lets you track wins and losses accurately against your actual bankroll rather than against a moving target.' },
    { type: 'h2', text: 'Speed comparison' },
    { type: 'p', text: 'USDT on TRC-20 wins on speed. Tron network confirmations complete in under 3 seconds, making USDT withdrawals arrive almost instantly once the casino broadcasts the transaction. USDT on ERC-20 (Ethereum) is slower and more expensive: 15–30 seconds per block but with gas fees that can be $5–$30. If your casino offers TRC-20 USDT, use it over ERC-20.' },
    { type: 'p', text: 'Bitcoin withdrawals depend heavily on network conditions. During quiet periods, a BTC transaction confirms in 10–20 minutes. During bull market congestion, the same transaction can take 60–90 minutes with priority fees, or hours without them. On a day-to-day basis, BTC withdrawal speed is simply less predictable than TRC-20 USDT.' },
    { type: 'h2', text: 'Fees comparison' },
    { type: 'p', text: 'TRC-20 USDT fees are under $0.01 per transaction in virtually all conditions. Bitcoin fees fluctuate with network demand. At times of low congestion, BTC fees can be under $1. During peak demand periods in 2024 and 2025, fees spiked to $50–$100 per transaction. For frequent depositors and withdrawers, USDT on TRC-20 is substantially cheaper over time.' },
    { type: 'h2', text: 'Availability at casinos' },
    { type: 'p', text: 'Bitcoin has a slight edge on availability: virtually every crypto casino accepts BTC, including some smaller platforms that only support Bitcoin. USDT is accepted at all major crypto casinos but may not be available at the very smallest operators. For the platforms reviewed on PlayMagpie (BitStarz, BC.Game, Cloudbet, Mirax Casino, and 7Bit Casino) both BTC and USDT are supported. In practice, availability is not a meaningful differentiator for players using reputable platforms.' },
    { type: 'h2', text: 'TRC-20 USDT support across the casinos we review' },
    { type: 'p', text: 'The catch with USDT is that the same coin runs on multiple networks. ERC-20 (Ethereum) USDT carries the same gas-fee exposure as ETH itself: slow and expensive. TRC-20 (Tron) USDT is the version that delivers the speed and cost advantages described above. Looking at our seven reviewed casinos: BC.Game lists 100+ cryptocurrencies including TRC-20 USDT explicitly. Duelbits supports 12 cryptos including USDT TRC-20. Cloudbet\'s 10-coin lineup includes USDT and USDC across supported chains. BitStarz, Mirax Casino, 7Bit Casino and Shuffle all support USDT. Verify the network selection at the cashier before depositing, since sending TRC-20 USDT to an ERC-20 address results in lost funds.' },
    { type: 'p', text: 'Practical rule: if the casino lists USDT support and has been operating for more than a year, it almost certainly enables TRC-20. The deposit screen in the cashier confirms which networks are accepted. Pick TRC-20 unless your wallet only holds ERC-20 USDT and you don\'t want to bridge.' },
    { type: 'h2', text: 'The case for choosing Bitcoin' },
    { type: 'p', text: 'Bitcoin makes sense if you hold BTC as a long-term investment and want to use it at casinos without converting to stablecoins. Some players prefer to keep all of their wealth in BTC and treat casino deposits as transactions from their existing holdings. In this case, the volatility is not an added risk: it was already present in their portfolio. Bitcoin also makes sense for players in jurisdictions where stablecoin acquisition is harder than BTC, or where exchange-based BTC purchases are the most accessible on-ramp.' },
    { type: 'h2', text: 'The PlayMagpie verdict' },
    { type: 'p', text: 'For the majority of casino players, USDT on TRC-20 is the superior option: faster, cheaper, and predictable. It lets you gamble with a fixed dollar amount and understand your results clearly. Bitcoin is appropriate for players who already hold BTC and prefer not to convert, or who want deliberate price exposure alongside their gaming. If you are deciding which to acquire specifically for gambling, acquire USDT on TRC-20 via an exchange, send it to a self-custodial wallet, and deposit from there. Your experience will be faster and your bankroll more manageable.' },
  ],

  'do-crypto-casinos-require-kyc': [
    { type: 'h2', text: 'The short answer' },
    { type: 'p', text: 'Some do, some don’t, and unlike at a licensed fiat casino, it is a genuine choice rather than a universal mandate. At a crypto casino, KYC (Know Your Customer identity verification) is set by the operator’s own policy, not imposed on every player by a Tier-1 regulator. Across the eight casinos we review, three never ask for documents on crypto play, four run a "Light" policy that only triggers on larger or fiat-side activity, and one applies Standard KYC with documented holds on large wins. So whether you will be asked for ID depends entirely on which operator you pick, and, at the Light-KYC ones, on how you play.' },

    { type: 'h2', text: 'What KYC actually is at a crypto casino' },
    { type: 'p', text: 'KYC is the process of confirming you are who you say you are: typically a government photo ID plus a recent proof of address. Licensed fiat casinos must run it on every player because their regulators and banking partners require it. Crypto casinos sit in a different position: settlement happens on-chain rather than through the banking system, and most operate under a Curaçao licence rather than a Tier-1 regulator like the UKGC or MGA. That gives them room to choose how much verification to apply, and they land in noticeably different places.' },
    { type: 'p', text: 'The practical consequence is that "do I need to verify my identity" has no single answer for crypto casinos the way it does for a regulated fiat site. It is an operator-level decision, and it is one of the more meaningful differences between platforms: more meaningful, for a privacy-focused player, than the welcome bonus or the game count.' },

    { type: 'h2', text: 'The three KYC postures, by operator' },
    { type: 'p', text: 'We score each casino’s KYC posture on a 0–10 transparency-and-friction scale, recorded alongside the rest of its profile in our data. The scores sort into three bands: None (no documents collected on crypto play), Light (document-free for routine play, with verification reserved for larger or fiat-side activity), and Standard (verification applied more readily, including on large wins). Here is where each casino we review actually sits. The three with dedicated KYC pages link through to the full breakdown.' },
    {
      type: 'kycposture',
      items: [
        { slug: 'bc-game', href: '/reviews/bc-game/kyc', note: 'Strict no-KYC. Email-only signup, no documents at any withdrawal size under the standard flow: the cleanest anonymity story in our catalogue.' },
        { slug: '7bit-casino', href: '/reviews/7bit-casino', note: 'No KYC for crypto withdrawals at any amount, held since 2014. Compliance handled by transaction monitoring, not up-front document collection.' },
        { slug: 'duelbits', href: '/reviews/duelbits', note: 'No KYC for crypto play and withdrawals, only basic checks on unusual activity. Most crypto payouts clear in under 5 minutes.' },
        { slug: 'bitstarz', href: '/reviews/bitstarz/kyc', note: 'Light KYC. Crypto-only play rarely triggers it; fiat-side activity or a flagged pattern can. No published dollar threshold.' },
        { slug: 'cloudbet', href: '/reviews/cloudbet/kyc', note: 'Light at scale. No withdrawal limits, with verification reserved for outsized cash-outs. Dual Curaçao + Kahnawake licence.' },
        { slug: 'mirax-casino', href: '/reviews/mirax-casino', note: 'Light KYC: same posture as sister brand 7Bit’s operator. Triggered above higher withdrawal thresholds rather than on routine play.' },
        { slug: 'shuffle', href: '/reviews/shuffle', note: 'Light KYC that can trigger on larger withdrawals, with some reported temporary holds on high-value cash-outs pending review.' },
        { slug: 'roobet', href: '/reviews/roobet', note: 'Standard KYC: the strictest here. Documented multi-day holds on large wins (AskGamblers cases at $20k–$115k); expect re-verification on any sizeable cashout.' },
      ],
    },

    { type: 'h2', text: 'When KYC triggers: if it does' },
    { type: 'p', text: 'At a no-KYC operator, nothing in ordinary play triggers a document request; compliance is handled in the background through on-chain transaction monitoring. At a Light-KYC operator, two things flip verification from exception to requirement. The first is fiat-side activity: the moment a deposit or withdrawal touches the regulated banking rails, identity verification becomes a compliance obligation the casino cannot opt out of. The second is an outsized or flagged crypto withdrawal: a large cash-out, or account behaviour the platform’s monitoring reads as unusual, can route a payout into manual review.' },
    { type: 'p', text: 'Standard KYC works differently again. At an operator like Roobet, verification is applied more readily and (per the documented complaint record) can re-trigger on large wins even for accounts that have transacted before, which is the single biggest reason we score its KYC posture lowest in the catalogue. The lesson across all three bands is the same: routine crypto play is where no-KYC and Light-KYC look identical, and the large-withdrawal moment is where they diverge sharply.' },

    { type: 'h2', text: 'What documents you’ll be asked for' },
    { type: 'p', text: 'When verification does happen, the request is consistent across operators: a government-issued photo ID (passport, national ID or driving licence), a proof of address dated within the last few months (a utility bill or bank statement), and, only if you used a card or fiat rail, proof of that payment method. At genuinely large withdrawal amounts, source-of-funds documentation can be requested, which is standard for high-value crypto cash-outs anywhere, not specific to gambling. Turnaround at this class of operator is typically same-day to a couple of days once everything is submitted correctly.' },

    { type: 'h2', text: 'How to avoid KYC entirely' },
    { type: 'p', text: 'If keeping identity documents out of the loop is your priority, the route is straightforward: choose a no-KYC operator, play crypto-only, and withdraw to a self-custodial wallet you control. Among the casinos we review, BC.Game, 7Bit Casino and Duelbits all run no-KYC policies for crypto. The key point most guides miss is that the privacy comes from the casino’s policy, not from the coin. There is no "anonymous cryptocurrency" that bypasses a casino that requires KYC, and at a no-KYC casino your coin choice is purely a speed-and-fees decision. The category hub is our no-KYC crypto casinos page.' },

    { type: 'h2', text: 'The honest trade-off' },
    { type: 'p', text: 'No-KYC is not free of downsides. A casino that never collects identity documents is, almost by definition, one that operates outside the Tier-1 regulatory framework: Curaçao rather than the UKGC or MGA. That means lighter external oversight and, if a dispute ever escalates, a weaker formal recourse path than a Tier-1 licence would give you. The decision is a genuine trade between anonymity and oversight: privacy-first players are well served by the no-KYC operators, while players who weight regulatory protection more heavily should accept Light KYC as the cost of it. Neither answer is universally correct, which is exactly why this is an operator-level choice rather than an industry default.' },
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
      answer: 'The two most common causes are mid-process KYC verification (the casino is asking for ID or proof of address before releasing funds) and manual review for unusual activity. Network congestion on Bitcoin can also delay confirmation, though that\'s usually visible on the blockchain explorer rather than as a "pending" status in the casino UI. Light-KYC platforms like BitStarz, Cloudbet, Mirax and Shuffle reserve the right to trigger ID checks on larger withdrawals; no-KYC platforms (BC.Game, 7Bit, Duelbits) avoid this entirely for routine play.',
    },
    {
      question: 'Do I need KYC to withdraw crypto from an online casino?',
      answer: 'At no-KYC casinos like BC.Game, 7Bit Casino and Duelbits, no: withdrawals process without identity documents at any amount, by policy. At Light-KYC casinos (BitStarz, Cloudbet, Mirax, Shuffle), routine withdrawals usually don\'t require KYC, but larger amounts or activity that flags compliance checks can trigger document requests. If KYC matters to you, the policy is documented in each casino\'s review.',
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
      answer: 'Some smaller and older Bitcoin-specialist casinos do, but among the platforms we review at PlayMagpie, all seven accept multiple coins including both BTC and USDT. BTC-only acceptance has become rare among credible operators since 2022: stablecoin support is now table-stakes for any new launch. If you find a casino that accepts only Bitcoin, that\'s a credibility signal worth weighing.',
    },
  ],
  'do-crypto-casinos-require-kyc': [
    {
      question: 'Do all crypto casinos require KYC?',
      answer: 'No. Unlike licensed fiat casinos, crypto casinos set their own KYC policy rather than verifying every player by regulatory mandate. Of the eight casinos we review, three (BC.Game, 7Bit Casino and Duelbits) never ask for documents on crypto play, four run Light KYC that only triggers on larger or fiat-side activity, and one (Roobet) applies Standard KYC. Whether you need to verify depends entirely on which operator you choose.',
    },
    {
      question: 'Which crypto casinos don’t require KYC?',
      answer: 'Among the casinos we review, BC.Game, 7Bit Casino and Duelbits operate no-KYC policies for crypto: no government ID or proof of address is required to deposit, play or withdraw under the standard flow. BC.Game holds the highest KYC score in our catalogue (9.5/10) on the strength of an email-only signup with no documents at any withdrawal size. Compliance at these operators is handled through transaction monitoring rather than up-front document collection.',
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
      answer: 'No-KYC means no document collection, not no compliance: these operators manage risk through on-chain transaction monitoring instead of identity files. The real trade-off is regulatory: a casino that never collects documents almost always operates under a Curaçao licence rather than a Tier-1 regulator (UKGC, MGA), which means lighter oversight and a weaker formal recourse path if a dispute escalates. For privacy-first players the no-document model is the appeal; players who weight regulatory protection more heavily should accept Light KYC as the cost of it.',
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
    { label: 'BC.Game KYC', href: '/reviews/bc-game/kyc', teaser: 'The no-KYC pole: email-only, no documents ever' },
    { label: 'BitStarz KYC', href: '/reviews/bitstarz/kyc', teaser: 'Light KYC: what actually triggers verification' },
    { label: 'Cloudbet KYC', href: '/reviews/cloudbet/kyc', teaser: 'No limits, verification only at scale' },
    { label: 'Bonus & Withdrawal Transparency Report', href: '/research/crypto-casino-bonus-transparency', teaser: 'Headline offers vs the real cashout terms, all 8 sourced' },
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
    { name: 'Cloudbet', slug: 'cloudbet', reason: '100% up to 5 BTC welcome bonus' },
  ],
  'bitcoin-vs-usdt-casinos': [
    { name: 'BitStarz', slug: 'bitstarz', reason: 'BTC, USDT and 4 more cryptos' },
    { name: 'BC.Game', slug: 'bc-game', reason: 'BTC, USDT and 100+ more options' },
    { name: 'Cloudbet', slug: 'cloudbet', reason: 'BTC, USDT, SOL and 7 more cryptos' },
  ],
  'do-crypto-casinos-require-kyc': [
    { name: 'BC.Game', slug: 'bc-game', reason: 'Strict no-KYC: highest KYC score (9.5/10)' },
    { name: '7Bit Casino', slug: '7bit-casino', reason: 'No KYC on crypto withdrawals since 2014' },
    { name: 'BitStarz', slug: 'bitstarz', reason: 'Light KYC: rarely triggered on crypto-only play' },
  ],
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
    datePublished: '2026-01-01',
    dateModified: '2026-05-21',
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
        <h1 className="text-3xl font-extrabold text-white mb-3">{guide.title}</h1>
        <div className="flex items-center gap-3 text-sm text-[#888888] mb-10">
          <span>{guide.readTime}</span>
          <span>·</span>
          <span>Updated May 2026</span>
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
                        KYC: {casino.kycLevel}
                      </div>
                      <p className="text-[#888888] text-sm leading-relaxed">{item.note}</p>
                    </Link>
                  )
                })}
              </div>
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
