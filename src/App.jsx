import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingUI from './components/FloatingUI';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Sale from './pages/Sale';
import Catalogue from './pages/Catalogue';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';

// Admin Routes
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Promotions from './pages/admin/Promotions';
import Customers from './pages/admin/Customers';
import Settings from './pages/admin/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.trackEvent) window.trackEvent('PageView');
  }, [pathname]);
  return null;
}

// Pages that hide the announcement bar (e.g., checkout, login, admin)
const HIDE_ANNOUNCEMENT = ['/checkout', '/login', '/admin'];

function Layout() {
  const { pathname } = useLocation();
  const hideAnnouncement = HIDE_ANNOUNCEMENT.some(path => pathname.startsWith(path));
  const isAdmin = pathname.startsWith('/admin');
  const isCheckout = pathname.startsWith('/checkout');

  return (
    <div className="app-container">
      {!hideAnnouncement && <AnnouncementBar />}
      {!isAdmin && !isCheckout && <Navbar />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && !isCheckout && <FloatingUI />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Layout />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
