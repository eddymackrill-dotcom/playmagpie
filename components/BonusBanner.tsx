import CTAButton from './CTAButton'

type Props = {
  casinoName: string
  bonusText: string
  affiliateUrl: string
  subtext?: string
}

export default function BonusBanner({ casinoName, bonusText, affiliateUrl, subtext }: Props) {
  return (
    <div className="relative overflow-hidden bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7BB8D4]/[0.06] to-transparent pointer-events-none" />
      <div className="relative">
        <div className="text-[#7BB8D4] text-xs font-bold uppercase tracking-widest mb-1.5">
          Featured Offer — {casinoName}
        </div>
        <div className="text-2xl font-bold text-[#f5f5f5]">{bonusText}</div>
        {subtext && <div className="text-[#888888] text-sm mt-1.5">{subtext}</div>}
      </div>
      <div className="relative flex-shrink-0">
        <CTAButton href={affiliateUrl} label="Claim Bonus" variant="primary" size="lg" external />
      </div>
    </div>
  )
}
