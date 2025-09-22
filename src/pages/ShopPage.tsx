import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

const ShopPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { isShopOpen } = useShop();

  const products: Product[] = [
    {
      id: 1,
      name: 'Tort Ciocolată',
      description: 'Tort cu ciocolată belgiană și cremă de vanilie',
      price: 120,
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'torturi',
      inStock: true
    },
    {
      id: 2,
      name: 'Macarons Mix',
      description: 'Set de 6 macarons cu arome variate',
      price: 45,
      image: 'https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'macarons',
      inStock: true
    },
    {
      id: 3,
      name: 'Cupcakes Vanilie',
      description: 'Cupcakes cu cremă de vanilie și topping colorat',
      price: 35,
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'cupcakes',
      inStock: true
    },
    {
      id: 4,
      name: 'Tort de Nuntă',
      description: 'Tort elegant cu flori de zahăr și cremă de ciocolată',
      price: 280,
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'torturi',
      inStock: true
    },
    {
      id: 5,
      name: 'Ecler Clasic',
      description: 'Ecler cu cremă de vanilie și glazură de ciocolată',
      price: 15,
      image: 'https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'eclere',
      inStock: true
    },
    {
      id: 6,
      name: 'Candy Bar Personalizat',
      description: 'Set complet pentru evenimente cu dulciuri variate',
      price: 180,
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'candy-bar',
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Toate' },
    { id: 'torturi', name: 'Torturi' },
    { id: 'macarons', name: 'Macarons' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'eclere', name: 'Eclere' },
    { id: 'candy-bar', name: 'Candy Bar' }
  ];

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Dacă magazinul este închis, afișează mesajul
  if (!isShopOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Magazinul este închis</h2>
            <p className="text-gray-600 mb-6">
              Magazinul este temporar închis. Vă rugăm să reveniți mai târziu sau să contactați cofetăria pentru comenzi speciale.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Înapoi la site</span>
              </Link>
            </div>
            <h1 className="text-2xl font-serif text-gray-800">Magazinul Nostru</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bine ai venit!</span>
              <Link 
                to="/login" 
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Conectare
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Deserturi Artizanale
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descoperă colecția noastră de deserturi create cu pasiune și ingrediente de calitate
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Stoc epuizat</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">{product.price} RON</span>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                      product.inStock
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Adaugă în coș
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Coșul tău</h3>
              <ShoppingCart className="h-6 w-6 text-amber-600" />
            </div>
            
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.price} RON</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-amber-600">{getCartTotal()} RON</span>
              </div>
              
              <button className="w-full bg-amber-600 text-white py-3 rounded-full font-medium hover:bg-amber-700 transition-colors">
                Finalizează comanda
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
