import React, { useState, useEffect } from 'react';
import { ArrowDown, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Hero Section - Stil Mara Mura */}
      <div className="relative h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: `url('/imagini-prezentare/exterior.jpeg')`
          }}
        >
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-slate-900/40 via-slate-800/20 to-slate-900/50'
              : 'bg-gradient-to-r from-amber-50/20 via-transparent to-amber-100/30'
          }`}></div>
      </div>

        {/* Content Layout - Stil Mara Mura */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left Side - Text Content */}
            <div className={`space-y-8 transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              {/* Logo */}
              <div className="flex items-center space-x-4">
            <img 
              src="/logo/Cristine-Logo (1).jpg" 
              alt="Cristine de casă" 
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover shadow-xl border-4 border-amber-200"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white">
                    Cristine de casă
                  </h1>
                  <p className="text-lg font-medium text-white">Deserturi artizanale din Suceava</p>
                </div>
              </div>

              {/* Main Title */}
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-white">
                  Tort Cipriani
                </h2>
                <p className="text-xl mt-4 text-white">
                  Comandă online
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link 
                  to="/shop"
                  className={`inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                    isDarkMode
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/25'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Descoperă
                </Link>
              </div>
            </div>

            {/* Right Side - Product Image */}
            <div className={`relative transition-all duration-800 delay-200 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                {/* Main Product Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={
                      isDarkMode 
                        ? "/imagini-prezentare/ChatGPT Image 2 oct. 2025, 15_16_44.png"
                        : "/imagini-prezentare/gradina.jpeg"
                    }
                    alt="Grădina Cristine de casă"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-200 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-rose-200 rounded-full opacity-60 animate-pulse animation-delay-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Scroll pentru mai mult</span>
            <ArrowDown className={`h-5 w-5 animate-bounce ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`} />
          </div>
        </div>
      </div>

      {/* Product Categories Grid - Stil Mara Mura */}
      <div className={`py-16 ${
        isDarkMode ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Torturi Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-br from-amber-100 to-orange-100">
                <img
                  src="/imagini-prezentare/tort talent.jpeg"
                  alt="Torturi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Torturi</h3>
                <p className="text-white/90 mb-4">Comandă online</p>
                <Link 
                  to="/shop"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Descoperă
                </Link>
              </div>
            </div>

            {/* Choux Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-br from-rose-100 to-pink-100">
                <img
                  src="/imagini-prezentare/a3a.jpeg"
                  alt="Choux"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Choux</h3>
                <p className="text-white/90 mb-4">Comandă online</p>
                <Link 
                  to="/shop"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Descoperă
                </Link>
              </div>
            </div>

            {/* Tarte Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-br from-blue-100 to-cyan-100">
                <img
                  src="/imagini-prezentare/a4a.jpeg"
                  alt="Tarte"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Tarte</h3>
                <p className="text-white/90 mb-4">Comandă online</p>
                <Link 
                  to="/shop"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Descoperă
                </Link>
              </div>
            </div>

            {/* Prăjituri clasice Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-br from-green-100 to-emerald-100">
                <img
                  src="/imagini-prezentare/a5a.jpeg"
                  alt="Prăjituri clasice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Prăjituri clasice</h3>
                <p className="text-white/90 mb-4">Comandă online</p>
                <Link 
                  to="/shop"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Descoperă
                </Link>
              </div>
            </div>

            {/* Specialități Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-br from-purple-100 to-violet-100">
                <img
                  src="/imagini-prezentare/a 2 a.jpeg"
                  alt="Specialități"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Specialități</h3>
                <p className="text-white/90 mb-4">Comandă online</p>
          <Link 
            to="/shop"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
          >
                  Descoperă
          </Link>
        </div>
      </div>

            {/* Sugar Free Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-br from-teal-100 to-cyan-100">
                <img
                  src="/imagini-prezentare/WhatsApp Image 2025-09-26 at 12.35.30.jpeg"
                  alt="Sugar Free"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Sugar Free</h3>
                <p className="text-white/90 mb-4">Comandă online</p>
                <Link 
                  to="/shop"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Descoperă
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;