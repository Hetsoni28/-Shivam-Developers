'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// â”€â”€â”€ Construction stage image paths â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const STAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
]

// â”€â”€â”€ Stage copy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const STAGE_COPY = [
  {
    label: 'Vision',
    heading: 'Every Landmark Begins\nWith A Vision.',
    body: 'An open canvas. A bold idea. A place waiting to become something extraordinary.',
  },
  {
    label: 'Preparation',
    heading: 'The Groundwork\nBegins.',
    body: 'Every detail is planned before the first foundation takes shape.',
  },
  {
    label: 'Foundation',
    heading: 'Built On Strong\nFoundations.',
    body: 'Strength begins beneath the surface.',
  },
  {
    label: 'Structure',
    heading: 'The Vision\nTakes Form.',
    body: 'Layer by layer, the structure rises toward the skyline.',
  },
  {
    label: 'Form',
    heading: 'Architecture\nTakes Shape.',
    body: 'Walls, windows, balconies and spaces begin to define the experience.',
  },
  {
    label: 'Craft',
    heading: 'Every Detail\nMatters.',
    body: 'Materials, finishes and landscapes transform construction into character.',
  },
  {
    label: 'Landmark',
    heading: 'From Vision\nTo Landmark.',
    body: 'A place thoughtfully built for people, life and lasting memories.',
  },
]

const TOTAL_STAGES = STAGES.length   // 7
const SCROLL_HEIGHT = '600vh'

// Width of each stage band in progress (0â€“1)
const STAGE_BAND = 1 / (TOTAL_STAGES - 1)   // ~0.1667

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** Cover-fit an image onto the canvas â€” CSS object-fit:cover equivalent */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
  scale = 1,
) {
  const iAR = img.naturalWidth / img.naturalHeight
  const cAR = canvasW / canvasH

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

  if (iAR > cAR) {
    sw = img.naturalHeight * cAR
    sx = (img.naturalWidth - sw) / 2
  } else {
    sh = img.naturalWidth / cAR
    sy = (img.naturalHeight - sh) / 2
  }

  // Apply subtle scale from center
  if (scale !== 1) {
    const dw = canvasW * scale
    const dh = canvasH * scale
    const dx = (canvasW - dw) / 2
    const dy = (canvasH - dh) / 2
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH)
  }
}

/** Preload all stage images, calls onReady after first + all-complete */
function preloadImages(onReady: (images: HTMLImageElement[]) => void) {
  const images: HTMLImageElement[] = []
  let loadedCount = 0

  STAGES.forEach((src, i) => {
    const img = new window.Image()
    img.decoding = 'async'
    images[i] = img

    const done = () => {
      loadedCount++
      if (loadedCount === 1 || loadedCount === TOTAL_STAGES) onReady(images)
    }
    img.onload  = done
    img.onerror = done
    img.src = src
  })
}

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function ConstructionScroll() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const overlayRef    = useRef<HTMLDivElement>(null)
  const labelRef      = useRef<HTMLParagraphElement>(null)
  const headingRef    = useRef<HTMLHeadingElement>(null)
  const bodyRef       = useRef<HTMLParagraphElement>(null)
  const indicatorRef  = useRef<HTMLDivElement>(null)

  const stateRef = useRef<{
    images:       HTMLImageElement[]
    progress:     number
    raf:          number
    dirty:        boolean
    activeStage:  number
    tweening:     boolean
    startTime:    number
  }>({
    images:      [],
    progress:    0,
    raf:         0,
    dirty:       false,
    activeStage: -1,   // -1 = not set yet
    tweening:    false,
    startTime:   0,
  })

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // â”€â”€ Main setup effect â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const canvas   = canvasRef.current
    const section  = sectionRef.current
    const overlay  = overlayRef.current
    const labelEl  = labelRef.current
    const headEl   = headingRef.current
    const bodyEl   = bodyRef.current
    const indEl    = indicatorRef.current

    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current
    state.startTime = performance.now()

    // â”€â”€ Resize â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      state.dirty = true
    }
    resize()
    window.addEventListener('resize', resize)

    // â”€â”€ Text transition helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const textEls = [labelEl, headEl, bodyEl].filter(Boolean) as HTMLElement[]

    function showStageText(stageIdx: number, instant = false) {
      if (!overlay) return
      const copy = STAGE_COPY[stageIdx]
      if (!copy) return

      if (instant) {
        if (labelEl) labelEl.textContent = copy.label.toUpperCase()
        if (headEl)  headEl.textContent  = copy.heading
        if (bodyEl)  bodyEl.textContent  = copy.body
        gsap.set(textEls, { opacity: 1, y: 0 })
        return
      }

      // Fade out current text, swap copy, fade in
      gsap.to(textEls, {
        opacity: 0,
        y: -10,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => {
          if (labelEl) labelEl.textContent = copy.label.toUpperCase()
          if (headEl) {
            // Preserve line breaks from \n
            headEl.innerHTML = copy.heading
              .split('\n')
              .map(l => `<span style="display:block">${l}</span>`)
              .join('')
          }
          if (bodyEl)  bodyEl.textContent  = copy.body
          gsap.fromTo(
            textEls,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.06 },
          )
        },
      })
    }

    // â”€â”€ Progress indicator dots â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function updateIndicator(stageIdx: number) {
      if (!indEl) return
      const dots = indEl.querySelectorAll<HTMLElement>('[data-dot]')
      dots.forEach((dot, i) => {
        const isActive = i === stageIdx
        gsap.to(dot, {
          backgroundColor: isActive ? '#C47840' : 'rgba(255,255,255,0.35)',
          height: isActive ? '28px' : '6px',
          duration: 0.35,
          ease: 'power2.out',
        })
      })
    }

    // â”€â”€ Initialise text at stage 0 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (overlay) {
      const c0 = STAGE_COPY[0]
      if (labelEl) labelEl.textContent = c0.label.toUpperCase()
      if (headEl) {
        headEl.innerHTML = c0.heading
          .split('\n')
          .map(l => `<span style="display:block">${l}</span>`)
          .join('')
      }
      if (bodyEl) bodyEl.textContent = c0.body
      gsap.set(textEls, { opacity: 0, y: 18 })
    }
    state.activeStage = 0

    // â”€â”€ RAF render loop â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const render = () => {
      state.raf = requestAnimationFrame(render)

      if (!state.dirty) return
      state.dirty = false

      const images   = state.images
      const progress = state.progress
      const W = canvas.width
      const H = canvas.height

      if (images.length === 0) return

      // Very subtle ambient drift (0.5% scale pulsing at 0.1 Hz)
      const elapsed = (performance.now() - state.startTime) / 1000
      const ambientScale = 1 + 0.005 * Math.sin(elapsed * 0.35)

            // Map progress +' float index across 7 stages (0 ? 6)
      const rawIndex = progress * (TOTAL_STAGES - 1)
      const lowerIdx = Math.floor(rawIndex)
      const upperIdx = Math.min(lowerIdx + 1, TOTAL_STAGES - 1)
      const blend    = rawIndex - lowerIdx

      const imgA = images[lowerIdx]
      const imgB = images[upperIdx]

      ctx.clearRect(0, 0, W, H)

      // Make the image crossfade much sharper so they don't overlap for long
      let fadeOutA = 1
      let fadeInB = 0

      // We'll use a dip-to-black style sharp crossfade
      if (blend < 0.5) {
        // First half: fade out A slightly
        fadeOutA = 1 - (blend * 1.5) // Fades down to 0.25
        fadeInB = 0
      } else {
        // Second half: fade in B
        fadeOutA = 0
        fadeInB = (blend - 0.5) * 2 // Fades 0 to 1
      }

      if (imgA?.complete && imgA.naturalWidth > 0 && fadeOutA > 0) {
        ctx.globalAlpha = Math.max(0, Math.min(1, fadeOutA))
        drawCover(ctx, imgA, W, H, ambientScale)
      }

      if (imgB?.complete && imgB.naturalWidth > 0 && fadeInB > 0) {
        ctx.globalAlpha = Math.max(0, Math.min(1, fadeInB))
        drawCover(ctx, imgB, W, H, ambientScale)
        ctx.globalAlpha = 1
      }

      // Dark vignette â€” bottom-left gradient for text legibility
      const vignette = ctx.createLinearGradient(0, H, W * 0.55, 0)
      vignette.addColorStop(0,   'rgba(11,9,7,0.72)')
      vignette.addColorStop(0.5, 'rgba(11,9,7,0.30)')
      vignette.addColorStop(1,   'rgba(11,9,7,0.0)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      // Bottom fade so IntroSection transition is softer
      const bottomFade = ctx.createLinearGradient(0, H * 0.72, 0, H)
      bottomFade.addColorStop(0, 'rgba(11,9,7,0.0)')
      bottomFade.addColorStop(1, 'rgba(11,9,7,0.55)')
      ctx.fillStyle = bottomFade
      ctx.fillRect(0, 0, W, H)
    }

    // Continuous dirty-flag so ambient drift keeps refreshing
    const ambientInterval = setInterval(() => { state.dirty = true }, 40)

    render()

    // â”€â”€ Preload images â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    preloadImages((images) => {
      state.images = images
      state.dirty  = true
      // Once first image is ready, fade in the text overlay
      if (overlay) {
        gsap.fromTo(
          textEls,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.07, delay: 0.2 },
        )
      }
      updateIndicator(0)
    })

    // â”€â”€ Reduced-motion: static final frame, no scroll â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (prefersReducedMotion) {
      state.progress = 1
      state.dirty    = true
      return () => {
        cancelAnimationFrame(state.raf)
        clearInterval(ambientInterval)
        window.removeEventListener('resize', resize)
      }
    }

    // â”€â”€ ScrollTrigger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
      pin: canvas,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        const next = self.progress
        if (next === state.progress) return

        state.progress = next
        state.dirty    = true

        // Determine active stage (0-based integer)
        const rawIndex  = next * (TOTAL_STAGES - 1)
        const stageIdx  = Math.min(Math.round(rawIndex), TOTAL_STAGES - 1)

        if (stageIdx !== state.activeStage) {
          state.activeStage = stageIdx
          showStageText(stageIdx)
          updateIndicator(stageIdx)
        }
      },
    })

    // Also pin the overlay so it rides with the canvas
    const overlayTrigger = overlay
      ? ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: overlay,
          pinSpacing: false,
          anticipatePin: 1,
        })
      : null

    // â”€â”€ Cleanup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    return () => {
      cancelAnimationFrame(state.raf)
      clearInterval(ambientInterval)
      window.removeEventListener('resize', resize)
      trigger.kill()
      overlayTrigger?.kill()
    }
  }, [prefersReducedMotion])

  // â”€â”€ Reduced-motion fallback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (prefersReducedMotion) {
    return (
      <section aria-label="Construction story">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STAGES[TOTAL_STAGES - 1]}
          alt="Completed Shivam Developers landmark"
          style={{ width: '100%', height: '100vh', objectFit: 'cover', display: 'block' }}
        />
      </section>
    )
  }

  // â”€â”€ Main render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  return (
    <section
      ref={sectionRef}
      aria-label="Construction story â€” from vision to landmark"
      style={{ position: 'relative', height: SCROLL_HEIGHT, background: '#0b0907' }}
    >
      {/* Canvas â€” pinned by GSAP ScrollTrigger */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
        }}
      />

      {/* â”€â”€ Text overlay â€” pinned separately â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        ref={overlayRef}
        aria-live="polite"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10,
          // Pulled back up so it overlaps the canvas
          marginTop: '-100vh',
        }}
      >
        {/* Stage text â€” lower-left */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(4rem, 8vh, 7rem)',
            left: 'clamp(1.5rem, 5vw, 5rem)',
            maxWidth: 'min(480px, 90vw)',
          }}
        >
          {/* Small label */}
          <p
            ref={labelRef}
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C47840',
              marginBottom: '0.65rem',
              opacity: 0,
            }}
          />

          {/* Main heading */}
          <h2
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              marginBottom: '1rem',
              opacity: 0,
            }}
          />

          {/* Supporting text */}
          <p
            ref={bodyRef}
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '400px',
              opacity: 0,
            }}
          />
        </div>

        {/* â”€â”€ Progress indicator â€” right side, desktop only â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          ref={indicatorRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 'clamp(1.5rem, 3vw, 2.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
          className="hidden md:flex"
        >
          {STAGE_COPY.map((stage, i) => (
            <div
              key={stage.label}
              data-dot={i}
              title={stage.label}
              style={{
                width: '2px',
                height: '6px',
                borderRadius: '2px',
                backgroundColor: i === 0 ? '#C47840' : 'rgba(255,255,255,0.35)',
                transition: 'background-color 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}



