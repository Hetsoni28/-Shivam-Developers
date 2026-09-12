'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeUp } from '@/components/atoms/Animations'

const steps = [
  { num: '01', label: 'Vision', desc: 'Conceiving the ideal development opportunity with community and lifestyle at the core.' },
  { num: '02', label: 'Planning', desc: 'Meticulous planning of layouts, amenities, and infrastructure for sustainable living.' },
  { num: '03', label: 'Design', desc: 'Architectural design that balances aesthetics, functionality and livability.' },
  { num: '04', label: 'Execution', desc: 'Precision construction by experienced teams committed to quality at every stage.' },
  { num: '05', label: 'Delivery', desc: 'Seamless handover with complete documentation, support and aftercare.' },
]

function JourneyStep({
  step,
  index,
  active,
  onClick,
}: {
  step: typeof steps[0]
  index: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start text-left focus:outline-none group"
      aria-pressed={active}
    >
      {/* Number */}
      <span
        className="transition-all duration-500"
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          lineHeight: 1,
          color: active ? '#A85A18' : 'transparent',
          WebkitTextStroke: active ? '0px' : '1px rgba(74,74,74,0.4)',
        }}
      >
        {step.num}
      </span>

      {/* Dot + line */}
      <div className="flex items-center gap-0 w-full my-4">
        <div
          className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 flex-shrink-0"
          style={{
            borderColor: active ? '#A85A18' : '#4A4A4A',
            background: active ? '#A85A18' : 'transparent',
          }}
        />
        <div
          className="flex-1 h-px transition-all duration-700 ml-0"
          style={{
            background: active
              ? 'linear-gradient(90deg, #A85A18, rgba(168,90,24,0.2))'
              : 'rgba(74,74,74,0.2)',
          }}
        />
      </div>

      {/* Label */}
      <span
        className="transition-colors duration-400"
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '1.3rem',
          fontWeight: 300,
          color: active ? '#222222' : '#4A4A4A',
        }}
      >
        {step.label}
      </span>

      {/* Description */}
      <p
        className="mt-2 leading-[1.75] transition-opacity duration-500"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.78rem',
          color: '#4A4A4A',
          opacity: active ? 0.7 : 0,
          maxHeight: active ? '100px' : '0',
          overflow: 'hidden',
          transition: 'opacity 0.4s ease, max-height 0.5s ease',
        }}
      >
        {step.desc}
      </p>
    </button>
  )
}

export function Journey() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-beige overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-6 py-28 md:px-14 md:py-36 lg:px-20">
        <FadeUp className="mb-16">

          <h2
            className="text-display text-dark"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
          >
            From Vision To Delivery.
          </h2>
        </FadeUp>

        {/* Desktop: horizontal timeline */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:grid gap-0"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {steps.map((step, i) => (
            <JourneyStep
              key={step.num}
              step={step}
              index={i}
              active={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </motion.div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col gap-10">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-5">
              <div className="flex flex-col items-center gap-0">
                <div
                  className="w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 mt-1"
                  style={{ borderColor: '#A85A18', background: '#A85A18' }}
                />
                {i < steps.length - 1 && (
                  <div className="flex-1 w-px bg-charcoal/20 mt-2 min-h-[3rem]" />
                )}
              </div>
              <div>
                <p className="text-eyebrow mb-1">{step.num}</p>
                <h3
                  className="text-dark"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', fontWeight: 300 }}
                >
                  {step.label}
                </h3>
                <p
                  className="mt-2 text-charcoal/65 leading-[1.75]"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem' }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
