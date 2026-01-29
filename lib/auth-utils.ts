/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

const STORAGE_KEY = 'dashboard_auth'
const USERS_KEY = 'dashboard_users'

// Initialize default admin user
export function initializeAuth() {
  if (typeof window === 'undefined') return

  const existingUsers = localStorage.getItem(USERS_KEY)
  if (!existingUsers) {
    const defaultUsers = [
      {
        id: 'admin-001',
        email: 'admin@portfolio.com',
        password: 'admin123',
        name: 'Admin',
      },
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
  }
}

export function registerUser(email: string, password: string, name: string): boolean {
  if (typeof window === 'undefined') return false

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

  // Check if user already exists
  if (users.some((u: any) => u.email === email)) {
    return false
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    name,
  }

  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return true
}

export function loginUser(email: string, password: string): AuthUser | null {
  if (typeof window === 'undefined') return null

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const user = users.find((u: any) => u.email === email && u.password === password)

  if (user) {
    const authState: AuthState = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      isAuthenticated: true,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState))
    return authState.user
  }

  return null
}

export function logoutUser() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null

  const auth = localStorage.getItem(STORAGE_KEY)
  if (!auth) return null

  try {
    const { user } = JSON.parse(auth)
    return user
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const auth = localStorage.getItem(STORAGE_KEY)
  return !!auth
}
