import React from 'react'

const liveTracker = () => {
    return (
    <>
        <div className='d-flex justify-content-center mt-3'>
            <address className='text-center fs-4 fw-bold'>Tracking your order...</address>
        </div>
        <div className='d-flex justify-content-center responsive-map'>
                <iframe title='COMSATS' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.728046226144!2d73.14653207536928!3d30.641621074628333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b6e4dde0c501%3A0xc37ea3d85326203!2sCOMSATS%20University%20Islamabad%20-%20Sahiwal%20Campus!5e0!3m2!1sen!2s!4v1745345700102!5m2!1sen!2s" 
                width="1100" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            </>
    )
}

export default liveTracker
