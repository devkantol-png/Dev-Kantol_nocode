import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './services/CartContext';
import { AuthProvider } from './services/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Footer component
const Footer = () => (
  <footer className="bg-lux-black text-white py-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div>
        <h3 className="font-serif text-2xl font-bold mb-6">LuxReborn</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          The premier destination for authenticated luxury fashion. We bring the world's most coveted items directly to your doorstep.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><a href="#" className="hover:text-lux-gold transition-colors">New Arrivals</a></li>
          <li><a href="#" className="hover:text-lux-gold transition-colors">Bags</a></li>
          <li><a href="#" className="hover:text-lux-gold transition-colors">Watches</a></li>
          <li><a href="#" className="hover:text-lux-gold transition-colors">Sneakers</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><a href="#" className="hover:text-lux-gold transition-colors">Authentication</a></li>
          <li><a href="#" className="hover:text-lux-gold transition-colors">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-lux-gold transition-colors">FAQ</a></li>
          <li><a href="#" className="hover:text-lux-gold transition-colors">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Stay Connected</h4>
        <div className="flex items-center">
            <input type="email" placeholder="Enter email" className="bg-lux-dark border-none px-4 py-2 text-sm w-full focus:ring-1 ring-lux-gold outline-none" />
            <button className="bg-lux-gold text-lux-black px-4 py-2 text-sm font-medium hover:bg-lux-goldDark transition-colors">Join</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
      <p>&copy; 2024 LuxReborn. All rights reserved.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <CartDrawer />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/listing/:id" element={<ProductDetail />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Mobile Floating View Cart Button (only visible if items in cart) */}
            <MobileCartButton />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

// Helper for mobile floating button
const MobileCartButton = () => {
  const { cartCount, toggleCart } = useCart();
  
  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
      <button 
        onClick={toggleCart}
        className="w-full bg-lux-black text-white py-4 px-6 shadow-2xl flex items-center justify-between font-medium text-sm rounded-none hover:bg-lux-dark active:scale-95 transition-all"
      >
        <span>View Cart</span>
        <span className="bg-lux-gold text-lux-black w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">{cartCount}</span>
      </button>
    </div>
  )
}

export default App;