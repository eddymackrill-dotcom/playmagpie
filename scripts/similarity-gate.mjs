// Similarity gate (regulatory programme, 2026-08-11). Compares the visible
// text of built HTML pages pairwise by 5-gram shingle containment and fails
// (exit 1) if any pair exceeds the threshold. This operationalises the
// CLAUDE.md volume-safeguard rule ("no two pages in the same week may share
// more than 30% structural similarity") for the regulatory family.
//
// Usage: node scripts/similarity-gate.mjs <built.html> <built.html> [...]
//   Compares every pair among the given files. Threshold: 30% containment
//   (shared 5-grams / smaller page's 5-gram count). Site-wide boilerplate
//   (nav, footer) is crudely excluded by stripping everything before <main>
//   and after </main> when present.

import { readFileSync } from 'node:fs'

const THRESHOLD = 0.30
const files = process.argv.slice(2)
if (files.length < 2) {
  console.error('need at least two built HTML files')
  process.exit(2)
}

function visibleText(html) {
  let h = html
  const m = h.match(/<main[\s\S]*?<\/main>/)
  if (m) h = m[0]
  h = h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ' ')
  h = h.replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, ' ')
  h = h.replace(/<[^>]+>/g, ' ')
  h = h.replace(/&[a-z#0-9]+;/gi, ' ')
  return h.toLowerCase().replace(/[^a-z0-9$€£%\s.-]/g, ' ').replace(/\s+/g, ' ').trim()
}

function shingles(text, n = 5) {
  const words = text.split(' ').filter(Boolean)
  const set = new Set()
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(' '))
  return set
}

const pages = files.map((f) => ({ f, sh: shingles(visibleText(readFileSync(f, 'utf8'))) }))
let failed = false
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const a = pages[i], b = pages[j]
    let shared = 0
    const smaller = a.sh.size <= b.sh.size ? a.sh : b.sh
    const larger = a.sh.size <= b.sh.size ? b.sh : a.sh
    for (const s of smaller) if (larger.has(s)) shared++
    const containment = smaller.size ? shared / smaller.size : 0
    const pct = (containment * 100).toFixed(1)
    const verdict = containment > THRESHOLD ? 'FAIL' : 'ok'
    if (containment > THRESHOLD) failed = true
    console.log(`${verdict}  ${pct}%  ${a.f}  vs  ${b.f}  (${shared}/${smaller.size} shingles)`)
  }
}
process.exit(failed ? 1 : 0)
