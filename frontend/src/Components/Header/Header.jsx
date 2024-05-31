import React, { useState, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5"; // import de la bibliothèque react icons pour les icônes
import { BiSolidUser } from "react-icons/bi";
import { AiFillShopping, AiOutlineAudio } from "react-icons/ai";
import { GoLightBulb } from "react-icons/go";
import { BsCamera } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

import './header.css';

const Header = () => {
  const [userNameConnected, setUserNameConnected] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  
  const isUserLogged = JSON.parse(localStorage.getItem("isUserLogged"));
  const userInfo = JSON.parse(localStorage.getItem('userConnected'));

  useEffect(() => {
    console.log(userInfo)
    // on vérifie si un utilisateur est connecté
    if (userInfo) {
      setUserNameConnected(userInfo.fullName);
    }
    if (isUserLogged) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [isUserLogged, userInfo]);

  const handleLogout = () => {
    localStorage.setItem("isUserLogged", "false");
    localStorage.removeItem('userConnected');
    setIsConnected(false);
    setUserNameConnected('');
    navigate('/'); // redirection vers la page d'accueil après la déconnexion
  };

  return (
    <div>
      <header className='header'>
        <nav className='header_Nav'>
          <div className="header_Logo">
            <a href="/"><span>SVL</span> Sound Vidéo Light</a>
          </div>
          <ul>
            <li><a href="/"><IoHomeOutline /> Home</a></li>
            <li><a href="/sound"><AiOutlineAudio /> Sound</a></li>
            <li><a href="/video"><BsCamera /> Video</a></li>
            <li><a href="/light"><GoLightBulb /> Light</a></li>
          </ul>
          <div className="header_login">
            <div className="header_icons_login">
              {isConnected ? (
                <>
                  <span>{userNameConnected}</span>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <Link to="/login"><BiSolidUser /></Link>
              )}
            </div>
            <div>
              <Link to="/cart"><AiFillShopping /></Link>{/* Lien vers le panier */}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
