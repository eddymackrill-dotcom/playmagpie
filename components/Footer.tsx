import Link from 'next/link'
import Image from 'next/image'

const casinoLinks = [
  { href: '/best-crypto-casinos', label: 'Best Crypto Casinos' },
  { href: '/fast-withdrawal-casinos', label: 'Fast Withdrawal Casinos' },
  { href: '/high-roller-casinos', label: 'High Roller Casinos' },
  { href: '/no-kyc-casinos', label: 'No KYC Casinos' },
]

const infoLinks = [
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#222222] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
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
            <p className="text-[#888888] text-sm leading-relaxed max-w-xs">
              Independent ratings for crypto casinos. Scored on withdrawals, bonuses,
              KYC friction and VIP value — so you find the right platform fast.
            </p>
          </div>

          <div>
            <h4 className="text-[#f5f5f5] font-semibold text-sm mb-4 uppercase tracking-wider">Casino Lists</h4>
            <ul className="space-y-2.5">
              {casinoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-[#7BB8D4] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#f5f5f5] font-semibold text-sm mb-4 uppercase tracking-wider">Information</h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-[#7BB8D4] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#222222] pt-8">
          <p className="text-[#888888] text-xs leading-relaxed mb-3">
            PlayMagpie is an independent affiliate review site. We may earn commissions when you sign up through our links — this never influences our scores or rankings. Always gamble responsibly. Check your local laws before playing.
          </p>
          <p className="text-[#444444] text-xs">
            © {new Date().getFullYear()} PlayMagpie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
