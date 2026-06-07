import React, { useState, useEffect } from 'react';
import { MapPin, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          </div>
        </section>

        {/* Story Section */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
              
              {/* Text Content */}
              <div className={`space-y-6 transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
                    Despre noi
                  </h2>
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

        {/* Founder Image Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className={`relative transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100">
                  <img
                    src="/imagini-prezentare/patroana .jpeg"
                    alt="Fondatoarea Cristine"
                    className="w-full h-96 lg:h-[700px] object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
            </div>

            {/* Single Location - Centered */}
            <div className="max-w-2xl mx-auto">
              <div className={`transition-all duration-800 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center">
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
                      className="inline-flex items-center justify-center bg-[#8b4513] hover:bg-[#70340f] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Google Maps
                    </a>
                    <a
                      href="mailto:comenzi@cofetariacristine.ro"
                      className="inline-flex items-center justify-center bg-[#8b4513] hover:bg-[#70340f] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Contactează-ne
                    </a>
                  </div>
                  
                  <p className="text-gray-600 mt-6 text-lg">
                    comenzi@cofetariacristine.ro
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

    </div>
  );
};

export default AboutPage;