import { Breadcrumb } from '@/components/molecules/Breadcrumb'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { projects } from '@/data/projects'
import { FadeUp, StaggerChildren, itemVariant } from '@/components/atoms/Animations'
import { Download, FileText } from 'lucide-react'

export default function BrochuresPage() {
  const projectsWithBrochures = projects.filter(p => p.brochure)

  return (
    <>
      <Navbar transparentTheme="light" />
      <main className="pt-24 min-h-screen bg-warm-white pb-20">
        <div className="px-6 md:px-14 lg:px-20 max-w-screen-xl mx-auto pt-4 pb-2">
          <Breadcrumb theme="dark" />
        </div>
        <section className="px-6 py-16 md:px-14 lg:px-20 max-w-screen-xl mx-auto">
          <FadeUp>
            <h1 className="text-display text-dark text-5xl md:text-7xl mb-6">
              Brochure Library
            </h1>
            <p className="max-w-2xl text-charcoal/70 leading-[1.8] font-inter mb-16">
              Download the official brochures for our landmark projects. Explore detailed floor plans, specifications, and project visions.
            </p>
          </FadeUp>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsWithBrochures.map((project) => (
              <div key={project.slug} className="bg-white border border-charcoal/10 flex flex-col h-full transition-transform hover:-translate-y-1 duration-300">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-display text-dark text-2xl mb-2">{project.title}</h3>
                  <p className="font-inter text-sm text-charcoal/60 mb-8 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex flex-col gap-3">
                    <a 
                      href={project.brochure!} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center"
                    >
                      Download PDF <Download size={14} />
                    </a>
                    <a 
                      href={`/projects/${project.slug}`}
                      className="btn-outline-dark w-full justify-center"
                    >
                      View Project <FileText size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}







