const STORAGE_KEYS = {
  HERO: "dashboard_hero",
  BLOGS: "dashboard_blogs",
  IDEAS: "dashboard_ideas",
  MEDIA: "dashboard_media",
  ABOUT: "dashboard_about",
  CONTACT: "dashboard_contact",
  CONTACT_MESSAGES: "dashboard_contact_messages",
  SETTINGS: "dashboard_settings",
}

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Failed to save to storage:", error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Failed to remove from storage:", error)
  }
}

export function clearAllStorage(): void {
  if (typeof window === "undefined") return

  Object.values(STORAGE_KEYS).forEach((key) => {
    removeFromStorage(key)
  })
}

export { STORAGE_KEYS }
