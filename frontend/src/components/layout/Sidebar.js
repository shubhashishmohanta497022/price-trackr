import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChartBarIcon, HeartIcon, PlusIcon, TagIcon, CogIcon, } from '@heroicons/react/24/outline';
const navigation = [
    { name: 'Dashboard', href: '/', icon: ChartBarIcon },
    { name: 'Watchlist', href: '/watchlist', icon: HeartIcon },
    { name: 'Add Product', href: '/add-product', icon: PlusIcon },
    { name: 'Sales', href: '/sales', icon: TagIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
];
const Sidebar = () => {
    const location = useLocation();
    return (_jsx("div", { className: "w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen", children: _jsx("nav", { className: "mt-8", children: _jsx("div", { className: "px-4", children: _jsx("ul", { className: "space-y-2", children: navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (_jsx("li", { children: _jsxs(Link, { to: item.href, className: `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}`, children: [_jsx(item.icon, { className: `mr-3 h-5 w-5 ${isActive
                                            ? 'text-primary-500'
                                            : 'text-gray-400 group-hover:text-gray-500'}` }), item.name] }) }, item.name));
                    }) }) }) }) }));
};
export default Sidebar;
//# sourceMappingURL=Sidebar.js.map