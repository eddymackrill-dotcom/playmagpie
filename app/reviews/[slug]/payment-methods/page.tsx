import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import CTAButton from '@/components/CTAButton'

const PAYMENT_METHODS_SLUGS = ['cloudbet'] as const

export function generateStaticParams() {
  return PAYMENT_METHODS_SLUGS.map((slug) => ({ slug }))
}

const META: Record<(typeof PAYMENT_METHODS_SLUGS)[number], { title: string; description: string }> = {
  cloudbet: {
    title: 'Cloudbet Payment Methods 2026: 10 Cryptos, 0.001 BTC Minimum | PlayMagpie',
    description:
      'Cloudbet accepts 10 cryptocurrencies with a 0.001 BTC equivalent minimum deposit. Network-by-network breakdown, what the higher entry point signals, and where the dual Curaçao + Kahnawake licence matters at deposit time.',
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

  const faqs = slug === 'cloudbet' ? CLOUDBET_FAQS : []

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
                {slug === 'cloudbet' && 'Cloudbet Deposit Options: 10 Cryptos, 0.001 BTC Floor, Dual Regulator'}
              </h1>
              <p className="text-[#555555] text-xs mt-2">Last updated: May 26, 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Stat label="Min Deposit" value={casino.minDeposit} />
            <Stat label="Cryptos" value={`${casino.acceptedCryptos.length}`} />
            <Stat label="Fiat" value="None" />
            <Stat label="KYC at Deposit" value={casino.kycLevel === 'Light' ? 'None' : casino.kycLevel} />
          </div>

          <div className="flex gap-3 flex-wrap">
            <CTAButton href={casino.affiliateUrl} label={`Deposit at ${casino.name}`} variant="primary" size="lg" external />
            <CTAButton href={`/reviews/${casino.slug}`} label="Full Review" variant="secondary" size="lg" />
          </div>
        </div>

        {slug === 'cloudbet' && <CloudbetContent />}

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
        Cloudbet&apos;s payment side is built around 10 cryptocurrencies and exactly
        zero fiat options. There is no card processor, no SEPA route, no bank
        wire, no e-wallet. Every funding path runs on-chain through one of the
        supported coins. For a player already holding crypto, this removes an
        entire layer of friction (no card declines, no MCC blocking, no SEPA
        gambling-descriptor flags). For a player who needs to acquire crypto
        first, it pushes the on-ramp decision back upstream onto whichever
        regulated exchange covers your jurisdiction.
      </Para>

      <SectionHeading>The 10 supported cryptos: what each one means at deposit time</SectionHeading>
      <Para>
        Cloudbet accepts BTC, ETH, USDT, USDC, SOL, BNB, DOGE, LTC, BCH and PAX
        for deposits. The list is wider than BitStarz (six), Mirax (seven) and
        7Bit (eight) but narrower than BC.Game (100+) or Shuffle (12). The
        practical implication of the 10-coin lineup is that the cashier is
        designed around a curated set of high-volume, high-reliability chains
        rather than offering breadth for its own sake.
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
              <td className="py-3 px-3">0.001 BTC minimum sets the deposit floor</td>
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
              <td className="py-3 px-3 font-medium text-white">PAX</td>
              <td className="py-3 px-3">~3 min (ERC-20)</td>
              <td className="py-3 px-3">Gas-dependent</td>
              <td className="py-3 px-3">NYDFS-supervised stablecoin from Paxos Trust</td>
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
        PAX (Paxos Standard) is the unusual entry. It&apos;s a USD-backed
        stablecoin issued by Paxos Trust, a New York-chartered trust company
        supervised by the NYDFS. Most crypto casinos don&apos;t offer PAX. The
        operational complexity of supporting a regulated US-supervised stablecoin
        sits outside the typical Curaçao operator&apos;s comfort zone. That
        Cloudbet does is one of several signals that the platform&apos;s player
        mix skews toward the institutional end of crypto-native rather than the
        retail-degen end.
      </Para>

      <SectionHeading>The 0.001 BTC minimum: what it signals</SectionHeading>
      <Para>
        Cloudbet&apos;s minimum deposit is 0.001 BTC equivalent. That&apos;s a
        meaningfully higher entry point than the rest of our reviewed casinos:
        BC.Game opens at $5, 7Bit at $10, BitStarz/Mirax/Shuffle/Duelbits at $20
        or thereabouts. The floor isn&apos;t accidental. It&apos;s the casino
        signalling that the cashier infrastructure and player support are built
        around larger deposits, with proportionately less volume at the entry
        tier.
      </Para>
      <Para>
        The deposit floor also interacts directly with the 5 BTC welcome bonus
        ceiling. A platform that scales its match offer up to five Bitcoin needs
        a floor above the &quot;deposit $5 to test the cashier&quot; model. The two
        numbers are coherent. Cloudbet&apos;s entire payment side is calibrated
        for serious bankrolls in and serious bankrolls out, which is also why
        the withdrawal page leads on the no-limit policy. See{' '}
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

const CLOUDBET_FAQS = [
  {
    question: 'What is the minimum deposit at Cloudbet?',
    answer:
      "Cloudbet's minimum deposit is 0.001 BTC equivalent across all 10 supported cryptocurrencies. That's a meaningfully higher floor than BC.Game ($5), 7Bit ($10) or BitStarz/Mirax ($20). The higher minimum reflects Cloudbet's positioning toward larger bankrolls: the cashier and support infrastructure are calibrated for serious-bankroll players, not the deposit-$5-to-test profile.",
  },
  {
    question: 'Does Cloudbet accept fiat deposits: cards, SEPA, bank wire?',
    answer:
      "No. Cloudbet's deposit options are 100% cryptocurrency. There is no card processor, no SEPA path, no bank-wire route. Every deposit runs on-chain through one of the 10 supported coins. For players already holding crypto this eliminates card-decline and MCC-blocking friction. For players who need to acquire crypto first, the fiat-to-crypto conversion happens on a regulated exchange in your jurisdiction before the Cloudbet deposit.",
  },
  {
    question: 'Which Cloudbet coin gives the fastest deposit credit?',
    answer:
      "SOL is the fastest end-to-end deposit path on Cloudbet: broadcast to credited typically in single-digit seconds, with fees in fractions of a cent. BNB on BNB Smart Chain is essentially identical in profile. USDT or USDC on a fast network (the active network is shown at the cashier when you generate a deposit address) are the next-fastest stablecoin options. BTC is the slowest because of Bitcoin mainnet confirmation times.",
  },
  {
    question: 'Why does Cloudbet support PAX when most casinos don\'t?',
    answer:
      "PAX (Paxos Standard) is a USD-backed stablecoin issued by Paxos Trust, a New York-chartered trust company supervised by the NYDFS. Most crypto casinos avoid PAX because supporting a US-supervised stablecoin adds operational complexity that doesn't fit the typical Curaçao operator's comfort zone. That Cloudbet does is one of several signals (alongside the dual Kahnawake licence and the 0.001 BTC deposit minimum) that the player mix skews toward the institutional-comfort end of crypto-native rather than the retail-degen end.",
  },
  {
    question: 'Will Cloudbet ask for ID at deposit?',
    answer:
      "No. Cloudbet runs Light KYC, but Light KYC at Cloudbet means no document verification is requested at deposit time under standard play. Registration is email-and-password, the deposit address is generated immediately, and funds credit to balance on the relevant on-chain confirmation. The Light KYC posture only becomes relevant later, at outsized withdrawals, and is not part of the deposit funnel for the vast majority of players.",
  },
] as const
