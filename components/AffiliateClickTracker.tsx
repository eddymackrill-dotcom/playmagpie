'use client'

import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

// Outbound affiliate click tracking (added 2026-08-18). One delegated
// document-level listener instead of per-anchor handlers: every affiliate
// link on the site carries rel~="sponsored" (CTAButton's external branch
// plus the two raw anchors on best-bitcoin-casino-canada and
// bnb-crypto-casinos), and nothing else does, so the selector is precise.
// The hostname map is computed server-side in the layout from
// lib/casinos.ts and passed down, keeping the catalogue out of the client
// bundle while staying a single source of truth.
//
// Navigation safety: affiliate links are all target="_blank", the handler
// never calls preventDefault, and sendGAEvent is a fire-and-forget
// dataLayer push, so a click can never be delayed or broken by analytics.

type Props = {
  // hostname (e.g. "bc.game") -> operator slug (e.g. "bc-game")
  operatorsByHost: Record<string, string>
}

export default function AffiliateClickTracker({ operatorsByHost }: Props) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // auxclick covers middle-click open-in-new-tab; ignore right-click.
      if (e.type === 'auxclick' && e.button !== 1) return
      const target = e.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[rel~="sponsored"]')
      if (!(anchor instanceof HTMLAnchorElement) || !anchor.href) return
      let host: string
      try {
        host = new URL(anchor.href).hostname.replace(/^www\./, '')
      } catch {
        return
      }
      const operator = operatorsByHost[host]
      // Second filter: rel=sponsored AND a known affiliate host. Internal
      // links and non-affiliate outbounds never match either condition.
      if (!operator) return
      sendGAEvent('event', 'affiliate_click', {
        operator,
        page_path: window.location.pathname,
        link_url: anchor.href,
        link_text: (anchor.textContent ?? '').trim().slice(0, 60),
      })
    }
    // Capture phase so no inner handler can swallow the click first.
    document.addEventListener('click', handler, true)
    document.addEventListener('auxclick', handler, true)
    return () => {
      document.removeEventListener('click', handler, true)
      document.removeEventListener('auxclick', handler, true)
    }
  }, [operatorsByHost])

  return null
}
