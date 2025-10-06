import React from 'react'
import { XMarkIcon, ExternalLinkIcon } from '@heroicons/react/24/outline'
import { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../shared/Button'

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onSetAlert?: (productId: number) => void
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  onSetAlert,
}) => {
  if (!isOpen || !product) return null

  const priceChange = product.original_price && product.current_price 
    ? ((product.current_price - product.original_price) / product.original_price) * 100
    : 0

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white pr-4">
              {product.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {product.image_url && (
              <div className="lg:w-1/3">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 lg:h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="lg:flex-1">
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {product.platform}
                  </span>
                  <div className="flex items-center space-x-3 mt-2">
                    {product.current_price && (
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.current_price)}
                      </span>
                    )}

                    {product.original_price && product.original_price !== product.current_price && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.original_price)}
                        </span>

                        {priceChange < 0 && (
                          <span className="text-sm font-medium text-success-600 bg-success-50 px-2 py-1 rounded">
                            {Math.abs(priceChange).toFixed(1)}% off
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    product.availability === 'In Stock' 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-danger-100 text-danger-800'
                  }`}>
                    {product.availability}
                  </span>
                </div>

                {product.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={() => onSetAlert?.(product.id)}
                    variant="primary"
                    className="flex-1"
                  >
                    Set Price Alert
                  </Button>

                  <Button
                    as="a"
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="flex-1 inline-flex items-center justify-center"
                  >
                    <ExternalLinkIcon className="w-4 h-4 mr-2" />
                    Visit Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsModal
