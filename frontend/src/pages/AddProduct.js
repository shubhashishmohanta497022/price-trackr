import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        }
        catch (error) {
            console.error("Tracking error:", error);
            setFeedback({ message: 'Failed to track product. The URL might be unsupported or an error occurred.', type: 'error' });
        }
        finally {
            setIsLoading(false);
        }
    };
    // ... (JSX remains the same) ...
    return (_jsx("div", { className: "p-6 md:p-8 space-y-8", children: _jsx("div", { className: "bg-brand-surface p-6 rounded-lg", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [_jsx("input", { id: "productUrl", type: "url", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("button", { onClick: handleTrackProduct, disabled: isLoading, children: isLoading ? _jsx(LoaderCircle, { size: 20, className: "animate-spin" }) : 'Save' })] }) }) }));
};
export default AddProduct;
//# sourceMappingURL=AddProduct.js.map