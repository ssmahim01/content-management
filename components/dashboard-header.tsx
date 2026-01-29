'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className='hidden lg:flex items-center justify-between h-19 bg-white dark:bg-slate-950 border-b border-indigo-100 dark:border-indigo-900/30 px-6'>
        <h1 className='text-lg font-semibold text-slate-900 dark:text-white'>
          Portfolio Admin Dashboard
        </h1>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-slate-600 dark:text-slate-400'>
            <span className='font-medium'>Masrafi Panel</span>
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile/Tablet Header */}
      <header className='lg:hidden flex items-center justify-between h-16 bg-white dark:bg-slate-950 border-b border-indigo-100 dark:border-indigo-900/30 px-4'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Menu className='w-5 h-5' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='p-0 w-64'>
            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        <h1 className='text-base font-semibold text-slate-900 dark:text-white flex-1 text-center'>
          Masrafi Panel
        </h1>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
        </div>
      </header>
    </>
  )
}
