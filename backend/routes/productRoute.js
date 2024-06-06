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
// // Fonction pour créer un nouveau produit
// export const createProduct = async (req, res) => {
//     // Code pour créer un nouveau produit
// };

// // Fonction pour récupérer tous les produits
// export const getAllProducts = async (req, res) => {
//     // Code pour récupérer tous les produits
// };

// // Fonction pour récupérer un produit par son ID
// export const getProductById = async (req, res) => {
//     // Code pour récupérer un produit par son ID
// };

// // Fonction pour mettre à jour un produit
// export const updateProduct = async (req, res) => {
//     // Code pour mettre à jour un produit
// };

// // Fonction pour supprimer un produit
// export const deleteProduct = async (req, res) => {
//     // Code pour supprimer un produit
// };


// export default Product;