import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const menuItems = [
    { name: 'Acasă', path: '/' },
    { name: 'Despre Noi', path: '/about' },
    { name: 'Produse', path: '/shop' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#ede2e0]">
      {/* TOP BAR - Telefon și Adresă */}
      <div className="bg-[#ede2e0] border-b border-amber-200/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center items-center space-x-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-amber-900">
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">0230 123 456</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-amber-900">
              <MapPin className="h-3.5 w-3.5" />
              <span className="font-medium">Suceava, Str. Ștefan cel Mare nr. 15</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER - Logo Stânga, Meniu Dreapta */}
      <div className="bg-[#ede2e0] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* LOGO - STÂNGA */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo/Cristine-Logo (1).jpg" 
                alt="Cristine de casă" 
                className="h-14 w-14 rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow"
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 group-hover:text-amber-900 transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Cristine de casă
              </h1>
            </Link>

            {/* MENIU - DREAPTA (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-base font-medium transition-colors ${
                      isActive
                        ? 'text-amber-900 font-semibold'
                        : 'text-gray-700 hover:text-amber-900'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: isActive ? 600 : 500 }}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Cart Icon */}
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-700 hover:text-amber-900 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-amber-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden bg-[#ede2e0] border-t border-amber-200/30 overflow-hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="container mx-auto px-4 py-4 space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-gray-700 hover:bg-amber-50 hover:text-amber-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          
          {/* Mobile Cart */}
          <Link
            to="/cart"
            className="flex items-center justify-between px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Coș cumpărături</span>
            {getTotalItems() > 0 && (
              <span className="bg-amber-600 text-white text-xs rounded-full px-2 py-1 font-bold">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
