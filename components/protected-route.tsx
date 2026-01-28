'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-blue-50 dark:from-slate-950 dark:to-slate-900'>
        <div className='text-center'>
          <div className='mb-4 flex justify-center'>
            <div className='w-8 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-spin'></div>
          </div>
          <p className='text-slate-600 dark:text-slate-400'>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
