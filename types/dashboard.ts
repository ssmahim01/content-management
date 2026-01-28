export interface BilingualText {
  en: string
  bn: string
}

export interface Hero {
  id: string
  name: BilingualText
  title: BilingualText
  description: BilingualText
  quote: BilingualText
  ctaText: BilingualText
  ctaLink: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: BilingualText
  excerpt: BilingualText
  content: BilingualText
  category: string
  featured: boolean
  publishedAt: string
  readTime: number
  updatedAt: string
}

export interface Idea {
  id: string
  title: BilingualText
  description: BilingualText
  category: string
  icon: string
  featured: boolean
  updatedAt: string
}

export interface MediaItem {
  id: string
  title: BilingualText
  imageUrl: string
  description?: BilingualText
  category?: string
  uploadedAt: string
}

export interface About {
  id: string
  introduction: BilingualText
  bio: BilingualText
  skills: string[]
  achievements: BilingualText[]
  imageUrl?: string
  updatedAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export interface ContactInfo {
  id: string
  email: string
  phone: BilingualText
  address: BilingualText
  socialLinks: {
    facebook?: string
    twitter?: string
    linkedin?: string
  }
  updatedAt: string
}

export interface Settings {
  id: string
  siteName: string
  siteDescription: BilingualText
  defaultLanguage: "en" | "bn"
  autoPublishBlogs: boolean
  updatedAt: string
}
