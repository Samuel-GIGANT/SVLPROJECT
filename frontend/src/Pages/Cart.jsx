import React, { useState, useEffect } from 'react';
import './cart.css';  // Importer le fichier CSS

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function addCart(product) {
  let cart = getCart();
  let foundProduct = cart.find(p => p.id === product.id);
  if (foundProduct) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart(cart);
}

function removeCart(product) {
  let cart = getCart();
  cart = cart.filter(p => p.id !== product.id);
  saveCart(cart);
}

function changeQuantity(product, quantity) {
  let cart = getCart();
  let foundProduct = cart.find(p => p.id === product.id);
  if (foundProduct) {
    foundProduct.quantity = quantity;
    if (foundProduct.quantity <= 0) {
      removeCart(foundProduct);
    } else {
      saveCart(cart);
    }
  }
}

function getNumberProduct() {
  let cart = getCart();
  let numberProduct = 0;
  cart.forEach(product => {
    numberProduct += product.quantity;
  });
  return numberProduct;
}

function getTotalPrice() {
  let cart = getCart();
  let totalPrice = 0;
  cart.forEach(product => {
    // Supprime le symbole "€" et convertit le prix en nombre
    const removeEuroSymbol = parseFloat(product.price.replace('€', ''));
    // Vérifie si le prix est un nombre valide
    if (!isNaN(removeEuroSymbol)) {
      totalPrice += removeEuroSymbol * product.quantity;
    }
  });
  return totalPrice;
}

function emptyCart() {
  saveCart([]);
}

function Cart() {
  const [cart, setCart] = useState(getCart());
  const [showAlert, setShowAlert] = useState(false); // Ajouter une variable d'état pour gérer l'affichage de l'alerte
  const [isCartValidated, setIsCartValidated] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  // Effet pour afficher l'alerte lorsque le produit est supprimé du panier
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Fonction pour supprimer un produit du panier
  const handleRemoveProduct = (product) => {
    removeCart(product);
    setCart(getCart());
    setShowAlert(true); 
  };

  // Fonction pour valider le panier et passer la commande
  const handleCheckout = () => {
    if (cart.length > 0) {
      // Mettez ici la logique pour passer la commande (par exemple, envoyer les données au serveur, etc.)
      emptyCart(); 
      setIsCartValidated(true); 
      setShowAlert(true); 
    }
  };

  // Fonction pour vider le panier
  const handleEmptyCart = () => {
    emptyCart();
    setCart(getCart());
    setShowAlert(true); 
  };

  return (
    <div className='cart'>
      <h2>Votre panier</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>Prix : {product.price} </p>
              <p>Quantité : {product.quantity}</p>
              <div className="cart-quantity-controls">
                <button onClick={() => {
                  changeQuantity(product, product.quantity - 1);
                  setCart(getCart());
                }}>-</button>
                <button onClick={() => {
                  changeQuantity(product, product.quantity + 1);
                  setCart(getCart());
                }}>+</button>
              </div>
              <button onClick={() => handleRemoveProduct(product)}>Supprimer</button>
            </div>
          </li>
        ))}
        <hr />
      </ul>
      <p className="cart-total">Total : {getTotalPrice()} €</p>
      <p className="cart-number-products">Nombre de produits : {getNumberProduct()}</p>
      <button className="empty-cart" onClick={handleEmptyCart}>Vider le panier</button>
      <button className="checkout-btn" onClick={handleCheckout}>Valider le panier et passer commande</button>
      {showAlert && <div className="cart-alert">Produit(s) supprimé(s) du panier !</div>} {/* Afficher l'alerte si showAlert est vrai */}
      {isCartValidated && <div className="cart-confirmation">Commande passée avec succès !</div>} {/* Afficher le message de confirmation si la commande est validée */}
    </div>
  );
}

export { getCart, saveCart, addCart, getNumberProduct, Cart as default };
