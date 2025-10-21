import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories: React.FC = () => {
  const categories = [
    { name: 'Torturi', image: '/imagini-prezentare/tort talent.jpeg' },
    { name: 'Prăjituri de casă', image: '/imagini-prezentare/a 2 a.jpeg' },
    { name: 'Tarte', image: '/imagini-prezentare/a4a.jpeg' },
    { name: 'Biscuiți', image: '/imagini-prezentare/a5a.jpeg' },
    { name: 'Patiserie', image: '/imagini-prezentare/a3a.jpeg' },
    { name: 'Specialități', image: '/imagini-prezentare/ChatGPT Image 2 oct. 2025, 15_16_44.png' },
    { name: 'De sărbătoare', image: '/imagini-prezentare/gradina.jpeg' },
    { name: 'Candybar', image: '/imagini-prezentare/gradina 2.jpeg' },
    { name: 'Torturi personalizate', image: '/imagini-prezentare/gradina 3.jpeg' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
          Secțiuni produse
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/shop"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80 bg-gradient-to-br from-amber-100 to-orange-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  {category.name}
                </h3>
                <div className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold transition-colors duration-200 group-hover:bg-amber-100">
                  Descoperă
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;





