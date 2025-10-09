interface SettingsState {
    theme: 'light' | 'dark' | 'system';
    currency: string;
    language: string;
    notifications: {
        email: boolean;
        push: boolean;
        priceDrops: boolean;
        dailyDigest: boolean;
    };
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    setCurrency: (currency: string) => void;
    setLanguage: (language: string) => void;
    updateNotifications: (notifications: Partial<SettingsState['notifications']>) => void;
}
export declare const useSettingsStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SettingsState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SettingsState, SettingsState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SettingsState) => void) => () => void;
        onFinishHydration: (fn: (state: SettingsState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SettingsState, SettingsState>>;
    };
}>;
export {};
//# sourceMappingURL=settingsStore.d.ts.map