import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { Journey } from '@/components/organisms/Journey'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Navbar transparentTheme="light" />
      <main className="pt-24 min-h-screen bg-warm-white">
        {/* Hero Section */}
        <section className="px-6 py-20 md:px-14 lg:px-20 max-w-screen-xl mx-auto text-center">
          <h1 className="text-display text-dark text-5xl md:text-7xl lg:text-[5.5rem] mb-6">
            Building With Purpose.
          </h1>
          <p className="max-w-2xl mx-auto text-charcoal/70 leading-[1.8] font-inter">
            Shivam Developers is committed to creating premium residential spaces shaped by architecture, quality, and the way modern families live.
          </p>
        </section>

        {/* Content Section */}
        <section className="px-6 py-16 md:px-14 lg:px-20 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-display text-dark text-3xl mb-4">Our Philosophy</h2>
            <p className="text-charcoal/70 leading-[1.8] font-inter">
              We believe that a home is more than just a structure; it is a canvas for life's most precious moments. Our philosophy is rooted in thoughtful design, ensuring every space we build enhances the well-being and lifestyle of its residents. We prioritize natural light, intelligent layouts, and high-quality materials to create environments that stand the test of time.
            </p>
          </div>
          <div>
            <h2 className="text-display text-dark text-3xl mb-4">Our Vision & Mission</h2>
            <p className="text-charcoal/70 leading-[1.8] font-inter mb-6">
              <strong>Vision:</strong> To be the most trusted name in premium real estate by consistently delivering architectural excellence and unparalleled customer satisfaction.
            </p>
            <p className="text-charcoal/70 leading-[1.8] font-inter">
              <strong>Mission:</strong> To build enduring landmarks that enrich communities, applying rigorous quality standards and innovative design solutions to every project we undertake.
            </p>
          </div>
        </section>

        <Journey />

        {/* Contact CTA */}
        <section className="px-6 py-20 md:px-14 lg:px-20 max-w-screen-xl mx-auto text-center border-t border-charcoal/10">
          <h2 className="text-display text-dark text-4xl mb-6">Start Your Journey With Us</h2>
          <Link href="/contact" className="btn-primary">
            Get In Touch <ArrowRight size={14} />
          </Link>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
