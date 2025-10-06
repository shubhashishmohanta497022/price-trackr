import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkIcon } from '@heroicons/react/24/outline'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { productApi } from '../api/productApi'
import { ProductCreate } from '../types/product'
import toast from 'react-hot-toast'

const AddProduct: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ProductCreate>({
    name: '',
    url: '',
    platform: '',
    description: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await productApi.createProduct(formData)
      toast.success('Product added successfully!')
      navigate('/watchlist')
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('Failed to add product')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, url }))

    // Auto-detect platform from URL
    const platform = detectPlatform(url)
    if (platform) {
      setFormData(prev => ({ ...prev, platform }))
    }
  }

  const detectPlatform = (url: string): string => {
    const domain = url.toLowerCase()
    if (domain.includes('amazon')) return 'amazon'
    if (domain.includes('flipkart')) return 'flipkart'
    if (domain.includes('myntra')) return 'myntra'
    if (domain.includes('croma')) return 'croma'
    if (domain.includes('ajio')) return 'ajio'
    return ''
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add Product
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Start tracking a new product by adding its details below.
        </p>
      </div>

      {/* Form */}
      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Product URL"
            type="url"
            placeholder="https://amazon.in/product-link"
            value={formData.url}
            onChange={(e) => handleUrlChange(e.target.value)}
            required
            helperText="Paste the product URL from a supported e-commerce site"
          />

          <Input
            label="Product Name"
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Platform
            </label>
            <select
              className="input"
              value={formData.platform}
              onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
              required
            >
              <option value="">Select platform</option>
              <option value="amazon">Amazon</option>
              <option value="flipkart">Flipkart</option>
              <option value="myntra">Myntra</option>
              <option value="croma">Croma</option>
              <option value="ajio">Ajio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              className="input min-h-[100px] resize-y"
              placeholder="Add any notes about this product..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/watchlist')}
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
              Add Product
            </Button>
          </div>
        </form>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <LinkIcon className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Supported Platforms
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            We currently support price tracking from:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Amazon India</li>
            <li>• Flipkart</li>
            <li>• Myntra</li>
            <li>• Croma</li>
            <li>• Ajio</li>
          </ul>
        </div>

        <div className="card p-6">
          <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-success-600 font-bold">!</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            How It Works
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>1. Add product URL</li>
            <li>2. We fetch current price</li>
            <li>3. Get notified of price drops</li>
            <li>4. Never miss a deal!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
