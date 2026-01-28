/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { MediaItem } from '@/types/dashboard'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Plus, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function MediaManager() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [newMedia, setNewMedia] = useState({ title: { en: '', bn: '' }, imageUrl: '', category: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const data = getFromStorage<MediaItem[]>(STORAGE_KEYS.MEDIA, [])
    setMedia(data)
  }, [])

  const handleAddMedia = () => {
    if (!newMedia.imageUrl || !newMedia.title.en) {
      setMessage({ type: 'error', text: 'Please fill in required fields' })
      return
    }

    setIsLoading(true)
    try {
      const item: MediaItem = {
        id: Date.now().toString(),
        title: newMedia.title,
        imageUrl: newMedia.imageUrl,
        category: newMedia.category,
        uploadedAt: new Date().toISOString(),
      }

      const updated = [...media, item]
      saveToStorage(STORAGE_KEYS.MEDIA, updated)
      setMedia(updated)
      setNewMedia({ title: { en: '', bn: '' }, imageUrl: '', category: '' })
      setMessage({ type: 'success', text: 'Image added successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add image' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMedia = (id: string) => {
    setIsLoading(true)
    try {
      const updated = media.filter((item) => item.id !== id)
      saveToStorage(STORAGE_KEYS.MEDIA, updated)
      setMedia(updated)
      setMessage({ type: 'success', text: 'Image deleted successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete image' })
    } finally {
      setIsLoading(false)
    }
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

      {/* Add Media Form */}
      <Card className='p-6 border-indigo-200 dark:border-indigo-900/30'>
        <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
          Add New Image
        </h3>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='text-xs font-medium'>Title (English)</Label>
              <Input
                value={newMedia.title.en}
                onChange={(e) =>
                  setNewMedia({
                    ...newMedia,
                    title: { ...newMedia.title, en: e.target.value },
                  })
                }
                placeholder='Image title'
                className='mt-1 border-indigo-200 focus:border-indigo-500'
              />
            </div>
            <div>
              <Label className='text-xs font-medium'>Title (বাংলা)</Label>
              <Input
                value={newMedia.title.bn}
                onChange={(e) =>
                  setNewMedia({
                    ...newMedia,
                    title: { ...newMedia.title, bn: e.target.value },
                  })
                }
                placeholder='ছবির শিরোনাম'
                className='mt-1 border-indigo-200 focus:border-indigo-500'
              />
            </div>
          </div>

          <div>
            <Label className='text-xs font-medium'>Image URL</Label>
            <Input
              value={newMedia.imageUrl}
              onChange={(e) => setNewMedia({ ...newMedia, imageUrl: e.target.value })}
              placeholder='/1.jpg'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>

          <div>
            <Label className='text-xs font-medium'>Category</Label>
            <Input
              value={newMedia.category}
              onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
              placeholder='e.g., Events, Projects'
              className='mt-1 border-indigo-200 focus:border-indigo-500'
            />
          </div>

          <Button
            onClick={handleAddMedia}
            disabled={isLoading}
            className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white w-full'
          >
            <Plus className='w-4 h-4' />
            Add Image
          </Button>
        </div>
      </Card>

      {/* Media List */}
      {media.length === 0 ? (
        <Card className='p-8 text-center border-indigo-200 dark:border-indigo-900/30'>
          <AlertCircle className='w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3' />
          <p className='text-slate-600 dark:text-slate-400'>No images yet. Add your first one!</p>
        </Card>
      ) : (
        <div className='grid gap-4'>
          {media.map((item) => (
            <Card
              key={item.id}
              className='p-5 border-indigo-200 dark:border-indigo-900/30 hover:border-indigo-400 dark:hover:border-indigo-700 transition-colors'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <h3 className='font-semibold text-slate-900 dark:text-white'>
                    {item.title.en}
                  </h3>
                  <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
                    বাংলা: {item.title.bn}
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono'>
                    {item.imageUrl}
                  </p>
                  {item.category && (
                    <Badge variant='outline' className='mt-3 border-indigo-300'>
                      {item.category}
                    </Badge>
                  )}
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handleDeleteMedia(item.id)}
                  disabled={isLoading}
                  className='gap-1.5 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30'
                >
                  <Trash2 className='w-4 h-4' />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
