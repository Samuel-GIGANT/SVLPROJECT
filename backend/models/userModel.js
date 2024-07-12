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

// Middleware pré-enregistrement pour hacher le mot de passe de l'utilisateur avant de le sauvegarder dans la base de données
userSchema.pre('save', async function (next) {
  // Si le mot de passe n'a pas été modifié, passer au middleware suivant
  if (!this.isModified('password')) {
    return next();
  }
  try {
    // Hachage du mot de passe avec bcrypt, le facteur de coût est 10
    const hashedPassword = await hash(this.password, 10);
    // Remplacement du mot de passe par le mot de passe haché
    this.password = hashedPassword;
    next();  // Passer au middleware suivant
  } catch (error) {
    return next(error);  // Passer l'erreur au middleware suivant
  }
});

// Création du modèle 'User' basé sur le schéma 'userSchema'
const User = model("users", userSchema);

// Export du modèle 'User' pour utilisation dans d'autres parties de l'application
export default User;
