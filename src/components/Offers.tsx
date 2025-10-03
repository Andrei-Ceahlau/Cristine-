import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Gift, Star, Sparkles, Clock, Heart, ShoppingCart } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Offers: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const { isDarkMode } = useDarkMode();

  const offers = [
    {
      id: 1,
      title: 'Oferta de Crăciun',
      subtitle: 'Colecția Sărbătorilor',
      description: 'Deserte speciale pentru masa de Crăciun: cozonaci artizanali, turtă dulce decorativă și torturi tematice. Perfecte pentru sărbători memorabile!',
      image: 'https://images.pexels.com/photos/1303823/pexels-photo-1303823.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
      discount: '20%',
      validUntil: '25 Decembrie 2024',
      badge: 'Sezon Limitat',
      color: 'from-red-500 to-green-500',
      bgColor: 'from-red-50 to-green-50',
      icon: '🎄'
    },
    {
      id: 2,
      title: 'Pachet Evenimente',
      subtitle: 'Pentru Zile Speciale',
      description: 'Meniuri complete pentru nunți, botezuri și aniversări - torturi personalizate și deserturi asortate. Sărbătorim împreună!',
      image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
      discount: '15%',
      validUntil: '31 Martie 2025',
      badge: 'Cea Mai Populară',
      color: 'from-pink-500 to-purple-500',
      bgColor: 'from-pink-50 to-purple-50',
      icon: '💒'
    },
    {
      id: 3,
      title: 'Weekend Sweet Box',
      subtitle: 'Răsfăț pentru Acasă',
      description: 'Cutie cu selecție de prăjituri fine și macarons - perfectă pentru petreceri intime sau cadouri. Dulceața weekendului!',
      image: 'https://images.pexels.com/photos/2067402/pexels-photo-2067402.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
      discount: '10%',
      validUntil: 'Doar weekendurile',
      badge: 'Weekend Special',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      icon: '🎁'
    },
    {
      id: 4,
      title: 'Oferta Studenți',
      subtitle: 'Pentru Tinerii cu Poftă',
      description: 'Deserte delicioase la prețuri accesibile pentru studenți. Perfect pentru sesiuni de studiu sau petreceri cu prietenii!',
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
      discount: '25%',
      validUntil: '30 Iunie 2025',
      badge: 'Student Special',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      icon: '🎓'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section ref={sectionRef} id="offers" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className={`text-center transition-all duration-800 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-4 shadow-lg">
                <Sparkles className="h-12 w-12 text-amber-600" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-800 mb-6">
            Oferte Speciale
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descoperiți ofertele noastre sezoniere și promoțiile exclusive pentru 
            evenimente speciale și sărbători. Fiecare ofertă este creată cu grijă pentru voi!
          </p>
        </div>
      </div>

      {/* Main Offers Slider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative max-w-7xl mx-auto">
          <div 
            className="relative overflow-hidden rounded-3xl shadow-2xl group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {offers.map((offer, index) => (
                <div key={offer.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
                    
                    {/* Image Side */}
                    <div className="relative overflow-hidden order-2 lg:order-1">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent"></div>
                      
                      {/* Floating Badges */}
                      <div className="absolute top-6 left-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                        <Gift className="h-4 w-4" />
                        <span>{offer.badge}</span>
                      </div>

                      <div className="absolute top-6 right-6 bg-gradient-to-br from-red-500 to-pink-500 text-white text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-pulse">
                        -{offer.discount}
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute bottom-6 left-6 w-8 h-8 bg-amber-400/20 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 right-8 w-6 h-6 bg-orange-400/20 rounded-full animate-pulse animation-delay-200"></div>
                    </div>

                    {/* Content Side */}
                    <div className={`bg-gradient-to-br ${offer.bgColor} p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2 relative`}>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="text-4xl">{offer.icon}</span>
                            <div>
                              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-800 leading-tight">
                                {offer.title}
                              </h3>
                              <h4 className="text-xl lg:text-2xl text-amber-600 font-semibold">
                                {offer.subtitle}
                              </h4>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-lg">
                          {offer.description}
                        </p>

                        <div className="flex items-center space-x-3 text-gray-500">
                          <Calendar className="h-5 w-5" />
                          <span>Valabil până la: {offer.validUntil}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button className="group relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center">
                              <ShoppingCart className="h-5 w-5 mr-2" />
                              Comandă Acum
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </button>
                          <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                            <Heart className="h-5 w-5 mr-2" />
                            Află Mai Multe
                          </button>
                        </div>
                      </div>

                      {/* Background Decoration */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${offer.color} opacity-5 rounded-full -translate-y-16 translate-x-16`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Slide următor"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white shadow-lg scale-125'
                    : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                }`}
                aria-label={`Mergi la slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Offers Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-800 delay-400 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
            Alte Oferte Speciale
          </h3>
          <p className="text-lg text-gray-600">
            Descoperă mai multe opțiuni delicioase pentru fiecare ocazie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Special Offer Cards */}
          {[
            {
              title: 'Oferta de Aniversare',
              description: 'Tort personalizat cu 15% reducere',
              icon: '🎂',
              color: 'from-pink-500 to-rose-500',
              bgColor: 'from-pink-50 to-rose-50'
            },
            {
              title: 'Pachet Corporate',
              description: 'Deserte pentru evenimente de business',
              icon: '💼',
              color: 'from-blue-500 to-indigo-500',
              bgColor: 'from-blue-50 to-indigo-50'
            },
            {
              title: 'Oferta de Vara',
              description: 'Deserte răcoritoare cu 20% reducere',
              icon: '☀️',
              color: 'from-yellow-500 to-orange-500',
              bgColor: 'from-yellow-50 to-orange-50'
            }
          ].map((offer, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br ${offer.bgColor}`}
            >
              <div className="p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">{offer.icon}</div>
                  <h4 className="text-xl font-serif font-bold text-gray-800 mb-3">
                    {offer.title}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {offer.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Vezi Detalii
                  </button>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className={`text-center bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-12 text-white transition-all duration-800 delay-600 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-3xl font-serif font-bold mb-4">
            Nu rata nicio ofertă specială!
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Abonează-te la newsletter-ul nostru și primește oferte exclusive direct în inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Adresa ta de email"
              className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
              Abonează-te
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;