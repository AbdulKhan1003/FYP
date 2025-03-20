import React from 'react'

const PopularDishes = (props) => {
  return (
    <div className="col-md-4 mb-4">
    <div className="card transition-box popular-box">
        <center>
      <img src={`${props.imgSrc}`} alt="Food" className="card-img-top img-fluid mt-2" style={{objectFit:'cover'}} />
        </center>
        <hr className='m-0 p-0' />
      <div className="card-body">
        <h3 className="h5 fw-bold mb-2">{props.heading}</h3>
        <p>{props.para}</p>
      </div>
    </div>
  </div>
  )
}

export default PopularDishes
