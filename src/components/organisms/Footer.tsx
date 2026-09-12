'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <defs>
      <linearGradient id="ig-grad" x1="20%" y1="100%" x2="80%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const footerLinks = {
  Projects: [
    { label: 'Shreenand Atira', href: '/projects/shreenand-atira' },
    { label: 'Ratnam Bungalows', href: '/projects/ratnam-bungalows' },
    { label: 'Doctor House', href: '/projects/doctor-house' },
  ],
  Navigate: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Locations', href: '#locations' },
    { label: 'Brochures', href: '#brochures' },
  ],
  Contact: [
    { label: 'Enquire Now', href: '#contact' },
    { label: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' },
    { label: 'WhatsApp', href: 'https://wa.me/+91XXXXXXXXXX' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-screen-xl px-6 pt-20 pb-10 md:px-14 lg:px-20">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 pb-14 border-b border-white/8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-4">
              <span
                className="block text-xs font-medium tracking-[0.22em] uppercase text-white/50 mb-0.5"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Shivam
              </span>
              <span
                className="block text-2xl font-light tracking-[0.18em] text-white"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Developers
              </span>
            </div>
            <p
              className="text-white/40 leading-[1.8] max-w-xs mt-4 mb-6"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem' }}
            >
              Building Spaces. Creating Landmarks. Premium residential
              developments shaped by quality and craftsmanship.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: InstagramIcon, href: '#', label: 'Instagram' },
                { Icon: FacebookIcon, href: '#', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-[0.6rem] font-medium tracking-[0.22em] uppercase text-white/35 mb-5"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-white/25 text-center md:text-left"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem' }}
          >
            © {new Date().getFullYear()} Shivam Developers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-white/25 hover:text-white/60 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem' }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
