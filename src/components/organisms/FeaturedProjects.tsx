'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ProjectData } from '@/data/projects'
import { FadeUp } from '@/components/atoms/Animations'

const easing = [0.22, 1, 0.36, 1] as const

function ProjectCard({
  project,
  index,
  wide = false,
}: {
  project: ProjectData
  index: number
  wide?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative overflow-hidden block ${wide ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${wide ? 'aspect-[16/9]' : 'aspect-[3/4]'}`}>
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1.0 }}
          transition={{ duration: 0.8, ease: easing }}
          style={{
            backgroundImage: project.coverImage ? `url(${project.coverImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#2a2520',
          }}
        />

        {/* Gradient overlay — always present, stronger on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: hovered
              ? 'linear-gradient(to top, rgba(11,9,7,0.92) 0%, rgba(11,9,7,0.3) 55%, rgba(11,9,7,0.1) 100%)'
              : 'linear-gradient(to top, rgba(11,9,7,0.75) 0%, rgba(11,9,7,0.15) 60%, rgba(11,9,7,0.05) 100%)',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Status badge */}
        {project.status && (
          <div className="absolute top-5 left-5 z-10">
            <span
              className="inline-block text-white/80 text-[0.52rem] tracking-[0.18em] uppercase px-3 py-1.5 backdrop-blur-sm"
              style={{ background: 'rgba(11,9,7,0.55)' }}
            >
              {project.status}
            </span>
          </div>
        )}

        {/* Arrow icon top-right */}
        <motion.div
          className="absolute top-5 right-5 z-10 w-9 h-9 border border-white/30 flex items-center justify-center backdrop-blur-sm"
          animate={{
            borderColor: hovered ? 'rgba(193,122,58,0.8)' : 'rgba(255,255,255,0.3)',
            background: hovered ? 'rgba(193,122,58,0.15)' : 'transparent',
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight
            size={15}
            className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.div>

        {/* Text content — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Index number */}
          <p
            className="text-white/30 mb-3"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', letterSpacing: '0.2em' }}
          >
            {String(index + 1).padStart(2, '0')}
          </p>

          {/* Title */}
          <h3
            className="text-white leading-tight"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 400,
              fontSize: wide ? 'clamp(2rem, 3.5vw, 3rem)' : 'clamp(1.6rem, 2.5vw, 2.2rem)',
            }}
          >
            {project.title}
          </h3>

          {/* Property type */}
          {project.propertyType && (
            <p
              className="text-white/60 mt-1"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', letterSpacing: '0.06em' }}
            >
              {project.propertyType}
            </p>
          )}

          {/* Location + CTA — reveals on hover */}
          <motion.div
            className="mt-4 flex items-center justify-between"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.35, ease: easing }}
          >
            {project.location && (
              <span
                className="flex items-center gap-1.5 text-white/55"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem' }}
              >
                <MapPin size={10} className="text-primary" />
                {project.location}
              </span>
            )}
            <span
              className="text-primary text-[0.62rem] font-medium tracking-[0.16em] uppercase"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Explore →
            </span>
          </motion.div>

          {/* Copper bottom bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-primary"
            animate={{ width: hovered ? '100%' : '0%' }}
            transition={{ duration: 0.5, ease: easing }}
          />
        </div>
      </div>
    </Link>
  )
}

interface FeaturedProjectsProps {
  projects: ProjectData[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section id="projects" className="bg-warm-white">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-14 md:py-32 lg:px-20">

        {/* Header */}
        <FadeUp>
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p
                className="text-primary uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem' }}
              >
                Our Portfolio
              </p>
              <h2
                className="text-dark leading-[1.05]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                }}
              >
                Spaces Crafted
                <br />
                <em style={{ fontStyle: 'italic', color: '#C47840' }}>With Purpose.</em>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <p
                className="max-w-xs text-charcoal/60 leading-[1.8] md:text-right"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.84rem' }}
              >
                Discover thoughtfully designed residential developments across Ahmedabad.
              </p>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-primary text-[0.62rem] font-medium tracking-[0.18em] uppercase border-b border-primary pb-0.5 transition-all duration-300 hover:gap-3"
              >
                View All Projects <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* Row 1 — Feature card: full width, landscape */}
        {projects.slice(0, 1).map((project, i) => (
          <div key={project.slug} className="mb-4">
            <ProjectCard project={project} index={i} wide />
          </div>
        ))}

        {/* Row 2 — Supporting cards: 2-column grid */}
        {projects.length > 1 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.slice(1, 3).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i + 1} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
