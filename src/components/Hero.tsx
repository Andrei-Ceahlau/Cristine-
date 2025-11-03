import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative">
      {/* FOTOGRAFIE REPREZENTATIVĂ - SUB HEADER - FĂRĂ TEXT */}
      <div className="relative w-full h-screen">
        {/* Imagine de fundal - optimizată pentru calitate maximă */}
        <img 
          src="/imagini-prezentare/hero-main.jpeg"
          alt="Cristine de casă - Prăjituri artizanale"
          className="w-full h-full object-cover"
          style={{
            imageRendering: '-webkit-optimize-contrast',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
