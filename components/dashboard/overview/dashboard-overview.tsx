'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card } from '@/components/ui/card'
import {
  FileText,
  ImageIcon,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import {
  getFromStorage,
  STORAGE_KEYS,
} from '@/lib/storage'

interface DashboardStats {
  totalBlogs: number
  totalMedia: number
  totalIdeas: number
  totalMessages: number
}

export function DashboardOverview() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalMedia: 0,
    totalIdeas: 0,
    totalMessages: 0,
  })

  useEffect(() => {
    const blogs = getFromStorage(STORAGE_KEYS.BLOGS, [])
    const media = getFromStorage(STORAGE_KEYS.MEDIA, [])
    const ideas = getFromStorage(STORAGE_KEYS.IDEAS, [])
    const messages = getFromStorage(STORAGE_KEYS.CONTACT_MESSAGES, [])

    setTimeout(() => {
      setStats({
      totalBlogs: blogs.length,
      totalMedia: media.length,
      totalIdeas: ideas.length,
      totalMessages: messages.length,
    })
    }, 100);
  }, [])

  const quickLinks = [
    {
      icon: FileText,
      label: 'Manage Blogs',
      description: `${stats.totalBlogs} posts`,
      href: '/dashboard/blogs',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: ImageIcon,
      label: 'Manage Media',
      description: `${stats.totalMedia} images`,
      href: '/dashboard/media',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Lightbulb,
      label: 'Manage Ideas',
      description: `${stats.totalIdeas} ideas`,
      href: '/dashboard/ideas',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      description: `${stats.totalMessages} unread`,
      href: '/dashboard/messages',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
  ]

  const checklist = [
    { label: 'Set up Hero section', link: '/dashboard/hero' },
    { label: 'Create first blog post', link: '/dashboard/blogs' },
    { label: 'Upload portfolio images', link: '/dashboard/media' },
    { label: 'Add your ideas/vision', link: '/dashboard/ideas' },
    { label: 'Update about section', link: '/dashboard/about' },
    { label: 'Configure contact info', link: '/dashboard/contact' },
  ]

  return (
    <div className='space-y-8'>
      {/* Welcome Section */}
      <div className='bg-linear-to-r from-indigo-500 to-blue-500 dark:from-indigo-900/40 dark:to-blue-900/40 rounded-lg p-8 border border-indigo-200 dark:border-indigo-900'>
        <h1 className='text-3xl font-bold text-white dark:text-slate-100 mb-2'>
          Welcome back, {session?.user?.name}!
        </h1>
        <p className='text-indigo-100 dark:text-indigo-300 max-w-2xl'>
          Manage your portfolio content, update your profile, and track your online presence.
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {quickLinks.map(({ icon: Icon, label, description, href, color, bgColor }) => (
          <Link key={href} href={href}>
            <Card className='p-6 border-indigo-200 dark:border-indigo-900/30 hover:border-indigo-400 dark:hover:border-indigo-700 transition-all cursor-pointer h-full'>
              <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className='font-semibold text-slate-900 dark:text-white text-sm mb-1'>
                {label}
              </h3>
              <p className='text-xs text-slate-500 dark:text-slate-400'>{description}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Getting Started Checklist */}
        <Card className='lg:col-span-2 p-6 border-indigo-200 dark:border-indigo-900/30'>
          <h2 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
            Getting Started Checklist
          </h2>
          <div className='space-y-3'>
            {checklist.map((item, idx) => (
              <Link key={idx} href={item.link}>
                <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors cursor-pointer group'>
                  <CheckCircle2 className='w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0' />
                  <span className='text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100'>
                    {item.label}
                  </span>
                  <ArrowRight className='w-4 h-4 text-indigo-600 dark:text-indigo-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className='p-6 border-indigo-200 dark:border-indigo-900/30 bg-indigo-50 dark:bg-indigo-950/20'>
          <h2 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
            Quick Tips
          </h2>
          <ul className='space-y-3 text-sm text-slate-700 dark:text-slate-300'>
            <li className='flex gap-2'>
              <span className='font-bold text-indigo-600 dark:text-indigo-400'>•</span>
              Keep your bio and hero section up-to-date
            </li>
            <li className='flex gap-2'>
              <span className='font-bold text-indigo-600 dark:text-indigo-400'>•</span>
              Regularly add new blog posts for SEO
            </li>
            <li className='flex gap-2'>
              <span className='font-bold text-indigo-600 dark:text-indigo-400'>•</span>
              Use bilingual content for wider reach
            </li>
            <li className='flex gap-2'>
              <span className='font-bold text-indigo-600 dark:text-indigo-400'>•</span>
              Check messages regularly for inquiries
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
