import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COUNTRY_LIST } from '@/lib/programmatic'
import { ROUTE_LASTMOD } from '@/lib/route-lastmod'

// Per-page displayed date (fix 2026-09-05; defect found 2026-09-04 and
// deferred to this deliberate pass). Source: ROUTE_LASTMOD, the honest
// per-page lastmod the sitemap already asserts for these routes, so the
// visible header, Article dateModified and sitemap <lastmod> cannot
// diverge. Month granularity preserved from the old static string. A
// missing map entry throws at build time, matching the lm() design in
// app/sitemap.ts.
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function legalPageLastmod(slug: string): string {
  const iso = ROUTE_LASTMOD[`/country/${slug}/legal`]
  if (!iso) throw new Error(`country/[slug]/legal: no ROUTE_LASTMOD entry for /country/${slug}/legal`)
  return iso
}
function updatedLabel(slug: string): string {
  const [y, m] = legalPageLastmod(slug).split('-')
  return `Updated ${MONTH_NAMES[Number(m) - 1]} ${y}`
}

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
      // Batch note 2026-08-11: additive-only discipline applies here as on the
      // Australia entry. The dated Alberta update section below and this
      // pointer are insertions; existing content is unchanged. reviewBy
      // tripwire 2026-10-13 (grey-market compliance deadline) in STATE.md.
      { type: 'p', text: "August 2026 note: Alberta's licensed online market went live on 13 July 2026. The dated update in the Ontario and Alberta section covers what launched and what it changes for Alberta players." },
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
      { type: 'h2', text: "Update, August 2026: Alberta's market is live" },
      { type: 'p', text: "The launch described above as scheduled has now happened. Alberta's regulated iGaming market opened on 13 July 2026, making it Canada's second province with a competitive private-operator online market. Twenty-two operator sites went live on day one, including FanDuel, DraftKings, BetMGM, BetRivers and theScore Bet, competing alongside the government-owned Play Alberta platform; by early August the live count had reached 26, with roughly 50 operators registered in total. The AGLC regulates the market and the Alberta iGaming Corporation is the conduct-and-manage entity, the same two-body structure Ontario runs." },
      { type: 'p', text: "The date that matters next is 13 October 2026: the endpoint of the transition for operators serving Albertans outside the licensed system. Legal analysis of the AGLC's transition guidance (Gowling WLG) puts it precisely: transitional relief is assessed case by case and, with the market launched, is generally not expected to extend beyond 13 October 2026, after which unregulated activity is to have ceased. Several brands have already crossed over from the unlicensed market, and others have said publicly that they will switch closer to the deadline. As of early September 2026 that transition is in progress, which means the set of licensed sites available to an Albertan is still growing month by month." },
      { type: 'callout', title: 'What this changes for Alberta players', text: "Alberta now has what Ontario has had since 2022: a licensed, provincially regulated online-casino option with consumer protections and a central self-exclusion system. Playing at an offshore crypto casino remains what it was: not an offence for the individual player under the Criminal Code, but unregulated, with no Canadian recourse if something goes wrong. The difference is that 'unregulated' is now a choice made against a live licensed alternative rather than the only online option in the province. This section will be updated at the 13 October compliance deadline." },
      { type: 'h2', text: 'Update, 4 September 2026: the launch detail, verified against the province' },
      { type: 'p', text: "A verification pass against Alberta's own iGaming-strategy page confirms the launch date (the province states the regulated market officially launched on 13 July 2026) and fills in the structure. The Alberta iGaming Corporation oversees the market and the AGLC regulates it, the same two-body split described above. The province allocates 80 per cent of net iGaming revenue to operators and retains 20 per cent, with 3 per cent of gross gaming revenue directed to First Nations and social-responsibility funding. And the province's own estimate of what the licensed market is replacing: unregulated operators were taking roughly 70 per cent of Alberta's total iGaming market." },
      { type: 'p', text: "Two design choices distinguish Alberta from Ontario, per legal analysis of the AGLC's launch framework (Gowling WLG). Political and election betting is expressly prohibited, under an AGLC bulletin of 17 March 2026. And self-exclusion is centralised from day one: an Albertan can exclude once and be excluded from all registered iGaming plus land-based casinos and racing entertainment centres, where Ontario's operators each still run their own separate self-exclusion programs. Ontario remains the scale benchmark: its market, live since April 2022, is reported at C$4.04 billion in revenue for calendar 2025, up about a third year on year." },
      { type: 'h2', text: 'Tax: two separate questions' },
      { type: 'p', text: 'Canadians conflate these constantly, so keep them apart. Question one is the winnings. For a casual or recreational player, gambling winnings are not taxable in Canada. They are a windfall. The statutory anchor is paragraph 40(2)(f) of the Income Tax Act, which sets the gain on a chance to win, or a right to winnings, at nil. The CRA assesses windfall status (Income Tax Folio S3-F9-C1) on factors like whether you had an enforceable claim to the money, whether you organised any effort to get it, and whether it was likely to recur.' },
      { type: 'p', text: 'The exception is real but narrow: someone genuinely carrying on a business of gambling can be taxed on winnings as business income. For pure games of chance the CRA and the courts apply that very sparingly. Note too that any interest or investment income you earn on winnings is taxable, even though the winnings themselves are not.' },
      { type: 'p', text: 'Question two is the crypto. The CRA treats cryptocurrency as a commodity, and a disposition is a taxable event. Selling crypto for dollars, trading one crypto for another, converting to fiat, or using crypto to pay are all dispositions. So moving crypto to fund a deposit, or cashing out and converting, can trigger a capital gain (or business income) on the crypto itself, entirely separate from the tax-free status of the winnings. The winnings can be untaxed while the crypto leg is taxable.' },
      { type: 'callout', title: 'Not tax advice', text: 'This is general information sourced to the CRA, not personal tax advice. Crypto cost-base tracking and the capital-gains inclusion rate for your tax year are exactly the kind of detail worth confirming with the CRA or a tax professional before you file.' },
    ],
    faqs: [
      { question: 'Is it illegal to play at an offshore crypto casino in Canada?', answer: 'No. Canada’s Criminal Code targets the people who keep, operate or facilitate gambling, not individual players. There is no provision under which a Canadian commits an offence by placing bets at an offshore online casino, and we are aware of no prosecutions of individual players. What you give up is regulation: an offshore site is not licensed or backstopped by any Canadian authority.' },
      { question: 'Is online gambling legal in Ontario specifically?', answer: 'Yes. Ontario runs a licensed, regulated online-gambling market that opened on 4 April 2022, regulated by the AGCO and conducted by iGaming Ontario under the section 207 "conduct and manage" exemption in the Criminal Code. Alberta became the second province with a comparable market when its own launched on 13 July 2026.' },
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
      { label: "Alberta.ca: Alberta's iGaming strategy", href: 'https://www.alberta.ca/albertas-igaming-strategy' },
      { label: 'Gambling Insider: Alberta sets July 13 launch date', href: 'https://www.gamblinginsider.com/news/151877/alberta-igaming-market-launch-july-13' },
      { label: 'Gowling WLG: Alberta iGaming, registration and transition analysis', href: 'https://gowlingwlg.com/en/insights-resources/articles/2026/alberta-igaming' },
      { label: 'Gambling Insider: Ontario iGaming tops C$4bn in 2025', href: 'https://www.gamblinginsider.com/news/107709/ontario-igaming-revenue-2025-4-billion-record-growth' },
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
      // Batch note 2026-08-11: everything below the pointer line and above the
      // "Update, August 2026" section is FROZEN (highest-earning AI asset,
      // owner directive). Updates are ADDITIVE ONLY: the dated update section
      // at the end of this array, and this one dated pointer. reviewBy
      // tripwire 2026-09-01 recorded in STATE.md: the update section needs a
      // fresh pass at each bill milestone (Senate committee report due
      // 2026-08-17, then Senate passage or amendment, then commencement).
      { type: 'p', text: 'August 2026 note: a federal Gambling Reform Bill is now before Parliament. It does not change the player position described on this page; the dated update at the end covers where the bill stands.' },
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
      { type: 'h2', text: 'Update, August 2026: where the Gambling Reform Bill actually stands' },
      { type: 'p', text: 'The April 2026 package described above now has its legislative vehicle. The Interactive Gambling Amendment (Gambling Reform) Bill 2026 was introduced to the House of Representatives on 2 July 2026, together with a companion National Self-exclusion Register (Cost Recovery Levy) Amendment Bill funding the BetStop register, and the Prime Minister has called it the strongest anti-gambling regulation Australia has ever seen. As of 11 August 2026 it is not yet law: the bill sits with the Senate Environment and Communications Legislation Committee, whose report is due on 17 August 2026, and the Senate is where passage is genuinely contested.' },
      { type: 'p', text: 'What the bill regulates is wagering advertising and harm reduction, not casino legality. Schedule 1 bans the broadcast of wagering ads during live sport coverage between 6am and 8.30pm, caps them at three an hour on free-to-air television in that window, bans the broadcasting of odds, and extends the prohibitions to sporting venues and uniforms and to gambling promotion by athletes, celebrities and influencers. The measures are slated to commence on 1 January 2027.' },
      { type: 'p', text: 'The live negotiation is over inducements: sign-up offers, bonus bets and the promotions that arrive by app and email. Witnesses at the Senate inquiry criticised the bill for leaving online inducements untouched, the government has been in talks with the opposition on curbing them, and the Coalition, the Greens and several crossbenchers argue the bill falls short of the Murphy inquiry recommendations. Senate amendments are a realistic prospect, and what emerges may be stricter than what was introduced.' },
      { type: 'callout', title: 'What this changes for a player: nothing, so far', text: 'Every operative measure in the bill targets licensed wagering operators, broadcasters and advertisers. Nothing in it creates an offence for the individual playing at an offshore casino, and nothing in it changes the position set out on this page: providing an online casino to Australians is already prohibited under section 15, and the player is not the target of the Act. As of 11 August 2026 that line holds. This section will be updated as the bill progresses.' },
      // ======================================================================
      // FILLED 2026-08-18 from the committee report PDF (sole source; tabling
      // date cross-checked against the GamblingReform48P inquiry page). Para
      // refs in the commit record. The second dated entry below it is
      // news-sourced with in-text reported-by attribution. Additive only vs
      // production; the 11-Aug section above stays byte-identical. The
      // production fence + repointed gate after legalContent stay in place,
      // inert, protecting any future scaffold on this page.
      { type: 'h2', text: 'Update, 17 August 2026: what the Senate committee recommended' },
      { type: 'p', text: 'The Senate Environment and Communications Legislation Committee, which closed submissions on 24 July and heard two days of evidence in Canberra on 3 and 4 August, tabled its report on 17 August 2026. The headline is one sentence: the committee recommends that the Senate pass the bills. The fine print carries more weight. The committee view describes the bill as an advance on the status quo that "may also require some amendment", and names five matters that "should be addressed in the bill": inducements, the continuation of gambling advertising around live sport broadcasts, the opt-out model for online wagering ads, a commencement date the affected industries called unachievable, and uncertainty in the definitions that decide what the law actually catches.' },
      { type: 'p', text: 'Beneath that recommendation the committee split three ways, and the instruments matter. The Australian Greens lodged a formal dissenting report through Senator Sarah Hanson-Young: do not pass in its current form, amend for a complete ban on online gambling advertising, a national gambling regulator and an outright inducements ban, and legislate separately to make operators forfeit proceeds of crime. Coalition senators Sarah Henderson and Dean Smith filed additional comments rather than a dissent: the opposition could not support the bill unamended, inducements go unaddressed, in their reading the bill weakens the 2018 protections against wagering ads during live sport as those protections apply online, and they oppose the foreign-matched-lottery ban outright. Senator David Pocock lodged his own formal dissenting report arguing the bill "fails each part" of the test the government set for itself, with twelve recommendations running from a three-year phase-in of a full advertising ban and an immediate inducements ban to a national regulator and an overhaul of federal lobbying rules.' },
      { type: 'p', text: 'The live issue going into the report was inducements: witnesses criticised the bill for leaving sign-up offers and bonus bets untouched. The report confirms that reading from every direction. The majority names inducements first among the matters that should be addressed in the bill, and each of the three non-government positions demands an outright ban.' },
      { type: 'p', text: 'For readers of this page the consequential part is Schedule 2, which advances with the pass recommendation and escalates enforcement against offshore operators rather than players. Proposed section 15J would require banks and payment-system participants to block outbound transfers from Australian accounts to designated interactive gambling services. Proposed section 15AB would put a proactive blocking duty on internet providers, DNS providers, app stores and search engines, and ACMA would gain removal, link-deletion and app-removal notice powers, with civil penalties up to 1,000 penalty units. The evidence also drew the regime\'s boundaries. VPNs sit outside the blocking framework: Racing Australia asked for their inclusion and the bill does not provide it. And ACMA told the inquiry it has not examined blocking inbound funds, meaning winnings coming back to players, which Racing Australia proposed. One industry-submitted figure for scale, attributed as such rather than as a committee finding: Responsible Wagering Australia cited research putting the offshore market at $3.9 billion, roughly 36 per cent of Australian online gambling, with half of surveyed BetStop registrants still gambling offshore.' },
      { type: 'callout', title: 'What this changes for a player', text: 'As of 18 August 2026 the player position described on this page is unchanged: nothing in the committee report or in any of the dissenting reports or additional comments proposes an offence for the individual playing at an offshore casino. What the report does advance is enforcement pressure around the player. If the bill passes with Schedule 2 intact, expect more blocking of AUD payments to offshore operators and blocking duties across internet providers, DNS, app stores and search. This section will be updated when the Senate votes.' },
      { type: 'h2', text: 'Update, 18 August 2026: the government amends its own bill' },
      { type: 'p', text: 'Around the report\'s tabling, the government moved to amend its own bill. A ministerial release of 18 August 2026 from Communications Minister Anika Wells sets out the package: a ban on direct marketing of inducements for 14 days after sign-up, a ban on inducement marketing to customers flagged as at risk of gambling harm, a three-month inducement ban after a person deregisters from BetStop, a ban on commissions tied to customer activity, a live-sport advertising blackout extended to 15 minutes before play, and a Wagering Advertising Opt-out Register run by ACMA and funded by a levy on wagering providers. SBS News reported on 17 August that the amendments were expected to be debated the following day. All of this is reported and moving rather than settled law, and none of it touches the two facts this page turns on: providing an online casino to Australians remains prohibited under section 15, and the advertising and inducement rules bind licensed wagering operators. If anything, the direction of travel for offshore operators is tighter, because the same bill carries the Schedule 2 payment-blocking and site-blocking regime described above.' },
      // ======================================================================
      // ENTRY 3, added 2026-08-20: Senate passage. Fact of passage anchored on
      // the bill homepage (aph.gov.au, status "Passed Both Houses", fetched
      // 2026-08-20); House vote and floor-crossers are news colour, attributed
      // in text. Commencement dates deliberately OMITTED: parlinfo blocks the
      // as-passed text (403), so the as-introduced dates are not carried
      // forward per verify-or-omit; the assent addendum states them from the
      // Act as made. Additive only; everything above stays byte-identical.
      { type: 'h2', text: 'Update, 19 August 2026: the Gambling Reform Bill passes the Senate' },
      { type: 'p', text: 'The bill has passed the Parliament. The parliamentary record shows the House of Representatives agreed to a package of amendments on 18 August 2026 (26 government and 45 opposition amendments) and passed the bill the same day, and the Senate agreed to the second and third readings on 19 August 2026 without amending it further; the bill\'s status on the parliamentary record now reads "Passed Both Houses". Royal assent is pending, and a dated addendum will record it here when it lands.' },
      { type: 'p', text: 'ABC News reported the House vote at 96 votes to 9 on 18 August, with two Coalition MPs, Pat Conaghan and Andrew Wallace, crossing the floor to vote against the bill on the ground that it did not go far enough. Passage followed a Labor and Coalition deal, reported on 17 August, that toughened the original bill: inducement-marketing restrictions including a 14-day ban after sign-up and a 90-day ban after a person deregisters from BetStop, a ban on inducement marketing to customers flagged as at risk, a ban on commissions for staff, agents and affiliate marketers of gambling companies, the live-sport advertising blackout extended to 15 minutes before play, the ACMA-run advertising opt-out register, and a statutory review of the measures after three years.' },
      { type: 'p', text: 'For readers of this page, the point is the one made in the committee-report entry above, now upgraded: Schedule 2 is no longer a proposal. The payment-blocking duty on banks and payment participants and the proactive blocking duties on internet providers, DNS providers, app stores and search engines have passed the Parliament and await assent and commencement. One honesty note on timing: the commencement timetable of the Act as passed has not yet been published in a form we can verify against the amended text, so this page states no operative dates for those duties yet. The assent addendum will carry the dates from the Act as made rather than repeating the introduced bill\'s timetable, which the amendment process may have moved.' },
      { type: 'callout', title: 'What this changes for a player: still nothing, and that is now settled', text: 'Nothing in the bill as passed creates an offence for the individual playing at an offshore casino. The amendments were about advertising, inducements and enforcement machinery, all of it aimed at operators, platforms and payment providers, so the position described on this page holds. What will change over time is friction: once the offshore-enforcement schedule commences, expect more blocked AUD payment routes and more blocked sites, apps and search results. As of 20 August 2026 royal assent is pending.' },
      // ==================== END 17-20 AUG ENTRIES ===========================
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
      { label: 'Interactive Gambling Amendment (Gambling Reform) Bill 2026 (Parliament of Australia)', href: 'https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7520' },
      { label: 'DSS: delivering meaningful reform to reduce gambling harms', href: 'https://ministers.dss.gov.au/media-releases/19071' },
      { label: 'Senate committee report: Gambling Reform Bill 2026 and Cost Recovery Levy Amendment Bill 2026 (tabled 17 August 2026)', href: 'https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/GamblingReform48P/Report' },
      { label: 'SBS News: government unveils last-minute gambling reforms (17 August 2026)', href: 'https://www.sbs.com.au/news/article/government-unveils-last-minute-gambling-reforms-ahead-critical-new-report/6ip0v0bht' },
      { label: 'ABC News: two Coalition MPs cross the floor as gambling reforms pass the House (18 August 2026)', href: 'https://www.abc.net.au/news/2026-08-18/federal-politics-live-blog-august-18/107048590' },
    ],
  },
}

// Production fence for the Senate-report scaffold (INVERTED 2026-08-17; the
// 2026-08-16 version FAILED any Vercel build while a token remained, which
// deploy-froze the whole site once the report did not land on the 17th).
// Mechanism now: on production builds (VERCEL set), every block or source
// entry carrying a [REPORT-PENDING: ...] token is EXCLUDED from the content
// the page renders, so the scaffold is absent from production HTML in any
// form while local/dev builds still render it (tokens visibly ugly) for
// execution-day preview. The hard gate is REPOINTED, not removed: if a token
// survives the exclusion anywhere it would render (lead, faqs, meta strings,
// h1, hubAnchor), the build still fails, so leaking remains structurally
// impossible. Execution-day flow unchanged: filling the slots and deleting
// the tokens is what brings the section into production.
const SCAFFOLD_TOKEN = 'REPORT-PENDING'
const isProductionBuild = Boolean(process.env.VERCEL)

const publishedLegalContent: Record<string, LegalContent> = !isProductionBuild
  ? legalContent
  : Object.fromEntries(
      Object.entries(legalContent).map(([slug, content]) => [
        slug,
        {
          ...content,
          blocks: content.blocks.filter((b) => !JSON.stringify(b).includes(SCAFFOLD_TOKEN)),
          sources: content.sources.filter((s) => !JSON.stringify(s).includes(SCAFFOLD_TOKEN)),
        },
      ])
    )

if (isProductionBuild && JSON.stringify(publishedLegalContent).includes(SCAFFOLD_TOKEN)) {
  throw new Error(
    'country/[slug]/legal: a REPORT-PENDING token would render in production output (it sits outside the excludable blocks/sources arrays); build blocked'
  )
}

export async function generateMetadata(
  props: PageProps<'/country/[slug]/legal'>
): Promise<Metadata> {
  const { slug } = await props.params
  const content = publishedLegalContent[slug]
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
  const content = publishedLegalContent[slug]
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
    dateModified: legalPageLastmod(slug),
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
          <span>{updatedLabel(slug)}</span>
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
