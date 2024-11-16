import React from 'react'
import Title from '../ReUsables/Title'
import Slider from '../ReUsables/Slider'

const Customers = () => {
  return (
    <section className="py-5 cust-cont">
    <div className="text-center">
      <Title heading="What Our Customers Say" size={6} />
      <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="carousel">
      <div className="carousel-inner">
      <Slider active="active" imgSrc="users/user-1.jpg" name="Karen" review="I was surprised to see delivery charges so low, just Rs. 50! The food came on time, fresh and hot. Great service and affordable too." />
      <Slider active="" imgSrc="users/user-2.jpg" name="Babar" review="Ice Cream achi thi aur sab kuch aik hi jaga me mil gya. Best haii 👍" />
      <Slider active="" imgSrc="users/user-3.jpg" name="Kevin" review="Tried their pizza, and wow, it was loaded with cheese and toppings. Crust was perfect, and delivery was fast. Definitely ordering again." />
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
