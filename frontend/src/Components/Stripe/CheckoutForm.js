import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { PaymentElement } from '@stripe/react-stripe-js';
import './checkoutForm.css';

const CheckoutForm = ({ totalAmount, onPaymentSuccess, isUserLoggedIn }) => {
  const stripe = useStripe(); // déclaration du hook pour utiliser stripe
  const elements = useElements();//declaration du hook des élèments de la carte
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isUserLoggedIn) {
      setMessage('Vous devez être connecté pour effectuer un paiement.');
      navigate('/login'); // Rediriger vers la page de login
      return;
    }

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
        amount: (totalAmount - 1) * 100, // Convertir en centimes //FIXE:initiation de la valeur à 1 pour bypassé l'erreur stripe 'amount must be greater than 0.
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

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // The payment has succeeded
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">

      <p>Veuillez compléter vos informations de paiement</p>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <PaymentElement />
      
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Traitement...' : 'Payer'}
      </button>
      {message && <div className="message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;