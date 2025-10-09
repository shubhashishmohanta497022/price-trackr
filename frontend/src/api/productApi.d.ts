import { Product, ProductCreate } from '../types/product';
export declare const productApi: {
    getProducts: () => Promise<Product[]>;
    getProduct: (id: number) => Promise<Product>;
    createProduct: (product: ProductCreate) => Promise<Product>;
    updateProduct: (id: number, product: Partial<ProductCreate>) => Promise<Product>;
    deleteProduct: (id: number) => Promise<void>;
    getProductPriceHistory: (id: number) => Promise<any>;
};
//# sourceMappingURL=productApi.d.ts.map