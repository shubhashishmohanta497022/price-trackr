import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowDownRight, ArrowUpRight, BarChart, Heart, ShieldOff, ShoppingCart } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import SystemHealthItem from '../components/dashboard/SystemHealthItem';
import ProductCard from '../components/watchlist/ProductCard';
const API_URL = 'http://localhost:8000/api'; // Replace with your actual API URL in production
const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dashboardRes, watchlistRes] = await Promise.all([
                    axios.get(`${API_URL}/dashboard`),
                    axios.get(`${API_URL}/watchlist`),
                ]);
                setDashboardData(dashboardRes.data);
                setTrendingProducts(watchlistRes.data);
            }
            catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (!dashboardData)
        return _jsx("div", { children: "Error loading data." });
    const { stats, systemHealth } = dashboardData;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(StatCard, { icon: ShoppingCart, title: "Products Tracked", value: stats.productsTracked }), _jsx(StatCard, { icon: ArrowDownRight, title: "Avg. Savings", value: `₹${stats.avgSavings.toFixed(2)}` }), _jsx(StatCard, { icon: Heart, title: "Active Alerts", value: stats.activeAlerts }), _jsx(StatCard, { icon: ShieldOff, title: "Scam Sites Blocked", value: stats.scamSitesBlocked })] }), _jsxs("div", { className: "bg-white dark:bg-gray-950 p-6 rounded-lg border border-gray-200 dark:border-gray-800", children: [_jsxs("h2", { className: "text-lg font-semibold mb-4 flex items-center", children: [_jsx(BarChart, { className: "mr-2 h-5 w-5 text-gray-500" }), "System Health"] }), _jsxs("div", { className: "space-y-4", children: [_jsx(SystemHealthItem, { name: "Amazon Scraper", status: systemHealth.amazonScraper.status, uptime: systemHealth.amazonScraper.uptimePercentage }), _jsx(SystemHealthItem, { name: "Flipkart Scraper", status: systemHealth.flipkartScraper.status, uptime: systemHealth.flipkartScraper.uptimePercentage }), _jsx(SystemHealthItem, { name: "Mongo Scraper", status: systemHealth.mongoScraper.status, uptime: systemHealth.mongoScraper.uptimePercentage }), _jsx(SystemHealthItem, { name: "Websocket Updates", status: systemHealth.websocketUpdates.status, uptime: systemHealth.websocketUpdates.uptimePercentage })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Trending Products" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: trendingProducts.map(product => (_jsx(ProductCard, { product: product }, product.id))) })] })] }));
};
export default DashboardPage;
//# sourceMappingURL=Dashboard.js.map