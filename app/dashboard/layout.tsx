import React from "react"
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { ProtectedRoute } from '@/components/protected-route'

export const metadata = {
  title: 'Dashboard | Portfolio Admin',
  description: 'Manage your portfolio content',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        {/* Sidebar - Hidden on Mobile/Tablet */}
        <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:ml-64">
          <DashboardHeader />
          <main className="min-h-[calc(100vh-4rem)] bg-background p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
