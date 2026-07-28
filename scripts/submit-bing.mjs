// Bing URL Submission via the Bing Webmaster API.
//
// Replaces the IndexNow wiring, which was closed unsolved on 2026-07-28 after
// every submission returned 403 UserForbiddedToAccessSite and a full key
// rotation failed to change it. See the STATE.md decisions log for that entry.
//
// MANUAL INVOCATION ONLY. This script is deliberately not wired into the build,
// the deploy, or any npm hook. The .com is under a serving-layer suppression
// following a scaled-content flag, so a burst of submissions carries risk with
// no matching upside. Submit on publish, one page at a time, nothing else.
//
// Usage:
//   node scripts/submit-bing.mjs <siteUrl> <pageUrl> [pageUrl...]
//
// Example:
//   node scripts/submit-bing.mjs https://www.playmagpie.com \
//     https://www.playmagpie.com/guides/why-is-my-crypto-casino-withdrawal-pending
//
// Requires BING_WEBMASTER_KEY in the environment (account-level key from
// WMT Settings > API access). Put it in .env.local, which is gitignored, and
// export it for the run. The key is never written to the repo and never
// printed: all output is passed through a redactor before it reaches stdout.
//
// Quota is per site, 100 daily and 400 monthly, on a shared account key.
// The script prints the quota before and after so the decrement is observable,
// because an HTTP 200 alone is submitted-pending-confirmation, not proof.

const API_BASE = 'https://ssl.bing.com/webmaster/api.svc/json'
const TIMEOUT_MS = 15_000

const KEY = process.env.BING_WEBMASTER_KEY

// Everything printed goes through this. The key can appear in a request URL or
// echoed back inside an error body, so it is stripped on the way out rather
// than relying on each call site to remember. Both the raw key and its
// percent-encoded form are stripped: the key is placed in URLs via
// encodeURIComponent, and a network error message can carry the full request
// URL. For a hex key the two forms are identical, so this only matters if a
// future key ever contains a URL-special character, which is exactly the case
// a redactor should not fail on.
const redact = (value) => {
  const text = typeof value === 'string' ? value : String(value ?? '')
  if (!KEY) return text
  const forms = [...new Set([KEY, encodeURIComponent(KEY)])]
  return forms.reduce((acc, form) => acc.split(form).join('[REDACTED]'), text)
}

const log = (msg) => console.log(`[bing] ${redact(msg)}`)
const fail = (msg) => {
  console.error(`[bing] ERROR ${redact(msg)}`)
  process.exit(1)
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

// Returns { daily, monthly } or null if the call did not succeed. Quota is
// informational, so a failure here reports and continues rather than aborting
// a run whose submissions may already have landed.
async function getQuota(siteUrl) {
  const url = `${API_BASE}/GetUrlSubmissionQuota?apikey=${encodeURIComponent(KEY)}&siteUrl=${encodeURIComponent(siteUrl)}`
  let res
  try {
    res = await fetchWithTimeout(url)
  } catch (err) {
    log(`WARN quota lookup failed: ${err?.message ?? err}`)
    return null
  }
  const body = await res.text()
  if (!res.ok) {
    log(`WARN quota lookup returned HTTP ${res.status}: ${body.slice(0, 300)}`)
    return null
  }
  try {
    const parsed = JSON.parse(body)
    const d = parsed?.d ?? parsed
    return { daily: d?.DailyQuota ?? null, monthly: d?.MonthlyQuota ?? null }
  } catch {
    log(`WARN quota response was not JSON: ${body.slice(0, 300)}`)
    return null
  }
}

const formatQuota = (q) =>
  q ? `daily ${q.daily ?? 'unknown'}, monthly ${q.monthly ?? 'unknown'}` : 'unavailable'

async function submitUrl(siteUrl, pageUrl) {
  const url = `${API_BASE}/SubmitUrl?apikey=${encodeURIComponent(KEY)}`
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ siteUrl, url: pageUrl }),
  })
  const body = await res.text()
  return { ok: res.ok, status: res.status, body }
}

async function main() {
  if (!KEY) {
    fail(
      'BING_WEBMASTER_KEY is not set. Get the account-level key from Bing Webmaster Tools ' +
        'under Settings > API access, put it in .env.local (gitignored), and export it for ' +
        'this run. Nothing was submitted.'
    )
  }

  const [siteUrl, ...pageUrls] = process.argv.slice(2)
  if (!siteUrl || pageUrls.length === 0) {
    fail(
      'Usage: node scripts/submit-bing.mjs <siteUrl> <pageUrl> [pageUrl...]\n' +
        '       Explicit URLs only. This script does not read the sitemap and does not ' +
        'discover URLs. Nothing was submitted.'
    )
  }

  const before = await getQuota(siteUrl)
  log(`site ${siteUrl}`)
  log(`quota before: ${formatQuota(before)}`)
  log(`submitting ${pageUrls.length} URL${pageUrls.length === 1 ? '' : 's'}`)

  let succeeded = 0
  let failed = 0

  for (const pageUrl of pageUrls) {
    try {
      const { ok, status, body } = await submitUrl(siteUrl, pageUrl)
      if (ok) {
        succeeded++
        log(`OK   HTTP ${status}  ${pageUrl}`)
      } else {
        failed++
        log(`FAIL HTTP ${status}  ${pageUrl}  ${body.slice(0, 300)}`)
      }
    } catch (err) {
      failed++
      log(`FAIL ${pageUrl}  ${err?.message ?? err}`)
    }
  }

  const after = await getQuota(siteUrl)
  log(`quota after:  ${formatQuota(after)}`)

  if (before && after && before.daily !== null && after.daily !== null) {
    const used = before.daily - after.daily
    log(`daily quota decremented by ${used}`)
  }

  log(`done: ${succeeded} submitted, ${failed} failed`)
  log(
    'Status is submitted-pending-confirmation. Only URLs visibly appearing in ' +
      'WMT URL Submission reporting count as verified. HTTP 200 is not proof.'
  )

  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  fail(`unexpected failure: ${err?.message ?? err}`)
})
