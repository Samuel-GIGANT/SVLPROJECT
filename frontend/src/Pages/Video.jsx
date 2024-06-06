import React from 'react';
import './video.css';

const Video = () => {

  return (
    <div className='video'>
      <h1>video</h1>
      <div className="video-card">
        <h2>VIDEO PAGES</h2>
        <div><img src="./video.jpg" alt="Video thumbnail" /></div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat repellendus nisi, quo velit voluptatum odio nobis cupiditate asperiores ipsa ex vel? Odit ullam sint hic rerum. Officiis, ex nihil.</p>
        <p>Quantité: 5</p>
        <p>Price: 2450€</p>
        <button>Ajouter au panier</button>
      </div>
    </div>
  )
}
export default Video;
