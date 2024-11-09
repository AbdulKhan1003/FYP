import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-3">
    <div className="container text-center">
      <p className='m-0'>&copy; 2024 ORDERUP! All rights reserved.</p>
      <span>Follow us at</span>
      <Link target='_blank' to="https://www.instagram.com/abdul_khan20" className="mx-2"><i className="bi bi-facebook fs-4"></i></Link>
      <Link target='_blank' to="https://www.instagram.com/abdul_khan20" className="mx-2"><i className="bi bi-twitter-x fs-4"></i></Link>
        <Link target='_blank' to="https://www.instagram.com/abdul_khan20" className="mx-2"><i className="bi bi-instagram fs-4"></i></Link>
        <Link target='_blank' to="https://www.linkedin.com/in/abdul-hadi-khan-034003284" className="mx-2"><i className="bi bi-linkedin fs-4"></i></Link>
    </div>
  </footer>
  )
}

export default Footer
