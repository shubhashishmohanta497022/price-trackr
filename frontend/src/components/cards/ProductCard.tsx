import React from 'react'
import { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { ChartBarIcon, ExternalLinkIcon, TrashIcon } from '@heroicons/react/24/outline'

interface ProductCardProps {
  product: Product
  onDelete?: (id: number) => void
  onViewDetails?: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onViewDetails }) => {
  const priceChange = product.original_price && product.current_price 
    ? ((product.current_price - product.original_price) / product.original_price) * 100
    : 0

  const isDiscounted = priceChange < 0

  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-2">
            {product.platform}
          </p>

          <div className="flex items-center space-x-2 mb-3">
            {product.current_price && (
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(product.current_price)}
              </span>
            )}

            {product.original_price && product.original_price !== product.current_price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}

            {isDiscounted && (
              <span className="text-sm font-medium text-success-600 bg-success-50 px-2 py-1 rounded">
                {priceChange.toFixed(1)}% off
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${
              product.availability === 'In Stock' 
                ? 'bg-success-100 text-success-800' 
                : 'bg-danger-100 text-danger-800'
            }`}>
              {product.availability}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onViewDetails?.(product)}
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                title="View Details"
              >
                <ChartBarIcon className="w-4 h-4" />
              </button>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                title="Visit Product"
              >
                <ExternalLinkIcon className="w-4 h-4" />
              </a>

              {onDelete && (
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-1 text-gray-400 hover:text-danger-600 transition-colors"
                  title="Delete Product"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
