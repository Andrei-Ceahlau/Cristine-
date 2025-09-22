import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { 
  createPaymentIntentService, 
  confirmPaymentService, 
  formatAmount, 
  getStripeErrorMessage,
  getAcceptedCardTypes,
  isTestMode,
  getPaymentModeInfo
} from '../services/paymentService';

// Configurația Stripe
const stripePromise = loadStripe('pk_test_51234567890abcdefghijklmnopqrstuvwxyz'); // Cheia ta publică

// Interfață pentru props
interface StripeCheckoutProps {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  description: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

// Componenta principală de checkout
const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  amount,
  currency,
  orderId,
  customerEmail,
  customerName,
  customerPhone,
  description,
  onSuccess,
  onError,
  onCancel
}) => {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        const result = await createPaymentIntentService({
          amount,
          currency,
          orderId,
          customerEmail,
          customerName,
          customerPhone,
          description
        });

        if (result.success && result.clientSecret) {
          setClientSecret(result.clientSecret);
        } else {
          setError(result.error || 'Eroare la crearea plății');
        }
      } catch (err: any) {
        setError(err.message || 'Eroare la crearea plății');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, currency, orderId, customerEmail, customerName, customerPhone, description]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <span className="ml-2 text-gray-600">Se pregătește plata...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-yellow-700">Se pregătește plata...</span>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        clientSecret={clientSecret}
        amount={amount}
        currency={currency}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    </Elements>
  );
};

// Componenta pentru formularul de plată
interface CheckoutFormProps {
  clientSecret: string;
  amount: number;
  currency: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  amount,
  currency,
  onSuccess,
  onError,
  onCancel
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError('');

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Elementul cardului nu a fost găsit');
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Client Cofetărie',
            email: 'client@example.com'
          }
        }
      });

      if (error) {
        setError(getStripeErrorMessage(error.code || 'generic_decline'));
        onError(error.message || 'Eroare la procesarea plății');
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      setError(err.message || 'Eroare la procesarea plății');
      onError(err.message || 'Eroare la procesarea plății');
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        '::placeholder': {
          color: '#9CA3AF',
        },
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
    hidePostalCode: true,
  };

  const paymentModeInfo = getPaymentModeInfo();
  const acceptedCards = getAcceptedCardTypes();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <CreditCard className="h-8 w-8 text-amber-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Plată cu Cardul</h3>
        </div>
        <p className="text-2xl font-bold text-amber-600">
          {formatAmount(amount, currency)}
        </p>
      </div>

      {/* Test Mode Warning */}
      {isTestMode() && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm text-yellow-700">
              Modul test activat - plățile nu sunt reale
            </span>
          </div>
        </div>
      )}

      {/* Accepted Cards */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Carduri acceptate:</p>
        <div className="flex flex-wrap gap-2">
          {acceptedCards.map((card) => (
            <span
              key={card}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {card}
            </span>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detalii Card
          </label>
          <CardElement options={cardElementOptions} />
        </div>

        {/* Security Info */}
        <div className="flex items-center text-sm text-gray-500">
          <Lock className="h-4 w-4 mr-1" />
          <span>Plata este securizată și criptată</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Anulează
          </button>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Se procesează...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Plătește
              </div>
            )}
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Prin continuare, accepti{' '}
          <a href="#" className="text-amber-600 hover:underline">
            termenii și condițiile
          </a>{' '}
          de plată
        </p>
      </div>
    </div>
  );
};

export default StripeCheckout;

