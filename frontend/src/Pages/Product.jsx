import React, { useEffect, useState } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/Product');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      coucou
      {products.map(product => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Quantité: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
