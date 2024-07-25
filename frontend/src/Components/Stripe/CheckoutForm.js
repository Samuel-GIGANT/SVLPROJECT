// // CheckoutForm.js
// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

//   const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });
//     if (error) {
//       console.log("token généré", paymentMethod);
//     }
//     };
//     return (
//       <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
//         <CardElement
//           options={{
//             hidePostaCode: true
//           }}
//         />
//         <button>Payer</button>
//       </form>
//     );
//   };
//   export default CheckoutForm;
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
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
            hidePostalCode: true // pour ne pas avoir le code postale avec la carte 
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