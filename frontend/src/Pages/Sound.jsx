// sound.jsx

import React, { useEffect, useState } from 'react';
import './sound.css';

const Product = ({ initialProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Récupérer le produit avec son ID lors du montage du composant
    fetchProductById('665ee4e3c8d09bbf8489d88a');
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

  return (
    <div>
      {selectedProduct ? (
        <div className="product-container">
          <h2 className="product-name">{selectedProduct.name}</h2>
          <div className="product-details">
            <div className="product-details-img">
              <img className="product-image" src="./Blackmagic-Studio-Camera-4K-Pro-G2-Angle-scaled.jpg" alt="" />
              <img className="product-image" src="./Blackmagic-Studio-Camera-4K-Pro-G2-Back-scaled.jpg" alt="" />
              <img className="product-image" src="./Blackmagic-Studio-Camera-4K-Pro-G2-Left-scaled.jpg" alt="" />
              <img className="product-image" src="./Blackmagic-Studio-Camera-4K-Pro-G2-Right-scaled.jpg" alt="" />
            </div>
            <p className="product-description"><b>Description:</b><br /> {selectedProduct.description}</p>
            <hr />
            <div className="product-description-end">
              <p>Categorie: {selectedProduct.category}</p>
              <p>Quantité: {selectedProduct.quantity}</p>
              <p>Prix: {selectedProduct.price}</p>
            </div>
          <div className="btn">
            <button>Ajouter au panier</button>
          </div>
          </div>
        </div>
      ) : (
        <p className="loading-message">Chargement du produit...</p>
      )}
    </div>
  );
};


export default Product;
