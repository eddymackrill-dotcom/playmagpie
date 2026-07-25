// IndexNow submit-on-deploy (added 2026-07-25, see STATE.md decisions log).
//
// Runs as the npm `postbuild` hook, so it fires at the end of every Vercel
// production build. Submits the full sitemap URL set to api.indexnow.org,
// which distributes to Bing (and other IndexNow engines). Bing is the one
// engine currently serving this site and feeds ChatGPT search / Copilot,
// so fast change-propagation into its index matters.
//
// Hard rule: NON-BLOCKING. A failed ping must never fail a deploy. Every
// path through this script exits 0; failures are logged and swallowed.
//
// Known gap, accepted: the URL list comes from the LIVE sitemap.xml, which
// during a build still reflects the previous deployment. A deploy that adds
// new URLs therefore submits them on the NEXT deploy, or immediately via a
// manual run after the deploy goes live:
//   node scripts/submit-indexnow.mjs --force
// (The --force flag bypasses the production-environment gate. The RUNBOOK
// post-batch checklist covers this for batches that add URLs.)

const KEY = '35f02d6ae156eb490d3edc4b36c99e6350eb27e46138781a818f74b6ac554236'
const HOST = 'www.playmagpie.com'
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const TIMEOUT_MS = 10_000

const log = (msg) => console.log(`[indexnow] ${msg}`)

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function main() {
  const isProd = process.env.VERCEL_ENV === 'production'
  const force = process.argv.includes('--force')
  if (!isProd && !force) {
    log(`skipped: VERCEL_ENV is "${process.env.VERCEL_ENV ?? 'unset'}" (production-only; use --force to override)`)
    return
  }

  const sitemapRes = await fetchWithTimeout(SITEMAP_URL)
  if (!sitemapRes.ok) {
    log(`WARN sitemap fetch returned ${sitemapRes.status}; nothing submitted`)
    return
  }
  const xml = await sitemapRes.text()
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim())
  if (urlList.length === 0) {
    log('WARN sitemap parsed to 0 URLs; nothing submitted')
    return
  }

  const res = await fetchWithTimeout(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  })
  // Per the IndexNow spec: 200 = submitted, 202 = accepted (key validation
  // pending, normal for a freshly published key). Anything else is a warning.
  if (res.status === 200 || res.status === 202) {
    log(`submitted ${urlList.length} URLs for ${HOST}, response HTTP ${res.status}`)
  } else {
    log(`WARN endpoint returned HTTP ${res.status} for ${urlList.length} URLs (deploy unaffected)`)
  }
}

main().catch((err) => {
  log(`WARN submission failed: ${err?.message ?? err} (deploy unaffected)`)
})
