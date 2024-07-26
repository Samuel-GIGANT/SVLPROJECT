import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../Components/Stripe/CheckoutForm.js';
import { useCart } from './CartContext';

const PUBLIC_KEY = 'pk_test_51PVUmqDCsqrqt0UcKSUbQMQJ2ISUXFOeLXzYF1J0TEHVMYzJzMtdiygpXwhTjK1HTo6WE4uxs4Fzk0FJV45lYiGE00MrvGVe3K';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  const [totalPrice, setTotalPrice] = useState(1);
  const { getTotalPrice } = useCart();
  const totalAmount = getTotalPrice();


  useEffect(() => {
    setTotalPrice(totalAmount)
  }, [totalAmount])

  const options = {
    mode: 'payment',
    currency: 'eur',
    amount: totalPrice
  }

  return (
    <Elements stripe={stripeTestPromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default StripeContainer;
