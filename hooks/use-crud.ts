'use client'

import { useState, useCallback } from 'react'
import { getFromStorage, saveToStorage } from '@/lib/storage'

interface UseCrudOptions<T> {
  storageKey: string
  defaultValue: T[]
  onError?: (error: Error) => void
}

export function useCrud<T extends { id: string }>(options: UseCrudOptions<T>) {
  const [items, setItems] = useState<T[]>(() =>
    getFromStorage(options.storageKey, options.defaultValue)
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshData = useCallback(() => {
    const data = getFromStorage(options.storageKey, options.defaultValue)
    setItems(data)
  }, [options])

  const create = useCallback(
    (item: T) => {
      try {
        setIsLoading(true)
        const updated = [...items, item]
        saveToStorage(options.storageKey, updated)
        setItems(updated)
        setError(null)
        return item
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Create failed')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [items, options]
  )

  const update = useCallback(
    (id: string, updates: Partial<T>) => {
      try {
        setIsLoading(true)
        const updated = items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        )
        saveToStorage(options.storageKey, updated)
        setItems(updated)
        setError(null)
        return updated.find((item) => item.id === id)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Update failed')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [items, options]
  )

  const remove = useCallback(
    (id: string) => {
      try {
        setIsLoading(true)
        const updated = items.filter((item) => item.id !== id)
        saveToStorage(options.storageKey, updated)
        setItems(updated)
        setError(null)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Delete failed')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [items, options]
  )

  return {
    items,
    isLoading,
    error,
    create,
    update,
    remove,
    refreshData,
  }
}
