import React, { useEffect, useState } from 'react';
import './sound.css';
import { useCart } from '../Components/Stripe/CartContext';

const Product = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { addToCart } = useCart();

  // Définir imageArray avec les images correspondant à chaque ID de produit
  const imageArray = [
    {
      // id: '667c42c79389e8274682d920',
      images: [
        { src: './rodeVideoMicGo.jpg', alt: 'Product 1 Image 1' }
      ]
    },
    {
      id: '667c4906b569fc47e851dc36',
      images: [
        { src: './microRode2.jpg', alt: 'Product 2 Image 1' },
        { src: './microRode1.jpg', alt: 'Product 2 Image 2' }
      ]
    }
  ];

  useEffect(() => {
    // Récupérer les produits avec leurs IDs lors du montage du composant
    const productIds = ['667c42c79389e8274682d920', '667c4906b569fc47e851dc36'];
    fetchProductsByIds(productIds);
  }, []);

  const fetchProductsByIds = async (ids) => {
    try {
      const promises = ids.map(async id => {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        return data;
      });
      const products = await Promise.all(promises);
      setSelectedProducts(products);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Le produit a été ajouté au panier !");
  };

  return (
    <div>
      {selectedProducts.length > 0 ? (
        selectedProducts.map((product, index) => {
          // Trouver l'objet correspondant dans imageArray
          const productImages = imageArray.find(imageObj => imageObj.id === product.id);

          return (
            <div key={index} className="product-container">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-details">
                <div className="product-details-img">
                  {productImages && productImages.images.map((image, imageIndex) => (
                    <img key={imageIndex} className="product-image" src={image.src} alt={image.alt} />
                  ))}
                </div>
                <p className="product-description"><b>Description:</b><br /> {product.description}</p>
                <hr />
                <div className="product-description-end">
                  <p>Catégorie: {product.category}</p>
                  <p>Quantité: {product.quantity}</p>
                  <p>Prix: {product.price} €</p>
                </div>
                <div className="btn">
                  <button onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
                </div>
                <div className="sound-alert">Produit ajouté !</div>
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
