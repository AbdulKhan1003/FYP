import React from 'react'

const WhyChoose = (props) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow transition-box">
        <div className="card-body">
          <img className='img-fluid img-responsize' style={{ widows: '50px', height: '50px' }} src={props.imgSrc} alt="" />
          <i className={`${props.class}`}></i>
          <h3 className="h5 fw-bold mb-2">{props.heading}</h3>
          <p>{props.para}</p>
        </div>
      </div>
    </div>
  )
}

export default WhyChoose;
