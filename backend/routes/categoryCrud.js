import { Router } from 'express';
import CategoryModel from '../models/categoryModel.js';
const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCategory = new CategoryModel(req.body); // Utilisez CategoryModel au lieu de Category
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await CategoryModel.find(); // Utilisez CategoryModel.find() au lieu de find()
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id); // Utilisez CategoryModel.findById() au lieu de findById()
        if (!category) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Utilisez CategoryModel.findByIdAndUpdate() au lieu de findByIdAndUpdate()
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id); // Utilisez CategoryModel.findByIdAndDelete() au lieu de findByIdAndDelete()
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }
        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
