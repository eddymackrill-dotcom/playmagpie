# Legality-content opportunity survey (2026-08-11)

Report only; nothing created or modified by this survey. Occasioned by the
/country/australia/legal AI-citation surge (23 on 7 Aug -> 207 on 10 Aug ->
347 on 11 Aug, driven by the Gambling Reform Bill news cycle). The pattern
this survey looks for: a dated regulatory event plus "is it legal / can I
use / right now" question demand plus an asset of ours positioned to be the
grounded answer.

## 1. Inventory: what legality content exists

- **/country/[slug]/legal sub-pages: exactly two live, canada and
  australia** (LEGAL_ALLOWLIST in the route; confirmed against the code and
  sitemap). Both primary-sourced, statute-cited, operator-vs-player framed.
  The pattern is paused for new markets: NZ/IE/NO were deferred 2026-06-19
  for tested-market pollution (external demand corroboration required).
- **Inline legal framing on country hubs (Batch 1 rewrites):** every hub
  leads on a regulatory fact. NZ: the 1 Dec 2026 licence deadline (title +
  reviewBy tripwire). Finland: Veikkaus monopoly wind-down, licensed market
  1 July 2027 (title + H1). Netherlands: bank blocking + kansspelbelasting
  37.8%. Norway: Lottstift payment blocklist + outside-EEA winnings tax.
  Sweden: Spellag 14 kap. 9 one-bonus rule. Germany: GGL licensing regime.
  Japan: "The Yen Is Easy, the Law Is Not" (promotion criminalised 25 Sep
  2025, publisher-side; recorded in the decisions log). Canada: Ontario
  carve-out. Australia: IGA operator-targeting.

## 2. Per-market assessment

| Market | Regulatory event | Event date / proximity | Demand evidence held | Asset / gap |
|---|---|---|---|---|
| **NZ** | Licensed-only enforcement deadline; offshore operators must exit or licence | **1 Dec 2026, 16 weeks out, statutory and certain** | Pre-crash GSC NZ query family exists but is tested-market (needs external corroboration per refusal rules); zero Bing rows today | Hub carries the deadline in its title; **no /legal sub-page**; the deadline IS the news moment |
| **CA (Alberta)** | Alberta iGaming launch, second licensed province | 2026, exact go-live unannounced (AGLC to confirm) | Canada = cleanest pre-crash GSC market; /country/canada/legal already indexed | **Existing legal sub-page**; gap is only the dated update section when launch confirms |
| **FI** | Veikkaus monopoly ends; licensed market opens | 1 July 2027; parliamentary milestones through 2026-27 | Kryptokasino demand validated at hub build (clean untested market); FAQ schema live on hub | Hub carries the reform; no /legal sub-page; milestones are additive-update material |
| **JP** | Offshore-promotion criminalisation in force; enforcement wave (279 arrests H1 2025) | In force since 25 Sep 2025; ongoing enforcement news | **The only converting Bing query on any country page is accessibility-shaped: "is crypto casino accepting jpy" (2 imp, 1 click, pos 2)**; 2 AI citations on the hub | Hub only. A JP /legal page is informational, not promotional, but the /legal pattern is paused and the market is re-parked; treat as constrained |
| **AU** | Gambling Reform Bill (this session's Part 1); Senate report 17 Aug, commencement 1 Jan 2027 | Live now | 347 citations, 4 grounding queries at 17-37% share | Covered by the Part 1 additive update + 1 Sep tripwire |
| **NL** | Kansspelbelasting at 37.8% (2026 step of the legislated rise) | In force; no known next event in repo | Zero Bing/GSC signal | Hub only; no event to time |
| **SE / NO / DE / IE** | SE: Spellag stable. NO: monopoly + blocklist stable (reform chatter NOT verified; do not cite). DE: GGL stable. IE: GRAI licensing rollout under the Gambling Regulation Act 2024 is a plausible 2026 event but is NOT verified in the repo | Unknown / needs verification | 1 AI citation each (DE, SE); DE has the only country-page Bing keyword row (4 imp pos 8, commercial-shaped not legality-shaped) | Hubs only. IE is the one worth a verification pass if the /legal pattern reopens |

## 3. Ranked opportunities

**1. New Zealand: /country/new-zealand/legal, built ahead of the 1 December
deadline.** The only entry with an Australia-shaped setup: a hard-dated
national news moment, guaranteed to fire, 16 weeks out, in a market where
our hub already owns the deadline framing. The deadline converts every
NZ player's question into exactly the surge pattern ("is it still legal",
"can I still use X after 1 December"). Effort: one page in the proven
legal-template shape (statutes already verified in countryContext:
Gambling Act 2003, DIA, the 1 Dec enforcement date, IRD tax treatment).
Constraints, stated honestly: it is a NEW URL (counts against the 4/month
cap, needs the carrier-link rule and a scaled-content risk statement), and
the tested-market rule requires external demand corroboration
(keyword-research pass) before build, though the event itself will
generate demand no historical dataset can show yet. **Timing proposal:
build in the first half of November, so the page is indexed and citable
before the news cycle peaks, mirroring how australia/legal was already in
place when its bill news hit.**

**2. Canada: additive Alberta-launch update on the existing
/country/canada/legal.** Zero cap cost, zero new URL, the exact mechanic
executed for Australia this session: a dated section plus lastmod bump the
week the AGLC confirms go-live. The page already carries "Alberta next"
framing, so the update slot is pre-built. Trigger: AGLC/Alberta iGaming
Corporation launch confirmation (owner glance or news check at monthly
audits). Effort: an afternoon. Proposed tripwire: check Alberta status at
each monthly audit from September.

**3. Finland: additive reform-milestone updates on the /country/finland
hub, with a /legal sub-page decision deferred to 2027.** The 1 July 2027
market opening is certain but far; the nearer milestones (licensing
application window opening, operator list news) are additive-update
material on the hub, which already leads on the reform. A dedicated
/legal page makes sense closer to the opening, when "is it legal in
Finland right now" demand actually spikes; building it now would spend a
cap slot 11 months early.

Not proposed: Japan (accessibility demand is real and evidenced, but the
market is re-parked and the /legal pattern is paused; revisit only if the
owner reopens Japan); Ireland (GRAI rollout needs primary-source
verification before it can even be assessed); NL/SE/NO/DE (no dated event,
no legality-shaped demand signal held).

## 4. Cap and mechanics notes

- New URLs (NZ legal page) count against the 4/month publishing cap and
  the 2/session cap; additive updates (Canada, Finland, Australia) do not.
- Any new page ships with >= 1 contextual prose link from a same-commit
  modified page (crawl-discovery rule) and an explicit per-page
  scaled-content risk assessment in the proposal.
- The Australia surge is channel evidence, not Google evidence: citations
  are Bing/Copilot grounding events. Under the standing Google-only goal
  framing, NZ-legal would need its Google-side demand case stated
  separately; this survey was commissioned as a one-off Bing/AI-channel
  exception (recorded in STATE.md).
