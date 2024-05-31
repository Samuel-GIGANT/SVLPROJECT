import express from 'express';
import { createOrderDetail, getAllOrderDetails, getOrderDetailById, updateOrderDetail, deleteOrderDetail } from '../controllers/orderDetailController.js';

const router = express.Router();

router.post('/order-details', createOrderDetail); // Utilisez createOrderDetail directement
router.get('/order-details', getAllOrderDetails); // Utilisez getAllOrderDetails directement
router.get('/order-details/:id', getOrderDetailById); // Utilisez getOrderDetailById directement
router.put('/order-details/:id', updateOrderDetail); // Utilisez updateOrderDetail directement
router.delete('/order-details/:id', deleteOrderDetail); // Utilisez deleteOrderDetail directement

export default router;
