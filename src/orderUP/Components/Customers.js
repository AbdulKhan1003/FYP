import React from 'react'
import Title from '../ReUsables/Title'
import Slider from '../ReUsables/Slider'

const Customers = () => {
  return (
    <section className="py-5">
    <div className="text-center">
      <Title heading="What Our Customers Say" size={6} />
      <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="carousel">
      <div className="carousel-inner">
      <Slider active="active" imgSrc="users/user-1.jpg" name="Karen" review="Although, i am a Karen and my only job is to find mistakes in everthing, this website looks kinda interesting. I ordered haleem through recommendations and it was yumm." />
      <Slider active="" imgSrc="users/user-2.jpg" name="Nusrat(Salt Bae)" review="Great website if you want to order food. Almost every food was available. I wish my restaurant can be added in someday." />
      <Slider active="" imgSrc="users/user-3.jpg" name="Nigga 3" review="Yummy chicken. Ate like 69 pieces of it from 10 different places. Good website. Definitely recommended y'all." />
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-black" aria-hidden="true"></span>
            </button>
      </div>
    </div>
  </section>
  )
}

export default Customers
