'use client'

import { motion } from 'framer-motion'
import { Breadcrumb } from '@/components/molecules/Breadcrumb'

interface ProjectHeroProps {
  title: string
  category: string
  propertyType: string
  coverImage: string
  amenities?: string[]
}

export function ProjectHero({ title, category, propertyType, coverImage, amenities = [] }: ProjectHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-12 pt-28 overflow-hidden bg-warm-white">
      {/* Background Image & Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <img 
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Light gradient overlay matching screenshot - solid white/gray on left, fading to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-white via-warm-white/80 to-transparent w-full md:w-3/5" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-14 lg:px-20 h-full flex flex-col justify-between flex-1">
        
        {/* Top: Breadcrumb */}
        <div className="mt-4 mb-auto">
          <Breadcrumb theme="dark" />
        </div>

        {/* Bottom Area: Title and Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mt-32">
          
          {/* Left: Text Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl"
          >
            <p className="text-primary text-[0.65rem] tracking-[0.25em] uppercase font-bold mb-4">
              {category}
            </p>
            <h1 className="text-display text-dark text-6xl md:text-[7rem] lg:text-[8rem] xl:text-[9.5rem] leading-[0.85] tracking-tight uppercase mb-4 font-light">
              {title}
            </h1>
            <p className="text-charcoal/70 text-sm md:text-lg tracking-wide font-medium">
              {propertyType}
            </p>
          </motion.div>

          {/* Right: Badges */}
          {amenities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap md:justify-end gap-2 max-w-sm pb-2"
            >
              {amenities.slice(0, 3).map((amenity, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 bg-dark/10 border border-dark/10 backdrop-blur-md text-charcoal text-[0.55rem] font-bold tracking-[0.1em] uppercase"
                >
                  {amenity}
                </span>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}



