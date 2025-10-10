import React, { useState } from 'react';
import { Info } from 'lucide-react';
import clsx from 'clsx';
import { type SaleEvent } from '@/types/sale';

const mockSalesData: SaleEvent[] = [
  {
      id: 1,
      title: "Great Indian Festival",
      store: "Amazon",
      category: "Electronics",
      discount_summary: "Up to 80% off",
      status: "ongoing",
      details: "Massive discounts on mobiles, laptops, and home appliances."
  },
  {
      id: 2,
      title: "Big Billion Days",
      store: "Flipkart",
      category: "Fashion",
      discount_summary: "Up to 75% off",
      status: "ongoing",
      details: "Major price drops on clothing, footwear, and accessories."
  },
  {
      id: 3,
      title: "End of Season Sale",
      store: "Myntra",
      category: "Clothing",
      discount_summary: "Flat 50-80% off",
      status: "upcoming",
      details: "Get ready for the biggest fashion sale of the season."
  },
  {
      id: 4,
      title: "Weekend Sale",
      store: "Ajio",
      category: "All Categories",
      discount_summary: "Extra 20% off",
      status: "top_deal",
      details: "Use code WEEKEND20 for an extra discount on all items."
  },
];

const SaleCard = ({ sale }: { sale: SaleEvent }) => (
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
      <p className="text-xl font-bold text-brand-primary">{sale.discount_summary}</p>
      <p className="text-xs text-brand-text-muted">View Deals</p>
    </div>
  </div>
);

const Sales = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const filteredSales = mockSalesData.filter(sale => activeTab === 'all' || sale.status === activeTab);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Sales & Deals</h1>
        <p className="text-brand-text-muted">Track upcoming and ongoing deals.</p>
      </div>
       <div className="border-b border-brand-secondary flex space-x-6">
          <button onClick={() => setActiveTab('ongoing')} className={clsx("py-2 font-semibold", activeTab === 'ongoing' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted')}>Ongoing Sales</button>
          <button onClick={() => setActiveTab('upcoming')} className={clsx("py-2 font-semibold", activeTab === 'upcoming' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted')}>Upcoming</button>
          <button onClick={() => setActiveTab('top_deal')} className={clsx("py-2 font-semibold", activeTab === 'top_deal' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted')}>Top Deals</button>
      </div>
      <div className="space-y-4">
        {filteredSales.map(sale => (
          <SaleCard key={sale.id} sale={sale} />
        ))}
      </div>
    </div>
  );
};

export default Sales;

