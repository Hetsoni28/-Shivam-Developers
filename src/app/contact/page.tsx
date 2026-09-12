import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { FloatingActions } from '@/components/organisms/FloatingActions'
import { InquiryForm } from '@/components/organisms/InquiryForm'
import { FadeUp } from '@/components/atoms/Animations'
import { companyConfig } from '@/data/company'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Navbar transparentTheme="light" />
      <main className="pt-24 min-h-screen bg-warm-white pb-20">
        <section className="px-6 py-16 md:px-14 lg:px-20 max-w-screen-xl mx-auto">
          <FadeUp>
            <h1 className="text-display text-dark text-5xl md:text-7xl mb-16 text-center">
              Get In Touch.
            </h1>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            
            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-4">
                  Corporate Office
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-inter text-sm text-charcoal/80 leading-[1.8]">
                        {companyConfig.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Phone className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <a href={`tel:${companyConfig.phone}`} className="font-inter text-sm text-charcoal/80 hover:text-primary transition-colors block mb-1">
                        {companyConfig.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Mail className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <a href={`mailto:${companyConfig.email}`} className="font-inter text-sm text-charcoal/80 hover:text-primary transition-colors block">
                        {companyConfig.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Clock className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-inter text-sm text-charcoal/80">
                        {companyConfig.businessHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-12 border border-charcoal/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <h2 className="text-display text-dark text-3xl mb-8">Send an Inquiry</h2>
                <InquiryForm />
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
