import React, { useState, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
import { AiFillShopping, AiOutlineAudio } from "react-icons/ai";
import { GoLightBulb } from "react-icons/go";
import { BsCamera } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../Components/Stripe/CartContext';
import Modal from '../Modal/Modal';
import './header.css';

const Header = () => {
  const { getNumberProduct } = useCart(); 
  const [userNameConnected, setUserNameConnected] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLogged = JSON.parse(localStorage.getItem("isUserLogged"));
    const userInfo = JSON.parse(localStorage.getItem('userConnected'));
    if (isUserLogged && userInfo) {
      setIsConnected(true);
      setUserNameConnected(userInfo.fullName);
      setUserInfo(userInfo);
    } else {
      setIsConnected(false);
      setUserNameConnected('');
      setUserInfo(null);
    }
  }, []);

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

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div>
      <header className='header'>
        <nav className={`header_Nav ${showLinks ? "show_nav" : "hide_nav"}`}>
          <div className="header_Logo">
            <Link to="/"><span>SVL</span> Sound Vidéo Light</Link>
          </div>
          <ul className="navbar_links">
            <li className="navbar_item"><Link to="/" className="navbar_link"><IoHomeOutline /> Home</Link></li>
            <li className="navbar_item"><Link to="/sound" className="navbar_link"><AiOutlineAudio /> Sound</Link></li>
            <li className="navbar_item"><Link to="/video" className="navbar_link"><BsCamera /> Video</Link></li>
            <li className="navbar_item"><Link to="/light" className="navbar_link"><GoLightBulb /> Light</Link></li>
            {isConnected && userInfo && userInfo.role === 'admin' && (
              <li className="navbar_item"><Link to="/dashboard" className="navbar_link">Dashboard</Link></li>
            )}
          </ul>
          <div className="header_login">
            <div className="header_icons_login">
              {isConnected ? (
                <span onClick={openModal}>{userNameConnected}</span>
              ) : (
                <Link to="/login"><BiSolidUser /></Link>
              )}
            </div>
            <div>
              <Link to="/cart">
                <span className="cart-icon">
                  <AiFillShopping />
                  <span className="cart-item-count">{getNumberProduct()}</span>
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {isModalOpen && (
        <Modal userInfo={userInfo} closeModal={closeModal} handleLogout={handleLogout} />
      )}
      <button className="navbar_burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </div>
  );
};

export default Header;
