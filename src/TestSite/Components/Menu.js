import React, { useContext,useEffect } from 'react'
import Title from '../ReUsables/Title'
import { Link } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'


const Menu = () => {

  useEffect(()=>{
    document.title="ORDER UP - Menu"
  })
  const { restaurant } = useContext(MenuContext)
  console.log(restaurant)
  return (
    <div className='menu-bg container pt-3'>
      <Title heading="All Restaurants"></Title>
      {restaurant.map((restaurantItems, idx) => {
        return <div style={{cursor:'pointer'}} className='mt-5' key={idx}>
          <Link to={`../restaurant/${restaurantItems.rID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card d-flex flex-lg-row mb-5">
              <img src={restaurantItems.restaurantImage} className="card-img-top img-fluid" alt="..." />
              <div className="card-body pt-1">
                <h5 className="card-title mt-0">{restaurantItems.restaurantName}</h5>
                <p className="text-secondary">{restaurantItems.location},{restaurantItems.city}</p>
                {restaurantItems.type.map((items, index) => {
                  return <span key={index} className="badge bg-secondary-subtle text-dark me-3">{items}</span>
                })}
                <div>
                  <p className={` mt-3 mb-0 badge rounded-pill bg-${restaurantItems.isAvailableRestaurant ? 'success' : 'danger'}`}>{restaurantItems.isAvailableRestaurant ? 'Open' : 'Closed'}</p>
                </div>
                <p className="badge bg-secondary-subtle text-dark mt-3">🕜{restaurantItems.deliveryTime}</p>
              </div>
            </div>
          </Link>
        </div>
      })}

    </div>
  )
}

export default Menu
