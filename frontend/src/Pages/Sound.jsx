import React, { useEffect, useState } from 'react';
import './sound.css';
import { addCart, getCart, saveCart } from './Cart';

const Product = ({ initialProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Récupérer le produit avec son ID lors du montage du composant
    fetchProductById('6659f41d9d014ef1d3555e94');
  }, []);

  const fetchProductById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      const data = await res.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du produit :', error);
    }
  };
  const handleAddToCart = (product) => {
    addCart(product);
    alert("Le produit a été ajouté au panier !");
  };

  return (
    <div>
      {selectedProduct ? (
        <div className="product-container">
          <h2 className="product-name">{selectedProduct.name}</h2>
          <div className="product-details">
            <div className="product-details-img">
              <img className="product-image" src="./microrode2.jpg" alt="" />
              <img className="product-image" src="" alt="" />
            </div>
            <p className="product-description"><b>Description:</b><br /> {selectedProduct.description}</p>
            <hr />
            <div className="product-description-end">
              <p>Categorie: {selectedProduct.category}</p>
              <p>Quantité: {selectedProduct.quantity}</p>
              <p>Prix: {selectedProduct.price} €</p>
            </div>
            <div className="btn">
              <button onClick={() => handleAddToCart(selectedProduct)}>Ajouter au panier</button>
            </div>
            <div className="sound-alert">Produit ajouté !</div>
          </div>
        </div>
      ) : (
        <p className="loading-message">Chargement du produit...</p>
      )}
    </div>
  );
};

export default Product;
