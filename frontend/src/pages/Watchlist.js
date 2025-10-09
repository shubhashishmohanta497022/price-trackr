import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tag, Bell, TrendingDown, Search, Heart } from 'lucide-react';
// --- Placeholder Data (simulating API response for the watchlist) ---
const mockWatchlistProducts = [
    {
        id: 1,
        name: 'Sony WH-1000XM5 Wireless Industry Leading...',
        brand: 'Sony',
        currentPrice: 24990,
        lowestPrice: 22490,
        priceChangePercent: -8.0,
        isPriceDrop: true,
        imageUrl: 'https://via.placeholder.com/150/1F2937/FFFFFF?text=Sony',
    },
    {
        id: 2,
        name: 'Apple iPhone 15 Pro (256GB) - Natural Titanium',
        brand: 'Apple',
        currentPrice: 119900,
        lowestPrice: 119900,
        priceChangePercent: 0.0,
        isPriceDrop: false,
        imageUrl: 'https://via.placeholder.com/150/1F2937/FFFFFF?text=Apple',
    },
    {
        id: 3,
        name: 'Dell XPS 15 Laptop Intel Core i7 - 16GB RAM...',
        brand: 'Dell',
        currentPrice: 134990,
        lowestPrice: 130500,
        priceChangePercent: 1.2,
        isPriceDrop: false,
        imageUrl: 'https://via.placeholder.com/150/1F2937/FFFFFF?text=Dell',
    },
    {
        id: 4,
        name: 'Logitech MX Master 3S Wireless Performance Mouse',
        brand: 'Logitech',
        currentPrice: 8995,
        lowestPrice: 8995,
        priceChangePercent: 0.0,
        isPriceDrop: false,
        imageUrl: 'https://via.placeholder.com/150/1F2937/FFFFFF?text=Logitech',
    },
];
// --- Reusable Child Component for a single product row ---
const ProductListItem = ({ product }) => (_jsxs("div", { className: "flex flex-col sm:flex-row items-center bg-brand-surface p-4 rounded-lg space-y-4 sm:space-y-0 sm:space-x-6", children: [_jsx("img", { src: product.imageUrl, alt: product.name, className: "w-24 h-24 object-cover rounded-md flex-shrink-0" }), _jsxs("div", { className: "flex-grow text-center sm:text-left", children: [product.isPriceDrop && (_jsx("span", { className: "text-xs font-bold text-red-400 bg-red-900/50 px-2 py-1 rounded-full", children: "\u25BC PRICE DROP" })), _jsx("h3", { className: "text-lg font-semibold text-brand-text mt-2", children: product.name }), _jsx("p", { className: "text-sm text-brand-text-muted", children: product.brand })] }), _jsxs("div", { className: "flex-shrink-0 text-center sm:text-right space-y-2", children: [_jsxs("div", { className: "flex items-baseline justify-center sm:justify-end space-x-2", children: [_jsx("p", { className: "text-2xl font-bold text-brand-text", children: `₹${product.currentPrice.toLocaleString('en-IN')}` }), _jsx("span", { className: `${product.priceChangePercent < 0 ? 'text-brand-success' : 'text-red-400'}`, children: product.priceChangePercent !== 0 && `${product.priceChangePercent.toFixed(1)}%` })] }), _jsxs("p", { className: "text-sm text-brand-text-muted", children: ["Lowest: ", _jsx("span", { className: "font-semibold text-brand-success", children: `₹${product.lowestPrice.toLocaleString('en-IN')}` })] })] }), _jsxs("div", { className: "flex-shrink-0 flex items-center space-x-2", children: [_jsx("button", { className: "bg-brand-secondary hover:bg-opacity-80 text-brand-text font-semibold py-2 px-4 rounded-md", children: "View Deal" }), _jsx("button", { className: "bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-md", children: "Set Alert" }), _jsx("button", { className: "text-red-400 hover:text-red-300 p-2", children: _jsx(Heart, { size: 20 }) })] })] }));
// --- Main Watchlist Page Component ---
const Watchlist = () => {
    return (_jsxs("div", { className: "p-6 md:p-8 space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-brand-text", children: "Watchlist" }), _jsx("p", { className: "text-brand-text-muted", children: "Track your favorite products and get notified on price drops." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 bg-brand-surface p-6 rounded-lg", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-brand-text-muted", children: "Total Tracked" }), _jsx("p", { className: "text-3xl font-bold text-brand-text", children: "4" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-brand-text-muted", children: "Price Alerts" }), _jsx("p", { className: "text-3xl font-bold text-brand-primary", children: "1" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-brand-text-muted", children: "Potential Saving" }), _jsx("p", { className: "text-3xl font-bold text-brand-success", children: "\u20B912,450" }), _jsx("p", { className: "text-xs text-brand-text-muted", children: "if you buy at lowest" })] })] }), _jsxs("div", { className: "flex flex-col md:flex-row items-center gap-4", children: [_jsxs("div", { className: "relative w-full md:flex-grow", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted", size: 20 }), _jsx("input", { type: "text", placeholder: "Search and genuice your watchlist", className: "w-full bg-brand-surface border border-brand-secondary rounded-md pl-10 pr-4 py-2 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none" })] }), _jsxs("div", { className: "flex items-center gap-4 w-full md:w-auto", children: [_jsxs("select", { className: "bg-brand-surface border border-brand-secondary rounded-md px-4 py-2 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none", children: [_jsx("option", { children: "Recently Added" }), _jsx("option", { children: "Price Drop" }), _jsx("option", { children: "Highest Price" })] }), _jsx("button", { className: "bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-md whitespace-nowrap", children: "All Products" })] })] }), _jsx("div", { className: "space-y-4", children: mockWatchlistProducts.map(product => (_jsx(ProductListItem, { product: product }, product.id))) })] }));
};
export default Watchlist;
//# sourceMappingURL=Watchlist.js.map