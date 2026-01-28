import { HeroManager } from '@/components/dashboard/hero/hero-manager'

export const metadata = {
  title: 'Hero Section | Portfolio Admin',
  description: 'Manage your portfolio hero section',
}

export default function HeroPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>Hero Section</h1>
        <p className='text-slate-600 dark:text-slate-400 mt-2'>
          Manage your hero section with bilingual content
        </p>
      </div>
      <HeroManager />
    </div>
  )
}
