import React, { useState, useEffect } from 'react';
import './user.css';

const User = ({ users, setUsers }) => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    adresse: '',
    tel: ''
  });
  const [message, setMessage] = useState(null);
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis votre API ou le stockage local
    const storedUser = JSON.parse(localStorage.getItem('userConnected'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

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
      const errorFields = [];
      if (!userData.fullName) {
        errorFields.push('fullName');
      }
      if (!userData.email) {
        errorFields.push('email');
      }
      if (!userData.adresse) {
        errorFields.push('adresse');
      }
      if (!userData.tel) {
        errorFields.push('tel');
      }

      if (errorFields.length > 0) {
        setErrorFields(errorFields);
        setMessage('Tous les champs sont requis.');
        return;
      }

      // Envoyer les données mises à jour au backend
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Vérifier si la requête a réussi
      if (response.ok) {
        // Afficher un message de succès
        setMessage('Vos informations ont été mises à jour avec succès.');
      } else {
        // Afficher un message d'erreur
        setMessage('Une erreur est survenue lors de la mise à jour des informations.');
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage(error.message || 'Une erreur est survenue lors de la mise à jour des informations.');
    }
  };

  return (
    <div>
      <h2>Modifier vos informations</h2>
      {message && <p className={`message ${message.includes('succès') ? 'success' : 'error'}`}>{message}</p>}
      {users && users.length > 0 ? (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="column1">
            <label htmlFor="fullName">Nom et Prénom :</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className={errorFields.includes('fullName') ? 'error' : ''}
            />
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className={errorFields.includes('email') ? 'error' : ''}
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
              className={errorFields.includes('adresse') ? 'error' : ''}
            />
            <label htmlFor="tel">Numéro de téléphone :</label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={userData.tel}
              onChange={handleChange}
              className={errorFields.includes('tel') ? 'error' : ''}
            />
            <button type="submit">Enregistrer les modifications</button>
          </div>
        </form>
      ) : (
        <p>Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
}

export default User;
