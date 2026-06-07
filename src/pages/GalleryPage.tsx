import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProductsByCategory, Product } from '../services/productService';

const GalleryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Date mock pentru demo
  const mockProducts: { [key: string]: Product[] } = {
    'torturi': [
      {
        id: 1,
        name: 'Tort Cipriani',
        description: 'Piscot insiropat, crema de vanilie si bezea italiana cu coaja de lamaie',
        price: 357,
        image: '/imagini-prezentare/tort talent.jpeg',
        category: 'torturi',
        inStock: true,
        stock: 10,
        weight: '1,4 kg +/- 100 gr',
        ingredients: 'Piscot insiropat, cremă de vanilie, bezea italiană, coajă de lămâie, zahăr, ouă, unt, smântână pentru frișcă',
        allergens: 'lapte, ou, unt, smantana pentru frisca',
        nutritionalInfo: 'Valori nutriționale per 100g:\nCalorii: 320 kcal\nProteine: 5g\nGrăsimi: 18g\nCarbohidrați: 35g',
        personalizationPrice: 21,
        images: ['/imagini-prezentare/tort talent.jpeg', '/imagini-prezentare/tort talent.jpeg']
      },
      {
        id: 2,
        name: 'Tort Ciocolată Belgiană',
        description: 'Tort cu ciocolată belgiană premium și cremă de vanilie',
        price: 420,
        image: '/imagini-prezentare/tort talent.jpeg',
        category: 'torturi',
        inStock: true,
        stock: 8,
        weight: '1,6 kg +/- 100 gr',
        ingredients: 'Ciocolată belgiană 70% cacao, cremă de vanilie, piscot de ciocolată, unt, ouă, zahăr',
        allergens: 'lapte, ou, gluten, soia',
        nutritionalInfo: 'Valori nutriționale per 100g:\nCalorii: 380 kcal\nProteine: 6g\nGrăsimi: 22g\nCarbohidrați: 40g',
        personalizationPrice: 25
      },
      {
        id: 3,
        name: 'Tort Fructe Proaspete',
        description: 'Tort cu fructe de sezon și cremă de brânză',
        price: 380,
        image: '/imagini-prezentare/tort talent.jpeg',
        category: 'torturi',
        inStock: true,
        stock: 12,
        weight: '1,5 kg +/- 100 gr',
        ingredients: 'Piscot, cremă de brânză, fructe proaspete (căpșuni, zmeură, afine), zahăr, gelatina',
        allergens: 'lapte, ou, gluten',
        personalizationPrice: 21
      }
    ],
    'prajituri-de-casa': [
      {
        id: 4,
        name: 'Prăjitură cu Ciocolată',
        description: 'Prăjitură clasică de casă cu ciocolată și cremă',
        price: 45,
        image: '/imagini-prezentare/a 2 a.jpeg',
        category: 'prajituri-de-casa',
        inStock: true,
        stock: 20,
        ingredients: 'Făină, ciocolată, unt, ouă, zahăr, cremă de vanilie',
        allergens: 'lapte, ou, gluten'
      },
      {
        id: 5,
        name: 'Prăjitură cu Fructe',
        description: 'Prăjitură cu fructe proaspete și cremă',
        price: 42,
        image: '/imagini-prezentare/a 2 a.jpeg',
        category: 'prajituri-de-casa',
        inStock: true,
        stock: 18,
        ingredients: 'Făină, fructe proaspete, unt, ouă, zahăr',
        allergens: 'lapte, ou, gluten'
      }
    ],
    'tarte': [
      {
        id: 6,
        name: 'Tartă cu Fructe',
        description: 'Tartă cu aluat fraged și fructe de sezon',
        price: 55,
        image: '/imagini-prezentare/a4a.jpeg',
        category: 'tarte',
        inStock: true,
        stock: 15,
        ingredients: 'Aluat fraged, fructe proaspete, cremă de vanilie, zahăr',
        allergens: 'lapte, ou, gluten'
      },
      {
        id: 7,
        name: 'Tartă cu Ciocolată',
        description: 'Tartă cu ciocolată și caramel',
        price: 58,
        image: '/imagini-prezentare/a4a.jpeg',
        category: 'tarte',
        inStock: true,
        stock: 12,
        ingredients: 'Aluat fraged, ciocolată, caramel, unt, ouă',
        allergens: 'lapte, ou, gluten'
      }
    ],
    'biscuiti': [
      {
        id: 8,
        name: 'Biscuiți cu Ciocolată',
        description: 'Biscuiți crocanți cu ciocolată',
        price: 35,
        image: '/imagini-prezentare/a5a.jpeg',
        category: 'biscuiti',
        inStock: true,
        stock: 30,
        ingredients: 'Făină, ciocolată, unt, zahăr, ouă',
        allergens: 'lapte, ou, gluten'
      }
    ],
    'patiserie': [
      {
        id: 9,
        name: 'Croissant cu Ciocolată',
        description: 'Croissant proaspăt cu ciocolată',
        price: 12,
        image: '/imagini-prezentare/a3a.jpeg',
        category: 'patiserie',
        inStock: true,
        stock: 25,
        ingredients: 'Făină, unt, ciocolată, drojdie, zahăr',
        allergens: 'lapte, gluten, ou'
      }
    ],
    'specialitati': [
      {
        id: 10,
        name: 'Specialitate Cristine',
        description: 'Creație specială a casei',
        price: 65,
        image: '/imagini-prezentare/ChatGPT Image 2 oct. 2025, 15_16_44.png',
        category: 'specialitati',
        inStock: true,
        stock: 10,
        ingredients: 'Ingrediente speciale, cremă, fructe',
        allergens: 'lapte, ou'
      }
    ],
    'de-sarbatoare': [
      {
        id: 11,
        name: 'Tort de Nuntă',
        description: 'Tort elegant pentru evenimente speciale',
        price: 550,
        image: '/imagini-prezentare/gradina.jpeg',
        category: 'de-sarbatoare',
        inStock: true,
        stock: 5,
        weight: '2,5 kg +/- 200 gr',
        ingredients: 'Piscot, cremă de vanilie, fructe, decor special',
        allergens: 'lapte, ou, gluten',
        personalizationPrice: 50
      }
    ],
    'candybar': [
      {
        id: 12,
        name: 'Candy Bar Complet',
        description: 'Set complet pentru evenimente',
        price: 280,
        image: '/imagini-prezentare/gradina 2.jpeg',
        category: 'candybar',
        inStock: true,
        stock: 8,
        ingredients: 'Diverse dulciuri, prăjituri, decor',
        allergens: 'lapte, ou, gluten, arahide'
      }
    ],
    'torturi-personalizate': [
      {
        id: 13,
        name: 'Tort Personalizat',
        description: 'Tort personalizat după preferințele tale',
        price: 450,
        image: '/imagini-prezentare/gradina 3.jpeg',
        category: 'torturi-personalizate',
        inStock: true,
        stock: 6,
        weight: '2 kg +/- 150 gr',
        ingredients: 'Ingrediente de calitate, cremă, decor personalizat',
        allergens: 'lapte, ou, gluten',
        personalizationPrice: 30
      }
    ]
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        const categoryProducts = await getProductsByCategory(category);
        
        // Dacă nu există produse în baza de date, folosește date mock
        if (categoryProducts.length === 0 && mockProducts[category]) {
          setProducts(mockProducts[category]);
        } else {
          setProducts(categoryProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // În caz de eroare, folosește date mock
        if (category && mockProducts[category]) {
          setProducts(mockProducts[category]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const categoryNames: { [key: string]: string } = {
    'torturi': 'Torturi',
    'prajituri-de-casa': 'Prăjituri de casă',
    'tarte': 'Tarte',
    'biscuiti': 'Biscuiți',
    'patiserie': 'Patiserie',
    'specialitati': 'Specialități',
    'de-sarbatoare': 'De sărbătoare',
    'candybar': 'Candybar',
    'torturi-personalizate': 'Torturi personalizate'
  };

  const displayName = category ? categoryNames[category] || category : 'Produse';

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă produsele...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#ede2e0] border-b border-amber-200/30 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center text-[#5c4033] hover:text-[#8b6f47] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Înapoi</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#5c4033]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              {displayName}
            </h1>
            <div className="w-24"></div> {/* Spacer pentru centrare */}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">Nu există produse în această categorie momentan.</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-[#5c4033] text-white rounded-lg hover:bg-[#8b6f47] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Înapoi la pagina principală
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/gallery/${category}/product/${product.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
              >
                <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100">
                  <img
                    src={product.image || product.imageUrl || '/imagini-prezentare/tort talent.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#5c4033] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  {product.price && (
                    <p className="text-lg font-semibold text-[#5c4033]">
                      {product.price.toFixed(2)} lei
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;

