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
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // console.log('Initializing cart from localStorage:', savedCart);
    setCart(savedCart);
  }, []);

  // Fonction pour sauvegarder le panier dans localStorage
  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    // console.log('Adding product to cart:', product);
    // On vérifie si le produit est déjà dans le panier
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
    console.log ('update cart:', cart)
  };

  // Fonction pour retirer un produit du panier
  const removeFromCart = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Fonction pour changer la quantité d'un produit dans le panier
  const changeQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      const updatedCart = cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };

  // Fonction pour calculer le prix total du panier
  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(product => {
      if (product.price) {
        const removeEuroSymbol = parseFloat(product.price.replace('€', ''));
        if (!isNaN(removeEuroSymbol)) {
          totalPrice += removeEuroSymbol * product.quantity;
        }
      }
    });

    const totalPriceNumber = Number(totalPrice.toFixed(2));

    return totalPriceNumber;
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
    localStorage.removeItem('cart');
  };

  // Fournisseur du contexte CartContext, fournissant toutes les fonctions et états nécessaires
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQuantity, getTotalPrice, getNumberProduct, handleEmptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Export par défaut du contexte CartContext
export default CartContext;
