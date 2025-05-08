import React from 'react'

const Steps = (props) => {
  return (
    <div className="col-md-4 mb-4">
    <div className="card h-100 transition-box">
        <center>
            <h2 className='text-success mt-2'>Step {props.stepNo}:</h2>
        </center>
        <hr className='m-0 p-0' />
      <div className="card-body">
        <img loading='lazy' src={props.img} style={{width:'30%',height:'50%'}} alt="Img" />
        <hr />
        <h4>{props.desc}</h4>
      </div>
    </div>
  </div>
  )
}

export default Steps
