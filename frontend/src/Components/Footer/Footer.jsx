import React from 'react'
import { LuCopyright } from "react-icons/lu";
import './footer.css';

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-infos">
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/mentions-legales">Mentions légales</a></li>
          <li><a href="/mon-compte">Mon compte</a></li>
        </div>
        <div className="footer-copyright">
          <p><LuCopyright /> SVL Sound Video Light Copyright 2024</p>
        </div>
        <button className="social-button">Réseaux sociaux</button>
      </div>
    </>
  )
}

export default Footer
