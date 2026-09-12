export type ProjectStatus = 'Under Construction' | 'Completed' | 'Upcoming'
export type ProjectCategory = 'Residential' | 'Bungalow' | 'Commercial'

export interface ProjectData {
  slug: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  propertyType: string
  location: string
  latitude?: number
  longitude?: number
  description: string
  coverImage: string
  gallery: string[]
  amenities: string[]
  floorPlans: { name: string; url: string }[]
  specifications: { category: string; details: string[] }[]
  brochure: string | null
  mapUrl?: string
  whatsappMessage: string
}

export const projects: ProjectData[] = [
  {
    slug: 'shreenand-atira',
    title: 'Shreenand Atira',
    category: 'Residential',
    status: 'Under Construction',
    propertyType: '2 & 3 BHK Higher Living',
    location: 'Ahmedabad',
    description: 'Thoughtfully designed 2 & 3 BHK apartments offering a premium living experience with modern amenities and beautiful landscaping.',
    // Cinematic mood: golden-hour glowing modern residential tower
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=90&w=2400&auto=format&fit=crop',
    gallery: [
      // Dramatic dusk shot of a modern apartment exterior
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=85&w=2000&auto=format&fit=crop',
      // Lush landscaped garden courtyard
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=2000&auto=format&fit=crop',
      // Bright premium living room interior
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=85&w=2000&auto=format&fit=crop',
      // Modern minimalist kitchen
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=85&w=2000&auto=format&fit=crop',
    ],
    amenities: [
      'Landscaped Garden',
      'Children Play Area',
      'Clubhouse',
      'Indoor Games',
      'Gymnasium',
      '24x7 Security',
    ],
    floorPlans: [],
    specifications: [
      {
        category: 'Structure',
        details: ['Earthquake resistant RCC frame structure'],
      },
      {
        category: 'Flooring',
        details: ['Vitrified tiles in all rooms'],
      },
    ],
    brochure: '/brochures/shreenand-atira.pdf',
    whatsappMessage: 'I am interested in Shreenand Atira (2 & 3 BHK Higher Living).',
  },
  {
    slug: 'ratnam-bungalows',
    title: 'Ratnam Bungalows',
    category: 'Bungalow',
    status: 'Completed',
    propertyType: 'Luxury Bungalows',
    location: 'Ahmedabad',
    latitude: 24.183194,
    longitude: 72.397611,
    description: 'Exclusive luxury bungalows designed for those who appreciate space, privacy, and architectural excellence.',
    // Cinematic mood: grand luxury bungalow, warm evening light
    coverImage: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=90&w=2400&auto=format&fit=crop',
    gallery: [
      // Elegant bungalow facade
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop',
      // Luxury swimming pool at dusk
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=85&w=2000&auto=format&fit=crop',
      // Lush private garden
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=85&w=2000&auto=format&fit=crop',
      // Spacious luxury interior living area
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=85&w=2000&auto=format&fit=crop',
    ],
    amenities: ['Private Garden', 'Security', 'Premium Finishes'],
    floorPlans: [],
    specifications: [],
    brochure: '/brochures/ratnam-bungalows.pdf',
    mapUrl: 'https://www.google.com/maps?q=24.183194,72.397611',
    whatsappMessage: 'I am interested in Ratnam Bungalows.',
  },
  {
    slug: 'doctor-house',
    title: 'Doctor House',
    category: 'Residential',
    status: 'Completed',
    propertyType: 'Premium Residences',
    location: 'Ahmedabad',
    description: 'A landmark premium residential project delivering exceptional quality and thoughtful design.',
    // Cinematic mood: dramatic blue-hour, sleek modern house exterior
    coverImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=90&w=2400&auto=format&fit=crop',
    gallery: [
      // Striking contemporary house exterior — night lit
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=85&w=2000&auto=format&fit=crop',
      // Grand double-height entrance lobby
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=2000&auto=format&fit=crop',
      // Airy master bedroom
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=85&w=2000&auto=format&fit=crop',
      // Premium bathroom with stone finishes
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=85&w=2000&auto=format&fit=crop',
    ],
    amenities: [],
    floorPlans: [],
    specifications: [],
    brochure: '/brochures/doctor-house.pdf',
    whatsappMessage: 'I am interested in Doctor House.',
  },
]
