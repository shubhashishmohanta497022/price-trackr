import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  currency: string
  language: string
  notifications: {
    email: boolean
    push: boolean
    priceDrops: boolean
    dailyDigest: boolean
  }
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setCurrency: (currency: string) => void
  setLanguage: (language: string) => void
  updateNotifications: (notifications: Partial<SettingsState['notifications']>) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      currency: 'INR',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        priceDrops: true,
        dailyDigest: false,
      },

      setTheme: (theme) => set({ theme }),
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),

      updateNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
)
