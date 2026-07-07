import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 2026-07-07 spam-update consolidation: merged pages 301 to the page
      // that absorbed their content. See STATE.md decisions log for the
      // per-page redundancy verdicts.
      {
        source: '/guides/fastest-casino-payout-methods',
        // Chain collapsed 2026-07-07: previously pointed at the withdrawals
        // guide, which itself now redirects below.
        destination: '/fast-withdrawal-casinos',
        permanent: true,
      },
      {
        source: '/guides/how-crypto-casino-withdrawals-work',
        destination: '/fast-withdrawal-casinos',
        permanent: true,
      },
      { source: '/best-bitcoin-casino-germany', destination: '/country/germany', permanent: true },
      { source: '/best-bitcoin-casino-finland', destination: '/country/finland', permanent: true },
      { source: '/best-bitcoin-casino-ireland', destination: '/country/ireland', permanent: true },
      { source: '/best-bitcoin-casino-norway', destination: '/country/norway', permanent: true },
      { source: '/best-bitcoin-casino-sweden', destination: '/country/sweden', permanent: true },
      { source: '/best-bitcoin-casino-new-zealand', destination: '/country/new-zealand', permanent: true },
      { source: '/game/slots', destination: '/game', permanent: true },
      { source: '/game/blackjack', destination: '/game', permanent: true },
      { source: '/game/roulette', destination: '/game', permanent: true },
      { source: '/game/live-dealer', destination: '/game', permanent: true },
      { source: '/crypto/usdc', destination: '/crypto/usdt', permanent: true },
      { source: '/crypto/litecoin', destination: '/crypto', permanent: true },
      { source: '/no-limit-withdrawal-casinos', destination: '/high-roller-casinos', permanent: true },
      { source: '/reviews/mirax-casino/withdrawal', destination: '/reviews/mirax-casino', permanent: true },
      {
        source: '/guides/best-crypto-for-gambling-2026',
        destination: '/guides/best-crypto-for-gambling',
        permanent: true,
      },
      // Reverse-order /compare/* recovery (added 2026-06-20). The 2026-05-21
      // de-templating (commit f9c97d4) kept these three matchups live in one
      // slug order but Google had indexed the opposite order, which now 404s.
      // 301 each stale reverse-order URL to its live canonical so the existing
      // ranking signal consolidates onto the page that exists. These are the
      // only reverse-of-a-live-pair cases; the other 37 dropped pairs are the
      // intended de-templating result and are left to age out as 404s.
      {
        source: '/compare/bitstarz-vs-7bit-casino',
        destination: '/compare/7bit-casino-vs-bitstarz',
        permanent: true,
      },
      {
        source: '/compare/bitstarz-vs-cloudbet',
        destination: '/compare/cloudbet-vs-bitstarz',
        permanent: true,
      },
      {
        source: '/compare/bitstarz-vs-mirax-casino',
        destination: '/compare/mirax-casino-vs-bitstarz',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
