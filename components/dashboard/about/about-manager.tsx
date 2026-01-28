/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { About } from '@/types/dashboard'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Save } from 'lucide-react'

export function AboutManager() {
  const [about, setAbout] = useState<About | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const data = getFromStorage<About | null>(STORAGE_KEYS.ABOUT, null)
    setAbout(
      data || {
        id: 'about-1',
        introduction: { en: '', bn: '' },
        bio: { en: '', bn: '' },
        skills: [],
        achievements: [],
        imageUrl: '/3.png',
        updatedAt: new Date().toISOString(),
      }
    )
  }, [])

  const handleSave = () => {
    if (!about) return

    setIsLoading(true)
    try {
      saveToStorage(STORAGE_KEYS.ABOUT, about)
      setMessage({ type: 'success', text: 'About section updated successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save about section' })
    } finally {
      setIsLoading(false)
    }
  }

  if (!about) return null

  return (
    <div className='space-y-6'>
      {message && (
        <Card
          className={`p-4 border-l-4 ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-950/30 border-green-500'
              : 'bg-red-50 dark:bg-red-950/30 border-red-500'
          }`}
        >
          <p
            className={`text-sm font-medium ${
              message.type === 'success'
                ? 'text-green-800 dark:text-green-200'
                : 'text-red-800 dark:text-red-200'
            }`}
          >
            {message.text}
          </p>
        </Card>
      )}

      {/* Introduction */}
      <Card className='p-6 border-indigo-200 dark:border-indigo-900/30'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Introduction
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='intro-en' className='text-xs'>
              English
            </Label>
            <Textarea
              id='intro-en'
              value={about.introduction.en}
              onChange={(e) =>
                setAbout({
                  ...about,
                  introduction: { ...about.introduction, en: e.target.value },
                })
              }
              rows={3}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='intro-bn' className='text-xs'>
              বাংলা
            </Label>
            <Textarea
              id='intro-bn'
              value={about.introduction.bn}
              onChange={(e) =>
                setAbout({
                  ...about,
                  introduction: { ...about.introduction, bn: e.target.value },
                })
              }
              rows={3}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

      {/* Bio */}
      <Card className='p-6 border-indigo-200 dark:border-indigo-900/30'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Biography
        </h3>
        <div className='space-y-3'>
          <div>
            <Label htmlFor='bio-en' className='text-xs'>
              English
            </Label>
            <Textarea
              id='bio-en'
              value={about.bio.en}
              onChange={(e) =>
                setAbout({ ...about, bio: { ...about.bio, en: e.target.value } })
              }
              rows={5}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
          <div>
            <Label htmlFor='bio-bn' className='text-xs'>
              বাংলা
            </Label>
            <Textarea
              id='bio-bn'
              value={about.bio.bn}
              onChange={(e) =>
                setAbout({ ...about, bio: { ...about.bio, bn: e.target.value } })
              }
              rows={5}
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>
        </div>
      </Card>

      {/* Image Path */}
      <Card className='p-6 border-indigo-200 dark:border-indigo-900/30'>
        <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
          Profile Image
        </h3>
        <div>
          <Label htmlFor='image' className='text-xs'>
            Image Path
          </Label>
          <Input
            id='image'
            value={about.imageUrl || ''}
            onChange={(e) => setAbout({ ...about, imageUrl: e.target.value })}
            placeholder='/3.png'
            className='mt-1 border-indigo-200 focus:border-indigo-500'
          />
        </div>
      </Card>

      {/* Save Button */}
      <div className='flex justify-end'>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white'
        >
          <Save className='w-4 h-4' />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
