'use client'

import { motion } from 'framer-motion'
import { FadeUp, ScaleReveal } from '@/components/atoms/Animations'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const easing = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '3', label: 'Landmark Projects' },
  { value: '200+', label: 'Families Housed' },
]

// Premium architectural image — warm evening, residential building exterior
const INTRO_IMAGE =
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=90&w=1600&auto=format&fit=crop'

export function IntroSection() {
  return (
    <section id="about" className="bg-beige overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-14 md:py-32 lg:px-20">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div>
            <FadeUp delay={0.05}>
              <p
                className="text-primary uppercase tracking-[0.2em] mb-5"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem' }}
              >
                Our Philosophy
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="text-dark leading-[1.05]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                }}
              >
                More Than Buildings.
                <br />
                We Create Places
                <br />
                <em style={{ fontStyle: 'italic', color: '#C47840' }}>To Belong.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p
                className="mt-6 text-charcoal/70 leading-[1.9] max-w-md"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem' }}
              >
                Shivam Developers brings together thoughtful design, meticulous
                craftsmanship and a deep understanding of modern living to build
                spaces that endure — architecturally and emotionally.
              </p>
            </FadeUp>

            {/* Stats row */}
            <FadeUp delay={0.3}>
              <div className="mt-10 flex gap-8 border-t border-dark/10 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="text-dark"
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 600,
                        fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-charcoal/55 mt-1"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.06em' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-2.5 border-b border-primary pb-0.5 text-[0.65rem] font-medium tracking-[0.18em] uppercase text-primary transition-all duration-300 hover:gap-4"
              >
                Discover Our Story{' '}
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </FadeUp>
          </div>

          {/* ── Right: Architectural image ── */}
          <ScaleReveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.img
                src={INTRO_IMAGE}
                alt="Shivam Developers — architectural quality"
                className="w-full h-full object-cover"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1.0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: easing }}
              />
              {/* Dark vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
              {/* Copper corner accent */}
              <div className="absolute top-0 left-0 w-px h-24 bg-primary" />
              <div className="absolute top-0 left-0 h-px w-24 bg-primary" />
            </div>

            {/* Floating caption chip */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-white px-5 py-3 shadow-lg"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing, delay: 0.6 }}
            >
              <p
                className="text-primary font-medium"
                style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}
              >
                Premium Quality
              </p>
              <p
                className="text-charcoal/50 mt-0.5"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', letterSpacing: '0.1em' }}
              >
                EVERY DETAIL MATTERS
              </p>
            </motion.div>
          </ScaleReveal>

        </div>
      </div>
    </section>
  )
}
