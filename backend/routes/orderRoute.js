import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../Controllers/orderController.js';

const router = express.Router();

// Route pour créer une nouvelle commande
router.post('/order', createOrder);
// Route pour récupérer toutes les commandes
router.get('/orders', getAllOrders);
// Route pour récupérer une commande par son ID
router.get('/order/:id', getOrderById);
// Route pour mettre à jour une commande par son ID
router.put('/order/:id', updateOrder);
// Route pour supprimer une commande par son ID
router.delete('/order/:id', deleteOrder);


export default router;

