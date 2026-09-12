'use client'

import { FileText, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/atoms/Animations'

export function BrochureCTA() {
  return (
    <section id="brochures" className="bg-primary">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-14 md:py-32 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeUp>

            <h2
              className="text-display text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Official Project
              <br />
              Brochures.
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p
              className="text-white/60 leading-[1.85] mb-8"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem' }}
            >
              Access official project information, floor plans, specifications and
              complete project details for every Shivam Developers development.
            </p>

            <a
              href="#"
              className="group inline-flex items-center gap-2.5 bg-white text-primary px-7 py-4 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-dark hover:text-white hover:-translate-y-0.5"
            >
              <FileText size={14} />
              View All Brochures{' '}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
