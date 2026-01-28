'use client'

import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState} from 'react'
import { User, Shield, Database } from 'lucide-react'
import { logoutUser } from '@/lib/auth-utils'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [settings, setSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a real app, this would save to backend
      setTimeout(() => {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }, 500)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logoutUser()
      router.push('/login')
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-secondary/50">
            <User className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
            <p className="text-sm text-muted-foreground">Update your account information</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
            <Input
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Email Address</label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

          {saveSuccess && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-600">
              Settings updated successfully!
            </div>
          )}
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-secondary/50">
            <Shield className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Security</h2>
            <p className="text-sm text-muted-foreground">Manage security preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Password</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Last changed: Never
            </p>
            <Button variant="outline">Change Password</Button>
          </div>
        </div>
      </Card>

      {/* Data Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-secondary/50">
            <Database className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
            <p className="text-sm text-muted-foreground">Manage your data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Export Data</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of your portfolio data in JSON format
            </p>
            <Button
              variant="outline"
              onClick={() => {
                // Export data as JSON
                const data = {
                  hero: localStorage.getItem('dashboard_hero'),
                  blogs: localStorage.getItem('dashboard_blogs'),
                  media: localStorage.getItem('dashboard_media'),
                  ideas: localStorage.getItem('dashboard_ideas'),
                  about: localStorage.getItem('dashboard_about'),
                  messages: localStorage.getItem('dashboard_messages'),
                }
                const dataStr = JSON.stringify(data, null, 2)
                const dataBlob = new Blob([dataStr], { type: 'application/json' })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'portfolio-data.json'
                link.click()
              }}
            >
              Export as JSON
            </Button>
          </div>
        </div>
      </Card>

      {/* Logout */}
      <Card className="p-6 border-red-500/20 bg-red-500/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Logout</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign out of your account</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-500 hover:text-red-600 bg-transparent">
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}
