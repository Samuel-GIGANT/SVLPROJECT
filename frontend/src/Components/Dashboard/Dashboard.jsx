import React, { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Product from '../../Pages/Product';
import User from '../../Pages/User';
import './dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchProducts();
    fetchUsers();
  }, []);

  return (
    
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="products" element={<Product products={products} setProducts={setProducts} />} />
          <Route path="/dashboard/users" element={<User users={users} setUsers={setUsers} />} />

        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
