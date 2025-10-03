import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, User, ShoppingCart, Settings, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Auth from './Auth';
import AdminDashboard from './AdminDashboard';
import { useDarkMode } from '../contexts/DarkModeContext';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Acasă', href: '#home', path: '/' },
    { name: 'Despre noi', href: '#about', path: '/about' },
    { name: 'Magazin', href: '#shop', path: '/shop' },
    { name: 'Oferte', href: '#offers', path: '/offers' },
    { name: 'Contact', href: '#contact', path: '/contact' }
  ];

  // Determine if we need a background based on current page
  // const needsBackground = isScrolled || location.pathname !== '/';
  
  return (
    // STILUL GLASS - DACĂ VREI SĂ ÎNCERCI DIN NOU:
    // <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
    //   isScrolled 
    //     ? 'glass-navbar' 
    //     : 'glass-navbar opacity-95'
    // }`}>
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-slate-900/90 backdrop-blur-2xl backdrop-saturate-200 shadow-[0_2px_16px_rgba(0,0,0,0.4)]' 
          : 'bg-[#ede2e0]/90 backdrop-blur-2xl backdrop-saturate-200 shadow-[0_2px_16px_rgba(237,226,224,0.4)]'
        : isDarkMode
          ? 'bg-gradient-to-b from-slate-900/70 to-transparent backdrop-blur-md'
          : 'bg-gradient-to-b from-[#ede2e0]/70 to-transparent backdrop-blur-md'
    }`}>
      {/* Top info bar cu glass effect */}
      {/* STILUL GLASS PENTRU TOP BAR - DACĂ VREI SĂ ÎNCERCI DIN NOU:
      <div className={`transition-all duration-500 ${
        isScrolled 
          ? 'h-0 opacity-0 overflow-hidden' 
          : 'h-auto opacity-100 glass-navbar'
      }`}>
      */}
      <div className={`transition-all duration-500 ${
        isScrolled 
          ? 'h-0 opacity-0 overflow-hidden' 
          : isDarkMode
            ? 'h-auto opacity-100 bg-gradient-to-r from-slate-800/30 to-slate-800/20 backdrop-blur-xl'
            : 'h-auto opacity-100 bg-gradient-to-r from-[#ede2e0]/30 to-[#ede2e0]/20 backdrop-blur-xl'
      }`}>
        <div className="py-2 text-sm">
          <div className="container mx-auto px-4 flex justify-center items-center space-x-6">
            <div className={`flex items-center space-x-2 font-medium ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}>
              <Phone className="h-3.5 w-3.5" />
              <span>0230 123 456</span>
            </div>
            <div className={`flex items-center space-x-2 font-medium ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}>
              <MapPin className="h-3.5 w-3.5" />
              <span>Suceava, Str. Stefan cel Mare nr. 15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation cu glass morphism */}
      <nav className="relative">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Clickable pentru home */}
            <Link to="/" className="flex items-center space-x-4 cursor-pointer group transition-all duration-200 hover:scale-102">
              <img 
                src="/logo/Cristine-Logo (1).jpg" 
                alt="Cristine de casă" 
                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-200"
              />
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-bold transition-all duration-200 group-hover:scale-102 ${
                isScrolled 
                  ? isDarkMode
                    ? 'text-amber-400 group-hover:text-amber-300'
                    : 'text-amber-700 group-hover:text-amber-800'
                  : isDarkMode
                    ? 'text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-amber-300'
                    : 'text-amber-600 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] group-hover:text-amber-700'
              }`}>
                Cristine de casă
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isScrolled
                          ? isDarkMode
                            ? 'text-amber-400 bg-amber-900/60'
                            : 'text-amber-700 bg-amber-100/60'
                          : isDarkMode
                            ? 'text-amber-400 bg-slate-800/30'
                            : 'text-amber-600 bg-[#ede2e0]/30'
                        : isScrolled
                          ? isDarkMode
                            ? 'text-amber-500 hover:text-amber-300 hover:bg-slate-800/40'
                            : 'text-amber-500 hover:text-amber-700 hover:bg-[#ede2e0]/40'
                          : isDarkMode
                            ? 'text-amber-500 hover:text-amber-400 hover:bg-slate-800/20'
                            : 'text-amber-500 hover:text-amber-600 hover:bg-[#ede2e0]/20'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ede2e0]/30 to-[#ede2e0]/20 blur-xl" />
                    )}
                  </Link>
                );
              })}
            

              
              {/* Divider */}
              <div className={`w-px h-6 mx-2 ${
                isScrolled 
                  ? isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
                  : isDarkMode ? 'bg-slate-700/40' : 'bg-[#ede2e0]/40'
              }`} />
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isScrolled 
                    ? isDarkMode
                      ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/60'
                      : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50/60'
                    : isDarkMode
                      ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/20'
                      : 'text-amber-500 hover:text-amber-600 hover:bg-[#ede2e0]/20'
                }`}
                title={isDarkMode ? 'Trece la modul de zi' : 'Trece la modul de noapte'}
              >
                {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                {isLoggedIn ? (
                  <>
                    <button className={`p-2.5 rounded-xl transition-all duration-200 ${
                      isScrolled 
                        ? isDarkMode
                          ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/60'
                          : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50/60'
                        : isDarkMode
                          ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/20'
                          : 'text-amber-500 hover:text-amber-600 hover:bg-[#ede2e0]/20'
                    }`}>
                      <ShoppingCart className="h-4.5 w-4.5" />
                    </button>
                    <button className={`p-2.5 rounded-xl transition-all duration-200 ${
                      isScrolled 
                        ? isDarkMode
                          ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/60'
                          : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50/60'
                        : isDarkMode
                          ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/20'
                          : 'text-amber-500 hover:text-amber-600 hover:bg-[#ede2e0]/20'
                    }`}>
                      <User className="h-4.5 w-4.5" />
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => setShowAdminDashboard(true)}
                        className={`p-2.5 rounded-xl transition-all duration-200 ${
                          isScrolled 
                            ? isDarkMode
                              ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/60'
                              : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50/60'
                            : isDarkMode
                              ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/20'
                              : 'text-amber-500 hover:text-amber-600 hover:bg-[#ede2e0]/20'
                        }`}
                        title="Dashboard Admin"
                      >
                        <Settings className="h-4.5 w-4.5" />
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-102 ${
                      isScrolled
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30'
                        : isDarkMode
                          ? 'bg-slate-800/30 text-amber-400 backdrop-blur-xl border border-amber-500/50 hover:bg-slate-700/50'
                          : 'bg-[#ede2e0]/30 text-amber-600 backdrop-blur-xl border border-amber-300/50 hover:bg-amber-100/50'
                    }`}
                  >
                    Conectare
                  </button>
                )}
            </div>
          </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                isScrolled 
                  ? isDarkMode
                    ? 'text-amber-400 hover:bg-slate-800/60'
                    : 'text-amber-600 hover:bg-amber-100'
                  : isDarkMode
                    ? 'text-amber-400 hover:bg-slate-800/20'
                    : 'text-amber-500 hover:bg-[#ede2e0]/20'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu cu glass effect */}
        <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'max-h-[500px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          {/* STILUL GLASS PENTRU MOBILE MENU - DACĂ VREI SĂ ÎNCERCI DIN NOU:
          <div className="glass-mobile border-t border-white/20 shadow-2xl">
          */}
          <div className={`backdrop-blur-2xl backdrop-saturate-200 border-t shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-900/95 border-slate-700/30' 
              : 'bg-[#ede2e0]/95 border-[#ede2e0]/30'
          }`}>
            <div className="py-4 px-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-slate-800/40 to-slate-800/30 text-amber-400 backdrop-blur-xl'
                          : 'bg-gradient-to-r from-[#ede2e0]/40 to-[#ede2e0]/30 text-gray-800 backdrop-blur-xl'
                        : isDarkMode
                          ? 'text-slate-300 hover:bg-slate-800/30 hover:text-amber-400'
                          : 'text-gray-600 hover:bg-[#ede2e0]/30 hover:text-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={toggleDarkMode}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'text-amber-400 hover:bg-slate-800/30'
                    : 'text-amber-600 hover:bg-[#ede2e0]/30'
                }`}
              >
                {isDarkMode ? '☀️ Modul de zi' : '🌙 Modul de noapte'}
              </button>
              
              {/* Mobile Auth Button */}
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-200"
                >
                  Conectare
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Backdrop blur pentru mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Auth Modal */}
      {showAuth && (
        <Auth 
          onClose={() => setShowAuth(false)} 
          onLogin={(isAdmin) => {
            setIsLoggedIn(true);
            setIsAdmin(isAdmin);
          }}
        />
      )}
      
      {/* Admin Dashboard */}
      {showAdminDashboard && (
        <AdminDashboard onClose={() => setShowAdminDashboard(false)} />
      )}
    </header>
  );
};

export default Header;