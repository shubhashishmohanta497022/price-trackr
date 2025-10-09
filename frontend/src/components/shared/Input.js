import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import clsx from 'clsx';
const Input = forwardRef(({ className, label, error, helperText, ...props }, ref) => {
    const inputClasses = clsx('input', {
        'border-danger-500 focus:ring-danger-500': error,
    }, className);
    return (_jsxs("div", { children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: label })), _jsx("input", { className: inputClasses, ref: ref, ...props }), error && (_jsx("p", { className: "mt-1 text-sm text-danger-600", children: error })), helperText && !error && (_jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: helperText }))] }));
});
Input.displayName = 'Input';
export default Input;
//# sourceMappingURL=Input.js.map