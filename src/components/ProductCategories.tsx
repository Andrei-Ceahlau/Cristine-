import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductCategories: React.FC = () => {
  const categories = [
    {
      name: 'Torturi',
      slug: 'torturi',
      image: '/imagini-prezentare/tort talent.jpeg',
      description: 'Torturi pentru momente speciale, cu rețete rafinate și ingrediente de calitate.',
    },
    {
      name: 'Prăjituri de casă',
      slug: 'prajituri-de-casa',
      image: '/imagini-prezentare/a 2 a.jpeg',
      description: 'Prăjituri făcute după rețete tradiționale, cu drag și răbdare.',
    },
    {
      name: 'Tarte',
      slug: 'tarte',
      image: '/imagini-prezentare/a4a.jpeg',
      description: 'Tarte fine și echilibrate, pentru gusturi rafinate.',
    },
    {
      name: 'Deserturi fine',
      slug: 'specialitati',
      image: '/imagini-prezentare/a5a.jpeg',
      description: 'Macarons și delicii pentru momente dulci și elegante.',
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#fdfbf8]">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-2xl sm:text-3xl text-[#5c4033] mb-2"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            Produse recomandate
          </h2>
          <div className="flex justify-center">
            <span className="text-[#8b7355] text-lg">🌿</span>
          </div>
        </div>

        {/* Un singur rând - 4 carduri */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ebe2d5]/80 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#ebe2d5] px-4 py-5 flex flex-col flex-1 text-center">
                <h3
                  className="text-[#4a3728] text-base sm:text-lg mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                >
                  {category.name}
                </h3>
                <p
                  className="text-[#6b5b4b] text-xs sm:text-sm leading-relaxed mb-4 flex-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {category.description}
                </p>
                <Link
                  to={`/gallery/${category.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 mx-auto bg-[#e0d5c8] hover:bg-[#d4c9bc] text-[#5c4033] text-[11px] sm:text-xs font-medium tracking-wider px-4 py-2 rounded-lg transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  VEZI DETALII
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#ebe2d5] hover:bg-[#e0d5c8] text-[#5c4033] text-xs sm:text-sm font-medium tracking-wider px-8 py-3 rounded-lg transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            VEZI TOATE PRODUSELE
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
