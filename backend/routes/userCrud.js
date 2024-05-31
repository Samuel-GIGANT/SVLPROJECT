import UserModel from '../models/userModel.js'; // Importer l'objet complet du modèle utilisateur
import { Router } from 'express';
const router = Router();

// Fonction pour créer un nouvel utilisateur
export async function createUser(req, res) {
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Fonction pour récupérer tous les utilisateurs
export async function getAllUsers(req, res) {
    try {
        const users = await UserModel.find(); // Utilisation de la méthode find directement sur le modèle utilisateur
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fonction pour récupérer un utilisateur par son ID
export async function getUserById(req, res) {
    try {
        const user = await UserModel.findById(req.params.id); // Utilisation de la méthode findById directement sur le modèle utilisateur
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fonction pour mettre à jour un utilisateur
export async function updateUser(req, res) {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Utilisation de la méthode findByIdAndUpdate directement sur le modèle utilisateur
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Fonction pour supprimer un utilisateur
export async function deleteUser(req, res) {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id); // Utilisation de la méthode findByIdAndDelete directement sur le modèle utilisateur
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default router;
