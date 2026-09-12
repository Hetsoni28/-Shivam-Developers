'use client'

import { ArrowRight, MessageCircle } from 'lucide-react'
import { FadeUp } from '@/components/atoms/Animations'
import Link from 'next/link'

export function FinalCTA() {
  return (
    <section id="contact" className="bg-warm-white relative overflow-hidden">

      {/* Copper corner accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/60 to-transparent" />

      <div className="relative mx-auto max-w-screen-xl px-6 py-28 md:px-14 md:py-40 lg:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp>

            <h2
              className="text-display text-dark"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
            >
              Ready To Begin
              <br />
              <em style={{ fontStyle: 'italic', color: '#A85A18' }}>Your Journey?</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p
              className="mt-7 text-charcoal/60 leading-[1.85]"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem' }}
            >
              Connect directly with Shivam Developers to explore current projects,
              book a site visit, or discuss your real estate aspirations.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2.5 bg-dark text-white px-8 py-4 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-primary hover:-translate-y-0.5"
              >
                Explore Projects{' '}
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="https://wa.me/+91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 border border-dark/25 text-dark px-8 py-4 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              >
                <MessageCircle size={13} /> Enquire Now
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
