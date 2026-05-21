import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/guides/fastest-casino-payout-methods',
        destination: '/guides/how-crypto-casino-withdrawals-work',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
