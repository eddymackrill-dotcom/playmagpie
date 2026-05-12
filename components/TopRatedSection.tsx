import Link from 'next/link'
import { Casino } from '@/lib/casinos'
import CasinoCard from './CasinoCard'

type Props = {
  title: string
  subtitle?: string
  casinos: Casino[]
  viewAllHref?: string
  viewAllLabel?: string
}

export default function TopRatedSection({
  title,
  subtitle,
  casinos,
  viewAllHref,
  viewAllLabel = 'View All',
}: Props) {
  return (
    <section className="py-14">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#f5f5f5]">{title}</h2>
          {subtitle && <p className="text-[#888888] text-sm mt-1.5">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-[#7BB8D4] hover:text-[#8fc4d8] text-sm font-semibold flex-shrink-0 flex items-center gap-1 transition-colors"
          >
            {viewAllLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {casinos.map((casino, i) => (
          <CasinoCard key={casino.slug} casino={casino} rank={i + 1} />
        ))}
      </div>
    </section>
  )
}
