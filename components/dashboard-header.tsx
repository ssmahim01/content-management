'use client'

import { useAuth } from '@/lib/auth-context'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardHeader() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between h-16 bg-card border-b border-border px-6">
        <h1 className="text-lg font-semibold text-foreground">Portfolio Admin</h1>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>}
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile/Tablet Header */}
      <header className="lg:hidden flex items-center justify-between h-16 bg-card border-b border-border px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        <h1 className="text-base font-semibold text-foreground flex-1 text-center">Portfolio</h1>
        <ThemeToggle />
      </header>
    </>
  )
}
