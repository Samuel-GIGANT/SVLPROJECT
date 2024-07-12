// Import de Mongoose, une bibliothèque ODM(Object, Data, Modeling) pour MongoDB
import mongoose from 'mongoose';

// Extraction de l'objet Schema depuis Mongoose pour définir des schémas de données
const { Schema } = mongoose;

// Définition du schéma de commande (orderSchema)
const orderSchema = new Schema({
  // Montant total de la commande
  total_Amount: {
    type: Number,         // Type numérique
    required: true,       // Champ obligatoire
    min: 0                // Valeur minimale de 0 (ne peut pas être négative)
  },
  // Statut de la commande
  order_Status: {
    type: String,         // Type chaîne de caractères
    required: true,       // Champ obligatoire
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], // Valeurs autorisées
    default: 'Pending'    // Valeur par défaut 'Pending' (En attente)
  },
  // Date de la commande
  order_Date: {
    type: Date,           // Type date
    default: Date.now     // Valeur par défaut : date et heure actuelles
  },
  // Référence à l'utilisateur ayant passé la commande
  user: {
    type: Schema.Types.ObjectId, // Type identifiant d'objet MongoDB
    ref: 'User',                 // Référence au modèle 'User'
    required: true               // Champ obligatoire
  },
  // Référence au produit commandé
  product: {
    type: Schema.Types.ObjectId, // Type identifiant d'objet MongoDB
    ref: 'Product',              // Référence au modèle 'Product'
    required: true               // Champ obligatoire
  }
});

// Création du modèle 'Order' basé sur le schéma 'orderSchema'
const Order = mongoose.model("Order", orderSchema);

// Export du modèle 'Order' pour utilisation dans d'autres parties de l'application
export default Order;
