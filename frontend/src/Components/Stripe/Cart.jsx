import React from 'react';
import Stripe from './StripeContainer';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, changeQuantity, getTotalPrice, getNumberProduct, handleEmptyCart } = useCart();

  const navigate = useNavigate();

  console.log('Rendering Cart with products:', cart);

  const handlePaymentSuccess = () => {
    handleEmptyCart();

    // Afficher un message de confirmation
    alert("Votre paiement a été effectué avec succès ! Merci pour votre achat.");

    // Rediriger vers une page de confirmation
    navigate('/confirmation');

    // Simuler l'envoi d'un e-mail de confirmation.

    // Mettre à jour l'historique des commandes 

  };


  return (

    <div className='cart'>

      <h2>Votre panier</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            <div className='cart-infos'>
              <h3>{product.name}</h3>
              {/* <p>Description: {product.description}</p> */}
              <p>Catégories: {product.categoryName}</p>
              <p>Prix : {product.price}</p>
              <p>Quantité : {product.quantity}</p>
              {/* <img src={product.imageURL} alt={product.name} /> */}
              <div className="cart-details-img">
                {product.imageURL.map((image, idx) =>
                  <img key={`img-${product.name}-${idx}`} className="cart-image" src={image} alt="" />
                )}
              </div>
              <div className="cart-quantity-controls">
                <button onClick={() => changeQuantity(product, product.quantity - 1)}>-</button>
                <button onClick={() => changeQuantity(product, product.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(product)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <p className="cart-total">Total : {getTotalPrice()} €</p>
      <p className="cart-number-products">Nombre de produits : {getNumberProduct()}</p>
      <button className="empty-cart" onClick={handleEmptyCart}>Vider le panier</button>
      <Stripe totalAmount={getTotalPrice()} onPaymentSuccess={handlePaymentSuccess} />
    </div>
  );
};

export default Cart;

