import React from 'react'
import Title from '../ReUsables/Title'
import PopularDishes from '../ReUsables/PopularDishes'

const Dishes = () => {
  return (
    <section className="bg-light py-5 dishes-cont">
    <div className="container text-center">
      <Title heading="Popular Dishes" size={6} />
      <div className="row mt-5">
      <PopularDishes imgSrc="biryani.png" heading="Biryani" para="A delightful mix of spices and rice to make your day." />
      <PopularDishes imgSrc="shawarma-platter.png" heading="Shawarma Platter" para="An assortment of fresh and delicious shawarma with many ingredients." />
      <PopularDishes imgSrc="burger.png" heading="Zinger Burger" para="A juicy burger served with crispy fries." />
      </div>
    </div>
  </section>
  )
}

export default Dishes
