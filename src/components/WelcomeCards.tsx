import React from 'react';
import { Cake, UtensilsCrossed, Heart, Gift } from 'lucide-react';

const WelcomeCards: React.FC = () => {
  const cards = [
    {
      icon: Cake,
      title: 'Ingrediente de calitate',
      description: 'Folosim doar ingrediente atent alese și creme preparate în laborator.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Rețete de casă',
      description: 'Rețete proprii, lucrate manual, cu aceeași grijă de fiecare dată.',
    },
    {
      icon: Heart,
      title: 'Pentru orice moment',
      description: 'Torturi, prăjituri și deserturi pentru aniversări, botezuri și evenimente.',
    },
    {
      icon: Gift,
      title: 'Comandă ușor',
      description: 'Plasezi comanda online, noi ne ocupăm de restul.',
    },
  ];

  return (
    <section className="py-12 sm:py-14 bg-[#fdfbf8] border-b border-[#ebe2d5]/60">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center px-2">
                <Icon
                  className="h-8 w-8 text-[#8b7355] mb-4"
                  strokeWidth={1.25}
                />
                <h3
                  className="text-[#5c4033] text-sm sm:text-base mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-[#7a6a5a] text-xs sm:text-sm leading-relaxed max-w-[220px]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WelcomeCards;
