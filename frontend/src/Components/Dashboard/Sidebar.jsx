import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCheck, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { BiHome, BiCategory } from 'react-icons/bi';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <Link to="/"><span>SVL</span>Sound Video Light</Link>
      </div>
      <div className="menu_list">
        <Link to="/dashboard" className="item">
          <BiHome className="logo_icons" />
          Dashboard
        </Link>
        <Link to="/dashboard/user" className="item">
          <FaUserCheck className="logo_icons" />
          Users
        </Link>
        <Link to="/dashboard/categories" className="item">
          <BiCategory className="logo_icons" />
          Categories
        </Link>
        <Link to="/dashboard/products" className="item">
          <BiHome className="logo_icons" />
          Products
        </Link>
        <Link to="/dashboard/orders" className="item">
          <FaClipboardList className="logo_icons" />
          Orders
        </Link>
        <Link to="/dashboard/cart" className="item">
          <FaShoppingCart className="logo_icons" />
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;