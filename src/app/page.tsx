import { Navbar } from '@/components/organisms/Navbar'
import { Hero } from '@/components/organisms/Hero'
import { ConstructionScroll } from '@/components/organisms/ConstructionScroll'
import { IntroSection } from '@/components/organisms/IntroSection'
import { FeaturedProjects } from '@/components/organisms/FeaturedProjects'
import { WhyShivam } from '@/components/organisms/WhyShivam'
import { Journey } from '@/components/organisms/Journey'
import { Locations } from '@/components/organisms/Locations'
import { BrochureCTA } from '@/components/organisms/BrochureCTA'
import { FinalCTA } from '@/components/organisms/FinalCTA'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { projects } from '@/data/projects'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ConstructionScroll />
        <IntroSection />
        <FeaturedProjects projects={projects} />
        <WhyShivam />
        <Journey />
        <Locations />
        <BrochureCTA />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
