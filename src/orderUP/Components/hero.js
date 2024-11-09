import React from 'react'
import Title from '../ReUsables/Title'
import { Link } from 'react-router-dom'

const hero = () => {
  return (
    <section className="bg-success text-white py-5">
    <div className="container text-center">
      <Title heading="Delicious Food Delivered Fast" size={5}></Title>
      <p className="lead mb-4">Get your favorite meals delivered to your doorstep in no time.</p>
      <Link to="/menu" className="btn btn-light text-success fw-bold px-4 py-2">Order Now</Link>
    </div>
  </section>
  )
}

export default hero
