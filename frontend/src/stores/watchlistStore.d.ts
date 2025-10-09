import { Product } from '../types/product';
interface WatchlistState {
    products: Product[];
    isLoading: boolean;
    addProduct: (product: Product) => void;
    removeProduct: (id: number) => void;
    updateProduct: (id: number, updates: Partial<Product>) => void;
    setProducts: (products: Product[]) => void;
    setLoading: (loading: boolean) => void;
}
export declare const useWatchlistStore: import("zustand").UseBoundStore<import("zustand").StoreApi<WatchlistState>>;
export {};
//# sourceMappingURL=watchlistStore.d.ts.map