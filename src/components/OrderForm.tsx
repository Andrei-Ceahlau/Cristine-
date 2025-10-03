import React, { useState } from 'react';
import { Send, Calendar, User, Phone, Mail, ShoppingBag, CreditCard, CheckCircle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import StripeCheckout from './StripeCheckout';
import { formatAmount, convertToCents } from '../services/paymentService';

const OrderForm: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    productType: '',
    deliveryDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const productTypes = [
    { name: 'Tort personalizat', price: 150 },
    { name: 'Prăjituri asortate', price: 80 },
    { name: 'Macarons', price: 60 },
    { name: 'Desert pentru eveniment', price: 200 },
    { name: 'Pachet sărbători', price: 120 },
    { name: 'Altceva (specifică în mesaj)', price: 100 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update order total when product type changes
    if (name === 'productType') {
      const selectedProduct = productTypes.find(p => p.name === value);
      if (selectedProduct) {
        setOrderTotal(selectedProduct.price);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.productType) {
      setPaymentError('Vă rugăm să completați toate câmpurile obligatorii.');
      setIsSubmitting(false);
      return;
    }

    // Show payment form
    setShowPayment(true);
    setIsSubmitting(false);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentSuccess(true);
    setShowPayment(false);
    
    // Reset form after successful payment
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        productType: '',
        deliveryDate: '',
        message: ''
      });
      setOrderTotal(0);
      setPaymentSuccess(false);
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setPaymentError('');
  };

  return (
    <section id="order" className="py-20 bg-gradient-to-br from-rose-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
              Comandă Rapidă
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Completați formularul de mai jos pentru a plasa o comandă personalizată. 
              Vă vom contacta în cel mai scurt timp pentru confirmare și detalii.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <User className="h-4 w-4 mr-2" />
                      Nume complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      placeholder="Numele dumneavoastră"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="h-4 w-4 mr-2" />
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                      placeholder="0730 123 456"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                    placeholder="exemplu@email.com"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Tip produs dorit *
                  </label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                  >
                    <option value="">Selectați tipul de produs</option>
                    {productTypes.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name} - {formatAmount(convertToCents(type.price))}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    Data livrării dorite
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Mesaj suplimentar
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200 resize-none"
                    placeholder="Detalii suplimentare despre comanda dumneavoastră..."
                  />
                </div>

                {/* Order Total Display */}
                {formData.productType && orderTotal > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-800">Total comandă:</span>
                      <span className="text-2xl font-bold text-amber-600">
                        {formatAmount(convertToCents(orderTotal))}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      * Prețul poate varia în funcție de personalizări
                    </p>
                  </div>
                )}

                {/* Payment Error Display */}
                {paymentError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-red-700">{paymentError}</span>
                    </div>
                  </div>
                )}

                {/* Payment Success Display */}
                {paymentSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700 font-semibold">
                        Comanda a fost plasată cu succes! Vă vom contacta în cel mai scurt timp.
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.productType}
                  className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    isSubmitting || !formData.productType
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-amber-600 hover:bg-amber-700 transform hover:scale-102'
                  } text-white shadow-lg`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Se pregătește...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Continuă la Plată</span>
                    </>
                  )}
                </button>
              </form>

              {/* Stripe Payment Component */}
              {showPayment && (
                <div className="mt-8">
                  <StripeCheckout
                    amount={convertToCents(orderTotal)}
                    currency="RON"
                    orderId={`order_${Date.now()}`}
                    customerEmail={formData.email || 'client@example.com'}
                    customerName={formData.name}
                    customerPhone={formData.phone}
                    description={`Comandă ${formData.productType} - ${formData.name}`}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onCancel={handlePaymentCancel}
                  />
                </div>
              )}
            </div>

            {/* Info side */}
            <div className="space-y-8">
              <div className="bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Informații Importante
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Comenzile pentru torturi personalizate necesită minim 48h preaviz
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Livrare gratuită în Suceava pentru comenzi peste 150 RON
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Plata se poate face cu cardul online, cash la livrare sau prin transfer bancar
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Pentru evenimente speciale, vă rugăm să ne contactați cu minim 1 săptămână înainte
                  </li>
                </ul>
              </div>

              <div className="bg-rose-50 rounded-2xl p-8">
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Program de Lucru
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Luni - Vineri:</span>
                    <span className="font-semibold">08:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sâmbătă:</span>
                    <span className="font-semibold">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duminică:</span>
                    <span className="font-semibold">09:00 - 16:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;