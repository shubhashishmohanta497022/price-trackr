import { Product } from '../types/product';
interface ProductState {
    selectedProduct: Product | null;
    recentProducts: Product[];
    setSelectedProduct: (product: Product | null) => void;
    addRecentProduct: (product: Product) => void;
    clearRecentProducts: () => void;
}
export declare const useProductStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ProductState>>;
export {};
//# sourceMappingURL=productStore.d.ts.map