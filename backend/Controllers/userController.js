// Importation du modèle User depuis le fichier userModel.js
import User from '../models/userModel.js';

// Importation des fonctions hash et compare de bcrypt pour le hachage de mots de passe
import { hash, compare } from 'bcrypt';

// Fonction pour créer un nouvel utilisateur
export const createUser = async (req, res) => {
  try {
    // Hachage du mot de passe fourni dans le corps de la requête
    const hashedPassword = await hash(req.body.password, 10);
    // Création d'un nouvel utilisateur avec les données fournies et le mot de passe haché
    const newUser = new User({ ...req.body, password: hashedPassword });
    // Sauvegarde du nouvel utilisateur dans la base de données
    await newUser.save();
    // Envoi d'une réponse avec le statut 201 (créé) et les données de l'utilisateur
    res.status(201).json(newUser);
  } catch (error) {
    // En cas d'erreur, envoi d'une réponse avec le statut 400 (requête incorrecte) et un message d'erreur
    res.status(400).json({ message: error.message });
  }
};

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    // Récupération de tous les utilisateurs depuis la base de données
    const users = await User.find();
    // Envoi d'une réponse avec le statut 200 (OK) et les données des utilisateurs
    res.status(200).json(users);
  } catch (error) {
    // En cas d'erreur, envoi d'une réponse avec le statut 500 (erreur serveur) et un message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
  try {
    // Récupération de l'utilisateur par son ID depuis la base de données
    const user = await User.findById(req.params.id);
    // Si l'utilisateur n'est pas trouvé, envoi d'une réponse avec le statut 404 (non trouvé) et un message
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    // Envoi d'une réponse avec le statut 200 (OK) et les données de l'utilisateur
    res.status(200).json(user);
  } catch (error) {
    // En cas d'erreur, envoi d'une réponse avec le statut 500 (erreur serveur) et un message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    // Mise à jour de l'utilisateur par son ID avec les nouvelles données fournies dans le corps de la requête
    // L'option { new: true } permet de retourner le document mis à jour
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Si l'utilisateur n'est pas trouvé, envoi d'une réponse avec le statut 404 (non trouvé) et un message
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    // Envoi d'une réponse avec le statut 200 (OK) et les données de l'utilisateur mis à jour
    res.status(200).json(updatedUser);
  } catch (error) {
    // En cas d'erreur, envoi d'une réponse avec le statut 400 (requête incorrecte) et un message d'erreur
    res.status(400).json({ message: error.message });
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    // Suppression de l'utilisateur par son ID depuis la base de données
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    // Si l'utilisateur n'est pas trouvé, envoi d'une réponse avec le statut 404 (non trouvé) et un message
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    // Envoi d'une réponse avec le statut 200 (OK) et un message de succès
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.log("coucou")
    // En cas d'erreur, envoi d'une réponse avec le statut 500 (erreur serveur) et un message d'erreur
    res.status(500).json({ message: error.message });
  }
};
