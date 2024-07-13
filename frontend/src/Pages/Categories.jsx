import React from 'react';
import { Link } from 'react-router-dom';
import './categories.css';

const categories = [
  {
    name: "Sound",
    href: "./sound",
    src: "./audio.jpg",
    alt: "un microphone",
    text: "Explore"
  },
  {
    name: "Video",
    href: "./video",
    src: "./video.jpg",
    alt: "une camera",
    text: "Explore"
  },
  {
    name: "Light",
    href: "./light",
    src: "./light.jpg",
    alt: "une lumiere de cinema",
    text: "Explore"
  },
  
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
                <div className="categorie_overlay">
                  <span className="categorie_name">{category.name}</span>
                  <span className="categorie_img_text">{category.text}</span>
                </div>
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
