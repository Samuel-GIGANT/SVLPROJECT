import Category, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/categoryModel.js';

export async function createCategory(req, res) {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getAllCategories(req, res) {
    try {
        const categories = await find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getCategoryById(req, res) {
    try {
        const category = await findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateCategory(req, res) {
    try {
        const updatedCategory = await findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteCategory(req, res) {
    try {
        const deletedCategory = await findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }
        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
