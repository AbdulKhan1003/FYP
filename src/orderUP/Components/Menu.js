import React, { useContext, useEffect } from 'react'
import Title from '../ReUsables/Title'
import { Link } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import { useFetchRestaurants } from '../hooks/useFetchRestaurants'
import ScrollToTopButton from '../ReUsables/ScrollToTopButton'


const Menu = () => {
  const { setRestId, setRestName } = useContext(MenuContext)
  useEffect(() => {
    document.title = "ORDER UP - Menu"
  })

  const restNameAndID = (id, name) => {
    setRestId(id)
    setRestName(name)
  }

  const { restaurants, fetchRestaurants } =
    useFetchRestaurants("http://192.168.1.10:8080/api/auth/restaurants");

  const fetchData = async () => {
    await fetchRestaurants();
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (restaurants) {
    console.log('restaurants', restaurants)
    return (
      <div className='menu-bg container pt-3'>
        <Title heading="All Restaurants"></Title>
        {restaurants?.map((restaurantItems, idx) => {
          return <div style={{ cursor: 'pointer' }} className='mt-5' key={idx} onClick={() => { restNameAndID(restaurantItems._id, restaurantItems.name) }}>
            <Link to={`../restaurant/${restaurantItems._id}/items`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card d-flex flex-lg-row mb-5 options">
                <img src={restaurantItems.thumbnail} className="card-img-top img-fluid" alt="..." />
                <div className="card-body pt-1">
                  <h3 className="">{restaurantItems.address.city}</h3>
                  <h5 className="card-title mt-0 text-secondary">{restaurantItems.address.address}</h5>
                  <div>
                    <h3 className=''>{restaurantItems.name}</h3>
                  </div>
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
