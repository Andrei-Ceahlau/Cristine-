import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative">
      {/* FOTOGRAFIE REPREZENTATIVĂ - SUB HEADER - FĂRĂ TEXT */}
      <div className="relative h-screen">
        {/* Imagine de fundal */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/imagini-prezentare/hero-main.jpeg')`
          }}
        >
        </div>
      </div>
    </section>
  );
};

export default Hero;
