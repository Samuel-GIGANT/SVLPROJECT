import React, { useEffect, useState } from 'react';

const Product = ({ initialProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Récupérer le produit avec son ID lors du montage du composant
    fetchProductById('665ee4e3c8d09bbf8489d88a');
    console.log('665ee4e3c8d09bbf8489d88a')
  }, []);

  const fetchProductById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/Product/${id}`);
      const data = await res.json();
      console.log('665ee4e3c8d09bbf8489d88a')
      setSelectedProduct(data);
      
    } catch (error) {
      console.error('Erreur lors de la récupération du produit :', error);
    }
  };

  return (
    <div>
      {selectedProduct ? (
        <div>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.marque}</p>
          <p>{selectedProduct.description}</p>
          <p>Quantité: {selectedProduct.quantity}</p>
          <p>Prix: {selectedProduct.price}</p>
        </div>
      ) : (
        <p>Chargement du produit...</p>
      )}
    </div>
  );
};

export default Product;