import { loadStripe, Stripe } from '@stripe/stripe-js';
import { 
  createPaymentIntent, 
  createCustomer,
  createSetupIntent 
} from './stripeApi';

// Configurația Stripe - înlocuiește cu cheia ta publică
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz'; // Cheia ta publică Stripe

// Initializează Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Interfață pentru detaliile de plată
export interface PaymentDetails {
  amount: number; // în cenți (ex: 1000 = 10.00 RON)
  currency: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  description: string;
}

// Interfață pentru rezultatul plății
export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
  clientSecret?: string;
}

// Funcție pentru a crea un Payment Intent
export const createPaymentIntentService = async (paymentDetails: PaymentDetails): Promise<PaymentResult> => {
  try {
    const response = await createPaymentIntent({
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      orderId: paymentDetails.orderId,
      customerEmail: paymentDetails.customerEmail,
      customerName: paymentDetails.customerName,
      customerPhone: paymentDetails.customerPhone,
      description: paymentDetails.description
    });

    return {
      success: true,
      clientSecret: response.clientSecret,
      paymentIntentId: response.paymentIntentId
    };
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      error: error.message || 'Eroare la crearea plății'
    };
  }
};

// Funcție pentru a confirma o plată
export const confirmPaymentService = async (
  clientSecret: string,
  paymentMethodId: string
): Promise<PaymentResult> => {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe nu a putut fi încărcat');
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId
    });

    if (error) {
      return {
        success: false,
        error: error.message || 'Eroare la confirmarea plății'
      };
    }

    if (paymentIntent?.status === 'succeeded') {
      return {
        success: true,
        paymentIntentId: paymentIntent.id
      };
    }

    return {
      success: false,
      error: 'Plata nu a fost procesată cu succes'
    };
  } catch (error: any) {
    console.error('Error confirming payment:', error);
    return {
      success: false,
      error: error.message || 'Eroare la confirmarea plății'
    };
  }
};

// Funcție pentru a crea un Setup Intent (pentru plăți viitoare)
export const createSetupIntentService = async (customerId: string): Promise<PaymentResult> => {
  try {
    const response = await createSetupIntent({ customerId });
    
    return {
      success: true,
      clientSecret: response.clientSecret
    };
  } catch (error: any) {
    console.error('Error creating setup intent:', error);
    return {
      success: false,
      error: error.message || 'Eroare la crearea setup-ului pentru plată'
    };
  }
};

// Funcție pentru a crea un customer Stripe
export const createCustomerService = async (
  email: string,
  name: string,
  phone?: string
): Promise<{ success: boolean; customerId?: string; error?: string }> => {
  try {
    const response = await createCustomer({
      email,
      name,
      phone
    });

    return {
      success: true,
      customerId: response.customerId
    };
  } catch (error: any) {
    console.error('Error creating customer:', error);
    return {
      success: false,
      error: error.message || 'Eroare la crearea customer-ului'
    };
  }
};

// Funcție pentru a formata suma pentru afișare
export const formatAmount = (amount: number, currency: string = 'RON'): string => {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: currency
  }).format(amount / 100);
};

// Funcție pentru a converti suma în cenți
export const convertToCents = (amount: number): number => {
  return Math.round(amount * 100);
};

// Funcție pentru a valida detaliile de plată
export const validatePaymentDetails = (details: PaymentDetails): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!details.amount || details.amount <= 0) {
    errors.push('Suma trebuie să fie mai mare decât 0');
  }

  if (!details.currency) {
    errors.push('Moneda este obligatorie');
  }

  if (!details.customerEmail || !isValidEmail(details.customerEmail)) {
    errors.push('Email-ul clientului nu este valid');
  }

  if (!details.customerName || details.customerName.trim().length < 2) {
    errors.push('Numele clientului trebuie să aibă cel puțin 2 caractere');
  }

  if (!details.description || details.description.trim().length < 5) {
    errors.push('Descrierea comenzii trebuie să aibă cel puțin 5 caractere');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

// Funcție pentru validarea email-ului
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Funcție pentru a obține mesajele de eroare în română
export const getStripeErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    'card_declined': 'Cardul a fost refuzat. Verifică datele sau încearcă alt card.',
    'expired_card': 'Cardul a expirat. Folosește un card valid.',
    'incorrect_cvc': 'Codul CVC este incorect.',
    'incorrect_number': 'Numărul cardului este incorect.',
    'invalid_expiry_month': 'Luna de expirare este invalidă.',
    'invalid_expiry_year': 'Anul de expirare este invalid.',
    'invalid_cvc': 'Codul CVC este invalid.',
    'processing_error': 'Eroare la procesarea plății. Încearcă din nou.',
    'authentication_required': 'Plata necesită autentificare suplimentară.',
    'insufficient_funds': 'Fonduri insuficiente pe card.',
    'generic_decline': 'Cardul a fost refuzat. Contactează banca ta.',
    'lost_card': 'Cardul a fost raportat ca pierdut sau furat.',
    'stolen_card': 'Cardul a fost raportat ca pierdut sau furat.',
    'pickup_card': 'Cardul a fost raportat ca pierdut sau furat.',
    'restricted_card': 'Cardul are restricții. Contactează banca ta.',
    'security_violation': 'Violare de securitate detectată.',
    'service_not_allowed': 'Serviciul nu este permis pentru acest card.',
    'stop_payment_order': 'Plata a fost oprită de către titularul cardului.',
    'testmode_decline': 'Cardul de test a fost refuzat (modul test).',
    'try_again_later': 'Încearcă din nou mai târziu.',
    'withdraw_count_limit_exceeded': 'Limita de retrageri a fost depășită.'
  };

  return errorMessages[errorCode] || 'A apărut o eroare neașteptată. Încearcă din nou.';
};

// Funcție pentru a obține tipurile de card acceptate
export const getAcceptedCardTypes = (): string[] => {
  return ['Visa', 'Mastercard', 'American Express', 'Discover', 'Diners Club', 'JCB'];
};

// Funcție pentru a verifica dacă o plată este în modul test
export const isTestMode = (): boolean => {
  return STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_');
};

// Funcție pentru a obține informații despre modul curent
export const getPaymentModeInfo = (): { mode: string; description: string } => {
  if (isTestMode()) {
    return {
      mode: 'Test',
      description: 'Plățile sunt în modul test. Nu se vor procesa plăți reale.'
    };
  }
  
  return {
    mode: 'Live',
    description: 'Plățile sunt în modul live. Se vor procesa plăți reale.'
  };
};








