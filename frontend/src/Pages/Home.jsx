import React from "react";
import Categories from "./Categories";
import './home.css';

function Home() {
  return (
    <div className="container">
      <div className="home">
        <h1>Bienvenue sur SVL</h1>
        <div className="home_gallery">
          <div className="home_img">
            <a href="./audio">
              <img src="./audio.jpg" alt="un microphone" />
              <span className="home_img_text">Explore </span>
            </a>
          </div>
          <div className="home_img">
            <a href="./light">
              <img src="./light.jpg" alt="une lumiere de cinema" />
              <span className="home_img_text">Explore </span>
            </a>
          </div>
          <div className="home_img">
            <a href="./video">
              <img src="./video.jpg" alt="une camera" />
              <span className="home_img_text">Explore </span>
            </a>
          </div>
        </div>
        <br />
        <div className="home_infos">
          <p><strong>SVL</strong> Sound Video Light
            est reconnue dans le secteur de l'audiovisuel nous voulons être acteur dans vos projets et vous apportez les solutions adèquats à vos besoins.
            <br />
            Nous travaillons en collaboration avec des marques reconnues dans le domaine avec du matériel fiable et de qualité,
            <br />
            pour que vous puissiez être serinslors de vos tournages et productions.
            <br />
          </p>
        </div>
        <section >
          <Categories />
        </section>
      </div>
    </div>
  );
}

export default Home;
