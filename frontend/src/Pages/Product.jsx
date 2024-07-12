import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './product.css';

const Product = () => {
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    marque: '',
    price: '',
    quantity: '',
    category: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);

  // Fetch des produits existants au montage du composant
  useEffect(() => {
    const fetchExistingProducts = async () => {
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
    };
    fetchExistingProducts()
  }, [])

  // Fetch des catégories au montage du composant
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories');
        if (response.ok) {
          const categoriesData = await response.json();
          setCategories(categoriesData);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Mise à jour des champs du formulaire
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Validation simple du formulaire
  const validateForm = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.category) {
      setMessage('Veuillez remplir tous les champs obligatoires.');
      return false;
    }
    return true;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        setNewProduct({ name: '', description: '', marque: '', price: '', quantity: '', category: '' });
        setMessage('Produit ajouté avec succès.');
      } else {
        console.error('Erreur lors de la création du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
    }
  };

  // Édition d'un produit existant
  const handleEdit = (productId) => {
    setSelectedProductId(productId);
    setIsEditing(true);
    const productToUpdate = products.find(product => product._id === productId);
    setNewProduct({
      name: productToUpdate.name,
      description: productToUpdate.description,
      marque: productToUpdate.marque,
      price: productToUpdate.price,
      quantity: productToUpdate.quantity,
      category: productToUpdate.category || ''
    });
    setMessage(null);
  };

  // Annulation de l'édition
  const handleCancelEdit = () => {
    setSelectedProductId(null);
    setIsEditing(false);
    setNewProduct({ name: '', description: '', marque: '', price: '', quantity: '', category: '' });
    setMessage(null);
  };

  // Mise à jour d'un produit existant
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
        setNewProduct({ name: '', description: '', marque: '', price: '', quantity: '', category: '' });
        setSelectedProductId(null);
        setIsEditing(false);
        setMessage('Produit mis à jour avec succès.');
      } else {
        console.error('Erreur lors de la mise à jour du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };

  // const handleDelete = async (productId) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/products/${productId}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       const updatedProducts = products.filter(product => product._id !== productId);
  //       setProducts(updatedProducts);
  //       setMessage('Produit supprimé avec succès.');
  //     } else {
  //       const errorText = await response.text(); // Récupérer le texte brut de la réponse en cas d'erreur
  //       console.error('Erreur lors de la suppression du produit:', errorText);
  //       setMessage(`Erreur lors de la suppression du produit: ${errorText}`);
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression du produit:', error);
  //     setMessage(`Erreur lors de la suppression du produit: ${error.message}`);
  //   }
  // };


  // Suppression d'un produit
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
        setMessage('Produit supprimé avec succès.');
      } else {
        console.error('Erreur lors de la suppression du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  // Changement de la catégorie du produit
  const handleCategoryChange = (e) => {
    setNewProduct({ ...newProduct, category: e.target.value });
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
            <label htmlFor="marque">Marque :</label>
            <input
              type="text"
              id="marque"
              name="marque"
              value={newProduct.marque}
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
          <div>
            <label htmlFor="category">Catégorie :</label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleCategoryChange}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</button>
          {isEditing && <button type="button" onClick={handleCancelEdit}>Annuler</button>}
          {message && <p>{message}</p>}
        </form>
      </div>

      <h2>Produits</h2>
      {products && products.length > 0 ? (
        <ul className="existing_products">
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p className=''>{product.description}</p>
              <p><b>Marque :</b> {product.marque}</p>
              <p>Prix : {product.price}</p>
              <p>Quantité : {product.quantity}</p>
              <p><b>Catégorie :</b> {product.category && product.category.name}</p>
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
