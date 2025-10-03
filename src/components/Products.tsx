import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('toate');
  const { isDarkMode } = useDarkMode();

  const categories = [
    { id: 'toate', name: 'Toate' },
    { id: 'prajituri', name: 'Prăjituri de casă' },
    { id: 'torturi', name: 'Torturi' },
    { id: 'patiserie', name: 'Patiserie' },
    { id: 'sarbatori', name: 'Sărbători' }
  ];

  const products = [
    {
      id: 1,
      name: '🐝 Albinița',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Foi aurii cu miere, straturi delicate de cremă de griș și unt, îmblânzite de dulceața magiunului. O prăjitură cu parfum de copilărie, simplă și delicioasă.',
      price: 'Pune-l deoparte pentru mine',
      rating: 5,
      bestseller: true
    },
    {
      id: 2,
      name: '❄️ Albă ca Zăpada',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Foi fragede, adăpostesc o cremă catifelată de lămâie. Un desert răcoritor, care îmbină delicatețea cu prospețimea.',
      price: 'Pune-l deoparte pentru mine',
      rating: 5,
      bestseller: false
    },
    {
      id: 3,
      name: '🍯 Marlenka',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/2067628/pexels-photo-2067628.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Prăjitură cu foi de miere, învelite de o cremă fină cu miere și nucă. Gust delicat și ușor, asemenea unei îmbrățișări din copilărie.',
      price: 'Pune-l deoparte pentru mine',
      rating: 5,
      bestseller: true
    },
    {
      id: 4,
      name: '🍫 Ciocolată de casă',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Făcută cu unt, cacao și nuci, merișoare și fistic. Albă sau neagră, e o bucurie simplă, dar elegantă, așa cum doar deserturile de casă pot fi.',
      price: 'Pune-l deoparte pentru mine',
      rating: 5,
      bestseller: true
    },
    {
      id: 5,
      name: '🌰 Șumeghi',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/1998631/pexels-photo-1998631.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'O prăjitură ardelenească cu foi de bezea și nucă, unite de o cremă fină cu cacao, fiartă cu răbdare. O combinație generoasă, bogată, cu gust autentic, din vechi caiete de rețete.',
      price: 'Pune-l deoparte pentru mine',
      rating: 5,
      bestseller: false
    },
    {
      id: 6,
      name: '🥮 Nuci',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/2067638/pexels-photo-2067638.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Coji fragede de aluat cu unt, îmbrățișând o umplutură cu nucă. O prăjitură plină de nostalgie, cu gust ce rămâne în amintire.',
      price: 'Pune-l deoparte pentru mine',
      rating: 4,
      bestseller: false
    },
    {
      id: 7,
      name: '🍑 Piersicuțe',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/2067638/pexels-photo-2067638.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Fragede și aromate, umplute cu gem de piersici și caise, apoi însiropate și colorate cu delicatețe. O prăjitură-jucărie, cu farmec festiv.',
      price: 'Pune-l deoparte pentru mine',
      rating: 4,
      bestseller: false
    },
    {
      id: 8,
      name: '🍫 Eclere',
      category: 'prajituri',
      image: 'https://images.pexels.com/photos/2067638/pexels-photo-2067638.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Simplu, însă desăvârșit. Umplut cu cremă fină de vanilie sau de cafea, acoperit cu glazură.',
      price: 'Pune-l deoparte pentru mine',
      rating: 5,
      bestseller: true
    },
    {
      id: 9,
      name: '🎂 Tortul casei',
      category: 'torturi',
      image: 'https://images.pexels.com/photos/2067638/pexels-photo-2067638.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Un mousse fin de fistic, făcut din pastă naturală, fără esențe artificiale, aerat și ușor. Blatul de vanilie cu unt, însiropat cu sirop din lămâi proaspăt stoarse, aduce echilibru și prospețime. Între straturi, o cremă delicată de mascarpone cu smântână și zmeură, pentru un gust proaspăt, curat și elegant.',
      price: 'Pune-l deoparte pentru mine',
      rating: 5,
      bestseller: true
    }
  ];

  const filteredProducts = selectedCategory === 'toate' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            🍰 Produsele noastre
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Deserturi artizanale, create cu suflet, migală și ingrediente alese cu grijă.
            În spatele fiecărui produs stă o rețetă testată, rafinată și adaptată până la perfecțiune. 
            Fie că este vorba de un clasic reinterpretat sau de o combinație modernă, scopul nostru este 
            același: să oferim nu doar gust, ci și emoție.
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto mt-4">
            Toate produsele sunt pregătite manual, în laboratorul nostru din Suceava, în loturi mici, 
            pentru a ne asigura că fiecare prăjitură, tort sau produs de patiserie păstrează standardul 
            înalt cu care ne-am obișnuit clienții.
          </p>
          <p className="text-base text-amber-700 font-semibold max-w-3xl mx-auto mt-4">
            Aici, fiecare desert are o poveste. Descoperă-le pe ale noastre și lasă-le să devină parte din a ta.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-102 hover:shadow-xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {product.bestseller && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Bestseller
                  </div>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white hover:text-red-500 transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-center">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 w-full">
                    {product.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;