import { ArrowDownCircle, Bell, Tag, Target } from "lucide-react";

// --- Reusable Child Components (would be in '@/components/dashboard/') ---
// For this file, we'll define them here for simplicity. In the final structure,
// these would be imported from their own files.

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle }) => (
  <div className="bg-brand-surface p-6 rounded-lg flex items-start space-x-4">
    <div className="bg-brand-secondary p-3 rounded-md">{icon}</div>
    <div>
      <p className="text-sm text-brand-text-muted">{title}</p>
      <p className="text-2xl font-bold text-brand-text">{value}</p>
      <p className="text-xs text-brand-text-muted">{subtitle}</p>
    </div>
  </div>
);

// --- Main Dashboard Component ---

const Dashboard = () => {
  // --- Placeholder Data (simulating API response) ---
  const stats = {
    productsTracked: 247,
    avgSavings: 1247,
    activeAlerts: 18,
    sitesMonitored: 42,
  };

  const activeAlerts = [
    { id: 1, name: "Sony WH-1000XM5 Wireless Industry Leading...", price: "₹24,990" },
    { id: 2, name: "Apple iPhone 15 Pro (256GB) - Natural Titanium", price: "₹1,19,900" },
  ];
  
  const systemHealth = [
      { name: "Amazon Scraper", status: "Operational", uptime: 99.8 },
      { name: "Flipkart Scraper", status: "Operational", uptime: 99.9 },
      { name: "Myntra Scraper", status: "Degraded", uptime: 92.1 },
      { name: "WebSocket Updates", status: "Operational", uptime: 100 },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Dashboard</h1>
        <p className="text-brand-text-muted">Total prices across available platforms in real time.</p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Tag size={24} className="text-brand-primary" />}
          title="Products Tracked"
          value={stats.productsTracked.toString()}
          subtitle="across all sites"
        />
        <StatCard
          icon={<ArrowDownCircle size={24} className="text-brand-success" />}
          title="Avg. Savings"
          value={`₹${stats.avgSavings.toLocaleString('en-IN')}`}
          subtitle="per product"
        />
        <StatCard
          icon={<Bell size={24} className="text-yellow-400" />}
          title="Active Alerts"
          value={stats.activeAlerts.toString()}
          subtitle="triggered this week"
        />
        <StatCard
          icon={<Target size={24} className="text-red-400" />}
          title="Sites Monitored"
          value={stats.sitesMonitored.toString()}
          subtitle="active scrapers"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Alerts & Trending */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Price Alerts */}
          <div className="bg-brand-surface rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-brand-text">Active Price Alerts</h2>
              <button className="text-sm text-brand-primary hover:underline">View All</button>
            </div>
            <ul className="space-y-4">
              {activeAlerts.map(alert => (
                <li key={alert.id} className="flex justify-between items-center bg-brand-dark p-4 rounded-md">
                  <p className="text-brand-text-muted truncate pr-4">{alert.name}</p>
                  <span className="font-bold text-brand-success whitespace-nowrap">{alert.price}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Trending Products (Placeholder) */}
          <div className="bg-brand-surface rounded-lg p-6">
             <h2 className="text-xl font-semibold text-brand-text mb-4">Trending Products</h2>
             <p className="text-brand-text-muted text-center py-8">Trending products will be displayed here.</p>
          </div>
        </div>

        {/* Right Column: System Health */}
        <div className="bg-brand-surface rounded-lg p-6 h-fit">
           <h2 className="text-xl font-semibold text-brand-text mb-6">System Health</h2>
           <div className="space-y-5">
              {systemHealth.map(service => (
                <div key={service.name}>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-brand-text-muted">{service.name}</span>
                    <span className={`font-semibold ${service.uptime > 95 ? 'text-brand-success' : 'text-yellow-400'}`}>
                      {service.uptime}%
                    </span>
                  </div>
                  <div className="w-full bg-brand-dark rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${service.uptime > 95 ? 'bg-brand-success' : 'bg-yellow-400'}`}
                      style={{ width: `${service.uptime}%` }}
                    ></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

