import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte CartContext
const CartContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useCart = () => useContext(CartContext);

// Provider du contexte CartContext
export const CartProvider = ({ children }) => {
  // État local pour le panier
  const [cart, setCart] = useState([]);

  // Chargement du panier depuis localStorage lors du premier rendu
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const cartData = savedCart ? JSON.parse(savedCart) : [];
    setCart(cartData);
  }, []);

  // Fonction pour sauvegarder le panier dans localStorage
  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    //renommage de id en _id
    console.log('produit rode: ', product)
    if (!product || !product._id) {
      console.error("Produit invalide :", product);
      return;
    }

    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  // Fonction pour retirer un produit du panier
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
  };

  // Fonction pour changer la quantité d'un produit dans le panier
  const changeQuantity = (product, newQuantity) => {
    if (!product || newQuantity < 0) {
      console.error("Produit invalide ou quantité incorrecte :", product, newQuantity);
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(product._id);
    } else {
      const updatedCart = cart.map(item => {
        if (item._id === product._id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

  // Fonction pour calculer le prix total du panier
  const getTotalPrice = () => {
    let totalPrice = 1; //FIXE:initiation de la valeur à 1 pour bypassé l'erreur stripe 'amount must be greater than 0.
    cart.forEach(product => {
      if (product.price) {
        const removeEuroSymbol = parseFloat(product.price.replace('€', ''));
        if (!isNaN(removeEuroSymbol)) {
          totalPrice += removeEuroSymbol * product.quantity;
        }
      }
    });

    return Number(totalPrice.toFixed(2));
  };

  // Fonction pour obtenir le nombre total de produits dans le panier
  const getNumberProduct = () => {
    let totalProducts = 0;
    cart.forEach(product => {
      totalProducts += product.quantity;
    });
    return totalProducts;
  };

  // Fonction pour vider complètement le panier
  const handleEmptyCart = () => {
    setCart([]);
  };

  // Sauvegarder le panier dans localStorage lorsque cart change
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  // Fournisseur du contexte CartContext, fournissant toutes les fonctions et états nécessaires
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQuantity, getTotalPrice, getNumberProduct, handleEmptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Export par défaut du contexte CartContext
export default CartContext;
