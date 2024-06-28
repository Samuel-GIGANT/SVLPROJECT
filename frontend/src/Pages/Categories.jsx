import React from 'react';
import { Link } from 'react-router-dom';
import './categories.css';

const categories = [
  {
    href: "./sound",
    src: "./audio.jpg",
    alt: "un microphone",
    text: "Explore"
  },
  {
    href: "./light",
    src: "./light.jpg",
    alt: "une lumiere de cinema",
    text: "Explore"
  },
  {
    href: "./video",
    src: "./video.jpg",
    alt: "une camera",
    text: "Explore"
  }
];

const Categories = () => {
  return (
    <>
      <div className="categorie">
        <h2>CATEGORIES</h2>
      </div>
      <main>
        <div className="categorie_gallery">
          {categories.map((category, index) => (
            <div key={index} className="categorie_img">
              <Link to={category.href}>
                <img src={category.src} alt={category.alt} />
                <span className="categorie_img_text">{category.text}</span>
              </Link>
            </div>
          ))}
        </div>
        <br />
        <div className="categorie_infos">
          <p><strong>SVL</strong> Sound Video Light<br />
          Retrouvez nos catégories et nos produits. <br />
          Trouvez tout ce qu'il vous faut pour débuter votre projet.
          </p>
        </div>
      </main>
    </>
  );
};

export default Categories;
