import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
const MainLayout = () => {
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: [_jsx(Header, {}), _jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 min-w-0", children: _jsx("div", { className: "p-6", children: _jsx(Outlet, {}) }) })] }), _jsx(Footer, {})] }));
};
export default MainLayout;
//# sourceMappingURL=MainLayout.js.map