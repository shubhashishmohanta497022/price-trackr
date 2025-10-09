import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useSettingsStore = create()(persist((set) => ({
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
    updateNotifications: (notifications) => set((state) => ({
        notifications: { ...state.notifications, ...notifications },
    })),
}), {
    name: 'settings-storage',
}));
//# sourceMappingURL=settingsStore.js.map