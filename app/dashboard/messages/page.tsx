'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { contactService, ContactMessage } from '@/lib/data-utils'
import { Trash2, Mail, Calendar, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = () => {
    const data = contactService.getAllMessages()
    setMessages(data.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()))
    setIsLoading(false)
  }

  const handleMarkAsRead = (id: string) => {
    contactService.markAsRead(id)
    loadMessages()
    const updated = messages.find(m => m.id === id)
    if (updated) {
      setSelectedMessage({ ...updated, read: true })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this message?')) {
      contactService.deleteMessage(id)
      setSelectedMessage(null)
      loadMessages()
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">
          {messages.filter(m => !m.read).length} unread messages
        </p>
      </div>

      {messages.length === 0 ? (
        <Card className="p-12 text-center">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No messages yet</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-2">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`p-4 cursor-pointer transition-colors hover:border-primary/50 ${
                  selectedMessage?.id === message.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground truncate">{message.name}</h3>
                  {!message.read && <Badge className="text-xs">New</Badge>}
                </div>
                <p className="text-xs text-muted-foreground truncate">{message.subject}</p>
                <p className="text-xs text-muted-foreground mt-2">{message.email}</p>
              </Card>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="p-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="border-b border-border pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{selectedMessage.name}</h2>
                        <a href={`mailto:${selectedMessage.email}`} className="text-primary text-sm hover:underline">
                          {selectedMessage.email}
                        </a>
                      </div>
                      {!selectedMessage.read && (
                        <Button
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                          size="sm"
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Mark as Read
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedMessage.receivedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        {new Date(selectedMessage.receivedAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Subject</h3>
                    <p className="text-foreground text-lg">{selectedMessage.subject}</p>
                  </div>

                  {/* Message */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Message</h3>
                    <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-border pt-4 flex gap-3">
                    <Button onClick={() => handleDelete(selectedMessage.id)} variant="outline" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                    <a href={`mailto:${selectedMessage.email}`}>
                      <Button className="gap-2">
                        <Mail className="w-4 h-4" />
                        Reply
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a message to view details</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
