import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useDarkMode } from '../contexts/DarkModeContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { isDarkMode } = useDarkMode();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md shadow-lg ${isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-lg font-medium">Înapoi</span>
              </Link>
              
              <h1 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Coș de cumpărături
              </h1>
              
              <div className="w-24"></div> {/* Spacer pentru centrare */}
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="pt-24 flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <ShoppingBag className={`h-24 w-24 mx-auto mb-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-300'}`} />
            <h2 className={`text-3xl font-serif font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Coșul tău este gol
            </h2>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              Descoperă deliciile noastre și adaugă-le în coș!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg rounded-xl"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Explorează produsele
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md shadow-lg ${isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-amber-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-medium">Înapoi</span>
            </Link>
            
            <h1 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Coș de cumpărături ({getTotalItems()})
            </h1>
            
            <button
              onClick={clearCart}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-red-400 hover:text-red-300 hover:bg-red-800/20'
                  : 'text-red-600 hover:text-red-700 hover:bg-red-50'
              }`}
            >
              Șterge tot
            </button>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Produse în coș
                </h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl border ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.name}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                        <p className={`font-semibold text-amber-600 mt-1`}>
                          {item.price.toFixed(2)} RON
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'bg-slate-600 hover:bg-slate-500 text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className={`px-3 py-1 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'bg-slate-600 hover:bg-slate-500 text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-800/20'
                            : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className={`rounded-2xl shadow-lg p-6 sticky top-32 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Rezumat comandă
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                      Produse ({getTotalItems()})
                    </span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {getTotalPrice().toFixed(2)} RON
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                      Transport
                    </span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Gratuit
                    </span>
                  </div>
                  
                  <hr className={`${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`} />
                  
                  <div className="flex justify-between text-lg">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Total
                    </span>
                    <span className="font-bold text-amber-600">
                      {getTotalPrice().toFixed(2)} RON
                    </span>
                  </div>
                </div>
                
                <button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Finalizează comanda</span>
                </button>
                
                <p className={`text-sm text-center mt-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  Plăți securizate prin Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

