import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registration } from '../../Services/AuthServices';
import './registrationForm.css';

function RegistrationForm() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    adresse: '',
    tel: ''
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Vérification des champs avant l'envoi du formulaire
      if (!userData.fullName || !userData.email || !userData.password || !userData.adresse || !userData.tel) {
        setMessage('Tous les champs sont requis.');
        return;
      }

      const response = await registration(userData);
      console.log('User registered successfully:', response);
      setUserData({
        fullName: '',
        email: '',
        password: '',
        adresse: '',
        tel: '',
      });
      localStorage.setItem('userConnected', JSON.stringify(userData));
      localStorage.setItem("isUserLogged", "true");

      setMessage('Vous êtes inscrit avec succès.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.message || 'Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <div>
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
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Votre Email"
          />
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Votre mot de passe"
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
          />
          <label htmlFor="tel">Numéro de téléphone :</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={userData.tel}
            onChange={handleChange}
            placeholder="Votre numéro de téléphone"
          />
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
