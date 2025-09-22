import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, Award, Users, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-md shadow-lg">
        {/* Top info bar */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-2 text-sm">
          <div className="container mx-auto px-4 flex justify-center items-center space-x-6 text-amber-700">
            <div className="flex items-center space-x-2">
              <Phone className="h-3.5 w-3.5" />
              <span>0230 123 456</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>Suceava, Str. Stefan cel Mare nr. 15</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 cursor-pointer group transition-all duration-200 hover:scale-102">
              <img 
                src="/logo/Cristine-Logo (1).jpg" 
                alt="Cristine de casă" 
                className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-200"
              />
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-800 group-hover:text-amber-900 transition-colors duration-200">
                Cristine de casă
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-amber-700 hover:bg-amber-50"
              >
                Acasă
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-amber-700 bg-amber-100/60"
              >
                Despre noi
              </Link>
              <Link
                to="/shop"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-amber-700 hover:bg-amber-50"
              >
                Magazin
              </Link>
              <Link
                to="/offers"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-amber-700 hover:bg-amber-50"
              >
                Oferte
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-amber-700 hover:bg-amber-50"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="pt-24">
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6">
                Povestea Cristine de casă
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Totul începe ca o joacă în laborator, printre ingrediente naturale și arome care spun povestea deserturilor noastre preferate.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Content */}
              <div className={`space-y-8 transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
                    Despre noi
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Totul începe ca o joacă în laborator, printre ingrediente naturale și arome care spun povestea deserturilor noastre preferate. Luăm o porție de inspirație, jumătate de kilogram de pasiune, punem multă bucurie în compoziție, după gust și vedem rezultatul… Dulce de tot!
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Torturile ne ies cel mai bine. Sau poate tartele? Pavlova este preferata noastră, dar nici la choux nu putem renunța și de aici ne pierdem cu pofta, pentru că opțiuni avem pentru toate gusturile.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/shop"
                    className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Descoperă bunătățile Cristine
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className={`relative transition-all duration-800 delay-200 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                    alt="Laboratorul Cristine"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Stil Mara Mura */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Ingrediente naturale - Stil Mara Mura */}
              <div className={`transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Ingrediente naturale și produse premium
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Tot ce este natural și gustos intră în rețetele noastre. Doar se știe că ce e bun cu bun se face!
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Ouăle provin din surse alese cu grijă, de la fermele din jurul Sucevei unde găinile cresc în sisteme cage-free (fără cuști).
                </p>
              </div>

              {/* Imagine centrală - Stil Mara Mura */}
              <div className={`relative transition-all duration-800 delay-200 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    alt="Laboratorul Cristine"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* Atmosferă caldă - Stil Mara Mura */}
              <div className={`transition-all duration-800 delay-400 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Atmosferă caldă în note pastelate
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Clienții noștri sunt prietenii noștri, iar una dintre misiunile noastre este să le oferim locul perfect unde să se întâlnească.
                </p>
                
                <h4 className="text-xl font-serif font-bold text-gray-800 mb-4">
                  Noutăți în fiecare lună
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Diversitatea are o limită, se spune. Însă noi ne-am propus să ducem această limită cât mai departe, cu noutăți în meniu de fiecare dată când avem inspirație.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                Echipa Cristine de casă
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cristine de casă este despre oameni. Și fiecare om din echipa noastră aduce ceva din el în ceea ce înseamnă Cristine de casă: pasiune, prietenie, deschidere, bucurie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Cristina */}
              <div className={`text-center transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg">
                  <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">👩‍🍳</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Cristina</h3>
                  <p className="text-amber-600 font-semibold mb-4">The Problem Solver</p>
                  <p className="text-gray-600 text-sm">
                    Zâmbetul fiind mereu inclus în soluție.
                  </p>
                </div>
              </div>

              {/* Elena */}
              <div className={`text-center transition-all duration-800 delay-200 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 shadow-lg">
                  <div className="w-24 h-24 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Elena</h3>
                  <p className="text-rose-600 font-semibold mb-4">The Shy One</p>
                  <p className="text-gray-600 text-sm">
                    Dar întotdeauna cu un zâmbet în colțul buzelor.
                  </p>
                </div>
              </div>

              {/* Ionuț */}
              <div className={`text-center transition-all duration-800 delay-400 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg">
                  <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Ionuț</h3>
                  <p className="text-blue-600 font-semibold mb-4">Always on time</p>
                  <p className="text-gray-600 text-sm">
                    Și incredibil de organizat.
                  </p>
                </div>
              </div>

              {/* David */}
              <div className={`text-center transition-all duration-800 delay-600 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
                  <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">David</h3>
                  <p className="text-green-600 font-semibold mb-4">The Nice Guy</p>
                  <p className="text-gray-600 text-sm">
                    Îl găsești lângă tine fix când ai nevoie să comanzi ceva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section - Stil Mara Mura */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                Unde ne întâlnim
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cristine de casă este acolo unde ești și tu: fie că ai nevoie de un loc liniștit în care să savurezi prăjitura preferată la o cafea aromată, fie că ai nevoie de un boost de bun și energie.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Cristine de casă Suceava */}
              <div className={`transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                    Cristine de casă Suceava
                  </h3>
                  
                  <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
                    <img
                      src="https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                      alt="Cristine de casă Suceava"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <a
                      href="https://maps.google.com/?q=47.648092,26.254195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 w-full"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Deschide Google Maps
                    </a>
                    <a
                      href="mailto:comenzi@cofetariacristine.ro"
                      className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 w-full"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      comenzi@cofetariacristine.ro
                    </a>
                  </div>
                </div>
              </div>

              {/* Cristine de casă Centru */}
              <div className={`transition-all duration-800 delay-200 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                    Cristine de casă Centru
                  </h3>
                  
                  <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
                    <img
                      src="https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                      alt="Cristine de casă Centru"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <a
                      href="https://maps.google.com/?q=47.648092,26.254195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 w-full"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Deschide Google Maps
                    </a>
                    <a
                      href="mailto:centru@cofetariacristine.ro"
                      className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 w-full"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      centru@cofetariacristine.ro
                    </a>
                  </div>
                </div>
              </div>

              {/* Cristine de casă Mall */}
              <div className={`transition-all duration-800 delay-400 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                    Cristine de casă Mall
                  </h3>
                  
                  <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
                    <img
                      src="https://images.pexels.com/photos/2067402/pexels-photo-2067402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                      alt="Cristine de casă Mall"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <a
                      href="https://maps.google.com/?q=47.648092,26.254195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 w-full"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Deschide Google Maps
                    </a>
                    <a
                      href="mailto:mall@cofetariacristine.ro"
                      className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 w-full"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      mall@cofetariacristine.ro
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                Intră în lumea magică a Cristinei
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Descoperă bunătățile noastre și lasă-te sedus de aromele autentice ale Sucevei.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/shop"
                  className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Descoperă bunătățile Cristine
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Contactează-ne
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;