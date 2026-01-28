'use client'

import React from "react"

import { useState } from 'react'
import { BilingualText, Hero } from  '@/types/dashboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Save, X } from 'lucide-react'

interface HeroFormProps {
  initialData?: Hero
  onSubmit: (data: Hero) => void
  onCancel: () => void
  isLoading?: boolean
}

export function HeroForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: HeroFormProps) {
  const [formData, setFormData] = useState<Hero>(
    initialData || {
      id: Date().toString(),
      name: { en: '', bn: '' },
      title: { en: '', bn: '' },
      description: { en: '', bn: '' },
      quote: { en: '', bn: '' },
      ctaText: { en: '', bn: '' },
      ctaLink: '',
      updatedAt: new Date().toISOString(),
    }
  )

  const handleBilingualChange = (
    field: keyof Hero,
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
      {/* Name */}
      <Card className='p-6 border-indigo-500/20'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Author Name
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='name-en' className='text-xs'>
              English
            </Label>
            <Input
              id='name-en'
              value={formData.name.en}
              onChange={(e) => handleBilingualChange('name', 'en', e.target.value)}
              placeholder='Enter name in English'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='name-bn' className='text-xs'>
              বাংলা
            </Label>
            <Input
              id='name-bn'
              value={formData.name.bn}
              onChange={(e) => handleBilingualChange('name', 'bn', e.target.value)}
              placeholder='নাম বাংলায় প্রবেশ করুন'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

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
              placeholder='Professional title'
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
              placeholder='পেশাদার শিরোনাম'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

      {/* Description */}
      <Card className='p-6 border-indigo-500/20'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Description
        </h3>
        <div className='space-y-3'>
          <div>
            <Label htmlFor='desc-en' className='text-xs'>
              English
            </Label>
            <Textarea
              id='desc-en'
              value={formData.description.en}
              onChange={(e) =>
                handleBilingualChange('description', 'en', e.target.value)
              }
              placeholder='Hero section description'
              rows={4}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='desc-bn' className='text-xs'>
              বাংলা
            </Label>
            <Textarea
              id='desc-bn'
              value={formData.description.bn}
              onChange={(e) =>
                handleBilingualChange('description', 'bn', e.target.value)
              }
              placeholder='হিরো বিভাগের বর্ণনা'
              rows={4}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

      {/* CTA */}
      <Card className='p-6 border-indigo-500/20'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Call-to-Action
        </h3>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <Label htmlFor='cta-en' className='text-xs'>
              Button Text (English)
            </Label>
            <Input
              id='cta-en'
              value={formData.ctaText.en}
              onChange={(e) => handleBilingualChange('ctaText', 'en', e.target.value)}
              placeholder='Get in touch'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='cta-bn' className='text-xs'>
              Button Text (বাংলা)
            </Label>
            <Input
              id='cta-bn'
              value={formData.ctaText.bn}
              onChange={(e) => handleBilingualChange('ctaText', 'bn', e.target.value)}
              placeholder='যোগাযোগ করুন'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
        <div>
          <Label htmlFor='cta-link' className='text-xs'>
            Button Link
          </Label>
          <Input
            id='cta-link'
            value={formData.ctaLink}
            onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            placeholder='#contact'
            className='mt-1 border-indigo-200 focus:border-indigo-500'
          />
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
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
