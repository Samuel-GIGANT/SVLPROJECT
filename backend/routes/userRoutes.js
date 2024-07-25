import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../Controllers/userController.js';

const router = express.Router();

router.post('/', createUser); // Route pour créer un utilisateur
router.get('/', getAllUsers); // Route pour obtenir tous les utilisateurs
router.get('/:id', getUserById); // Route pour obtenir un utilisateur par ID
router.put('/:id', updateUser); // Route pour mettre à jour un utilisateur par ID
router.delete('/:id', deleteUser); // Route pour supprimer un utilisateur par ID

export default router;
