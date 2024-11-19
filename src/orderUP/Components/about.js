import React,{useEffect} from 'react'
import FAQ from './faq'
import Dishes from './Dishes'
import ScrollToTopButton from '../ReUsables/ScrollToTopButton'


const About = () => {

  useEffect(()=>{
    document.title="ORDER UP - About"
  })
  
  return (
    <div className='bg-secondary-subtle bg-opacity-10'>
      <div className='about-img-cont'>
            <div className="about-box text-light">
            <h1>Our mission!</h1>
            <p className='about-para fs-5 mt-4'>Welcome to ORDER UP. Your ultimate destination for delicious food, brought straight to your doorstep. Whether you crave local delicacies or international cuisines, we’ve partnered with the best restaurants and local vendors to ensure you get the freshest and tastiest meals.
            </p>
            </div>
      </div>
      <div className="row py-5 about-cont">
      <div className="col-md-1"></div>
        <div className="col-md-5 text-center column-1">
          <h1 className='mt-5'>Bringing every place closer.</h1>
          <p className='fs-6 my-5 text-start para'>We are a unique food delivery company committed to offering you a diverse selection of meals. Whether it's from luxurious restaurants or your favorite local vendors, we deliver it all.</p>
          <p className='fs-6 my-4 text-start para'>Relax at home or with friends while we work tirelessly to bring your favorite dishes right to your doorstep.</p>
        </div>
        <div className="col-md-6 column-2 bringCloser-img">
          <center>
            <img src="about-delivery-img.avif" className='img-fluid' style={{width:'86%'}} alt="" />
          </center>
          </div>
        </div>

        <Dishes />

        <FAQ /> 

        <div className="row py-5 container-fluid register-cont" style={{ overflow: 'hidden' }}>
          <div className="col-md-1"></div>
          <div className="col-md-5 text-center mt-3 column-1">
            <h1 className='mt-4'>Register your business</h1>
            <p className="fs-6 my-4 text-start para">Join our platform and expand your reach by registering your restaurant or food stall today. Our site connects you with a wide customer base, offering the opportunity to showcase your unique dishes to food lovers across the city. Whether you're a luxurious restaurant or a beloved local vendor, registering with us ensures your creations are just a few clicks away from hungry customers.</p>
            <button type='button' className='btn btn-outline-success mb-3'>Register</button>
          </div>
          <div className="col-md-6 column-2">
          <center>
            <img src="register.jpg" className='' style={{width:'85%'}} alt="" />
          </center>
          </div>
        </div>
        <ScrollToTopButton />
    </div>  
  )
}

export default About
