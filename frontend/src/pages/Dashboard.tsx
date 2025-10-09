import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowDownRight, ArrowUpRight, BarChart, Heart, ShieldOff, ShoppingCart } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import SystemHealthItem from '../components/dashboard/SystemHealthItem';
import ProductCard from '../components/watchlist/ProductCard';

const API_URL = 'http://localhost:8000/api'; // Replace with your actual API URL in production

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
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
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!dashboardData) return <div>Error loading data.</div>;

    const { stats, systemHealth } = dashboardData;

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={ShoppingCart} title="Products Tracked" value={stats.productsTracked} />
                <StatCard icon={ArrowDownRight} title="Avg. Savings" value={`₹${stats.avgSavings.toFixed(2)}`} />
                <StatCard icon={Heart} title="Active Alerts" value={stats.activeAlerts} />
                <StatCard icon={ShieldOff} title="Scam Sites Blocked" value={stats.scamSitesBlocked} />
            </div>

            {/* System Health */}
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-gray-500" />
                    System Health
                </h2>
                <div className="space-y-4">
                    <SystemHealthItem name="Amazon Scraper" status={systemHealth.amazonScraper.status} uptime={systemHealth.amazonScraper.uptimePercentage} />
                    <SystemHealthItem name="Flipkart Scraper" status={systemHealth.flipkartScraper.status} uptime={systemHealth.flipkartScraper.uptimePercentage} />
                    <SystemHealthItem name="Mongo Scraper" status={systemHealth.mongoScraper.status} uptime={systemHealth.mongoScraper.uptimePercentage} />
                    <SystemHealthItem name="Websocket Updates" status={systemHealth.websocketUpdates.status} uptime={systemHealth.websocketUpdates.uptimePercentage} />
                </div>
            </div>

            {/* Trending Products */}
            <div>
                 <h2 className="text-lg font-semibold mb-4">Trending Products</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default DashboardPage;
