'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '@/types/dashboard'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { BlogForm } from './blog-form'
import { BlogList } from './blog-list'

export function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const data = getFromStorage<BlogPost[]>(STORAGE_KEYS.BLOGS, [])
    setBlogs(data)
  }, [])

  const handleAdd = () => {
    setEditingId('')
  }

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id)
  }

  const handleSubmit = (data: BlogPost) => {
    setIsLoading(true)
    try {
      let updated: BlogPost[]
      if (editingId === '') {
        // New blog
        updated = [...blogs, { ...data, id: Date.now().toString() }]
      } else {
        // Edit existing
        updated = blogs.map((blog) => (blog.id === editingId ? data : blog))
      }
      saveToStorage(STORAGE_KEYS.BLOGS, updated)
      setBlogs(updated)
      setEditingId(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    setIsLoading(true)
    try {
      const updated = blogs.filter((blog) => blog.id !== id)
      saveToStorage(STORAGE_KEYS.BLOGS, updated)
      setBlogs(updated)
    } finally {
      setIsLoading(false)
    }
  }

  if (editingId !== null) {
    return (
      <BlogForm
        initialData={editingId === '' ? undefined : blogs.find((b) => b.id === editingId)}
        onSubmit={handleSubmit}
        onCancel={() => setEditingId(null)}
        isLoading={isLoading}
      />
    )
  }

  return (
    <BlogList
      blogs={blogs}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
      isLoading={isLoading}
    />
  )
}
