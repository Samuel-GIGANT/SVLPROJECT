import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../../Services/AuthServices';
import './loginPage.css';

function LoginPage({ setIsUserLoggedIn }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const data = await login(inputs);
      console.log('Response from backend:', data);

      // Stockage des informations de l'utilisateur dans localStorage
      localStorage.setItem('userConnected', JSON.stringify(data.user));
      setIsUserLoggedIn(true);
      setMessage('Connexion réussie');
      navigate('/'); // Rediriger vers la page d'accueil après connexion
    } catch (error) {
      console.error('Error during login:', error);
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
              required
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
              required
            />
          </div>
          <div>
            <button type="submit">Se connecter</button>
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { login } from '../../Services/AuthServices';
// import './loginPage.css';

// function LoginPage({ setIsUserLoggedIn }) {

//   const [inputs, setInputs] = useState({
//     email: '',
//     password: ''
//   });

//   const [message, setMessage] = useState(null);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setInputs({
//       ...inputs,
//       [e.target.name]: e.target.value.trim()
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!inputs.email || !inputs.password) {
//       setMessage('Veuillez remplir tous les champs.');
//       return;
//     }

//     try {
//       const data = await login(inputs);
//       console.log('Response from backend:', data);

//       // Stockage des informations dans sessionStorage au lieu de localStorage
//       sessionStorage.setItem('authToken', data.token);
//       sessionStorage.setItem('userConnected', JSON.stringify(data.user));
//       setIsUserLoggedIn(true);
//       setMessage('Connexion réussie');
//       navigate('/'); // Rediriger vers la page d'accueil après connexion
//     } catch (error) {
//       console.error('Error during login:', error);
//       setMessage(error.message || 'Erreur lors de la connexion');
//     }
//   };

//   return (
//     <>
//       <div className="login-title"><h2>Veuillez vous connecter</h2></div>
//       <div className="form">
//         <h2>Connexion</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-container">
//             <label htmlFor="email">Email :</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Votre Email"
//               value={inputs.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-container">
//             <label htmlFor="password">Mot de passe :</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Votre mot de passe"
//               value={inputs.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <button type="submit">Se connecter</button>
//             {message && <p>{message}</p>}
//           </div>
//         </form>
//         <div>
//           <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginPage;
