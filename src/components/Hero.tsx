import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full">
      <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] overflow-hidden">
        <img
          src="/imagini-prezentare/hero-main.jpeg"
          alt="Prăjituri artizanale Cristine de casă"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              <h1
                className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                Prăjituri făcute cu răbdare și gust de acasă
              </h1>
              <p
                className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Atelier de prăjituri și clipe dulci, în inima Sucevei.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#8b7355] hover:bg-[#7a6549] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                COMANDĂ ACUM
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
