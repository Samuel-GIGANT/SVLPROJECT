import User from '../models/userModel.js';
import { compare } from 'bcrypt';

// Fonction pour enregistrer un nouvel utilisateur
const registerUser = async (req, res) => {
    try {
        // Créez un nouvel utilisateur en utilisant les données de la requête
        const newUser = new User(req.body); 
        // Enregistrez le nouvel utilisateur dans la base de données MongoDB
        await newUser.save();
        // Répondez avec le nouvel utilisateur créé
        res.status(201).json(newUser);
    } catch (error) {
        // En cas d'erreur, renvoyez un code d'erreur et le message d'erreur
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour gérer l'authentification de l'utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        // Trouvez l'utilisateur dans la base de données en fonction de l'adresse e-mail
        const user = await User.findOne({ email });
        console.log(email);
        if (!user) {
            return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect" });
        }
        // Vérifiez si le mot de passe est correct en le comparant avec le mot de passe haché de l'utilisateur
        const isPasswordCorrect = await compare(password, user.password);
        if (isPasswordCorrect) {
            // Mot de passe correct, connectez l'utilisateur
            res.status(200).json({ user, message: "Connexion réussie" });
        } else {
            // Mot de passe incorrect
            res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect" });
        }
    } catch (error) {
        // En cas d'erreur, renvoyez un code d'erreur et le message d'erreur
        res.status(500).json({ message: "Erreur serveur lors de l'authentification" });
    }
};


export { registerUser, loginUser };
