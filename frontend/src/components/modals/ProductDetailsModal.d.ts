import React from 'react';
import { Product } from '../../types/product';
interface ProductDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onSetAlert?: (productId: number) => void;
}
declare const ProductDetailsModal: React.FC<ProductDetailsModalProps>;
export default ProductDetailsModal;
//# sourceMappingURL=ProductDetailsModal.d.ts.map