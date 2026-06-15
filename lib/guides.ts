export type Guide = {
  title: string
  slug: string
  description: string
  readTime: string
  category: string
}

export const guides: Guide[] = [
  {
    title: 'How Crypto Casino Withdrawals Work',
    slug: 'how-crypto-casino-withdrawals-work',
    description:
      'Everything you need to know about getting your winnings out fast: from wallet confirmation times to zero-fee chains.',
    readTime: '5 min read',
    category: 'Withdrawals',
  },
  {
    title: 'Best Crypto for Gambling',
    slug: 'best-crypto-for-gambling',
    description:
      'Bitcoin, USDT, SOL, TRX: which cryptocurrency gives you the fastest withdrawals and lowest fees at online casinos?',
    readTime: '6 min read',
    category: 'Crypto',
  },
  {
    title: 'How Casino Bonuses Really Work',
    slug: 'how-casino-bonuses-really-work',
    description:
      'Cut through the marketing speak. We break down wagering requirements, bonus caps, game contributions and what actually makes a bonus worth taking.',
    readTime: '8 min read',
    category: 'Bonuses',
  },
  {
    title: 'Bitcoin vs USDT Casinos: Which is Better?',
    slug: 'bitcoin-vs-usdt-casinos',
    description:
      'BTC is the most accepted, USDT is the most stable. Which one should you use for deposits, withdrawals and big wins? We compare them head-to-head.',
    readTime: '5 min read',
    category: 'Crypto',
  },
  {
    title: 'Do Crypto Casinos Require KYC?',
    slug: 'do-crypto-casinos-require-kyc',
    description:
      'Some crypto casinos demand ID, others never ask. We break down which operators require KYC, which run no-KYC, what triggers a verification check, and which documents you’ll be asked for.',
    readTime: '6 min read',
    category: 'KYC',
  },
]
