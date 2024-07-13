import React, { useEffect, useState } from 'react';
import './sound.css'; // Importation du fichier CSS pour styliser les produits
import { useCart } from '../Components/Stripe/CartContext'; // Importation du contexte du panier

const Product = () => {
  const [categories, setCategories] = useState([]); // État pour stocker les catégories
  const [selectedProducts, setSelectedProducts] = useState([]); // État pour stocker les produits sélectionnés
  const { addToCart } = useCart(); // Utilisation du contexte du panier pour ajouter des produits au panier

  // useEffect pour récupérer les produits lors du montage du composant
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/products'); // Appel à l'API pour récupérer les produits
        if (!res.ok) {
          throw new Error('Failed to fetch product'); // Gestion des erreurs de l'appel API
        }
        const data = await res.json(); // Conversion de la réponse en JSON
        setSelectedProducts(data); // Mise à jour de l'état des produits
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error); // Affichage de l'erreur en console
      }
    };
    fetchProducts();
  }, []); // Tableau de dépendances vide pour exécuter une seule fois lors du montage

  // useEffect pour récupérer les catégories lors du montage du composant
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`http://localhost:3001/categories/`); // Appel à l'API pour récupérer les catégories
        if (!res.ok) {
          throw new Error('Failed to fetch categories'); // Gestion des erreurs de l'appel API
        }
        const data = await res.json(); // Conversion de la réponse en JSON
        setCategories(data); // Mise à jour de l'état des catégories
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error); // Affichage de l'erreur en console
      }
    };
    fetchCategories();
  }, []); // Tableau de dépendances vide pour exécuter une seule fois lors du montage

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (product) => {
    addToCart(product); // Ajout du produit au panier via le contexte
    alert("Le produit a été ajouté au panier !"); // Alerte pour informer l'utilisateur
  };

  // Fonction pour obtenir le nom de la catégorie par ID
  const getCategoryNameById = (id) => {
    const category = categories.find(category => category._id === id); // Recherche de la catégorie par ID
    return category ? category.name : 'unknown'; // Retourne le nom de la catégorie ou 'unknown' si non trouvé
  };

  // Filtrage des produits pour obtenir uniquement ceux de la catégorie 'sound'
  const filteredProducts = selectedProducts
    .map(product => ({ ...product, categoryName: getCategoryNameById(product.category) })) // Ajout du nom de la catégorie à chaque produit
    .filter(product => product.categoryName.toLowerCase() === 'sound'); // Filtrage des produits de la catégorie 'sound'

  // Logs pour le debug
  console.log('cat: ', categories);
  console.log('selectedProducts: ', selectedProducts);
  console.log('filteredProducts: ', filteredProducts);

  return (
    <div>
      {filteredProducts.length > 0 ? (
        // Affichage des produits filtrés
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
        // Message de chargement si aucun produit filtré n'est trouvé
        <p className="loading-message">Chargement des produits...</p>
      )}
    </div>
  );
};

export default Product;
