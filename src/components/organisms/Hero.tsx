'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, ArrowRight as ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/data/projects'

const easing = [0.22, 1, 0.36, 1] as const

// Fallback cinematic image used only before a project is selected
const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=90&w=2800&auto=format&fit=crop'

export function Hero() {
  const [activeProject, setActiveProject] = useState(0)
  const [mounted, setMounted] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => { setMounted(true) }, [])

  // Current hero image = the active project's cover, or the default
  const currentHeroImage = projects[activeProject]?.coverImage ?? DEFAULT_HERO_IMAGE

  // Subtle mouse parallax on the building photo
  useEffect(() => {
    if (!mounted) return
    const handleMouse = (e: MouseEvent) => {
      if (!imgRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 16
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      imgRef.current.style.transform = `scale(1.08) translate(${x * -0.3}px, ${y * -0.3}px)`
    }
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouse)
    }
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mounted])

  const prevProject = () => setActiveProject(i => (i - 1 + projects.length) % projects.length)
  const nextProject = () => setActiveProject(i => (i + 1) % projects.length)

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0b0907] flex flex-col">

      {/* ───────── Hero background — cross-fades on project change ───────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentHeroImage}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ duration: 1.1, ease: easing }}
        >
          <img
            ref={imgRef}
            src={currentHeroImage}
            alt={`${projects[activeProject]?.title ?? 'Shivam Developers'} — luxury building`}
            className="w-full h-full object-cover object-center"
            style={{ transition: 'transform 0.15s linear', transform: 'scale(1.08)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient — heavy left + bottom, lighter right */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(to right,  rgba(11,9,7,0.92) 0%, rgba(11,9,7,0.55) 50%, rgba(11,9,7,0.22) 100%),
            linear-gradient(to top,    rgba(11,9,7,0.97) 0%, rgba(11,9,7,0.0)  58%)
          `,
        }}
      />

      {/* ───────── Main Content ───────── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Spacer for navbar */}
        <div className="h-14 shrink-0" />

        {/* Hero text block — left-aligned, always visible */}
        <div className="flex-1 flex items-center">
          <div className="px-6 md:px-14 lg:px-20 max-w-2xl w-full">

            {/* Headline */}
            <motion.h1
              className="text-white leading-[1.0]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(3.4rem, 7.5vw, 7.2rem)',
                letterSpacing: '-0.01em',
              }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easing, delay: 0.6 }}
            >
              Building{' '}
              <span style={{ fontStyle: 'italic', color: '#C47840' }}>Spaces.</span>
              <br />
              Creating
              <br />
              <span style={{ fontStyle: 'italic', color: '#C47840' }}>Landmarks.</span>
            </motion.h1>

            {/* CTAs */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easing, delay: 1.85 }}
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 text-[0.67rem] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
              >
                Explore Projects
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 border border-white/35 text-white px-7 py-3.5 text-[0.67rem] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5"
              >
                Enquire Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ───────── Bottom Strip: Featured Projects ───────── */}
        <motion.div
          className="px-6 md:px-14 lg:px-20 pb-6 md:pb-8 mt-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easing, delay: 2.2 }}
        >
          {/* Separator line */}
          <div className="w-full h-px bg-white/10 mb-6" />

          {/* Label row */}
          <p
            className="text-white/40 mb-3 uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem' }}
          >
            Featured Projects
          </p>

          {/* Thumbnails + arrows on the same row */}
          <div className="flex items-stretch gap-3">

            {/* Nav arrows — stacked vertically, same height as thumbnails */}
            <div className="flex flex-col justify-between gap-1.5 shrink-0">
              <button
                onClick={prevProject}
                className="flex-1 w-8 border border-white/25 text-white/60 flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-200"
                aria-label="Previous project"
                suppressHydrationWarning
              >
                <ArrowLeft size={13} />
              </button>
              <button
                onClick={nextProject}
                className="flex-1 w-8 border border-white/25 text-white/60 flex items-center justify-center hover:border-primary hover:text-primary transition-colors duration-200"
                aria-label="Next project"
                suppressHydrationWarning
              >
                <ArrowRightIcon size={13} />
              </button>
            </div>

            {/* Project Thumbnails */}
            <div className="flex gap-3 overflow-hidden">
              {projects.map((project, i) => (
                <button
                  key={project.slug}
                  onClick={() => setActiveProject(i)}
                  className="group relative shrink-0 overflow-hidden transition-all duration-500 text-left cursor-pointer border-0 p-0"
                  style={{
                    width: i === activeProject ? '150px' : '102px',
                    height: '92px',
                  }}
                  suppressHydrationWarning
                  aria-label={`View ${project.title}`}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark overlay — lighter when active */}
                  <div
                    className="absolute inset-0 transition-colors duration-500"
                    style={{ background: i === activeProject ? 'rgba(11,9,7,0.15)' : 'rgba(11,9,7,0.45)' }}
                  />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-dark/95 to-transparent">
                    <p
                      className="text-white font-medium leading-tight truncate"
                      style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.85rem' }}
                    >
                      {project.title}
                    </p>
                    <p
                      className="text-white/55 truncate"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem', letterSpacing: '0.08em' }}
                    >
                      {project.propertyType}
                    </p>
                  </div>

                  {/* Active top indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-primary transition-opacity duration-500"
                    style={{ opacity: i === activeProject ? 1 : 0 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
