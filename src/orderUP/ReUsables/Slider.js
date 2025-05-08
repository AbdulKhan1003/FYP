import React from 'react'

const Slider = (props) => {
    return (
            <>
                <div className={`carousel-item ${props.active}`}>
                    <div className="card-body">
                        <center>
                        <div className='review-bg w-75 pb-2'>
                            <img loading='lazy' style={{ width: '13%' }} src={props.imgSrc} alt="Customer Review" className="review-img rounded-circle mb-3 mt-2" />
                            <h3 className="h5 fw-bold mb-2">{props.name}</h3>
                            <p className='px-5' style={{height:"50px"}}>{props.review}</p>
                        </div>
                        </center>
                    </div>
                </div>
        </>
    )
}

export default Slider
