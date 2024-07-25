import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { SliderData } from '../Carrousel-Logo/SliderDataLogo';
import './ImageCarrousel.css'; // Fichier CSS pour styliser le carrousel

const ImageCarousel = () => {
  // Déclare un état en court 'current' initialisé à 0 pour suivre l'image actuelle
  const [current, setCurrent] = useState(0);
  const length = SliderData.length; // Longueur du tableau des images

  // Fonction pour passer à l'image suivante
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1); // Revient à la première image après la dernière
  };

  // Fonction pour revenir à l'image précédente
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1); // Revient à la dernière image si on est à la première
  };

  // Utilise useEffect pour changer l'image automatiquement toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change l'image toutes les 3 secondes
    return () => clearInterval(interval); // Nettoie l'intervalle à la fin pour éviter les fuites de mémoire
  }, [current]); // Dépendance sur 'current' pour relancer l'effet après chaque changement d'image

  // Vérifie si le tableau des images est vide ou non
  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null; // Retourne null si le tableau est vide ou invalide
  }

  return (
    <section className="slider">
      {/* Flèche gauche pour revenir à l'image précédente */}
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      {/* Flèche droite pour passer à l'image suivante */}
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {/* Parcours des images dans SliderData */}
      {SliderData.map((image, index) => (
        // Définit la classe 'slide' et 'active' pour l'image actuelle
        <div className={index === current ? 'slide active' : 'slide'} key={index}>
          {/* Affiche l'image si c'est l'image actuelle */}
          {index === current && (
            <img src={image.img} alt={image.alt} className="image" />
          )}
        </div>
      ))}
    </section>
  );
};

export default ImageCarousel;
