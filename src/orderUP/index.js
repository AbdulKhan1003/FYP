import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import OrderPlaced from './Components/orderPlaced';
import { MenuContext } from './AllRestaurants/RestaurantsContext';

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  let loggedVal = JSON.parse(localStorage.getItem('LoggedIn'));
  const {order} =useContext(MenuContext)

  useEffect(() => {
    setLoggedIn(loggedVal === 0 ? false : true)
    // if (loggedVal === 0) {
    //   setLoggedIn(false);
    // } else {
    //   setLoggedIn(true);
    // }
  }, [loggedVal]);

  if (loggedIn === null) {
    // return <h1 className="text-center my-5 py-5">Loading the site...</h1>  
    return <div className='container pt-3 d-flex justify-content-center flex-column align-items-center mb-5'>
    <div className="spinner-border big-spinner mt-5" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
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
              {order && <Route path="/orderComplete" element={<OrderPlaced />} />}
              {!order && <Route path="/orderComplete" element={<Menu />} />}
              <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        )}
      </div>
    </Router>
  );
};

export default Index;
