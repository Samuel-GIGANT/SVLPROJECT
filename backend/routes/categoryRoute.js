import express from 'express';
import categoryController from '../Controllers/categoryController.js';

const router = express.Router();

// Route pour créer un nouveau produit
router.post('/', categoryController.createCategory);

// Route pour récupérer tous les produits
router.get('/', categoryController.getAllCategories);

// Route pour récupérer un produit par son ID
router.get('/:id', categoryController.getCategoryById);

// Route pour mettre à jour un produit
router.put('/:id', categoryController.updateCategory);

// Route pour supprimer un produit
router.delete('/:id', categoryController.deleteCategory);

export default router;