'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navLinks = [
  { href: '/best-crypto-casinos', label: 'Crypto Casinos' },
  { href: '/fast-withdrawal-casinos', label: 'Fast Withdrawals' },
  { href: '/high-roller-casinos', label: 'High Roller' },
  { href: '/no-kyc-casinos', label: 'No KYC' },
  { href: '/guides', label: 'Guides' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/magpie-logo.png"
              alt="PlayMagpie Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-[#f5f5f5] text-lg tracking-tight">
              PlayMagpie
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[#888888] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/best-crypto-casinos"
              className="px-4 py-2 bg-[#7BB8D4] hover:bg-[#8fc4d8] text-[#0a0a0a] font-bold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(123,184,212,0.25)] hover:shadow-[0_0_30px_rgba(123,184,212,0.4)]"
            >
              Top Casinos
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[#888888] hover:text-[#f5f5f5]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#222222] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm text-[#888888] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] rounded-lg"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/best-crypto-casinos"
            className="block mt-2 px-4 py-2 bg-[#7BB8D4] text-[#0a0a0a] font-bold text-sm rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Top Casinos
          </Link>
        </div>
      )}
    </header>
  )
}
