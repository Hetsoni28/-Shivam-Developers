'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface ProjectHeroProps {
  title: string
  category: string
  propertyType: string
  coverImage: string
}

export function ProjectHero({ title, category, propertyType, coverImage }: ProjectHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-end pb-20 pt-32 overflow-hidden bg-dark">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img 
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-dark/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-14 lg:px-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
              {category}
            </span>
            <span className="w-10 h-[1px] bg-white/30" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
              {propertyType}
            </span>
          </div>
          <h1 className="text-display text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.9]">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden md:flex flex-col items-center gap-4"
        >
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/50" style={{ writingMode: 'vertical-rl' }}>
            Scroll to explore
          </span>
          <ArrowDown size={16} className="text-white/50 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
