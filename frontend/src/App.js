import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
// Import the main layout component that provides the consistent shell (sidebar, header).
import MainLayout from '@/layouts/MainLayout';
// Import all the page components that will be rendered for different routes.
import Dashboard from '@/pages/Dashboard';
import Watchlist from '@/pages/Watchlist';
import AddProduct from '@/pages/AddProduct';
import Sales from '@/pages/Sales';
import Settings from '@/pages/Settings';
function App() {
    return (
    // The Routes component is the main router that looks at the current URL
    // and decides which Route to render.
    _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "watchlist", element: _jsx(Watchlist, {}) }), _jsx(Route, { path: "add", element: _jsx(AddProduct, {}) }), _jsx(Route, { path: "sales", element: _jsx(Sales, {}) }), _jsx(Route, { path: "settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map