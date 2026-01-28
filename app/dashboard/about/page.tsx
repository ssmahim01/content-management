'use client'

import { AboutManager } from '@/components/dashboard/about/about-manager'

export default function AboutPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>About Section</h1>
        <p className='text-slate-600 dark:text-slate-400 mt-2'>
          Manage your biography and profile information
        </p>
      </div>
      <AboutManager />
    </div>
  )
}
