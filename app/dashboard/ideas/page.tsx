'use client'

import { IdeasManager } from '@/components/dashboard/ideas/ideas-manager'

export default function IdeasPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>Ideas & Vision</h1>
        <p className='text-slate-600 dark:text-slate-400 mt-2'>
          Share your ideas and vision with bilingual content
        </p>
      </div>
      <IdeasManager />
    </div>
  )
}
