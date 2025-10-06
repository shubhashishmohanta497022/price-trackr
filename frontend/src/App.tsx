import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Watchlist from './pages/Watchlist'
import AddProduct from './pages/AddProduct'
import Sales from './pages/Sales'
import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="sales" element={<Sales />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
