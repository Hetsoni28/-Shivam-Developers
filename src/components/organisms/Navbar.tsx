'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ShivamLogo } from '@/components/atoms/ShivamLogo'
import { Breadcrumb } from '@/components/molecules/Breadcrumb'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Locations', href: '/locations' },
  { label: 'Brochures', href: '/brochures' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps {
  transparentTheme?: 'dark' | 'light'
}

export function Navbar({ transparentTheme = 'dark' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60)
  })

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-warm-white/95 backdrop-blur-sm border-b border-dark/8 shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 md:px-14 py-3.5">
          {/* Logo & Breadcrumb */}
          <div className="flex flex-col items-start justify-center">
            <Link href="/" className="group" aria-label="Shivam Developers Home">
              <ShivamLogo
                theme={scrolled || transparentTheme === 'light' ? 'dark' : 'light'}
              />
            </Link>
            <Breadcrumb
              theme={scrolled || transparentTheme === 'light' ? 'dark' : 'light'}
              className="mt-2"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[0.65rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                  scrolled || transparentTheme === 'light'
                    ? 'text-charcoal hover:text-primary'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`hidden lg:inline-flex items-center gap-1.5 text-[0.6rem] font-medium tracking-[0.18em] uppercase px-4 py-2 transition-all duration-300 ${
                scrolled || transparentTheme === 'light'
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'border border-white/40 text-white hover:bg-white/10'
              }`}
            >
              Enquire Now <ArrowRight size={11} />
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden p-1 transition-colors ${
                scrolled || transparentTheme === 'light' ? 'text-dark' : 'text-white'
              }`}
              aria-label="Open menu"
              suppressHydrationWarning
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <motion.div
        className="fixed inset-0 z-[100] bg-dark flex flex-col"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={menuOpen ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span
            className="text-white text-lg font-light tracking-widest"
            style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.18em' }}
          >
            Shivam Developers
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
            suppressHydrationWarning
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col justify-center flex-1 px-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -24 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-4xl font-light text-white/80 hover:text-white border-b border-white/10 transition-colors"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 text-xs tracking-[0.18em] uppercase font-medium"
            >
              Enquire Now <ArrowRight size={12} />
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </>
  )
}
