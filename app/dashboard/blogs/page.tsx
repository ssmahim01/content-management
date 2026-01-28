'use client'

import { BlogManager } from '@/components/dashboard/blog/blog-manager'

export default function BlogsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>Blog Posts</h1>
        <p className='text-slate-600 dark:text-slate-400 mt-2'>
          Manage your blog posts with bilingual content
        </p>
      </div>
      <BlogManager />
    </div>
  )
}
