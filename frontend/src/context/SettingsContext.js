import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from 'react';
const defaultSettings = {
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
};
const SettingsContext = createContext(undefined);
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('settings');
            return stored ? JSON.parse(stored) : defaultSettings;
        }
        return defaultSettings;
    });
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);
    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };
    const resetSettings = () => {
        setSettings(defaultSettings);
    };
    return (_jsx(SettingsContext.Provider, { value: { settings, updateSettings, resetSettings }, children: children }));
};
//# sourceMappingURL=SettingsContext.js.map