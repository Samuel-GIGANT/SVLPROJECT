import React, { useState, useEffect } from 'react';
import './productsDetails.css';

const ProductsDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois après le premier rendu

  return (
    <div>
      <h1>Détails des Produits</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Prix: {product.price} €</p>
            <p>category: {product.category} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsDetails;
