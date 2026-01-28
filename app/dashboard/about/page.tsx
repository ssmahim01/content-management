'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { aboutService, AboutData } from '@/lib/data-utils'
import { Textarea } from '@/components/ui/textarea'
import { Save, RotateCcw } from 'lucide-react'

export default function AboutManagementPage() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    const data = aboutService.getAbout()
    setAbout(
      data || {
        id: 'about-1',
        title: 'About Me',
        bio: 'I am a student, social organizer, and dreamer...',
        achievements: [],
        skillsText: '',
      }
    )
    setIsLoading(false)
  }, [])

  const handleSave = async () => {
    if (!about) return
    setIsSaving(true)
    try {
      aboutService.updateAbout(about)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    const data = aboutService.getAbout()
    setAbout(data || null)
  }

  const addAchievement = () => {
    if (about) {
      setAbout({
        ...about,
        achievements: [...about.achievements, ''],
      })
    }
  }

  const updateAchievement = (index: number, value: string) => {
    if (about) {
      const newAchievements = [...about.achievements]
      newAchievements[index] = value
      setAbout({ ...about, achievements: newAchievements })
    }
  }

  const removeAchievement = (index: number) => {
    if (about) {
      setAbout({
        ...about,
        achievements: about.achievements.filter((_, i) => i !== index),
      })
    }
  }

  if (isLoading || !about) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">About Section</h1>
        <p className="text-muted-foreground">Manage your about page content</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Title</label>
            <Input
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              placeholder="About Me"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Bio</label>
            <Textarea
              value={about.bio}
              onChange={(e) => setAbout({ ...about, bio: e.target.value })}
              placeholder="Write your bio..."
              rows={5}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Skills & Expertise</label>
            <Textarea
              value={about.skillsText}
              onChange={(e) => setAbout({ ...about, skillsText: e.target.value })}
              placeholder="List your skills..."
              rows={3}
            />
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Achievements</label>
              <Button onClick={addAchievement} size="sm" variant="outline">
                Add Achievement
              </Button>
            </div>
            <div className="space-y-2">
              {about.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    placeholder={`Achievement ${index + 1}`}
                  />
                  <Button
                    onClick={() => removeAchievement(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button onClick={handleReset} variant="outline" className="gap-2 bg-transparent">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-600">
              About section updated successfully!
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
