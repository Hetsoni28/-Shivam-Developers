'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline-dark' | 'copper-ghost'
  showArrow?: boolean
  className?: string
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  showArrow = false,
  className = '',
}: ButtonProps) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    'outline-dark': 'btn-outline-dark',
    'copper-ghost':
      'inline-flex items-center gap-2.5 text-primary border border-primary/30 px-7 py-3.5 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5',
  }[variant]

  const inner = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  )

  const cls = `group ${variantClass} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    )
  }

  return (
    <motion.button onClick={onClick} className={cls} whileTap={{ scale: 0.98 }}>
      {inner}
    </motion.button>
  )
}
