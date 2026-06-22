import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COUNTRY_LIST } from '@/lib/programmatic'

// =============================================================================
// Legal sub-pages: /country/[slug]/legal
// Informational ("is crypto gambling legal in X / what's the law / tax") intent,
// kept structurally separate from the commercial /country/[slug] hub.
// Allowlisted to Canada + Australia only (dynamicParams=false → others 404),
// mirroring the /compare/* allowlist pattern.
//
// PRIMARY-SOURCE VERIFICATION (research pass 2026-06-20). Every legal/tax/date
// claim below was verified to a government primary source before writing; claims
// that could not be verified were omitted, not guessed. Spot-check URLs:
//
// CANADA
// - Criminal Code Part VII (operators, not players): ss.201/202/206/207
//   https://laws-lois.justice.gc.ca/eng/acts/c-46/section-201.html
//   https://laws-lois.justice.gc.ca/eng/acts/c-46/section-207.html
// - Gambling winnings = non-taxable windfall: Income Tax Act 40(2)(f)
//   https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-40.html
//   CRA windfall test: Income Tax Folio S3-F9-C1 (canada.ca)
// - CRA crypto = commodity; disposition = taxable event:
//   https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/cryptocurrency-guide/crypto-assets-tax-obligations.html
// - Ontario: iGO est. 2021-07-06, market launched 2022-04-04, independent agency 2025-05-12
//   https://www.agco.ca/en/lottery-and-gaming/overview-internet-gaming-ontario
//   https://igamingontario.ca/en/news/ontarios-new-igaming-market-launch-april-4-2022
// - Alberta: iGaming Alberta Act passed 2025 (AiGC / AGLC), launch 2026, PARTIAL
//   (trade-press dates; framed as "scheduled" not asserted). Bill 48:
//   https://docs.assembly.ab.ca/LADDAR_files/docs/bills/bill/legislature_31/session_1/20230530_bill-048.pdf
//
// AUSTRALIA
// - Interactive Gambling Act 2001 targets providers not customers; s15 prohibits
//   online casino provision to AU customers:
//   https://www.legislation.gov.au/C2004A00851/latest/text
//   https://www.acma.gov.au/about-interactive-gambling-act
//   https://www.infrastructure.gov.au/department/media/publications/interactive-gambling-act-2001
// - ACMA ISP/DNS blocking since Nov 2019 (count cited as "1,000+", drifts):
//   https://www.acma.gov.au/action-interactive-gambling
// - Credit + digital-currency (crypto) ban: Interactive Gambling Amendment
//   (Credit and Other Measures) Act 2023, assent 2023-12-11, in force 2024-06-11.
//   Part 2B / s15C; s15D <A$30M turnover carve-out. Applies to LICENSED WAGERING
//   (sports/race), NOT online casinos (already prohibited under s15):
//   https://www.legislation.gov.au/C2023A00114/latest/text
//   https://www.acma.gov.au/credit-ban
//   https://www.infrastructure.gov.au/media-communications/media-gambling-laws-regulation/gambling/credit-card-ban
// - ATO: recreational winnings not assessable (IT 2655, IT 2584); crypto = CGT
//   asset, disposal = CGT event; won crypto cost base = market value at win:
//   https://www.ato.gov.au/individuals-and-families/investments-and-assets/crypto-asset-investments/transactions-acquiring-and-disposing-of-crypto-assets/crypto-asset-prizes-and-gambling-winnings
// - 2026 reform package (ad ban from 2027-01-01) does NOT change legality:
//   https://www.infrastructure.gov.au/media-communications/media-gambling-laws-regulation/gambling/gambling-reforms-2026
// =============================================================================

const LEGAL_ALLOWLIST = ['canada', 'australia']

export const dynamicParams = false

export async function generateStaticParams() {
  return LEGAL_ALLOWLIST.map((slug) => ({ slug }))
}

type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'callout'; title: string; text: string }

type SourceLink = { label: string; href: string }

type LegalContent = {
  metaTitle: string
  metaDescription: string
  h1: string
  lead: string
  blocks: Block[]
  faqs: { question: string; answer: string }[]
  hubAnchor: string
  sources: SourceLink[]
}

const legalContent: Record<string, LegalContent> = {
  canada: {
    metaTitle: 'Is Crypto Gambling Legal in Canada? Laws & Tax 2026',
    metaDescription:
      "Using an offshore crypto casino isn't a criminal offence for players in Canada, but it's unregulated. The Criminal Code targets operators; Ontario and Alberta run licensed markets. Plus how the CRA taxes winnings and crypto.",
    h1: 'Is Crypto Gambling Legal in Canada?',
    lead:
      "For an individual player, using an offshore crypto casino in Canada is not a criminal offence, but it is unregulated. Canada's Criminal Code goes after the people who operate and run gambling, not the people who place the bets. The one firm exception is provincial: Ontario built its own licensed online-gambling market in 2022, and Alberta has legislated to follow. Below is what the law actually says, where the genuine grey areas are, and how the CRA treats both your winnings and the crypto you move to fund play.",
    blocks: [
      { type: 'h2', text: 'What the Criminal Code prohibits, and who it targets' },
      { type: 'p', text: "Gambling offences live in Part VII of the Criminal Code (sections 201 to 207). Read in order, they target keepers, operators and facilitators, not recreational bettors. Section 201 makes it an offence to keep a common gaming or betting house. Section 202 covers book-making and pool-selling. Section 206 covers running lotteries and games of chance. Every one of those is aimed at the person conducting the gambling, not the person playing." },
      { type: 'p', text: "The handful of player-facing limbs are narrow. Section 201(2) can catch someone 'found in' a physical common gaming house, meaning a bricks-and-mortar premises, not a website. Section 206(4) catches buying a ticket in an illegal, non-exempt lottery scheme. Neither reaches an individual placing a bet from home at an offshore online casino." },
      { type: 'p', text: "Section 207 is the provision that makes legal gambling possible at all: it allows a provincial government to 'conduct and manage a lottery scheme.' That single exemption is the legal foundation for every regulated casino, lottery and sportsbook in the country." },
      { type: 'callout', title: 'The operator-versus-player line', text: "Canada's gambling law attaches to keeping, operating or facilitating gambling. There is no section under which an individual commits an offence by playing at an offshore online casino. Be honest about what that means, though: the Code does not say playing is 'legal'. It simply never criminalises the player. That is an absence of prohibition, not a positive permission." },
      { type: 'h2', text: "'Unregulated' is not the same as 'legal'" },
      { type: 'p', text: 'Outside Ontario, and soon Alberta, there is no provincially licensed online-casino market. An offshore crypto casino is therefore unregulated: not licensed or supervised by any Canadian authority. The operator may itself be running afoul of the section 207 framework if it is treated as conducting gambling in Canada; the player, separately, is not committing an offence. We are aware of no prosecutions of individual Canadian players for offshore play.' },
      { type: 'p', text: "The practical catch is the flip side of 'unregulated': there is no Canadian consumer-protection backstop. If an offshore site freezes a withdrawal or voids a win, no provincial regulator will adjudicate it for you. 'Not an offence to play' and 'safe to play' are different statements, and it is worth keeping them apart before you deposit anything sizeable." },
      { type: 'h2', text: 'The Ontario exception, and Alberta next' },
      { type: 'p', text: 'Ontario is the clean case. The Alcohol and Gaming Commission of Ontario (AGCO) is the regulator; iGaming Ontario (iGO) is the body that conducts and manages the market under the section 207 exemption. iGO was established on 6 July 2021, the regulated market opened on 4 April 2022, and on 12 May 2025 iGO became an independent provincial agency rather than an AGCO subsidiary. For Ontario residents, the licensed operators are the regulated option; offshore sites remain accessible but sit outside that framework with none of its protections.' },
      { type: 'p', text: 'Alberta has legislated to become the second province with a competitive private-operator market. The iGaming Alberta Act passed in 2025, creating the Alberta iGaming Corporation as the conduct-and-manage entity with the AGLC as regulator, modelled closely on Ontario. The launch is scheduled for 2026. Treat the exact go-live as announced rather than settled until the AGLC confirms the market is live.' },
      { type: 'h2', text: 'Tax: two separate questions' },
      { type: 'p', text: 'Canadians conflate these constantly, so keep them apart. Question one is the winnings. For a casual or recreational player, gambling winnings are not taxable in Canada. They are a windfall. The statutory anchor is paragraph 40(2)(f) of the Income Tax Act, which sets the gain on a chance to win, or a right to winnings, at nil. The CRA assesses windfall status (Income Tax Folio S3-F9-C1) on factors like whether you had an enforceable claim to the money, whether you organised any effort to get it, and whether it was likely to recur.' },
      { type: 'p', text: 'The exception is real but narrow: someone genuinely carrying on a business of gambling can be taxed on winnings as business income. For pure games of chance the CRA and the courts apply that very sparingly. Note too that any interest or investment income you earn on winnings is taxable, even though the winnings themselves are not.' },
      { type: 'p', text: 'Question two is the crypto. The CRA treats cryptocurrency as a commodity, and a disposition is a taxable event. Selling crypto for dollars, trading one crypto for another, converting to fiat, or using crypto to pay are all dispositions. So moving crypto to fund a deposit, or cashing out and converting, can trigger a capital gain (or business income) on the crypto itself, entirely separate from the tax-free status of the winnings. The winnings can be untaxed while the crypto leg is taxable.' },
      { type: 'callout', title: 'Not tax advice', text: 'This is general information sourced to the CRA, not personal tax advice. Crypto cost-base tracking and the capital-gains inclusion rate for your tax year are exactly the kind of detail worth confirming with the CRA or a tax professional before you file.' },
    ],
    faqs: [
      { question: 'Is it illegal to play at an offshore crypto casino in Canada?', answer: 'No. Canada’s Criminal Code targets the people who keep, operate or facilitate gambling, not individual players. There is no provision under which a Canadian commits an offence by placing bets at an offshore online casino, and we are aware of no prosecutions of individual players. What you give up is regulation: an offshore site is not licensed or backstopped by any Canadian authority.' },
      { question: 'Is online gambling legal in Ontario specifically?', answer: 'Yes. Ontario runs a licensed, regulated online-gambling market that opened on 4 April 2022, regulated by the AGCO and conducted by iGaming Ontario under the section 207 "conduct and manage" exemption in the Criminal Code. Alberta has legislated a similar market expected to launch in 2026.' },
      { question: 'Do I pay tax on gambling winnings in Canada?', answer: 'Generally no. For recreational players, winnings are treated as a non-taxable windfall under paragraph 40(2)(f) of the Income Tax Act. The exception is someone carrying on a genuine business of gambling, which the CRA applies narrowly to games of chance. Any interest you then earn on the winnings is taxable.' },
      { question: 'Do I owe tax when I deposit or withdraw crypto at a casino?', answer: 'Possibly, but on the crypto, not the winnings. The CRA treats crypto as a commodity, so selling it, swapping it, converting it to dollars or spending it is a disposition that can trigger a capital gain. That is separate from, and additional to, the tax-free treatment of the gambling winnings themselves.' },
      { question: 'Are offshore crypto casinos regulated in Canada?', answer: 'No. Outside Ontario and (from 2026) Alberta, there is no provincial licensing of online casinos, so offshore sites are unregulated. That means no Canadian consumer-protection recourse if a withdrawal is frozen or a win is voided. "Not an offence to play" is not the same as "protected."' },
    ],
    hubAnchor: 'ranked crypto casinos for Canadian players',
    sources: [
      { label: 'Criminal Code s.201 (common gaming house)', href: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-201.html' },
      { label: 'Criminal Code s.207 (provincial conduct-and-manage)', href: 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-207.html' },
      { label: 'Income Tax Act s.40(2)(f) (gambling-winnings gain is nil)', href: 'https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-40.html' },
      { label: 'CRA: crypto-assets and your tax obligations', href: 'https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/cryptocurrency-guide/crypto-assets-tax-obligations.html' },
      { label: 'AGCO: overview of internet gaming in Ontario', href: 'https://www.agco.ca/en/lottery-and-gaming/overview-internet-gaming-ontario' },
    ],
  },
  australia: {
    metaTitle: 'Is Crypto Gambling Legal in Australia? Laws & Tax 2026',
    metaDescription:
      "In Australia the Interactive Gambling Act targets operators, not players. Providing an online casino is illegal, using one isn't a player offence. ACMA blocks sites; the 2024 credit/crypto ban covers sports betting, not casinos. Plus ATO tax.",
    h1: 'Is Crypto Gambling Legal in Australia?',
    lead:
      "Australia's Interactive Gambling Act 2001 makes it illegal to provide an online casino to people in Australia, but the offence falls on the operator, not the player. No provision penalises an individual Australian for using an offshore crypto casino. What you actually run into is enforcement aimed at the sites: ACMA has internet providers block them, and a 2024 law banned credit cards and crypto as payment, though that ban, crucially, covers licensed sports betting, not casinos. Here is how the pieces fit together.",
    blocks: [
      { type: 'h2', text: 'What the Interactive Gambling Act prohibits, and who it targets' },
      { type: 'p', text: "The Interactive Gambling Act 2001 (Cth) prohibits the provision of 'prohibited interactive gambling services' (online casino games such as pokies, roulette, blackjack and poker, plus in-play sports betting) to customers physically located in Australia. Section 15 carries the core offence; section 15AA adds unlicensed regulated services such as online wagering offered without an Australian licence. The prohibition applies to any provider serving Australians, whether based onshore or offshore." },
      { type: 'p', text: 'The decisive point is who the offence falls on. The Department of Infrastructure and ACMA both state plainly that the Act targets the providers of interactive gambling, not their customers. There is no offence in the Act for an individual in Australia who uses an offshore casino, and we found no case in which a player has been penalised for doing so.' },
      { type: 'callout', title: 'Operator-targeted, not player-targeted', text: 'It is illegal to offer an online casino to Australians; it is not an offence to be the Australian who plays at one. The risks a player actually faces are commercial, not criminal: blocked access, and offshore sites that may refuse to return deposits or pay winnings, with no Australian avenue for recourse.' },
      { type: 'h2', text: 'ACMA enforcement: blocking the sites, not the players' },
      { type: 'p', text: 'The Australian Communications and Media Authority (ACMA) enforces the Act against operators with formal warnings, infringement notices and civil penalties, plus the tool players actually notice, website blocking. Since its first request in November 2019, ACMA has directed Australian internet providers to block illegal offshore gambling sites at the DNS level; well over a thousand sites and affiliate domains have been blocked under the program. Hit one and you see a notice that the service is illegal.' },
      { type: 'p', text: 'Two honest caveats. The blocking is aimed at the service, never the user. And it is DNS-based, so it is circumventable and is better understood as friction and a warning signal than an absolute barrier.' },
      { type: 'h2', text: "The June 2024 credit-card and crypto ban: what it does and doesn't cover" },
      { type: 'p', text: 'This is the most misreported part of Australian crypto-gambling law, so be precise. The Interactive Gambling Amendment (Credit and Other Measures) Act 2023 received assent on 11 December 2023, and its payment ban took effect on 11 June 2024. It stops licensed interactive wagering operators from accepting credit cards, credit-linked digital wallets, and digital currency (that is, cryptocurrency) from customers in Australia, with a carve-out for very small providers under an A$30 million annual wagering-turnover threshold.' },
      { type: 'callout', title: 'It is a sports-betting measure, not a casino ban', text: "The ban applies to licensed wagering, meaning betting on racing and sport. It does not apply to online casinos, because online casinos are already prohibited outright under section 15: there is no licensed online-casino sector for the payment rule to regulate. 'Australia banned crypto for online casinos in 2024' is simply wrong. The crypto payment ban is a restriction on licensed bookmakers, not on casinos." },
      { type: 'h2', text: 'Tax: winnings versus crypto' },
      { type: 'p', text: 'Two separate questions again. For a recreational player, gambling winnings are not assessable income in Australia. The ATO treats them as a windfall from a luck-based activity (rulings IT 2655 and IT 2584). The exception is the rare case of someone carrying on a business of betting or gambling, which the ATO says is unusual precisely because chance dominates the outcome.' },
      { type: 'p', text: 'Crypto is treated differently. A crypto asset is a CGT asset, and disposing of it is a CGT event: selling it for dollars, swapping one crypto for another, gifting it, or using it to pay all count as disposals. If you win crypto, the ATO disregards the gain on receipt and sets the cost base at its market value at the time you won it, but disposing of that crypto afterwards is a CGT event. So the winning can be untaxed while later moving the crypto is taxable.' },
      { type: 'callout', title: 'Not tax advice', text: 'This is general ATO-sourced information, not personal advice. The business-of-gambling test and crypto cost-base rules can change the outcome in individual cases, so confirm with the ATO or a registered tax agent.' },
      { type: 'h2', text: "What's changing in 2026 (and what isn't)" },
      { type: 'p', text: 'In April 2026 the federal government announced a major gambling-harm package: a ban on wagering advertising around live sport broadcasts commencing 1 January 2027, a strengthened BetStop self-exclusion register, and more enforcement against illegal offshore operators. Keep these in the right box: they are advertising and harm-reduction measures. They do not change the legality of online casinos (still prohibited to provide) or the player’s position (still not the target of an offence).' },
    ],
    faqs: [
      { question: 'Is it illegal to use an offshore crypto casino in Australia?', answer: 'Not for the player. The Interactive Gambling Act 2001 makes it an offence to provide an online casino to people in Australia, but the offence falls on the operator, not the customer. There is no provision penalising an individual for using an offshore casino, and we found no case of a player being penalised. The risks are commercial, such as blocked access and sites that may not pay out, not criminal.' },
      { question: 'Did Australia ban crypto for online casinos in 2024?', answer: 'No, this is the common misreading. The June 2024 ban stops licensed sports and race betting operators from accepting credit cards and cryptocurrency. It does not cover online casinos, because online casinos are already prohibited outright under section 15 of the Interactive Gambling Act. The crypto ban is a wagering measure, not a casino measure.' },
      { question: "Why can't I access some casino sites in Australia?", answer: 'Because ACMA has Australian internet providers block illegal offshore gambling sites at the DNS level, a program running since November 2019 that has blocked well over a thousand domains. The blocking targets the service, not you, and being DNS-based it is circumventable, but it is the friction most Australian players hit first.' },
      { question: 'Do I pay tax on gambling winnings in Australia?', answer: 'Generally no. The ATO treats recreational gambling winnings as a non-assessable windfall (rulings IT 2655 and IT 2584). The narrow exception is someone genuinely carrying on a business of gambling, which is rare because chance dominates the outcome.' },
      { question: 'Do I owe tax on crypto I use at a casino?', answer: 'Possibly, but on the crypto, not the winnings. A crypto asset is a CGT asset, so selling, swapping, gifting or spending it is a CGT event. If you win crypto, the receipt isn’t taxed and the cost base is its market value at that time, but disposing of it later is a CGT event separate from the winnings.' },
    ],
    hubAnchor: 'ranked crypto casinos for Australian players',
    sources: [
      { label: 'Interactive Gambling Act 2001 (full text)', href: 'https://www.legislation.gov.au/C2004A00851/latest/text' },
      { label: 'ACMA: about the Interactive Gambling Act', href: 'https://www.acma.gov.au/about-interactive-gambling-act' },
      { label: 'Interactive Gambling Amendment (Credit and Other Measures) Act 2023', href: 'https://www.legislation.gov.au/C2023A00114/latest/text' },
      { label: 'ACMA: credit and digital-currency ban', href: 'https://www.acma.gov.au/credit-ban' },
      { label: 'ATO: crypto asset prizes and gambling winnings', href: 'https://www.ato.gov.au/individuals-and-families/investments-and-assets/crypto-asset-investments/transactions-acquiring-and-disposing-of-crypto-assets/crypto-asset-prizes-and-gambling-winnings' },
    ],
  },
}

export async function generateMetadata(
  props: PageProps<'/country/[slug]/legal'>
): Promise<Metadata> {
  const { slug } = await props.params
  const content = legalContent[slug]
  if (!content) return {}
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/country/${slug}/legal` },
    openGraph: {
      url: `/country/${slug}/legal`,
      title: content.metaTitle,
      description: content.metaDescription,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: content.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
      images: ['/og-image.png'],
    },
  }
}

export default async function CountryLegalPage(props: PageProps<'/country/[slug]/legal'>) {
  const { slug } = await props.params
  const country = COUNTRY_LIST.find((c) => c.slug === slug)
  const content = legalContent[slug]
  if (!country || !content) notFound()

  const pageUrl = `https://www.playmagpie.com/country/${slug}/legal`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.playmagpie.com' },
      { '@type': 'ListItem', position: 2, name: `${country.name} Casinos`, item: `https://www.playmagpie.com/country/${slug}` },
      { '@type': 'ListItem', position: 3, name: content.h1, item: pageUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.h1,
    description: content.metaDescription,
    author: { '@type': 'Organization', name: 'PlayMagpie', url: 'https://www.playmagpie.com' },
    publisher: { '@type': 'Organization', name: 'PlayMagpie', url: 'https://www.playmagpie.com' },
    datePublished: '2026-06-20',
    dateModified: '2026-06-20',
    url: pageUrl,
    mainEntityOfPage: pageUrl,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-[#888888] mb-8 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/country/${slug}`} className="hover:text-white transition-colors">{country.name} Casinos</Link>
          <span>/</span>
          <span className="text-[#f5f5f5]">Is It Legal?</span>
        </nav>

        <div className="mb-2">
          <span className="text-xs text-[#7BB8D4] font-semibold uppercase tracking-widest">Legal &amp; Tax · {country.name}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{content.h1}</h1>
        <div className="flex items-center gap-3 text-sm text-[#888888] mb-8">
          <span>Updated June 2026</span>
          <span>·</span>
          <span>Sourced to primary legislation</span>
        </div>

        <p className="text-[#bbbbbb] text-lg leading-relaxed mb-10">{content.lead}</p>

        <div className="space-y-5">
          {content.blocks.map((block, i) =>
            block.type === 'h2' ? (
              <h2 key={i} className="text-xl font-bold text-[#f5f5f5] mt-8 mb-1">{block.text}</h2>
            ) : block.type === 'callout' ? (
              <div key={i} className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-5 my-2">
                <div className="text-[#7BB8D4] text-xs font-bold uppercase tracking-widest mb-2">{block.title}</div>
                <p className="text-[#bbbbbb] text-sm leading-relaxed">{block.text}</p>
              </div>
            ) : (
              <p key={i} className="text-[#888888] leading-relaxed">{block.text}</p>
            )
          )}
        </div>

        {/* FAQ */}
        <section className="mt-12 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-bold text-[#f5f5f5] mb-6">{country.name}: crypto gambling law FAQ</h2>
          <div className="space-y-4">
            {content.faqs.map((f) => (
              <div key={f.question} className="bg-[#111111] border border-[#222222] rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 text-base">{f.question}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Measured CTA back up to the commercial hub */}
        <section className="mt-12 bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <p className="text-[#888888] text-sm leading-relaxed">
            If you&apos;ve settled the legal question and want the operator side, see our{' '}
            <Link href={`/country/${slug}`} className="text-[#7BB8D4] hover:underline font-medium">{content.hubAnchor}</Link>
            {', '}ranked on withdrawal speed, KYC and bonus terms. For choosing which coin to deposit, the{' '}
            <Link href="/guides/best-crypto-for-gambling" className="text-[#7BB8D4] hover:underline">best crypto for gambling guide</Link>
            {' '}covers the trade-offs.
          </p>
        </section>

        {/* Primary sources: visible E-E-A-T citations */}
        <section className="mt-10 pt-8 border-t border-[#222222]">
          <h2 className="text-sm font-bold text-[#f5f5f5] mb-3 uppercase tracking-wider">Primary sources</h2>
          <ul className="space-y-2">
            {content.sources.map((s) => (
              <li key={s.href} className="text-sm">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[#7BB8D4] hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[#555555] text-xs mt-4 leading-relaxed">
            General information, not legal or tax advice. Gambling laws and tax treatment change, so verify your own
            position against the primary sources above or a qualified professional before acting.
          </p>
        </section>

        <div className="mt-10 pt-8 border-t border-[#222222]">
          <Link href={`/country/${slug}`} className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to crypto casinos in {country.name}
          </Link>
        </div>
      </div>
    </>
  )
}
