import React, { useEffect, useState, useCallback } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './product.css';

const Product = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

//https://react.dev/reference/react/useCallback 
//useCallback sert à ce que fetcExistingProducts ne se recréer à chaque rendu de la fonction
  const fetchExistingProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      if (response.ok) {
        const existingProducts = await response.json();
        setProducts(existingProducts);
      } else {
        console.error('Failed to fetch existing products');
      }
    } catch (error) {
      console.error('Error fetching existing products:', error);
    }
  }, [setProducts]);

  useEffect(() => {
    fetchExistingProducts();
  }, [fetchExistingProducts]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const newData = await response.json();
        setProducts([...products, newData]);
        setNewProduct({ name: '', description: '', price: '', quantity: '' });
      } else {
        console.error('Erreur lors de la création du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
    }
  };

  const handleEdit = (productId) => {
    setSelectedProductId(productId);
    setIsEditing(true);
    const productToUpdate = products.find(product => product._id === productId);
    setNewProduct({
      name: productToUpdate.name,
      description: productToUpdate.description,
      price: productToUpdate.price,
      quantity: productToUpdate.quantity
    });
  };
  
  const handleCancelEdit = () => {
    setSelectedProductId(null);
    setIsEditing(false);
    setNewProduct({ name: '', description: '', price: '', quantity: '' });
  };
  
  const handleUpdate = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const updatedProducts = products.map(product => {
          if (product._id === productId) {
            return { ...product, ...newProduct };
          }
          return product;
        });
        setProducts(updatedProducts);
        setNewProduct({ name: '', description: '', price: '', quantity: '' });
        setSelectedProductId(null);
        setIsEditing(false);
      } else {
        console.error('Erreur lors de la mise à jour du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
      } else {
        console.error('Erreur lors de la suppression du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  return (
    <div className="prod">
      <div className='prod-form'>
        <h2>{isEditing ? 'Modifier le produit' : 'Créer un nouveau produit'}</h2>
        <form onSubmit={isEditing ? () => handleUpdate(selectedProductId) : handleSubmit}>
          <div>
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Prix :</label>
            <input
              type="text"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              />
          </div>
          <div>
            <label htmlFor="quantity">Quantité :</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</button>
          {isEditing && <button type="button" onClick={handleCancelEdit}>Annuler</button>}
        </form>
      </div>

      <h2>Produits</h2>
      {products && products.length > 0 ? (
        <ul className="existing_products">
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p className=''>{product.description}</p>
              <p>Prix : {product.price}</p>
              <p>Quantité : {product.quantity}</p>
              <div>
                <button className="btn_delete" onClick={() => handleDelete(product._id)}>
                  <FaTrash /> Supprimer
                </button>
                <button className="btn_update" onClick={() => handleEdit(product._id)}>
                  <FaEdit /> Modifier
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun produit disponible.</p>
      )}
    </div>
  );
};

export default Product;

