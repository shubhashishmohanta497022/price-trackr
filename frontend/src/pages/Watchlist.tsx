import React, { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ProductCard from '../components/cards/ProductCard'
import ProductDetailsModal from '../components/modals/ProductDetailsModal'
import AddAlertModal from '../components/modals/AddAlertModal'
import LoadingSpinner from '../components/shared/Loader'
import Input from '../components/shared/Input'
import { Product } from '../types/product'
import { productApi } from '../api/productApi'
import { useDebounce } from '../hooks/useDebounce'
import toast from 'react-hot-toast'

const Watchlist: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [alertProductId, setAlertProductId] = useState<number | null>(null)

  const debouncedSearch = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        toast.error('Failed to fetch products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (debouncedSearch) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.platform.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [debouncedSearch, products])

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.deleteProduct(id)
        setProducts(prev => prev.filter(p => p.id !== id))
        toast.success('Product deleted successfully')
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product')
      }
    }
  }

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setShowDetailsModal(true)
  }

  const handleSetAlert = (productId: number) => {
    setAlertProductId(productId)
    setShowAlertModal(true)
    setShowDetailsModal(false)
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading your watchlist..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Watchlist
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {products.length} product{products.length !== 1 ? 's' : ''} being tracked
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products in watchlist
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start tracking products to build your watchlist.
          </p>
          <a
            href="/add-product"
            className="btn btn-primary"
          >
            Add Product
          </a>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms.
          </p>
        </div>
      )}

      {/* Modals */}
      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        product={selectedProduct}
        onSetAlert={handleSetAlert}
      />

      {alertProductId && (
        <AddAlertModal
          isOpen={showAlertModal}
          onClose={() => {
            setShowAlertModal(false)
            setAlertProductId(null)
          }}
          productId={alertProductId}
          currentPrice={products.find(p => p.id === alertProductId)?.current_price || 0}
        />
      )}
    </div>
  )
}

export default Watchlist
