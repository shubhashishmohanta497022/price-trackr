import { create } from 'zustand'
import { Product } from '../types/product'

interface WatchlistState {
  products: Product[]
  isLoading: boolean
  addProduct: (product: Product) => void
  removeProduct: (id: number) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  setProducts: (products: Product[]) => void
  setLoading: (loading: boolean) => void
}

export const useWatchlistStore = create<WatchlistState>((set) => ({
  products: [],
  isLoading: false,

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  setProducts: (products) => set({ products }),
  setLoading: (isLoading) => set({ isLoading }),
}))
