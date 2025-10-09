import { useState } from 'react';
import { Palette, Bell, Shield, Database, Wifi, Globe, Info, HelpCircle } from 'lucide-react';
import { Switch } from "@/components/shared/Switch"; // A custom Switch component
import { Button } from "@/components/shared/Button"; // A custom Button component
import clsx from 'clsx';

// In a real app, this would come from a state management store like Zustand or Context
// e.g., import { useSettingsStore } from '@/stores/settingsStore';
const useSettingsStore = () => {
    const [settings, setSettings] = useState({
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
    const updateSetting = (key, value) => setSettings(prev => ({...prev, [key]: value}));
    return { settings, updateSetting };
}

// --- Reusable Child Components (would be in '@/components/settings/') ---

const SettingsSection = ({ icon, title, description, children }) => (
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

const SettingRow = ({ title, description, children, tooltip }) => (
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

// --- Main Settings Page Component ---

const Settings = () => {
  const { settings, updateSetting } = useSettingsStore();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Settings</h1>
        <p className="text-brand-text-muted">Configure your price tracking preferences and notifications.</p>
      </div>
      
      {/* Settings Sections */}
      <SettingsSection icon={<Palette className="text-brand-primary" />} title="Appearance" description="Customize the look and feel of the application.">
        <SettingRow title="Theme" description="Choose your preferred theme.">
          <div className="flex gap-2 rounded-md bg-brand-dark p-1">
              <button onClick={() => updateSetting('theme', 'light')} className={clsx("px-4 py-1 rounded text-sm font-semibold", settings.theme === 'light' ? 'bg-brand-surface text-brand-text' : 'text-brand-text-muted')}>Light</button>
              <button onClick={() => updateSetting('theme', 'dark')} className={clsx("px-4 py-1 rounded text-sm font-semibold", settings.theme === 'dark' ? 'bg-brand-surface text-brand-text' : 'text-brand-text-muted')}>Dark</button>
          </div>
        </SettingRow>
        <SettingRow title="Compact Mode" description="Reduce padding to show more on screen.">
            <Switch checked={settings.compactMode} onCheckedChange={(val) => updateSetting('compactMode', val)} />
        </SettingRow>
      </SettingsSection>
      
      <SettingsSection icon={<Bell className="text-brand-primary" />} title="Notifications" description="Manage how you receive price alerts.">
          <SettingRow title="Push Notifications" description="Receive browser notifications.">
            <Switch checked={settings.pushNotifications} onCheckedChange={(val) => updateSetting('pushNotifications', val)} />
          </SettingRow>
          <SettingRow title="Price Drop Alerts" description="Notify me when price drops below threshold.">
              <Switch checked={settings.priceDropAlerts} onCheckedChange={(val) => updateSetting('priceDropAlerts', val)} />
          </SettingRow>
          <SettingRow title="Sale Notifications" description="Notify about upcoming major sales.">
              <Switch checked={settings.saleNotifications} onCheckedChange={(val) => updateSetting('saleNotifications', val)} />
          </SettingRow>
          <SettingRow title="Price Drop Threshold (%)" description="Notify when price drops by this percentage.">
            <div className='flex items-center gap-4 w-full max-w-xs'>
                <input type="range" min="1" max="50" value={settings.priceDropThreshold} onChange={e => updateSetting('priceDropThreshold', parseInt(e.target.value))} className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer" />
                <span className='font-mono bg-brand-dark text-brand-text-muted px-3 py-1 rounded-md text-sm'>{settings.priceDropThreshold}%</span>
            </div>
          </SettingRow>
      </SettingsSection>
      
      <SettingsSection icon={<Shield className="text-brand-primary" />} title="Privacy & Security" description="Control your data and security settings.">
          <SettingRow title="Scam Detection" description="Warn about potential scam or low-trust sites." tooltip="Analyzes domain age and other signals to flag suspicious websites.">
            <Switch checked={settings.scamDetection} onCheckedChange={(val) => updateSetting('scamDetection', val)} />
          </SettingRow>
          <SettingRow title="Anonymous Tracking" description="Allow collection of anonymous usage data." tooltip="Helps us improve the app by understanding feature usage. No personal data is ever collected.">
            <Switch checked={settings.anonymousTracking} onCheckedChange={(val) => updateSetting('anonymousTracking', val)} />
          </SettingRow>
          <SettingRow title="Data Retention" description="How long to keep price history data.">
              <select value={settings.dataRetention} onChange={e => updateSetting('dataRetention', parseInt(e.target.value))} className="bg-brand-dark border border-brand-secondary rounded-md px-3 py-1.5 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none">
                  <option value={30}>30 Days</option>
                  <option value={90}>90 Days</option>
                  <option value={365}>1 Year</option>
                  <option value={-1}>Forever</option>
              </select>
          </SettingRow>
      </SettingsSection>

      <SettingsSection icon={<Database className="text-brand-primary" />} title="Data & Sync" description="Manage application data and connectivity.">
        <SettingRow title="Offline Mode" description="Enable or disable offline data access.">
          <Switch checked={settings.offlineMode} onCheckedChange={(val) => updateSetting('offlineMode', val)} />
        </SettingRow>
        <SettingRow title="Real-time Updates" description="Get live price updates via WebSockets.">
          <Switch checked={settings.realtimeUpdates} onCheckedChange={(val) => updateSetting('realtimeUpdates', val)} />
        </SettingRow>
      </SettingsSection>

      <SettingsSection icon={<Globe className="text-brand-primary" />} title="Localization" description="Set your language and region.">
        <SettingRow title="Currency" description="Default currency for displaying prices.">
          {/* In a real app, this would be a longer list */}
          <select value={settings.currency} onChange={e => updateSetting('currency', e.target.value)} className="bg-brand-dark border border-brand-secondary rounded-md px-3 py-1.5 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none">
            <option value="INR">INR (Indian Rupee)</option>
            <option value="USD">USD (US Dollar)</option>
          </select>
        </SettingRow>
        <SettingRow title="Time Zone" description="Time zone for notifications and charts.">
          <select value={settings.timeZone} onChange={e => updateSetting('timeZone', e.target.value)} className="bg-brand-dark border border-brand-secondary rounded-md px-3 py-1.5 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none">
            <option value="IST">IST (India Standard Time)</option>
            <option value="UTC">UTC</option>
          </select>
        </SettingRow>
      </SettingsSection>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-brand-secondary">
          <Button variant="secondary">Revert to Default</Button>
          <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;