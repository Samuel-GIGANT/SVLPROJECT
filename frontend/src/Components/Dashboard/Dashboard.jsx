import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Product from '../../Pages/Product';
import Order from '../Dashboard/Order.jsx';
import User from '../../Pages/User';
import './dashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/orders`);
  //       if (!response.ok) {
  //         throw new Error('Échec de la récupération des commandes');
  //       }
  //       const data = await response.json();
  //       setOrders(data);
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des commandes :', error);
  //     }
  //   };

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/users`);
  //       if (!response.ok) {
  //         throw new Error('Échec de la récupération des utilisateurs');
  //       }
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des utilisateurs :', error);
  //     }
  //   };

  //   fetchOrders();
  //   fetchUsers();
  // }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="products" element={<Product />} />
          <Route path="orders" element={<Order orders={orders} setOrders={setOrders} />} />
          <Route path="users" element={<User users={users} setUsers={setUsers} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
