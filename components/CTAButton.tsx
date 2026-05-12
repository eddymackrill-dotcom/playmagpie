import Link from 'next/link'

type CTAButtonProps = {
  href: string
  label?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const variantStyles = {
  primary: 'bg-[#7BB8D4] hover:bg-[#8fc4d8] text-[#0a0a0a] font-bold shadow-[0_0_20px_rgba(123,184,212,0.2)] hover:shadow-[0_0_30px_rgba(123,184,212,0.35)] transition-shadow',
  secondary: 'bg-[#1a1a1a] hover:bg-[#222222] text-[#f5f5f5] font-semibold border border-[#222222] hover:border-[#333333]',
  outline: 'border border-[#7BB8D4] text-[#7BB8D4] hover:bg-[#7BB8D4]/10 font-semibold',
}

export default function CTAButton({
  href,
  label = 'Play Now',
  variant = 'primary',
  size = 'md',
  external = false,
}: CTAButtonProps) {
  const className = `inline-flex items-center justify-center gap-1.5 rounded-lg transition-all ${sizes[size]} ${variantStyles[variant]}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className={className}>
        {label}
        <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}
