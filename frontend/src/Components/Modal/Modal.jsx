import React from 'react';
import './modal.css';

const Modal = ({ userInfo, closeModal, handleLogout }) => {
  console.log(userInfo)
  const isUserLogged = JSON.parse(localStorage.getItem("isUserLogged"));

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        {isUserLogged ? (
          <>
            <h2>Souhaitez vous, vous déconnecter</h2>
            <button onClick={handleLogout}>me déconnecter</button>
          </>
        ) : (
          <h2>Vous avez bien été déconnecté</h2>
        )}
      </div>
    </div>
  );
}

export default Modal;
