/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Idea } from  '@/types/dashboard'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Trash2, Edit2, AlertCircle, Save, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function IdeasManager() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [formData, setFormData] = useState<Idea | null>(null)

  useEffect(() => {
    const data = getFromStorage<Idea[]>(STORAGE_KEYS.IDEAS, [])
    setIdeas(data)
  }, [])

  const handleEditStart = (idea: Idea) => {
    setEditingId(idea.id)
    setFormData(idea)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setFormData(null)
  }

  const handleSave = () => {
    if (!formData) return

    setIsLoading(true)
    try {
      const updated = ideas.map((idea) => (idea.id === formData.id ? formData : idea))
      saveToStorage(STORAGE_KEYS.IDEAS, updated)
      setIdeas(updated)
      setEditingId(null)
      setFormData(null)
      setMessage({ type: 'success', text: 'Idea updated successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update idea' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    setIsLoading(true)
    try {
      const updated = ideas.filter((idea) => idea.id !== id)
      saveToStorage(STORAGE_KEYS.IDEAS, updated)
      setIdeas(updated)
      setMessage({ type: 'success', text: 'Idea deleted successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete idea' })
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

      {editingId && formData ? (
        <Card className='p-6 border-indigo-200 dark:border-indigo-900/30'>
          <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
            Edit Idea
          </h3>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label className='text-xs font-medium'>Title (English)</Label>
                <Input
                  value={formData.title.en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: { ...formData.title, en: e.target.value },
                    })
                  }
                  className='mt-1 border-indigo-200 focus:border-indigo-500'
                />
              </div>
              <div>
                <Label className='text-xs font-medium'>Title (বাংলা)</Label>
                <Input
                  value={formData.title.bn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: { ...formData.title, bn: e.target.value },
                    })
                  }
                  className='mt-1 border-indigo-200 focus:border-indigo-500'
                />
              </div>
            </div>

            <div>
              <Label className='text-xs font-medium'>Description (English)</Label>
              <Textarea
                value={formData.description.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, en: e.target.value },
                  })
                }
                rows={3}
                className='mt-1 border-indigo-200 focus:border-indigo-500'
              />
            </div>

            <div>
              <Label className='text-xs font-medium'>Description (বাংলা)</Label>
              <Textarea
                value={formData.description.bn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, bn: e.target.value },
                  })
                }
                rows={3}
                className='mt-1 border-indigo-200 focus:border-indigo-500'
              />
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white flex-1'
              >
                <Save className='w-4 h-4' />
                Save
              </Button>
              <Button onClick={handleEditCancel} variant='outline' className='gap-2 flex-1'>
                <X className='w-4 h-4' />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : null}

      {ideas.length === 0 ? (
        <Card className='p-8 text-center border-indigo-200 dark:border-indigo-900/30'>
          <AlertCircle className='w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3' />
          <p className='text-slate-600 dark:text-slate-400'>No ideas yet. Create one to get started!</p>
        </Card>
      ) : (
        <div className='grid gap-4'>
          {ideas.map((idea) => (
            <Card
              key={idea.id}
              className='p-5 border-indigo-200 dark:border-indigo-900/30 hover:border-indigo-400 dark:hover:border-indigo-700 transition-colors'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <h3 className='font-semibold text-slate-900 dark:text-white'>
                    {idea.title.en}
                  </h3>
                  <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
                    বাংলা: {idea.title.bn}
                  </p>
                  <p className='text-sm text-slate-600 dark:text-slate-300 mt-2'>
                    {idea.description.en}
                  </p>
                  {idea.category && (
                    <Badge variant='outline' className='mt-3 border-indigo-300'>
                      {idea.category}
                    </Badge>
                  )}
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleEditStart(idea)}
                    disabled={isLoading}
                    className='gap-1.5'
                  >
                    <Edit2 className='w-4 h-4' />
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleDelete(idea.id)}
                    disabled={isLoading}
                    className='gap-1.5 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30'
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
