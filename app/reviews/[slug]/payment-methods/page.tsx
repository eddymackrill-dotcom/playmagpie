import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import CTAButton from '@/components/CTAButton'

const PAYMENT_METHODS_SLUGS = ['cloudbet', 'bitstarz', 'bc-game'] as const

export function generateStaticParams() {
  return PAYMENT_METHODS_SLUGS.map((slug) => ({ slug }))
}

const META: Record<(typeof PAYMENT_METHODS_SLUGS)[number], { title: string; description: string }> = {
  cloudbet: {
    title: 'Cloudbet Payment Methods 2026: 29 Cryptos, ~$1 Minimum, Fiat Rails',
    description:
      'Cloudbet accepts 29 cryptocurrencies at a ~$1 equivalent minimum deposit, plus fiat deposits via Jeton and Vega. Network-by-network breakdown of the major coins and where the dual Curaçao + Kahnawake licence matters at deposit time.',
  },
  bitstarz: {
    title: 'BitStarz Payment Methods 2026: 6 Cryptos, $20 Minimum Deposit',
    description:
      'BitStarz takes six cryptocurrencies (BTC, ETH, LTC, DOGE, BCH, USDT) at a $20 minimum, plus a fiat path that triggers KYC. Per-coin deposit speeds, why there is no Solana or BNB, and what opting your first deposit into the welcome bonus really costs.',
  },
  'bc-game': {
    title: 'BC.Game Payment Methods 2026: 100+ Cryptos, $5 Minimum, No KYC',
    description:
      'BC.Game accepts 100+ cryptocurrencies at a $5 minimum deposit with no KYC at any size. The widest coin lineup and lowest floor in our catalogue, the network-by-network breakdown, and how the 220% rakeback welcome scales from a $5 deposit.',
  },
}

type PaymentMethodsPageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata(
  props: PaymentMethodsPageProps,
): Promise<Metadata> {
  const { slug } = await props.params
  if (!(PAYMENT_METHODS_SLUGS as readonly string[]).includes(slug)) return {}
  const meta = META[slug as (typeof PAYMENT_METHODS_SLUGS)[number]]
  const canonical = `/reviews/${slug}/payment-methods`
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: meta.title,
      description: meta.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
  }
}

export default async function PaymentMethodsPage(props: PaymentMethodsPageProps) {
  const { slug } = await props.params
  if (!(PAYMENT_METHODS_SLUGS as readonly string[]).includes(slug)) notFound()
  const casino = getCasinoBySlug(slug)
  if (!casino) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: casino.name,
        item: `https://www.playmagpie.com/reviews/${casino.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Payment Methods',
        item: `https://www.playmagpie.com/reviews/${casino.slug}/payment-methods`,
      },
    ],
  }

  const faqs = slug === 'cloudbet' ? CLOUDBET_FAQS : slug === 'bitstarz' ? BITSTARZ_FAQS : slug === 'bc-game' ? BCGAME_FAQS : []

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/best-crypto-casinos" className="hover:text-white transition-colors">Casinos</Link>
          <span>/</span>
          <Link href={`/reviews/${casino.slug}`} className="hover:text-white transition-colors">{casino.name}</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Payment Methods</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <div>
              <p className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">
                {casino.name}: Payment Methods
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {slug === 'cloudbet' && 'Cloudbet Deposit Options: 29 Cryptos, ~$1 Floor, Fiat via Jeton and Vega'}
                {slug === 'bitstarz' && 'BitStarz Deposit Options: Six Classic Coins, $20 Floor, and the Fiat-vs-Crypto KYC Fork'}
                {slug === 'bc-game' && 'BC.Game Deposit Options: 100+ Coins, a $5 Floor, and No KYC at Any Size'}
              </h1>
              <p className="text-[#555555] text-xs mt-2">
                Last updated: {slug === 'bitstarz' ? 'June 22, 2026' : 'May 26, 2026'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Stat label="Min Deposit" value={casino.minDeposit} />
            {/* BC.Game's acceptedCryptos carries a '100+ more' sentinel entry; show "100+"
                rather than the literal array length (16). No-op for cloudbet/bitstarz. */}
            <Stat label="Cryptos" value={casino.acceptedCryptos.includes('100+ more') ? '100+' : `${casino.acceptedCryptos.length}`} />
            {/* BitStarz is a hybrid crypto+fiat casino; its lib/casinos.ts cons document
                "fiat transactions" that trigger KYC. Cloudbet added fiat deposit rails
                (Jeton/Vega) in 2026, verified against its help centre 2026-07-16. */}
            <Stat label="Fiat" value={slug === 'bitstarz' ? 'Yes · KYC' : slug === 'cloudbet' ? 'Deposits · Jeton/Vega' : 'None'} />
            <Stat label="KYC at Deposit" value={casino.kycLevel === 'Light' ? 'None' : casino.kycLevel} />
          </div>

          <div className="flex gap-3 flex-wrap">
            <CTAButton href={casino.affiliateUrl} label={`Deposit at ${casino.name}`} variant="primary" size="lg" external />
            <CTAButton href={`/reviews/${casino.slug}`} label="Full Review" variant="secondary" size="lg" />
          </div>
        </div>

        {slug === 'cloudbet' && <CloudbetContent />}
        {slug === 'bitstarz' && <BitStarzContent />}
        {slug === 'bc-game' && <BCGameContent />}

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">{casino.name} Payment Methods FAQ</h2>
          <p className="text-[#888888] text-sm mb-8">
            Questions players actually ask about funding {casino.name}.
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

        <section className="mt-12 pt-10 border-t border-[#222222] text-center">
          <p className="text-[#888888] text-sm mb-4">
            Ready to deposit at {casino.name}?
          </p>
          <CTAButton href={casino.affiliateUrl} label={`Visit ${casino.name}`} variant="primary" size="lg" external />
        </section>
      </div>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-3 text-center">
      <div className="text-white font-bold text-sm">{value}</div>
      <div className="text-[#555555] text-xs mt-0.5">{label}</div>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-white mt-12 mb-4">{children}</h2>
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[#bbbbbb] text-base leading-relaxed mb-4">{children}</p>
}

/* ───────────── Cloudbet: lead with the coin lineup, then minimum, then licensing ───────────── */
function CloudbetContent() {
  return (
    <>
      <Para>
        Cloudbet&apos;s payment side is built around 29 cryptocurrencies, and, in a
        real change from its crypto-only years, fiat rails now exist: deposits in
        EUR, JPY, CAD and USD route through the third-party digital wallets Jeton
        and Vega, and an in-platform Swapped integration lets you buy crypto
        directly without an external wallet. For a player already holding crypto,
        the on-chain paths still remove an entire layer of friction (no card
        declines, no MCC blocking, no gambling-descriptor flags). For a player
        who needs to acquire crypto first, the on-ramp decision no longer has to
        happen upstream at an exchange; Swapped handles it at the cashier. Fiat
        support is deposit-side; we have not found a published fiat withdrawal
        route, so plan to cash out in crypto.
      </Para>

      <SectionHeading>The 29-coin lineup: the majors at deposit time</SectionHeading>
      <Para>
        Cloudbet accepts 29 cryptocurrencies for deposits: the majors broken down
        in the table below, plus an altcoin bench (ADA, DOT, LINK, AVAX, TON,
        TRX, XLM, ALGO and others) and a deep stablecoin set (USDT, USDC, DAI,
        USDP, PAXG, USDe). The list is wider than every casino we review except
        BC.Game (100+), a substantial expansion from the curated 10 coins
        Cloudbet ran for years. The table covers the ten highest-volume choices:
      </Para>
      <div className="overflow-x-auto -mx-4 sm:-mx-0 mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#222222]">
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Coin</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Confirmation time</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Fee character</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Deposit notes</th>
            </tr>
          </thead>
          <tbody className="text-[#bbbbbb]">
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">BTC</td>
              <td className="py-3 px-3">~10 min – ~60 min</td>
              <td className="py-3 px-3">Mempool-dependent</td>
              <td className="py-3 px-3">Slowest confirmations in the lineup; ~$1 equivalent minimum applies</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">ETH</td>
              <td className="py-3 px-3">~30s – ~3 min</td>
              <td className="py-3 px-3">Gas-dependent</td>
              <td className="py-3 px-3">Standard ERC-20 flow</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">USDT</td>
              <td className="py-3 px-3">Network-dependent</td>
              <td className="py-3 px-3">TRC-20 cheapest</td>
              <td className="py-3 px-3">Check active network at the cashier</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">USDC</td>
              <td className="py-3 px-3">Network-dependent</td>
              <td className="py-3 px-3">SOL/BSC cheapest</td>
              <td className="py-3 px-3">Same cashier flow as USDT</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">SOL</td>
              <td className="py-3 px-3">~1 – 2 seconds</td>
              <td className="py-3 px-3">Fractions of a cent</td>
              <td className="py-3 px-3">Fastest end-to-end deposit on the platform</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">BNB</td>
              <td className="py-3 px-3">~3 seconds</td>
              <td className="py-3 px-3">Fractions of a cent</td>
              <td className="py-3 px-3">BNB Smart Chain: cheap and fast</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">DOGE</td>
              <td className="py-3 px-3">~1 – 3 min</td>
              <td className="py-3 px-3">Sub-cent</td>
              <td className="py-3 px-3">Cheap, fast, widely held</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">LTC</td>
              <td className="py-3 px-3">~2 – 3 min</td>
              <td className="py-3 px-3">Cents</td>
              <td className="py-3 px-3">Faster than BTC, similar volatility profile</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">BCH</td>
              <td className="py-3 px-3">~10 min</td>
              <td className="py-3 px-3">Cents</td>
              <td className="py-3 px-3">Niche but functional</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-white">USDP</td>
              <td className="py-3 px-3">~3 min (ERC-20)</td>
              <td className="py-3 px-3">Gas-dependent</td>
              <td className="py-3 px-3">NYDFS-supervised stablecoin from Paxos Trust (formerly PAX)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Para>
        Two coins on the list are worth singling out. SOL gives you the fastest
        end-to-end deposit path on the platform: broadcast to credited in
        single-digit seconds, fees too small to notice. BNB on BNB Smart Chain is
        essentially the same profile. If you hold either and are choosing
        between which to deposit, those two beat the rest of the lineup on pure
        cashier mechanics by a wide margin.
      </Para>
      <Para>
        USDP (Pax Dollar, formerly PAX) is the unusual entry. It&apos;s a USD-backed
        stablecoin issued by Paxos Trust, a New York-chartered trust company
        supervised by the NYDFS, and Cloudbet lists PAX Gold (PAXG) alongside it.
        Most crypto casinos don&apos;t offer either. The
        operational complexity of supporting a regulated US-supervised stablecoin
        sits outside the typical Curaçao operator&apos;s comfort zone. That
        Cloudbet does is one of several signals that the platform&apos;s player
        mix skews toward the institutional end of crypto-native rather than the
        retail-degen end.
      </Para>

      <SectionHeading>The deposit floor: ~$1, the lowest in our catalogue</SectionHeading>
      <Para>
        Cloudbet&apos;s minimum deposit is now roughly $1 equivalent, with
        per-coin thresholds shown at the deposit screen. That is a genuine
        reversal: for years the floor sat at 0.001 BTC equivalent, the highest
        entry point among our reviewed casinos, and this page previously read
        that floor as a signal that Cloudbet wasn&apos;t built for small-stakes
        testing. The floor argument is retired. Entry now undercuts BC.Game
        ($5), 7Bit ($10) and BitStarz/Mirax/Shuffle/Duelbits ($10-$20).
      </Para>
      <Para>
        The welcome offer changed in the same direction: the old 100%-up-to-5-BTC
        match is gone, replaced by the $2,500 Welcome Package paid as cash
        rewards (10% casino rakeback plus daily cash drops, no wagering) over
        the first 30 days. What still calibrates Cloudbet toward serious
        bankrolls is the cash-out side: no withdrawal limits once an account is
        fully verified, which is why the withdrawal page leads on that policy. See{' '}
        <Link href="/reviews/cloudbet/withdrawal" className="text-[#7BB8D4] hover:underline">
          the Cloudbet withdrawal page
        </Link>{' '}
        for the cashout side of the equation.
      </Para>

      <SectionHeading>Light KYC at deposit: what it means in practice</SectionHeading>
      <Para>
        Cloudbet runs Light KYC on its account flow. At deposit time specifically,
        no document verification is requested under standard play. Registration
        is email-and-password, deposit address is generated immediately, and
        funds credit to balance on the relevant on-chain confirmation. The Light
        KYC posture only becomes relevant later, at outsized withdrawals, and is
        not part of the deposit funnel for the vast majority of players.
      </Para>
      <Para>
        Players whose entire reason for using crypto casinos is zero-KYC
        anonymity at any size are better matched with{' '}
        <Link href="/reviews/7bit-casino" className="text-[#7BB8D4] hover:underline">7Bit Casino</Link>,
        {' '}
        <Link href="/reviews/bc-game" className="text-[#7BB8D4] hover:underline">BC.Game</Link>{' '}
        or{' '}
        <Link href="/reviews/duelbits" className="text-[#7BB8D4] hover:underline">Duelbits</Link>
        , all of which run no-KYC posture as policy rather than as &quot;light
        until a high threshold&quot;. The category hub is{' '}
        <Link href="/no-kyc-casinos" className="text-[#7BB8D4] hover:underline">our no-KYC casinos page</Link>
        .
      </Para>

      <SectionHeading>Where the dual licence matters at deposit time</SectionHeading>
      <Para>
        Cloudbet holds two licences: Curaçao eGaming and the Kahnawake Gaming
        Commission. The Kahnawake licence imposes additional operational
        requirements that bear directly on deposit funds: most relevantly,
        segregated player-fund handling. Player balances are required to be held
        separately from operating capital, which means a Cloudbet insolvency
        event would not leave depositor funds commingled with creditor claims
        the way a single-Curaçao operator could.
      </Para>
      <Para>
        This is a low-probability backstop (Cloudbet has been operational
        without solvency stress since 2013), but the protection only exists
        because of the second licence. For a player parking a significant
        balance between play sessions, the segregation requirement is the
        material practical difference between Cloudbet and most competitors.
      </Para>

      <SectionHeading>On-ramping: where each coin originates for Cloudbet players</SectionHeading>
      <Para>
        Because Cloudbet has no fiat path, the deposit funnel pushes the
        fiat-to-crypto conversion onto whichever regulated exchange covers your
        jurisdiction. The on-ramp landscape differs by country. See the
        relevant country page for jurisdiction-specific exchange recommendations:
        {' '}
        <Link href="/country/ireland" className="text-[#7BB8D4] hover:underline">Ireland</Link>,{' '}
        <Link href="/country/germany" className="text-[#7BB8D4] hover:underline">Germany</Link>,{' '}
        <Link href="/country/netherlands" className="text-[#7BB8D4] hover:underline">Netherlands</Link>,{' '}
        <Link href="/country/canada" className="text-[#7BB8D4] hover:underline">Canada</Link>,{' '}
        <Link href="/country/australia" className="text-[#7BB8D4] hover:underline">Australia</Link>,{' '}
        <Link href="/country/new-zealand" className="text-[#7BB8D4] hover:underline">New Zealand</Link>,{' '}
        <Link href="/country/norway" className="text-[#7BB8D4] hover:underline">Norway</Link>,{' '}
        <Link href="/country/sweden" className="text-[#7BB8D4] hover:underline">Sweden</Link>,{' '}
        and{' '}
        <Link href="/country/japan" className="text-[#7BB8D4] hover:underline">Japan</Link>
        .
      </Para>
      <Para>
        For stablecoin-first players, USDT on TRC-20 is the lowest-friction
        Cloudbet deposit path in most jurisdictions: cheap on-chain fees, fast
        confirmation, no SEK/EUR/NOK conversion drift between exchange
        withdrawal and casino credit. For coin-first players holding BTC or ETH
        from before depositing, the lineup supports either directly without
        forced conversion.
      </Para>
    </>
  )
}

/* ───────────── BitStarz: lead with the hybrid model + accessibility, then the
   "what's missing" coin angle, then the bonus-wagering cost (the 25% admin-fee
   claim was removed 2026-07-16: verify-or-omit, no such fee in live terms).
   Deliberately a different spine from Cloudbet. ───────────── */
function BitStarzContent() {
  return (
    <>
      <Para>
        BitStarz has been running since 2014, and its deposit side still shows it.
        Where the newer crypto-native casinos built their cashiers around Solana,
        BNB Smart Chain and a wall of stablecoins, BitStarz funds on six coins,
        the original Bitcoin-casino set, and keeps a fiat path that most
        pure-crypto operators dropped years ago. The entry point is low ($20),
        and the practical decision a depositor faces here is less &quot;which of
        forty chains&quot; and more &quot;crypto or fiat&quot;. At BitStarz that
        choice is also a privacy choice.
      </Para>

      <SectionHeading>The six supported coins, and what&apos;s notably missing</SectionHeading>
      <Para>
        BitStarz accepts BTC, ETH, LTC, DOGE, BCH and USDT for deposits. That is
        the classic lineup: Bitcoin, the two early forks (LTC, BCH), the original
        meme-coin (DOGE), Ethereum, and exactly one stablecoin (USDT). It is
        narrower than Cloudbet (10), 7Bit (eight) and Mirax (seven), and far
        narrower than BC.Game (100+). What matters more than the count is the
        absence: there is no Solana, no BNB, and no USDC. If your balance lives on
        Solana or BNB Smart Chain, BitStarz can&apos;t take it directly: you
        convert upstream before you deposit. For a USDC holder specifically, USDT
        is the only stablecoin route in.
      </Para>
      <div className="overflow-x-auto -mx-4 sm:-mx-0 mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#222222]">
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Coin</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Confirmation time</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Fee character</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Deposit notes</th>
            </tr>
          </thead>
          <tbody className="text-[#bbbbbb]">
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">BTC</td>
              <td className="py-3 px-3">~10 min – ~60 min</td>
              <td className="py-3 px-3">Mempool-dependent</td>
              <td className="py-3 px-3">$20 min ≈ 0.0003 BTC; one confirmation to credit</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">ETH</td>
              <td className="py-3 px-3">~30s – ~3 min</td>
              <td className="py-3 px-3">Gas-dependent</td>
              <td className="py-3 px-3">Standard ERC-20 flow</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">LTC</td>
              <td className="py-3 px-3">~2 – 3 min</td>
              <td className="py-3 px-3">Cents</td>
              <td className="py-3 px-3">Fastest practical deposit in the BitStarz lineup</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">DOGE</td>
              <td className="py-3 px-3">~1 – 3 min</td>
              <td className="py-3 px-3">Sub-cent</td>
              <td className="py-3 px-3">Cheap and quick; widely held</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">BCH</td>
              <td className="py-3 px-3">~10 min</td>
              <td className="py-3 px-3">Cents</td>
              <td className="py-3 px-3">Functional but niche; slower than LTC/DOGE</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-white">USDT</td>
              <td className="py-3 px-3">Network-dependent</td>
              <td className="py-3 px-3">TRC-20 cheapest</td>
              <td className="py-3 px-3">Only stablecoin accepted; confirm the active network at the cashier</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading>The $20 minimum and the crypto-vs-fiat fork</SectionHeading>
      <Para>
        BitStarz&apos;s minimum deposit is $20, or roughly 0.0003 BTC at current
        rates. That is a low, accessible floor, the same as Mirax, above 7Bit
        ($10), BC.Game ($5) and Cloudbet (~$1 equivalent since its 2026 floor
        cut). The intent is clear either way: BitStarz wants you in at small
        stakes to test the cashier, not to pre-qualify a bankroll. No deposit
        fee is charged by BitStarz on either side; only the blockchain network
        fee applies on crypto.
      </Para>
      <Para>
        Unlike the pure-crypto operators we review, BitStarz keeps a fiat path
        alongside crypto. The catch is the one our review flags: fiat
        transactions trigger KYC. A crypto deposit under BitStarz&apos;s
        verification thresholds stays document-free; choosing the fiat route
        pulls identity verification forward into the deposit funnel. So at
        BitStarz the deposit method is also a privacy decision: the crypto path
        is the light-KYC path, the fiat path is not.
      </Para>

      <SectionHeading>Which BitStarz coin deposits fastest</SectionHeading>
      <Para>
        Because the lineup has no Solana and no BNB Smart Chain, there is no
        single-digit-second deposit option here the way there is at Cloudbet or
        BC.Game. The practical speed champions are Litecoin and Dogecoin, both
        clearing in roughly one to three minutes for fractions of a cent.
        Ethereum is comparable when gas is calm. USDT&apos;s speed depends
        entirely on the network you send on. TRC-20 is the cheapest and quickest
        common route, but always confirm the active network shown at the cashier
        before sending, because sending on the wrong chain is the one
        unrecoverable deposit mistake. Bitcoin is the slowest of the six, gated by
        mainnet block times rather than anything BitStarz controls.
      </Para>

      <SectionHeading>Depositing to claim the 5 BTC welcome: the real cost is the wagering</SectionHeading>
      <Para>
        Most first deposits at BitStarz exist to trigger the welcome package: up
        to 5 BTC plus 180 free spins spread across the first four deposits, with
        20 spins credited instantly on deposit one and 20 per day across the
        following eight days. The BTC ceiling ties Mirax and is one of the larger
        match offers we cover. On fees the live terms are clean: BitStarz charges
        nothing on deposits or withdrawals. The real cost of the package is the
        playthrough: match-bonus wagering can run to 40x, and until it clears the
        bonus balance and its winnings are locked. If you deposit purely to play
        your own funds, none of that applies. The cash-out mechanics are covered on{' '}
        <Link href="/reviews/bitstarz/withdrawal" className="text-[#7BB8D4] hover:underline">
          the BitStarz withdrawal page
        </Link>
        , worth reading before you decide whether to opt the deposit into the
        bonus at all.
      </Para>

      <SectionHeading>KYC at deposit time</SectionHeading>
      <Para>
        On the crypto path, BitStarz runs Light KYC: registration is
        email-and-password, a deposit address is generated immediately, and funds
        credit after the relevant on-chain confirmation. No documents are
        requested for standard crypto deposits below BitStarz&apos;s verification
        thresholds. Identity verification is reserved for larger fiat withdrawals
        and compliance-flagged accounts. See{' '}
        <Link href="/reviews/bitstarz/kyc" className="text-[#7BB8D4] hover:underline">
          the BitStarz KYC page
        </Link>{' '}
        for exactly what triggers it. Players who want zero verification at any
        size, on any path, are a better fit for a policy-level no-KYC operator
        like{' '}
        <Link href="/reviews/bc-game" className="text-[#7BB8D4] hover:underline">BC.Game</Link>{' '}
        or{' '}
        <Link href="/reviews/7bit-casino" className="text-[#7BB8D4] hover:underline">7Bit Casino</Link>
        ; the category hub is{' '}
        <Link href="/no-kyc-casinos" className="text-[#7BB8D4] hover:underline">our no-KYC casinos page</Link>
        .
      </Para>

      <SectionHeading>On-ramping the six coins by jurisdiction</SectionHeading>
      <Para>
        Whether you take the crypto path or convert fiat to crypto first, the
        on-ramp is a regulated exchange in your jurisdiction, and because
        BitStarz won&apos;t accept Solana or BNB, SOL/BNB holders have an extra
        conversion step before depositing. The exchange landscape differs by
        country; see the relevant country page for jurisdiction-specific on-ramp
        notes:{' '}
        <Link href="/country/canada" className="text-[#7BB8D4] hover:underline">Canada</Link>,{' '}
        <Link href="/country/ireland" className="text-[#7BB8D4] hover:underline">Ireland</Link>,{' '}
        <Link href="/country/germany" className="text-[#7BB8D4] hover:underline">Germany</Link>,{' '}
        <Link href="/country/netherlands" className="text-[#7BB8D4] hover:underline">Netherlands</Link>,{' '}
        <Link href="/country/new-zealand" className="text-[#7BB8D4] hover:underline">New Zealand</Link>,{' '}
        <Link href="/country/norway" className="text-[#7BB8D4] hover:underline">Norway</Link>{' '}
        and{' '}
        <Link href="/country/sweden" className="text-[#7BB8D4] hover:underline">Sweden</Link>
        . For a stablecoin-first depositor, USDT on TRC-20 is the lowest-friction
        route in; for a coin-first depositor already holding BTC, ETH or LTC, the
        lineup takes those directly with no forced conversion.
      </Para>
    </>
  )
}

/* ───────────── BC.Game: the opposite end of the spectrum from Cloudbet. Lead with the
   100+ coin breadth, then the $5 floor, then the policy-level no-KYC posture. Deliberately
   inverts the Cloudbet spine (institutional licensing + verification-gated no-limit cashier;
   the old "curated 10 / high floor" halves of the contrast retired 2026-07-16 when Cloudbet
   expanded to 29 coins and cut its floor to ~$1) so the two pages read as mirror images
   rather than a name-swap. ───────────── */
function BCGameContent() {
  return (
    <>
      <Para>
        If Cloudbet&apos;s cashier is built around institutional-grade licensing and a
        verification-gated no-limit withdrawal policy, BC.Game&apos;s is the opposite design:
        breadth and anonymity first. It funds on 100+ cryptocurrencies, opens at a $5 minimum,
        and asks for no identity documents at any deposit or withdrawal size under the standard
        flow. The whole payment side is calibrated for accessibility, which is exactly why it
        suits a different player: someone who wants to deposit whatever coin they happen to
        hold, at whatever size, without attaching a name to it.
      </Para>

      <SectionHeading>100+ coins: the widest cashier in our catalogue</SectionHeading>
      <Para>
        BC.Game accepts over 100 cryptocurrencies for deposits and withdrawals, by a wide margin the
        broadest lineup of any casino we review (Cloudbet runs 29, Shuffle and Duelbits 12, BitStarz
        six). Most players will only ever use the majors, so the table below covers the named
        high-volume chains and what each means at deposit time. The long tail beyond them matters in
        one specific case: if you hold an altcoin that most casinos simply will not take, BC.Game
        very likely does, which removes the upstream conversion step that every narrower cashier
        forces on you.
      </Para>
      <div className="overflow-x-auto -mx-4 sm:-mx-0 mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#222222]">
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Coin</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Confirmation time</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Fee character</th>
              <th className="text-left py-3 px-3 text-[#888888] font-semibold">Deposit notes</th>
            </tr>
          </thead>
          <tbody className="text-[#bbbbbb]">
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">BTC</td>
              <td className="py-3 px-3">~10 min – ~60 min</td>
              <td className="py-3 px-3">Mempool-dependent</td>
              <td className="py-3 px-3">$5 min ≈ a fraction of the network fee on a busy day; size up accordingly</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">ETH</td>
              <td className="py-3 px-3">~30s – ~3 min</td>
              <td className="py-3 px-3">Gas-dependent</td>
              <td className="py-3 px-3">Standard ERC-20 flow</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">USDT</td>
              <td className="py-3 px-3">Network-dependent</td>
              <td className="py-3 px-3">TRC-20 cheapest</td>
              <td className="py-3 px-3">Confirm the active network at the cashier before sending</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">USDC</td>
              <td className="py-3 px-3">Network-dependent</td>
              <td className="py-3 px-3">SOL/BSC cheapest</td>
              <td className="py-3 px-3">Same cashier flow as USDT</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">SOL</td>
              <td className="py-3 px-3">~1 – 2 seconds</td>
              <td className="py-3 px-3">Fractions of a cent</td>
              <td className="py-3 px-3">Among the fastest deposits on the platform</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">BNB</td>
              <td className="py-3 px-3">~3 seconds</td>
              <td className="py-3 px-3">Fractions of a cent</td>
              <td className="py-3 px-3">BNB Smart Chain (BEP-20): cheap and fast</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">TRX</td>
              <td className="py-3 px-3">~1 min</td>
              <td className="py-3 px-3">Sub-cent</td>
              <td className="py-3 px-3">Tron: the rail under cheap TRC-20 USDT</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">XRP</td>
              <td className="py-3 px-3">~3 – 5 seconds</td>
              <td className="py-3 px-3">Fractions of a cent</td>
              <td className="py-3 px-3">Fast and cheap; remember the destination tag if your wallet uses one</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">LTC</td>
              <td className="py-3 px-3">~2 – 3 min</td>
              <td className="py-3 px-3">Cents</td>
              <td className="py-3 px-3">Faster than BTC, widely held</td>
            </tr>
            <tr className="border-b border-[#222222]">
              <td className="py-3 px-3 font-medium text-white">DOGE</td>
              <td className="py-3 px-3">~1 – 3 min</td>
              <td className="py-3 px-3">Sub-cent</td>
              <td className="py-3 px-3">Cheap, quick, pairs well with the $5 floor</td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-medium text-white">100+ more</td>
              <td className="py-3 px-3">Varies</td>
              <td className="py-3 px-3">Varies</td>
              <td className="py-3 px-3">ADA, MATIC, BCH, ETC, DASH and a long altcoin tail beyond the majors</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Para>
        For pure cashier speed, SOL, BNB, XRP and TRX all settle in single-digit seconds for fees too
        small to notice. If you are choosing between coins you already hold, those beat BTC and LTC on
        deposit mechanics by a wide margin. The stablecoin route most BC.Game players default to is
        USDT on TRC-20: cheap, fast, and no conversion drift between exchange withdrawal and casino
        credit.
      </Para>

      <SectionHeading>The $5 minimum: coffee-money entry</SectionHeading>
      <Para>
        BC.Game&apos;s $5 minimum deposit sits at the accessible end of our catalogue: below 7Bit
        ($10) and well below BitStarz and Mirax ($20). Only Cloudbet&apos;s ~$1 equivalent floor
        (cut in 2026 from its old 0.001 BTC gate) is lower. The floor is a statement of intent:
        BC.Game wants you in at the price of a coffee to try the cashier and the originals before
        committing anything real, and it pairs that entry point with the no-document posture no
        other low-floor cashier here offers.
      </Para>
      <Para>
        The low floor also reads coherently against the welcome offer. BC.Game&apos;s 220% Deposit
        Rakeback Welcome runs across four monthly stages and unlocks from a locked balance as you
        wager, with the same $5 minimum applying. So a cautious player can start the rakeback ladder
        with a single $5 deposit rather than having to size a large first deposit to qualify, which is
        the opposite trade-off to a big up-front match. How that locked balance unlocks, and how it
        differs from a straight match bonus, is covered in the{' '}
        <Link href="/reviews/bc-game" className="text-[#7BB8D4] hover:underline">
          full BC.Game review
        </Link>.
      </Para>

      <SectionHeading>No KYC at any size: the real distinction at the cashier</SectionHeading>
      <Para>
        This is where BC.Game separates from the two payment pages already on this site. Cloudbet and
        BitStarz both run Light KYC, meaning no documents at deposit but verification reserved for
        outsized withdrawals. BC.Game&apos;s posture is different in kind, not degree: it is no-KYC as
        policy. You sign up with an email, a deposit address is generated immediately, and no identity
        documents are requested at deposit or at withdrawal under standard play, at any size. For a
        player whose entire reason for using a crypto casino is keeping their identity off the
        transaction, that policy-level commitment is the deposit-side feature that matters most.
      </Para>
      <Para>
        The honest caveat is the same one that applies to any no-KYC operator: a no-KYC policy is a
        policy, and an operator can still trigger checks if anti-fraud or anti-money-laundering rules
        force its hand on a flagged account. The practical reality for the ordinary player is that the
        deposit funnel is document-free. BC.Game sits alongside{' '}
        <Link href="/reviews/7bit-casino" className="text-[#7BB8D4] hover:underline">7Bit Casino</Link>{' '}
        and{' '}
        <Link href="/reviews/duelbits" className="text-[#7BB8D4] hover:underline">Duelbits</Link>{' '}
        as the catalogue&apos;s policy-level no-KYC options; the category hub is{' '}
        <Link href="/no-kyc-casinos" className="text-[#7BB8D4] hover:underline">our no-KYC casinos page</Link>.
      </Para>

      <SectionHeading>No fiat path: where each coin originates</SectionHeading>
      <Para>
        Like Cloudbet, BC.Game has no card, SEPA or bank-wire route. Every deposit runs on-chain, so
        the fiat-to-crypto conversion happens upstream on a regulated exchange in your jurisdiction
        before the BC.Game deposit. The wide coin support means you rarely have to convert twice: buy
        whatever the exchange offers, send it on-chain, and the cashier almost certainly takes it. The
        on-ramp landscape differs by country, so see the relevant country page for jurisdiction-specific
        exchange notes:{' '}
        <Link href="/country/canada" className="text-[#7BB8D4] hover:underline">Canada</Link>,{' '}
        <Link href="/country/ireland" className="text-[#7BB8D4] hover:underline">Ireland</Link>,{' '}
        <Link href="/country/germany" className="text-[#7BB8D4] hover:underline">Germany</Link>,{' '}
        <Link href="/country/new-zealand" className="text-[#7BB8D4] hover:underline">New Zealand</Link>,{' '}
        <Link href="/country/norway" className="text-[#7BB8D4] hover:underline">Norway</Link>{' '}
        and{' '}
        <Link href="/country/sweden" className="text-[#7BB8D4] hover:underline">Sweden</Link>.
      </Para>
    </>
  )
}

const CLOUDBET_FAQS = [
  {
    question: 'What is the minimum deposit at Cloudbet?',
    answer:
      "Cloudbet's minimum deposit is now roughly $1 equivalent, with per-coin thresholds shown at the deposit screen. That is the lowest floor among the casinos we review, under BC.Game ($5), 7Bit ($10) and BitStarz/Mirax ($20), and a reversal of the long-standing 0.001 BTC gate. Cloudbet's serious-bankroll positioning now rests on the withdrawal side (no limits for fully verified accounts), not on a deposit floor.",
  },
  {
    question: 'Does Cloudbet accept fiat deposits: cards, SEPA, bank wire?',
    answer:
      "Yes, as of 2026. Cloudbet accepts fiat deposits in EUR, JPY, CAD and USD through the third-party digital wallets Jeton and Vega, and an in-platform Swapped integration lets you buy crypto directly at the cashier. There is still no direct card or SEPA route, and we have found no published fiat withdrawal path, so plan to cash out in crypto. For players already holding crypto, the 29 on-chain deposit routes remain the lowest-friction option.",
  },
  {
    question: 'Which Cloudbet coin gives the fastest deposit credit?',
    answer:
      "SOL is the fastest end-to-end deposit path on Cloudbet: broadcast to credited typically in single-digit seconds, with fees in fractions of a cent. BNB on BNB Smart Chain is essentially identical in profile. USDT or USDC on a fast network (the active network is shown at the cashier when you generate a deposit address) are the next-fastest stablecoin options. BTC is the slowest because of Bitcoin mainnet confirmation times.",
  },
  {
    question: 'Why does Cloudbet support USDP when most casinos don\'t?',
    answer:
      "USDP (Pax Dollar, formerly PAX) is a USD-backed stablecoin issued by Paxos Trust, a New York-chartered trust company supervised by the NYDFS; Cloudbet lists PAX Gold (PAXG) alongside it. Most crypto casinos avoid Paxos assets because supporting a US-supervised stablecoin adds operational complexity that doesn't fit the typical Curaçao operator's comfort zone. That Cloudbet does is one of several signals (alongside the dual Kahnawake licence) that the player mix skews toward the institutional-comfort end of crypto-native rather than the retail-degen end.",
  },
  {
    question: 'Will Cloudbet ask for ID at deposit?',
    answer:
      "No. Cloudbet runs Light KYC, but Light KYC at Cloudbet means no document verification is requested at deposit time under standard play. Registration is email-and-password, the deposit address is generated immediately, and funds credit to balance on the relevant on-chain confirmation. The Light KYC posture only becomes relevant later, at outsized withdrawals, and is not part of the deposit funnel for the vast majority of players.",
  },
] as const

const BITSTARZ_FAQS = [
  {
    question: 'What is the minimum deposit at BitStarz?',
    answer:
      "BitStarz's minimum deposit is $20, or roughly 0.0003 BTC at current rates, and it applies across all six supported cryptocurrencies. That's a low, accessible floor: level with Mirax, above 7Bit ($10), BC.Game ($5) and Cloudbet (~$1 equivalent). Crypto deposits credit after one blockchain confirmation. BitStarz charges no deposit fee on either the crypto or fiat side; on crypto, only the standard network fee applies.",
  },
  {
    question: 'Does BitStarz accept fiat, or is it crypto-only?',
    answer:
      "BitStarz is a hybrid casino: it keeps a fiat path alongside its six supported cryptos, where several operators we review (BC.Game, 7Bit) are crypto-only. The trade-off is privacy. Fiat transactions at BitStarz trigger KYC, whereas a standard crypto deposit below BitStarz's verification thresholds stays document-free. So the deposit method is also a privacy decision: pick the crypto path if keeping verification light is the priority.",
  },
  {
    question: 'Which BitStarz coin deposits fastest?',
    answer:
      "Litecoin and Dogecoin are the practical speed champions at BitStarz, both clearing in roughly one to three minutes for fractions of a cent. Ethereum is comparable when gas is calm. Because BitStarz's lineup has no Solana or BNB Smart Chain, there's no single-digit-second deposit option here the way there is at Cloudbet or BC.Game. USDT's speed depends on the network you send on, and TRC-20 is cheapest and quickest. Bitcoin is the slowest of the six, gated by mainnet block times.",
  },
  {
    question: 'Can I deposit Solana or BNB at BitStarz?',
    answer:
      "No. BitStarz accepts six coins for deposits (BTC, ETH, LTC, DOGE, BCH and USDT), and Solana and BNB are not among them. There is also no USDC; USDT is the only stablecoin route in. If your balance lives on Solana or BNB Smart Chain, you'll need to convert to one of the six supported coins on a regulated exchange before depositing. Players who want native Solana or BNB deposits should look at Cloudbet or BC.Game instead, both of which support those chains directly.",
  },
  {
    question: 'Does depositing to claim the BitStarz welcome bonus cost anything extra?',
    answer:
      "Not in fees: per the live BitStarz terms, no fees apply to deposits or withdrawals. What the welcome package (up to 5 BTC plus 180 free spins across your first four deposits) does cost is the playthrough: match-bonus wagering can run to 40x, and the bonus balance and its winnings stay locked until it clears. If you deposit purely to play your own funds, that doesn't apply. The BitStarz withdrawal page covers the cash-out mechanics, worth reading before you opt a deposit into the bonus.",
  },
] as const

const BCGAME_FAQS = [
  {
    question: 'What is the minimum deposit at BC.Game?',
    answer:
      "BC.Game's minimum deposit is $5: below 7Bit ($10) and well below BitStarz and Mirax ($20), with only Cloudbet's ~$1 equivalent floor lower among the casinos we review. The same $5 minimum applies across all supported coins and lets you start the 220% rakeback welcome with a single small deposit rather than sizing a large first deposit to qualify.",
  },
  {
    question: 'How many cryptocurrencies does BC.Game accept?',
    answer:
      "Over 100, by a wide margin the widest lineup of any casino we review (Cloudbet runs 29, Shuffle and Duelbits 12, BitStarz six). The named majors include BTC, ETH, USDT, USDC, SOL, BNB, DOGE, LTC, XRP, TRX, ADA, MATIC and BCH, with a long altcoin tail beyond them. The practical benefit is that if you hold a coin most casinos won't take, BC.Game very likely does, removing an upstream conversion step.",
  },
  {
    question: 'Does BC.Game require KYC to deposit or withdraw?',
    answer:
      "No. BC.Game runs a no-KYC policy: you sign up with an email, a deposit address is generated immediately, and no identity documents are requested at deposit or withdrawal under standard play, at any size. That is a stronger posture than the Light KYC at Cloudbet or BitStarz, which is document-free at deposit but reserves verification for large withdrawals. The standard caveat applies: any operator can still trigger checks if anti-fraud or anti-money-laundering rules force it on a flagged account.",
  },
  {
    question: 'Which BC.Game coin gives the fastest deposit credit?',
    answer:
      "SOL, BNB (on BNB Smart Chain), XRP and TRX all settle in single-digit seconds for fees in fractions of a cent, so they are the fastest deposit paths on the platform. For a stablecoin, USDT on TRC-20 is the cheapest and quickest common route. BTC is the slowest, gated by mainnet block times. Always confirm the active network shown at the cashier before sending, because sending on the wrong chain is the one unrecoverable deposit mistake.",
  },
  {
    question: 'Does BC.Game accept fiat deposits?',
    answer:
      "No. BC.Game is crypto-only: there is no card, SEPA or bank-wire route, so every deposit runs on-chain. The fiat-to-crypto conversion happens upstream on a regulated exchange in your jurisdiction before the BC.Game deposit. Because the cashier accepts 100+ coins, you can usually buy whatever your exchange offers and send it directly without a second conversion.",
  },
] as const
