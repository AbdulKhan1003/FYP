import React, { useContext, useEffect, useState } from 'react'
import Title from '../ReUsables/Title'
import { Link } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import ScrollToTopButton from '../ReUsables/ScrollToTopButton'
import axios from 'axios'


const Menu = () => {
  const { setRest, API_URL } = useContext(MenuContext)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    document.title = "ORDER UP - Menu"
  })


  const getRestaurant = (restaurant) => {
    console.log("Rest is",restaurant)
    setRest(restaurant)
  }
  const fetchRestaurants = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/restaurants`)
      if (data) {
        setRestaurants(data.restaurants)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchRestaurants()
  }, []);


  const handleSearch = (e) => {
    setTimeout(() => {
      setRestaurants(restaurants.filter((rest) => rest.name.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }, 500)

  }

  if (restaurants) {
    console.log('restaurants:', restaurants)
    return (
      <div className='menu-bg container pt-3'>
        <Title heading="All Restaurants"></Title>
        <div className="d-flex mt-3">
          <div className="input-group searchBar">
            <span className="input-group-text"><i className="bi bi-search"></i> </span>
            <input className="form-control" type="search" placeholder="Search here.." aria-label="Search" onChange={handleSearch}
            />
          </div>
        </div>
        {restaurants?.map((restaurantItems, idx) => {
          return <div style={{ cursor: 'pointer' }} className='mt-2' key={idx} onClick={() => { getRestaurant(restaurantItems)}}>
            <Link to={`../restaurant/${restaurantItems._id}/items`}
              state={{
                restaurantName: restaurantItems.name,
                restaurantId: restaurantItems._id
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card d-flex flex-lg-row mb-5 options menu-rest-cards">
              <img src={ `${API_URL}/images/${restaurantItems.logo}`} alt="Restaurant Logo" className="card-img-top img-fluid menu-rest-img" />
                <div className="card-body pt-1">
                  <div>
                    <h3 className=''>{restaurantItems.name}</h3>
                  </div>
                  <h5 className="card-title mt-0 text-secondary">{restaurantItems.address.address},{restaurantItems.address.city}</h5>
                  <h2 className="badge bg-info fs-6 text-dark mt-2">{restaurantItems.phone}</h2>
                  <div>
                    <h5 className=''>Rating: {restaurantItems.rating}⭐</h5>
                  </div>
                  <div>
                    <h5 className='mt-3'>Payment: <span className='badge bg-danger'>{restaurantItems.deliveryOptions}</span></h5>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })}
        <ScrollToTopButton />
      </div>
    )
  } else {
    return <div className='container pt-3 d-flex justify-content-center flex-column align-items-center'>
      <h1 className="mb-5">Fetching Restaurants...</h1>
      <div className="spinner-border big-spinner mt-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }

}

export default Menu
