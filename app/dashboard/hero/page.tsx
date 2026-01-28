'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { heroService, HeroData } from '@/lib/data-utils'
import { Textarea } from '@/components/ui/textarea'
import { Save, RotateCcw } from 'lucide-react'

export default function HeroManagementPage() {
  const [hero, setHero] = useState<HeroData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    const data = heroService.getHero()
    setHero(
      data || {
        id: 'hero-1',
        name: 'Musabbi Masrafi',
        title: 'Student & Social Organizer',
        description:
          'A young leader creating opportunities and inspiring change through community development',
        ctaText: 'Get In Touch',
        ctaLink: '#contact',
        imagePath: '/3.png',
      }
    )
    setIsLoading(false)
  }, [])

  const handleSave = async () => {
    if (!hero) return
    setIsSaving(true)
    try {
      heroService.updateHero(hero)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    const data = heroService.getHero()
    setHero(data || null)
  }

  if (isLoading || !hero) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Hero Section</h1>
        <p className="text-muted-foreground">Manage your hero section content</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Name</label>
            <Input
              value={hero.name}
              onChange={(e) => setHero({ ...hero, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Title</label>
            <Input
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              placeholder="Your professional title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Description</label>
            <Textarea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              placeholder="Your description"
              rows={4}
            />
          </div>

          {/* CTA Text */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">CTA Text</label>
            <Input
              value={hero.ctaText}
              onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
              placeholder="Call to action button text"
            />
          </div>

          {/* CTA Link */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">CTA Link</label>
            <Input
              value={hero.ctaLink}
              onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
              placeholder="Link target (e.g., #contact)"
            />
          </div>

          {/* Image Path */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Image Path</label>
            <Input
              value={hero.imagePath}
              onChange={(e) => setHero({ ...hero, imagePath: e.target.value })}
              placeholder="/image.jpg"
            />
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
              Hero section updated successfully!
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
