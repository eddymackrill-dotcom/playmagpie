import { COMPLIANCE_ENTRIES } from '@/lib/compliance-feed'

// RSS mirror of /compliance (built 2026-09-05). Exists for the trade-press
// PR lane: a subscribable feed makes the tracking discoverable to
// journalists. Static by design; regenerates on deploy, which is exactly
// when entries change. Not in the sitemap (machine feed, not a content
// page), so the Bing auto-diff never sees it.

export const dynamic = 'force-static'

const SITE = 'https://www.playmagpie.com'

function esc(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export async function GET() {
  const items = COMPLIANCE_ENTRIES.map((e) => {
    const link = e.home ? `${SITE}${e.home.href}` : `${SITE}/compliance`
    return [
      '    <item>',
      `      <title>${esc(`[${e.jurisdiction}] ${e.title}`)}</title>`,
      `      <link>${esc(link)}</link>`,
      `      <guid isPermaLink="false">${esc(`playmagpie-compliance-${e.date}-${e.jurisdiction}-${e.title.slice(0, 40)}`)}</guid>`,
      `      <pubDate>${new Date(`${e.date}T12:00:00Z`).toUTCString()}</pubDate>`,
      `      <description>${esc(e.summary)}</description>`,
      '    </item>',
    ].join('\n')
  }).join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>PlayMagpie Gambling Compliance News</title>',
    `    <link>${SITE}/compliance</link>`,
    '    <description>Dated, sourced gambling regulatory developments: US state actions, Australia, Canada, Italy and wherever enforcement moves next.</description>',
    '    <language>en</language>',
    items,
    '  </channel>',
    '</rss>',
  ].join('\n')

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
