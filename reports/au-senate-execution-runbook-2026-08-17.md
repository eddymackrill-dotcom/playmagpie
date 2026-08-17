# Execution-day runbook: Senate report update to /country/australia/legal

Prepared 2026-08-16 (pre-flight session). Companion to
`reports/au-senate-scaffold-2026-08-17.md`, which holds the pre-verified
invariant context (fill material with sources) and the slot design. The
fenced scaffold itself sits in `app/country/[slug]/legal/page.tsx`
(working tree at pre-flight close; every report-dependent slot carries a
literal `[REPORT-PENDING: ...]` token).

Hard rules for the day, restated so the session cannot drift:

- The ONLY acceptable source for report contents is the report document
  itself on aph.gov.au. Hearing coverage fills nothing, ever. Secondary
  coverage is colour AFTER the primary is read, never instead of it.
- Additive-only vs production, byte-verified (same discipline as 11 Aug:
  insertions only, zero deletions, zero replacements; the deletion of
  unfilled scaffold blocks happens in the working tree BEFORE commit, so
  the shipped diff vs production remains pure insertions).
- Em-dash-zero on everything written. No new URLs. Session show-me stop:
  owner reviews the filled section before commit (owner instruction for
  this task, 2026-08-16; this specific stop overrides the standing
  autonomy rule for this ship).

## Step a: fetch the report

aph.gov.au returns 403 to generic fetchers. Use a browser user agent:

    curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36" \
      "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/GamblingReform48P"

Look for a Report tab / report link that did not exist at pre-flight
(status then: "Submissions Closed", no report). Confirm what landed IS
the committee's report on the two bills, not a progress report or an
extension notice. Cross-check the bill homepage Notes field
(https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7520)
for a tabling entry. Read the report document (usually a PDF plus HTML
chapters): majority recommendation, any dissenting reports or additional
comments by party, anything on inducements, any stated next step.

## Step b: fill the slots

In `app/country/[slug]/legal/page.tsx`, the fenced blocks sit at the end
of the Australia `blocks` array plus one fenced entry at the end of
`sources`. For each slot: fill from the report document, or DELETE the
whole block if the report does not occasion it (deletions of unfilled
scaffold blocks are pre-commit working-tree edits, invisible to the
shipped diff). Draw invariant framing only from the pre-verified list in
the scaffold file. Attribute hearing-era party positions as dated
positions-at-hearing, never as predictions the report vindicated.

Then: owner show-me review of the filled section before any commit.

## Step c: grep gate (publish blocks on any remaining token)

    grep -rn "REPORT-PENDING" app lib

Must return ZERO hits before commit. Backstop (INVERTED 2026-08-17,
superseding the 08-16 block-the-build version): the production fence in
`app/country/[slug]/legal/page.tsx` (below `legalContent`) EXCLUDES any
token-carrying block or source entry from Vercel builds, so an
accidental push deploys the site WITHOUT the scaffold rather than
failing; a token that would render anywhere outside the excludable
blocks/sources arrays still fails the build. Verified 2026-08-17
(`VERCEL=1` with tokens = green + zero scaffold traces in output; token
in a FAQ = build fails). Consequence for this runbook: an accidental
push before the fill is now SILENT (site deploys, section absent), so
the grep above is the only pre-commit tripwire; run it every time. Leave
the fence in place after filling; it is inert once tokens are gone and
protects any future scaffold on this page.

## Step d: byte-verify additive-only vs production

Before pushing, capture the live page:

    curl -sL -A "Mozilla/5.0" -o before.html "https://www.playmagpie.com/country/australia/legal"

After deploy (step e), capture again to after.html and verify the diff is
pure insertion:

    python -c "
    import difflib
    a=open('before.html',encoding='utf-8').read()
    b=open('after.html',encoding='utf-8').read()
    ops=[o[0] for o in difflib.SequenceMatcher(None,a,b).get_opcodes()]
    print(sorted(set(ops)))"

Acceptable output: only 'equal' and 'insert'. Any 'delete' or 'replace'
outside the expected build-hash noise is a stop-and-inspect. (Next.js
asset hashes change every deploy; if they pollute the diff, compare the
main content region between the H1 and the footer instead, where the
result must be strictly equal + insertions.)

Also in the same commit as the content fill: bump
`lib/route-lastmod.ts` entry `'/country/australia/legal'` to the tabling
date (currently '2026-08-11'), with a dated comment, per the honest
per-page lastmod rule. Title, H1, meta, schema untouched.

## Step e: commit, deploy, dispatch

1. Stage explicit paths only (never `git add -A`): the page file,
   `lib/route-lastmod.ts`, and the two reports files if not yet committed.
2. Commit with a message naming the report and the additive discipline;
   push to master (push is deploy; Vercel builds on push).
3. Confirm push: local and remote SHAs match; report the SHA.
4. Run step d's after-capture and diff once the deploy is live.
5. Bing dispatch, single URL, owner action (content change to an existing
   page never fires the automatic URL-set diff):
   GitHub repo > Actions > "Submit new URLs to Bing" > Run workflow, with
   `https://www.playmagpie.com/country/australia/legal` alone in the urls
   input. Its own run, not batched (live news cycle, same as 11 Aug).
   Standing verification rule: HTTP 200 + quota decrement =
   submitted-pending-confirmation until WMT reporting shows the URL.
6. STATE.md: move the 17 Aug calendar item to done, set the new reviewBy
   to the next milestone the report creates (Senate vote / passage /
   1 Jan 2027 commencement), append the dated decisions entry, commit.

## Abort branch 1: EXTENSION GRANTED / NO REPORT ON 17 AUG

Do nothing to the page. Log one line (STATE.md recovery-log style, dated)
recording that the report did not land and what the inquiry page showed.
Re-check the inquiry page daily until it lands. Do NOT write anything
from hearing coverage while waiting. The fenced scaffold stays as-is; it
cannot ship by construction.

## Abort branch 2: REPORT LANDS BUT IS INTERIM / PROGRESS ONLY

Treat exactly as branch 1 (log one line, re-check daily, write nothing)
unless the owner rules otherwise. A progress report is not the report.
