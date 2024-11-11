import React from 'react'
import Title from '../ReUsables/Title'
import Steps from '../ReUsables/Steps'

const SimpleSteps = () => {
  return (
    <section className="py-5">
    <div className="container text-center">
      <Title heading="What to do!" size={6} />
      <div className="mt-5 row">
            <Steps stepNo='1' img="https://www.creativefabrica.com/wp-content/uploads/2018/10/Menu-3.jpg" desc="Choose menu" />
        <Steps stepNo='2' img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDyL2FLRPCEsoGMoeVw5ZMLqL8_T4hhAgtEg&s" desc="Place Order" />
          <Steps stepNo='3' img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnYVnZDyuAnIDU0lqTzYGUOZW2lA4Vagm5Q&s" desc="Enjoy" />
      </div>
    </div>
  </section>
  )
}

export default SimpleSteps
