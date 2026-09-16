import { Breadcrumb } from '@/components/molecules/Breadcrumb'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { Locations as LocationsSection } from '@/components/organisms/Locations'

export default function LocationsPage() {
  return (
    <>
      <Navbar transparentTheme="light" />
      <main className="pt-24 min-h-screen bg-warm-white">
        <div className="px-6 md:px-14 lg:px-20 max-w-screen-xl mx-auto pt-4 pb-2">
          <Breadcrumb theme="dark" />
        </div>
        <LocationsSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}







