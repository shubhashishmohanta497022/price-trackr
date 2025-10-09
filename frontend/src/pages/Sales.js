import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, Info } from 'lucide-react';
import clsx from 'clsx';
// --- Placeholder Data (simulating API response for sales events) ---
const mockSalesData = [
    {
        id: 1,
        title: "Great Indian Festival",
        store: "Amazon",
        category: "Electronics",
        discount: "Up to 80% off",
        status: "ongoing",
    },
    {
        id: 2,
        title: "Big Billion Days",
        store: "Flipkart",
        category: "Fashion",
        discount: "Up to 75% off",
        status: "ongoing",
    },
    {
        id: 3,
        title: "End of Season Sale",
        store: "Myntra",
        category: "Clothing",
        discount: "Flat 50-80% off",
        status: "upcoming",
    },
    {
        id: 4,
        title: "Weekend Sale",
        store: "Ajio",
        category: "All Categories",
        discount: "Extra 20% off",
        status: "top_deal",
    },
];
// --- Reusable Child Component for a single sale card ---
const SaleCard = ({ sale }) => (_jsxs("div", { className: "bg-brand-dark p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 border border-brand-secondary", children: [_jsxs("div", { className: "flex-grow text-center sm:text-left", children: [_jsxs("div", { className: "flex items-center gap-3 justify-center sm:justify-start", children: [_jsx("h3", { className: "text-lg font-semibold text-brand-text", children: sale.title }), _jsx("span", { className: clsx("text-xs font-semibold px-2 py-0.5 rounded-full", {
                                'bg-green-900/50 text-green-400': sale.status === 'ongoing',
                                'bg-yellow-900/50 text-yellow-400': sale.status === 'upcoming',
                                'bg-purple-900/50 text-purple-400': sale.status === 'top_deal'
                            }), children: sale.status.replace('_', ' ') })] }), _jsxs("p", { className: "text-sm text-brand-text-muted", children: [sale.store, " \u2022 ", sale.category] })] }), _jsxs("div", { className: "flex-shrink-0 text-center sm:text-right", children: [_jsx("p", { className: "text-xl font-bold text-brand-primary", children: sale.discount }), _jsx("p", { className: "text-xs text-brand-text-muted", children: "View Deals" })] }), _jsxs("div", { className: "flex-shrink-0 flex items-center gap-2", children: [_jsx("button", { className: "bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-md", children: "View Sale" }), _jsx("button", { className: "text-brand-text-muted hover:text-white p-2", children: _jsx(Eye, { size: 20 }) })] })] }));
// --- Main Sales Page Component ---
const Sales = () => {
    const [activeTab, setActiveTab] = useState('ongoing');
    const activeCount = mockSalesData.filter(s => s.status === 'ongoing').length;
    const upcomingCount = mockSalesData.filter(s => s.status === 'upcoming').length;
    const topDealsCount = mockSalesData.filter(s => s.status === 'top_deal').length;
    const filteredSales = mockSalesData.filter(sale => {
        if (activeTab === 'ongoing')
            return sale.status === 'ongoing';
        if (activeTab === 'upcoming')
            return sale.status === 'upcoming';
        if (activeTab === 'top_deals')
            return sale.status === 'top_deal';
        return true;
    });
    return (_jsxs("div", { className: "p-6 md:p-8 space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-brand-text", children: "Sales & Deals" }), _jsx("p", { className: "text-brand-text-muted", children: "Never miss a sale - track upcoming and ongoing deals across platforms." })] }), _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-secondary rounded-lg overflow-hidden", children: [_jsxs("div", { className: "bg-brand-surface p-4 text-center", children: [_jsx("p", { className: "text-sm text-brand-text-muted", children: "Active Sale" }), _jsx("p", { className: "text-2xl font-bold text-brand-text", children: activeCount })] }), _jsxs("div", { className: "bg-brand-surface p-4 text-center", children: [_jsx("p", { className: "text-sm text-brand-text-muted", children: "Upcoming" }), _jsx("p", { className: "text-2xl font-bold text-brand-text", children: upcomingCount })] }), _jsxs("div", { className: "bg-brand-surface p-4 text-center", children: [_jsx("p", { className: "text-sm text-brand-text-muted", children: "Top Deals" }), _jsx("p", { className: "text-2xl font-bold text-brand-text", children: topDealsCount })] }), _jsxs("div", { className: "bg-brand-surface p-4 text-center", children: [_jsx("p", { className: "text-sm text-brand-text-muted", children: "Avg. Discount" }), _jsx("p", { className: "text-2xl font-bold text-brand-success", children: "58%" })] })] }), _jsxs("div", { className: "border-b border-brand-secondary flex space-x-6", children: [_jsx("button", { onClick: () => setActiveTab('ongoing'), className: clsx("py-2 font-semibold", activeTab === 'ongoing' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted'), children: "Ongoing Sales" }), _jsx("button", { onClick: () => setActiveTab('upcoming'), className: clsx("py-2 font-semibold", activeTab === 'upcoming' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted'), children: "Upcoming" }), _jsx("button", { onClick: () => setActiveTab('top_deals'), className: clsx("py-2 font-semibold", activeTab === 'top_deals' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted'), children: "Top Deals" })] }), _jsx("div", { className: "space-y-4", children: filteredSales.map(sale => (_jsx(SaleCard, { sale: sale }, sale.id))) }), _jsxs("div", { className: "bg-brand-surface p-6 rounded-lg flex items-start gap-4", children: [_jsx(Info, { size: 24, className: "text-brand-primary flex-shrink-0 mt-1" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-brand-text", children: "Sale Awareness System" }), _jsx("p", { className: "text-sm text-brand-text-muted mt-1", children: "Our system automatically monitors major e-commerce platforms for ongoing and upcoming sale events. This includes location-based sale awareness and automatic notifications once a sale goes live." })] })] })] }));
};
export default Sales;
//# sourceMappingURL=Sales.js.map