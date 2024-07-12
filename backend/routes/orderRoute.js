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

// router.post('/', async (req, res) => {
//     try {
//         const newOrder = new Order(req.body);
//         await newOrder.save();
//         res.status(201).json(newOrder);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const orders = await Order.find(); // Utilisez la méthode find() du modèle Order
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id); // Utilisez la méthode findById() du modèle Order
//         if (!order) {
//             return res.status(404).json({ message: 'Commande introuvable' });
//         }
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Utilisez la méthode findByIdAndUpdate() du modèle Order
//         if (!updatedOrder) {
//             return res.status(404).json({ message: 'Commande introuvable' });
//         }
//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedOrder = await Order.findByIdAndDelete(req.params.id); // Utilisez la méthode findByIdAndDelete() du modèle Order
//         if (!deletedOrder) {
//             return res.status(404).json({ message: 'Commande introuvable' });
//         }
//         res.status(200).json({ message: 'Commande supprimée avec succès' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// export default router;
