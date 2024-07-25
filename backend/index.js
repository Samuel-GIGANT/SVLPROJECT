// Importation des modules nécessaires
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import stripeRoute from './routes/stripeRoute.js';
import dotenv from 'dotenv';    
import Stripe from 'stripe';

// Chargement des variables d'environnement depuis un fichier .env
dotenv.config();

// Initialisation de Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Création d'une instance de l'application Express
const app = express();

// Connexion à la base de données MongoDB
connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Utilisation du middleware CORS pour permettre les requêtes cross-origin
app.use(cors({
  origin: '*'
}));

// Middleware pour parser les corps des requêtes en JSON
app.use(json());

// Utilisation des routes CRUD pour chaque entité
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/register', authRoutes);
app.use('/login', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/create-payment-intent', stripeRoute);


// Port d'écoute du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
