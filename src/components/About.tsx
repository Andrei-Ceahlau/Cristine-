import React, { useState, useEffect, useRef } from 'react';
import { Award, Clock, Heart, Users } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const features = [
    {
      icon: <Heart className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'Pasiune pentru Deserte',
      description: 'Fiecare produs este creat cu suflet, migală și ingrediente alese cu grijă'
    },
    {
      icon: <Award className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'Ingrediente Reale',
      description: 'Fără mixuri sau compromisuri. Doar ingrediente reale: ciocolată veritabilă, fructe proaspete, creme preparate în laboratorul nostru'
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'Tradiție din 2012',
      description: 'De la București la Suceava, păstrăm aceeași grijă, rafinament și atenție la detalii ca în prima zi'
    },
    {
      icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'Cristinele de Casă',
      description: 'Deserturi artizanale, torturi personalizate și candy baruri memorabile, create cu devotament'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Image side */}
          <div className={`relative order-2 lg:order-1 transition-all duration-600 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Cofetarul la lucru"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Overlay content */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-sm sm:text-base font-medium">
                    "Fiecare desert spune o poveste"
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-24 sm:h-24 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-rose-200 rounded-full opacity-20 animate-pulse animation-delay-200"></div>
          </div>

          {/* Content side */}
          <div className={`space-y-6 sm:space-y-8 order-1 lg:order-2 transition-all duration-600 delay-100 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div>
              {/* Header with Logo */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
                <img 
                  src="/logo/Cristine-Logo (1).jpg" 
                  alt="Cristine de casă" 
                  className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover shadow-lg flex-shrink-0"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 leading-tight">
                  Despre Cristina și „Cristine de casă"
                </h2>
              </div>

              {/* Story Content */}
              <div className="space-y-4 sm:space-y-5 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p className="text-amber-900 font-semibold text-base sm:text-lg">
                  Din „bucătăria dreptății", în laboratorul deserturilor cu suflet.
                </p>
                <p>
                  Povestea „Cristine de casă" începe în 2012, în București, odată cu o alegere curajoasă: 
                  am absolvit Facultatea de Drept, dar am simțit că adevărata mea chemare se afla într-o 
                  cu totul altă „bucătărie" – una cu arome dulci, blaturi fragede și creme fine.
                </p>
                <p>
                  Așa am renunțat la drumul previzibil al legii și am început să construiesc, cu pasiune 
                  și migală, un mic laborator de cofetărie artizanală, unde fiecare prăjitură avea o poveste, 
                  iar fiecare tort era creat cu grijă, de la zero.
                </p>
                <p>
                  Timp de 8 ani, pe strada Clucerului din București, am crescut pas cu pas, alături de 
                  clienții care ne-au devenit prieteni, colaboratori și chiar parte din familie. Însă, 
                  în 2020, am simțit că e momentul ca „Cristinele" să ajungă acolo unde le era locul de la 
                  început – acasă.
                </p>
                <p>
                  Nu le-am numit întâmplător „de casă". Numele a fost predestinat, pentru că în Suceava, 
                  orașul meu natal, am redeschis laboratorul într-un spațiu care respiră autenticitate, 
                  liniște și tradiție. Aici, din mâinile mele și ale echipei mele, iau naștere deserturi 
                  care păstrează aceeași grijă, rafinament și atenție la detalii ca în prima zi.
                </p>
                <p>
                  Astăzi, tot ce iese din atelierul nostru este gândit pentru a aduce bucurie: deserturi 
                  artizanale, torturi personalizate și candy baruri memorabile, create cu același devotament 
                  cu care am pornit la drum.
                </p>
                <p className="font-semibold text-amber-900 text-base sm:text-lg bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                  Bine ați venit în universul nostru dulce. Ne bucurăm că sunteți aici.
                </p>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-amber-100 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${200 + index * 50}ms` }}
                >
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-amber-100 to-orange-100 text-amber-900 rounded-lg shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
