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
          animate={{ scale: hovered ? 1.05 : 1.0 }}
          transition={{ duration: 0.8, ease: easing }}
          style={{
            backgroundImage: project.coverImage ? `url(${project.coverImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#2a2520',
          }}
        />

        {/* Gradient overlay - strong copper/dark tint on hover */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: hovered
              ? 'linear-gradient(to top, rgba(11,9,7,0.95) 0%, rgba(196,120,64,0.4) 50%, rgba(11,9,7,0.6) 100%)'
              : 'linear-gradient(to top, rgba(11,9,7,0.75) 0%, rgba(11,9,7,0.15) 60%, rgba(11,9,7,0.05) 100%)',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Center Button - perfectly matches the clean outline style requested */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.95 }}
          transition={{ duration: 0.4, ease: easing }}
        >
          <span 
            className="px-7 py-3 border border-white text-white text-[0.7rem] tracking-[0.25em] uppercase font-medium bg-transparent transition-all duration-300"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            View Project &rarr;
          </span>
        </motion.div>

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

        {/* Text content - slides down slightly on hover to give focus to the center button */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none flex flex-col justify-end"
          animate={{ y: hovered ? 5 : 0, opacity: hovered ? 0.7 : 1 }}
          transition={{ duration: 0.4, ease: easing }}
        >
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

          {/* Location */}
          {project.location && (
            <div className="mt-4 flex items-center gap-1.5 text-white/55"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem' }}
            >
              <MapPin size={10} className="text-primary" />
              {project.location}
            </div>
          )}

          {/* Copper bottom bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-primary"
            animate={{ width: hovered ? '100%' : '0%' }}
            transition={{ duration: 0.5, ease: easing }}
          />
        </motion.div>
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

        {/* Row 1 â€” Feature card: full width, landscape */}
        {projects.slice(0, 1).map((project, i) => (
          <div key={project.slug} className="mb-4">
            <ProjectCard project={project} index={i} wide />
          </div>
        ))}

        {/* Row 2 â€” Supporting cards: 2-column grid */}
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



