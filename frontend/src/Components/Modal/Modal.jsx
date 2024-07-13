import React from 'react';
import './modal.css';
import { Link } from 'react-router-dom';

const Modal = ({ userInfo, closeModal, handleLogout }) => {
  console.log(userInfo)
  const isUserLogged = JSON.parse(localStorage.getItem("isUserLogged"));

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        {isUserLogged ? (
          <>
            <h2>Profil Utilisateur</h2>
            <p>Nom : {userInfo.fullName}</p>
            <p>Email : {userInfo.email}</p>
            <p>Adresse : {userInfo.adresse}</p>
            <p>Téléphone : {userInfo.tel}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <h2>Vous avez bien été déconnecté</h2>
        )}
      </div>
    </div>
  );
}

export default Modal;
