import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registration } from '../../Services/AuthServices';
import './registrationForm.css';

function RegistrationForm() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    adresse: '',
    tel: '',
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
      localStorage.setItem('userConnected', JSON.stringify(userData));
      localStorage.setItem("isUserLogged", "true")
      // message pour l'inscription
      setMessage('Vous êtes inscrit');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      // Stocker l'erreur dans l'état pour l'afficher à l'utilisateur
      setMessage(error.message || 'Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <div>
      <h2>Veuillez vous enregistrer, merci !</h2>
      {message && <p className="error-message">{message}</p>} {/* Afficher le message d'erreur s'il y en a */}
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
            placeholder="Phone Number"
          />
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
}


export default RegistrationForm;
