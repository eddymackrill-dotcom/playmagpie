import Link from 'next/link'

// Visible last-reviewed line (trust layer, 2026-07-07). Renders under the H1
// on reviews and country pages. The date comes from lib/last-reviewed.ts and
// is only bumped on genuine verification events; see the honesty rule there.
export default function FactChecked({ date }: { date: string }) {
  return (
    <p className="text-[#555555] text-sm mt-2">
      Facts last verified: {date} ·{' '}
      <Link href="/methodology" className="text-[#7BB8D4]/80 hover:text-[#7BB8D4] hover:underline">
        how we verify
      </Link>
    </p>
  )
}
