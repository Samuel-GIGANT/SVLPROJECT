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

    // Simuler l'envoi d'un e-mail de confirmation (vous pouvez remplacer cela par un appel API réel)
    // console.log("E-mail de confirmation envoyé à l'utilisateur.");

    // Mettre à jour les statistiques ou l'historique des commandes (à implémenter selon votre logique)
    // console.log("L'historique des commandes a été mis à jour.");

  };


  return (

    <div className='cart'>

      <h2>Votre panier</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            <div className='cart-infos'>
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Catégories: {product.category}</p>
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



// import React, { useState, useEffect } from 'react';
// import Stripe from './StripeContainer';
// import './cart.css';

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCart(savedCart);
//   }, []);

//   const saveCartToLocalStorage = (updatedCart) => {
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const addToCart = (product) => {
//     const existingProductIndex = cart.findIndex(item => item.id === product.id);

//     if (existingProductIndex !== -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingProductIndex].quantity += 1;
//       setCart(updatedCart);
//       saveCartToLocalStorage(updatedCart);
//     } else {
//       const updatedCart = [...cart, { ...product, quantity: 1 }];
//       setCart(updatedCart);
//       saveCartToLocalStorage(updatedCart);
//     }
//   };

//   const removeFromCart = (product) => {
//     const updatedCart = cart.filter(item => item.id !== product.id);
//     setCart(updatedCart);
//     saveCartToLocalStorage(updatedCart);
//   };

//   const changeQuantity = (product, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(product);
//     } else {
//       const updatedCart = cart.map(item => {
//         if (item.id === product.id) {
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       });
//       setCart(updatedCart);
//       saveCartToLocalStorage(updatedCart);
//     }
//   };

//   const getTotalPrice = () => {
//     let totalPrice = 0;
//     cart.forEach(product => {
//       const removeEuroSymbol = parseFloat(product.price.replace('€', ''));
//       if (!isNaN(removeEuroSymbol)) {
//         totalPrice += removeEuroSymbol * product.quantity;
//       }
//     });
//     return totalPrice.toFixed(2);
//   };

//   const getNumberProduct = () => {
//     let totalProducts = 0;
//     cart.forEach(product => {
//       totalProducts += product.quantity;
//     });
//     return totalProducts;
//   };

//   const handleEmptyCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   const handlePaymentSuccess = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//     // Ajoutez ici la logique pour traiter le succès du paiement
//   };

//   return (
//     <div className='cart'>
//       <h2>Votre panier</h2>
//       <ul>
//         {cart.map((product, index) => (
//           <li key={index}>
//             <img src={product.image} alt={product.name} />
//             <div>
//               <h3>{product.name}</h3>
//               <p>Prix : {product.price}</p>
//               <p>Quantité : {product.quantity}</p>
//               <div className="cart-quantity-controls">
//                 <button onClick={() => changeQuantity(product, product.quantity - 1)}>-</button>
//                 <button onClick={() => changeQuantity(product, product.quantity + 1)}>+</button>
//               </div>
//               <button onClick={() => removeFromCart(product)}>Supprimer</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <hr />
//       <p className="cart-total">Total : {getTotalPrice()} €</p>
//       <p className="cart-number-products">Nombre de produits : {getNumberProduct()}</p>
//       <button className="empty-cart" onClick={handleEmptyCart}>Vider le panier</button>
//       <Stripe totalAmount={getTotalPrice()} onPaymentSuccess={handlePaymentSuccess} />
//     </div>
//   );
// };


// export default Cart;
