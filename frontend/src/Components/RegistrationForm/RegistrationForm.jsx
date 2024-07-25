// Importer les hooks et fonctions nécessaires de React et React Router
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// Importer le service d'inscription
import { registration } from '../../Services/AuthServices';
// Importer le fichier CSS pour le style du formulaire d'inscription
import './registrationForm.css';

function RegistrationForm() {
  // Définir l'état initial des données utilisateur
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    adresse: '',
    tel: ''
  });

  // État pour stocker les messages d'erreur ou de succès
  const [message, setMessage] = useState(null);
  // État pour gérer l'affichage du chargement pendant la soumission du formulaire
  const [isLoading, setIsLoading] = useState(false);
  // Hook pour la navigation
  const navigate = useNavigate();

  // Fonction pour gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page à la soumission du formulaire

    // Vérifier que tous les champs sont remplis
    if (!userData.fullName || !userData.email || !userData.password || !userData.adresse || !userData.tel) {
      setMessage('Tous les champs sont requis.');
      return;
    }

    setIsLoading(true); // Activer l'état de chargement
    setMessage(null); // Réinitialiser les messages

    try {
      // Appeler la fonction d'inscription avec les données utilisateur
      const response = await registration(userData);
      console.log('User registered successfully:', response);

      // Réinitialiser le formulaire après une inscription réussie
      setUserData({
        fullName: '',
        email: '',
        password: '',
        adresse: '',
        tel: '',
      });

      // Stocker les informations utilisateur dans le localStorage
      localStorage.setItem('userConnected', JSON.stringify(userData));
      localStorage.setItem("isUserLogged", "true");

      // Rediriger l'utilisateur et afficher un message de succès
      setMessage('Vous êtes inscrit avec succès.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.message || 'Une erreur est survenue lors de l\'inscription.');
    } finally {
      setIsLoading(false); // Désactiver l'état de chargement
    }
  };

  return (
    <div className='Register'>
      <h2>Veuillez vous enregistrer, merci !</h2>
      {message && <p className={`message ${message.includes('succès') ? 'success' : 'error'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="column1">
          <label htmlFor="fullName">Nom et Prénom :</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            placeholder="Votre Nom et prénom"
            required
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Votre Email"
            required
          />
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Votre mot de passe"
            required
          />
        </div>
        <div className="column2">
          <label htmlFor="adresse">Adresse :</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={userData.adresse}
            onChange={handleChange}
            placeholder="Votre adresse"
            required
          />
          <label htmlFor="tel">Numéro de téléphone :</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={userData.tel}
            onChange={handleChange}
            placeholder="Votre numéro de téléphone"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
