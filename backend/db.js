// Importation du module 'connect' de 'mongoose' pour gérer les connexions à la base de données MongoDB
import { connect } from 'mongoose';

// Chargement des variables d'environnement depuis un fichier .env
require('dotenv').config();

// Définition d'une fonction asynchrone pour se connecter à la base de données MongoDB
const connectDB = async () => {
  try {
    // Affichage d'un message de connexion avec l'URI de MongoDB dans la console
    console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);
    
    // Connexion à MongoDB en utilisant l'URI stockée dans les variables d'environnement
    const conn = await connect(process.env.MONGODB_URI);
    
    // Affichage d'un message confirmant la connexion réussie à MongoDB
    console.log('MongoDB Connected');
  } catch (err) {
    // Affichage d'un message d'erreur en cas de problème de connexion
    console.error('MongoDB connection error:', err);
    
    // Arrêt du processus avec un code d'erreur 1 pour indiquer l'échec de la connexion
    process.exit(1);
  }
};

// Exportation de la fonction connectDB pour qu'elle puisse être utilisée dans d'autres fichiers
export default connectDB;
