// USDC and LTC removed 2026-07-07 (spam-update consolidation). USDC was a
// near-duplicate of the USDT page (same one-paragraph-over-grid structure,
// same "stablecoin for gambling" intent); its content is folded into the
// USDT page, which now covers both stablecoins, and /crypto/usdc 301s there.
// Litecoin's page was a generic coin-facts paragraph over the identical
// all-casino grid (26 imp in 45 days); its content is folded into the
// /crypto hub and /crypto/litecoin 301s there.
export const CRYPTO_LIST = [
  { symbol: 'BTC', name: 'Bitcoin', slug: 'bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', slug: 'ethereum' },
  { symbol: 'USDT', name: 'Tether', slug: 'usdt' },
  { symbol: 'DOGE', name: 'Dogecoin', slug: 'dogecoin' },
  { symbol: 'SOL', name: 'Solana', slug: 'solana' },
  { symbol: 'BNB', name: 'BNB', slug: 'bnb' },
]

export const COUNTRY_LIST = [
  { name: 'Canada', slug: 'canada', currency: 'CAD' },
  { name: 'Australia', slug: 'australia', currency: 'AUD' },
  { name: 'New Zealand', slug: 'new-zealand', currency: 'NZD' },
  { name: 'Ireland', slug: 'ireland', currency: 'EUR' },
  { name: 'Germany', slug: 'germany', currency: 'EUR' },
  { name: 'Netherlands', slug: 'netherlands', currency: 'EUR' },
  { name: 'Norway', slug: 'norway', currency: 'NOK' },
  { name: 'Sweden', slug: 'sweden', currency: 'SEK' },
  { name: 'Finland', slug: 'finland', currency: 'EUR' },
  { name: 'Japan', slug: 'japan', currency: 'JPY' },
]

// Poker removed 2026-05-30: no operator in the catalogue is a genuine
// top pick for poker (Evolution live poker is available but the table-game
// wagering-contribution profile is poor for any player using a welcome
// bonus, and PvP poker is delegated to specialist rooms outside our review
// scope: CoinPoker, SwC Poker). Per CLAUDE.md <2-genuine-fits refusal rule,
// /game/poker should not exist. The dynamic [slug] route 404s via its
// notFound() guard when the slug is absent from this array. See the
// strategic decisions log in CLAUDE.md for context.
// Slots/Blackjack/Roulette/Live Dealer removed 2026-07-07 (spam-update
// consolidation): each was one unique paragraph over an identical unfiltered
// all-casino grid, failing CLAUDE.md's own body-swap templating test. Their
// content lives on /game as anchored sections; the old URLs 301 there via
// next.config.ts. The three remaining formats are crypto-native with
// dedicated static pages and earned demand (dice 187 imp / plinko 68 imp in
// the pre-suppression clean window).
export const GAME_TYPES = [
  { name: 'Crash', slug: 'crash' },
  { name: 'Dice', slug: 'dice' },
  { name: 'Plinko', slug: 'plinko' },
]

export const BONUS_TYPES = [
  { name: 'Welcome Bonus', slug: 'welcome-bonus' },
  { name: 'No Deposit Bonus', slug: 'no-deposit-bonus' },
  { name: 'Reload Bonus', slug: 'reload-bonus' },
  { name: 'Cashback', slug: 'cashback' },
  { name: 'Free Spins', slug: 'free-spins' },
  { name: 'VIP Bonus', slug: 'vip-bonus' },
  { name: 'High Roller Bonus', slug: 'high-roller-bonus' },
]
