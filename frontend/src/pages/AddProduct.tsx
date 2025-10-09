import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { productApi } from '@/api/productApi';

const AddProduct = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ message: '', type: '' });

  const handleTrackProduct = async () => {
    if (!url || !url.startsWith('http')) {
      setFeedbackMessage({ message: 'Please enter a valid product URL.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage({ message: '', type: '' });

    try {
      await productApi.trackProduct(url);
      setFeedbackMessage({ message: 'Success! Product is now being tracked.', type: 'success' });
      setUrl('');
    } catch (error) {
      console.error("Tracking error:", error);
      setFeedbackMessage({ message: 'Failed to track product.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="bg-brand-surface p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="productUrl"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter product URL to start tracking"
            className="w-full bg-brand-dark border border-brand-secondary rounded-md px-4 py-2 text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none"
          />
          <button
            onClick={handleTrackProduct}
            disabled={isLoading}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center w-full sm:w-auto"
          >
            {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : 'Track Product'}
          </button>
        </div>
        {feedbackMessage.message && (
          <p className={`mt-4 text-sm ${feedbackMessage.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {feedbackMessage.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;