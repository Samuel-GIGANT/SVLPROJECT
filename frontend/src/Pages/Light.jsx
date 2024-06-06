import React from 'react';
import './light.css';

const Light = () => {

  return (
    <div className='light'>
      <h1>Light</h1>
      <div className="light-container">
        <div className="light-card">
          <h2>Aputure 200 ip</h2>
          <div><img src="./light.jpg" alt="light thumbnail" /></div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat repellendus nisi, quo velit voluptatum odio nobis cupiditate asperiores ipsa ex vel? Odit ullam sint hic rerum. Officiis, ex nihil.</p>
          <p><b>Quantité:</b>10</p>
          <p><b>Price:</b>350€</p>
          <button>Ajouter au panier</button>
        </div>
        <div className="light-card">
          <h2>Aputure 200 ip</h2>
          <div><img src="./light.jpg" alt="light thumbnail" /></div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat repellendus nisi, quo velit voluptatum odio nobis cupiditate asperiores ipsa ex vel? Odit ullam sint hic rerum. Officiis, ex nihil.</p>
          <p><b>Quantité:</b>10</p>
          <p><b>Price:</b>350€</p>
          <button>Ajouter au panier</button>
        </div>
      </div>

    </div>
  )
}
export default Light;
