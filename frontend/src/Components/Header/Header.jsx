import React, { useState, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
import { AiFillShopping, AiOutlineAudio } from "react-icons/ai";
import { GoLightBulb } from "react-icons/go";
import { BsCamera } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; // Importez votre composant de modale
import './header.css';

const Header = () => {
  const [userNameConnected, setUserNameConnected] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLogged = JSON.parse(localStorage.getItem("isUserLogged"));
    const userInfo = JSON.parse(localStorage.getItem('userConnected'));
    // console.log(isConnected);
    // console.log(userNameConnected);

    if (isUserLogged && userInfo) {
      setIsConnected(true);
      setUserNameConnected(userInfo.fullName); // Affiche le nom de l'utilisateur connecté
      setUserInfo(userInfo);
      // console.log(isConnected)
      // console.log(userNameConnected)
    } else {
      setIsConnected(false);
      setUserNameConnected('');
      setUserInfo(null);
      // console.log(isConnected);
      // console.log(userNameConnected);
    }
  }, [isConnected]);

  const handleLogout = () => {
    localStorage.removeItem("isUserLogged");
    localStorage.removeItem('userConnected');
    setIsConnected(false);
    setUserNameConnected('');
    setUserInfo(null);
    navigate('/');
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            {isConnected && userInfo && userInfo.role === 'admin' && (
              <li><a href="/dashboard">Dashboard</a></li>
            )}
          </ul>
          <div className="header_login">
            <div className="header_icons_login">
              {isConnected ? (
                <>
                  {/* <span>{userNameConnected}</span> */}
                  <span onClick={openModal}>{userNameConnected}</span> {/* Utilisateur cliquable pour ouvrir la modale */}
                  {/* <button onClick={handleLogout}>Logout</button> */}
                </>
              ) : (
                <Link to="/login"><BiSolidUser /></Link>
              )}
            </div>
            <div>
              <Link to="/cart"><AiFillShopping /></Link>
            </div>
          </div>
        </nav>
      </header>
      {isModalOpen && (
        <Modal userInfo={userInfo} closeModal={closeModal} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default Header;
