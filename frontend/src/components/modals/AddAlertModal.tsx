import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface AddAlertModalProps {
  isOpen: boolean
  onClose: () => void
  productId: number
  currentPrice: number
}

const AddAlertModal: React.FC<AddAlertModalProps> = ({
  isOpen,
  onClose,
  productId,
  currentPrice,
}) => {
  const [targetPrice, setTargetPrice] = useState<string>(currentPrice.toString())
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would call the API to create the alert
      console.log('Creating alert:', { productId, targetPrice, email })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      onClose()
    } catch (error) {
      console.error('Error creating alert:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Set Price Alert
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Price
              </label>
              <Input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="Enter target price"
                step="0.01"
                min="0"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Current price: ₹{currentPrice}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email (optional)
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use your account email
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="flex-1"
              >
                Create Alert
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAlertModal
