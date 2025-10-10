import { useEffect, useState } from 'react';
import { ArrowDownRight, BarChart, Heart, ShieldOff, ShoppingCart } from 'lucide-react';
import StatCard from '../components/cards/StatCard';
import ProductCard from '../components/cards/ProductCard';
import { Product } from '../types/product'; // Assuming you have this type

// Simple placeholder for SystemHealthItem
const SystemHealthItem = ({ name, status, uptime }: { name: string, status: string, uptime: number }) => (
    <div className="flex justify-between items-center">
        <span>{name}</span>
        <span className={status === 'Operational' ? 'text-green-500' : 'text-red-500'}>{status} ({uptime}%)</span>
    </div>
);


const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mocking data since endpoints might not exist yet
                const dashboardRes = { data: { stats: { productsTracked: 0, avgSavings: 0, activeAlerts: 0, scamSitesBlocked: 0 }, systemHealth: { amazonScraper: { status: 'Operational', uptimePercentage: 100 }, flipkartScraper: { status: 'Operational', uptimePercentage: 100 }, mongoScraper: { status: 'Operational', uptimePercentage: 100 }, websocketUpdates: { status: 'Operational', uptimePercentage: 100 } } } };
                const watchlistRes = { data: [] };

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<ShoppingCart />} title="Products Tracked" value={stats.productsTracked} />
                <StatCard icon={<ArrowDownRight />} title="Avg. Savings" value={`₹${stats.avgSavings.toFixed(2)}`} />
                <StatCard icon={<Heart />} title="Active Alerts" value={stats.activeAlerts} />
                <StatCard icon={<ShieldOff />} title="Scam Sites Blocked" value={stats.scamSitesBlocked} />
            </div>
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
