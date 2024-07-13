import React, { useEffect, useState } from 'react';
import './sound.css';
import { useCart } from '../Components/Stripe/CartContext';

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/products');
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setSelectedProducts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`http://localhost:3001/categories/`);
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Le produit a été ajouté au panier !");
  };

  const getCategoryNameById = (id) => {
    const category = categories.find(category => category._id === id);
    return category ? category.name : 'unknow';
  };

  const filteredProducts = selectedProducts
    .map(product => ({ ...product, categoryName: getCategoryNameById(product.category) }))
    .filter(product => product.categoryName.toLowerCase() === 'sound');

  console.log('cat: ', categories);
  console.log('selectedProducts: ', selectedProducts);
  console.log('filteredProducts: ', filteredProducts);

  return (
    <div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => {
          return (
            <div key={index} className="product-container">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-details">
                <div className="product-details-img">
                  {product.imageURL.map((image, idx) =>
                    <img key={`img-${product.name}-${idx}`} className="product-image" src={image} alt="" />
                  )}
                </div>
                <p className="product-description"><b>Description:</b><br /> {product.description}</p>
                <hr />
                <div className="product-description-end">
                  <p>Catégorie: {product.categoryName}</p>
                  <p>Quantité: {product.quantity}</p>
                  <p>Prix: {product.price} €</p>
                </div>
                <div className="btn">
                  <button onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="loading-message">Chargement des produits...</p>
      )}
    </div>
  );
};

export default Product;
