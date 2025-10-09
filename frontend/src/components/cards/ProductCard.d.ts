import React from 'react';
import { Product } from '../../types/product';
interface ProductCardProps {
    product: Product;
    onDelete?: (id: number) => void;
    onViewDetails?: (product: Product) => void;
}
declare const ProductCard: React.FC<ProductCardProps>;
export default ProductCard;
//# sourceMappingURL=ProductCard.d.ts.map