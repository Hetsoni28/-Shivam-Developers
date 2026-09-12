import React from 'react'

interface ShivamLogoProps {
  theme?: 'light' | 'dark'
  iconOnly?: boolean
  className?: string
  size?: number
}

export function ShivamLogo({
  theme = 'dark',
  iconOnly = false,
  className = '',
  size = 38,
}: ShivamLogoProps) {
  const textColor = theme === 'dark' ? '#1A1A1A' : '#FFFFFF'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>

      {/* ── COPPER SHIELD ICON ── */}
      {/*
        Reference logo analysis (final):
        - Outer shape is roughly a SQUARE with rounded corners
        - TOP-LEFT corner: VERY LARGE radius (~30% of width) = quarter-circle dominant feature
        - TOP-RIGHT: small/sharp corner  
        - BOTTOM-RIGHT: small rounded corner
        - BOTTOM-LEFT: small rounded corner
        - The white bold "S" sits centered inside on the copper fill
      */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Shivam Developers logo mark"
      >
        {/* 
          CORRECT SHAPE (from side-by-side comparison):
          - Top-left: LARGE quarter-circle arc (dominant feature)
          - Top-right: SHARP corner — no rounding at all (just L)
          - Right side: straight down
          - Bottom-right: CONCAVE sweep inward (the S-curve signature)
          - Bottom-left: small round corner
          - Left: straight back up
        */}
        <defs>
          {/* Shield path used as a clip region */}
          <clipPath id="shivam-shield-clip">
            <path d="M 68,2 L 2,2 L 2,55 C 2,80 28,96 56,99 L 86,99 Q 98,99 98,87 L 98,32 A 30,30 0 0,0 68,2 Z" />
          </clipPath>
        </defs>

        {/* Copper shield fill */}
        <path
          d="M 68,2 L 2,2 L 2,55 C 2,80 28,96 56,99 L 86,99 Q 98,99 98,87 L 98,32 A 30,30 0 0,0 68,2 Z"
          fill="#C17A3A"
        />

        {/* S shifted right to fill the copper — no gap on right side */}
        <g clipPath="url(#shivam-shield-clip)">
          <text
            x="64"
            y="86"
            textAnchor="middle"
            fill="white"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontWeight="700"
            fontSize="92"
            letterSpacing="-2"
          >
            S
          </text>
        </g>
      </svg>

      {/* ── WORDMARK ── */}
      {!iconOnly && (
        <div className="flex flex-col" style={{ lineHeight: 1.2 }}>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: textColor,
              transition: 'color 0.4s',
            }}
          >
            Shivam
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.78rem',
              fontWeight: 300,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: textColor,
              transition: 'color 0.4s',
            }}
          >
            Developers
          </span>
        </div>
      )}
    </div>
  )
}
