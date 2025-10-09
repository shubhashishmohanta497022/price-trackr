import { useState } from 'react';
import { CheckCircle, Info, LoaderCircle, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { productApi } from '@/api/productApi'; // Import your API client

// ... (SiteCard component remains the same) ...

const AddProduct = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  
  // ... (supportedSites array remains the same) ...

  const handleTrackProduct = async () => {
    if (!url || !url.startsWith('http')) {
      setFeedback({ message: 'Please enter a valid product URL.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setFeedback({ message: '', type: '' });

    try {
      // Use the API client to send the request to the backend
      await productApi.trackProduct(url);
      setFeedback({ message: 'Success! Product is now being tracked and scraped.', type: 'success' });
      setUrl('');
    } catch (error) {
      console.error("Tracking error:", error);
      setFeedback({ message: 'Failed to track product. The URL might be unsupported or an error occurred.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // ... (JSX remains the same) ...
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* ... header ... */}
      <div className="bg-brand-surface p-6 rounded-lg">
        {/* ... form ... */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="productUrl"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            // ... other props
          />
          <button
            onClick={handleTrackProduct}
            disabled={isLoading}
            // ... other props
          >
            {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : 'Save'}
          </button>
        </div>
         {/* ... feedback message ... */}
      </div>
      {/* ... other sections ... */}
    </div>
  );
};

export default AddProduct;

