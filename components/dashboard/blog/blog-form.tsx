'use client'

import React from "react"

import { useState } from 'react'
import { BilingualText, BlogPost } from '@/types/dashboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Save, X } from 'lucide-react'

interface BlogFormProps {
  initialData?: BlogPost
  onSubmit: (data: BlogPost) => void
  onCancel: () => void
  isLoading?: boolean
}

export function BlogForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPost>(
    initialData || {
      id: Date().toString(),
      title: { en: '', bn: '' },
      excerpt: { en: '', bn: '' },
      content: { en: '', bn: '' },
      category: '',
      featured: false,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: 5,
      updatedAt: new Date().toISOString(),
    }
  )

  const handleBilingualChange = (
    field: 'title' | 'excerpt' | 'content',
    lang: 'en' | 'bn',
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: {
        ...(formData[field] as BilingualText),
        [lang]: value,
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Title */}
      <Card className='p-6 border-indigo-500/20'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Title
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='title-en' className='text-xs'>
              English
            </Label>
            <Input
              id='title-en'
              value={formData.title.en}
              onChange={(e) => handleBilingualChange('title', 'en', e.target.value)}
              placeholder='Blog title'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='title-bn' className='text-xs'>
              বাংলা
            </Label>
            <Input
              id='title-bn'
              value={formData.title.bn}
              onChange={(e) => handleBilingualChange('title', 'bn', e.target.value)}
              placeholder='ব্লগ শিরোনাম'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

      {/* Category & Featured */}
      <Card className='p-6 border-indigo-500/20'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Metadata
        </h3>
        <div className='space-y-3'>
          <div>
            <Label htmlFor='category' className='text-xs'>
              Category
            </Label>
            <Input
              id='category'
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder='e.g., Technology, Ideas'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div className='flex items-center gap-3'>
            <input
              type='checkbox'
              id='featured'
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className='w-4 h-4 border-indigo-300 text-indigo-600 focus:ring-indigo-500 rounded'
            />
            <Label htmlFor='featured' className='text-sm cursor-pointer'>
              Featured Post
            </Label>
          </div>
        </div>
      </Card>

      {/* Excerpt */}
      <Card className='p-6 border-indigo-500/20'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Excerpt
        </h3>
        <div className='space-y-3'>
          <div>
            <Label htmlFor='excerpt-en' className='text-xs'>
              English
            </Label>
            <Textarea
              id='excerpt-en'
              value={formData.excerpt.en}
              onChange={(e) => handleBilingualChange('excerpt', 'en', e.target.value)}
              placeholder='Brief summary'
              rows={2}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='excerpt-bn' className='text-xs'>
              বাংলা
            </Label>
            <Textarea
              id='excerpt-bn'
              value={formData.excerpt.bn}
              onChange={(e) => handleBilingualChange('excerpt', 'bn', e.target.value)}
              placeholder='সংক্ষিপ্ত সারসংক্ষেপ'
              rows={2}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

      {/* Content */}
      <Card className='p-6 border-indigo-500/20'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Content
        </h3>
        <div className='space-y-3'>
          <div>
            <Label htmlFor='content-en' className='text-xs'>
              English
            </Label>
            <Textarea
              id='content-en'
              value={formData.content.en}
              onChange={(e) => handleBilingualChange('content', 'en', e.target.value)}
              placeholder='Full blog content'
              rows={6}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='content-bn' className='text-xs'>
              বাংলা
            </Label>
            <Textarea
              id='content-bn'
              value={formData.content.bn}
              onChange={(e) => handleBilingualChange('content', 'bn', e.target.value)}
              placeholder='সম্পূর্ণ ব্লগ বিষয়বস্তু'
              rows={6}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className='flex gap-3 justify-end pt-4 border-t border-indigo-100 dark:border-indigo-900'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isLoading}
          className='gap-2'
        >
          <X className='w-4 h-4' />
          Cancel
        </Button>
        <Button
          type='submit'
          disabled={isLoading}
          className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white'
        >
          <Save className='w-4 h-4' />
          {isLoading ? 'Saving...' : 'Save Post'}
        </Button>
      </div>
    </form>
  )
}
