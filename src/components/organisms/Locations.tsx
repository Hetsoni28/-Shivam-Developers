'use client'

import { useState } from 'react'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { FadeUp, StaggerChildren, itemVariant } from '@/components/atoms/Animations'
import { motion } from 'framer-motion'
import { projects, ProjectData } from '@/data/projects'
import { getGoogleMapsUrl } from '@/lib/maps'

function LocationCard({ loc }: { loc: ProjectData }) {
  const [hovered, setHovered] = useState(false)
  const mapsUrl = loc.mapUrl || getGoogleMapsUrl(loc.latitude, loc.longitude, loc.location)

  return (
    <motion.div
      variants={itemVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border p-8 transition-all duration-[400ms]"
      style={{
        borderColor: hovered ? 'rgba(168,90,24,0.35)' : 'rgba(34,34,34,0.1)',
        background: hovered ? '#F2ECE4' : 'transparent',
      }}
    >
      <div className="mb-5">
        <MapPin size={18} className="text-primary" strokeWidth={1.4} />
      </div>

      <h3
        className="text-dark mb-1"
        style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 300 }}
      >
        {loc.title}
      </h3>
      <p
        className="mb-7 line-clamp-1"
        style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'rgba(74,74,74,0.55)' }}
      >
        {loc.location}
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.65rem] font-medium tracking-[0.15em] uppercase transition-colors duration-200 hover:text-primary"
          style={{ color: 'rgba(74,74,74,0.6)' }}
        >
          Maps <ArrowUpRight size={11} />
        </a>
        <span className="w-px h-3" style={{ background: 'rgba(34,34,34,0.15)' }} />
        <a
          href={`/projects/${loc.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.65rem] font-medium tracking-[0.15em] uppercase text-primary hover:text-[#8A4A12] transition-colors duration-200"
        >
          View Project <ArrowUpRight size={11} />
        </a>
      </div>

      {/* Copper bottom border on hover */}
      <div
        className="absolute bottom-0 left-0 h-px bg-primary transition-all duration-500"
        style={{ width: hovered ? '100%' : '0%' }}
      />
    </motion.div>
  )
}

export function Locations() {
  return (
    <section id="locations" className="bg-warm-white">
      <div className="mx-auto max-w-screen-xl px-6 py-28 md:px-14 md:py-36 lg:px-20">
        <FadeUp className="mb-16">
          <h2
            className="text-display text-dark"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
          >
            Built Where Life Connects.
          </h2>
        </FadeUp>

        <StaggerChildren
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          stagger={0.08}
        >
          {projects.map((loc) => (
            <LocationCard key={loc.slug} loc={loc} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
