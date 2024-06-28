import express from 'express';
import productController from '../Controllers/productController.js';

const router = express.Router();

// Route pour créer un nouveau produit
router.post('/', productController.createProduct);

// Route pour récupérer tous les produits
router.get('/', productController.getProducts);

// Route pour récupérer un produit par son ID
router.get('/:id', productController.getProductById);

// Route pour mettre à jour un produit
router.put('/:id', productController.updateProduct);

// Route pour supprimer un produit
router.delete('/:id', productController.deleteProduct);

export default router;
