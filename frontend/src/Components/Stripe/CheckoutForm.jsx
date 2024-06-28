// CheckoutForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './checkoutForm.css';



const CheckoutForm = ({ totalAmount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
      return;
    }

    // Envoyer le paiement à votre serveur pour traitement sécurisé avec Stripe
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: totalAmount * 100, // Convertir en centimes
      }),
    });

    const paymentIntentResponse = await response.json();

    if (paymentIntentResponse.error) {
      setMessage(paymentIntentResponse.error);
      setIsProcessing(false);
    } else {
      onPaymentSuccess();
      setMessage('Paiement réussi !');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Détails de la carte
        <CardElement
          options={{
            hidePostalCode: true
          }}
        />
      </label>
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Traitement...' : 'Payer'}
      </button>
      {message && <div className="message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
