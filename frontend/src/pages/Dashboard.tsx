import React, { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  HeartIcon, 
  TagIcon, 
  TrendingDownIcon 
} from '@heroicons/react/24/outline'
import StatCard from '../components/cards/StatCard'
import ProductCard from '../components/cards/ProductCard'
import LoadingSpinner from '../components/shared/Loader'
import { Product } from '../types/product'
import { productApi } from '../api/productApi'

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getProducts()
        setProducts(data.slice(0, 6)) // Show only 6 recent products
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const stats = [
    {
      title: 'Tracked Products',
      value: products.length,
      change: 12,
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: 'primary' as const,
    },
    {
      title: 'Active Alerts',
      value: 5,
      change: -3,
      icon: <HeartIcon className="w-6 h-6" />,
      color: 'warning' as const,
    },
    {
      title: 'Sales Found',
      value: 23,
      change: 45,
      icon: <TagIcon className="w-6 h-6" />,
      color: 'success' as const,
    },
    {
      title: 'Total Savings',
      value: '₹12,450',
      change: 28,
      icon: <TrendingDownIcon className="w-6 h-6" />,
      color: 'success' as const,
    },
  ]

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your tracked products.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Products
          </h2>
          <a
            href="/watchlist"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View all →
          </a>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start tracking products to see them here.
            </p>
            <a
              href="/add-product"
              className="btn btn-primary"
            >
              Add Your First Product
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
