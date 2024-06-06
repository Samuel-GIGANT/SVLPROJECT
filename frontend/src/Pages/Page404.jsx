// src/Pages/Page404.js
import React from 'react';
import { Link } from 'react-router-dom';
import './page404.css';

const Page404 = () => {
  return (
    <div className="notFound-container">
      <h1 className="notFound-title">Page non trouvée</h1>
      <p className="notFound-message">Désolé, la page que vous recherchez n'existe pas.</p>
      <Link to="/" className="not-found-link">Retourner à la page d'accueil</Link>
    </div>
  );
};

export default Page404;