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
        <div>
          <h2>sound</h2>
        </div>
      <aside className='sidebar'>
        <div className="sidebar_title">
          <h2>Categories</h2>
          <ul>
            <li><Link to="/productdetails/audio">Sound</Link></li>
            <li><Link to="/productdetails/video">Video</Link></li>
            <li><Link to="/productdetails/light">Light</Link></li>
          </ul>
        </div>
      </aside>
      </main>
    </>
  );
};

export default Categories;
