import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useCart } from '../services/CartContext';
import { useAuth } from '../services/AuthContext';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  
  // Navbar bg: Solid if scrolled OR not on homepage
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
  }`;

  const textColor = isScrolled || !isHome ? 'text-lux-black' : 'text-lux-black lg:text-white';

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className={`font-serif text-2xl font-bold tracking-tight ${textColor} z-50 relative`}>
          LuxReborn
        </Link>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 ${textColor}`}>
          <Link to="/marketplace" className="text-sm font-medium tracking-wide hover:text-lux-gold transition-colors">SHOP</Link>
          <Link to="/marketplace?category=Bags" className="text-sm font-medium tracking-wide hover:text-lux-gold transition-colors">BAGS</Link>
          <Link to="/marketplace?category=Watches" className="text-sm font-medium tracking-wide hover:text-lux-gold transition-colors">WATCHES</Link>
          <Link to="/marketplace?category=Sneakers" className="text-sm font-medium tracking-wide hover:text-lux-gold transition-colors">SNEAKERS</Link>
        </div>

        {/* Icons */}
        <div className={`hidden md:flex items-center gap-6 ${textColor}`}>
          <button onClick={() => navigate('/marketplace')} className="hover:text-lux-gold transition-colors">
            <Search size={20} />
          </button>
          
          {isAuthenticated ? (
             <div className="group relative">
               <button className="hover:text-lux-gold transition-colors">
                  <UserIcon size={20} />
               </button>
               <div className="absolute right-0 top-full mt-2 w-32 bg-white text-black shadow-lg rounded p-2 hidden group-hover:block border border-gray-100">
                  <button onClick={logout} className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-50 text-left">
                    <LogOut size={14}/> Logout
                  </button>
               </div>
             </div>
          ) : (
            <Link to="/auth" className="text-sm font-medium hover:text-lux-gold">Login</Link>
          )}

          <button onClick={toggleCart} className="relative hover:text-lux-gold transition-colors group">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-lux-gold text-lux-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
           <button onClick={toggleCart} className={`relative ${textColor}`}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-lux-gold text-lux-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={textColor}>
            {isMobileMenuOpen ? <X size={24} className="text-lux-black" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center gap-8 animate-fade-in md:hidden">
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/marketplace" className="font-serif text-3xl text-lux-black hover:text-lux-gold">Shop All</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/marketplace?category=Bags" className="font-serif text-3xl text-lux-black hover:text-lux-gold">Bags</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/marketplace?category=Watches" className="font-serif text-3xl text-lux-black hover:text-lux-gold">Watches</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/marketplace?category=Sneakers" className="font-serif text-3xl text-lux-black hover:text-lux-gold">Sneakers</Link>
          
          <div className="mt-8 flex flex-col gap-4 w-64">
             {isAuthenticated ? (
                <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="outline" fullWidth>Logout</Button>
             ) : (
                <Button onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }} variant="primary" fullWidth>Login / Signup</Button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;