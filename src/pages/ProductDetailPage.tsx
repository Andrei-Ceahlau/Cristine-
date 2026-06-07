import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Facebook, MessageCircle } from 'lucide-react';
import { getProductById, Product } from '../services/productService';

const ProductDetailPage: React.FC = () => {
  const { category, productId } = useParams<{ category: string; productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'ingrediente' | 'alergeni' | 'nutritie'>('ingrediente');

  // Date mock pentru demo
  const mockProducts: { [key: number]: Product } = {
    1: {
      id: 1,
      name: 'Tort Cipriani',
      description: 'Piscot insiropat, crema de vanilie si bezea italiana cu coaja de lamaie',
      price: 357,
      image: '/imagini-prezentare/tort talent.jpeg',
      images: ['/imagini-prezentare/tort talent.jpeg', '/imagini-prezentare/tort talent.jpeg'],
      category: 'torturi',
      inStock: true,
      stock: 10,
      weight: '1,4 kg +/- 100 gr',
      ingredients: 'Piscot insiropat, cremă de vanilie, bezea italiană, coajă de lămâie, zahăr, ouă, unt, smântână pentru frișcă',
      allergens: 'lapte, ou, unt, smantana pentru frisca',
      nutritionalInfo: 'Valori nutriționale per 100g:\nCalorii: 320 kcal\nProteine: 5g\nGrăsimi: 18g\nCarbohidrați: 35g\nFibre: 2g\nZahăr: 28g',
      personalizationPrice: 21
    },
    2: {
      id: 2,
      name: 'Tort Ciocolată Belgiană',
      description: 'Tort cu ciocolată belgiană premium și cremă de vanilie',
      price: 420,
      image: '/imagini-prezentare/tort talent.jpeg',
      images: ['/imagini-prezentare/tort talent.jpeg'],
      category: 'torturi',
      inStock: true,
      stock: 8,
      weight: '1,6 kg +/- 100 gr',
      ingredients: 'Ciocolată belgiană 70% cacao, cremă de vanilie, piscot de ciocolată, unt, ouă, zahăr',
      allergens: 'lapte, ou, gluten, soia',
      nutritionalInfo: 'Valori nutriționale per 100g:\nCalorii: 380 kcal\nProteine: 6g\nGrăsimi: 22g\nCarbohidrați: 40g',
      personalizationPrice: 25
    },
    3: {
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
    },
    4: {
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
    5: {
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
    },
    6: {
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
    7: {
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
    },
    8: {
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
    },
    9: {
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
    },
    10: {
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
    },
    11: {
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
    },
    12: {
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
    },
    13: {
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
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(parseInt(productId));
        
        // Dacă nu există produs în baza de date, folosește date mock
        if (!productData && mockProducts[parseInt(productId)]) {
          setProduct(mockProducts[parseInt(productId)]);
        } else if (productData) {
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        // În caz de eroare, folosește date mock
        if (productId && mockProducts[parseInt(productId)]) {
          setProduct(mockProducts[parseInt(productId)]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă produsul...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Produsul nu a fost găsit.</p>
          <Link 
            to={category ? `/gallery/${category}` : '/'} 
            className="inline-flex items-center px-6 py-3 bg-[#5c4033] text-white rounded-lg hover:bg-[#8b6f47] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Înapoi
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || product.imageUrl || '/imagini-prezentare/tort talent.jpeg'];

  const shareUrl = window.location.href;
  const shareText = `Vizitează ${product.name} la Cristine de casă!`;

  return (
    <div className="min-h-screen bg-[#ede2e0] pt-6 md:pt-8">
      {/* Header */}
      <div className="bg-[#ede2e0] border-b border-amber-200/30 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={category ? `/gallery/${category}` : '/'} 
            className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-amber-200 text-[#5c4033] hover:text-[#8b6f47] hover:bg-amber-50 hover:shadow-md transition-all duration-200 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Înapoi</span>
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-amber-100 to-orange-100">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg shadow-md transition-all ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-[#5c4033] ring-offset-2' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#5c4033]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              {product.name}
            </h1>

            {/* Price */}
            {product.price && (
              <p className="text-2xl text-gray-700">
                {product.price.toFixed(2)} lei / buc
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Weight */}
            {product.weight && (
              <p className="text-gray-700">
                <span className="font-semibold">Greutate:</span> {product.weight}
              </p>
            )}

            {/* Weight Variation Note */}
            {product.weight && (
              <p className="text-sm text-gray-600 italic">
                Pentru torturile care se vor achita la livrare suma totală per bucată poate diferi, în funcție de gramajul final al tortului. (marja ±100 g / buc).
              </p>
            )}

            {/* Personalization */}
            {product.personalizationPrice && (
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Text personalizare (+{product.personalizationPrice.toFixed(2)} lei)
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  Aici poți specifica un scurt mesaj. De exemplu: La mulţi ani, Ioana!
                </p>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5c4033] focus:border-transparent"
                  rows={3}
                  placeholder="Mesajul tău personalizat..."
                />
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">1x {product.name}</span>
                <span className="text-gray-700">{product.price?.toFixed(2)} lei</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-600">{product.price?.toFixed(2)} lei</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-4 pt-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5 mr-2" />
                Trimite pe Facebook
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Trimite WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Tabs Section - Ingrediente, Alergeni, Informații nutriționale */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('ingrediente')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'ingrediente'
                  ? 'text-[#5c4033] border-[#5c4033]'
                  : 'text-gray-500 border-transparent hover:text-[#5c4033]'
              }`}
            >
              Ingrediente
            </button>
            <button
              onClick={() => setActiveTab('alergeni')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'alergeni'
                  ? 'text-[#5c4033] border-[#5c4033]'
                  : 'text-gray-500 border-transparent hover:text-[#5c4033]'
              }`}
            >
              Alergeni
            </button>
            <button
              onClick={() => setActiveTab('nutritie')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'nutritie'
                  ? 'text-[#5c4033] border-[#5c4033]'
                  : 'text-gray-500 border-transparent hover:text-[#5c4033]'
              }`}
            >
              Informații nutriționale
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'ingrediente' && (
              <div>
                {product.ingredients ? (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.ingredients}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">Informații despre ingrediente nu sunt disponibile momentan.</p>
                )}
              </div>
            )}

            {activeTab === 'alergeni' && (
              <div>
                {product.allergens ? (
                  <p className="text-gray-700 leading-relaxed">
                    {product.allergens}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">Informații despre alergeni nu sunt disponibile momentan.</p>
                )}
              </div>
            )}

            {activeTab === 'nutritie' && (
              <div>
                {product.nutritionalInfo ? (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.nutritionalInfo}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">Informații nutriționale nu sunt disponibile momentan.</p>
                )}
              </div>
            )}
          </div>
        </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-600 italic">
              Imaginile produselor sunt pentru prezentare și pot diferi de produsele livrate în ceea ce privește culoarea, aspectul etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

