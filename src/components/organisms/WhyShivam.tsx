'use client'

import { Layers, Hammer, MapPin, Heart } from 'lucide-react'
import { FadeUp, StaggerChildren, itemVariant } from '@/components/atoms/Animations'
import { motion } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    icon: Layers,
    title: 'Thoughtful Design',
    body: 'Every space is conceived with purpose — blending function, beauty and the needs of modern families.',
  },
  {
    icon: Hammer,
    title: 'Quality Construction',
    body: 'From foundation to finish, we insist on materials and methods that stand the test of time.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    body: 'Our developments are placed where connectivity, community and convenience converge.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    body: 'We measure success through the lives enriched within our spaces, not merely the structures built.',
  },
]

function FeatureBlock({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = feature.icon

  return (
    <motion.div
      variants={itemVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-8 border border-white/8 transition-all duration-500 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
        borderColor: hovered ? 'rgba(168,90,24,0.35)' : 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Copper accent corner */}
      <div
        className="absolute top-0 left-0 w-8 h-px bg-primary transition-all duration-500"
        style={{ width: hovered ? '3rem' : '2rem' }}
      />

      {/* Number */}
      <span
        className="text-white/15 font-light"
        style={{ fontFamily: 'var(--font-cormorant)', fontSize: '3.5rem', lineHeight: 1 }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div
        className="mt-4 mb-5 transition-transform duration-400"
        style={{ transform: hovered ? 'translateY(-3px)' : 'translateY(0)' }}
      >
        <Icon
          size={22}
          className="transition-colors duration-300"
          style={{ color: hovered ? '#C47840' : '#A85A18' }}
          strokeWidth={1.4}
        />
      </div>

      <h3
        className="text-white font-light mb-3"
        style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', letterSpacing: '-0.01em' }}
      >
        {feature.title}
      </h3>

      <p
        className="text-white/45 leading-[1.8]"
        style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem' }}
      >
        {feature.body}
      </p>
    </motion.div>
  )
}

export function WhyShivam() {
  return (
    <section className="bg-dark">
      <div className="mx-auto max-w-screen-xl px-6 py-28 md:px-14 md:py-36 lg:px-20">
        <FadeUp>
          <div className="mb-20">

            <h2
              className="text-display text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            >
              Crafted With Purpose.
              <br />
              <em className="text-white/60" style={{ fontStyle: 'italic' }}>
                Built For Generations.
              </em>
            </h2>
          </div>
        </FadeUp>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8" stagger={0.1}>
          {features.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} index={i} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
