'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  name: string
  size?: number
  className?: string
}

export default function CasinoLogo({ src, name, size = 40, className = '' }: Props) {
  const [error, setError] = useState(false)

  if (error || !src || src === '#') {
    return (
      <div
        className={`flex items-center justify-center text-[#f5f5f5] font-bold text-sm ${className}`}
        style={{ width: size, height: size }}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={`${name} Casino Logo`}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setError(true)}
      unoptimized
    />
  )
}
