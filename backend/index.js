import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoute.js';
import Product from './models/productModel.js';
import orderRoutes from './routes/orderRoute.js';
import User from './models/userModel.js';
import { hash, compare } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Créer une instance de l'application Express
const app = express();

// Connexion à la base de données MongoDB
connect('mongodb://localhost:27017/svl', {})
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB', err);
  });

// Utilisation du middleware CORS pour permettre les requêtes cross-origin
app.use(cors({
  origin: '*'
}));

// Middleware pour parser les corps des requêtes en JSON
app.use(json());

// Utilisation des routes d'authentification
// app.use('/auth', authRoutes);

// Utilisation des routes CRUD pour chaque entité
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);

// Route user
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route product
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route register
app.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, adresse, tel } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet e-mail est déjà utilisé" });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, adresse, tel });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect" });
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (isPasswordCorrect) {
      console.log('Mot de passe correct');
      res.status(200).json({ user, message: "Connexion réussie" });
    } else {
      res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Port d'écoute du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
