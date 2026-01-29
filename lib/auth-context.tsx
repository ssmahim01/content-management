/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { createContext, useContext } from "react"
import { useSession } from "next-auth/react"

interface AuthContextType {
  user: {
    id: string
    name?: string | null
    email?: string | null
    role?: string
  } | null
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  const value: AuthContextType = {
    user: session?.user
      ? {
          id: (session.user as any).id,
          name: session.user.name,
          email: session.user.email,
          role: (session.user as any).role,
        }
      : null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
