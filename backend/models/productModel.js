// Import de Mongoose, une bibliothèque ODM pour MongoDB
import mongoose from 'mongoose';

// Extraction de l'objet Schema depuis Mongoose pour définir des schémas de données
const { Schema } = mongoose;

// Définition du schéma de produit (productSchema)
const productSchema = new mongoose.Schema({
  // Nom du produit
  name: String,  // Type chaîne de caractères, champ non obligatoire

  // Description du produit
  description: String,  // Type chaîne de caractères, champ non obligatoire

  // Marque du produit
  marque: String,  // Type chaîne de caractères, champ non obligatoire

  // Prix du produit
  price: {
    type: String,  // Type chaîne de caractères (devrait idéalement être Number pour des prix)
    required: true // Champ obligatoire
  },

  // Quantité de produits en stock
  quantity: {
    type: Number,  // Type numérique
    required: true // Champ obligatoire
  },

  // Catégorie du produit
  category: {
    type: mongoose.Schema.Types.ObjectId, // Type identifiant d'objet MongoDB
    ref: 'Category'                      // Référence au modèle 'Category'
  }
});

// Création du modèle 'Product' basé sur le schéma 'productSchema'
const Product = mongoose.model('Products', productSchema);

// Export du modèle 'Product' pour utilisation dans d'autres parties de l'application
export default Product;
