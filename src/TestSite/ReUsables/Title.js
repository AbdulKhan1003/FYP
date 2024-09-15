import React from 'react'

const Title = (props) => {
  return (
      <h1 className={`text-center fw-bold display-${props.size}`} ><strong>{props.heading}</strong></h1>
  )
}

export default Title
