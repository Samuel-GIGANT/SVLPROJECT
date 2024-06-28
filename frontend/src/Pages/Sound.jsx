import React, { useEffect, useState } from 'react';
import './sound.css';
import { useCart } from '../Components/Stripe/CartContext';



const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const imageArray = [
    { src: './microRode1.jpg', alt: 'Product 1' },
    { src: './microRode2.jpg', alt: 'Product 2' }
  ];

  useEffect(() => {
    // Récupérer le produit avec son ID lors du montage du composant
    fetchProductById('667c42c79389e8274682d920');
  }, []);

  const fetchProductById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await res.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du produit :', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Le produit a été ajouté au panier !");
  };



  return (
    <div>
      {selectedProduct ? (
        <div className="product-container">
          <h2 className="product-name">{selectedProduct.name}</h2>
          <div className="product-details">
            <div className="product-details-img">
              {imageArray.map((image, index) => (
                <img key={index} className="product-image" src={image.src} alt={image.alt} />
              ))}
            </div>
            <p className="product-description"><b>Description:</b><br /> {selectedProduct.description}</p>
            <hr />
            <div className="product-description-end">
              <p>Catégorie: {selectedProduct.category}</p>
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
