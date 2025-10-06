import React, { createContext, useContext, useState, useEffect } from 'react'

interface Settings {
  currency: string
  notifications: {
    email: boolean
    push: boolean
    priceDrops: boolean
    dailyDigest: boolean
  }
  priceAlerts: {
    defaultThreshold: number
    maxAlerts: number
  }
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  resetSettings: () => void
}

const defaultSettings: Settings = {
  currency: 'INR',
  notifications: {
    email: true,
    push: true,
    priceDrops: true,
    dailyDigest: false,
  },
  priceAlerts: {
    defaultThreshold: 10,
    maxAlerts: 50,
  },
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('settings')
      return stored ? JSON.parse(stored) : defaultSettings
    }
    return defaultSettings
  })

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
