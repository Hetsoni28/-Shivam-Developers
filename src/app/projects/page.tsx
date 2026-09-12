'use client'

import { useState } from 'react'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { FeaturedProjects } from '@/components/organisms/FeaturedProjects'
import { projects } from '@/data/projects'
import { FadeUp } from '@/components/atoms/Animations'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Ongoing', 'Completed', 'Upcoming']

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true
    if (filter === 'Ongoing') return p.status === 'Under Construction'
    if (filter === 'Completed') return p.status === 'Completed'
    if (filter === 'Upcoming') return p.status === 'Upcoming'
    return true
  })

  return (
    <>
      <Navbar transparentTheme="light" />
      <main className="pt-24 min-h-screen bg-warm-white pb-20">
        <section className="px-6 pt-16 md:px-14 lg:px-20 max-w-screen-xl mx-auto">
          <FadeUp>
            <h1 className="text-display text-dark text-5xl md:text-7xl mb-12">
              Explore Our Projects
            </h1>
          </FadeUp>

          {/* Filters */}
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 text-xs uppercase tracking-widest font-medium transition-colors ${
                    filter === cat 
                      ? 'bg-primary text-white' 
                      : 'bg-white border border-charcoal/10 text-charcoal hover:border-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>
        </section>
        
        {/* We reuse the FeaturedProjects component for the grid but hide its title by passing it wrapped in a generic container */}
        <div className="bg-warm-white">
          <FeaturedProjects projects={filteredProjects} />
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
