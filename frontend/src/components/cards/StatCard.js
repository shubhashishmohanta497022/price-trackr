import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const StatCard = ({ title, value, change, icon, color = 'primary' }) => {
    const colorClasses = {
        primary: 'bg-primary-50 text-primary-600 border-primary-200',
        success: 'bg-success-50 text-success-600 border-success-200',
        warning: 'bg-warning-50 text-warning-600 border-warning-200',
        danger: 'bg-danger-50 text-danger-600 border-danger-200',
    };
    return (_jsx("div", { className: "card p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: title }), _jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white mt-1", children: value }), change !== undefined && (_jsxs("p", { className: `text-sm mt-2 ${change >= 0 ? 'text-success-600' : 'text-danger-600'}`, children: [change >= 0 ? '+' : '', change, "%"] }))] }), icon && (_jsx("div", { className: `p-3 rounded-lg ${colorClasses[color]}`, children: icon }))] }) }));
};
export default StatCard;
//# sourceMappingURL=StatCard.js.map