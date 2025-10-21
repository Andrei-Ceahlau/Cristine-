import React from 'react';
import { Heart, Award, Clock, Sparkles } from 'lucide-react';

const WelcomeCards: React.FC = () => {
  const cards = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Pasiune pentru deserturi',
      description: 'Fiecare prăjitură este creată cu migală, suflet și bucurie'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Ingrediente firești',
      description: 'Fără premixuri, fără compromisuri - doar ingrediente firești: ciocolată veritabilă, unt, ouă, fructe proaspete și creme făcute de noi'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Tradiție din 2012',
      description: 'De la primii pași din București la laboratorul de acasă, din Suceava - aceeași grijă și atenție ca în prima zi'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Cristine de casă',
      description: 'Deserturi artizanale, torturi personalizate și candy baruri memorabile'
    }
  ];

  return (
    <section className="py-16 bg-[#ede2e0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MESAJ PRINCIPAL pe fundal roz-bej */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-xl sm:text-2xl text-gray-700 italic" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Aici pasiunea și rafinamentul se întâlnesc în fiecare prăjitură.
          </p>
        </div>

        {/* 4 CARDURI - Maro ciocolatiu-roz deschis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#d4af8c] to-[#e8c4a0] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#c49b7b]"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-[#8b4513] to-[#a0522d] text-white rounded-full shadow-lg">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#3d2817] text-center mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                {card.title}
              </h3>
              <p className="text-[#5d4037] text-center leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* MESAJ FINAL */}
        <div className="text-center mt-12">
          <p className="text-lg text-amber-900 font-semibold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Bine ați venit în universul nostru dulce. Ne bucurăm că sunteți aici.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeCards;



