import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { Locations as LocationsSection } from '@/components/organisms/Locations'

export default function LocationsPage() {
  return (
    <>
      <Navbar transparentTheme="light" />
      <main className="pt-24 min-h-screen bg-warm-white">
        <LocationsSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
