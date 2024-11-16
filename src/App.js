// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import FYPsite from './orderUP/index';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    // Initialize 'Cart Items' if it doesn't exist or if it's null
    let cartItems = localStorage.getItem('Cart Items');
    if (!cartItems || cartItems === 'null') {
      console.log("Initializing 'Cart Items' as an empty array");
      localStorage.setItem('Cart Items', JSON.stringify([]));
    } else {
      console.log("'Cart Items' already set:", cartItems);
    }

    // Initialize Login
    if (!localStorage.getItem('LoggedIn')) {
      localStorage.setItem('LoggedIn', 0);
    }
    //Initialize User
    if (!localStorage.getItem('User') || localStorage.getItem('User') === 'null') {
      localStorage.setItem('User', JSON.stringify({}));
    }
  }, []);
  return (

    <FYPsite />
  )
}

export default App;
