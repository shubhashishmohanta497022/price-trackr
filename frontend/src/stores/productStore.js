import { create } from 'zustand';
import { Product } from '../types/product';
export const useProductStore = create((set) => ({
    selectedProduct: null,
    recentProducts: [],
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    addRecentProduct: (product) => set((state) => {
        const filtered = state.recentProducts.filter((p) => p.id !== product.id);
        return {
            recentProducts: [product, ...filtered].slice(0, 10), // Keep only 10 recent products
        };
    }),
    clearRecentProducts: () => set({ recentProducts: [] }),
}));
//# sourceMappingURL=productStore.js.map