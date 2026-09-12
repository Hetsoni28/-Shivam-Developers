'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface ProjectGalleryProps {
  images: string[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length)
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    // Prevent background scrolling
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen, images.length])

  if (!images || images.length === 0) return null

  return (
    <>
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-14 lg:px-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-display text-dark text-4xl md:text-5xl">Gallery</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {images.map((img, i) => (
              <div 
                key={i}
                className="group relative aspect-square overflow-hidden cursor-pointer bg-warm-white"
                onClick={() => {
                  setCurrentIndex(i)
                  setLightboxOpen(true)
                }}
              >
                <img
                  src={img}
                  alt={`Project image ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center backdrop-blur-sm"
          >
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close gallery"
            >
              <X size={32} />
            </button>
            
            <div className="relative w-full max-w-7xl px-4 md:px-16 aspect-video flex items-center justify-center">
              <img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Gallery view ${currentIndex + 1}`}
                className="max-h-[85vh] max-w-full object-contain"
              />
              
              {/* Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length) }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                  >
                    <ChevronLeft size={48} strokeWidth={1} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length) }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                  >
                    <ChevronRight size={48} strokeWidth={1} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-inter tracking-widest">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
