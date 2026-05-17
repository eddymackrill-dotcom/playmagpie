import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCasinoBySlug } from '@/lib/casinos'
import CTAButton from '@/components/CTAButton'

const WITHDRAWAL_SLUGS = ['bitstarz', 'mirax-casino', '7bit-casino'] as const

export function generateStaticParams() {
  return WITHDRAWAL_SLUGS.map((slug) => ({ slug }))
}

const META: Record<(typeof WITHDRAWAL_SLUGS)[number], { title: string; description: string }> = {
  bitstarz: {
    title: 'BitStarz Withdrawal Times & Limits 2026 | PlayMagpie',
    description:
      'BitStarz processes crypto withdrawals in under 10 minutes — but a 25% admin fee applies on bonus-related payouts. Full breakdown of speeds, KYC and limits.',
  },
  'mirax-casino': {
    title: 'Mirax Casino Withdrawal Times & Limits 2026 | PlayMagpie',
    description:
      'Mirax Casino crypto withdrawals clear in 15 minutes or less. What the 325% welcome bonus means for your first payout, plus KYC and tier limits.',
  },
  '7bit-casino': {
    title: '7Bit Casino Withdrawal Times & Limits 2026 | PlayMagpie',
    description:
      '7Bit Casino pays out crypto in under 10 minutes with no KYC required at any withdrawal size. Honest breakdown of speeds across 8 supported coins.',
  },
}

export async function generateMetadata(props: PageProps<'/reviews/[slug]/withdrawal'>): Promise<Metadata> {
  const { slug } = await props.params
  if (!(WITHDRAWAL_SLUGS as readonly string[]).includes(slug)) return {}
  const meta = META[slug as (typeof WITHDRAWAL_SLUGS)[number]]
  const canonical = `/reviews/${slug}/withdrawal`
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

export default async function WithdrawalPage(props: PageProps<'/reviews/[slug]/withdrawal'>) {
  const { slug } = await props.params
  if (!(WITHDRAWAL_SLUGS as readonly string[]).includes(slug)) notFound()
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
        name: 'Withdrawal',
        item: `https://www.playmagpie.com/reviews/${casino.slug}/withdrawal`,
      },
    ],
  }

  const faqs =
    slug === 'bitstarz'
      ? BITSTARZ_FAQS
      : slug === 'mirax-casino'
      ? MIRAX_FAQS
      : SEVENBIT_FAQS

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
          <span className="text-[#f5f5f5]">Withdrawal</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
            <div>
              <p className="text-[#7BB8D4] text-sm font-medium uppercase tracking-wider mb-2">
                {casino.name} — Withdrawal Guide
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {slug === 'bitstarz' && 'BitStarz Withdrawal Times & Limits in 2026'}
                {slug === 'mirax-casino' && 'Mirax Casino Withdrawals — How Fast, What KYC, Which Coins'}
                {slug === '7bit-casino' && '7Bit Casino Withdrawal: No KYC, 8 Coins, Under 10 Minutes'}
              </h1>
              <p className="text-[#555555] text-xs mt-2">Last updated: May 17, 2026</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-extrabold text-[#7BB8D4]">{casino.withdrawalScore}</div>
              <div className="text-[#888888] text-sm">Withdrawal Score / 10</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Stat label="Headline Window" value={casino.withdrawalTime} />
            <Stat label="KYC" value={casino.kycLevel} />
            <Stat label="Min Deposit" value={casino.minDeposit} />
            <Stat label="Coins Supported" value={`${casino.acceptedCryptos.length}`} />
          </div>

          <div className="flex gap-3 flex-wrap">
            <CTAButton href={casino.affiliateUrl} label={`Play at ${casino.name}`} variant="primary" size="lg" external />
            <CTAButton href={`/reviews/${casino.slug}`} label="Full Review" variant="secondary" size="lg" />
          </div>
        </div>

        {slug === 'bitstarz' && <BitstarzContent />}
        {slug === 'mirax-casino' && <MiraxContent />}
        {slug === '7bit-casino' && <SevenBitContent />}

        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-white mb-2">{casino.name} Withdrawal — FAQ</h2>
          <p className="text-[#888888] text-sm mb-8">
            Questions players actually ask about getting their money out of {casino.name}.
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
            Ready to deposit and start playing at {casino.name}?
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

function KeyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[#bbbbbb] text-base mb-6">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="text-[#7BB8D4] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7BB8D4] flex-shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ───────────── BitStarz: lead with the bonus admin-fee gotcha, then speed ───────────── */
function BitstarzContent() {
  return (
    <>
      <Para>
        Before the speed pitch, the thing every prospective BitStarz player should know up
        front: a 25% admin fee is deducted from withdrawals tied to bonus play. That fee
        is the single most common reason BitStarz users feel surprised at the cashier.
        It is disclosed in the bonus T&Cs and listed openly in our review&apos;s cons.
        If you never opt into a deposit match, it never applies — and the rest of the
        withdrawal experience is genuinely fast.
      </Para>
      <Para>
        With bonus play out of the picture, BitStarz processes crypto withdrawals in
        under 10 minutes on average from approval to wallet arrival. That headline window
        is what earned it the joint-highest withdrawal score (9.5/10) in our rankings,
        and it has held consistently for years — which is why &quot;bitstarz withdrawal times&quot;
        is a query Google sends real traffic for.
      </Para>

      <SectionHeading>The 25% bonus admin fee — when it bites</SectionHeading>
      <Para>
        BitStarz applies a 25% admin fee on withdrawals where the originating balance
        came from a bonus or bonus-derived winnings. Plain crypto-only play with no bonus
        attached is unaffected. The implication is straightforward: if you take the
        5 BTC welcome package, your first withdrawal off cleared bonus money will be
        debited 25% before it leaves the cashier.
      </Para>
      <Para>
        Practical workaround for players who care about clean payouts: decline the
        welcome bonus, deposit straight to real-money balance, and you get the full
        under-10-minute payout speed with no deductions. This trade-off — better speed
        and lower friction in exchange for a smaller balance — is one most no-KYC
        regulars already make at venues with similar terms.
      </Para>

      <SectionHeading>Crypto coverage and what each network means for clearing time</SectionHeading>
      <Para>
        BitStarz supports six coins for withdrawal: BTC, ETH, LTC, DOGE, BCH and USDT.
        The headline &quot;under 10 minutes&quot; figure is the casino-side processing window —
        the time from your request being approved to funds being broadcast. On-chain
        confirmation is then determined by the network you chose, not by BitStarz.
      </Para>
      <KeyList
        items={[
          'Bitcoin (BTC) clearing is gated by current mempool conditions — minutes when the network is quiet, longer under congestion.',
          'Ethereum (ETH) typically confirms within a couple of blocks; gas prices affect priority but not casino-side processing.',
          'Litecoin (LTC) and Dogecoin (DOGE) confirm faster than BTC and are popular with players who want speed without leaving the major-coin set.',
          'USDT is supported but BitStarz uses the major chains — check the cashier for the active network on your withdrawal request.',
          'Bitcoin Cash (BCH) is the niche option and clears quickly with low fees.',
        ]}
      />
      <Para>
        If you want sub-second on-chain settlement for stablecoin withdrawals, BitStarz
        is not the venue — that profile better fits casinos with TRX, SOL or MATIC
        support. See <Link href="/crypto/usdt" className="text-[#7BB8D4] hover:underline">USDT casinos</Link>{' '}
        for venues that lean on those networks.
      </Para>

      <SectionHeading>KYC at withdrawal — when Light KYC actually triggers</SectionHeading>
      <Para>
        BitStarz is rated &quot;Light&quot; for KYC in our ratings. In practical terms that means
        crypto-only players running standard stakes generally complete withdrawals without
        document verification. Verification gets triggered for larger fiat-side activity
        or when account behaviour flags a compliance review. BitStarz does not publish
        a fixed dollar threshold — we have not been able to source a verified number,
        and we&apos;d rather flag that than invent one.
      </Para>
      <Para>
        If your withdrawal sits in pending for longer than the headline window, the
        usual cause is either a compliance check or — far more often — the 25% bonus
        admin fee being calculated on a bonus-derived balance. Support over live chat is
        the fastest way to confirm which one is in play.
      </Para>

      <SectionHeading>VIP and high-volume withdrawals</SectionHeading>
      <Para>
        BitStarz runs an invite-only VIP programme with higher withdrawal ceilings,
        dedicated managers and priority cashier handling for verified high rollers.
        Specific tier-by-tier dollar limits are not published publicly and we don&apos;t
        have verified figures to share. For a hub-level view of high-stake-friendly
        venues see{' '}
        <Link href="/high-roller-casinos" className="text-[#7BB8D4] hover:underline">
          the best high roller crypto casinos
        </Link>
        .
      </Para>

      <SectionHeading>BitStarz vs Mirax vs 7Bit — withdrawal comparison</SectionHeading>
      <Para>
        Of the three top-commission casinos we&apos;re running withdrawal pages on,
        BitStarz has the fastest headline window (under 10 minutes, tied with 7Bit
        at instant-to-10) but the most friction on bonus play because of the 25% admin
        fee. <Link href="/reviews/mirax-casino/withdrawal" className="text-[#7BB8D4] hover:underline">Mirax</Link>{' '}
        is roughly 50% slower on the headline window (up to 15 minutes) but doesn&apos;t
        impose a bonus-withdrawal fee.{' '}
        <Link href="/reviews/7bit-casino/withdrawal" className="text-[#7BB8D4] hover:underline">7Bit</Link>{' '}
        matches BitStarz on speed and beats both on privacy — it&apos;s the only one of
        the three with a full no-KYC posture on crypto withdrawals at any size.
      </Para>
      <Para>
        Net read: pick BitStarz if you&apos;re depositing without a welcome bonus and
        you value the longest payout track record. If the 5 BTC package is the draw,
        budget for the 25% fee or pick one of the other two. For a broader view of
        the fastest payout sites see{' '}
        <Link href="/fast-withdrawal-casinos" className="text-[#7BB8D4] hover:underline">
          the fastest crypto casinos for withdrawal
        </Link>
        .
      </Para>
    </>
  )
}

const BITSTARZ_FAQS = [
  {
    question: 'Why was 25% deducted from my BitStarz withdrawal?',
    answer:
      "BitStarz applies a 25% admin fee on withdrawals derived from bonus play. If you took the welcome bonus or any deposit match and the balance you're withdrawing originated from that bonus or its winnings, the fee is deducted at the cashier. Plain real-money play with no bonus attached has no admin fee. The terms are disclosed in the bonus T&Cs.",
  },
  {
    question: 'How long does a BitStarz Bitcoin withdrawal actually take?',
    answer:
      'The BitStarz side of a Bitcoin withdrawal is typically processed in under 10 minutes from approval. After that, on-chain confirmation depends on the Bitcoin mempool — minutes during quiet periods, longer when the network is congested. Total time end to end on BTC ranges from roughly 10 minutes to around an hour in heavier conditions, which is normal Bitcoin behaviour and not specific to BitStarz.',
  },
  {
    question: 'Does BitStarz pay out faster on weekends?',
    answer:
      "BitStarz processes withdrawals 24/7, but crypto processing isn't gated by banking hours the way card or wire withdrawals are. Practical experience is that crypto requests clear in the same under-10-minute window regardless of day. If your withdrawal sits longer than that on a weekend, the cause is more likely a compliance check or bonus-fee calculation than weekend staffing.",
  },
  {
    question: 'Can I withdraw to a different wallet than I deposited from?',
    answer:
      "BitStarz allows crypto withdrawals to a wallet you specify at the cashier — it does not have to be the same address used for the deposit. The casino may flag mismatched-source-and-destination transactions for compliance review at larger amounts, which would slow that specific withdrawal down. Same-wallet withdrawals are the lowest-friction option.",
  },
  {
    question: 'What is the maximum I can withdraw from BitStarz?',
    answer:
      "BitStarz does not publish a single fixed maximum that applies to all players. Standard accounts have one set of limits and VIPs negotiated through the loyalty programme have higher ceilings. We don't have a verified public figure to quote and won't invent one. For ongoing high-roller play, the VIP team negotiates direct limits — request a VIP review via support if you're regularly withdrawing six figures.",
  },
] as const

/* ───────────── Mirax: lead with the 325% bonus + wagering implication ───────────── */
function MiraxContent() {
  return (
    <>
      <Para>
        Mirax Casino&apos;s pitch is a 325% welcome package across four deposits, worth
        up to $3,250 plus 250 free spins. That is the most generous match in our top
        seven, and it&apos;s the single most relevant variable for your first
        withdrawal — because bonus money carries wagering before it can be cleared off
        the platform. The actual cashier speed is fast (instant to 15 minutes once you
        get there) but the path to your first eligible withdrawal runs through the
        wagering requirement on whichever portion of the welcome match you accepted.
      </Para>
      <Para>
        That is the single thing the Search Console data for &quot;mirax casino review&quot;
        suggests players don&apos;t fully understand at signup. So this page leads with
        the bonus-withdrawal interaction, then covers the rest of the cashier mechanics
        underneath.
      </Para>

      <SectionHeading>The 325% bonus and your first withdrawal</SectionHeading>
      <Para>
        Mirax&apos;s welcome match is structured across the first four deposits, with
        the headline 325% applying across the package — not as a single 325% match on
        deposit one. The 250 free spins are released alongside. As with virtually
        every match bonus in the industry, the funds carry a wagering requirement that
        must be cleared before bonus-side winnings can be withdrawn. We don&apos;t have
        a verified current x-multiplier we&apos;d publish without checking the live
        T&amp;Cs on the Mirax cashier — sister-site 7Bit Casino sits around the industry-
        standard mid-30s, which is a reasonable mental model.
      </Para>
      <Para>
        Practical implication: until you clear wagering on the bonus portion, only
        real-money-deposited balance (and winnings from real-money play) is freely
        withdrawable. This is identical to BitStarz, BC.Game and most match-bonus
        casinos — Mirax is not unusual here, but the size of the package means the
        wagering volume is correspondingly larger than at venues offering smaller
        matches.
      </Para>

      <SectionHeading>KYC at the Mirax cashier</SectionHeading>
      <Para>
        Mirax runs a Light KYC policy. In practice that means most crypto-only players
        complete withdrawals without document submission. Compliance review gets
        triggered at higher withdrawal amounts or when account activity flags an
        unusual pattern — we don&apos;t have a verified dollar threshold to publish
        and won&apos;t guess. The light-touch approach is consistent across the 7Bit
        Partners network that operates the brand.
      </Para>

      <SectionHeading>Crypto coverage — seven coins, all on standard networks</SectionHeading>
      <Para>
        Mirax accepts BTC, ETH, USDT, LTC, DOGE, BCH and XRP. The headline
        instant-to-15-minute window is the casino-side processing time. On-chain
        clearing then depends on the network — XRP is the standout in the list for
        speed (settlement in seconds, fees in fractions of a cent), and LTC clears
        faster than BTC if you want a major-coin alternative with lower confirmation
        latency.
      </Para>
      <KeyList
        items={[
          'XRP is the fastest on-chain option in the Mirax lineup — final settlement is sub-second once broadcast.',
          'LTC and DOGE clear in low single-digit minutes and avoid Bitcoin congestion.',
          'BTC depends on mempool conditions — same constraint as everywhere else.',
          'USDT is supported but check the cashier for which network is active on your request.',
          'ETH and BCH round out the list with standard mainnet behaviour.',
        ]}
      />
      <Para>
        For deeper context on individual chains see{' '}
        <Link href="/crypto/litecoin" className="text-[#7BB8D4] hover:underline">Litecoin casinos</Link>
        {' '}or{' '}
        <Link href="/crypto/bitcoin" className="text-[#7BB8D4] hover:underline">Bitcoin casino options</Link>
        .
      </Para>

      <SectionHeading>The 7Bit Partners operator backing</SectionHeading>
      <Para>
        Mirax launched in 2022 — short by industry standards. The reason the brand
        earns an 8.6/10 trust score despite its age is that it&apos;s operated by
        7Bit Partners, the same group running 7Bit Casino since 2014. Same payment
        infrastructure, same KYC posture, same support team. Newer storefront, proven
        plumbing.
      </Para>
      <Para>
        Why this matters for withdrawal specifically: the operator&apos;s payout
        track record is what predicts whether a casino will pay you in a year&apos;s
        time, not the brand age. Mirax inherits a positive one. Players who want
        the more established storefront with identical cashier behaviour can
        cross-shop with{' '}
        <Link href="/reviews/7bit-casino/withdrawal" className="text-[#7BB8D4] hover:underline">
          the 7Bit Casino withdrawal page
        </Link>
        .
      </Para>

      <SectionHeading>VIP tier withdrawals at Mirax</SectionHeading>
      <Para>
        Mirax operates a tiered VIP programme with cashback on losses, higher
        withdrawal limits and personal account management at the top tiers. The
        exact per-tier dollar caps are not public — and we won&apos;t publish numbers
        we can&apos;t verify. For ongoing high-volume play the VIP team negotiates
        direct ceilings; request a VIP review via support if your normal weekly
        volume sits at high-roller levels.
      </Para>

      <SectionHeading>Mirax vs BitStarz vs 7Bit on withdrawal</SectionHeading>
      <Para>
        Headline windows: BitStarz under 10 min, 7Bit instant to 10 min, Mirax
        instant to 15 min. Mirax is the slowest of the three on paper, but the gap
        is small enough that on-chain confirmation will usually dominate the total
        time anyway. Where Mirax stands out is the bonus offer — 325% across four
        deposits is materially larger than{' '}
        <Link href="/reviews/bitstarz/withdrawal" className="text-[#7BB8D4] hover:underline">BitStarz&apos; 5 BTC package</Link>
        {' '}in real dollar terms for most players, and Mirax does not impose the
        25% bonus admin fee BitStarz does.
      </Para>
      <Para>
        Net read: Mirax is the choice when the welcome match is the priority and
        you accept a slightly slower headline payout window. For a broader view see{' '}
        <Link href="/fast-withdrawal-casinos" className="text-[#7BB8D4] hover:underline">
          the fastest crypto casinos for withdrawal
        </Link>
        .
      </Para>
    </>
  )
}

const MIRAX_FAQS = [
  {
    question: 'How long until I can withdraw bonus winnings from Mirax?',
    answer:
      'Bonus-derived balances at Mirax are subject to wagering requirements before they can be withdrawn. The exact multiplier on the current welcome match is published in the Mirax cashier T&Cs — check there before claiming. Real-money-deposited balance (and winnings from real-money play with no bonus active) is freely withdrawable subject to the standard cashier processing window of up to 15 minutes.',
  },
  {
    question: 'Why does Mirax show a 15-minute window when BC.Game does instant?',
    answer:
      "The headline window is the casino-side processing time before funds are broadcast to the network. BC.Game has fully automated payouts on most coins, so its window is effectively zero. Mirax processes within a 15-minute envelope. For most players the on-chain confirmation time (which is the same at both casinos) dominates the total wall-clock wait anyway, so the practical difference is smaller than the headline numbers suggest.",
  },
  {
    question: 'Is Mirax safe given it only launched in 2022?',
    answer:
      "Mirax is operated by 7Bit Partners, the same group running 7Bit Casino since 2014 — so the payment infrastructure, KYC posture and support team behind Mirax all have over a decade of operational track record. The Mirax storefront itself is new; the operator behind it is not. Our 8.6/10 trust score reflects this split.",
  },
  {
    question: 'Which Mirax coin clears fastest on-chain?',
    answer:
      'Of the seven coins Mirax supports, XRP settles fastest on-chain — final confirmation in seconds with near-zero fees. LTC and DOGE clear in low single-digit minutes. BTC is gated by mempool conditions like everywhere else. For stablecoin withdrawals, the active network shown at the cashier determines clearing time — Mirax does not support TRC-20 or SPL-network USDT.',
  },
  {
    question: "What's the relationship between Mirax and 7Bit Casino?",
    answer:
      "Mirax Casino and 7Bit Casino are both operated by 7Bit Partners. They share back-end infrastructure including the cashier, KYC posture and support team. They are positioned differently — 7Bit leans into the no-KYC, decade-old Bitcoin casino angle, Mirax leads with a much larger welcome bonus and a broader game library. Cashier mechanics are very similar between the two.",
  },
] as const

/* ───────────── 7Bit: lead with no-KYC at any amount ───────────── */
function SevenBitContent() {
  return (
    <>
      <Para>
        The single thing that separates 7Bit Casino from BitStarz and Mirax on
        withdrawal is its KYC posture: no identity verification is required for
        crypto withdrawals at any amount, and that policy has held since the
        casino launched in 2014. Email-and-password signup, deposit, play,
        withdraw — no document upload at any stage of the funnel. That is rare
        among casinos with a decade-plus payout history, and it&apos;s the reason
        7Bit earns a 9.2/10 KYC score on our rankings, the highest of the three
        casinos covered in this batch.
      </Para>
      <Para>
        Speed-wise, the headline window is instant to 10 minutes — matching
        BitStarz, beating Mirax. Eight cryptocurrencies are supported, the
        widest coverage in this batch. The rest of this page covers what each
        of those coins actually means at the cashier.
      </Para>

      <SectionHeading>What no-KYC means in practice at 7Bit</SectionHeading>
      <Para>
        &quot;No KYC&quot; is a phrase casinos use loosely. At 7Bit it has a precise
        meaning: in the standard cashier flow, no government ID, no proof of
        address, no selfie verification is required at any withdrawal amount.
        Compliance is handled at the operator layer through transaction
        monitoring rather than upfront document collection.
      </Para>
      <Para>
        The trade-off, which we list openly in our cons: there is no MGA
        regulator backing this — 7Bit operates on a Curaçao licence. Players who
        prioritise heavy regulatory oversight should be choosing differently
        anyway, and players who value anonymity in crypto play are who 7Bit
        actually serves well. See{' '}
        <Link href="/no-kyc-casinos" className="text-[#7BB8D4] hover:underline">
          our no-KYC casinos hub
        </Link>{' '}
        for the broader category.
      </Para>

      <SectionHeading>Eight coins — what each one means at the cashier</SectionHeading>
      <Para>
        7Bit supports BTC, ETH, USDT, LTC, DOGE, BCH, XRP and BNB. The
        eight-coin lineup beats BitStarz (six) and Mirax (seven) for
        breadth. BNB in particular is the standout for cost — withdrawals on
        BNB Smart Chain settle in seconds with sub-cent fees.
      </Para>
      <KeyList
        items={[
          'BTC clearing is gated by Bitcoin mempool conditions — minutes when quiet, longer when busy.',
          'XRP and BNB settle on-chain in seconds with fees measured in fractions of a cent.',
          'LTC and DOGE clear faster than BTC and are popular with players who want speed but want to stay in major-coin territory.',
          'USDT is supported — check the cashier for which network (TRC-20, ERC-20, BEP-20) is active on your request.',
          'ETH and BCH round out the lineup with normal mainnet behaviour.',
        ]}
      />
      <Para>
        Players prioritising near-instant stablecoin payouts on cheap networks
        will find 7Bit&apos;s BNB and (network-dependent) USDT support more useful
        than the equivalent options at BitStarz, which has the more
        BTC-and-ETH-centric coin list.
      </Para>

      <SectionHeading>Why the smaller welcome bonus actually helps withdrawals</SectionHeading>
      <Para>
        7Bit&apos;s welcome offer is a 100% match up to 1.5 BTC plus 100 free
        spins. That ceiling is smaller than BitStarz&apos;s 5 BTC headline and
        materially smaller than Mirax&apos;s 325% across four deposits. We list
        the lower cap openly in our cons.
      </Para>
      <Para>
        Counter-intuitively, the smaller bonus is a feature for the
        withdrawal-focused player: less bonus-locked balance means fewer
        wagering-gated funds standing between you and your first eligible
        withdrawal. If you intend to deposit, play modestly, and cash out,
        a smaller welcome match clears faster than a 5 BTC package whose
        wagering you may never realistically complete.
      </Para>

      <SectionHeading>VIP tier withdrawals</SectionHeading>
      <Para>
        7Bit runs a multi-tier VIP programme — progression-based, not
        invite-only. Higher tiers unlock increased cashback, higher
        withdrawal ceilings and dedicated managers. Specific per-tier dollar
        caps are not public and we won&apos;t invent them. For high-stake play
        the VIP team handles ceilings on a per-account basis; ongoing
        five-figure-plus weekly volume is the threshold at which it&apos;s worth
        contacting the VIP team directly. See{' '}
        <Link href="/high-roller-casinos" className="text-[#7BB8D4] hover:underline">
          the best high roller crypto casinos
        </Link>{' '}
        for a category-level view.
      </Para>

      <SectionHeading>7Bit vs BitStarz vs Mirax — withdrawal head-to-head</SectionHeading>
      <Para>
        On headline speed,{' '}
        <Link href="/reviews/bitstarz/withdrawal" className="text-[#7BB8D4] hover:underline">7Bit and BitStarz are tied</Link>{' '}
        at instant-to-10-minutes, with{' '}
        <Link href="/reviews/mirax-casino/withdrawal" className="text-[#7BB8D4] hover:underline">Mirax behind at instant-to-15</Link>
        . On KYC, 7Bit is the only one of the three with a full no-KYC posture
        — both BitStarz and Mirax run Light KYC that may trigger at larger
        withdrawals. On coin coverage 7Bit leads with eight versus BitStarz&apos;s
        six and Mirax&apos;s seven.
      </Para>
      <Para>
        The single trade-off is the welcome bonus ceiling — 7Bit&apos;s 1.5 BTC
        cap is the smallest of the three. For players who don&apos;t use match
        bonuses heavily, this is irrelevant or beneficial. For players whose
        whole reason to sign up is the headline match, BitStarz or Mirax
        will be the better fit. For category-level comparison see{' '}
        <Link href="/fast-withdrawal-casinos" className="text-[#7BB8D4] hover:underline">
          the fastest crypto casinos for withdrawal
        </Link>
        .
      </Para>
    </>
  )
}

const SEVENBIT_FAQS = [
  {
    question: 'Will 7Bit ever ask me for ID at withdrawal?',
    answer:
      "In the standard cashier flow, no. 7Bit's no-KYC policy applies to crypto withdrawals at any amount and has held consistently since 2014. The only scenarios where verification might be requested are if account activity flags an automated compliance review (very rare for normal crypto-only play) or if you're attempting fiat-side activity. Pure crypto-in, crypto-out players don't see KYC requests.",
  },
  {
    question: 'Which 7Bit coin should I pick for fastest withdrawal?',
    answer:
      'For pure speed and cost, BNB on BNB Smart Chain and XRP are the two standouts in 7Bit\'s eight-coin lineup — both settle on-chain in seconds with fees measured in fractions of a cent. LTC and DOGE are the next-fastest. BTC is the slowest because of network confirmation times, not anything 7Bit does on its side.',
  },
  {
    question: 'How does 7Bit handle large withdrawals if it doesn\'t do KYC?',
    answer:
      'Large withdrawals are still processed without document verification under 7Bit\'s no-KYC policy. The operator handles compliance through on-chain transaction monitoring rather than upfront identity collection. For very large amounts the VIP team may be involved on the cashier side to approve higher per-transaction ceilings, but this is a cashier-side workflow, not a document-collection workflow.',
  },
  {
    question: 'Can I withdraw more than I deposited if I never verified my identity?',
    answer:
      "Yes — that is the entire point of the no-KYC model. 7Bit's policy is that crypto winnings withdraw without document verification at any size, including amounts substantially larger than the original deposit. This is the differentiator versus BitStarz and Mirax, both of which may trigger Light KYC at larger withdrawal amounts.",
  },
  {
    question: 'Does 7Bit charge withdrawal fees on any coin?',
    answer:
      "7Bit does not charge a casino-side withdrawal fee on its supported cryptocurrencies — only standard blockchain network fees apply, and those are deducted by the network itself, not the casino. The network fee varies dramatically by coin: fractions of a cent on BNB, XRP, TRX-based stablecoins; meaningful dollar amounts on Ethereum during congestion; mempool-dependent on Bitcoin.",
  },
] as const
