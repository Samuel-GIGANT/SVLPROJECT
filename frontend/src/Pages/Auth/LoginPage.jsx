// Importer les modules nécessaires de React et React Router
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Importer le service de connexion
import { login } from '../../Services/AuthServices';
// Importer le fichier CSS pour le style de la page de connexion
import './loginPage.css';

function LoginPage() {
  // Définir l'état initial des champs du formulaire de connexion
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  // État pour stocker les messages d'erreur ou de succès
  const [message, setMessage] = useState(null);

  // Hook pour la navigation
  const navigate = useNavigate();

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.trim() // Mettre à jour les champs du formulaire avec les valeurs saisies
    });
  };

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page à la soumission du formulaire

    // Vérifier que tous les champs sont remplis
    if (!inputs.email || !inputs.password) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }
    try {
      // Appeler la fonction de connexion avec les données du formulaire
      const data = await login(inputs);
      // Stocker les informations de l'utilisateur dans le localStorage
      console.log('data', data)
      localStorage.setItem('userConnected', JSON.stringify(data.user));
      localStorage.setItem("isUserLogged", "true");
      console.log(data.user)

      // Afficher un message de succès et rediriger l'utilisateur vers la page d'accueil
      setMessage('Connexion réussie');
      navigate('/'); // Rediriger vers la page d'accueil après connexion
    } catch (error) {
      console.error('Error during login:', error);
      setMessage(error.message || 'Erreur lors de la connexion'); // Afficher un message d'erreur en cas d'échec
    }
  };

  return (
    <>
      <div className="login-title"><h2>Veuillez vous connecter</h2></div>
      <div className="form">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre Email"
              value={inputs.email}
              onChange={handleChange}
              required // Champ obligatoire
            />
          </div>
          <div className="form-container">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              value={inputs.password}
              onChange={handleChange}
              required // Champ obligatoire
            />
          </div>
          <div>
            <button type="submit">Se connecter</button>
            {message && <p>{message}</p>} {/* Afficher le message d'erreur ou de succès */}
          </div>
        </form>
        <div>
          <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p> {/* Lien vers la page d'inscription */}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
