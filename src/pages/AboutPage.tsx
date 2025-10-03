import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md shadow-lg bg-white/95 dark:bg-slate-900/95">
        {/* Top info bar */}
        <div className="py-2 text-sm bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
          <div className="container mx-auto px-4 flex justify-center items-center space-x-6 text-amber-700 dark:text-amber-400">
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
              <h1 className={`text-2xl md:text-3xl font-serif font-bold transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-amber-400 group-hover:text-amber-300' 
                  : 'text-amber-800 group-hover:text-amber-900'
              }`}>
                Cristine de casă
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                    : 'text-gray-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700/50'
                }`}
              >
                Acasă
              </Link>
              <Link
                to="/about"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'text-amber-400 bg-slate-800/60'
                    : 'text-amber-700 bg-amber-100/60'
                }`}
              >
                Despre noi
              </Link>
              <Link
                to="/shop"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                    : 'text-gray-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700/50'
                }`}
              >
                Magazin
              </Link>
              <Link
                to="/offers"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                    : 'text-gray-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700/50'
                }`}
              >
                Oferte
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                    : 'text-gray-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-700/50'
                }`}
              >
                Contact
              </Link>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl transition-all duration-200 ml-2 ${
                  isDarkMode
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:text-slate-300'
                }`}
                title={isDarkMode ? 'Trece la modul de zi' : 'Trece la modul de noapte'}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="pt-24">
        
        {/* Hero Section */}
        <section className={`py-16 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800' 
            : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-gray-800 dark:text-white">
                Povestea Cristine de casă
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-slate-300">
                Totul începe ca o joacă în laborator, printre ingrediente naturale și arome care spun povestea deserturilor noastre preferate.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section         className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Content */}
              <div className={`space-y-8 transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-800 dark:text-white">
                    Despre noi
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                    Totul începe ca o joacă în laborator, printre ingrediente naturale și arome care spun povestea deserturilor noastre preferate. Luăm o porție de inspirație, jumătate de kilogram de pasiune, punem multă bucurie în compoziție, după gust și vedem rezultatul… Dulce de tot!
                  </p>
                  <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
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
                    src="/imagini-prezentare/interior.jpeg"
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
        <section         className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Ingrediente naturale - Stil Mara Mura */}
              <div className={`transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-white mb-6">
                  Ingrediente naturale și produse premium
                </h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  Tot ce este natural și gustos intră în rețetele noastre. Doar se știe că ce e bun cu bun se face!
                </p>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  Ouăle provin din surse alese cu grijă, de la fermele din jurul Sucevei unde găinile cresc în sisteme cage-free (fără cuști).
                </p>
              </div>

              {/* Imagine centrală - Stil Mara Mura */}
              <div className={`relative transition-all duration-800 delay-200 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/imagini-prezentare/gradina 2.jpeg"
                    alt="Laboratorul Cristine"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* Atmosferă caldă - Stil Mara Mura */}
              <div className={`transition-all duration-800 delay-400 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-white mb-6">
                  Atmosferă caldă în note pastelate
                </h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  Clienții noștri sunt prietenii noștri, iar una dintre misiunile noastre este să le oferim locul perfect unde să se întâlnească.
                </p>
                
                <h4 className="text-xl font-serif font-bold text-gray-800 dark:text-white mb-4">
                  Noutăți în fiecare lună
                </h4>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  Diversitatea are o limită, se spune. Însă noi ne-am propus să ducem această limită cât mai departe, cu noutăți în meniu de fiecare dată când avem inspirație.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section         className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Image */}
              <div className={`relative transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-700 to-slate-600' 
                    : 'bg-gradient-to-br from-amber-100 to-orange-100'
                }`}>
                  <img
                    src="/imagini-prezentare/patroana .jpeg"
                    alt="Fondatoarea Cristine"
                    className="w-full h-96 lg:h-[700px] object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-8 transition-all duration-800 delay-200 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 dark:text-white mb-6">
                    Fondatoarea Cristine
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                    În spatele fiecărui desert perfect se află o poveste de pasiune și dedicare. Cristine, fondatoarea și sufletul "Cristine de casă", a transformat o iubire pentru deserturi într-o artă.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                    Cu o experiență bogată în cofetărie și o viziune clară asupra calității, Cristine a creat un spațiu unde fiecare prăjitură spune o poveste. De la primele rețete experimentale până la creațiile rafinate de astăzi, fiecare desert reflectă atenția la detalii și dragostea pentru ingrediente naturale.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                    "Fiecare desert este o bucată din sufletul meu" - aceasta este filosofia care ghidează tot ce face Cristine. Cu răbdare, migală și multă pasiune, ea continuă să inspire și să încântă cu creațiile sale unice.
                  </p>
                </div>

                <div className="rounded-2xl p-6 border-l-4 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-600">
                  <blockquote className="text-lg text-gray-700 dark:text-slate-200 italic">
                    "În fiecare desert pui o parte din tine. Și când îl vezi cum îl savurează cineva, știi că ai reușit să-i aduci bucurie."
                  </blockquote>
                  <cite className="font-semibold mt-2 block text-amber-700 dark:text-amber-400">- Cristine, Fondatoarea</cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section - Stil Mara Mura */}
        <section         className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 dark:text-white mb-6">
                Unde ne întâlnim
              </h2>
              <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
                Cristine de casă este acolo unde ești și tu: fie că ai nevoie de un loc liniștit în care să savurezi prăjitura preferată la o cafea aromată, fie că ai nevoie de un boost de bun și energie.
              </p>
            </div>

            {/* Single Location - Centered */}
            <div className="max-w-2xl mx-auto">
              <div className={`transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 dark:text-white mb-8">
                    Cristine de casă Suceava
                  </h3>
                  
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
                    <img
                      src="/imagini-prezentare/gradina.jpeg"
                      alt="Cristine de casă Suceava"
                      className="w-full h-80 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <a
                      href="https://maps.google.com/?q=47.648092,26.254195"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Google Maps
                    </a>
                    <a
                      href="mailto:comenzi@cofetariacristine.ro"
                      className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Contactează-ne
                    </a>
                  </div>
                  
                  <p className="text-gray-600 dark:text-slate-300 mt-6 text-lg">
                    comenzi@cofetariacristine.ro
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section         className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`transition-all duration-800 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 dark:text-white mb-6">
                Intră în lumea magică a Cristinei
              </h2>
              <p className="text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
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