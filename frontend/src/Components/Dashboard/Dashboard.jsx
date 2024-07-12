import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Product from '../../Pages/Product';
import Order from '../Dashboard/Order.jsx'
import User from '../../Pages/User';
import './dashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch('/api/orders');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch orders');
  //       }
  //       const data = await response.json();
  //       setOrders(data);
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //     }
  //     fetchOrders();
  //   };

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch('/api/users');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch users');
  //       }
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  return (

    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="products" element={<Product />} />
          <Route path="orders" element={<Order order={orders} setOrders={setOrders} />} />
          <Route path="/dashboard/users" element={<User users={users} setUsers={setUsers} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
