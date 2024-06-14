import React from 'react';
import { Link } from 'react-router-dom';
import './categories.css';

const Categories = () => {
  return (
    <>
    <div className="categorie">
      <h2>CATEGORIES</h2>
    </div>
      <main>
      <div className="categorie_gallery">
          <div className="categorie_img">
            <a href="./sound">
              <img src="./audio.jpg" alt="un microphone" />
              <span className="categorie_img_text">Explore </span>
            </a>
          </div>
          <div className="categorie_img">
            <a href="./light">
              <img src="./light.jpg" alt="une lumiere de cinema" />
              <span className="categorie_img_text">Explore </span>
            </a>
          </div>
          <div className="categorie_img">
            <a href="./video">
              <img src="./video.jpg" alt="une camera" />
              <span className="categorie_img_text">Explore </span>
            </a>
          </div>
        </div>
        <br />
        <div className="categorie_infos">
          <p><strong>SVL</strong> Sound Video Light
          Retrouvez nos catégories et nos prduits. <br />
          Trouver tout ce qu'il vous faut pour débuter votre projet.

          </p>
        </div>
      </main>
    </>
  );
};

export default Categories;
