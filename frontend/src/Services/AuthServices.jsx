import React, { useState } from 'react';

// Définition de la fonction de service d'authentification
const API_BASE_URL = process.env.MONGODB_URI || 'http://localhost:3001';

export async function registration(userData) {
  try {
    // const response = await fetch(`${API_BASE_URL}/register`, {
    const response = await fetch(`http://localhost:3001/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
}

// Définition de la fonction pour gérer la soumission du formulaire de connexion
const handleSubmit = async (inputs, setMessage) => {
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    });

    // Vérification de la réponse
    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    // Traitement de la réponse si nécessaire
  } catch (error) {
    setMessage(error.message || 'Erreur lors de la connexion');
  }
};

// Définition du composant React pour afficher le message
const AuthServices = () => {
  const [message, setMessage] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputs = { email: '', password: '' };
    console.log(inputs);
    handleSubmit(inputs, setMessage); // Appel de la fonction handleSubmit avec les inputs et la fonction setMessage
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* Vos champs de formulaire ici */}
        <button type="submit">Se connecter</button>
      </form>
      <p>{message}</p>
    </div>
  );
};


export { handleSubmit, AuthServices };
