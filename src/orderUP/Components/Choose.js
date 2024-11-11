import React from 'react'
import Title from '../ReUsables/Title'
import WhyChoose from '../ReUsables/WhyChoose'

const Choose = () => {
  return (
    <section className="py-5">
    <div className="container text-center">
      <Title heading="Why Choose ORDER UP!" size={6} />
      <div className="mt-5 row">
            <WhyChoose imgSrc="serving-food.svg" heading="Wide Variety of Cuisines" para="Explore a diverse range of dishes from different cultures and cuisines." />
        <WhyChoose imgSrc="fast-delivery.svg" heading="Quick Delivery" para="Enjoy fast and reliable delivery services, ensuring your food arrives hot and fresh." />
          <WhyChoose imgSrc="top-rated.svg" heading="Top-rated Restaurants" para="Partnering with the best restaurants to guarantee quality and taste." />
      </div>
    </div>
  </section>
  )
}

export default Choose
