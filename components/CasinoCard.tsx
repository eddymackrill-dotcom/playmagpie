import Link from 'next/link'
import { Casino } from '@/lib/casinos'
import ScoreBadge from './ScoreBadge'
import CTAButton from './CTAButton'
import CasinoLogo from './CasinoLogo'

export default function CasinoCard({ casino, rank }: { casino: Casino; rank?: number }) {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 hover:border-[#7BB8D4]/30 hover:shadow-[0_0_30px_rgba(123,184,212,0.07)] transition-all group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {rank && (
            <div className="w-7 h-7 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-[#888888]">
              #{rank}
            </div>
          )}
          <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-[#222222] overflow-hidden flex-shrink-0">
            <CasinoLogo src={casino.logo} name={casino.name} size={40} />
          </div>
          <div>
            <h3 className="font-bold text-[#f5f5f5] group-hover:text-white transition-colors">
              {casino.name}
            </h3>
            <p className="text-xs text-[#888888]">{casino.licence}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-[#7BB8D4]">{casino.trustScore}</div>
          <div className="text-xs text-[#888888]">Trust Score</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {casino.badges.map((badge) => (
          <ScoreBadge key={badge} label={badge} />
        ))}
      </div>

      <p className="text-[#888888] text-sm leading-relaxed mb-4 line-clamp-2">
        {casino.reviewSummary}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-t border-b border-[#222222]">
        <div className="text-center">
          <div className="text-[#f5f5f5] font-semibold text-sm">{casino.withdrawalTime}</div>
          <div className="text-[#888888] text-xs mt-0.5">Withdrawals</div>
        </div>
        <div className="text-center border-x border-[#222222]">
          <div className="text-[#f5f5f5] font-semibold text-sm">{casino.kycLevel}</div>
          <div className="text-[#888888] text-xs mt-0.5">KYC</div>
        </div>
        <div className="text-center">
          <div className="text-[#f5f5f5] font-semibold text-sm">{casino.minDeposit}</div>
          <div className="text-[#888888] text-xs mt-0.5">Min Deposit</div>
        </div>
      </div>

      <div className="text-xs text-[#888888] mb-4">
        <span className="text-[#f5f5f5] font-medium">Bonus: </span>
        {casino.bonusSummary}
      </div>

      <div className="flex gap-2">
        <CTAButton href={casino.affiliateUrl} label="Play Now" variant="primary" size="sm" external />
        <Link
          href={`/reviews/${casino.slug}`}
          className="flex-1 text-center px-3 py-2 text-sm text-[#888888] hover:text-[#f5f5f5] border border-[#222222] hover:border-[#333333] rounded-lg transition-all"
        >
          Full Review
        </Link>
      </div>
    </div>
  )
}
