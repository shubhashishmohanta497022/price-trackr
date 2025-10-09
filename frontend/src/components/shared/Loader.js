import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import clsx from 'clsx';
export const Loader = ({ className, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };
    return (_jsx("div", { className: clsx('animate-spin rounded-full border-2 border-gray-300 border-t-primary-600', sizeClasses[size], className) }));
};
const LoadingSpinner = ({ message }) => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [_jsx(Loader, { size: "lg" }), message && (_jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-400", children: message }))] }));
};
export default LoadingSpinner;
//# sourceMappingURL=Loader.js.map