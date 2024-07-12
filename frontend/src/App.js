import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer/Footer";
import Product from "./Pages/Product";
import LoginPage from "./Pages/Auth/LoginPage";
import Cart from "./Components/Stripe/Cart";
import RegisterPages from "./Pages/Auth/RegisterPages";
import Dashboard from "./Components/Dashboard/Dashboard";
import Sound from "./Pages/Sound";
import Video from "./Pages/Video";
import Light from "./Pages/Light";
import NotFoundPage from "./Pages/Page404";
import MonCompte from "./Components/Footer/MonCompte";
import { CartProvider } from "./Components/Stripe/CartContext";
import StripeContainer from "./Components/Stripe/StripeContainer";
import LegalMentions from "./Pages/RGPD/LegalMentions"; 

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = checkIfUserIsLoggedIn();
    setIsUserLoggedIn(userLoggedIn);
  }, []);

  const checkIfUserIsLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Retourne true si le token est présent, sinon false
  };

  return (
    <CartProvider>
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
          <Route path="/mentions-legales" element={<LegalMentions />} />
          <Route path="/login" element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />} />
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={isUserLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/redirect" element={<Navigate to="/" />} />
          <Route
            path="/checkout"
            element={
              isUserLoggedIn ? (
                <StripeContainer
                  totalAmount={100}
                  onPaymentSuccess={() => console.log("Payment Success")}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
