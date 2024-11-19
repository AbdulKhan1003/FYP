import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from './hero'
import Choose from './Choose'
import Customers from './Customers'
import FAQ from './faq'
import SimpleSteps from './SimpleSteps'
import ScrollToTopButton from '../ReUsables/ScrollToTopButton'

const Home = () => {

  useEffect(()=>{
    document.title="ORDER UP"
  })

  return (
        <div>
          <Hero />
          <Choose />
          <SimpleSteps />
          <FAQ />
          <Customers />
          <ScrollToTopButton />

          <section className="bg-success text-white py-5">
            <div className="container text-center">
              <h3 className="display-6 fw-bold mb-3">Wanna order on mobile?</h3>
              <p className="lead mb-4">Download our app and start enjoying your favorite meals today!</p>
              <Link to="/appKaLink" className="btn btn-light text-success fw-bold px-4 py-2">Download Now</Link>
            </div>
          </section>
    
        </div>
  )
}

export default Home
