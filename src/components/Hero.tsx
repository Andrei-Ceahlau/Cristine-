import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen">
      {/* FOTOGRAFIE REPREZENTATIVĂ - SUB HEADER */}
      <div className="relative h-screen">
        {/* Imagine de fundal */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/imagini-prezentare/exterior.jpeg')`
          }}
        >
          {/* Overlay pentru contrast */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* TEXT OVERLAY CENTRAT */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            {/* TEXT ALB CENTRAT */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Bun venit la Cristine de casă, atelier de prăjituri și clipe dulci
            </h1>
            
            {/* BUTON CĂTRE PAGINA CU PRODUSE */}
            <Link 
              to="/shop"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Descoperă produsele noastre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
