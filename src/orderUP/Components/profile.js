import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'

function Profile() {
  const userProfile = JSON.parse(localStorage.getItem("User"))
  const pic = userProfile.profilePicture
  console.log("user prof" , userProfile)
  const nav = useNavigate()
  const {setUser} = useContext(MenuContext)
  const handleLogout = () => {
    localStorage.setItem('LoggedIn', 0)
    setUser({})
    nav('/')
    window.location.reload();
  }

  return (
    <>
      <div className="container my-4">
        <div className="card mb-4">
          <div className="card-body d-flex align-items-center profile-main">
          <img src={userProfile?userProfile.profilePicture:"https://placehold.co/100x100"} alt='Profile pic' className="rounded-circle me-4" />
              <div>
                <h2 className="h4 mb-0">{userProfile?userProfile.name:"Guest"}</h2>
                <p className="text-muted mb-1">{userProfile?userProfile.email:"abc@example.com"}</p>
                <p className="text-muted mb-1">{userProfile?userProfile.role:"Guest"}</p>
                {/* <p className="text-muted mb-0">123 Main Street, Apt 4B, Springfield, USA</p> */}
              </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="h5 mb-3">Order History</h3>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center mb-3 border profile-orders">
                <div>
                  <h4 className="h6 mb-1">Order #12345</h4>
                  <p className="text-muted mb-0">Placed on: 2023-10-01</p>
                </div>
                <span className="badge bg-primary rounded-pill">$25.00</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center mb-3 border profile-orders">
                <div>
                  <h4 className="h6 mb-1">Order #12344</h4>
                  <p className="text-muted mb-0">Placed on: 2023-09-28</p>
                </div>
                <span className="badge bg-primary rounded-pill">$18.50</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center mb-3 border profile-orders">
                <div>
                  <h4 className="h6 mb-1">Order #12343</h4>
                  <p className="text-muted mb-0">Placed on: 2023-09-25</p>
                </div>
                <span className="badge bg-primary rounded-pill">$30.00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="h5 mb-3">Account Settings</h3>
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
