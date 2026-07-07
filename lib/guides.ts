export type Guide = {
  title: string
  slug: string
  description: string
  readTime: string
  category: string
}

// 'how-crypto-casino-withdrawals-work' removed 2026-07-07 (spam-update
// consolidation): the page was one of the three the June 2026 spam update
// dropped from the index, and its explainer content strengthens the
// commercial page that owns the withdrawal-speed intent. Content folded
// into /fast-withdrawal-casinos#how-withdrawals-work; old URL 301s there
// via next.config.ts. Its content blocks in app/guides/[slug]/page.tsx are
// unreachable and retained for reference (poker-content precedent).
export const guides: Guide[] = [
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
