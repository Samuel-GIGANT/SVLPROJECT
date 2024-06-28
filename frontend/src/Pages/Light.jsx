import React, { useEffect, useState } from 'react';
import './light.css';

const Light = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Effectuer une requête à l'API pour récupérer les produits de la catégorie
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products?category=${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };

    fetchProducts();
  }, [category]); // Refaire la requête si la catégorie change

  return (
    <div className='light'>
      <h1>{category}</h1>
      <div className="light-container">
        {products.map((product) => (
          <div key={product._id} className="light-card">
            <h2>{product.name}</h2>
            <div><img src={product.image} alt="light thumbnail" /></div>
            <p>{product.description}</p>
            <p><b>Quantité:</b> {product.quantity}</p>
            <p><b>Prix:</b> {product.price}€</p>
            <button>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Light;
