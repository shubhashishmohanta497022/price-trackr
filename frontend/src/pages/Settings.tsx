import React, { useState } from 'react';
import { Palette, Bell, Shield, Database, Globe, HelpCircle } from 'lucide-react';
import { Switch } from "@/components/shared/Switch";
import Button from "@/components/shared/Button";
import clsx from 'clsx';

// ... (interfaces and useSettingsStore hook remain the same) ...
interface SettingsState {
  theme: 'light' | 'dark';
  compactMode: boolean;
  pushNotifications: boolean;
  priceDropAlerts: boolean;
  saleNotifications: boolean;
  priceDropThreshold: number;
  scamDetection: boolean;
  anonymousTracking: boolean;
  dataRetention: number;
  offlineMode: boolean;
  realtimeUpdates: boolean;
  currency: string;
  timeZone: string;
}

const useSettingsStore = () => {
    const [settings, setSettings] = useState<SettingsState>({
        theme: 'dark',
        compactMode: false,
        pushNotifications: true,
        priceDropAlerts: true,
        saleNotifications: true,
        priceDropThreshold: 10,
        scamDetection: true,
        anonymousTracking: false,
        dataRetention: 30,
        offlineMode: true,
        realtimeUpdates: true,
        currency: 'INR',
        timeZone: 'IST',
    });
    
    const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
      setSettings(prev => ({...prev, [key]: value}));
    }

    return { settings, updateSetting };
}

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ icon, title, description, children }) => (
  <div className="bg-brand-surface rounded-lg">
    <div className="p-6 border-b border-brand-secondary">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h2 className="text-xl font-semibold text-brand-text">{title}</h2>
          <p className="text-sm text-brand-text-muted">{description}</p>
        </div>
      </div>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

interface SettingRowProps {
  title: string;
  description: string;
  children: React.ReactNode;
  tooltip?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({ title, description, children, tooltip }) => (
  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
    <div>
      <h3 className="text-brand-text font-medium flex items-center gap-2">
        {title}
        {tooltip && (
          <div className="group relative">
            <HelpCircle size={16} className="text-brand-text-muted cursor-pointer" />
            <div className="absolute bottom-full mb-2 w-64 bg-brand-dark text-brand-text-muted text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {tooltip}
            </div>
          </div>
        )}
      </h3>
      <p className="text-sm text-brand-text-muted">{description}</p>
    </div>
    <div className="mt-2 sm:mt-0 flex-shrink-0">{children}</div>
  </div>
);


const Settings = () => {
  const { settings, updateSetting } = useSettingsStore();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Settings</h1>
        <p className="text-brand-text-muted">Configure your preferences.</p>
      </div>
      
      <SettingsSection icon={<Palette className="text-brand-primary" />} title="Appearance" description="Customize the look and feel.">
        <SettingRow title="Theme" description="Choose your preferred theme.">
          <div className="flex gap-2 rounded-md bg-brand-dark p-1">
              <button onClick={() => updateSetting('theme', 'light')} className={clsx("px-4 py-1 rounded text-sm font-semibold", settings.theme === 'light' ? 'bg-brand-surface text-brand-text' : 'text-brand-text-muted')}>Light</button>
              <button onClick={() => updateSetting('theme', 'dark')} className={clsx("px-4 py-1 rounded text-sm font-semibold", settings.theme === 'dark' ? 'bg-brand-surface text-brand-text' : 'text-brand-text-muted')}>Dark</button>
          </div>
        </SettingRow>
        <SettingRow title="Compact Mode" description="Reduce padding.">
            <Switch checked={settings.compactMode} onCheckedChange={(val: boolean) => updateSetting('compactMode', val)} />
        </SettingRow>
      </SettingsSection>

      <div className="flex justify-end gap-4 pt-4 border-t border-brand-secondary">
          <Button variant="secondary">Revert to Default</Button>
          <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;