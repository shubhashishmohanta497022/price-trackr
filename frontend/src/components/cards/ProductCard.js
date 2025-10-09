import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import { ChartBarIcon, ExternalLinkIcon, TrashIcon } from '@heroicons/react/24/outline';
const ProductCard = ({ product, onDelete, onViewDetails }) => {
    const priceChange = product.original_price && product.current_price
        ? ((product.current_price - product.original_price) / product.original_price) * 100
        : 0;
    const isDiscounted = priceChange < 0;
    return (_jsx("div", { className: "card p-6 hover:shadow-md transition-shadow", children: _jsxs("div", { className: "flex items-start space-x-4", children: [product.image_url && (_jsx("img", { src: product.image_url, alt: product.name, className: "w-16 h-16 object-cover rounded-lg flex-shrink-0" })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-gray-900 dark:text-white truncate", children: product.name }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 capitalize mb-2", children: product.platform }), _jsxs("div", { className: "flex items-center space-x-2 mb-3", children: [product.current_price && (_jsx("span", { className: "text-lg font-bold text-gray-900 dark:text-white", children: formatPrice(product.current_price) })), product.original_price && product.original_price !== product.current_price && (_jsx("span", { className: "text-sm text-gray-500 line-through", children: formatPrice(product.original_price) })), isDiscounted && (_jsxs("span", { className: "text-sm font-medium text-success-600 bg-success-50 px-2 py-1 rounded", children: [priceChange.toFixed(1), "% off"] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: `text-xs px-2 py-1 rounded-full ${product.availability === 'In Stock'
                                        ? 'bg-success-100 text-success-800'
                                        : 'bg-danger-100 text-danger-800'}`, children: product.availability }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => onViewDetails?.(product), className: "p-1 text-gray-400 hover:text-primary-600 transition-colors", title: "View Details", children: _jsx(ChartBarIcon, { className: "w-4 h-4" }) }), _jsx("a", { href: product.url, target: "_blank", rel: "noopener noreferrer", className: "p-1 text-gray-400 hover:text-primary-600 transition-colors", title: "Visit Product", children: _jsx(ExternalLinkIcon, { className: "w-4 h-4" }) }), onDelete && (_jsx("button", { onClick: () => onDelete(product.id), className: "p-1 text-gray-400 hover:text-danger-600 transition-colors", title: "Delete Product", children: _jsx(TrashIcon, { className: "w-4 h-4" }) }))] })] })] })] }) }));
};
export default ProductCard;
//# sourceMappingURL=ProductCard.js.map