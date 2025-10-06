import { useState } from 'react';
import { CheckCircle, Info, LoaderCircle, Sparkles } from 'lucide-react';
import clsx from 'clsx';

// --- Reusable Child Component for a supported site card ---
const SiteCard = ({ name, domain, status }) => (
  <div className={clsx(
    "bg-brand-dark p-4 rounded-lg text-center border border-brand-secondary",
    status === 'coming_soon' && 'opacity-50'
  )}>
    <p className="font-bold text-brand-text">{name}</p>
    <p className="text-xs text-brand-text-muted">{domain}</p>
    <span className={clsx(
      "text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block",
      status === 'active' && 'bg-green-900/50 text-green-400',
      status === 'beta' && 'bg-yellow-900/50 text-yellow-400',
      status === 'coming_soon' && 'bg-gray-700 text-gray-400'
    )}>
      {status === 'active' ? 'Active' : status === 'beta' ? 'Beta' : 'Coming Soon'}
    </span>
  </div>
);


// --- Main Add Product Page Component ---
const AddProduct = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const supportedSites = [
    { name: 'Amazon India', domain: 'amazon.in', status: 'active' },
    { name: 'Flipkart', domain: 'flipkart.com', status: 'active' },
    { name: 'Myntra', domain: 'myntra.com', status: 'beta' },
    { name: 'Croma', domain: 'croma.com', status: 'active' },
    { name: 'Ajio', domain: 'ajio.com', status: 'beta' },
    { name: 'Reliance Digital', domain: 'reliancedigital.in', status: 'coming_soon' },
  ];

  const handleTrackProduct = async () => {
    if (!url || !url.startsWith('http')) {
      setFeedback({ message: 'Please enter a valid product URL.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setFeedback({ message: '', type: '' });

    // Simulate API call
    try {
      // In a real app: await axios.post('/api/v1/products/track', { url });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFeedback({ message: 'Success! Product is now being tracked and scraped.', type: 'success' });
      setUrl('');
    } catch (error) {
      setFeedback({ message: 'Failed to track product. The URL might be unsupported.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-text">Add Product</h1>
        <p className="text-brand-text-muted">Track any product from supported e-commerce sites.</p>
      </div>

      {/* Main Form Section */}
      <div className="bg-brand-surface p-6 rounded-lg">
        <label htmlFor="productUrl" className="block text-sm font-medium text-brand-text-muted mb-2">
          Product URL
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="productUrl"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.amazon.in/dp/B09G952332"
            className="w-full bg-brand-dark border border-brand-secondary rounded-md px-4 py-2 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleTrackProduct}
            disabled={isLoading}
            className="flex items-center justify-center bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : 'Save'}
          </button>
        </div>
        {feedback.message && (
          <div className={clsx("flex items-center gap-2 mt-4 text-sm", {
            'text-green-400': feedback.type === 'success',
            'text-red-400': feedback.type === 'error'
          })}>
            {feedback.type === 'success' ? <CheckCircle size={16} /> : <Info size={16} />}
            {feedback.message}
          </div>
        )}
      </div>

      {/* Supported Sites Section */}
      <div className="bg-brand-surface p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-brand-text mb-4">Supported Sites</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {supportedSites.map(site => (
            <SiteCard key={site.name} {...site} />
          ))}
        </div>
      </div>
      
      {/* How It Works Section */}
       <div className="bg-brand-surface p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-brand-text mb-4">How It Works</h2>
        <ul className="space-y-3 text-brand-text-muted">
          <li className="flex items-start gap-3">
            <Sparkles size={20} className="text-brand-primary flex-shrink-0 mt-1" />
            <span>Paste a product URL from any supported e-commerce site.</span>
          </li>
          <li className="flex items-start gap-3">
            <Sparkles size={20} className="text-brand-primary flex-shrink-0 mt-1" />
            <span>Our system will check the price and add it to your watchlist automatically.</span>
          </li>
           <li className="flex items-start gap-3">
            <Sparkles size={20} className="text-brand-primary flex-shrink-0 mt-1" />
            <span>Set price drop alerts and make informed buying decisions.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddProduct;
