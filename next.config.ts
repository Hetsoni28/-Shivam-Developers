import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Next.js 15.5.24's built-in Segment Explorer DevTools has a bug:
  // it crashes with "Cannot read properties of null (reading 'useContext')"
  // causing every page to return 500 in development mode.
  devIndicators: false,
}

export default nextConfig
