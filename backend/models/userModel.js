// Import de Mongoose, une bibliothèque ODM pour MongoDB
import mongoose, { model } from 'mongoose';

// Extraction de l'objet Schema depuis Mongoose pour définir des schémas de données
const { Schema } = mongoose;

// Import de la fonction hash depuis bcrypt pour hacher les mots de passe
import { hash } from 'bcrypt';

// Définition du schéma d'utilisateur (userSchema)
const userSchema = new Schema({
  // Nom complet de l'utilisateur
  fullName: String,  // Type chaîne de caractères, champ non obligatoire

  // Adresse email de l'utilisateur
  email: String,  // Type chaîne de caractères, champ non obligatoire

  // Mot de passe de l'utilisateur
  password: String,  // Type chaîne de caractères, champ non obligatoire

  // Adresse de l'utilisateur
  adresse: String,  // Type chaîne de caractères, champ non obligatoire

  // Numéro de téléphone de l'utilisateur
  tel: Number,  // Type numérique, champ non obligatoire

  // Rôle de l'utilisateur
  role: {
    type: String,  // Type chaîne de caractères
    enum: ['user', 'admin'],  // Valeurs autorisées : 'user' ou 'admin'
    default: 'user'  // Valeur par défaut : 'user'
  }
});

// // Création du modèle 'User' basé sur le schéma 'userSchema'
const User = model("users", userSchema);

// Export du modèle 'User' pour utilisation dans d'autres parties de l'application
export default User;
