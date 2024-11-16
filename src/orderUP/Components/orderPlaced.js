import React,{useContext, useEffect} from 'react'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'

const OrderPlaced = () => {
    const {setPage} = useContext(MenuContext)
    useEffect(() => {
        document.title = "ORDER UP - Order Placed"
        setPage("OrderPlaced")
      }, [])
  return (
    <div className='orderPlaced'>
        <div className="order-box">
            <div className="box d-flex flex-column align-items-center">
                <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png" style={{width:'150px', height:'150px'}} alt="" />
            <h2>Thank you for the order!</h2>
            <p className='fs-5 mx-5 text-center'>Your order has been placed and it will be with you shortly. You can track your order's progress from the progress bar below. <br /> Till then, feel free to explore out website to gain information about us.</p>
            </div>
        </div>
    </div>
  )
}

export default OrderPlaced
