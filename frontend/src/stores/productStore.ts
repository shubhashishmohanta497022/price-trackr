import { create } from 'zustand'
import { Product } from '../types/product'

interface ProductState {
  selectedProduct: Product | null
  recentProducts: Product[]
  setSelectedProduct: (product: Product | null) => void
  addRecentProduct: (product: Product) => void
  clearRecentProducts: () => void
}

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  recentProducts: [],

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  addRecentProduct: (product) =>
    set((state) => {
      const filtered = state.recentProducts.filter((p) => p.id !== product.id)
      return {
        recentProducts: [product, ...filtered].slice(0, 10), // Keep only 10 recent products
      }
    }),

  clearRecentProducts: () => set({ recentProducts: [] }),
}))
