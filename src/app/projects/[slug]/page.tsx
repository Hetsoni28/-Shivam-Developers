import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { ProjectHero } from '@/components/organisms/ProjectHero'
import { ProjectGallery } from '@/components/organisms/ProjectGallery'
import { InquiryForm } from '@/components/organisms/InquiryForm'
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import { CheckCircle2, Download, MapPin } from 'lucide-react'
import { getGoogleMapsUrl } from '@/lib/maps'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const mapsUrl = project.mapUrl || getGoogleMapsUrl(project.latitude, project.longitude, project.location)

  return (
    <>
      <Navbar />
      <main className="bg-warm-white">
        <ProjectHero
          title={project.title}
          category={project.category}
          propertyType={project.propertyType}
          coverImage={project.coverImage}
        />

        {/* Overview */}
        <section className="py-20 md:py-32 px-6 md:px-14 lg:px-20 max-w-screen-lg mx-auto text-center">
          <h2 className="text-display text-dark text-3xl md:text-5xl mb-6">About The Project</h2>
          <p className="text-charcoal/80 leading-[1.8] font-inter md:text-lg">
            {project.description}
          </p>
        </section>

        {/* Gallery */}
        <ProjectGallery images={project.gallery} />

        {/* Amenities */}
        {project.amenities.length > 0 && (
          <section className="py-20 md:py-32 bg-[#F2ECE4]">
            <div className="max-w-screen-xl mx-auto px-6 md:px-14 lg:px-20">
              <h2 className="text-display text-dark text-4xl md:text-5xl mb-12 text-center">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {project.amenities.map((amenity, i) => (
                  <div key={i} className="bg-white p-6 flex items-center gap-4">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span className="font-inter text-sm text-charcoal font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Location & Brochure */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 md:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-display text-dark text-4xl mb-6">Location</h2>
              <div className="flex items-start gap-3 mb-8">
                <MapPin className="text-primary mt-1" size={20} />
                <p className="font-inter text-charcoal/80 leading-[1.6]">
                  {project.location}
                </p>
              </div>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
                Open in Google Maps
              </a>
            </div>

            {project.brochure && (
              <div className="bg-warm-white p-10 flex flex-col justify-center items-start border border-charcoal/5">
                <h2 className="text-display text-dark text-3xl mb-4">Official Brochure</h2>
                <p className="font-inter text-sm text-charcoal/60 mb-8">
                  Download the complete project brochure to view detailed floor plans, specifications, and terms.
                </p>
                <a href={project.brochure} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Download PDF <Download size={16} />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="py-20 md:py-32 bg-[#1A1A1A]">
          <div className="max-w-screen-md mx-auto px-6 md:px-14">
            <div className="text-center mb-12">
              <h2 className="text-display text-white text-4xl md:text-5xl mb-4">Enquire Now</h2>
              <p className="text-white/60 font-inter text-sm">
                Register your interest for {project.title}. Our team will contact you shortly.
              </p>
            </div>
            
            <div className="bg-warm-white p-8 md:p-12">
              <InquiryForm defaultProject={project.title} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
