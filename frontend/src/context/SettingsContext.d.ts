import React from 'react';
interface Settings {
    currency: string;
    notifications: {
        email: boolean;
        push: boolean;
        priceDrops: boolean;
        dailyDigest: boolean;
    };
    priceAlerts: {
        defaultThreshold: number;
        maxAlerts: number;
    };
}
interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
    resetSettings: () => void;
}
export declare const useSettings: () => SettingsContextType;
export declare const SettingsProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
//# sourceMappingURL=SettingsContext.d.ts.map