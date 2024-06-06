import React, { useEffect, useState } from 'react';
import './moncompte.css';

const MonCompte = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    adresse: '',
    tel: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className='monCompte'>
      <h1>Mon compte</h1>
      <fieldset>
        <legend>Informations personnelles</legend>
        <form>
          <label htmlFor="nom">Nom et prénom :</label>
          <input type="text" id="nom" name="nom" value={userData.fullName} disabled={true} />
          <br />
          <label htmlFor="email">e-mail :</label>
          <input type="email" id="email" name="email" value={userData.email} disabled={true} />
          <br />
          <label htmlFor="telephone">Téléphone :</label>
          <input type="tel" id="telephone" name="telephone" value={userData.tel} disabled={true} />
          <br />
        </form>
      </fieldset>
      <fieldset>
        <legend>Mes adresses</legend>
        <form>
          <label htmlFor="adresse">Adresse de livraison:</label>
          <input type="text" id="adresse" name="adresse" value={userData.adresse} disabled={true} />
          <button>changer l'adresse de livraison</button>
          <br />
          <label htmlFor="adresse">Adresse de facturation:</label>
          <input type="text" id="adresse" name="adresse" value={userData.adresse} disabled={true} />
          <button>changer l'adresse de facturation</button>
          <br />
        </form>
      </fieldset>
    </div>
  );
}

export default MonCompte;
