/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { ContactInfo, ContactMessage } from '@/types/dashboard'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, Trash2, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ContactManager() {
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'info' | 'messages'>('info')

  useEffect(() => {
    const contactData = getFromStorage<ContactInfo | null>(STORAGE_KEYS.CONTACT, null)
    const messagesData = getFromStorage<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, [])

    setContact(
      contactData || {
        id: 'contact-1',
        email: 'contact@example.com',
        phone: { en: '+880 1234 567890', bn: '+880 1234 567890' },
        address: { en: 'Dhaka, Bangladesh', bn: 'ঢাকা, বাংলাদেশ' },
        socialLinks: {},
        updatedAt: new Date().toISOString(),
      }
    )
    setMessages(messagesData)
  }, [])

  const handleSave = () => {
    if (!contact) return

    setIsLoading(true)
    try {
      saveToStorage(STORAGE_KEYS.CONTACT, contact)
      setMessage({ type: 'success', text: 'Contact info saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save contact info' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMessage = (id: string) => {
    setIsLoading(true)
    try {
      const updated = messages.filter((msg) => msg.id !== id)
      saveToStorage(STORAGE_KEYS.CONTACT_MESSAGES, updated)
      setMessages(updated)
    } finally {
      setIsLoading(false)
    }
  }

  if (!contact) return null

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

      {/* Tabs */}
      <div className='flex gap-2 border-b border-indigo-200 dark:border-indigo-900/30'>
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'info'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-600 dark:text-slate-400'
          }`}
        >
          Contact Info
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'messages'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-600 dark:text-slate-400'
          }`}
        >
          Messages ({messages.length})
        </button>
      </div>

      {/* Contact Info Tab */}
      {activeTab === 'info' && (
        <div className='space-y-6'>
          <Card className='p-6 border-indigo-200 dark:border-indigo-900/30'>
            <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
              Email & Phone
            </h3>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='email' className='text-xs'>
                  Email
                </Label>
                <Input
                  id='email'
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className='mt-1 border-indigo-200 focus:border-indigo-500'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='phone-en' className='text-xs'>
                    Phone (English)
                  </Label>
                  <Input
                    id='phone-en'
                    value={contact.phone.en}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        phone: { ...contact.phone, en: e.target.value },
                      })
                    }
                    className='mt-1 border-indigo-200 focus:border-indigo-500'
                  />
                </div>
                <div>
                  <Label htmlFor='phone-bn' className='text-xs'>
                    Phone (বাংলা)
                  </Label>
                  <Input
                    id='phone-bn'
                    value={contact.phone.bn}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        phone: { ...contact.phone, bn: e.target.value },
                      })
                    }
                    className='mt-1 border-indigo-200 focus:border-indigo-500'
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className='p-6 border-indigo-200 dark:border-indigo-900/30'>
            <h3 className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4'>
              Address
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='addr-en' className='text-xs'>
                  English
                </Label>
                <Input
                  id='addr-en'
                  value={contact.address.en}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      address: { ...contact.address, en: e.target.value },
                    })
                  }
                  className='mt-1 border-indigo-200 focus:border-indigo-500'
                />
              </div>
              <div>
                <Label htmlFor='addr-bn' className='text-xs'>
                  বাংলা
                </Label>
                <Input
                  id='addr-bn'
                  value={contact.address.bn}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      address: { ...contact.address, bn: e.target.value },
                    })
                  }
                  className='mt-1 border-indigo-200 focus:border-indigo-500'
                />
              </div>
            </div>
          </Card>

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
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className='space-y-4'>
          {messages.length === 0 ? (
            <Card className='p-8 text-center border-indigo-200 dark:border-indigo-900/30'>
              <Mail className='w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3' />
              <p className='text-slate-600 dark:text-slate-400'>No messages yet</p>
            </Card>
          ) : (
            messages.map((msg) => (
              <Card
                key={msg.id}
                className='p-5 border-indigo-200 dark:border-indigo-900/30 hover:border-indigo-400 dark:hover:border-indigo-700 transition-colors'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <h3 className='font-semibold text-slate-900 dark:text-white'>{msg.name}</h3>
                      {!msg.read && (
                        <Badge className='bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'>
                          New
                        </Badge>
                      )}
                    </div>
                    <p className='text-xs text-slate-500 dark:text-slate-400 mb-2'>{msg.email}</p>
                    <p className='text-sm text-slate-700 dark:text-slate-300'>{msg.message}</p>
                    <p className='text-xs text-slate-500 dark:text-slate-400 mt-2'>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleDeleteMessage(msg.id)}
                    disabled={isLoading}
                    className='gap-1.5 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30'
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
