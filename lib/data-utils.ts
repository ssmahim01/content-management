/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

// Data management utilities for localStorage
// Easily replaceable with backend API calls

export interface HeroData {
  id: string
  name: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  imagePath: string
}

export interface MediaItem {
  id: string
  title: string
  description: string
  imagePath: string
  category: string
  uploadedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string
  featured: boolean
}

export interface Idea {
  id: string
  title: string
  description: string
  category: string
  icon: string
}

export interface AboutData {
  id: string
  title: string
  bio: string
  achievements: string[]
  skillsText: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  receivedAt: string
  read: boolean
}

// Generic storage helper
function getStorageKey(section: string): string {
  return `dashboard_${section}`
}

function getData<T>(section: string): T[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(getStorageKey(section))
  return data ? JSON.parse(data) : []
}

function setData<T>(section: string, data: T[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(getStorageKey(section), JSON.stringify(data))
}

function addItem<T extends { id: string }>(section: string, item: T) {
  const data = getData<T>(section)
  data.push(item)
  setData(section, data)
}

function updateItem<T extends { id: string }>(section: string, id: string, updates: Partial<T>) {
  const data = getData<T>(section)
  const index = data.findIndex((item) => item.id === id)
  if (index !== -1) {
    data[index] = { ...data[index], ...updates }
    setData(section, data)
  }
}

function deleteItem(section: string, id: string) {
  const data = getData<any>(section)
  const filtered = data.filter((item) => item.id !== id)
  setData(section, filtered)
}

// Hero Section
export const heroService = {
  getHero: (): HeroData | null => {
    const data = getData<HeroData>('hero')
    return data[0] || null
  },
  updateHero: (hero: HeroData) => {
    const data = getData<HeroData>('hero')
    if (data.length === 0) {
      addItem('hero', hero)
    } else {
      setData('hero', [hero])
    }
  },
}

// Media Gallery
export const mediaService = {
  getAllMedia: (): MediaItem[] => getData<MediaItem>('media'),
  getMedia: (id: string): MediaItem | null => {
    const data = getData<MediaItem>('media')
    return data.find((item) => item.id === id) || null
  },
  addMedia: (media: MediaItem) => addItem('media', media),
  updateMedia: (id: string, updates: Partial<MediaItem>) =>
    updateItem<MediaItem>('media', id, updates),
  deleteMedia: (id: string) => deleteItem('media', id),
}

// Blog Posts
export const blogService = {
  getAllPosts: (): BlogPost[] => getData<BlogPost>('blogs'),
  getPost: (id: string): BlogPost | null => {
    const data = getData<BlogPost>('blogs')
    return data.find((post) => post.id === id) || null
  },
  addPost: (post: BlogPost) => addItem('blogs', post),
  updatePost: (id: string, updates: Partial<BlogPost>) =>
    updateItem<BlogPost>('blogs', id, updates),
  deletePost: (id: string) => deleteItem('blogs', id),
}

// Ideas
export const ideasService = {
  getAllIdeas: (): Idea[] => getData<Idea>('ideas'),
  getIdea: (id: string): Idea | null => {
    const data = getData<Idea>('ideas')
    return data.find((idea) => idea.id === id) || null
  },
  addIdea: (idea: Idea) => addItem('ideas', idea),
  updateIdea: (id: string, updates: Partial<Idea>) =>
    updateItem<Idea>('ideas', id, updates),
  deleteIdea: (id: string) => deleteItem('ideas', id),
}

// About Section
export const aboutService = {
  getAbout: (): AboutData | null => {
    const data = getData<AboutData>('about')
    return data[0] || null
  },
  updateAbout: (about: AboutData) => {
    const data = getData<AboutData>('about')
    if (data.length === 0) {
      addItem('about', about)
    } else {
      setData('about', [about])
    }
  },
}

// Contact Messages
export const contactService = {
  getAllMessages: (): ContactMessage[] => getData<ContactMessage>('messages'),
  getMessage: (id: string): ContactMessage | null => {
    const data = getData<ContactMessage>('messages')
    return data.find((msg) => msg.id === id) || null
  },
  addMessage: (message: ContactMessage) => addItem('messages', message),
  markAsRead: (id: string) => updateItem<ContactMessage>('messages', id, { read: true }),
  deleteMessage: (id: string) => deleteItem('messages', id),
}
