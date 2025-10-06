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
const SaleCard = ({ sale }) => (
  <div className="bg-brand-dark p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 border border-brand-secondary">
    <div className="flex-grow text-center sm:text-left">
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <h3 className="text-lg font-semibold text-brand-text">{sale.title}</h3>
        <span className={clsx("text-xs font-semibold px-2 py-0.5 rounded-full", {
          'bg-green-900/50 text-green-400': sale.status === 'ongoing',
          'bg-yellow-900/50 text-yellow-400': sale.status === 'upcoming',
          'bg-purple-900/50 text-purple-400': sale.status === 'top_deal'
        })}>
          {sale.status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-sm text-brand-text-muted">{sale.store} • {sale.category}</p>
    </div>
    <div className="flex-shrink-0 text-center sm:text-right">
      <p className="text-xl font-bold text-brand-primary">{sale.discount}</p>
      <p className="text-xs text-brand-text-muted">View Deals</p>
    </div>
    <div className="flex-shrink-0 flex items-center gap-2">
      <button className="bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-md">
        View Sale
      </button>
      <button className="text-brand-text-muted hover:text-white p-2">
        <Eye size={20} />
      </button>
    </div>
  </div>
);


// --- Main Sales Page Component ---
const Sales = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const activeCount = mockSalesData.filter(s => s.status === 'ongoing').length;
  const upcomingCount = mockSalesData.filter(s => s.status === 'upcoming').length;
  const topDealsCount = mockSalesData.filter(s => s.status === 'top_deal').length;
  
  const filteredSales = mockSalesData.filter(sale => {
    if (activeTab === 'ongoing') return sale.status === 'ongoing';
    if (activeTab === 'upcoming') return sale.status === 'upcoming';
    if (activeTab === 'top_deals') return sale.status === 'top_deal';
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Sales & Deals</h1>
        <p className="text-brand-text-muted">Never miss a sale - track upcoming and ongoing deals across platforms.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-secondary rounded-lg overflow-hidden">
        <div className="bg-brand-surface p-4 text-center"><p className="text-sm text-brand-text-muted">Active Sale</p><p className="text-2xl font-bold text-brand-text">{activeCount}</p></div>
        <div className="bg-brand-surface p-4 text-center"><p className="text-sm text-brand-text-muted">Upcoming</p><p className="text-2xl font-bold text-brand-text">{upcomingCount}</p></div>
        <div className="bg-brand-surface p-4 text-center"><p className="text-sm text-brand-text-muted">Top Deals</p><p className="text-2xl font-bold text-brand-text">{topDealsCount}</p></div>
        <div className="bg-brand-surface p-4 text-center"><p className="text-sm text-brand-text-muted">Avg. Discount</p><p className="text-2xl font-bold text-brand-success">58%</p></div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-brand-secondary flex space-x-6">
        <button onClick={() => setActiveTab('ongoing')} className={clsx("py-2 font-semibold", activeTab === 'ongoing' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted')}>Ongoing Sales</button>
        <button onClick={() => setActiveTab('upcoming')} className={clsx("py-2 font-semibold", activeTab === 'upcoming' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted')}>Upcoming</button>
        <button onClick={() => setActiveTab('top_deals')} className={clsx("py-2 font-semibold", activeTab === 'top_deals' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted')}>Top Deals</button>
      </div>

      {/* Sale List */}
      <div className="space-y-4">
        {filteredSales.map(sale => (
          <SaleCard key={sale.id} sale={sale} />
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-brand-surface p-6 rounded-lg flex items-start gap-4">
        <Info size={24} className="text-brand-primary flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-brand-text">Sale Awareness System</h3>
          <p className="text-sm text-brand-text-muted mt-1">Our system automatically monitors major e-commerce platforms for ongoing and upcoming sale events. This includes location-based sale awareness and automatic notifications once a sale goes live.</p>
        </div>
      </div>
    </div>
  );
};

export default Sales;
