// import express, { json } from 'express';
// import { connect } from 'mongoose';
// import cors from 'cors';
// import userRoutes from './routes/userRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import categoryRoutes from './routes/categoryRoute.js';
// import productRoutes from './routes/productRoute.js';
// import User from './models/userModel.js';
// import { hash, compare } from 'bcrypt';

// // Créer une instance de l'application Express
// const app = express();

// // Utilisation du middleware CORS pour permettre les requêtes cross-origin
// app.use(cors());

// // Middleware pour parser les corps des requêtes en JSON
// app.use(json());

// // Connexion à la base de données MongoDB
// connect('mongodb://localhost:27017/svl', {
// }).then(() => {
//   console.log('Connexion à MongoDB réussie');
// }).catch((err) => {
//   console.error('Erreur de connexion à MongoDB', err);
// });

// // Utilisation des routes d'authentification
// app.use('/auth', authRoutes);

// // Utilisation des routes CRUD pour chaque entité
// app.use('/users', userRoutes);
// app.use('/categories', categoryRoutes);
// app.use('/products', productRoutes);


// // Route user
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find(); // Utilisez directement user.find()
//     console.log(users);
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/users', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id); // Utilisez directement user.findById()
//     if (!user) {
//       return res.status(404).json({ message: 'Utilisateur introuvable' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.put('/users/:id', async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Utilisez directement user.findByIdAndUpdate()
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'Utilisateur introuvable' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.delete('/users/:id', async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id); // Utilisez directement user.findByIdAndDelete()
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'Utilisateur introuvable' });
//     }
//     res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Route register
// app.post('/register', async (req, res) => {
//   try {
//     const { fullName, email, password, adresse, tel } = req.body;
//     // Vérifier si l'utilisateur existe déjà
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Cet e-mail est déjà utilisé" });
//     }
//     // Hacher le mot de passe
//     const hashedPassword = await hash(password, 10);
//     // Créer un nouvel utilisateur avec le mot de passe haché
//     const newUser = new User({ fullName, email, password: hashedPassword, adresse, tel });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Route login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Rechercher l'utilisateur dans la base de données par e-mail
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect" });
//     }
//     // Comparer le mot de passe envoyé avec le mot de passe haché stocké en base de données
//     const isPasswordCorrect = await compare(password, user.password);
//     if (isPasswordCorrect) {
//       // Authentification réussie
//       // res.status(200).json({ message: "Connexion réussie" });
//       res.status(200).json({ user });
//     } else {
//       // Mot de passe incorrect
//       res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect" });
//     }
//   } catch (error) {
//     // Erreur de serveur
//     res.status(500).json({ message: error.message });
//   }
// });

// // Port d'écoute du serveur
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
// });






// // Importation des modules nécessaires
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
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

// // Utilisation des routes CRUD pour chaque entité
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/register', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/create-payment-intent', stripeRoute);
app.use('/login', loginRoutes);
app.use('/auth', authRoutes);




// Port d'écoute du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
