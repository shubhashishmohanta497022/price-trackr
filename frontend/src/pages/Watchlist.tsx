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
const ProductListItem = ({ product }) => (
  <div className="flex flex-col sm:flex-row items-center bg-brand-surface p-4 rounded-lg space-y-4 sm:space-y-0 sm:space-x-6">
    <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
    <div className="flex-grow text-center sm:text-left">
      {product.isPriceDrop && (
        <span className="text-xs font-bold text-red-400 bg-red-900/50 px-2 py-1 rounded-full">
          ▼ PRICE DROP
        </span>
      )}
      <h3 className="text-lg font-semibold text-brand-text mt-2">{product.name}</h3>
      <p className="text-sm text-brand-text-muted">{product.brand}</p>
    </div>
    <div className="flex-shrink-0 text-center sm:text-right space-y-2">
      <div className="flex items-baseline justify-center sm:justify-end space-x-2">
        <p className="text-2xl font-bold text-brand-text">
          {`₹${product.currentPrice.toLocaleString('en-IN')}`}
        </p>
        <span className={`${product.priceChangePercent < 0 ? 'text-brand-success' : 'text-red-400'}`}>
          {product.priceChangePercent !== 0 && `${product.priceChangePercent.toFixed(1)}%`}
        </span>
      </div>
      <p className="text-sm text-brand-text-muted">
        Lowest: <span className="font-semibold text-brand-success">{`₹${product.lowestPrice.toLocaleString('en-IN')}`}</span>
      </p>
    </div>
    <div className="flex-shrink-0 flex items-center space-x-2">
      <button className="bg-brand-secondary hover:bg-opacity-80 text-brand-text font-semibold py-2 px-4 rounded-md">
        View Deal
      </button>
      <button className="bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-md">
        Set Alert
      </button>
      <button className="text-red-400 hover:text-red-300 p-2">
        <Heart size={20} />
      </button>
    </div>
  </div>
);

// --- Main Watchlist Page Component ---
const Watchlist = () => {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Watchlist</h1>
        <p className="text-brand-text-muted">Track your favorite products and get notified on price drops.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-brand-surface p-6 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-brand-text-muted">Total Tracked</p>
          <p className="text-3xl font-bold text-brand-text">4</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-brand-text-muted">Price Alerts</p>
          <p className="text-3xl font-bold text-brand-primary">1</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-brand-text-muted">Potential Saving</p>
          <p className="text-3xl font-bold text-brand-success">₹12,450</p>
          <p className="text-xs text-brand-text-muted">if you buy at lowest</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search and genuice your watchlist"
            className="w-full bg-brand-surface border border-brand-secondary rounded-md pl-10 pr-4 py-2 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select className="bg-brand-surface border border-brand-secondary rounded-md px-4 py-2 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none">
            <option>Recently Added</option>
            <option>Price Drop</option>
            <option>Highest Price</option>
          </select>
          <button className="bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-md whitespace-nowrap">
            All Products
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {mockWatchlistProducts.map(product => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
