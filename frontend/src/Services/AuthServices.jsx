// Définition de la base URL pour l'API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Fonction d'inscription
export async function registration(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'inscription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
}

// Fonction de connexion
export async function login(userData) {
  console.log(userData);
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la connexion');
    }

    const data = await response.json();
    console.log('Réponse reçue de l\'API:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
}




// import React, { useState } from 'react';

// // Définition de la base URL pour l'API
// const API_BASE_URL = process.env.MONGODB_URI || 'http://localhost:3001';

// // Fonction d'inscription
// export async function registration(userData) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Erreur lors de l\'inscription');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Erreur lors de l\'inscription:', error);
//     throw error;
//   }
// }

// // Fonction de soumission du formulaire de connexion
// const handleSubmit = async (inputs, setMessage) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(inputs)
//     });

//     if (!response.ok) {
//       throw new Error('Erreur lors de la connexion');
//     }

//     const data = await response.json();
//     // Faire quelque chose avec les données si nécessaire
//     console.log(data);
//   } catch (error) {
//     setMessage(error.message || 'Erreur lors de la connexion');
//   }
// };

// // Composant React pour afficher le formulaire de connexion
// const AuthServices = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   // Fonction pour gérer la soumission du formulaire
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const inputs = { email, password };
//     handleSubmit(inputs, setMessage);
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label>Email :</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Mot de passe :</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">Se connecter</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export { handleSubmit, AuthServices, registration };
