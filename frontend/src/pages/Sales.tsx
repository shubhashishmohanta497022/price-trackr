import React, { useState, useEffect } from 'react'
import { TagIcon, TrendingDownIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/shared/Loader'
import { saleApi } from '../api/saleApi'

interface Sale {
  id: number
  productName: string
  platform: string
  originalPrice: number
  salePrice: number
  discount: number
  imageUrl?: string
  url: string
}

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([])
  const [trendingSales, setTrendingSales] = useState<Sale[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const [salesData, trendingData] = await Promise.all([
          saleApi.getSales(),
          saleApi.getTrendingSales(),
        ])
        setSales(salesData)
        setTrendingSales(trendingData)
      } catch (error) {
        console.error('Error fetching sales:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSales()
  }, [])

  if (isLoading) {
    return <LoadingSpinner message="Loading sales..." />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Sales & Deals
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Discover the best deals and price drops across all platforms.
        </p>
      </div>

      {/* Coming Soon Message */}
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <TagIcon className="w-10 h-10 text-primary-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Sales Detection Coming Soon!
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          We're working hard to bring you intelligent sale detection that will automatically 
          identify the best deals across all supported platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card p-6 text-center">
            <TrendingDownIcon className="w-8 h-8 text-success-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Smart Price Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI-powered detection of genuine sales and discount patterns
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-warning-600 font-bold text-lg">%</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Best Deal Finder
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compare prices across platforms to find the absolute best deals
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold">🔔</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Instant Notifications
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get notified the moment your tracked products go on sale
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/add-product"
            className="btn btn-primary btn-lg"
          >
            Start Tracking Products
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sales
