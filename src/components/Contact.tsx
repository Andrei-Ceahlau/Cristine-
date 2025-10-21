import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
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

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: 'Adresa',
      content: (
        <div>
          <p className="text-white">
            Strada Ștefan cel Mare nr. 15<br />
            Suceava, Județul Suceava<br />
            720224, România
          </p>
        </div>
      )
    },
    {
      icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: 'Telefon',
      content: (
        <div className="space-y-1">
          <p className="text-white">
            <a href="tel:+40230123456" className="hover:text-amber-300 transition-colors duration-200">
              +40 230 123 456
            </a>
          </p>
          <p className="text-white">
            <a href="tel:+40742123456" className="hover:text-amber-300 transition-colors duration-200">
              +40 742 123 456
            </a>
          </p>
        </div>
      )
    },
    {
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: 'Email',
      content: (
        <div className="space-y-1">
          <p className="text-white">
            <a href="mailto:comenzi@cofetariacristine.ro" className="hover:text-amber-300 transition-colors duration-200 break-all">
              comenzi@cofetariacristine.ro
            </a>
          </p>
          <p className="text-white">
            <a href="mailto:info@cofetariacristine.ro" className="hover:text-amber-300 transition-colors duration-200 break-all">
              info@cofetariacristine.ro
            </a>
          </p>
        </div>
      )
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: 'Program de Lucru',
      content: (
        <div className="space-y-1 text-white text-sm">
          <div className="flex justify-between">
            <span>Luni - Vineri:</span>
            <span className="font-semibold text-amber-300">08:00 - 20:00</span>
          </div>
          <div className="flex justify-between">
            <span>Sâmbătă:</span>
            <span className="font-semibold text-amber-300">08:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span>Duminică:</span>
            <span className="font-semibold text-amber-300">09:00 - 16:00</span>
          </div>
        </div>
      )
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "#",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      label: "Facebook"
    },
    {
      icon: <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "#",
      bgColor: "bg-pink-600 hover:bg-pink-700",
      label: "Instagram"
    },
    {
      icon: <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
      href: "#",
      bgColor: "bg-green-600 hover:bg-green-700",
      label: "WhatsApp"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#3d2817] text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-600 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <img 
                  src="/logo/Cristine-Logo (1).jpg" 
                  alt="Cristine de casă" 
                  className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full object-cover shadow-2xl border-4 border-amber-400/30 hover:border-amber-400/60 transition-all duration-200"
                />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Vă Așteptăm
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Veniți să ne cunoașteți și să vă bucurați de cele mai delicioase 
              deserturi din Suceava. Suntem aici pentru dumneavoastră!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact info */}
            <div className={`space-y-8 transition-all duration-600 delay-100 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 text-amber-300" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Informații de Contact
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-white/10 rounded-xl hover:bg-white/15 transition-all duration-200 transform hover:-translate-y-1 border border-white/10 hover:border-amber-400/30 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${150 + index * 50}ms` }}
                    >
                      <div className="flex-shrink-0 bg-gradient-to-br from-amber-600 to-orange-600 p-2 sm:p-3 rounded-lg shadow-lg">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-white">{item.title}</h4>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social media */}
              <div>
                <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-amber-300" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Urmăriți-ne pe Social Media
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`${social.bgColor} p-3 sm:p-4 rounded-lg transition-all duration-200 transform hover:scale-102 hover:shadow-lg group`}
                      aria-label={social.label}
                    >
                      <div className="text-white group-hover:scale-105 transition-transform duration-150">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className={`relative transition-all duration-600 delay-200 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 sm:p-8 h-full border border-white/10">
                <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-amber-300" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Locația Noastră
                </h3>
                
                {/* Google Maps Embed */}
                <div className="bg-gray-700 rounded-xl lg:rounded-2xl h-64 sm:h-80 lg:h-96 overflow-hidden relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.1234567890123!2d26.254195!3d47.648092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734c6b8b8b8b8b8%3A0x1234567890abcdef!2sStrada%20%C8%99tefan%20cel%20Mare%2C%20Suceava!5e0!3m2!1sro!2sro!4v1234567890123!5m2!1sro!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locația Cofetăriei Cristine de casă"
                    className="rounded-xl lg:rounded-2xl"
                  ></iframe>
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <a
                    href="https://maps.google.com/?q=47.648092,26.254195"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-102 shadow-lg hover:shadow-xl"
                  >
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span className="text-sm sm:text-base">Deschide în Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
