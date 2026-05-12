export default function ScoreBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full border bg-[#7BB8D4]/10 text-[#7BB8D4] border-[#7BB8D4]/20">
      {label}
    </span>
  )
}

export function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  const pct = (score / max) * 100
  const fill = score >= 9 ? 'bg-[#7BB8D4]' : score >= 7.5 ? 'bg-[#7BB8D4]/70' : 'bg-[#7BB8D4]/40'

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#222222] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-bold text-[#f5f5f5] w-8 text-right">{score}</span>
    </div>
  )
}
