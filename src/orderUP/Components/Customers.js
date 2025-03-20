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
      <Slider active="active" imgSrc="users/user-1.jpg" name="Karen" review="Finally, an ordering site that actually makes sense! Everything is in one place, the filters helped me find what I wanted fast, and checkout was hassle-free. Got my order exactly on time—impressive!" />
      <Slider active="" imgSrc="users/user-2.jpg" name="Babar" review="Sab kuch aik hi jaga me mil gya. Best haii 👍" />
      <Slider active="" imgSrc="users/user-3.jpg" name="Kevin" review="I usually struggle with food delivery apps, but this one was a breeze! The site is well-organized, restaurant reviews helped me choose the best option, and tracking was spot on. No glitches, no confusion—just quick and reliable service!" />
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
