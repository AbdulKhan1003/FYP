import React, { useEffect } from 'react'
import FAQ from './faq'
import Dishes from './Dishes'
import ScrollToTopButton from '../ReUsables/ScrollToTopButton'
import Title from '../ReUsables/Title'


const About = () => {

  useEffect(() => {
    document.title = "ORDER UP - About"
  })

  return (
    <div className='about-container'>
      <div className='about-img-cont'>
        <div className="about-box text-light">
          <h1>Our mission!</h1>
          <p className='about-para fs-5 mt-4'>Welcome to ORDER UP. Your ultimate destination for delicious food, brought straight to your doorstep. Whether you crave local delicacies or international cuisines, we’ve partnered with the best restaurants and local vendors to ensure you get the freshest and tastiest meals.
          </p>
        </div>
      </div>

      <div className="w-100 p-5 team-cont ">
        <Title size='6' heading="Meet the Team" />
        <div className="d-flex justify-content-around mt-5 flex-wrap">
          <div className='d-flex flex-column'>
            <img src="https://placehold.co/100x100" className="rounded-circle team-image border border-dark" alt="Team Member" />
            <h3 className='my-3 text-center'>Talha Zubair</h3>
            <p className='text-center text-warning'>Designer & Documentor</p>
          </div>
          <div className='d-flex flex-column'>
            <img src="https://placehold.co/100x100" className='rounded-circle team-image border border-dark' alt="" />
            <h3 className='my-3 text-center'>Abdul Hadi Khan</h3>
            <p className='text-center text-warning'>FrontEnd Developer & Tester</p>
          </div>
          <div className='d-flex flex-column'>
            <img src='https://placehold.co/100x100' className='rounded-circle team-image border border-dark' alt="" />
            <h3 className='my-3 text-center'>Ahsan Naeem</h3>
            <p className='text-center text-warning'>Full Stack Developer & Tester</p>
          </div>
        </div>
      </div>

      <Dishes />


      <div className="container-fluid p-5 rider-cont">
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center">
            <h1 className="mt-3 fw-bold">Bringing every place closer.</h1>
            <p className="fs-6 my-4">We are a unique food delivery company committed to offering you a diverse selection of meals. Whether it's from luxurious restaurants or your favorite local vendors, we deliver it all.</p>
            <p className="fs-6">Relax at home or with friends while we work tirelessly to bring your favorite dishes right to your doorstep.</p>
          </div>
          <div className="col-md-6 text-center">
            <img src="about-delivery-img.avif" className="img-fluid rounded-3" style={{ width: '90%' }} alt="Food Delivery" />
          </div>
        </div>
      </div>

      {/* <FAQ /> */}

      <div className="row py-5 container-fluid register-cont">
        <div className="col-md-1"></div>
        <div className="col-md-5 text-center mt-3 column-1">
          <h1 className='mt-4'>Register your business</h1>
          <p className="fs-6 my-4 text-start para">Join our platform and expand your reach by registering your restaurant or food stall today. Our site connects you with a wide customer base, offering the opportunity to showcase your unique dishes to food lovers across the city. Whether you're a luxurious restaurant or a beloved local vendor, registering with us ensures your creations are just a few clicks away from hungry customers.</p>
          <button type='button' className='btn btn-outline-success mb-3'>Register</button>
        </div>
        <div className="col-md-6 column-2">
          <center>
            <img src="register.png" className='' style={{ width: '85%' }} alt="" />
          </center>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  )
}

export default About
