'use client'

import { ContactManager } from '@/components/dashboard/contact/contact-manager'

export default function ContactPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>Contact & Messages</h1>
        <p className='text-slate-600 dark:text-slate-400 mt-2'>
          Manage your contact information and incoming messages
        </p>
      </div>
      <ContactManager />
    </div>
  )
}
