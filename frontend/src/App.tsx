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
    <Routes>
      {/* This is a layout route. It renders the MainLayout component, which in turn
        will render any matching child routes inside its <Outlet />.
        This is how we get a persistent sidebar and header on every page.
      */}
      <Route path="/" element={<MainLayout />}>
        {/* The index route is the default page to show when the path is just "/". */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Define the route for each page in your application. */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="sales" element={<Sales />} />
        <Route path="settings" element={<Settings />} />

        {/* This is a catch-all route. If the user navigates to any path that
          doesn't match the ones defined above (e.g., /some-random-page),
          it will automatically redirect them back to the dashboard.
        */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

