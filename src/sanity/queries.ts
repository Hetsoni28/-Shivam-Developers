import { sanityClient } from './client'

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  status?: string
  category?: string
  propertyType?: string
  location?: string
  description?: string
  mainImage?: { asset: { url: string }; alt?: string }
  featured?: boolean
  brochureUrl?: string
  googleMapsUrl?: string
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "project"] | order(_createdAt desc)[0...6] {
        _id, title, slug, status, category, propertyType, location, description, featured,
        brochureUrl, googleMapsUrl,
        mainImage { asset->{ url }, alt }
      }`
    )
  } catch {
    return []
  }
}
