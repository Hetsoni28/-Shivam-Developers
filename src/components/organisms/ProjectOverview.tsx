'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import type { ProjectData } from '@/data/projects'
import Link from 'next/link'

export function ProjectOverview({ project, mapsUrl }: { project: ProjectData; mapsUrl?: string }) {
  return (
    <section className="bg-[#fcfbf9] py-16 md:py-24 border-b border-dark/5">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-14 lg:px-20">
        
        {/* Top Area: Description & Buttons */}
        <div className="max-w-4xl mb-20">
          <p className="text-primary text-[0.65rem] tracking-[0.25em] uppercase font-bold mb-8">
            [ OVERVIEW ]
          </p>
          <p className="text-dark text-xl md:text-3xl leading-[1.6] font-light mb-12" style={{ fontFamily: 'var(--font-inter)' }}>
            {project.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={`https://wa.me/919999999999?text=${encodeURIComponent(project.whatsappMessage)}`}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-colors hover:bg-[#a66230]"
            >
              Enquire Now <ArrowRight size={14} />
            </Link>
            
            {project.brochure && (
              <a 
                href={project.brochure}
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-dark/20 text-dark text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
              >
                Download Brochure <Download size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-[1px] bg-dark/10 mb-12" />

        {/* Bottom Area: 4 Data Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0">
          
          {/* Data Point 1 */}
          <div className="flex flex-col md:border-r border-dark/10 md:pr-8">
            <span className="text-dark/40 text-[0.55rem] tracking-[0.2em] uppercase font-bold mb-3">Project Status</span>
            <span className="text-primary text-xl md:text-2xl font-bold uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
              {project.status}
            </span>
            <span className="text-dark/40 text-[0.65rem] font-medium">Current Development Phase</span>
          </div>

          {/* Data Point 2 */}
          <div className="flex flex-col md:border-r border-dark/10 md:px-8">
            <span className="text-dark/40 text-[0.55rem] tracking-[0.2em] uppercase font-bold mb-3">Configuration</span>
            <span className="text-primary text-xl md:text-2xl font-bold uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
              {project.propertyType.replace(' Higher Living', '')}
            </span>
            <span className="text-dark/40 text-[0.65rem] font-medium">Premium Living Spaces</span>
          </div>

          {/* Data Point 3 */}
          <div className="flex flex-col md:border-r border-dark/10 md:px-8">
            <span className="text-dark/40 text-[0.55rem] tracking-[0.2em] uppercase font-bold mb-3">Category</span>
            <span className="text-primary text-xl md:text-2xl font-bold uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
              {project.category}
            </span>
            <span className="text-dark/40 text-[0.65rem] font-medium">Architectural Focus</span>
          </div>

                    {/* Data Point 4 */}
          <div className="flex flex-col md:pl-8">
            <span className="text-dark/40 text-[0.55rem] tracking-[0.2em] uppercase font-bold mb-3">Location</span>
            {mapsUrl ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-xl md:text-2xl font-bold uppercase tracking-tight mb-1 hover:underline decoration-1 underline-offset-4" style={{ fontFamily: 'var(--font-inter)' }}>
                {project.location}
              </a>
            ) : (
              <span className="text-primary text-xl md:text-2xl font-bold uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                {project.location}
              </span>
            )}
            <span className="text-dark/40 text-[0.65rem] font-medium">Prime City Area</span>
          </div>

        </div>

      </div>
    </section>
  )
}

