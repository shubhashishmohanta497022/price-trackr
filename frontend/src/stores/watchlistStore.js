import { create } from 'zustand';
import { Product } from '../types/product';
export const useWatchlistStore = create((set) => ({
    products: [],
    isLoading: false,
    addProduct: (product) => set((state) => ({
        products: [...state.products, product],
    })),
    removeProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
    })),
    updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p),
    })),
    setProducts: (products) => set({ products }),
    setLoading: (isLoading) => set({ isLoading }),
}));
//# sourceMappingURL=watchlistStore.js.map