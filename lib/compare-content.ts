// Hand-written per-pair content for the 5 allowlisted /compare/* pages.
// Must mirror COMPARE_ALLOWLIST in app/compare/[slug]/page.tsx and the
// sitemap. Each entry is structurally different — no name-swap templating.
// All factual claims cross-reference lib/casinos.ts; framing is hand-written.

export type ComparePair = {
  intro: string
  positioning: string[]
  scenarios: {
    casinoSlug: string
    label: string
    conditions: string[]
  }[]
  verdict: string
  faqs: { question: string; answer: string }[]
}

// The keys of compareContent define which compare pages actually render —
// app/compare/[slug]/page.tsx 404s any slug not present here, regardless of
// what's pre-rendered. app/compare/page.tsx derives its tile grid from
// Object.keys(compareContent). The COMPARE_ALLOWLIST constants in
// app/compare/[slug]/page.tsx and app/sitemap.ts must stay in sync with these
// keys manually — they control pre-rendering and sitemap inclusion respectively.
export const compareContent: Record<string, ComparePair> = {
  'bitstarz-vs-bc-game': {
    intro:
      "Two of the most-searched names in crypto casinos, two completely different theories of what a crypto casino should be. BitStarz has been the industry's reputation benchmark since 2014, accumulating awards and a 9.2/10 PlayMagpie trust score on the back of consistent reliability rather than feature breadth. BC.Game took the opposite path — launching in 2017 and going wider on crypto support than anyone else (100+ accepted cryptocurrencies versus BitStarz's six), with a no-KYC policy maintained from day one. The right pick depends entirely on whether you value institutional reputation or crypto-native flexibility.",
    positioning: [
      "On the headline numbers, BitStarz holds the trust score edge (9.2 vs 8.9) and the withdrawal score edge (9.5 vs 9.3 — both fast, BitStarz marginally more so). BC.Game wins decisively on KYC (None vs Light, 9.5 vs 8.5 in our scoring), crypto support (100+ vs 6), and minimum deposit ($5 vs $20). Those are not subtle differences.",
      "The welcome bonus is where the math gets interesting. BitStarz offers 5 BTC + 200 free spins across the first four deposits — a headline figure that the 25% admin fee on bonus-related withdrawals materially complicates. BC.Game offers up to 300% across four deposits + 200 free spins, without the admin-fee structure but with its own wagering requirements to clear. Both bonuses carry caveats; reading the full terms before depositing matters more than the headline at either.",
    ],
    scenarios: [
      {
        casinoSlug: 'bitstarz',
        label: 'Pick BitStarz if',
        conditions: [
          'You want the established reputation and award history',
          'You deposit in BTC or one of the other 5 supported coins',
          'You can model the 25% bonus-withdrawal admin fee into the math',
          'You value the slightly faster 9.5/10 withdrawal score',
        ],
      },
      {
        casinoSlug: 'bc-game',
        label: 'Pick BC.Game if',
        conditions: [
          'No-KYC at any withdrawal size is decisive for you',
          'You hold altcoins outside BitStarz\'s six-coin cashier (XRP, TRX, SOL, BNB, ADA, MATIC, …)',
          'You want a $5 minimum deposit threshold',
          'You want the broadest crypto cashier menu in the market',
        ],
      },
    ],
    verdict:
      "There's no single winner — the choice is structural to your priorities. BitStarz is the better pick if you're a high-roller who values brand legacy, you deposit in BTC or one of the major coins, and you can model the 25% admin fee into your bonus math. BC.Game is the better pick if no-KYC matters to you, if you hold altcoins outside BitStarz's six-coin cashier, or if you want to play at a $5 minimum deposit. Both are legitimately top-tier operators — the question is which one matches what you're actually trying to do.",
    faqs: [
      {
        question: 'Which has the bigger welcome bonus, BitStarz or BC.Game?',
        answer: 'BitStarz advertises 5 BTC + 200 free spins across four deposits; BC.Game offers up to 300% across four deposits + 200 free spins. The BTC headline at BitStarz is larger in raw fiat value at current prices, but the 25% admin fee on bonus-related withdrawals erodes the effective value. After fees, the two welcomes are closer than they appear — and BC.Game\'s structure has fewer hidden deductions.',
      },
      {
        question: 'Does BC.Game accept the same cryptos as BitStarz?',
        answer: 'BC.Game accepts everything BitStarz does plus 90+ more — BitStarz covers BTC, ETH, LTC, DOGE, BCH and USDT (six coins). BC.Game adds SOL, BNB, XRP, TRX, USDC, ADA, MATIC, ETC, DASH and many others, plus a "100+ more" extended list. If you hold any altcoin outside the major six, BC.Game wins on this dimension by default.',
      },
      {
        question: 'Is BitStarz no-KYC like BC.Game?',
        answer: 'No — BitStarz operates Light KYC. Most routine play and withdrawals don\'t require document submission, but the trigger is reserved for larger withdrawals or compliance flags. BC.Game is strict no-KYC: register with email, deposit, play and withdraw without any identity documents at any amount, by published policy. If anonymity at any size matters to you, BC.Game wins.',
      },
      {
        question: 'How do withdrawal speeds compare between BitStarz and BC.Game?',
        answer: 'BitStarz scores 9.5/10 (consistently under 10 minutes typical) and BC.Game scores 9.3/10 (instant to 10 minutes across 100+ supported cryptocurrencies). Both are among the fastest in the market. The 0.2 gap is fine-grained — the actual on-chain time often depends more on which network you pick than which casino sends the transaction.',
      },
      {
        question: 'Which is better for high rollers, BitStarz or BC.Game?',
        answer: 'BitStarz has the better-established VIP programme — invite-only with dedicated hosts, well-regarded for high-stakes players. BC.Game runs a transparent wagering-XP tier system where progression is visible. For high-rollers concerned primarily about reputation and host attention, BitStarz. For high-rollers who value no-KYC at any size and broader crypto support, BC.Game. For no-withdrawal-limit certainty specifically, neither — see Cloudbet for that.',
      },
    ],
  },

  'cloudbet-vs-bitstarz': {
    intro:
      "Same vintage, similar trust scores, identical welcome-bonus ceilings — but a clean structural split underneath. Cloudbet launched in 2013 with a casino+sportsbook proposition and a no-withdrawal-limits policy; BitStarz launched in 2014 as a pure-casino product that's collected 'Best Bitcoin Casino' awards since. The right pick comes down to whether you want a sportsbook in the same account, and how much you weight headline awards versus structural no-cap cash-out.",
    positioning: [
      "BitStarz holds the trust edge (9.2 vs 8.7) and the withdrawal speed edge (9.5 vs 9.0). Cloudbet holds the dual licensing (Curaçao + Kahnawake versus BitStarz's Curaçao-only) and — critically for high-rollers — the explicit no-withdrawal-limit policy that BitStarz doesn't formally claim. Both Light KYC. Both have VIP programmes with personal hosts at the top tiers.",
      "Welcome bonuses tie on the BTC headline (5 BTC vs 5 BTC) but split on structure. BitStarz adds 180 free spins; Cloudbet doesn't. BitStarz documents a 25% admin fee on bonus-related withdrawals; Cloudbet doesn't. The math on which welcome is genuinely better depends entirely on whether you complete the wagering and what you withdraw.",
    ],
    scenarios: [
      {
        casinoSlug: 'cloudbet',
        label: 'Pick Cloudbet if',
        conditions: [
          'You want a credible crypto sportsbook in the same account',
          'You\'re planning to win big and need no-withdrawal-limit certainty',
          'You value the dual Curaçao + Kahnawake licensing',
          'You deposit in 0.001 BTC equivalent (lower minimum threshold)',
        ],
      },
      {
        casinoSlug: 'bitstarz',
        label: 'Pick BitStarz if',
        conditions: [
          'You want the established award track record',
          'You value the slightly faster 9.5/10 withdrawal score',
          'You want the 180 free spins alongside the matching BTC bonus',
          'You don\'t need a sportsbook',
        ],
      },
    ],
    verdict:
      "The split is sportsbook plus cash-out certainty (Cloudbet) versus pure-casino plus brand legacy (BitStarz). BitStarz is the cleaner casino-only choice — faster typical withdrawal score, more decorated awards history, and the 200 free spins on top of the matching BTC welcome. Cloudbet is the better pick if you also bet on sports, if you're planning the kind of win that hits withdrawal caps elsewhere, or if you want the dual licensing as additional structural assurance. Both are top-five operators by our scoring; the choice is which proposition matches your play.",
    faqs: [
      {
        question: 'Does Cloudbet have a sportsbook?',
        answer: 'Yes — Cloudbet runs a credible crypto sportsbook covering hundreds of markets across football, basketball, tennis, cricket, esports and more, with live in-play betting and high limits suited to high-rollers. BitStarz is casino-only with no sportsbook product. If you want both casino and sports in one account, Cloudbet is the structural choice.',
      },
      {
        question: 'Are there withdrawal limits at Cloudbet versus BitStarz?',
        answer: 'Cloudbet explicitly operates with no withdrawal limits — a notable structural feature for high-rollers. BitStarz does not formally claim no-limits in the same way; standard withdrawal-cap behaviour applies, with limits typically raising at higher VIP tiers. If you\'re planning a five- or six-figure cash-out, Cloudbet\'s no-limit policy is the safer fit.',
      },
      {
        question: 'Which has the better welcome bonus, Cloudbet or BitStarz?',
        answer: 'Both headline 5 BTC welcome bonuses. BitStarz adds 180 free spins; Cloudbet doesn\'t. BitStarz also applies a 25% admin fee on bonus-related withdrawals, which Cloudbet doesn\'t. If you\'ll clear the bonus and withdraw winnings, Cloudbet\'s clean structure delivers more effective value. If you value the free spins as their own bucket, BitStarz wins on raw inclusion.',
      },
      {
        question: 'Is Cloudbet older than BitStarz?',
        answer: 'Yes, by about a year. Cloudbet launched in 2013, BitStarz in 2014. Both have 12+ years of unbroken operation including through multiple crypto market cycles. Both have processed withdrawals reliably with no major incidents in our review history.',
      },
      {
        question: 'Which is better for crypto sports betting?',
        answer: 'Cloudbet, by default — it has the sportsbook product and BitStarz doesn\'t. Cloudbet\'s sportsbook is among the best-regarded in the crypto betting space, with hundreds of markets, live in-play odds, and high limits. If sports betting is part of your routine, this question answers itself in Cloudbet\'s favour.',
      },
    ],
  },

  '7bit-casino-vs-bitstarz': {
    intro:
      "Two casinos born within months of each other in 2014, both Bitcoin-first, both still operating as benchmark crypto platforms a decade-plus later. What divides them is privacy posture: 7Bit Casino has maintained a no-KYC policy throughout — one of the longest unbroken in the industry. BitStarz operates Light KYC, light-touch enough that most players never see a document request but with the trigger reserved. The pick depends on whether anonymity at any withdrawal size is the decisive factor.",
    positioning: [
      "BitStarz wins on bonus ceiling (5 BTC headline vs 1.5 BTC), trust score (9.2 vs 8.8), and withdrawal speed (9.5 vs 9.1 — both fast). 7Bit wins on KYC (None vs Light, 9.2 vs 8.5 in our scoring), minimum deposit ($10 vs $20), and on coin count (8 vs 6 — adds XRP and BNB).",
      "The bonus headline is misleading without context. BitStarz's 5 BTC carries a 25% admin fee on bonus-related withdrawals. 7Bit's 1.5 BTC doesn't. After fee, the effective bonus values converge closer than the headline suggests — though BitStarz still wins on raw ceiling.",
    ],
    scenarios: [
      {
        casinoSlug: '7bit-casino',
        label: 'Pick 7Bit Casino if',
        conditions: [
          'No-KYC at any withdrawal size is decisive for you',
          'You want to deposit in XRP or BNB (BitStarz doesn\'t accept either)',
          'You want a $10 minimum entry',
          'You\'d rather skip the 25% bonus-withdrawal admin fee',
        ],
      },
      {
        casinoSlug: 'bitstarz',
        label: 'Pick BitStarz if',
        conditions: [
          'You want the bigger BTC welcome headline (5 BTC vs 1.5 BTC)',
          'You value the award history and brand reputation',
          'You want the slightly faster 9.5/10 withdrawal score',
          'You don\'t need full no-KYC throughout',
        ],
      },
    ],
    verdict:
      "7Bit Casino is the cleaner choice if no-KYC is your decisive factor — and that's the case for many crypto-native players. BitStarz is the bigger headline brand and offers the larger welcome bonus if you'll actually clear it post-25%-fee. Both have 12-year+ track records and process withdrawals fast. The 0.4 trust-score gap is real but small — neither casino has structural concerns. Pick on privacy posture first, then on bonus math.",
    faqs: [
      {
        question: 'Is 7Bit Casino older than BitStarz?',
        answer: 'Both launched in 2014 within months of each other — both have around 12 years of unbroken operation. Neither holds a meaningful "age" advantage. 7Bit\'s standout claim is the no-KYC policy maintained across that entire span; BitStarz\'s is the multiple "Best Bitcoin Casino" awards collected in the same period.',
      },
      {
        question: 'Does 7Bit Casino require KYC like BitStarz?',
        answer: 'No — 7Bit Casino is strict no-KYC. The policy applies to all crypto withdrawals at any amount and has been continuous since 2014. BitStarz is Light KYC: most players never see a document request, but the trigger is reserved for larger withdrawals or compliance flags. If full anonymity matters at any withdrawal size, 7Bit wins decisively.',
      },
      {
        question: 'Which has the bigger welcome bonus, 7Bit or BitStarz?',
        answer: 'BitStarz: 5 BTC + 200 free spins across the first four deposits, versus 7Bit\'s 100% up to 1.5 BTC + 100 free spins. On raw headline ceiling, BitStarz wins by about 3x. After the 25% admin fee on BitStarz\'s bonus-related withdrawals — which 7Bit doesn\'t apply — the effective gap narrows. 7Bit also runs continuous weekly reload bonuses that BitStarz matches less actively.',
      },
      {
        question: 'Which has faster crypto withdrawals, 7Bit or BitStarz?',
        answer: 'BitStarz scores 9.5/10 on withdrawal speed; 7Bit scores 9.1/10. Both are within "instant to 10 minutes" typical processing. The 0.4 score gap reflects consistency at scale — BitStarz has slightly fewer flagged-larger-amount delays in our review window. Functionally, for routine play, the difference is rarely visible.',
      },
      {
        question: 'Which supports more cryptocurrencies?',
        answer: '7Bit Casino accepts 8 cryptocurrencies (BTC, ETH, USDT, LTC, DOGE, BCH, XRP, BNB); BitStarz accepts 6 (BTC, ETH, LTC, DOGE, BCH, USDT). 7Bit adds XRP and BNB — meaningful if you hold either. Neither approaches BC.Game\'s 100+ coin coverage, but for major-coin holders both are sufficient.',
      },
    ],
  },

  'bc-game-vs-shuffle': {
    intro:
      "Both casinos market themselves on the 'crypto-native' identity — both have provably-fair house Originals, both run 10,000+ title libraries, both target streamer-friendly audiences. The split is between volume and ecosystem. BC.Game has been the volume play since 2017: 100+ supported cryptocurrencies, no-KYC, and a wagering-XP VIP system. Shuffle launched in 2022 with a different theory — build a native token (SHFL) that returns value to active players via airdrops and stacked rakeback on top of standard cashback.",
    positioning: [
      "BC.Game wins on every headline scoring metric: trust (8.9 vs 8.2), withdrawal speed (9.3 vs 8.8), bonus fairness (8.5 vs 7.8), KYC (9.5 vs 8.0), and coin coverage (100+ vs 12). The numbers favour BC.Game on every dimension — but the bigger story is what they mean.",
      "The trust-score gap reflects time in market (BC.Game since 2017, Shuffle since 2022) more than operational concerns at Shuffle. The KYC gap reflects policy difference (BC.Game None vs Shuffle Light, with KYC triggered at larger withdrawals). The bonus fairness gap reflects Shuffle's 35x wagering requirement on the welcome plus the live-chat activation requirement — both of which work against headline value compared to BC.Game's tier-based structure.",
    ],
    scenarios: [
      {
        casinoSlug: 'bc-game',
        label: 'Pick BC.Game if',
        conditions: [
          'You want the longer proven track record (since 2017)',
          'You hold an altcoin outside Shuffle\'s 12-coin lineup',
          'You want no-KYC at any withdrawal size',
          'You want the $5 minimum deposit',
        ],
      },
      {
        casinoSlug: 'shuffle',
        label: 'Pick Shuffle if',
        conditions: [
          'You specifically want SHFL token rewards layered on standard play',
          'You prefer the cleaner modern interface',
          'You\'re an active player who\'ll extract more from rakeback than XP-tier progression',
          'You\'re comfortable with the 35x wagering on welcome bonus',
        ],
      },
    ],
    verdict:
      "BC.Game wins on every PlayMagpie scoring dimension, but Shuffle's token-rewards model isn't directly captured by the score breakdown. For most players asking 'which casino?' BC.Game is the cleaner choice — longer track record, no-KYC throughout, dramatically wider crypto support, lower minimum deposit. Shuffle becomes the better pick specifically when you want SHFL token exposure layered onto your play, or when the rakeback model fits your volume better than tier progression. Active high-volume players who'll grind through the token economy may extract more from Shuffle; everyone else should default to BC.Game.",
    faqs: [
      {
        question: 'Which has more cryptocurrencies, BC.Game or Shuffle?',
        answer: 'Not close — BC.Game accepts 100+ cryptocurrencies across multiple blockchains (ERC-20, TRC-20, BEP-20, native chains). Shuffle accepts 12: BTC, ETH, LTC, USDT, USDC, SOL, DOGE, BNB, XRP, TRX, MATIC plus the native SHFL token. If you hold any coin outside Shuffle\'s 12, BC.Game wins on this dimension by default.',
      },
      {
        question: 'Does Shuffle Casino require KYC?',
        answer: 'Shuffle operates Light KYC — most players can register, deposit and play without identity documents, but the trigger is reserved for larger withdrawal amounts or unusual activity. BC.Game is strict no-KYC throughout. If full anonymity at any withdrawal size matters to you, BC.Game is the clear pick. If light-touch verification is acceptable for the SHFL ecosystem upside, Shuffle is fine for most play.',
      },
      {
        question: 'What is the SHFL token and is it worth it?',
        answer: 'SHFL is Shuffle\'s native token, used for airdrop rewards distributed to active players and for stacked rakeback on top of standard cashback. The token can be held, traded or used directly on the platform. Whether it\'s "worth it" depends on Shuffle\'s ongoing token economics, your play volume, and your willingness to hold platform-native tokens. For high-volume players who\'ll qualify for material airdrops, the structural upside exists; for casual players, the headline value is harder to realise.',
      },
      {
        question: 'Which has better Originals games?',
        answer: 'Both run polished provably-fair Originals libraries with cryptographic seed verification — slots, crash, plinko, dice variants. The catalogues are comparable in quality. The difference is the surrounding economy: BC.Game\'s Originals integrate with the XP-tier VIP system; Shuffle\'s integrate with SHFL token rewards. Same game format, different reward structures around it.',
      },
      {
        question: 'Which is more trusted, BC.Game or Shuffle?',
        answer: 'BC.Game holds the higher PlayMagpie trust score (8.9 vs 8.2). The gap reflects time in market — BC.Game has seven years of unbroken operation through multiple crypto cycles with no major incidents; Shuffle has three years. Both are legitimate Curaçao-licensed operators with verified payouts. Shuffle has had reports of temporary holds on high-value withdrawals pending review, flagged in our review as a caveat to weight if you expect a single large win.',
      },
    ],
  },

  'mirax-casino-vs-bitstarz': {
    intro:
      "The bonus is the headline that drives most players to this comparison: Mirax's 325% across four deposits up to $3,250 plus 250 free spins, versus BitStarz's 5 BTC plus 200 free spins. Both are among the largest welcome offers in the market — but the operator history underneath them is the structural difference. BitStarz has run as a standalone brand since 2014. Mirax launched in 2022 as part of the 7Bit Partners network, which has been operating other established brands since 2014. New brand, proven backbone versus decade-old standalone.",
    positioning: [
      "BitStarz wins on trust (9.2 vs 8.6), withdrawal speed (9.5 vs 8.8), and bonus fairness scoring (8.8 vs 8.4 — the 0.4 gap reflects the structural transparency of an established brand more than a specific Mirax problem). Mirax wins on bonus ceiling ($3,250 across four deposits + 250 spins vs 5 BTC + 200 spins on raw fiat-equivalent ladder structure), on coin count by one (XRP added vs BitStarz\'s six), and on game library breadth (7,000+ titles vs 3,000+ at BitStarz — though BitStarz pairs that with 100+ providers, the broadest curation in our reviews).",
      "The 25% admin fee on bonus-related withdrawals at BitStarz materially complicates the headline math. Mirax doesn't document the same structure. If you'll clear the welcome bonus and withdraw resulting winnings, that 25% changes the comparison meaningfully — Mirax's structurally cleaner withdrawal post-bonus delivers more of the headline value to your wallet.",
    ],
    scenarios: [
      {
        casinoSlug: 'mirax-casino',
        label: 'Pick Mirax Casino if',
        conditions: [
          'The bonus is your primary decision factor ($3,250 + 250 spins is genuinely large)',
          'You\'ll clear the wagering and prefer to skip the 25% bonus-withdrawal admin fee',
          'You want the larger raw game library (7,000+ titles)',
          'You want XRP support (Mirax has it, BitStarz doesn\'t)',
        ],
      },
      {
        casinoSlug: 'bitstarz',
        label: 'Pick BitStarz if',
        conditions: [
          'You want the established brand reputation and award track record',
          'You value the faster 9.5/10 withdrawal score',
          'You want the broadest provider curation (100+ providers)',
          'You can model the 25% bonus admin fee into your math',
        ],
      },
    ],
    verdict:
      "The bonus is the visible difference; the operator history is the structural one. Mirax delivers a larger headline welcome with a cleaner withdrawal-fee structure, but BitStarz brings 12 years of standalone reputation, a faster withdrawal pipeline, and a more decorated brand. If the bonus is your primary deciding factor and you'll clear the wagering, Mirax is the better pick — particularly because BitStarz's 25% admin fee on bonus withdrawals erodes its headline. If brand longevity and slightly faster withdrawals matter more, BitStarz wins on those exact dimensions. Both are legitimate Curaçao-licensed operators with proven payout infrastructure.",
    faqs: [
      {
        question: 'Which has the bigger welcome bonus, Mirax or BitStarz?',
        answer: 'Mirax: 325% across four deposits up to $3,250 + 250 free spins. BitStarz: 5 BTC + 200 free spins across four deposits. On BTC headline at current prices, BitStarz is larger in raw fiat terms. After the 25% admin fee BitStarz applies to bonus-related withdrawals — which Mirax doesn\'t — the effective values converge. For players who\'ll actually clear the wagering and withdraw, Mirax often delivers more to the wallet.',
      },
      {
        question: 'Is Mirax Casino part of the 7Bit network?',
        answer: 'Yes — Mirax Casino launched in 2022 as part of the 7Bit Partners network, which has been operating other established casino brands since 2014 (including 7Bit Casino itself). The backbone is proven; the Mirax-specific brand is newer. This is the operator-history structural difference versus BitStarz, which has run as a standalone brand since 2014.',
      },
      {
        question: 'Does BitStarz really charge 25% on bonus withdrawals?',
        answer: 'Yes — BitStarz documents a 25% admin fee on bonus-related withdrawals in its terms. This is flagged in our BitStarz review as the catch most players don\'t see coming. If you clear a welcome or reload bonus and want to withdraw the resulting winnings, 25% comes off at the cashier. Mirax doesn\'t apply the same structure on bonus winnings.',
      },
      {
        question: 'Which has more cryptocurrencies, Mirax or BitStarz?',
        answer: 'Mirax accepts 7 cryptocurrencies (BTC, ETH, USDT, LTC, DOGE, BCH, XRP); BitStarz accepts 6 (BTC, ETH, LTC, DOGE, BCH, USDT). Mirax adds XRP. Both cover the major coins. Neither approaches BC.Game\'s 100+ coin coverage — for broad altcoin holders, both fall short on this dimension.',
      },
      {
        question: 'Which has the bigger game library?',
        answer: 'Mirax: 7,000+ titles from Evolution, Pragmatic Play, NetEnt and other top-tier providers. BitStarz: 3,000+ titles but from 100+ providers — the broadest provider curation in our reviews. Raw count favours Mirax; provider diversity favours BitStarz. Whether quantity or curation matters more depends on whether you tend to play across many providers or stick to a few favourites.',
      },
    ],
  },
}
