import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer/Footer";
import Product from "./Pages/Product";
import LoginPage from "./Pages/Auth/LoginPage";
import Cart from "./Pages/Cart";
import RegisterPages from './Pages/Auth/RegisterPages';
import Dashboard from './Components/Dashboard/Dashboard';
import Sound from "./Pages/Sound";
import Video from "./Pages/Video";
import Light from "./Pages/Light";
import NotFoundPage from "./Pages/Page404"; // Ajout d'une page pour les routes non trouvées
import MonCompte from "./Components/Footer/MonCompte";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product" element={<Product />} />
        <Route path="/sound" element={<Sound />} />
        <Route path="/video" element={<Video />} />
        <Route path="/light" element={<Light />} />
        <Route path="/monCompte" element={<MonCompte />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPages />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> 
        <Route path="*" element={<NotFoundPage />} /> 
        <Route path="/redirect" element={<Navigate to="/" />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;