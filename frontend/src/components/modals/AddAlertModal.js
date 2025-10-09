import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../shared/Button';
import Input from '../shared/Input';
const AddAlertModal = ({ isOpen, onClose, productId, currentPrice, }) => {
    const [targetPrice, setTargetPrice] = useState(currentPrice.toString());
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Here you would call the API to create the alert
            console.log('Creating alert:', { productId, targetPrice, email });
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            onClose();
        }
        catch (error) {
            console.error('Error creating alert:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex min-h-screen items-center justify-center p-4", children: [_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-25", onClick: onClose }), _jsxs("div", { className: "relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Set Price Alert" }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300", children: _jsx(XMarkIcon, { className: "w-6 h-6" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Target Price" }), _jsx(Input, { type: "number", value: targetPrice, onChange: (e) => setTargetPrice(e.target.value), placeholder: "Enter target price", step: "0.01", min: "0", required: true }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: ["Current price: \u20B9", currentPrice] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Email (optional)" }), _jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your@email.com" }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Leave empty to use your account email" })] }), _jsxs("div", { className: "flex space-x-3 pt-4", children: [_jsx(Button, { type: "button", variant: "secondary", onClick: onClose, disabled: isLoading, className: "flex-1", children: "Cancel" }), _jsx(Button, { type: "submit", variant: "primary", loading: isLoading, className: "flex-1", children: "Create Alert" })] })] })] })] }) }));
};
export default AddAlertModal;
//# sourceMappingURL=AddAlertModal.js.map