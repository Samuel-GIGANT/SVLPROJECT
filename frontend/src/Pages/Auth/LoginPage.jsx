import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './loginPage.css';

function LoginPage() {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs)
    //faire un fetch sur /login
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      });

      //recupérer la data et stoker dans le local storage si l'utilisateur existe, sinon mettre un message d'erreur('Veuillez vérifier votre email et votre mot de pass')
      const data = await response.json();
      console.log(data.user)
      if (data.user) {
        localStorage.setItem('userConnected', JSON.stringify(data.user));
        localStorage.setItem("isUserLogged", "true");
        setMessage(`connexion réussie `);
        navigate('/');
      } else {
        setMessage('Veuillez vérifier votre email et votre mot de passe');
      }
    } catch (error) {
      setMessage(error.message || 'Erreur lors de la connexion');
    }
  };


  return (
    <>
      <div className="login-title"><h2>Veuillez vous connecter</h2></div>
      <div className="form">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre Email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-container">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button>Se connecter</button>
            {message && <p>{message}</p>}
          </div>
        </form>
        <div>
          <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
