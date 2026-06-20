import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/guides/fastest-casino-payout-methods',
        destination: '/guides/how-crypto-casino-withdrawals-work',
        permanent: true,
      },
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
