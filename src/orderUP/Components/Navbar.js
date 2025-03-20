import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MenuContext } from '../AllRestaurants/RestaurantsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const {cartQuantity} = useContext(MenuContext)
  const userProfile = JSON.parse(localStorage.getItem("User"))
  const fullName = userProfile.name
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mx-2">
      <Link to="/home" className="navbar-brand fw-bold text-success m-0 p-0 ms-4">
      <img className='logo-img' src="/logo1.jpg" alt="Logo" />
      </Link>
      <Link to="/home" className="navbar-brand fw-bold text-success ms-2">ORDER UP!</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item">
            <Link to="/home" className="nav-link text-dark mt-1 me-2 fs-5"><span className="nav-items">Home</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link text-dark mt-1 me-2 fs-5"><span className="nav-items">Menu</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-dark mt-1 me-2 fs-5"><span className="nav-items">About</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link text-dark mt-1 fs-5"><span className="nav-items">Contact</span></Link>
          </li>
          <li className="nav-itemfloat-end me-3">
            <Link to="/cart" className="mt-2 btn position-relative"> <FontAwesomeIcon icon={faCartShopping} />
              <span className="position-absolute badge rounded-pill bg-danger">{cartQuantity.length?0:cartQuantity}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-dark">
              <button type="button" className="btn btn-outline-success">
                <i className="bi bi-person-fill"></i>
                {/* full name or first name whatever you want here */}
                <span>{userProfile===null || userProfile===undefined?"Guest":`${fullName}`}</span>
                {console.log("user",userProfile)}
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
