import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';
const Header = () => {
    const { theme, toggleTheme } = useTheme();
    return (_jsx("header", { className: "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-sm", children: "PT" }) }), _jsx("span", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Price Trackr" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("button", { onClick: toggleTheme, className: "p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors", children: theme === 'dark' ? (_jsx(SunIcon, { className: "w-5 h-5" })) : (_jsx(MoonIcon, { className: "w-5 h-5" })) }), _jsxs("button", { className: "p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors relative", children: [_jsx(BellIcon, { className: "w-5 h-5" }), _jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center", children: "3" })] }), _jsx("button", { className: "p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors", children: _jsx(UserCircleIcon, { className: "w-6 h-6" }) })] })] }) }) }));
};
export default Header;
//# sourceMappingURL=Header.js.map