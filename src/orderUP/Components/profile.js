import React, { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'

function Profile() {

  useEffect(() => {
    // setUser({
    //   ...user,
    //   orderHistory: []
    // });
    document.title="ORDER UP - Profile"
  }, []);


  const userProfile = JSON.parse(localStorage.getItem("User"))
  console.log("user prof", userProfile)
  const nav = useNavigate()
  const { setUser, setCartItems, user } = useContext(MenuContext)
  const handleLogout = () => {
    localStorage.setItem('LoggedIn', 0)
    setCartItems([])
    setUser({})
    nav('/')
    window.location.reload();
  }

  return (
    <>
      <div className="container my-4">
        <div className="card mb-4">
          <div className="card-body d-flex align-items-center profile-main">
            <img src={userProfile ? userProfile.profilePicture : "https://placehold.co/100x100"} alt='Profile pic' className="rounded-circle me-4" />
            <div>
              <h2 className="h4 mb-0">{userProfile ? userProfile.name : "Guest"}</h2>
              <p className="text-muted mb-1">{userProfile ? userProfile.email : "abc@example.com"}</p>
              <p className="text-muted mb-1">{userProfile ? userProfile.role : "Guest"}</p>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="h5 mb-3 fw-bold">Order History</h3>
            <ul className="list-group">
              {user.orderHistory.map((orders, idx) => {
                return <li className="list-group-item d-flex justify-content-between align-items-center mb-3 border profile-orders">
                  <div>
                    <h4 className="h6 mb-1">Order no: {idx + 1}</h4>
                    <p className="text-muted mb-0">Placed on: {orders.date}</p>
                  </div>
                  <span className="badge bg-primary rounded-pill">Rs.{orders.total}</span>
                </li>
              })}

            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="h5 mb-3 fw-bold">Account Settings</h3>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-info">Edit Profile</button>
              <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Profile
