import React, { useEffect, useState } from 'react';
import './video.css';
import { useCart } from '../Components/Stripe/CartContext'; 

const Product = () => {
  const [selectedProducts, setSelectedProducts] = useState(null);
  const { addToCart } = useCart();

   // Tableau des URL des images
   const productImages = [
    "./Blackmagic-Studio-Camera-4K-Pro-G2-Angle-scaled.jpg",
    "./Blackmagic-Studio-Camera-4K-Pro-G2-Back-scaled.jpg",
    "./Blackmagic-Studio-Camera-4K-Pro-G2-Left-scaled.jpg",
    "./Blackmagic-Studio-Camera-4K-Pro-G2-Right-scaled.jpg"
  ];

  // useEffect(() => {
  //   // Récupérer le produit avec son ID lors du montage du composant
  //   const productIds = ['665ee4e3c8d09bbf8489d88a', '66605836cc74a6cb2161f99b', '666058f6cc74a6cb2161f99d];
  //   fetchProductById(productIds);
  // }, []);
  
  useEffect(() => {
    // Récupérer le produit avec son ID lors du montage du composant
    fetchProductById('665ee4e3c8d09bbf8489d88a');
  }, []);

  const fetchProductById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await res.json();
      setSelectedProducts(data);
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
      {selectedProducts ? (
        <div className="product-container">
          <h2 className="product-name">{selectedProducts.name}</h2>
          <div className="product-details">
            <div className="product-details-img">
              {productImages.map((src, index) => (
                <img key={index} className="product-image" src={src} alt={`Product view ${index + 1}`} />
              ))}
            </div>
            <p className="product-description"><b>Description:</b><br /> {selectedProducts.description}</p>
            <hr />
            <div className="product-description-end">
              <p>Categorie: {selectedProducts.category}</p>
              <p>Quantité: {selectedProducts.quantity}</p>
              <p>Prix: {selectedProducts.price} €</p>
            </div>
            <div className="btn">
              <button onClick={() => handleAddToCart(selectedProducts)}>Ajouter au panier</button>
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
