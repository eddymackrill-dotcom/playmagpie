export const CRYPTO_LIST = [
  { symbol: 'BTC', name: 'Bitcoin', slug: 'bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', slug: 'ethereum' },
  { symbol: 'USDT', name: 'Tether', slug: 'usdt' },
  { symbol: 'USDC', name: 'USD Coin', slug: 'usdc' },
  { symbol: 'LTC', name: 'Litecoin', slug: 'litecoin' },
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
export const GAME_TYPES = [
  { name: 'Slots', slug: 'slots' },
  { name: 'Blackjack', slug: 'blackjack' },
  { name: 'Roulette', slug: 'roulette' },
  { name: 'Live Dealer', slug: 'live-dealer' },
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
