"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-out">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse" />
          <Image
            src="/logo.png"
            alt="Musabbi Masrafi"
            width={80}
            height={80}
            priority
            className="relative rounded-lg shadow-lg"
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Musabbi Masrafi</h1>
          <p className="text-sm text-muted-foreground">Loading portfolio...</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full animate-progress" />
        </div>
      </div>
    </div>
  )
}
