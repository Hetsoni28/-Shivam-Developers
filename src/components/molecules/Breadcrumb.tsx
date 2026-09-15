'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'

interface BreadcrumbProps {
  theme?: 'dark' | 'light'
  className?: string
}

const ROUTE_LABELS: Record<string, string> = {
  about: 'About',
  projects: 'Projects',
  locations: 'Locations',
  brochures: 'Brochures',
  contact: 'Contact',
}

function formatSegment(segment: string): string {
  // Check predefined route labels
  if (ROUTE_LABELS[segment]) {
    return ROUTE_LABELS[segment]
  }

  // Check if it's a project slug
  const project = projects.find((p) => p.slug === segment)
  if (project) {
    return project.title
  }

  // Fallback: convert slug-case to Title Case (e.g., custom-slug -> Custom Slug)
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function Breadcrumb({ theme = 'dark', className = '' }: BreadcrumbProps) {
  const pathname = usePathname()

  // Do NOT display on Home page or Sanity Studio
  if (!pathname || pathname === '/' || pathname.startsWith('/studio')) {
    return null
  }

  const rawSegments = pathname.split('/').filter(Boolean)
  if (rawSegments.length === 0) {
    return null
  }

  const items = [
    { label: 'Home', href: '/', isCurrent: false },
    ...rawSegments.map((segment, index) => {
      const href = '/' + rawSegments.slice(0, index + 1).join('/')
      const isCurrent = index === rawSegments.length - 1
      return {
        label: formatSegment(segment),
        href,
        isCurrent,
      }
    }),
  ]

  const isDark = theme === 'dark'

  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center ${className}`}
    >
      <ol
        className="flex items-center flex-wrap gap-1.5 font-body text-[0.65rem] font-medium not-italic tracking-[0.18em] uppercase leading-[15.6px]"
        style={{
          fontFamily: 'Inter, "Inter Fallback", system-ui, sans-serif',
          fontSize: '0.65rem',
          fontWeight: 500,
          fontStyle: 'normal',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          lineHeight: '15.6px',
        }}
      >
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && (
              <span
                className={`mx-1.5 select-none transition-colors duration-300 ${
                  isDark ? 'text-[rgb(74,74,74)]/40' : 'text-white/40'
                }`}
                aria-hidden="true"
              >
                ›
              </span>
            )}
            {item.isCurrent ? (
              <span
                aria-current="page"
                className={`transition-colors duration-300 ${
                  isDark ? 'text-[rgb(74,74,74)]' : 'text-white'
                }`}
                style={{ color: isDark ? 'rgb(74, 74, 74)' : undefined }}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={`transition-colors duration-200 focus-visible:outline-none focus-visible:underline ${
                  isDark
                    ? 'text-[rgb(74,74,74)]/75 hover:text-primary'
                    : 'text-white/75 hover:text-white'
                }`}
                style={{ color: isDark ? 'rgba(74, 74, 74, 0.75)' : undefined }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  )
}
