/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Hero } from '@/types/dashboard'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { HeroForm } from './hero-form'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export function HeroManager() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const data = getFromStorage<Hero | null>(STORAGE_KEYS.HERO, null)
    setHero(data)
  }, [])

  const handleSubmit = (data: Hero) => {
    setIsLoading(true)
    try {
      saveToStorage(STORAGE_KEYS.HERO, data)
      setHero(data)
      setMessage({ type: 'success', text: 'Hero section updated successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to save hero section. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!hero) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center gap-2 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg'>
          <AlertCircle className='w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0' />
          <p className='text-sm text-amber-800 dark:text-amber-200'>
            No hero section found. Create one below.
          </p>
        </div>
        <HeroForm onSubmit={handleSubmit} onCancel={() => {}} isLoading={isLoading} />
      </div>
    )
  }

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
      <HeroForm initialData={hero} onSubmit={handleSubmit} onCancel={() => {}} isLoading={isLoading} />
    </div>
  )
}
