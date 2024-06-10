import Category from '../models/categoryModel.js';

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
        const categories = await Category.find(); // Utilisation de Category.find()
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getCategoryById(req, res) {
    try {
        const category = await Category.findById(req.params.id); // Utilisation de Category.findById()
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
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Utilisation de Category.findByIdAndUpdate()
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
        const deletedCategory = await Category.findByIdAndDelete(req.params.id); // Utilisation de Category.findByIdAndDelete()
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }
        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
