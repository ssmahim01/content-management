'use client'

import { MediaManager } from '@/components/dashboard/media/media-manager'

export default function MediaPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>Media Gallery</h1>
        <p className='text-slate-600 dark:text-slate-400 mt-2'>
          Manage your portfolio images
        </p>
      </div>
      <MediaManager />
    </div>
  )
}
