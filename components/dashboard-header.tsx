'use client'

import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Menu, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardHeader() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className='hidden lg:flex items-center justify-between h-16 bg-white dark:bg-slate-950 border-b border-indigo-100 dark:border-indigo-900/30 px-6'>
        <h1 className='text-lg font-semibold text-slate-900 dark:text-white'>
          Portfolio Admin
        </h1>
        <div className='flex items-center gap-4'>
          {session?.user && (
            <span className='text-sm text-slate-600 dark:text-slate-400'>
              Welcome, <span className='font-medium'>{session.user.name}</span>
            </span>
          )}
          <ThemeToggle />
          <Button
            size='sm'
            variant='outline'
            onClick={() => signOut()}
            className='gap-2 border-indigo-200 dark:border-indigo-900 hover:bg-red-50 dark:hover:bg-red-950/30'
          >
            <LogOut className='w-4 h-4' />
            Logout
          </Button>
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
          Portfolio
        </h1>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Button
            size='sm'
            variant='ghost'
            onClick={() => signOut()}
            className='gap-1 text-red-600 dark:text-red-400'
          >
            <LogOut className='w-4 h-4' />
          </Button>
        </div>
      </header>
    </>
  )
}
