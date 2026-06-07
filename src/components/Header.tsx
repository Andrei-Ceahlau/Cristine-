import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, ShoppingCart, Facebook, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const leftMenu = [
    { name: 'Acasă', path: '/' },
    { name: 'Despre Noi', path: '/about' },
    { name: 'Produse', path: '/shop' },
  ];

  const rightMenu = [
    { name: 'Galerie', path: '/gallery/torturi' },
    { name: 'Contact', path: '/contact' },
  ];

  const linkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-[15px] tracking-wide transition-colors ${
      isActive ? 'text-[#8b6f47] font-semibold' : 'text-[#5c4033] hover:text-[#8b6f47]'
    }`;
  };

  return (
    <header className="fixed top-0 w-full z-50">
      {/* TOP BAR */}
      <div className="bg-[#8b7355] text-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>0230 123 456</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>Suceava, Str. Ștefan cel Mare nr. 15</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="bg-white border-b border-[#e8dfd4] shadow-sm">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="relative flex items-center justify-between h-24 sm:h-28">
            <nav className="hidden md:flex items-center gap-6 lg:gap-10">
              {leftMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={linkClass(item.path)}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img
                src="/logo/cristine-logo-new.png"
                alt="Cristine de casă"
                className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-full"
              />
            </Link>

            <div className="flex items-center gap-2">
              <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                {rightMenu.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={linkClass(item.path)}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/cart" className="relative text-[#5c4033] hover:text-[#8b6f47] transition-colors ml-2">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#8b7355] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </nav>

              <button
                className="md:hidden p-2 text-[#5c4033]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden bg-white border-b border-[#e8dfd4] overflow-hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="container mx-auto px-4 py-4 space-y-3">
          {[...leftMenu, ...rightMenu].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block py-2 ${linkClass(item.path)}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className="flex items-center justify-between py-2 text-[#5c4033]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span style={{ fontFamily: "'Playfair Display', serif" }}>Coș cumpărături</span>
            {getTotalItems() > 0 && (
              <span className="bg-[#8b7355] text-white text-xs rounded-full px-2 py-0.5 font-bold">
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
