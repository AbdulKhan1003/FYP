import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './orderUP/Components/Navbar';
import About from './orderUP/Components/about';
import Contact from './orderUP/Components/contact';
import Home from './orderUP/Components/Home';
import Footer from './orderUP/Components/Footer'
import Menu from './orderUP/Components/Menu';
import './orderUP/style.css'
import EditProfile from './orderUP/Components/editProfile';
import Restaurants from './orderUP/Components/Restaurants';
import Cart from './orderUP/Components/cart'
import LoginSignup from './orderUP/Authentication/LoginSignup'
import './orderUP/Authentication/LoginSignup.css'
import Profile from './orderUP/Components/profile';
import Checkout from './orderUP/Components/checkout';
import OrderPlaced from './orderUP/Components/orderPlaced';
import LiveTracker from './orderUP/Components/TrackOrder/liveTracker';
import { MenuContext } from './orderUP/AllRestaurants/RestaurantsContext';


function App() {
  useEffect(() => {
    let cartItems = localStorage.getItem('Cart Items');
    if (!cartItems || cartItems === 'null') {
      console.log("Initializing 'Cart Items' as an empty array");
      localStorage.setItem('Cart Items', JSON.stringify([]));
    } else {
      console.log("'Cart Items' already set");
    }

    if (!localStorage.getItem('LoggedIn')) {
      localStorage.setItem('LoggedIn', 0);
    }
    if (!localStorage.getItem('User') || localStorage.getItem('User') === 'null') {
      localStorage.setItem('User', JSON.stringify({}));
    }
  }, []);
  const [loggedIn, setLoggedIn] = useState(null);
  let loggedVal = JSON.parse(localStorage.getItem('LoggedIn'));
  const {order, isOrdered} =useContext(MenuContext)

  useEffect(() => {
    setLoggedIn(loggedVal === 0 ? false : true)
  }, [loggedVal]);

  if (loggedIn === null) {
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
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/liveTracker" element={< LiveTracker/>} />
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

export default App;
