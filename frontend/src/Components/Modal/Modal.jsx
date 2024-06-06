import React from 'react';
import './modal.css';

const Modal = ({ userInfo, closeModal, handleLogout }) => {
  console.log(userInfo)
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Profil Utilisateur</h2>
        {userInfo && (
          <>
            <p>Nom : {userInfo.fullName}</p>
            <p>Email : {userInfo.email}</p>
            <p>Adresse : {userInfo.adresse}</p>
            <p>Téléphone : {userInfo.tel}</p>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Modal;
