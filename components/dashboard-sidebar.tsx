'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ImageIcon,
  FileText,
  Lightbulb,
  User,
  Mail,
  Settings,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutUser } from '@/lib/auth-utils'

const menuItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Hero', href: '/dashboard/hero', icon: FileText },
  { label: 'Media', href: '/dashboard/media', icon: ImageIcon },
  { label: 'Blogs', href: '/dashboard/blogs', icon: FileText },
  { label: 'Ideas', href: '/dashboard/ideas', icon: Lightbulb },
  { label: 'About', href: '/dashboard/about', icon: User },
  { label: 'Messages', href: '/dashboard/messages', icon: Mail },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    logoutUser()
    window.location.href = '/login'
  }

  return (
    <aside className="w-64 bg-card border-r border-border fixed left-0 top-0 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
            MS
          </div>
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn('w-full justify-start gap-3', isActive && 'bg-primary')}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-3 bg-transparent">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
