import User from '../models/userModel.js'; 

export async function createUser(req, res) {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find(); // Utiliser la fonction find à partir de User
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id); // Utiliser la fonction findById à partir de User
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Utiliser la fonction findByIdAndUpdate à partir de User
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); // Utiliser la fonction findByIdAndDelete à partir de User
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};