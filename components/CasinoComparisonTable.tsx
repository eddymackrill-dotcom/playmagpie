import Link from 'next/link'
import { Casino } from '@/lib/casinos'
import ScoreBadge from './ScoreBadge'
import CTAButton from './CTAButton'
import CasinoLogo from './CasinoLogo'

export default function CasinoComparisonTable({ casinos }: { casinos: Casino[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#222222]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#111111] border-b border-[#222222]">
            <th className="text-left px-4 py-3.5 text-[#888888] font-semibold w-8">#</th>
            <th className="text-left px-4 py-3.5 text-[#888888] font-semibold">Casino</th>
            <th className="text-left px-4 py-3.5 text-[#888888] font-semibold hidden md:table-cell">Bonus</th>
            <th className="text-left px-4 py-3.5 text-[#888888] font-semibold hidden lg:table-cell">Payouts</th>
            <th className="text-left px-4 py-3.5 text-[#888888] font-semibold hidden lg:table-cell">KYC</th>
            <th className="text-center px-4 py-3.5 text-[#888888] font-semibold">Score</th>
            <th className="text-right px-4 py-3.5 text-[#888888] font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {casinos.map((casino, i) => (
            <tr
              key={casino.slug}
              className={`border-b border-[#222222] last:border-0 hover:bg-[#1a1a1a]/60 transition-colors ${i === 0 ? 'bg-[#7BB8D4]/[0.03]' : ''}`}
            >
              <td className="px-4 py-4 text-[#888888] font-bold">
                {i === 0 ? (
                  <span className="text-[#7BB8D4]">★</span>
                ) : (
                  i + 1
                )}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-[#222222] flex-shrink-0 overflow-hidden">
                    <CasinoLogo src={casino.logo} name={casino.name} size={32} />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/reviews/${casino.slug}`}
                      className="font-semibold text-[#f5f5f5] hover:text-[#7BB8D4] transition-colors block"
                    >
                      {casino.name}
                    </Link>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {casino.badges.slice(0, 2).map((badge) => (
                        <ScoreBadge key={badge} label={badge} />
                      ))}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <span className="text-[#888888] text-xs leading-relaxed">{casino.bonusSummary}</span>
              </td>
              <td className="px-4 py-4 hidden lg:table-cell">
                <span className="text-[#f5f5f5] font-semibold text-xs">{casino.withdrawalTime}</span>
              </td>
              <td className="px-4 py-4 hidden lg:table-cell">
                <span className="text-xs font-semibold text-[#f5f5f5]">
                  {casino.kycLevel}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="inline-flex flex-col items-center">
                  <span className="text-xl font-bold text-[#7BB8D4]">{casino.trustScore}</span>
                  <span className="text-xs text-[#888888]">/ 10</span>
                </div>
              </td>
              <td className="px-4 py-4 text-right">
                <CTAButton href={casino.affiliateUrl} label="Play Now" size="sm" external />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
