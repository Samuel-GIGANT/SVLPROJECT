import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import Categories from "./Categories";
import './home.css';


function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Bienvenue sur <span>SVL</span></h1>
        <p>
          <span>SVL</span> est reconnue dans le secteur de l'audiovisuel nous voulons être acteur dans vos projets <br />
          et vous apportez les solutions adèquats à vos besoins. <br />
          Nous travaillons en collaboration avec des marques reconnues dans le domaine <br />
          avec du matériel fiable et de qualité, pour que vous puissiez être serins lors de vos tournages et productions.
        </p>
        <div className="hero-reseaux">
          <a href="mailto:">svl.pro@gmail.com</a>
          <a href="/"><CiFacebook /></a>
          <a href="/"><FaInstagram /></a>
        </div>
      </div>


      <section >
        <Categories />
      </section>
    </div>
  );
}

export default Home;
