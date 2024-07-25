import React from 'react'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../Components/Stripe/CheckoutForm.js'; // Assurez-vous que ce chemin est correct

const PUBLIC_KEY = 'pk_test_51PVUmqDCsqrqt0UcKSUbQMQJ2ISUXFOeLXzYF1J0TEHVMYzJzMtdiygpXwhTjK1HTo6WE4uxs4Fzk0FJV45lYiGE00MrvGVe3K';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

// const StripeContainer = ({ totalAmount, onPaymentSuccess, isUserLoggedIn }) => {
//   return (
//     <Elements stripe={stripeTestPromise}>
//       <CheckoutForm 
//         totalAmount={totalAmount}
//         onPaymentSuccess={onPaymentSuccess}
//         isUserLoggedIn={isUserLoggedIn}
//       />
//     </Elements>
//   );
// };
const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
    );
}

export default StripeContainer;
