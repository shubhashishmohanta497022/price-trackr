import { Search, Heart } from 'lucide-react';
import { type Product } from '@/types/product';

const mockWatchlistProducts: Product[] = [
  // Mock data needs to conform to the Product type
];

const ProductListItem = ({ product }: { product: Product }) => (
  <div className="flex flex-col sm:flex-row items-center bg-brand-surface p-4 rounded-lg space-y-4 sm:space-y-0 sm:space-x-6">
    <img src={product.image_url} alt={product.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
    <div className="flex-grow text-center sm:text-left">
      <h3 className="text-lg font-semibold text-brand-text mt-2">{product.name}</h3>
      <p className="text-sm text-brand-text-muted">{product.platform}</p>
    </div>
    {/* Simplified for now */}
  </div>
);

const Watchlist = () => {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Watchlist</h1>
        <p className="text-brand-text-muted">Track your favorite products.</p>
      </div>
      <div className="space-y-4">
        {mockWatchlistProducts.map(product => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;