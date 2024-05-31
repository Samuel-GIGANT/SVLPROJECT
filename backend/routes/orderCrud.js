import { Router } from 'express';
import Order from '../models/orderModel.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find(); // Utilisez la méthode find() du modèle Order
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id); // Utilisez la méthode findById() du modèle Order
        if (!order) {
            return res.status(404).json({ message: 'Commande introuvable' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Utilisez la méthode findByIdAndUpdate() du modèle Order
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Commande introuvable' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id); // Utilisez la méthode findByIdAndDelete() du modèle Order
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Commande introuvable' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
