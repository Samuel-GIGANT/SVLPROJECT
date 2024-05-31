import Product from '../models/productModel.js';

// Fonction pour créer un nouveau produit
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour récupérer tous les produits
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour récupérer un produit par son ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un produit
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour supprimer un produit
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit introuvable' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour migrer les données
export const migrateData = async (req, res) => {
    try {
        // Récupérez tous les produits de la base de données
        const products = await Product.find();

        // Parcourez chaque produit et effectuez les modifications nécessaires
        for (const product of products) {
            // Par exemple, vous pouvez ajouter le champ "marque" à chaque produit
            product.marque = 'VotreMarque';
            // Enregistrez les modifications dans la base de données
            await product.save();
        }

        // Répondez avec un message de succès
        res.status(200).json({ message: 'Migration des données terminée avec succès' });
    } catch (error) {
        // En cas d'erreur, répondez avec un code d'erreur et le message d'erreur
        console.error('Erreur lors de la migration des données :', error);
        res.status(500).json({ error: 'Erreur lors de la migration des données' });
    }
};

export default migrateData;
