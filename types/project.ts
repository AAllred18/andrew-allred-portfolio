export type ProjectType = {
  _id: string
  title: string
  slug: string
  shortSummary: string
  fullDescription: string
  categories: string[]
  skills: string[]
  role: string
  projectType: string
  timeline?: string
  featuredImage: string
  galleryImages?: string[]
  outcomes?: string[]
  challenges?: string[]
  contributions?: string[]
  problem: string
  approach: string
  implementation: string
  features?: string[]
  results: string
  lessons: string
  links?: { label: string; url: string }[]
  featured?: boolean
  published?: boolean
}