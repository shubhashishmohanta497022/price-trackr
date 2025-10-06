import React from 'react'
import { 
  BellIcon, 
  CurrencyRupeeIcon, 
  UserCircleIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline'
import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import { useSettings } from '../context/SettingsContext'

const Settings: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettings()

  const handleNotificationChange = (key: keyof typeof settings.notifications, value: boolean) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Customize your Price Trackr experience.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <UserCircleIcon className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              placeholder="Your full name"
              defaultValue="John Doe"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              defaultValue="john@example.com"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="primary">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive notifications via email
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Push Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive push notifications in browser
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Price Drop Alerts
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified when prices drop below your target
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.priceDrops}
                onChange={(e) => handleNotificationChange('priceDrops', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Daily Digest
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive daily summary of price changes
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.dailyDigest}
                onChange={(e) => handleNotificationChange('dailyDigest', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Price Alert Settings */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <CurrencyRupeeIcon className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Price Alert Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Default Price Drop Threshold (%)"
              type="number"
              min="1"
              max="50"
              value={settings.priceAlerts.defaultThreshold}
              onChange={(e) => updateSettings({
                priceAlerts: {
                  ...settings.priceAlerts,
                  defaultThreshold: parseInt(e.target.value),
                },
              })}
              helperText="Default percentage drop to trigger alerts"
            />

            <Input
              label="Maximum Active Alerts"
              type="number"
              min="1"
              max="100"
              value={settings.priceAlerts.maxAlerts}
              onChange={(e) => updateSettings({
                priceAlerts: {
                  ...settings.priceAlerts,
                  maxAlerts: parseInt(e.target.value),
                },
              })}
              helperText="Maximum number of active price alerts"
            />
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Data & Privacy
            </h2>
          </div>

          <div className="space-y-4">
            <Button variant="outline">
              Export My Data
            </Button>

            <Button variant="danger">
              Delete Account
            </Button>
          </div>
        </div>

        {/* Reset Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Reset Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Reset all settings to their default values.
          </p>
          <Button 
            variant="outline"
            onClick={resetSettings}
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
