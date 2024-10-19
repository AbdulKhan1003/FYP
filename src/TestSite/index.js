import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/about';
import Contact from './Components/contact';
import Home from './Components/Home';
import Footer from './Components/Footer'
import Menu from './Components/Menu';
import './style.css'
import Restaurants from './Components/Restaurants';
import Cart from './Components/cart'
import LoginSignup from './Authentication/LoginSignup'
import './Authentication/LoginSignup.css'
import Profile from './Components/profile';
import Checkout from './Components/checkout';

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(null); // Initial state set to null to prevent rendering the main page initially
  let loggedVal = JSON.parse(localStorage.getItem('LoggedIn'));

  useEffect(() => {
    if (loggedVal === 0) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [loggedVal]);

  if (loggedIn === null) {
    return <h1 className="text-center">Loading...</h1>  
  }

  return (
    <Router>
      <div className="app">
        {!loggedIn && <LoginSignup />}
        {loggedIn && (
          <div className="content">
            <Navbar />
            <Routes>
              <Route index path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/restaurant/:id/items" element={<Restaurants />} />
              <Route path="/cart/:restID/:prodID" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default Index;
